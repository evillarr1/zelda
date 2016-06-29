"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";
import Storage from "../../../core/Storage";

const POS = [132, 148, 164, 180];
const MAIN_DISTANCE = 16;
const MAX_CHAR = 6;

const CHAR_MAP = {
	5: {
		132: [101, 311, "G"],
		148: [101, 327, "Q"],
		164: [101, 343, "-"],
		180: [70, 359, ""]

	}
};
export default class RegisterName {
	constructor(music, slot = 0) {
		this.nameText = [];

		// Create a new image for the name select screen
		this.registerNameSheet = new Image();
		this.registerNameSheet.src = "img/intro/charSelect/charSelect.png";

		// This page depends on music from the previous page
		this.music = music;

		// This page depends on the save slot from the previous page selected
		this.slot = slot;

		this.barIndex = 0;
		this.barTick = 0;

		// Current position of the character selected (defaults to G)
		this.barXPos = 5;

		// Current position of the character displayed in name field
		this.currentCharIndex = 0;

		this.cursorXPos = 5;
		this.cursorMoveCount = 0;
		this.secondCursorMoveCount = -32;

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
			if (event.keyCode === KeyCodes.DOWN && this.barIndex < POS.length - 1) {
				this.barTick++;
			} else if (event.keyCode === KeyCodes.UP && this.barIndex > 0) {
				this.barTick--;
			} else if (event.keyCode === KeyCodes.LEFT) {
				this.cursorMoveCount--;
				this.secondCursorMoveCount--;
			} else if (event.keyCode === KeyCodes.RIGHT) {
				this.cursorMoveCount++;
				this.secondCursorMoveCount++;

			} else if ([KeyCodes.Y, KeyCodes.B, KeyCodes.X, KeyCodes.A].indexOf(event.keyCode) !== -1) {
				Sound.play(("link/lowHealth"));

				this.nameText[this.currentCharIndex] = [this.barXPos, POS[this.barIndex]];
				this.currentCharIndex = (this.currentCharIndex + 1) % MAX_CHAR;
			} else if (event.keyCode === KeyCodes.START) {
				let isValid = this.nameText.reduce((prev, cur) => {
					return prev || CHAR_MAP[cur[0]][cur[1]][2].length > 0;
				}, false);

				if (this.nameText.length === 0 || !isValid) {
					Sound.play("menu/error");
				} else {
					let name = this.nameText.reduce((prev, val) => {
						return prev + CHAR_MAP[val[0]][val[1]][2]
					}, "");
					let state = {
						charName: name,
						hearts: 3,
						slot: this.slot
					};

					Storage.save(state, slot);

					Sound.play(("menu/select"));

					// Go back to the name select screen
					State.pop({
						dontPause: true
					});
				}
			}
		};
	}

	update() {
		this.animateBar();
		this.resetCursorIndex();
	}

	resetCursorIndex() {
		if (this.cursorMoveCount === 32) {
			this.cursorMoveCount = 0;
			this.secondCursorMoveCount = -32;
		}
		if (this.cursorMoveCount === -3) {
			this.secondCursorMoveCount = 29;
		}
		if (this.cursorMoveCount === -32) {
			this.cursorMoveCount = 0;
			this.secondCursorMoveCount = -32
		}
		if (this.secondCursorMoveCount === 51) {
			this.cursorMoveCount = 19;
			this.secondCursorMoveCount = -13;
		}
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
			this.cursorXPos + this.cursorMoveCount * 16,
			310,
			200,
			62,
			31,
			126,
			200,
			62);

		Context.drawImage(
			this.registerNameSheet,
			this.secondCursorMoveCount * 16 + 5,
			310,
			200,
			62,
			31,
			126,
			200,
			62);

		// Draw horizontal bar
		Context.drawImage(
			this.registerNameSheet,
			1,
			225,
			208,
			1,
			23,
			POS[this.barIndex] + this.barTick,
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
			let [x, y] = this.nameText[i];
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