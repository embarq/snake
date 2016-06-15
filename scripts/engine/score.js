"use strict";
module.exports = class Score {
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