"use strict";

import Keyboard from "keyboardjs";

const SCROLL_DISTANCE = 210;

const DEFAULT_OVERLAY_FIXED = {
	LEFT: [12, 936, 16, 37, 17, 20],
	LEFT2: [29, 937, 22, 22, 34, 20],
	MIDDLE_ARROW: [300, 929, 20, 8, 114, 18],
	MIDDLE_RUPEE: [318, 928, 18, 8, 67, 18],
	MIDDLE_BOMB: [337, 927, 8, 8, 98, 17],
	RIGHT: [62, 939, 45, 8, 166, 14]
};

const START_MENU_OVERLAY = {
	BLOCKS: [0, 1000, 240, 201, 5, 10],
	Y_ITEM_TEXT: [673, 999, 18, 7, 21, 10],
	A_DO_TEXT: [673, 1007, 18, 7, 21, 138],
	EQUIPMENT_TEXT: [766, 1135, 40, 8, 174, 145],
	PENDANTS_TEXT: [596, 999, 36, 7, 175, 67],
	EMPTY_PENDANT_TOP: [395, 930, 16, 16, 198, 80],
	EMPTY_PENDANT2_L: [395, 930, 16, 16, 181, 106],
	EMPTY_PENDANT3_R: [395, 930, 16, 16, 213, 106],
	EMPTY_HEART: [384, 913, 16, 16, 196, 183],
	GREEN_TUNIC: [384, 862, 16, 16, 219, 153],
	LIFT_1_TEXT: [673, 1018, 35, 8, 29, 155],
	TALK_TEXT: [711, 1018, 35, 8, 112, 155],
	READ_TEXT: [673, 1030, 35, 8, 72, 155],
	PULL_TEXT: [711, 1030, 35, 8, 29, 171],
	DASHES_EQUIPMENT: [766, 1163, 62, 1, 173, 171]
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
		this.lockControls = false;
		// Take away Link's controls
		Keyboard.withContext("Player", () => {
			Keyboard.bind('enter', () => {
				Keyboard.setContext("Menu_Opening");
			});
		});

		// Change context to Menu_Closing if entire Start Menu is open. Close menu in update()
		Keyboard.withContext("Menu_Opening", () => {
			Keyboard.bind(['enter', 'a', 's', 'd', 'w', 'shift'], () => {
				this.lockControls = true;
				if (this.tick === SCROLL_DISTANCE) {
					Keyboard.setContext("Menu_Closing");
				}
			});
		});

	}

	// Open menu OR Close menu OR Reanable Link's controls
	update() {
		if (Keyboard.getContext() === "Menu_Opening" && this.tick < SCROLL_DISTANCE) {
			this.tick += 7.5;
		} else if (Keyboard.getContext() === "Menu_Closing" && this.tick > 0) {
			this.tick -= 7.5;
		} else if (Keyboard.getContext() === "Menu_Closing" && this.tick === 0 && this.lockControls) {
			this.lockControls = false;
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
			Paint.draw("HEARTS", "HEALTH_FULL", 148 + (i * 8), 21 + this.tick);
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
