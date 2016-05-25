"use strict";

let rand = (min, max) => Math.abs(Math.floor(Math.random() * (max - min)) - min);

class Game {
	constructor(cnv, gridSize) {
		this.cnv = cnv;
		this.drawContext = this.cnv.getContext('2d');
		this.foodConfig = {
			position: {
				x: rand(1, this.cnv.width / gridSize - 2),
				y: rand(1, this.cnv.height / gridSize - 2)
			},
			color: {
				stroke: "#9C2",
				fill: "#3C2"
			},
			drawContext: this.drawContext,
			gridSize: gridSize
		};

		this.snakeConfig = {
			position: null,
			color: {
				stroke: "#C32",
				fill: "#F55"				
			},
			drawContext: this.drawContext,
			gridSize: gridSize,
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
		this.drawContext.clearRect(0, 0, this.cnv.width, this.cnv.height);
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