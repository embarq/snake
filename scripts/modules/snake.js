"use strict";
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
			|| (function(arr) {
				console.log('this');
				for (var i = arr.length - 1; i >= 0; i--) {
					if (arr[i].x == point.x && arr[i].y == point.y) return true;
				}
				return false;
			})(this.body);
			// || this.body.some(item => item.x == point.x && item.y == point.y);
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

	print() {
		console.log(this.body.map(item => `[${item.x}, ${item.y}]`));
	}
};