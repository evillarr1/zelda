"use strict";

const DIRECTION = {
	UP: ["UP", "DOWN"],
	DOWN: ["DOWN", "UP"],
	LEFT: ["LEFT", "RIGHT"],
	RIGHT: ["RIGHT", "LEFT"]
};

export default class Grab {
	constructor(entity) {
		this.entity = entity;
	}

	_grab() {
		let props = this.entity.collisions.get(DIRECTION[this.entity.direction][0]).prop;

		// Only grab if the entity is not off the edge
		if (this.entity.direction === "UP" || this.entity.direction === "DOWN") {
			if ((this.entity.xPos < props[0] - 6) || (this.entity.xPos > props[0] + props[2] - 10)) {
				this.entity.pullCounter = 0;

				return;
			}
		} else {
			if ((this.entity.yPos < props[1] - 12) || (this.entity.yPos > props[1] + props[3] - 22)) {
				this.entity.pullCounter = 0;

				return;
			}
		}

		this.entity.currentAction = "LINK_GRABBING";
		this.entity.actionIndex = 0;

		if (this.entity.direction === "LEFT") {
			this.entity.actionXOffset = -2;
		} else if (this.entity.direction === "UP") {
			this.entity.actionYOffset = 4;
		} else if (this.entity.direction === "DOWN") {
			this.entity.actionYOffset = 4;
		}
	}
}