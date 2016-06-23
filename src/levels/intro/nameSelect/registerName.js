"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";

export default class RegisterName {
	constructor() {
		// Create a new image for the name select screen
		this.registerNameSheet = new Image();
		this.registerNameSheet.src = "img/intro/nameSelect/nameSelect.png";

		// Create the music element for the screen
		this.music = new Howl({
			urls: ["/music/intro/nameSelect/nameSelect.mp4"],
			autoplay: true,
			loop: true
		});
	}

	draw() {
		Context.clearRect(0, 0, Canvas.width, Canvas.height);

		// Draw the background
		Context.drawImage(
			this.registerNameSheet,
			165,
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
			0,
			185,
			158,
			13,
			41,
			39,
			158,
			13);

		// Draw letters
		Context.drawImage(
			this.registerNameSheet,
			0,
			0,
			151,
			47,
			31,
			126,
			151,
			47);

		// Draw letters
		Context.drawImage(
			this.registerNameSheet,
			80,
			67,
			70,
			13,
			111,
			176,
			70,
			13);
	}
}