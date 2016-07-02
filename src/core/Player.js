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

		let collisions = {};

		this.mapObjects.neutral.forEach(([posX, posY, x, y]) => {
			let response = Game.collision("UNIT", [this.xPos, this.yPos + 10, 17, 16], [posX, posY, x, y]);

			if (response !== true) {
				collisions.DOWN |= response.overlapV.y > 0.5;
				collisions.UP |= response.overlapV.y < -0.5;
				collisions.RIGHT |= response.overlapV.x > 0.5;
				collisions.LEFT |= response.overlapV.x < -0.5;
			}
		});

		this.direction = directions[0];

		// Move in the direction the user chooses, if no collisions are detected
		// If a valid movement, round the new position to the nearest position to two decimal points
		directions.forEach((direction) => {
			if (direction === "DOWN" && !collisions.DOWN) {
				this.yPos = Number((this.yPos + pos).toPrecision(lenY));
			} else if (direction === "UP" && !collisions.UP) {
				this.yPos = Number((this.yPos - pos).toPrecision(lenY));
			} else if (direction === "LEFT" && !collisions.LEFT) {
				this.xPos = Number((this.xPos - pos).toPrecision(lenX));
			} else if (direction === "RIGHT" && !collisions.RIGHT) {
				this.xPos = Number((this.xPos + pos).toPrecision(lenX));
			}
		});
	};

	setLevelObjects(mapObjects) {
		this.mapObjects = mapObjects;
	};
}