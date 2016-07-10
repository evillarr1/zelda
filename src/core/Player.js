"use strict";

import Keyboard from "keyboardjs";
import Step from "./Actions/Step";
import Grab from "./Actions/Grab";
import Pull from "./Actions/Pull";
import Lift from "./Actions/Lift";

const DIRECTION = {
	UP: ["UP", "DOWN"],
	DOWN: ["DOWN", "UP"],
	LEFT: ["LEFT", "RIGHT"],
	RIGHT: ["RIGHT", "LEFT"]
};

const LIFT_WALKING = [0, 1, 6];

export default class Player {
	constructor() {
		// Links position, current action and direction he is facing
		this.xPos = 100;
		this.yPos = 100;
		this.direction = DIRECTION.DOWN[0];
		this.currentAction = "LINK_STANDING";

		// The objects for the current level
		this.mapObjects = {};

		// Keep track of collisions whether they be static or special (movable) objects
		this.collisions = new Map();
		this.specialCollisions = new Map();
		this.objectLifted = null;

		// Current key strokes
		this.currentStrokes = new Map();

		// Action counters
		this.pushCounter = 0;
		this.pullCounter = 0;
		this.liftCounter = 0;

		// Counter used to animate player's actions
		this.actionIndex = 0;

		// Special offsets needed for certain animations
		this.actionXOffset = 0;
		this.actionYOffset = 0;

		this.action = {
			"WALK": (new Step(this))._walk.bind(this),
			"GRAB": (new Grab(this))._grab.bind(this),
			"PULL": (new Pull(this))._pull.bind(this),
			"LIFT": (new Lift(this))._lift.bind(this)
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

		if (this.liftCounter <= 40) {
			if (!this.objectLifted && this.pullCounter > 0 && this.collisions.has(this.direction)) {
				if (this.specialCollisions.has(this.direction)) {
					let special = this.mapObjects.special;
					let keys = Object.keys(special);

					for (let i = 0; i < keys.length; i++) {
						if (this.specialCollisions.get(this.direction).prop[4] === special[keys[i]][4]) {
							this.objectLifted = this.mapObjects.special[keys[i]].slice(-1)[0];
							delete this.mapObjects.special[keys[i]];
							delete this.specialCollisions.get(this.direction);
							delete this.collisions.get(this.direction);
							this.liftCounter = 0;
							return;
						}
					}
				} else {
					return this.actions("GRAB", directions);
				}
			}

			if (this.objectLifted) {
				return this.actions("LIFT", directions);
			}
		} else {
			if (directions.length > 0) {
				return this.actions("LIFT_WALK", directions);
			}

		}

		if (this.currentStrokes.size === 0) {
			this.pushCounter = 0;
			return this.actions("STAND");
		}

		if (this.collisions.has(this.direction) && directions[0] === this.direction) {
			if (this.pushCounter++ > 30) {
				return this.actions("PUSH", directions);
			}
		} else {
			this.pushCounter = 0;
		}

		this.actions("STEP", directions);
	}

	actions(action, ...args) {
		switch (action) {
			case "STEP":
				this.action["WALK"](args[0]);
				this.actionIndex = (this.actionIndex + 1) % 14;
				this.currentAction = "LINK_WALKING_" + Math.floor(this.actionIndex / 2);
				break;
			case "PUSH":
				if (args[0][0] === "UP" || args[0][0] === "DOWN") {
					this.actionIndex = (this.actionIndex + 1) % 24;
				} else {
					this.actionIndex = (this.actionIndex + 1) % 32;
				}

				this.currentAction = "LINK_PUSHING_" + Math.floor(this.actionIndex / 8);
				break;
			case "STAND":
				this.currentAction = "LINK_STANDING";
				this.direction = args[0] || this.direction;
				break;
			case "GRAB":
				if (DIRECTION[this.direction][1] === args[0][0]) {
					// If the player if facing the opposite way he is facing, the pull
					this.action["PULL"]();
				} else {
					this.action["GRAB"]();
				}
				break;
			case "LIFT":
				this.action["LIFT"]();
				break;
			case "LIFT_WALK":
				this.action["WALK"](args[0], 0.8);
				this.actionIndex = (this.actionIndex + 1) % 17;
				this.currentAction = "LINK_WALKING_" + LIFT_WALKING[Math.floor(this.actionIndex / 6)];
				this.actionXOffset = this.actionYOffset = 0;
				this.action["LIFT"]();
				break;
			default:
				break;
		}
	}

	draw() {
		for (let objKey in this.mapObjects.special) {
			Paint.draw(...this.mapObjects.special[objKey].slice(-1)[0]);
		}

		Paint.draw(this.currentAction, this.direction, this.xPos + this.actionXOffset, this.yPos + this.actionYOffset, "link");
		this.actionXOffset = this.actionYOffset = 0;

		if (this.objectLifted) {
			Paint.draw(...this.objectLifted);
		}
	}

	postion(xPos, yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
	}
}