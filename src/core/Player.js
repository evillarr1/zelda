"use strict";

import Keyboard from "keyboardjs";
import Walk from "./Actions/Walk";
import Grab from "./Actions/Grab";
import Pull from "./Actions/Pull";
import Lift from "./Actions/Lift";
import Push from "./Actions/Push";
import Stand from "./Actions/Stand";
import LiftWalk from "./Actions/LiftWalk";

const DIRECTION = {
	UP: ["UP", "DOWN"],
	DOWN: ["DOWN", "UP"],
	LEFT: ["LEFT", "RIGHT"],
	RIGHT: ["RIGHT", "LEFT"]
};

export default class Player {
	constructor() {
		this.npc = "LINK";

		// Links position, current action and direction he is facing
		this.xPos = 100;
		this.yPos = 100;
		this.direction = DIRECTION.DOWN[0];
		this.currentAction = "STANDING";

		// Check if Link is allowed displacement of camera
		this.disableDisplacementX = false;
		this.disableDisplacementY = false;


		// The objects for the current level
		this.mapObjects = {};

		// Keep track of collisions whether they be static or special (movable) objects
		this.collisions = new Map();
		this.specialCollisions = new Map();
		this.objectLifted = null;

		// Current key strokes
		this.currentStrokes = new Map();

		// Action counters
		this.pullCounter = 0;
		this.liftCounter = 0;

		// Counter used to animate player's actions
		this.actionIndex = 0;

		// Special offsets needed for certain animations
		this.actionXOffset = 0;
		this.actionYOffset = 0;

		// Counteract xPos and yPos for Link, and move camera of current map
		this.disabledX = 0;
		this.disabledY = 0;

		// Values that can be passed after Walk is done
		this.holdX = 0;
		this.holdY = 0;

		this.action = {
			"GRAB": new Grab(this),
			"PULL": new Pull(this),
			"LIFT": new Lift(this),
			"LIFTWALK": new LiftWalk(this),
			"PUSH": new Push(this),
			"STAND": new Stand(this),
			"WALK": new Walk(this)
		};

		Keyboard.withContext("Player", () => {
			Keyboard.bind(["down"], (event) => {
				event.preventRepeat();

				this.currentStrokes.delete("UP");
				this.currentStrokes.set("DOWN", true);
			}, () => {
				this.currentStrokes.delete("DOWN");
			});

			Keyboard.bind("up", (event) => {
				event.preventRepeat();

				this.currentStrokes.delete("DOWN");
				this.currentStrokes.set("UP", true);
			}, () => {
				this.currentStrokes.delete("UP");
			});

			Keyboard.bind("right", (event) => {
				event.preventRepeat();

				this.currentStrokes.delete("LEFT");
				this.currentStrokes.set("RIGHT", true);
			}, () => {
				this.currentStrokes.delete("RIGHT");
			});

			Keyboard.bind("left", (event) => {
				event.preventRepeat();

				this.currentStrokes.delete("RIGHT");
				this.currentStrokes.set("LEFT", true);
			}, () => {
				this.currentStrokes.delete("LEFT");
			});

			Keyboard.bind("d", (event) => {
				event.preventRepeat();

				this.pullCounter = 1;
				this.liftCounter = 0;
				this.objectLifted = null;
			}, () => {
				this.pullCounter = 0;
				this.actionXOffset = 0;
				this.actionYOffset = 0;
			});
		});
	}

	setLevelObjects(mapObjects) {
		this.mapObjects = mapObjects;
	};

	update() {
		let directions = Array.from(this.currentStrokes.keys());

		// Once you find the action that needs to be performed stop the loop 
		for (let objKey in this.action) {
			if (this.action[objKey].update(directions)) {
				return;
			}
		}

		// If link runs off the map, then trigger the OFFMAP event to trigger location change.
		if (this.yPos >= 210) {
			let newEvent = this.createEventDetails();

			Canvas.dispatchEvent(newEvent);
		}
	}

	actions(action, ...args) {
		switch (action) {
			case "WALK":
				this.action["WALK"].perform(args[0]);
				break;
			case "PUSH":
				this.action["PUSH"].perform(args[0][0]);
				break;
			case "STAND":
				this.action["STAND"].perform(args);
				break;
			case "GRAB":
				if (DIRECTION[this.direction][1] === args[0][0]) {
					// If the player if facing the opposite way he is facing, the pull
					this.action["PULL"].perform();
				} else {
					this.action["GRAB"].perform();
				}
				break;
			case "LIFT":
				this.action["LIFT"].perform();
				break;
			case "LIFTWALK":
				this.action["LIFTWALK"].perform(args[0]);
				break;
			default:
				console.error(`${action} NOT A SUPPORTED ACTION`);
				break;
		}
	}

	draw() {
		for (let objKey in this.mapObjects.special) {
			Paint.draw(...this.mapObjects.special[objKey].slice(-1)[0]);
		}
		if (this.disableDisplacementX) {
			this.disabledX += this.holdX;
		}
		if (this.disableDisplacementY) {
			this.disabledY += this.holdY;
		}
		Paint.draw(this.currentAction, this.direction, this.xPos + this.actionXOffset - this.disabledX,
			this.yPos + this.actionYOffset - this.disabledY, "link", "LINK");
		this.actionXOffset = this.actionYOffset = this.holdX = this.holdY = 0;
		if (this.objectLifted) {
			Paint.draw(...this.objectLifted);
		}
	}

	setPosition(xPos, yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
	}

	createEventDetails()  {
		return new CustomEvent('OFFMAP', {
				detail: {
					pos: [this.xPos, this.yPos],
					direction: this.direction
				}
			}
		)
	}
}