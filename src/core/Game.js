"use strict";

import Intro from "../levels/intro/Intro.js";
import Mainloop from "mainloop.js";
import "howler";
import State from "./State";
import Sound from "./Sound";
import Text from "./Text";
import Paint from "./Paint"
import Animate from "./Animate";
import Player from "./Player";

export default class Game {
	constructor() {
		this.configure();
		new Intro();

		// Preload this user for development
		window.Link = {
			charName: "Link",
			hearts: 3,
			slot: 999
		}
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

		// Setup the sound service
		window.Sound = new Sound();

		// Setup the text service
		window.Text = new Text();

		// Setup the Paint service
		window.Paint = new Paint();

		// Setup the animation service
		window.Animate = new Animate();

		// Setup character/npc service
		window.Player = new Player();
	}
}