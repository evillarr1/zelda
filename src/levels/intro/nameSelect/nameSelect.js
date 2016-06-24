"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";
import RegisterName from "./registerName";

const pos = [70, 100, 130, 175, 190];

export default class NameSelect {
	constructor() {
		// Create a new image for the name select screen
		this.nameSelectSheet = new Image();
		this.nameSelectSheet.src = "img/intro/nameSelect/nameSelect.png";

		// Create the music element for the screen
		this.music = new Howl({
			urls: ["/music/intro/nameSelect/nameSelect.mp4"],
			autoplay: true,
			loop: true
		});

		// Keep track of fairy animation
		this.numOfFrames = 6;
		this.frames = 0;
		this.frameIndex = 0;

		this.yPosIndex = 0;

		// Setup the keybindings
		this.keyboard = document.onkeydown = (event) => {
			if ([KeyCodes.Y, KeyCodes.B, KeyCodes.X, KeyCodes.A, KeyCodes.START].indexOf(event.keyCode) !== -1) {
				let registerName = new RegisterName();

				State.pop();
				State.push(registerName);
			} else if (event.keyCode === KeyCodes.DOWN) {
				this.yPosIndex = (this.yPosIndex + 1) % pos.length;
			} else if (event.keyCode === KeyCodes.UP) {
				if (--this.yPosIndex < 0) {
					this.yPosIndex = pos.length - 1;
				}
			}
		};
	}

	// Modify fairy animate
	update() {
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
			166,
			231,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT,
			0,
			0,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT);

		// Draw numbers
		Context.drawImage(
			this.nameSelectSheet,
			0,
			257,
			12,
			78,
			80,
			70,
			12,
			78);

		// Draw copy/erase player text
		Context.drawImage(
			this.nameSelectSheet,
			0,
			217,
			94,
			30,
			54,
			174,
			94,
			30);

		// Draw player select text
		Context.drawImage(
			this.nameSelectSheet,
			0,
			201,
			111,
			13,
			40,
			24,
			111,
			13);

		// Draw fairy
		Context.drawImage(
			this.nameSelectSheet,
			43 + (19 * this.frameIndex),
			273,
			16,
			16,
			30,
			pos[this.yPosIndex],
			16,
			16);
	}
}