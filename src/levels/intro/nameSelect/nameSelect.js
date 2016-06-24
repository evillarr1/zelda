"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";
import RegisterName from "./registerName";

const pos = [70, 100, 130, 175, 190];

export default class NameSelect {
	constructor() {
		// Create a new image for the name select screen
		this.nameSelectSheet = new Image();
		this.nameSelectSheet.src = "img/intro/nameSelect/nameSelect.png";

		// Create the music element for the screen
		this.music = new Howl({
			urls: ["/music/intro/nameSelect/nameSelect.mp4"],
			autoplay: true,
			loop: true
		});

		let menuSelect = new Howl({
			urls: ["/sounds/menuSelect.mp4"]
		});

		// Keep track of fairy animation
		this.numOfFrames = 6;
		this.frames = 0;
		this.frameIndex = 0;
		this.yPosIndex = 0;

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
			if ([KeyCodes.Y, KeyCodes.B, KeyCodes.X, KeyCodes.A, KeyCodes.START].indexOf(event.keyCode) !== -1) {
				let registerName = new RegisterName(this.music);
				let options = {
					keepMusic: true
				};

				menuSelect.play();
				State.pop(options);
				State.push(registerName);
			} else if (event.keyCode === KeyCodes.DOWN) {
				this.yPosIndex = (this.yPosIndex + 1) % pos.length;
			} else if (event.keyCode === KeyCodes.UP) {
				if (--this.yPosIndex < 0) {
					this.yPosIndex = pos.length - 1;
				}
			}
		};
	}

	update() {
		this.animateFairy();
	}

	// Modify fairy animate
	animateFairy() {
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
			this.nameSelectSheet,
			264,
			1,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT,
			0,
			0,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT);

		// Draw numbers
		Context.drawImage(
			this.nameSelectSheet,
			226,
			229,
			12,
			78,
			80,
			70,
			12,
			78);

		// Draw copy/erase player text
		Context.drawImage(
			this.nameSelectSheet,
			3,
			261,
			94,
			30,
			54,
			174,
			94,
			30);

		// Draw player select text
		Context.drawImage(
			this.nameSelectSheet,
			3,
			245,
			111,
			13,
			40,
			24,
			111,
			13);

		// Draw fairy
		Context.drawImage(
			this.nameSelectSheet,
			150 + (19 * this.frameIndex),
			265,
			16,
			16,
			30,
			pos[this.yPosIndex],
			16,
			16);
	}
}