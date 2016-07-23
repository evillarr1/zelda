"use strict";

export default class Walk {
	constructor(entity, paceSpeed = 0) {
		this.entity = entity;
		this.actionCounter = 0;
		this.frameLimits = Object.keys(Paint[entity.npc]).getAllIndexes("WALKING").length * 2;
		this.paceSpeed = paceSpeed;
		this.paceCounter = 0;
	}

	update(directions) {
		this.pushCounter = 0;
		this.entity.actions("WALK", directions);
	}

	perform(directions, newSpeed) {
		// Skip if no directions are passed in
		if (directions.length === 0) {
			return;
		}

		if (this.paceSpeed !== 0) {
			if (this.paceCounter++ >= this.paceSpeed) {
				this.paceCounter = 0;
			} else {
				return;
			}
		}

		this.actionCounter = (this.actionCounter + 1) % this.frameLimits;
		this.entity.currentAction = "WALKING_" + Math.floor(this.actionCounter / 2);

		// Set the direction the entity should be facing
		this.entity.direction = directions[0];

		// Used to help calculate the precise position of link
		let len = {
			Y: Math.floor(this.entity.yPos).toString().length + 1,
			X: Math.floor(this.entity.xPos).toString().length + 1
		};

		let entityUnit = [this.entity.xPos, this.entity.yPos + 10, 16, 16];

		// Find the collisions and the offset of each
		this.entity.collisions = new Map();
		this.entity.specialCollisions = new Map();

		this.entity.mapObjects.static.forEach((otherUnit) => {
			Game.collision("UNIT", this.entity.collisions, entityUnit, otherUnit);
		});

		let special = this.entity.mapObjects.special;

		Object.keys(special).forEach((key) => {
			Game.collision("UNIT", this.entity.specialCollisions, entityUnit, special[key]);
		});
		// Keep track of all the collisions in one variable
		this.entity.collisions = new Map([...this.entity.collisions, ...this.entity.specialCollisions]);

		// Run at different speeds if more than one direction is triggered at the same time
		let pos = newSpeed || (directions.length === 1 ? 1.5 : 1);

		// Move in the direction the user chooses, if no collisions are detected
		// If a valid movement, round the new position to the nearest position to two decimal points
		directions.forEach((direction) => {
			if (direction === "DOWN") {
				if (!this.entity.collisions.has("DOWN")) {
					this._moveDown(pos, len.Y);
				} else {
					let downCol = this.entity.collisions.get("DOWN").prop;

					if (this.entity.xPos < downCol[0] - 16 + (downCol[2] * 0.25)) {
						this._moveLeft(downCol[0], len.X, true, this.entity.collisions.get("LEFT"));
					} else if (this.entity.xPos > downCol[0] + downCol[2] - (downCol[2] * 0.25)) {
						this._moveRight(downCol[0] + downCol[2], len.X, true, this.entity.collisions.get("RIGHT"));
					}
				}
			} else if (direction === "UP") {
				if (!this.entity.collisions.has("UP")) {
					this._moveUp(pos, len.Y);
				} else {
					let upCol = this.entity.collisions.get("UP").prop;

					if (this.entity.xPos < upCol[0] - 16 + (upCol[2] * 0.25)) {
						this._moveLeft(upCol[0], len.X, true, this.entity.collisions.get("LEFT"));
					} else if (this.entity.xPos > upCol[0] + upCol[2] - (upCol[2] * 0.25)) {
						this._moveRight(upCol[0] + upCol[2], len.X, true, this.entity.collisions.get("RIGHT"));
					}
				}
			} else if (direction === "LEFT") {
				if (!this.entity.collisions.has("LEFT")) {
					this._moveLeft(pos, len.X);
				} else {
					let leftCol = this.entity.collisions.get("LEFT").prop;

					if (this.entity.yPos < leftCol[1] - 24 + (leftCol[3] * 0.25)) {
						this._moveUp(leftCol[1], len.Y, true, this.entity.collisions.get("UP"));
					} else if (this.entity.yPos + 12 > leftCol[1] + leftCol[3] - (leftCol[3] * 0.25)) {
						this._moveDown(leftCol[1] + leftCol[3], len.Y, true, this.entity.collisions.get("DOWN"));
					}
				}
			} else if (direction === "RIGHT") {
				if (!this.entity.collisions.has("RIGHT")) {
					this._moveRight(pos, len.X);
				} else {
					let rightCol = this.entity.collisions.get("RIGHT").prop;

					if (this.entity.yPos < rightCol[1] - 24 + (rightCol[3] * 0.25)) {
						this._moveUp(rightCol[1], len.Y, true, this.entity.collisions.get("UP"));
					} else if (this.entity.yPos + 12 > rightCol[1] + rightCol[3] - (rightCol[3] * 0.25)) {
						this._moveDown(rightCol[1] + rightCol[3], len.Y, true, this.entity.collisions.get("DOWN"));
					}
				}
			}
		});
	};

