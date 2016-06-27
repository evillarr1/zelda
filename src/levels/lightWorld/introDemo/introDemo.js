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
		this.leftWall();
		this.bottomWall();
		this.topWall();
	}

	topWall() {
		// Draw left wall
		Context.drawImage(
			this.charSelectSheet,
			24,
			88,
			16,
			24,
			24,
			28,
			16,
			24);

		Context.drawImage(
			this.charSelectSheet,
			24,
			88,
			16,
			24,
			40,
			28,
			16,
			24);

		Context.drawImage(
			this.charSelectSheet,
			24,
			88,
			16,
			24,
			56,
			28,
			16,
			24);

		Context.drawImage(
			this.charSelectSheet,
			24,
			88,
			16,
			24,
			72,
			28,
			16,
			24);

		Context.drawImage(
			this.charSelectSheet,
			24,
			88,
			16,
			24,
			88,
			28,
			16,
			24);

		Context.drawImage(
			this.charSelectSheet,
			24,
			88,
			16,
			24,
			104,
			28,
			16,
			24);

		Context.drawImage(
			this.charSelectSheet,
			24,
			88,
			16,
			24,
			120,
			28,
			16,
			24);

		Context.drawImage(
			this.charSelectSheet,
			24,
			88,
			16,
			24,
			136,
			28,
			16,
			24);

		Context.drawImage(
			this.charSelectSheet,
			24,
			88,
			16,
			24,
			152,
			28,
			16,
			24);

		Context.drawImage(
			this.charSelectSheet,
			24,
			88,
			16,
			24,
			168,
			28,
			16,
			24);

		Context.drawImage(
			this.charSelectSheet,
			24,
			88,
			16,
			24,
			184,
			28,
			16,
			24);

		// Draw edges
		Context.drawImage(
			this.charSelectSheet,
			190,
			216,
			24,
			24,
			0,
			28,
			24,
			24);

		Context.drawImage(
			this.charSelectSheet,
			215,
			216,
			24,
			24,
			200,
			28,
			24,
			24);

		// Draw items
		Context.drawImage(
			this.charSelectSheet,
			89,
			164,
			16,
			16,
			48,
			28,
			16,
			16);

		Context.drawImage(
			this.charSelectSheet,
			351,
			25,
			48,
			32,
			88,
			28,
			48,
			32);

		Context.drawImage(
			this.charSelectSheet,
			48,
			48,
			32,
			32,
			152,
			28,
			32,
			32);
	}

	leftWall() {
		// Draw left wall
		Context.drawImage(
			this.charSelectSheet,
			0,
			112,
			24,
			16,
			0,
			52,
			24,
			16);

		Context.drawImage(
			this.charSelectSheet,
			0,
			112,
			24,
			16,
			0,
			68,
			24,
			16);

		Context.drawImage(
			this.charSelectSheet,
			0,
			112,
			24,
			16,
			0,
			84,
			24,
			16);


		Context.drawImage(
			this.charSelectSheet,
			0,
			112,
			24,
			16,
			0,
			100,
			24,
			16);

		Context.drawImage(
			this.charSelectSheet,
			0,
			112,
			24,
			16,
			0,
			134,
			24,
			16);

		Context.drawImage(
			this.charSelectSheet,
			0,
			112,
			24,
			16,
			0,
			150,
			24,
			16);

		Context.drawImage(
			this.charSelectSheet,
			0,
			112,
			24,
			16,
			0,
			166,
			24,
			16);

		Context.drawImage(
			this.charSelectSheet,
			0,
			112,
			24,
			16,
			0,
			182,
			24,
			16);

		// Draw edges
		Context.drawImage(
			this.charSelectSheet,
			166,
			217,
			24,
			24,
			0,
			28,
			24,
			24);

		Context.drawImage(
			this.charSelectSheet,
			166,
			242,
			24,
			24,
			0,
			198,
			24,
			24);

		// Draw items
		Context.drawImage(
			this.charSelectSheet,
			75,
			101,
			24,
			32,
			0,
			108,
			24,
			32);
	}

	bottomWall() {
		// Draw left wall
		Context.drawImage(
			this.charSelectSheet,
			190,
			243,
			24,
			24,
			0,
			198,
			24,
			24);
	}
}