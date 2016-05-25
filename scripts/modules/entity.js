"use strict";
class Entity {
	constructor(cfg) {
		this.size = cfg.gridSize;
		this.ctx = cfg.drawContext;
		this.position = cfg.position || {
			x: 1,
			y: 1
		};
		this.color = cfg.color || {
			stroke: "#555",
			fill: "#F8F8F8"
		};
	}

	draw(cell) {
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.color.stroke;
		this.ctx.fillStyle = this.color.fill;
		this.ctx.fillRect(
			cell.x * this.size,
			cell.y * this.size,
			this.size, 
			this.size);
		this.ctx.strokeRect(
			cell.x * this.size,
			cell.y * this.size,
			this.size,
			this.size);
		this.ctx.stroke();
		this.ctx.fill();
		this.ctx.closePath();
	}
}