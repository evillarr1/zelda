"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";
import SaveLoad from "../../../core/SaveLoad";

const POS = [90, 120, 150, 190];
const SUB_POS = [[140, 100], [140, 120], [30, 190]];
const FINAL_POS = [170, 190];

export default class CopyPlayer {
	constructor(music) {
		// Create a new image for the name select screen
		this.charSelectSheet = new Image();
		this.charSelectSheet.src = "img/intro/charSelect/charSelect.png";
		this.showWhichWindow = false;
		this.showCopyOK = false;
		this.music = music;

		// Keep track of fairy animation
		this.numOfFrames = 6;
		this.frames = 0;
		this.frameIndex = 0;
		this.yPosIndex = 0;
		this.subYPosIndex = 0;
		this.confirmIndex = 0;
		this.textAnimationCount = 0;

		this.loadState();

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
			if ([KeyCodes.Y, KeyCodes.B, KeyCodes.X, KeyCodes.A, KeyCodes.START].indexOf(event.keyCode) !== -1) {
				Sound.play("menu/select");

				if (!this.showWhichWindow) {
					if (this.yPosIndex === this.fairyPositions.length - 1) {
						State.pop({
							dontPause: true
						});
					}
					this.showWhichWindow = true;
				} else if (this.showCopyOK) {
					if (this.confirmIndex === 0) {
						let stateIndex = [0, 1, 2];
						let state = this.chars[this.yPosIndex];

						stateIndex.splice(state.slot, 1);
						state.slot = stateIndex[this.subYPosIndex];
						SaveLoad.save(state, stateIndex[this.subYPosIndex]);
					}

					State.pop({
						dontPause: true
					});
				} else if (this.showWhichWindow) {
					if (this.subYPosIndex === 2) {
						State.pop({
							dontPause: true
						});
					} else {
						this.showCopyOK = true;
					}
				}
			} else if (event.keyCode === KeyCodes.DOWN) {
				Sound.play("menu/cursor");

				if (this.showCopyOK) {
					this.confirmIndex = (this.confirmIndex + 1) % FINAL_POS.length;
				} else if (this.showWhichWindow) {
					this.subYPosIndex = (this.subYPosIndex + 1) % SUB_POS.length;
				} else {
					this.yPosIndex = (this.yPosIndex + 1) % this.fairyPositions.length;
				}
			} else if (event.keyCode === KeyCodes.UP) {
				Sound.play("menu/cursor");

				if (this.showCopyOK) {
					this.confirmIndex = (this.confirmIndex - 1) < 0 ? FINAL_POS.length - 1 : this.confirmIndex - 1;
				} else if (this.showWhichWindow) {
					this.subYPosIndex = (this.subYPosIndex - 1) < 0 ? SUB_POS.length - 1 : this.subYPosIndex - 1;
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

		Text.write("COPY  PLAYER", 40, 23);
		Text.write("(WHICH?)", 30, 64);
		Text.write("QUIT", 50, 190);

		if (this.showCopyOK) {
			Text.write("COPY OK", 50, 170);
		}

		// Draw char info
		for (let i = 0, j = 0; i < 3; i++) {
			let char = this.chars[j];

			if (char && i === char.slot) {
				if (!this.showWhichWindow || this.yPosIndex === j) {
					// Draw name text
					Text.write(`${i + 1}. ${char.charName}`, 65, POS[i]);
				}

				j++;
			} else if (!this.showWhichWindow) {
				Text.write(`${i + 1}.`, 65, POS[i]);
			}
		}

		if (this.showWhichWindow) {
			// Show which window box
			Context.drawImage(this.charSelectSheet, 275, 225, 99, 77, 130, 70, 99, 77);

			if (this.textAnimationCount > 14) {
				Text.write("(TO WHICH?)", 137, 80);
			}

			// Draw char info inside which window
			for (let i = 0, j = 0, k = 0; i < 3; i++) {
				let char = this.chars[j];

				if (char) {
					if (i !== char.slot) {
						Text.write(`${i + 1}.`, 160, 102 + (k++ * 22), 6);
					} else {
						if (this.chars[this.yPosIndex].slot !== char.slot) {
							Text.write(`${i + 1}. ${char.charName}`, 160, 102 + (k++ * 22), 6);
						}

						j++;
					}
				} else {
					Text.write(`${i + 1}.`, 160, 102 + (k++ * 22), 6);
				}
			}
		}

		let fairyPositions;

		if (this.showCopyOK) {
			fairyPositions = [30, FINAL_POS[this.confirmIndex]];
		} else if (this.showWhichWindow) {
			fairyPositions = [SUB_POS[this.subYPosIndex][0], SUB_POS[this.subYPosIndex][1]];
		} else {
			fairyPositions = [30, this.fairyPositions[this.yPosIndex]];
		}

		// Draw fairy
		Context.drawImage(this.charSelectSheet, 150 + (19 * this.frameIndex), 265, 16, 16, fairyPositions[0], fairyPositions[1], 16, 16);
	}
}