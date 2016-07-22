"use strict";

import Walk from "./Actions/Walk";
import Stand from "./Actions/Stand";

const DIRECTION = {
	UP: ["UP", "DOWN"],
	DOWN: ["DOWN", "UP"],
	LEFT: ["LEFT", "RIGHT"],
	RIGHT: ["RIGHT", "LEFT"]
};

export default class Player {
	constructor(npc) {
		this.npc = npc;

		// Npcs position, current action and direction he is facing
		this.xPos = 100;
		this.yPos = 100;
		this.direction = DIRECTION.DOWN[0];
		this.currentAction = "STANDING";

		// Check if npc is allowed displacement of camera
		this.disableDisplacementX = false;
		this.disableDisplacementY = false;

		// The objects for the current level
		this.mapObjects = {};

		// Keep track of collisions whether they be static or special (movable) objects
		this.collisions = new Map();

		// Current key strokes
		this.currentStrokes = new Map();

		// Counter used to animate player's actions
		this.actionIndex = 0;

		// Special offsets needed for certain animations
		this.actionXOffset = 0;
		this.actionYOffset = 0;

		// Counteract xPos and yPos for npc, and move camera of current map
		this.disabledX = 0;
		this.disabledY = 0;

		// Values that can be passed after Walk is done
		this.holdX = 0;
		this.holdY = 0;

		this.action = {
			"STAND": new Stand(this),
			"WALK": new Walk(this)
		};
	}

	setLevelObjects(mapObjects) {
		this.mapObjects = mapObjects;
	};

	update() {
		// Once you find the action that needs to be performed stop the loop 
		for (let objKey in this.action) {
			if (this.action[objKey].update(directions)) {
				return;
			}
		}
	}

	actions(action, ...args) {
		switch (action) {
			case "WALK":
				this.action["WALK"].perform(args[0]);
				break;
			case "STAND":
				this.action["STAND"].perform(args);
				break;
			default:
				console.error(`${action} NOT A SUPPORTED ACTION`);
				break;
		}
	}

	setCurrentAction(currentAction, direction) {
		this.currentAction = currentAction;
		this.direction = direction || this.direction;
	}

	draw() {
		if (this.disableDisplacementX) {
			this.disabledX += this.holdX;
		}
		if (this.disableDisplacementY) {
			this.disabledY += this.holdY;
		}
		Paint.draw(this.currentAction, this.direction, this.xPos + this.actionXOffset - this.disabledX, this.yPos + this.actionYOffset - this.disabledY, "npc", "UNCLE");

		this.actionXOffset = this.actionYOffset = this.holdX = this.holdY = 0;
	}

	setPosition(xPos, yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
	}
}