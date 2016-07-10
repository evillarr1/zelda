"use strict";

export default class Pull {
	constructor(player) {
		this.player = player;
	}

	_pull() {
		this.player.actionIndex = (this.player.actionIndex + 1) % 24;

		if (this.player.direction === "LEFT") {
			this.player.actionXOffset = 2;
		} else if (this.player.direction === "UP") {
			this.player.actionYOffset = 5;
			this.player.actionXOffset = -7;
		} else if (this.player.direction === "DOWN") {
			this.player.actionXOffset = -7;
			this.player.actionYOffset = 3;
		} else if (this.player.direction === "RIGHT") {
			this.player.actionXOffset = -7;
		}

		this.player.currentAction = "LINK_TUGGING_" + Math.floor(this.player.actionIndex / 8);
	}
}