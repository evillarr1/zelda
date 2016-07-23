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
		window.Game = this;

		this.updateList = [];
		this.drawList = [];

		this.configure();

		// Uncomment if developing
		//this.development();

		new Intro();
	}

	development() {
		// Preload this user for development
		window.Link = {
			charName: "Link",
			hearts: 3,
			slot: 999,
			bomb: 0,
			arrow: 0,
			rupee: 0
		};

		window.Game.addUpdate(window.MenuOverlay);
		window.Game.addDraw(window.MenuOverlay);
	}

	configure() {
		// Store the canvas/context elements on the window to make it available to every page
		window.Canvas = document.getElementById("canvas");
		window.CanvasMask = document.getElementById("canvas-mask");
		window.Context = Canvas.getContext("2d");
		window.ContextMask = CanvasMask.getContext("2d");

		// Setup the games main loop
		window.MainLoop = Mainloop
			.setUpdate(() => this.mainUpdate())
			.setDraw(() => this.mainDraw())
			.start();

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
			collisions.set("DOWN", {
				overlap: response.overlapV,
				prop: otherUnit
			});
		} else if (response.overlapV.y < 0) {
			collisions.set("UP", {
				overlap: response.overlapV,
				prop: otherUnit
			});
		} else if (response.overlapV.x > 0) {
			collisions.set("RIGHT", {
				overlap: response.overlapV,
				prop: otherUnit
			});
		} else if (response.overlapV.x < 0) {
			collisions.set("LEFT", {
				overlap: response.overlapV,
				prop: otherUnit
			});
		}
	}

	mainUpdate() {
		let lastState = window.State.peek();

		if (lastState && lastState.update) {
			lastState.update();
		}

		this.updateList.forEach((item) => item.globalUpdate());
	}

	mainDraw() {
		let lastState = window.State.peek();

		if (lastState) {
			Context.clearRect(0, 0, Canvas.width, Canvas.height);
			lastState.draw();
		}
		this.drawList.forEach((item) => item.globalDraw());
	}

	addDraw(item) {
		this.drawList.push(item);
	}

	addUpdate(item) {
		this.updateList.push(item);
	}
}