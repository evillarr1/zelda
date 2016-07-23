"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";
import NameSelect from "../charSelect/charSelect";

export default class Title {
	constructor() {
		// Create a new image
		this.titleSheet = new Image();
		this.titleSheet.src = "img/intro/title/title.png";

		// Create the music element for the screen
		this.music = {
			"title": new Howl({
				src: ["/music/intro/title/title.mp4"],
				autoplay: true,
				loop: false
			})
		};

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
			if (event.keyCode === KeyCodes.Y) {
				State.popAndPush(new NameSelect());
			}
		};
	}

	draw() {
		// Draw the background
		Context.drawImage(
			this.titleSheet,
			0,
			0,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT,
			0,
			35,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT);

		// Draw the text and logo
		Context.drawImage(
			this.titleSheet,
			288,
			6,
			169,
			139,
			40,
			40,
			169,
			139);
	}
}