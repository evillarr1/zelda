"use strict";

export default class Pull {
	constructor(entity) {
		this.entity = entity;
		this.actionIndex = 0;
	}

	update(directions) {
		return false;
	}

	perform() {
		this.actionIndex = (this.actionIndex + 1) % 24;

		if (this.entity.direction === "LEFT") {
			this.entity.actionXOffset = 2;
		} else if (this.entity.direction === "UP") {
			this.entity.actionYOffset = 5;
			this.entity.actionXOffset = -7;
		} else if (this.entity.direction === "DOWN") {
			this.entity.actionXOffset = -7;
			this.entity.actionYOffset = 3;
		} else if (this.entity.direction === "RIGHT") {
			this.entity.actionXOffset = -7;
		}

		this.entity.currentAction = "LINK_TUGGING_" + Math.floor(this.actionIndex / 8);
	}
}