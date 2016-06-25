"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";
import RegisterName from "./registerName";
import SaveLoad from "../../../core/SaveLoad";

const POS = [70, 100, 130, 175, 190];

export default class NameSelect {
	constructor() {
		// Create a new image for the name select screen
		this.nameSelectSheet = new Image();
		this.nameSelectSheet.src = "img/intro/charSelect/charSelect.png";
		this.linkSheet = new Image();
		this.linkSheet.src = "img/link.png";

		// Create the music element for the screen
		this.music = new Howl({
			urls: ["/music/intro/charSelect/charSelect.mp4"],
			autoplay: true,
			loop: true
		});

		// Keep track of fairy animation
		this.numOfFrames = 6;
		this.frames = 0;
		this.frameIndex = 0;
		this.yPosIndex = 0;

		this.char = [];

		// Load the save states
		for (let i = 0; i < 3; i++) {
			this.char.push(SaveLoad.load(i));
		}

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
			if ([KeyCodes.Y, KeyCodes.B, KeyCodes.X, KeyCodes.A, KeyCodes.START].indexOf(event.keyCode) !== -1) {
				if (this.yPosIndex < 3) {
					let registerName = new RegisterName(this.music, this.yPosIndex);
					let options = {
						keepMusic: true
					};

					Sound.play("menu/select");
					State.pop(options);
					State.push(registerName);
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

		// Draw numbers
		Context.drawImage(
			this.nameSelectSheet,
			226,
			229,
			12,
			78,
			80,
			70,
			12,
			78);

		// Draw copy/erase player text
		Context.drawImage(
			this.nameSelectSheet,
			3,
			261,
			94,
			30,
			54,
			174,
			94,
			30);

		// Draw player select text
		Context.drawImage(
			this.nameSelectSheet,
			3,
			245,
			111,
			13,
			40,
			24,
			111,
			13);

		// Draw fairy
		Context.drawImage(
			this.nameSelectSheet,
			150 + (19 * this.frameIndex),
			265,
			16,
			16,
			30,
			POS[this.yPosIndex],
			16,
			16);

		// Draw char info
		for (let i = 0; i < 3; i++) {
			let char = this.char[i];

			if (char) {
				// Draw Link
				Context.drawImage(
					this.linkSheet,
					907,
					0,
					16,
					21,
					60,
					POS[i] - (this.char.length - i),
					16,
					21);

				// Draw hearts
				for (let j = 0; j < char.hearts; j++) {
					Context.drawImage(
						this.nameSelectSheet,
						266,
						232,
						8,
						7,
						150 + (j * 9),
						POS[i] + (i * 2),
						8,
						7);
				}

				// Draw text
				Text.write(char.charName, 100, POS[i] + (i * 2));
			}
		}
	}
}