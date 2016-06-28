"use strict";

import Intro from "../levels/intro/Intro";
import Mainloop from "mainloop.js";
import "howler";
import State from "./State";
import Sound from "./Sound";
import Text from "./Text";
import Structure from "./Structure"

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

		// Setup the game's state handler
		window.State = new State();

		// Setup the game's sound engine
		window.Sound = new Sound();

		// Setup the text engine
		window.Text = new Text();

		// Setup the structure engine
		window.Structure = new Structure();

		// Store the canvas/context elements on the window to make it available to every page
		window.Canvas = document.getElementById("canvas");
		window.Context = Canvas.getContext("2d");
	}
}