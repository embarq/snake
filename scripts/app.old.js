"use strict";

let cnv = document.querySelector('#canvas');
let ctx = cnv.getContext('2d');
let gridSize = 20;
let rand = (min, max) => Math.abs(Math.floor(Math.random() * (max - min)) - min);

class Entity {
	constructor(cfg) {
		this.size = gridSize;
		this.position = cfg.position || {
			x: rand(1, cnv.width / gridSize - 2),
			y: rand(1, cnv.height / gridSize - 2)
		};
		this.color = cfg.color || {
			stroke: "#555",
			fill: "#F8F8F8"
		};
	}

	draw(cell) {
		if (cell == null) cell = this.position;
		ctx.beginPath();
		ctx.strokeStyle = this.color.stroke;
		ctx.fillStyle = this.color.fill;
		ctx.fillRect(
			cell.x * this.size,
			cell.y * this.size,
			this.size, 
			this.size);
		ctx.strokeRect(
			cell.x * this.size,
			cell.y * this.size,
			this.size,
			this.size);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}
}

class Food extends Entity {}

class Snake extends Entity {
	constructor(cfg) {
		super(cfg);
		this.owner = cfg.owner;
		this.direction = 'r';
		this.body = [];

		for (let i = 0, size = 2; i < size; i++) {
			this.body.push({
				x: this.position.x + i,
				y: this.position.y
			});
		};
	}

	// Select fisrt element, increse it by current direction,
	// check if it collides anything,
	// check if it's location equals food location
	// copy it and push-front to body  
	moveto(target) {
		let head = Object.assign({}, this.body[0]),	// 1, 2, 3
			tail = {},
			success = false;

		switch (this.direction) {
			case "r": head.x++; break;
			case "l": head.x--; break;
			case "u": head.y++; break;
			case "d": head.y--; break;
		};

		if (this.isCollidesWith(head)) {
			this.owner.unmount();
		}

		head.x == target.position.x && head.y == target.position.y ? success = true : tail = this.body.pop();
		
		Object.assign(tail, head);
		this.body.unshift(tail);
		return success;
	}

	isCollidesWith(point) {
		// Т.к. реальный размер части тела змейки = 1, 
		// А при рендеринге этот размер умножается на "gridSize"
		// То координаты границ вычисляются в обратном направлении
		return point.x == -1 || point.y == -1 ||
			point.y == cnv.height / gridSize ||
			point.x == cnv.width / gridSize
			// || (function(arr) {
			// 	for (var i = arr.length - 1; i >= 0; i--) {
			// 		if (arr[i].x == point.x && arr[i].y == point.y) return true;
			// 	}
			// 	return false;
			// })(this.body);
	}

	draw() {
		this.body.forEach(part => super.draw(part));
	}

	controller(key) {
		key = key.which;
		if (key === 37 && this.direction !== "r") this.direction = "l";
		else if (key === 38 && this.direction !== "u") this.direction = "d";
		else if (key === 39 && this.direction !== "l") this.direction = "r";
		else if (key === 40 && this.direction !== "d") this.direction = "u";
	}
};

class Score {
	constructor(elem) {
		this.value = 0;
		this.controller = elem;
		this.controller.setAttribute('value', 0);
	}

	set updater(value) {
		return this.controller.setAttribute('value', value);
	}

	update() {
		this.value += 1;
		this.updater = this.value;
	}
}

class Game {
	constructor() {
		this.foodConfig = {
			position: null,
			color: {
				stroke: "#9C2",
				fill: "#3C2"
			}
		};

		this.snakeConfig = {
			position: {
				x: 1,
				y: 1
			},
			color: {
				stroke: "#C32",
				fill: "#F55"				
			},
			owner: this
		};

		this.init();
	}

	controller(e) {
		this.snake.controller(e);
	}

	init() {
		this.food  = new Food(this.foodConfig);
		this.snake = new Snake(this.snakeConfig);
		this.score = new Score(document.querySelector('#score'));
		this.loop  = setInterval(this.tick.bind(this), 1e2);
		window.addEventListener('keyup', this.controller.bind(this), false);
	}

	tick() {
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		if (this.snake.moveto(this.food)) {
			this.food = new Food(this.foodConfig);
			this.score.update();
		}
		this.snake.draw();
		this.food.draw();
	}

	unmount() {
		window.removeEventListener('keyup', this.controller.bind(this), false);
		clearInterval(this.loop);
		this.init();
	}
}