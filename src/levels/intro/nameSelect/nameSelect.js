"use strict";

import Constants from "../../../constants/Constants";

export default class NameSelect {
	constructor(context) {
		this.context = context;

		// Create a new image for the name select screen
		this.nameSelectScreen = new Image();
		this.nameSelectScreen.src = "img/intro/nameSelect/nameSelect.png";

		this.nameSelectScreen.onload = () => {
			this.draw();
			this.playMusic();
		};
	}

	draw() {
		// Draw the background
		this.context.drawImage(
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
		this.context.drawImage(
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
		this.context.drawImage(
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
		this.context.drawImage(
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
		this.context.drawImage(
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

	playMusic() {
		this.audioElement = document.createElement("audio");
		this.audioElement.src = "/music/intro/nameSelect/nameSelect.mp3";
		this.audioElement.load();
		this.audioElement.play();
	}
}