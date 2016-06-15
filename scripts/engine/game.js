"use strict";
const Score = require("./score");
const Snake = require("./../models/snake");
const Food  = require("./../models/food");

module.exports = class Game {
	constructor(config) {
		for(var prop in config) {
			if (config.hasOwnProperty(prop)) {
				if (config[prop] == null) {
					throw new ReferenceError("${prop} must be present(in config object)");
					return null;
				}
			}
		}

		this.config = config;

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