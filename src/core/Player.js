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
		// Run at different speeds if more than one direction is triggered at the same time
		let pos = directions.length === 1 ? 1.5 : 1;

		// Used to help calculate the precise position of link
		let lenY = Math.floor(this.yPos).toString().length + 1;
		let lenX = Math.floor(this.xPos).toString().length + 1;

		// Skip if no directions are passed in
		if (directions.length === 0) {
			return;
		}

		// Find the collisions and the offset of each
		let collisions = {};
		this.mapObjects.neutral.forEach(([posX, posY, x, y]) => {
			let response = Game.collision("UNIT", [this.xPos, this.yPos + 10, 16, 16], [posX, posY, x, y]);

			if (response !== true) {
				if (response.overlapV.y > 0) {
					collisions.DOWN = {
						overlap: response.overlapV,
						coordinates: [posX, posY, x, y]
					};
				} else if (response.overlapV.y < 0) {
					collisions.UP = {
						overlap: response.overlapV,
						coordinates: [posX, posY, x, y]
					};
				} else if (response.overlapV.x > 0) {
					collisions.RIGHT = {
						overlap: response.overlapV,
						coordinates: [posX, posY, x, y]
					};
				} else if (response.overlapV.x < 0) {
					collisions.LEFT = {
						overlap: response.overlapV,
						coordinates: [posX, posY, x, y]
					};
				}
			}
		});

		// Set the direction the player should be facing
		this.direction = directions[0];

		// Move in the direction the user chooses, if no collisions are detected
		// If a valid movement, round the new position to the nearest position to two decimal points
		directions.forEach((direction) => {
			if (direction === "DOWN") {
				if (!collisions.DOWN) {
					this._moveDown(pos, lenY);
				} else {
					if (this.xPos < collisions.DOWN.coordinates[0] - 4) {
						this._moveLeft(collisions.DOWN.coordinates[0], lenX, true, collisions.LEFT);
					} else if (this.xPos > collisions.DOWN.coordinates[0] + collisions.DOWN.coordinates[2] - 10) {
						this._moveRight(collisions.DOWN.coordinates[0] + collisions.DOWN.coordinates[2], lenX, true, collisions.RIGHT);
					}
				}
			} else if (direction === "UP") {
				if (!collisions.UP) {
					this._moveUp(pos, lenY);
				} else {
					if (this.xPos < collisions.UP.coordinates[0] - 4) {
						this._moveLeft(collisions.UP.coordinates[0], lenX, true, collisions.LEFT);
					} else if (this.xPos > collisions.UP.coordinates[0] + collisions.UP.coordinates[2] - 10) {
						this._moveRight(collisions.UP.coordinates[0] + collisions.UP.coordinates[2], lenX, true, collisions.RIGHT);
					}
				}
			} else if (direction === "LEFT") {
				if (!collisions.LEFT) {
					this._moveLeft(pos, lenX);
				} else {
					if (this.yPos < collisions.LEFT.coordinates[1] - 14) {
						this._moveUp(collisions.LEFT.coordinates[1], lenY, true, collisions.UP);
					} else if (this.yPos > collisions.LEFT.coordinates[1] + collisions.LEFT.coordinates[3] - 22) {
						this._moveDown(collisions.LEFT.coordinates[1] + collisions.LEFT.coordinates[3], lenY, true, collisions.DOWN);
					}
				}
			} else if (direction === "RIGHT") {
				if (!collisions.RIGHT) {
					this._moveRight(pos, lenX);
				} else {
					if (this.yPos < collisions.RIGHT.coordinates[1] - 14) {
						this._moveUp(collisions.RIGHT.coordinates[1], lenY, true, collisions.UP);
					} else if (this.yPos > collisions.RIGHT.coordinates[1] + collisions.RIGHT.coordinates[3] - 22) {
						this._moveDown(collisions.RIGHT.coordinates[1] + collisions.RIGHT.coordinates[3], lenY, true, collisions.DOWN);
					}
				}
			}
		});
	};

	_moveDown(pos, lenY, shouldTransform, direction) {
		if (shouldTransform) {
			if (!direction) {
				this.yPos = pos + (Number((this.yPos - pos) + 1));
			} else {
				this.yPos = pos + (Number((this.yPos - pos) + direction.overlap.y));
			}
		} else {
			this.yPos = Number((this.yPos + pos).toPrecision(lenY));
		}
	}

	_moveUp(pos, lenY, shouldTransform, direction) {
		if (shouldTransform) {
			if (!direction) {
				this.yPos = pos - (Number((pos - this.yPos) + 1));
			} else {
				this.yPos = pos - (Number((pos - this.yPos) + direction.overlap.y));
			}
		} else {
			this.yPos = Number((this.yPos - pos).toPrecision(lenY));
		}
	}

	_moveLeft(pos, lenX, shouldTransform, direction) {
		if (shouldTransform) {
			if (!direction) {
				this.xPos = pos - (Number((pos - this.xPos) + 1));
			} else {
				this.xPos = pos - (Number((pos - this.xPos) + direction.overlap.x));
			}
		} else {
			this.xPos = Number((this.xPos - pos).toPrecision(lenX));
		}
	}

	_moveRight(pos, lenX, shouldTransform, direction) {
		if (shouldTransform) {
			if (!direction) {
				this.xPos = pos + (Number((this.xPos - pos) + 1));
			} else {
				this.xPos = pos - (Number((pos - this.xPos) + direction.overlap.x));
			}
		} else {
			this.xPos = Number((this.xPos + pos).toPrecision(lenX))
		}
	}

	setLevelObjects(mapObjects) {
		this.mapObjects = mapObjects;
	};
}