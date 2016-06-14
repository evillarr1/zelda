"use strict";

import Constants from "../../../assets/constants/Constants";

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
			Constants.GAME_HEIGHT + 80,
			0,
			0,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT);

		// Draw numbers
		this.context.drawImage(
			this.nameSelectScreen,
			0,
			248,
			40,
			100,
			70,
			40,
			40,
			70);

		// Draw copy/erase player text
		this.context.drawImage(
			this.nameSelectScreen,
			-10,
			215,
			120,
			40,
			35,
			108,
			120,
			30);

		// Draw player select text
		this.context.drawImage(
			this.nameSelectScreen,
			0,
			198,
			120,
			18,
			40,
			12,
			120,
			14);

		// Draw fairy
		this.context.drawImage(
			this.nameSelectScreen,
			40,
			248,
			20,
			40,
			22,
			16,
			20,
			40);
	}

	playMusic() {
		this.audioElement = document.createElement("audio");
		this.audioElement.src = "/music/intro/nameSelect/nameSelect.mp3";
		this.audioElement.load();
		this.audioElement.play();
	}
}