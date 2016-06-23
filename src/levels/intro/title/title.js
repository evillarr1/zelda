"use strict";

import Constants from "../../../constants/Constants";

export default class Title {
	constructor(context) {
		this.context = context;

		// Create a new image for the title screen
		this.titleScreen = new Image();
		this.titleScreen.src = "img/intro/title/titleScreen.png";

		this.titleScreen.onload = () => {
			this.draw();
			this.playMusic();
		};
	}

	draw() {
		// Draw the background
		this.context.drawImage(
			this.titleScreen,
			0,
			0,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT,
			0,
			35,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT);

		// Draw the text and logo
		this.context.drawImage(
			this.titleScreen,
			Constants.GAME_WIDTH + 10,
			0,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT,
			20,
			35,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT);
	}

	playMusic() {
		this.audioElement = document.createElement("audio");
		this.audioElement.src = "/music/intro/title/title.mp4";
		this.audioElement.load();
		this.audioElement.play();
	}
}