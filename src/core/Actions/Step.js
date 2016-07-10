"use strict";

export default class Step {
	constructor(entity) {
		entity._moveDown = this._moveDown;
		entity._moveUp = this._moveUp;
		entity._moveLeft = this._moveLeft;
		entity._moveRight = this._moveRight;
	}

	_walk(directions, newPace) {
		// Skip if no directions are passed in
		if (directions.length === 0) {
			return;
		}

		// Set the direction the entity should be facing
		this.direction = directions[0];

		// Used to help calculate the precise position of link
		let len = {
			Y: Math.floor(this.yPos).toString().length + 1,
			X: Math.floor(this.xPos).toString().length + 1
		};

		let entityUnit = [this.xPos, this.yPos + 10, 16, 16];

		// Find the collisions and the offset of each
		this.collisions = new Map();
		this.specialCollisions = new Map();

		this.mapObjects.static.forEach((otherUnit) => {
			Game.collision("UNIT", this.collisions, entityUnit, otherUnit);
		});

		let special = this.mapObjects.special;

		Object.keys(special).forEach((key) => {
			Game.collision("UNIT", this.specialCollisions, entityUnit, special[key]);
		});
		// Keep track of all the collisions in one variable
		this.collisions = new Map([...this.collisions, ...this.specialCollisions]);

		// Run at different speeds if more than one direction is triggered at the same time
		let pos = newPace || (directions.length === 1 ? 1.5 : 1);

		// Move in the direction the user chooses, if no collisions are detected
		// If a valid movement, round the new position to the nearest position to two decimal points
		directions.forEach((direction) => {
			if (direction === "DOWN") {
				if (!this.collisions.has("DOWN")) {
					this._moveDown(pos, len.Y);
				} else {
					let downCol = this.collisions.get("DOWN").prop;

					if (this.xPos < downCol[0] - 16 + (downCol[2] * 0.25)) {
						this._moveLeft(downCol[0], len.X, true, this.collisions.get("LEFT"));
					} else if (this.xPos > downCol[0] + downCol[2] - (downCol[2] * 0.25)) {
						this._moveRight(downCol[0] + downCol[2], len.X, true, this.collisions.get("RIGHT"));
					}
				}
			} else if (direction === "UP") {
				if (!this.collisions.has("UP")) {
					this._moveUp(pos, len.Y);
				} else {
					let upCol = this.collisions.get("UP").prop;

					if (this.xPos < upCol[0] - 16 + (upCol[2] * 0.25)) {
						this._moveLeft(upCol[0], len.X, true, this.collisions.get("LEFT"));
					} else if (this.xPos > upCol[0] + upCol[2] - (upCol[2] * 0.25)) {
						this._moveRight(upCol[0] + upCol[2], len.X, true, this.collisions.get("RIGHT"));
					}
				}
			} else if (direction === "LEFT") {
				if (!this.collisions.has("LEFT")) {
					this._moveLeft(pos, len.X);
				} else {
					let leftCol = this.collisions.get("LEFT").prop;

					if (this.yPos < leftCol[1] - 24 + (leftCol[3] * 0.25)) {
						this._moveUp(leftCol[1], len.Y, true, this.collisions.get("UP"));
					} else if (this.yPos + 12 > leftCol[1] + leftCol[3] - (leftCol[3] * 0.25)) {
						this._moveDown(leftCol[1] + leftCol[3], len.Y, true, this.collisions.get("DOWN"));
					}
				}
			} else if (direction === "RIGHT") {
				if (!this.collisions.has("RIGHT")) {
					this._moveRight(pos, len.X);
				} else {
					let rightCol = this.collisions.get("RIGHT").prop;

					if (this.yPos < rightCol[1] - 24 + (rightCol[3] * 0.25)) {
						this._moveUp(rightCol[1], len.Y, true, this.collisions.get("UP"));
					} else if (this.yPos + 12 > rightCol[1] + rightCol[3] - (rightCol[3] * 0.25)) {
						this._moveDown(rightCol[1] + rightCol[3], len.Y, true, this.collisions.get("DOWN"));
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
}