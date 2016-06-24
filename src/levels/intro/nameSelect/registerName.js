"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";

const pos = [132, 148, 164, 180];

export default class RegisterName {
	constructor(music) {
		// Create a new image for the name select screen
		this.registerNameSheet = new Image();
		this.registerNameSheet.src = "img/intro/nameSelect/nameSelect.png";

		// This page depends on music from the previous page
		this.music = music;

		this.barIndex = 0;

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
			if (event.keyCode === KeyCodes.DOWN && this.barIndex < pos.length - 1) {
				this.barIndex++;
			} else if (event.keyCode === KeyCodes.UP && this.barIndex > 0) {
				this.barIndex--;
			} else if (event.keyCode === KeyCodes.LEFT) {

			} else if (event.keyCode === KeyCodes.RIGHT) {

			}
		};
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
			5,
			325,
			200,
			62,
			31,
			126,
			200,
			62);

		// Draw horizontal bar
		Context.drawImage(
			this.registerNameSheet,
			263,
			227,
			208,
			1,
			23,
			pos[this.barIndex],
			208,
			1);
	}
}