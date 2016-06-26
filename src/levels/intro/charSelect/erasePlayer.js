"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";
import SaveLoad from "../../../core/SaveLoad";

const POS = [110, 130, 150, 190];
const FINAL_POS = [170, 190];

export default class ErasePlayer {
	constructor(music) {
		// Create a new image for the name select screen
		this.charSelectSheet = new Image();
		this.charSelectSheet.src = "img/intro/charSelect/charSelect.png";
		this.showConfirm = false;
		this.music = music;

		// Keep track of fairy animation
		this.numOfFrames = 6;
		this.frames = 0;
		this.frameIndex = 0;
		this.yPosIndex = 0;
		this.confirmIndex = 0;

		this.loadState();

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
			if ([KeyCodes.Y, KeyCodes.B, KeyCodes.X, KeyCodes.A, KeyCodes.START].indexOf(event.keyCode) !== -1) {
				Sound.play("menu/select");

				// If the confirm dialogue is not displayed and a character slot is selected, display the confirm dialogue
				if (!this.showConfirm && this.yPosIndex !== this.fairyPositions.length - 1) {
					this.showConfirm = true;
				} else {
					// If the confirm dialogue is displayed and confirm is selected, then remove the player slot
					if (this.showConfirm && this.confirmIndex === 0) {
						SaveLoad.remove(this.chars[this.yPosIndex].slot);
					}

					// Return back to the previous screen
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
		this.fairyPositions = [];
		this.loadChars();
	}

	loadChars() {
		this.chars = [];

		// Load the save states
		for (let i = 0; i < 3; i++) {
			let char = SaveLoad.load(i);

			if (char) {
				this.chars.push(char);
				this.fairyPositions.push(POS[i]);
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
		Context.drawImage(this.charSelectSheet, 264, 1, Constants.GAME_WIDTH, Constants.GAME_HEIGHT, 0, 0, Constants.GAME_WIDTH, Constants.GAME_HEIGHT);

		Text.write("ERASE  PLAYER", 40, 23);
		Text.write("WHICH PLAYER DO YOU WANT", 30, 64);
		Text.write("TO ERASE ?", 30, 84);
		Text.write("QUIT", 50, 190);

		if (this.showConfirm) {
			Text.write("ERASE THIS PLAYER", 50, 170);
		}

		// Draw char info
		for (let i = 0, j = 0; i < 3; i++) {
			let char = this.chars[j];

			if (char && i === char.slot) {
				if (!this.showConfirm || this.yPosIndex === j) {
					// Draw name text
					Text.write(`${i + 1}.${char.charName}`, 50, POS[i]);

					// Draw hearts
					for (let k = 0; k < char.hearts; k++) {
						Context.drawImage(this.charSelectSheet, 266, 232, 8, 7, 150 + (k * 9), POS[i], 8, 7);
					}
				}

				j++;
			} else if (!this.showConfirm) {
				Text.write(`${i + 1}.`, 50, POS[i]);
			}
		}

		let fairyPos = !this.showConfirm ? this.fairyPositions[this.yPosIndex] : FINAL_POS[this.confirmIndex];

		// Draw fairy
		Context.drawImage(this.charSelectSheet, 150 + (19 * this.frameIndex), 265, 16, 16, 30, fairyPos, 16, 16);
	}
}