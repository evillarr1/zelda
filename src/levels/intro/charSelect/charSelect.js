"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";
import RegisterName from "./registerName";
import Storage from "../../../core/Storage";
import CopyPlayer from "./copyPlayer";
import ErasePlayer from "./erasePlayer";
import LightWorld from "../../lightWorld/LightWorld";

const POS = [70, 100, 130, 175, 190];

export default class NameSelect {
	constructor() {
		// Create a new image
		this.charSelectSheet = new Image();
		this.charSelectSheet.src = "img/intro/charSelect/charSelect.png";
		this.linkSheet = new Image();
		this.linkSheet.src = "img/link.png";

		// Create the music element for the screen
		this.music = {
			"charSelect": new Howl({
				urls: ["/music/intro/charSelect/charSelect.mp4"],
				autoplay: true,
				loop: true,
				volume: 0.7
			})
		};

		this.loadState();

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
			if ([KeyCodes.Y, KeyCodes.B, KeyCodes.X, KeyCodes.A, KeyCodes.START].indexOf(event.keyCode) !== -1) {
				if (this.yPosIndex < 3) {
					Sound.play("menu/select");
					let newChar = Storage.load(this.yPosIndex);

					// Start the game if the user selects an already created state
					if (newChar) {
						State.pop();
						window.Link = newChar;

						new LightWorld();
					} else {
						let registerName = new RegisterName(this.music, this.yPosIndex);

						State.push(registerName);
					}
				} else {
					// If no characters are found then play the error sound
					if (this.chars.length === 0) {
						Sound.play("menu/error");
					} else {
						let newState;

						Sound.play("menu/select");

						// If characters are found then processed with the corresponding selected fielda
						if (this.yPosIndex === 3) {
							newState = new CopyPlayer(this.music);
						} else if (this.yPosIndex === 4) {
							newState = new ErasePlayer(this.music);
						}

						State.push(newState);
					}
				}
			} else if (event.keyCode === KeyCodes.DOWN) {
				Sound.play("menu/cursor");
				this.yPosIndex = (this.yPosIndex + 1) % POS.length;
			} else if (event.keyCode === KeyCodes.UP) {
				Sound.play("menu/cursor");
				if (--this.yPosIndex < 0) {
					this.yPosIndex = POS.length - 1;
				}
			}
		};
	}

	loadState() {
		// Keep track of fairy animation
		this.numOfFrames = 6;
		this.frames = 0;
		this.frameIndex = 0;

		// Keep track of cursor
		this.yPosIndex = 0;

		this.loadChars();
	}

	loadChars() {
		this.chars = [];

		// Load the save states
		for (let i = 0; i < 3; i++) {
			let char = Storage.load(i);

			if (char) {
				this.chars.push(char);
			}
		}
	}

	update() {
		this.animateFairy();
	}

	// Modify fairy animate
	animateFairy() {
		this.frames++;

		if (this.frames > this.numOfFrames) {
			this.frameIndex = this.frameIndex === 1 ? 0 : 1;
			this.frames = 0;
		}
	}

	draw() {
		// Clear screen
		Context.clearRect(0, 0, Canvas.width, Canvas.height);

		// Draw the background
		Context.drawImage(this.charSelectSheet, 264, 1, Constants.GAME_WIDTH, Constants.GAME_HEIGHT, 0, 0, Constants.GAME_WIDTH, Constants.GAME_HEIGHT);

		// Draw numbers
		Context.drawImage(this.charSelectSheet, 226, 229, 12, 78, 80, 70, 12, 78);

		// Draw copy/erase player text
		Context.drawImage(this.charSelectSheet, 3, 261, 94, 30, 54, 174, 94, 30);

		// Draw player select text
		Context.drawImage(this.charSelectSheet, 3, 245, 111, 13, 40, 24, 111, 13);

		// Draw fairy
		Context.drawImage(this.charSelectSheet, 150 + (19 * this.frameIndex), 265, 16, 16, 30, POS[this.yPosIndex], 16, 16);

		// Draw char info
		for (let i = 0; i < this.chars.length; i++) {
			let char = this.chars[i];

			// Draw Link
			Context.drawImage(this.linkSheet, 907, 0, 16, 21, 60, POS[char.slot] - (this.chars.length - char.slot), 16, 21);

			// Draw hearts
			for (let j = 0; j < char.hearts; j++) {
				Context.drawImage(this.charSelectSheet, 266, 232, 8, 7, 150 + (j * 9), POS[char.slot] + (char.slot * 2), 8, 7);
			}

			// Draw name text
			Text.write(char.charName, 100, POS[char.slot] + (char.slot * 2));
		}
	}
}