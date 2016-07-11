"use strict";

export default class Stand {
	constructor(entity) {
		this.entity = entity;
		this.actionCounter = 0;
	}

	update() {
		if (this.entity.currentStrokes.size === 0) {
			this.entity.actions("STAND");

			return true;
		}

		return false;
	}

	perform(directions) {
		this.entity.currentAction = "LINK_STANDING";
		this.entity.direction = directions[0] || this.entity.direction;
	}
}