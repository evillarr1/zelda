"use strict";

import KeyCodes from "../constants/KeyCodes";

const DEFAULT_OVERLAY_FIXED = {
	LEFT: [12, 936, 16, 37, 17, 20],
	LEFT2: [29, 937, 22, 22, 34, 20],
	MIDDLE_ARROW: [300, 930, 20, 7, 114, 18],
	MIDDLE_RUPEE: [317, 929, 18, 7, 67, 18],
	MIDDLE_BOMB: [337, 927, 8, 7, 98, 17],
	RIGHT: [62, 939, 45, 8, 166, 14]
};

export default class MenuOverlay {
	constructor() {
		// Create a new image
		this.menu = new Image();
		this.menu.src = "img/mainSheet.png";
		this.hearts = Link.hearts;
		this.bombs = Link.bombs;
		this.arrow = Link.arrow;

	}

	drawDefaultOverlay() {
		for (let key in DEFAULT_OVERLAY_FIXED) {
			let [xCor, yCor, xWidth, yWidth, xPos, yPos] = DEFAULT_OVERLAY_FIXED[key];
			Context.drawImage(
				this.menu,
				xCor,
				yCor,
				xWidth,
				yWidth,
				xPos,
				yPos,
				xWidth,
				yWidth);
		}
		// Draw hearts for Link's Life
		for (let i = 0; i < Link.hearts; i++) {
			Paint.draw("HEART", null, 148 + (i * 8), 21);
		}

		// Draw zeros for rupees
		for (let i = 0; i < 3; i++) {
			Paint.draw("NUMBERS", '0', 66 + (i * 8), 25);
		}
		// Draw zeros for bombs
		for (let i = 0; i < 2; i++) {
			Paint.draw("NUMBERS", '0', 96 + (i * 8), 25);
		}
		// Draw zeros for arrows
		for (let i = 0; i < 2; i++) {
			Paint.draw("NUMBERS", '0', 118 + (i * 8), 25);
		}

	}

}