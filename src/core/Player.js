"use strict";

const DIRECTION = {
	UP: "UP",
	DOWN: "DOWN",
	LEFT: "LEFT",
	RIGHT: "RIGHT"
};

export default class Player {
	constructor() {
		// Create a new image
		this.linkSheet = new Image();
		this.linkSheet.src = "img/link.png";

		this.xPos = 100;
		this.yPos = 100;
		this.direction = DIRECTION.DOWN;
		this.walkingIndex = 0;
		this.currentAction = "LINK_STANDING";
		this.mapObjects = {};
	}

	action(action, ...args) {
		switch (action) {
			case "STEP":
				this.currentAction = `LINK_WALKING_${Math.floor(this.walkingIndex / 2)}`;
				this.walk(args[0]);
				this.walkingIndex = (this.walkingIndex + 1) % 14;
				break;
			case "STAND":
				this.currentAction = "LINK_STANDING";
				this.direction = args[0] || this.direction;
				break;
			default:
				break;
		}
	}

	draw() {
		Paint.draw(this.currentAction, this.direction, this.xPos, this.yPos, "link");
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
		let collisions = {};
		this.mapObjects.static.forEach((otherUnit) => {
			Game.collision("UNIT", collisions, playerUnit, otherUnit);
		});
		this.mapObjects.movable.forEach((otherUnit) => {
			Game.collision("UNIT", collisions, playerUnit, otherUnit);
		});

		// Run at different speeds if more than one direction is triggered at the same time
		let pos = directions.length === 1 ? 1.5 : 1;

		// Move in the direction the user chooses, if no collisions are detected
		// If a valid movement, round the new position to the nearest position to two decimal points
		directions.forEach((direction) => {
			if (direction === "DOWN") {
				if (!collisions.DOWN) {
					this._moveDown(pos, len.Y);
				} else {
					let downCol = collisions.DOWN.coordinates;

					if (this.xPos < downCol[0] - 16 + (downCol[2] * 0.25)) {
						this._moveLeft(downCol[0], len.X, true, collisions.LEFT);
					} else if (this.xPos > downCol[0] + downCol[2] - (downCol[2] * 0.25)) {
						this._moveRight(downCol[0] + downCol[2], len.X, true, collisions.RIGHT);
					}
				}
			} else if (direction === "UP") {
				if (!collisions.UP) {
					this._moveUp(pos, len.Y);
				} else {
					let upCol = collisions.UP.coordinates;

					if (this.xPos < upCol[0] - 16 + (upCol[2] * 0.25)) {
						this._moveLeft(upCol[0], len.X, true, collisions.LEFT);
					} else if (this.xPos > upCol[0] + upCol[2] - (upCol[2] * 0.25)) {
						this._moveRight(upCol[0] + upCol[2], len.X, true, collisions.RIGHT);
					}
				}
			} else if (direction === "LEFT") {
				if (!collisions.LEFT) {
					this._moveLeft(pos, len.X);
				} else {
					let leftCol = collisions.LEFT.coordinates;

					if (this.yPos < leftCol[1] - 24 + (leftCol[3] * 0.25)) {
						this._moveUp(leftCol[1], len.Y, true, collisions.UP);
					} else if (this.yPos + 12 > leftCol[1] + leftCol[3] - (leftCol[3] * 0.25)) {
						this._moveDown(leftCol[1] + leftCol[3], len.Y, true, collisions.DOWN);
					}
				}
			} else if (direction === "RIGHT") {
				if (!collisions.RIGHT) {
					this._moveRight(pos, len.X);
				} else {
					let rightCol = collisions.RIGHT.coordinates;

					if (this.yPos < rightCol[1] - 24 + (rightCol[3] * 0.25)) {
						this._moveUp(rightCol[1], len.Y, true, collisions.UP);
					} else if (this.yPos + 12 > rightCol[1] + rightCol[3] - (rightCol[3] * 0.25)) {
						this._moveDown(rightCol[1] + rightCol[3], len.Y, true, collisions.DOWN);
					}
				}
			}
		});
	};

	_moveDown(pos, len, shouldTransform, direction) {
		if (shouldTransform) {
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
			if (!direction || direction.overlap.x < 0.5) {
				this.xPos = pos + (Number((this.xPos - pos)) + .5);
			} else if (direction.overlap.x >= 0.5) {
				this.xPos = this.xPos + (direction.overlap.x / 5);
			}
		} else {
			this.xPos = Number((this.xPos + pos).toPrecision(len.X))
		}
	}

	setLevelObjects(mapObjects) {
		this.mapObjects = mapObjects;
	};
}