"use strict";

import Intro from "../levels/intro/Intro";
import Mainloop from "mainloop.js";
import "howler";
import State from "./State";

export default class Game {
	constructor() {
		this.configure();
		new Intro();
	}

	configure() {
		// Setup the games main loop
		window.MainLoop = Mainloop.setUpdate(() => {
			let lastState = window.State.peek();

			if (lastState && lastState.update) {
				lastState.update();
			}
		}).setDraw(() => {
			let lastState = window.State.peek();

			if (lastState) {
				lastState.draw();
			}
		}).start();

		// Setup the games state handler
		window.State = new State();

		// Store the canvas/context elements on the window to make it available to every page
		window.Canvas = document.getElementById("canvas");
		window.Context = Canvas.getContext("2d");
	}
}