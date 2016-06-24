"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";

const pos = [132, 148, 164, 180];
const MAIN_DISTANCE = 16;
const MAX_CHAR = 6;

const CHAR_MAP = {
	5: {
		132: [101, 311, "A"],
		148: [101, 327, "Q"],
		164: [101, 343, "-"],
		180: [70, 359, ""]
	}
};

export default class RegisterName {
	constructor(music) {
		this.nameText = [];

		// Create a new image for the name select screen
		this.registerNameSheet = new Image();
		this.registerNameSheet.src = "img/intro/nameSelect/nameSelect.png";

		// This page depends on music from the previous page
		this.music = music;

		this.barIndex = 0;
		this.barTick = 0;

		// Current position of the character selected (defaults to G)
		this.barXPos = 5;

		// Current position of the character displayed in name field
		this.currentCharIndex = 0;

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
			if (event.keyCode === KeyCodes.DOWN && this.barIndex < pos.length - 1) {
				this.barTick++;
			} else if (event.keyCode === KeyCodes.UP && this.barIndex > 0) {
				this.barTick--;
			} else if (event.keyCode === KeyCodes.LEFT) {

			} else if (event.keyCode === KeyCodes.RIGHT) {

			} else if ([KeyCodes.Y, KeyCodes.B, KeyCodes.X, KeyCodes.A].indexOf(event.keyCode) !== -1) {
				Sound.play("menu/charSelect");

				this.nameText[this.currentCharIndex] = [this.barXPos, pos[this.barIndex]];
				this.currentCharIndex = (this.currentCharIndex + 1) % MAX_CHAR;
			} else if (event.keyCode === KeyCodes.START) {
				if (this.nameText.length === 0) {
					Sound.play("menu/error");
				} else {
					Sound.play(("menu/select"));

					// Go back to the name select screen
					State.pop();
				}
			}
		};
	}

	update() {
		this.animateBar();
	}

	animateBar() {
		if (this.barTick > 0) {
			this.barTick++;

			if (this.barTick >= MAIN_DISTANCE) {
				this.barTick = 0;
				this.barIndex++;
			}
		} else if (this.barTick < 0) {
			this.barTick--;

			if (this.barTick <= -MAIN_DISTANCE) {
				this.barTick = 0;
				this.barIndex--;
			}
		}
	}

	draw() {
		Context.clearRect(0, 0, Canvas.width, Canvas.height);

		// Draw the background
		Context.drawImage(
			this.registerNameSheet,
			1,
			1,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT,
			0,
			0,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT);

		// Draw register your name text
		Context.drawImage(
			this.registerNameSheet,
			3,
			229,
			158,
			13,
			41,
			39,
			158,
			13);

		// Draw letters
		Context.drawImage(
			this.registerNameSheet,
			5,
			311,
			200,
			62,
			31,
			126,
			200,
			62);

		// Draw horizontal bar
		Context.drawImage(
			this.registerNameSheet,
			263,
			227,
			208,
			1,
			23,
			pos[this.barIndex] + this.barTick,
			208,
			1);

		// Draw heart
		Context.drawImage(
			this.registerNameSheet,
			253,
			232,
			8,
			7,
			30 + (this.currentCharIndex * MAIN_DISTANCE),
			87,
			8,
			7);

		this.drawName();
	}

	drawName() {
		for (let i = 0; i < this.nameText.length; i++) {
			let [x, y, z] = this.nameText[i];
			let [xCor, yCor] = CHAR_MAP[x][y];

			Context.drawImage(
				this.registerNameSheet,
				xCor,
				yCor,
				7,
				13,
				31 + (i * MAIN_DISTANCE),
				96,
				7,
				13);
		}
	}
}