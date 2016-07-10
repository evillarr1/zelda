"use strict";

export default class Pull {
	_pull() {
		this.actionIndex = (this.actionIndex + 1) % 24;

		if (this.direction === "LEFT") {
			this.actionXOffset = 2;
		} else if (this.direction === "UP") {
			this.actionYOffset = 5;
			this.actionXOffset = -7;
		} else if (this.direction === "DOWN") {
			this.actionXOffset = -7;
			this.actionYOffset = 3;
		} else if (this.direction === "RIGHT") {
			this.actionXOffset = -7;
		}

		this.currentAction = "LINK_TUGGING_" + Math.floor(this.actionIndex / 8);
	}
}