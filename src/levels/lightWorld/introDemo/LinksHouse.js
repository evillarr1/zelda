"use strict";

import Keyboard from "keyboardjs";

const OBJECTS = () => {
	return {
		static: [
			[31, 104, 50, 28]
		],
		special: {
			//"POT_1": [31, 104, 50, 28, "POT_1", "LIFT", ["POT", "UP", 27, 104]]
		}
	}
};

export default class LinksHouse {
	constructor() {
		Player.setLevelObjects(new OBJECTS());
		Player.actions("STAND", "DOWN");
		Player.setPosition(115, 96);
		Keyboard.setContext("Player");
	}

	update() {
		Player.update();
		this.linkRespectMap();
	}

	linkRespectMap() {
		Player.disableDisplacementX = Player.xPos >= 35 && Player.xPos <= 293;
		Player.disableDisplacementY = Player.yPos >= -73 && Player.yPos <= 216;
	}

	draw() {
		Paint.drawMap("linksHouse", Player.disabledX + 80, Player.disabledY + 170, 0, 0);
		Player.draw();

	}
}

// Maybe setPosition can have 2 more parameters, disable of x,y
