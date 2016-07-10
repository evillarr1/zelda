"use strict";

const DIRECTION = {
	UP: ["UP", "DOWN"],
	DOWN: ["DOWN", "UP"],
	LEFT: ["LEFT", "RIGHT"],
	RIGHT: ["RIGHT", "LEFT"]
};

export default class Grab {
	_grab() {
		let props = this.collisions.get(DIRECTION[this.direction][0]).prop;

		// Only grab if the entity is not off the edge
		if (this.direction === "UP" || this.direction === "DOWN") {
			if ((this.xPos < props[0] - 6) || (this.xPos > props[0] + props[2] - 10)) {
				this.pullCounter = 0;

				return;
			}
		} else {
			if ((this.yPos < props[1] - 12) || (this.yPos > props[1] + props[3] - 22)) {
				this.pullCounter = 0;

				return;
			}
		}

		this.currentAction = "LINK_GRABBING";
		this.actionIndex = 0;

		if (this.direction === "LEFT") {
			this.actionXOffset = -2;
		} else if (this.direction === "UP") {
			this.actionYOffset = 4;
		} else if (this.direction === "DOWN") {
			this.actionYOffset = 4;
		}
	}
}