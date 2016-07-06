"use strict";

import Keyboard from "keyboardjs";

const DIRECTION = {
	UP: ["UP", "DOWN"],
	DOWN: ["DOWN", "UP"],
	LEFT: ["LEFT", "RIGHT"],
	RIGHT: ["RIGHT", "LEFT"]
};

export default class Player {
	constructor() {
		// Create a new image
		this.linkSheet = new Image();
		this.linkSheet.src = "img/link.png";

		this.xPos = 100;
		this.yPos = 100;
		this.direction = DIRECTION.DOWN[0];
		this.currentAction = "LINK_STANDING";

		this.collisions = {};

		// The objects for the current level
		this.mapObjects = {};

		// Current key strokes
		this.currentStrokes = new Map();

		// Action counters
		this.pushCounter = 0;
		this.pullCounter = 0;

		// Counter used to animate player's actions
		this.actionIndex = 0;

		// Special offsets needed for certain animations
		this.actionXOffset = 0;
		this.actionYOffset = 0;

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
			}, () => {
				this.pullCounter = 0;
				this.actionXOffset = 0;
				this.actionYOffset = 0;
			});
		});
	}

	update() {
		let directions = Array.from(this.currentStrokes.keys());

		if (this.pullCounter > 0) {
			if (this.collisions.hasOwnProperty(this.direction)) {
				this.action("GRAB", directions);
				return;
			}
		}

		if (directions.length === 1 && this.collisions.hasOwnProperty(directions[0])) {
			this.pushCounter++;
		} else {
			this.pushCounter = 0;
		}

		if (this.pushCounter > 30) {
			this.action("PUSH", directions);
		} else {
			this.action("STEP", directions);
		}

		if (this.currentStrokes.size === 0) {
			this.pushCounter = 0;
			this.action("STAND");
		}
	}

	action(action, ...args) {
		switch (action) {
			case "STEP":
				this.walk(args[0]);
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
				// If the player if facing the opposite way he is facing, the pull
				if (DIRECTION[this.direction][1] === args[0][0]) {
					this._pull();
				} else {
					this._grab();
				}
				break;
			default:
				break;
		}
	}

	draw() {
		Paint.draw(this.currentAction, this.direction, this.xPos + this.actionXOffset, this.yPos + this.actionYOffset, "link");
		this.actionXOffset = this.actionYOffset = 0;
	}

	postion(xPos, yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
	}

	walk(directions) {
		// Skip if no directions are passed in
		if (directions.length === 0) {
			return;
		}

		// Set the direction the player should be facing
		this.direction = directions[0];

		// Used to help calculate the precise position of link
		let len = {
			Y: Math.floor(this.yPos).toString().length + 1,
			X: Math.floor(this.xPos).toString().length + 1
		};

		let playerUnit = [this.xPos, this.yPos + 10, 16, 16];

		// Find the collisions and the offset of each
		this.collisions = {};
		this.mapObjects.static.forEach((otherUnit) => {
			Game.collision("UNIT", this.collisions, playerUnit, otherUnit);
		});
		this.mapObjects.movable.forEach((otherUnit) => {
			Game.collision("UNIT", this.collisions, playerUnit, otherUnit);
		});

		// Run at different speeds if more than one direction is triggered at the same time
		let pos = directions.length === 1 ? 1.5 : 1;

		// Move in the direction the user chooses, if no collisions are detected
		// If a valid movement, round the new position to the nearest position to two decimal points
		directions.forEach((direction) => {
			if (direction === "DOWN") {
				if (!this.collisions.DOWN) {
					this._moveDown(pos, len.Y);
				} else {
					let downCol = this.collisions.DOWN.coordinates;

					if (this.xPos < downCol[0] - 16 + (downCol[2] * 0.25)) {
						this._moveLeft(downCol[0], len.X, true, this.collisions.LEFT);
					} else if (this.xPos > downCol[0] + downCol[2] - (downCol[2] * 0.25)) {
						this._moveRight(downCol[0] + downCol[2], len.X, true, this.collisions.RIGHT);
					}
				}
			} else if (direction === "UP") {
				if (!this.collisions.UP) {
					this._moveUp(pos, len.Y);
				} else {
					let upCol = this.collisions.UP.coordinates;

					if (this.xPos < upCol[0] - 16 + (upCol[2] * 0.25)) {
						this._moveLeft(upCol[0], len.X, true, this.collisions.LEFT);
					} else if (this.xPos > upCol[0] + upCol[2] - (upCol[2] * 0.25)) {
						this._moveRight(upCol[0] + upCol[2], len.X, true, this.collisions.RIGHT);
					}
				}
			} else if (direction === "LEFT") {
				if (!this.collisions.LEFT) {
					this._moveLeft(pos, len.X);
				} else {
					let leftCol = this.collisions.LEFT.coordinates;

					if (this.yPos < leftCol[1] - 24 + (leftCol[3] * 0.25)) {
						this._moveUp(leftCol[1], len.Y, true, this.collisions.UP);
					} else if (this.yPos + 12 > leftCol[1] + leftCol[3] - (leftCol[3] * 0.25)) {
						this._moveDown(leftCol[1] + leftCol[3], len.Y, true, this.collisions.DOWN);
					}
				}
			} else if (direction === "RIGHT") {
				if (!this.collisions.RIGHT) {
					this._moveRight(pos, len.X);
				} else {
					let rightCol = this.collisions.RIGHT.coordinates;

					if (this.yPos < rightCol[1] - 24 + (rightCol[3] * 0.25)) {
						this._moveUp(rightCol[1], len.Y, true, this.collisions.UP);
					} else if (this.yPos + 12 > rightCol[1] + rightCol[3] - (rightCol[3] * 0.25)) {
						this._moveDown(rightCol[1] + rightCol[3], len.Y, true, this.collisions.DOWN);
					}
				}
			}
		});
	};

	_moveDown(pos, len, shouldTransform, direction) {
		if (shouldTransform) {
			this.pushCounter = 0;

			if (!direction || direction.overlap.y < 0.5) {
				this.yPos = pos + (Number((this.yPos - pos)) + .5);
			} else if (direction.overlap.y >= 0.5) {
				this.yPos = this.yPos + (direction.overlap.y / 5);
			}
		} else {
			this.yPos = Number((this.yPos + pos).toPrecision(len.Y));
		}
	}

	_moveUp(pos, len, shouldTransform, direction) {
		if (shouldTransform) {
			this.pushCounter = 0;

			if (!direction || direction.overlap.y < 0.5) {
				this.yPos = pos - (Number((pos - this.yPos)) + .5);
			} else if (direction.overlap.y >= 0.5) {
				this.yPos = this.yPos + (direction.overlap.y / 5);
			}
		} else {
			this.yPos = Number((this.yPos - pos).toPrecision(len.Y));
		}
	}

	_moveLeft(pos, len, shouldTransform, direction) {
		if (shouldTransform) {
			this.pushCounter = 0;

			if (!direction || direction.overlap.x < 0.5) {
				this.xPos = pos - (Number((pos - this.xPos)) + .5);
			} else if (direction.overlap.x >= 0.5) {
				this.xPos = this.xPos + (direction.overlap.x / 5);
			}
		} else {
			this.xPos = Number((this.xPos - pos).toPrecision(len.X));
		}
	}

	_moveRight(pos, len, shouldTransform, direction) {
		if (shouldTransform) {
			this.pushCounter = 0;

			if (!direction || direction.overlap.x < 0.5) {
				this.xPos = pos + (Number((this.xPos - pos)) + .5);
			} else if (direction.overlap.x >= 0.5) {
				this.xPos = this.xPos + (direction.overlap.x / 5);
			}
		} else {
			this.xPos = Number((this.xPos + pos).toPrecision(len.X))
		}
	}

	_grab() {
		let c = this.collisions[DIRECTION[this.direction][0]].coordinates;

		// Only grab if the player is not off the edge
		if (this.direction === "UP" || this.direction === "DOWN") {
			if ((this.xPos < c[0] - 6) || (this.xPos > c[0] + c[2] - 10)) {
				this.pullCounter = 0;

				return;
			}
		} else {
			if ((this.yPos < c[1] - 12) || (this.yPos > c[1] + c[3] - 22)) {
				this.pullCounter = 0;

				return;
			}
		}

		this.currentAction = "LINK_GRABBING";
		this.actionIndex = 0;

		if (this.direction === "LEFT") {
			this.actionXOffset = -2;
		} else if (this.direction === "UP") {
			this.actionYOffset = 4;
		} else if (this.direction === "DOWN") {
			this.actionYOffset = 4;
		}
	}

	_pull() {
		this.currentAction = "LINK_TUGGING_" + Math.floor(this.actionIndex / 8);
		this.actionIndex = (this.actionIndex + 1) % 24;

		if (this.direction === "LEFT") {
			this.actionXOffset = 2;
		} else if (this.direction === "UP") {
			this.actionYOffset = 5;
			this.actionXOffset = -7;
		} else if (this.direction === "DOWN") {
			this.actionXOffset = -7;
			this.actionYOffset = 3;
		} else if (this.direction === "RIGHT") {
			this.actionXOffset = -7;
		}
	}

	setLevelObjects(mapObjects) {
		this.mapObjects = mapObjects;
	};
}