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
		let pos = directions.length === 1 ? 1.5 : 1.1;

		// Skip if no directions are passed in
		if (directions.length === 0) {
			return;
		}

		let collisions = {};

		this.mapObjects.neutral.forEach(([posX, posY, x, y]) => {
			let response = Game.collision("UNIT", [this.xPos, this.yPos + 14, 16, 10], [posX, posY, x, y]);

			if (response !== true) {
				if (response.overlapV.y > 0.1) {
					collisions.UP = true;
				}
				if (response.overlapV.y < -0.1) {
					collisions.DOWN = true;
				}
				if (response.overlapV.x > 0.1) {
					collisions.LEFT = true;
				}
				if (response.overlapV.x < -0.1) {
					collisions.RIGHT = true;
				}
			}
		});

		// Run at different speeds if more than one direction is triggered at the same time
		this.direction = directions[0];

		directions.forEach((direction) => {
			if (direction === "DOWN" && !collisions.UP) {
				this.yPos += pos;
			} else if (direction === "UP" && !collisions.DOWN) {
				this.yPos -= pos;
			} else if (direction === "LEFT" && !collisions.RIGHT) {
				this.xPos -= pos;
			} else if (direction === "RIGHT" && !collisions.LEFT) {
				this.xPos += pos;
			}
		});
	};

	setLevelObjects(mapObjects) {
		this.mapObjects = mapObjects;
	};
}