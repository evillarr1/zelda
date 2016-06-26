"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";
import SaveLoad from "../../../core/SaveLoad";

const POS = [110, 130, 150, 190];
const FINAL_POS = [170, 190];

export default class ErasePlayer {
	constructor(music) {
		// Create a new image for the name select screen
		this.nameSelectSheet = new Image();
		this.nameSelectSheet.src = "img/intro/charSelect/charSelect.png";
		this.showConfirm = false;
		this.music = music;

		// Keep track of fairy animation
		this.numOfFrames = 6;
		this.frames = 0;
		this.frameIndex = 0;
		this.yPosIndex = 0;
		this.confirmIndex = 0;

		this.loadChars();

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
			if ([KeyCodes.Y, KeyCodes.B, KeyCodes.X, KeyCodes.A, KeyCodes.START].indexOf(event.keyCode) !== -1) {
				Sound.play("menu/select");

				if (!this.showConfirm) {
					if (this.yPosIndex === this.fairyPositions.length - 1) {
						State.pop({
							dontPause: true
						});
					}
					this.showConfirm = true;
				} else if (this.showConfirm) {
					if (this.confirmIndex === 0) {
						let chars = this.char.filter((val) => {
							return val;
						});

						SaveLoad.remove(chars[this.yPosIndex].slot);
					}

					State.pop({
						dontPause: true
					});
				}
			} else if (event.keyCode === KeyCodes.DOWN) {
				Sound.play("menu/cursor");

				if (this.showConfirm) {
					this.confirmIndex = (this.confirmIndex + 1) % FINAL_POS.length;
				} else {
					this.yPosIndex = (this.yPosIndex + 1) % this.fairyPositions.length;
				}
			} else if (event.keyCode === KeyCodes.UP) {
				Sound.play("menu/cursor");

				if (this.showConfirm) {
					this.confirmIndex = (this.confirmIndex - 1) < 0 ? FINAL_POS.length - 1 : this.confirmIndex - 1;
				} else if (--this.yPosIndex < 0) {
					this.yPosIndex = this.fairyPositions.length - 1;
				}
			}
		}
	};

	loadState() {
		this.loadChars();
	}

	loadChars() {
		this.char = [];
		this.numOfChars = 0;
		this.fairyPositions = [];

		// Load the save states
		for (let i = 0; i < 3; i++) {
			this.char.push(SaveLoad.load(i));

			if (this.char.peek()) {
				this.fairyPositions.push(POS[i]);
				this.numOfChars++;
			}
		}

		this.fairyPositions.push(POS.peek());
	}

	update() {
		this.animateFairy();
		this.animateText();
	}

	// Modify fairy animate
	animateFairy() {
		this.frames++;

		if (this.frames > this.numOfFrames) {
			this.frameIndex = this.frameIndex === 1 ? 0 : 1;
			this.frames = 0;
		}
	}

	animateText() {
		this.textAnimationCount = (this.textAnimationCount + 1) % 65;
	}

	draw() {
		Context.clearRect(0, 0, Canvas.width, Canvas.height);

		// Draw the background
		Context.drawImage(
			this.nameSelectSheet,
			264,
			1,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT,
			0,
			0,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT);

		if (!this.showConfirm) {
			// Draw fairy
			Context.drawImage(
				this.nameSelectSheet,
				150 + (19 * this.frameIndex),
				265,
				16,
				16,
				30,
				this.fairyPositions[this.yPosIndex],
				16,
				16);
		}

		Text.write("ERASE  PLAYER", 40, 23);
		Text.write("WHICH PLAYER DO YOU WANT", 30, 64);
		Text.write("TO ERASE ?", 30, 84);
		Text.write("QUIT", 50, 190);

		// Draw char info
		for (let i = 0; i < 3; i++) {
			let char = this.char[i];

			if (char) {
				if (!this.showConfirm || this.yPosIndex === i) {
					// Draw name text
					Text.write(`${i + 1}.${char.charName}`, 50, POS[i]);
				}
			} else if (!this.showConfirm) {
				Text.write(`${i + 1}.`, 50, POS[i]);
			}
		}
		

		if (this.showConfirm) {
			// Draw fairy
			Context.drawImage(
				this.nameSelectSheet,
				150 + (19 * this.frameIndex),
				265,
				16,
				16,
				30,
				FINAL_POS[this.confirmIndex],
				16,
				16);

			Text.write("ERASE THIS PLAYER", 50, 170);
		}
	}
}