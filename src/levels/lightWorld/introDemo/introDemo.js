"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";
import SaveLoad from "../../../core/SaveLoad";


export default class IntroDemo {
	constructor() {
		this.charSelectSheet = new Image();
		this.charSelectSheet.src = "/img/generic/houseInterior.png";

		// Create the music element for the screen
		this.music = new Howl({
			urls: ["/sounds/weather/wind.m4a"],
			autoplay: true,
			loop: true,
			volume: 0.6
		});

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
		};
	}

	draw() {
		Context.clearRect(0, 0, Canvas.width, Canvas.height);

		// Draw the background
		Context.drawImage(
			this.charSelectSheet,
			264,
			1,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT,
			0,
			0,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT);
	}
}