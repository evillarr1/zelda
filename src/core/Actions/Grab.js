"use strict";

const DIRECTION = {
	UP: ["UP", "DOWN"],
	DOWN: ["DOWN", "UP"],
	LEFT: ["LEFT", "RIGHT"],
	RIGHT: ["RIGHT", "LEFT"]
};

export default class Grab {
	constructor(player) {
		this.player = player;
	}

	_grab() {
		let props = this.player.collisions.get(DIRECTION[this.player.direction][0]).prop;

		// Only grab if the player is not off the edge
		if (this.player.direction === "UP" || this.player.direction === "DOWN") {
			if ((this.player.xPos < props[0] - 6) || (this.player.xPos > props[0] + props[2] - 10)) {
				this.player.pullCounter = 0;

				return;
			}
		} else {
			if ((this.player.yPos < props[1] - 12) || (this.player.yPos > props[1] + props[3] - 22)) {
				this.player.pullCounter = 0;

				return;
			}
		}

		this.player.currentAction = "LINK_GRABBING";
		this.player.actionIndex = 0;

		if (this.player.direction === "LEFT") {
			this.player.actionXOffset = -2;
		} else if (this.player.direction === "UP") {
			this.player.actionYOffset = 4;
		} else if (this.player.direction === "DOWN") {
			this.player.actionYOffset = 4;
		}
	}
}