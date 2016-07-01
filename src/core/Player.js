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

	walk(direction) {
		this.direction = direction;

		switch (direction) {
			case "DOWN":
				this.yPos += 1.5;
				break;
			case "UP":
				this.yPos -= 1.5;
				break;
			case "LEFT":
				this.xPos -= 1.5;
				break;
			case "RIGHT":
				this.xPos += 1.5;
				break;
		}
	};
}