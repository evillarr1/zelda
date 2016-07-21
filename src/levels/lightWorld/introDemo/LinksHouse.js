"use strict";

import Keyboard from "keyboardjs";

const OBJECTS = function () {
	return {
		static: [
			[-21, 177, 50, 30]

		],
		special: {}
	}
};

export default class LinksHouse {
	constructor() {
		Keyboard.setContext("Player");
		Player.disableDisplacement = false;
		Player.setLevelObjects(new OBJECTS());
		Player.actions("STAND", "RIGHT");
		Player.setPostion(90, 75);
		Keyboard.setContext("Player");
	}

	update() {
		Player.update();
		console.log(Player.xPos, Player.yPos, this.xPos, this.yPos, Player.disableDisplacement, Player.actionXOffset,
			Player.actionYOffset);
		this.linkRespectMap();
	}

	linkRespectMap() {
		Player.disableDisplacement = Player.xPos >= 0 && Player.yPos >= 0 && Player.xPos <= 261 && Player.yPos <= 291;
		if (Player.disableDisplacement) {
			this.xPos = Player.xPos;
			this.yPos = Player.yPos;
		} else {
			if ((Player.xPos < 0 && Player.yPos <= 291 && Player.yPos >= 0) ||
				(Player.xPos > 261 && Player.yPos <= 291 && Player.yPos >= 0)) {
				this.yPos = Player.yPos;
			} else if ((Player.yPos < 0 && Player.xPos <= 261 && Player.xPos >= 0) ||
				(Player.yPos > 261 && Player.xPos <= 261 && Player.xPos >= 0)) {
				this.xPos = Player.xPos;
			}
			Player.actionXOffset = 132 - this.xPos;
			Player.actionYOffset = 96 - this.yPos;
		}
	}

	draw() {
		Context.clearRect(0, 0, Canvas.width, Canvas.height);
		Paint.drawMap("linksHouse", this.xPos, this.yPos, 0, 0);
		Player.draw();
		MenuOverlay.drawDefaultOverlay();

	}
}

// Paint.draw(this.currentAction, this.direction, this.actionXOffset + 95,  this.actionYOffset + 125, "link");
// 	Paint.draw(this.currentAction, this.direction, this.xPos + this.actionXOffset, this.yPos + this.actionYOffset, "link");

// Player.postion does not affect your play.