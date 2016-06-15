"use strict";
module.exports = class Entity {
	constructor(config, appConfig) {
		let rand = require("./../engine/rand");
		this.size = appConfig.gridSize;
		this.position = config.position || {
			x: rand(1, appConfig.cnv.width / appConfig.gridSize - 2),
			y: rand(1, appConfig.cnv.height / appConfig.gridSize - 2)
		};
		this.color = config.color || {
			stroke: "#555",
			fill: "#F8F8F8"
		};
		this.drawContext = appConfig.ctx;
	}

	draw(cell) {
		if (cell == null) cell = this.position;
		let ctx = this.drawContext;

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