	_moveDown(pos, len, shouldTransform, direction) {

		if (shouldTransform) {
			this.entity.pushCounter = 0;
			if (!direction || direction.overlap.y < 0.5) {
				this.entity.yPos = pos + (Number((this.entity.yPos - pos)) + .5);
				if (Player.disableDisplacementY) {
					Player.disabledY += .5;
				}
			} else if (direction.overlap.y >= 0.5) {
				this.entity.yPos = this.entity.yPos + (direction.overlap.y / 5);
			}
		} else {
			this.entity.yPos = Number((this.entity.yPos + pos).toPrecision(len.Y));
			if (Player.disableDisplacementY) {
				Player.holdY += pos;
			}
		}
	}

	_moveUp(pos, len, shouldTransform, direction) {
		if (shouldTransform) {
			this.entity.pushCounter = 0;
			if (!direction || direction.overlap.y < 0.5) {
				this.entity.yPos = pos - (Number((pos - this.entity.yPos)) + .5);
				if (Player.disableDisplacementY) {
					Player.disabledY -=  .5;
				}
			} else if (direction.overlap.y >= 0.5) {
				this.entity.yPos = this.entity.yPos + (direction.overlap.y / 5);
			}
		} else {
			this.entity.yPos = Number((this.entity.yPos - pos).toPrecision(len.Y));
			if (Player.disableDisplacementY) {
				Player.holdY -= pos;
			}
		}
	}

	_moveLeft(pos, len, shouldTransform, direction) {
		if (shouldTransform) {
			this.entity.pushCounter = 0;

			if (!direction || direction.overlap.x < 0.5) {
				this.entity.xPos = pos - (Number((pos - this.entity.xPos)) + .5);
				if (Player.disableDisplacementX) {
					Player.disabledX -= .5;
				}
			} else if (direction.overlap.x >= 0.5) {
				this.entity.xPos = this.entity.xPos + (direction.overlap.x / 5);
			}
		} else {
			this.entity.xPos = Number((this.entity.xPos - pos).toPrecision(len.X));
			if (Player.disableDisplacementX) {
				Player.holdX -= pos;
			}
		}
	}

	_moveRight(pos, len, shouldTransform, direction) {
		if (shouldTransform) {
			this.entity.pushCounter = 0;

			if (!direction || direction.overlap.x < 0.5) {
				this.entity.xPos = pos + (Number((this.entity.xPos - pos)) + .5);
				if (Player.disableDisplacementX) {
					Player.disabledX += .5;
				}
			} else if (direction.overlap.x >= 0.5) {
				this.entity.xPos = this.entity.xPos + (direction.overlap.x / 5);
			}
		} else {
			this.entity.xPos = Number((this.entity.xPos + pos).toPrecision(len.X));
			if (Player.disableDisplacementX) {
				Player.holdX += pos;
			}
		}
	}
}