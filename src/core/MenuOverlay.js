"use strict";

import Keyboard from "keyboardjs";

const SCROLL_DISTANCE = 210;

const DEFAULT_OVERLAY_FIXED = {
	LEFT: [12, 936, 16, 37, 17, 20],
	LEFT2: [29, 937, 22, 22, 34, 20],
	MIDDLE_ARROW: [300, 930, 20, 7, 114, 18],
	MIDDLE_RUPEE: [317, 929, 18, 7, 67, 18],
	MIDDLE_BOMB: [337, 927, 8, 7, 98, 17],
	RIGHT: [62, 939, 45, 8, 166, 14]
};

const START_MENU_OVERLAY = {
	GREEN_BOX_L: [0, 1000, 240, 201, 5, 10],
	GREEN_BOX_R: [],
	RED_BOX: [],
	YELLOW_BOX_TOP: [],
	YELLOW_BOX_BOT: []
};

export default class MenuOverlay {
	constructor() {
		// Create a new image
		this.menu = new Image();
		this.menu.src = "img/mainSheet.png";
		this.hearts = Link.hearts;
		this.bombs = Link.bombs;
		this.arrow = Link.arrow;

		this.tick = 0;

		// Check if Start Menu is closed
		this.menuBool = true;

		// Take away Link's controls
		Keyboard.withContext("Player", () => {
			Keyboard.bind('enter', () => {
				Keyboard.setContext("Menu");
			});
		});

		// Change context to Menu_Closing. Close menu in update()
		Keyboard.withContext("Menu", () => {
			Keyboard.bind('enter', () => {
				this.menuBool = false;
				Keyboard.setContext("Menu_Closing");
			});
		});

	}
	// Open menu OR Close menu OR Reanable Link's controls
	update() {
		if (Keyboard.getContext() === "Menu" && this.tick < SCROLL_DISTANCE && this.menuBool) {
			this.tick += 7.5;
		} else if (Keyboard.getContext() === "Menu_Closing" && this.tick > 0) {
			this.tick -= 7.5;
		} else if(Keyboard.getContext() === "Menu_Closing" && this.tick === 0 && !this.menuBool){
			this.menuBool = true;
			Keyboard.setContext("Player");
		}
	}

	drawDefaultOverlay() {

		// Draw Start Menu. Originally above default overlay
		for (let key in START_MENU_OVERLAY) {
			let [xCor, yCor, xWidth, yWidth, xPos, yPos] = START_MENU_OVERLAY[key];
			Context.drawImage(
				this.menu,
				xCor,
				yCor,
				xWidth,
				yWidth,
				xPos,
				yPos - 210 + this.tick,
				xWidth,
				yWidth);
		}

		// Draw Default Overlay
		for (let key in DEFAULT_OVERLAY_FIXED) {
			let [xCor, yCor, xWidth, yWidth, xPos, yPos] = DEFAULT_OVERLAY_FIXED[key];
			Context.drawImage(
				this.menu,
				xCor,
				yCor,
				xWidth,
				yWidth,
				xPos,
				yPos + this.tick,
				xWidth,
				yWidth);
		}
		// Draw hearts for Link's Life
		for (let i = 0; i < Link.hearts; i++) {
			Paint.draw("HEART", null, 148 + (i * 8), 21 + this.tick);
		}

		// Draw zeros for rupees
		for (let i = 0; i < 3; i++) {
			Paint.draw("NUMBERS", '0', 66 + (i * 8), 25 + this.tick);
		}
		// Draw zeros for bombs
		for (let i = 0; i < 2; i++) {
			Paint.draw("NUMBERS", '0', 96 + (i * 8), 25 + this.tick);
		}
		// Draw zeros for arrows
		for (let i = 0; i < 2; i++) {
			Paint.draw("NUMBERS", '0', 118 + (i * 8), 25 + this.tick);
		}

	}

}