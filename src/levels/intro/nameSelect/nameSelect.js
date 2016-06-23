"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";

export default class NameSelect {
	constructor() {
		// Create a new image for the name select screen
		this.nameSelectScreen = new Image();
		this.nameSelectScreen.src = "img/intro/nameSelect/nameSelect.png";

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

		// Setup the keybindings
		this.keyboard = document.onkeydown = (event) => {
			if (event.keyCode === KeyCodes.A) {

			} else if (event.keyCode === KeyCodes.DOWN) {

			} else if (event.keyCode === KeyCodes.UP) {

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
			this.nameSelectScreen,
			165,
			230,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT,
			0,
			0,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT);

		// Draw numbers
		Context.drawImage(
			this.nameSelectScreen,
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
			this.nameSelectScreen,
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
			this.nameSelectScreen,
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
			this.nameSelectScreen,
			43 + (19 * this.frameIndex),
			273,
			16,
			16,
			30,
			70,
			16,
			16);
	}
}