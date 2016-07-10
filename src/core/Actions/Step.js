"use strict";

export default class Step {
	constructor(player) {
		this.player = player;
	}

	walk(directions, newPace) {
		// Skip if no directions are passed in
		if (directions.length === 0) {
			return;
		}

		// Set the direction the player should be facing
		this.player.direction = directions[0];

		// Used to help calculate the precise position of link
		let len = {
			Y: Math.floor(this.player.yPos).toString().length + 1,
			X: Math.floor(this.player.xPos).toString().length + 1
		};

		let playerUnit = [this.player.xPos, this.player.yPos + 10, 16, 16];

		// Find the collisions and the offset of each
		this.player.collisions = new Map();
		this.player.specialCollisions = new Map();

		this.player.mapObjects.static.forEach((otherUnit) => {
			Game.collision("UNIT", this.player.collisions, playerUnit, otherUnit);
		});

		let special = this.player.mapObjects.special;

		Object.keys(special).forEach((key) => {
			Game.collision("UNIT", this.player.specialCollisions, playerUnit, special[key]);
		});
		// Keep track of all the collisions in one variable
		this.player.collisions = new Map([...this.player.collisions, ...this.player.specialCollisions]);

		// Run at different speeds if more than one direction is triggered at the same time
		let pos = newPace || (directions.length === 1 ? 1.5 : 1);

		// Move in the direction the user chooses, if no collisions are detected
		// If a valid movement, round the new position to the nearest position to two decimal points
		directions.forEach((direction) => {
			if (direction === "DOWN") {
				if (!this.player.collisions.has("DOWN")) {
					this._moveDown(pos, len.Y);
				} else {
					let downCol = this.player.collisions.get("DOWN").prop;

					if (this.player.xPos < downCol[0] - 16 + (downCol[2] * 0.25)) {
						this._moveLeft(downCol[0], len.X, true, this.player.collisions.get("LEFT"));
					} else if (this.player.xPos > downCol[0] + downCol[2] - (downCol[2] * 0.25)) {
						this._moveRight(downCol[0] + downCol[2], len.X, true, this.player.collisions.get("RIGHT"));
					}
				}
			} else if (direction === "UP") {
				if (!this.player.collisions.has("UP")) {
					this._moveUp(pos, len.Y);
				} else {
					let upCol = this.player.collisions.get("UP").prop;

					if (this.player.xPos < upCol[0] - 16 + (upCol[2] * 0.25)) {
						this._moveLeft(upCol[0], len.X, true, this.player.collisions.get("LEFT"));
					} else if (this.player.xPos > upCol[0] + upCol[2] - (upCol[2] * 0.25)) {
						this._moveRight(upCol[0] + upCol[2], len.X, true, this.player.collisions.get("RIGHT"));
					}
				}
			} else if (direction === "LEFT") {
				if (!this.player.collisions.has("LEFT")) {
					this._moveLeft(pos, len.X);
				} else {
					let leftCol = this.player.collisions.get("LEFT").prop;

					if (this.player.yPos < leftCol[1] - 24 + (leftCol[3] * 0.25)) {
						this._moveUp(leftCol[1], len.Y, true, this.player.collisions.get("UP"));
					} else if (this.player.yPos + 12 > leftCol[1] + leftCol[3] - (leftCol[3] * 0.25)) {
						this._moveDown(leftCol[1] + leftCol[3], len.Y, true, this.player.collisions.get("DOWN"));
					}
				}
			} else if (direction === "RIGHT") {
				if (!this.player.collisions.has("RIGHT")) {
					this._moveRight(pos, len.X);
				} else {
					let rightCol = this.player.collisions.get("RIGHT").prop;

					if (this.player.yPos < rightCol[1] - 24 + (rightCol[3] * 0.25)) {
						this._moveUp(rightCol[1], len.Y, true, this.player.collisions.get("UP"));
					} else if (this.player.yPos + 12 > rightCol[1] + rightCol[3] - (rightCol[3] * 0.25)) {
						this._moveDown(rightCol[1] + rightCol[3], len.Y, true, this.player.collisions.get("DOWN"));
					}
				}
			}
		});
	};

	_moveDown(pos, len, shouldTransform, direction) {
		if (shouldTransform) {
			this.player.pushCounter = 0;

			if (!direction || direction.overlap.y < 0.5) {
				this.player.yPos = pos + (Number((this.player.yPos - pos)) + .5);
			} else if (direction.overlap.y >= 0.5) {
				this.player.yPos = this.player.yPos + (direction.overlap.y / 5);
			}
		} else {
			this.player.yPos = Number((this.player.yPos + pos).toPrecision(len.Y));
		}
	}

	_moveUp(pos, len, shouldTransform, direction) {
		if (shouldTransform) {
			this.player.pushCounter = 0;

			if (!direction || direction.overlap.y < 0.5) {
				this.player.yPos = pos - (Number((pos - this.player.yPos)) + .5);
			} else if (direction.overlap.y >= 0.5) {
				this.player.yPos = this.player.yPos + (direction.overlap.y / 5);
			}
		} else {
			this.player.yPos = Number((this.player.yPos - pos).toPrecision(len.Y));
		}
	}

	_moveLeft(pos, len, shouldTransform, direction) {
		if (shouldTransform) {
			this.player.pushCounter = 0;

			if (!direction || direction.overlap.x < 0.5) {
				this.player.xPos = pos - (Number((pos - this.player.xPos)) + .5);
			} else if (direction.overlap.x >= 0.5) {
				this.player.xPos = this.player.xPos + (direction.overlap.x / 5);
			}
		} else {
			this.player.xPos = Number((this.player.xPos - pos).toPrecision(len.X));
		}
	}

	_moveRight(pos, len, shouldTransform, direction) {
		if (shouldTransform) {
			this.player.pushCounter = 0;

			if (!direction || direction.overlap.x < 0.5) {
				this.player.xPos = pos + (Number((this.player.xPos - pos)) + .5);
			} else if (direction.overlap.x >= 0.5) {
				this.player.xPos = this.player.xPos + (direction.overlap.x / 5);
			}
		} else {
			this.player.xPos = Number((this.player.xPos + pos).toPrecision(len.X))
		}
	}
}