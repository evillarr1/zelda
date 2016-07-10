"use strict";

export default class Pull {
	constructor(entity) {
		this.entity = entity;
	}

	_pull() {
		this.entity.actionIndex = (this.entity.actionIndex + 1) % 24;

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

		this.entity.currentAction = "LINK_TUGGING_" + Math.floor(this.entity.actionIndex / 8);
	}
}