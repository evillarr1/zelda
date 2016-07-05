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
import SAT from "sat";
import MenuOverlay from "./MenuOverlay";

export default class Game {
	constructor() {
		// Preload this user for development
		window.Link = {
			charName: "Link",
			hearts: 3,
			slot: 999,
			bomb: 0,
			arrow: 0,
			rupee: 0
		};

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

		// Setup the Menu Overlay
		window.MenuOverlay = new MenuOverlay();
	}

	collision(type, collisions, unit, ...others) {
		switch (type) {
			case "UNIT":
				let [xPos, yPos, width, height] = others[0];
				let unitSat = new SAT.Box(new SAT.Vector(unit[0], unit[1]), unit[2], unit[3]).toPolygon();
				let otherSat = new SAT.Box(new SAT.Vector(xPos, yPos), width, height).toPolygon();
				let response = new SAT.Response();

				return !SAT.testPolygonPolygon(unitSat, otherSat, response) || this.unitCollision(collisions, response, others[0]);
		}
	}

	unitCollision(collisions, response, otherUnit) {
		if (response.overlapV.y > 0) {
			collisions.DOWN = {
				overlap: response.overlapV,
				coordinates: otherUnit
			};
		} else if (response.overlapV.y < 0) {
			collisions.UP = {
				overlap: response.overlapV,
				coordinates: otherUnit
			};
		} else if (response.overlapV.x > 0) {
			collisions.RIGHT = {
				overlap: response.overlapV,
				coordinates: otherUnit
			};
		} else if (response.overlapV.x < 0) {
			collisions.LEFT = {
				overlap: response.overlapV,
				coordinates: otherUnit
			};
		}
	}
}