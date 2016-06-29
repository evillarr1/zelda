"use strict";

import Intro from "../levels/lightWorld/LightWorld.js";
import Mainloop from "mainloop.js";
import "howler";
import State from "./State";
import Sound from "./Sound";
import Text from "./Text";
import Structure from "./Structure"
import Animate from "./Animate";

export default class Game {
	constructor() {
		this.configure();
		new Intro();
	}

	configure() {
		// Store the canvas/context elements on the window to make it available to every page
		window.Canvas = document.getElementById("canvas");
		window.CanvasMask = document.getElementById("canvas-mask");
		window.Context = Canvas.getContext("2d");
		window.ContextMask = CanvasMask.getContext("2d");

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

		// Setup the text service
		window.Text = new Text();

		// Setup the structure service
		window.Structure = new Structure();

		// Setup the animation service
		window.Animate = new Animate();
	}
}