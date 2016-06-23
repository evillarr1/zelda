"use strict";

import Constants from "../../../constants/Constants";

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
	}

	update() {

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
			43,
			272,
			16,
			16,
			30,
			70,
			16,
			16);
	}
}