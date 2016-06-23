"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";
import NameSelect from "../nameSelect/nameSelect";

export default class Title {
	constructor() {
		// Create a new image for the title screen
		this.titleSheet = new Image();
		this.titleSheet.src = "img/intro/title/title.png";

		// Create the music element for the screen
		this.music = new Howl({
			urls: ["/music/intro/title/title.mp4"],
			autoplay: true,
			loop: false
		});

		// Setup the keybindings
		this.keyboard = document.onkeydown = (event) => {
			if (event.keyCode === KeyCodes.Y) {
				let nameSelect = new NameSelect();

				State.pop();
				State.push(nameSelect);
			}
		};
	}

	draw() {
		Context.clearRect(0, 0, Canvas.width, Canvas.height);

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