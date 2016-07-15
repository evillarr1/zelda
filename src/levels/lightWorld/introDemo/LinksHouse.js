"use strict";

import Keyboard from "keyboardjs";

const OBJECTS = function () {
	return {
		static: [
		],
		special: {
		}
	}
};

export default class LinksHouse {
	constructor() {
		Player.setLevelObjects(new OBJECTS());
		Player.actions("STAND", "RIGHT");
		Player.postion(90, 75);
		Keyboard.setContext("Player");
	}

	update() {
		Player.update();
	}

	draw() {
		Context.clearRect(0, 0, Canvas.width, Canvas.height);
		Paint.drawMap("linksHouse", 0, 0, 0, 0);
		Player.draw();
		MenuOverlay.drawDefaultOverlay();
	}
}