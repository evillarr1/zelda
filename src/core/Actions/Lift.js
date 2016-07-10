"use strict";

const LIFT_OFFSET = {
	UP: {
		0: [0, 0],
		1: [0, 0],
		2: [0, 0],
		3: [0, 0],
		4: [0, -1],
		5: [0, -1],
		6: [0, -9.9]
	},
	LEFT: {
		0: [0, -3],
		1: [0, 0],
		2: [0, 0],
		3: [1.5, -3],
		4: [7.5, -4],
		5: [5, -2],
		6: [-2.5, -10]
	},
	RIGHT: {
		0: [0, 0],
		1: [0, 0],
		2: [0, 0],
		3: [0, 0],
		4: [0, -1],
		5: [0, -1],
		6: [2, -10]
	},
	DOWN: {
		0: [0, 0],
		1: [0, 0],
		2: [0, 0],
		3: [0, 0],
		4: [0, -1],
		5: [0, -1],
		6: [0, -10]
	}
};

export default class Lift {
	_lift() {
		if (this.direction === "UP" || this.direction === "DOWN") {
			this.objectLifted[2] = this.xPos + (Paint.items[this.objectLifted[0]][this.objectLifted[1]][2] / 6);
		}

		let liftCounter = this.liftCounter / 8;

		if (Number.isInteger(liftCounter)) {
			let [liftX, liftY] = LIFT_OFFSET[this.direction][liftCounter];
			this.objectLifted[2] += liftX;
			this.objectLifted[3] += liftY;
		}

		if (this.liftCounter === 41) {
			let [liftX, liftY] = LIFT_OFFSET[this.direction][6];

			this.objectLifted[2] = this.xPos + (Paint.items[this.objectLifted[0]][this.objectLifted[1]][2] / 6) + liftX;
			this.objectLifted[3] = this.yPos + (Paint.items[this.objectLifted[0]][this.objectLifted[1]][2] / 6) + liftY;
		}

		this.liftCounter = Math.min(this.liftCounter + 1, 41);

		if (this.direction === "LEFT") {
			this.actionYOffset = 2;
			this.actionXOffset = -13;
		} else if (this.direction === "UP") {
			this.actionYOffset = 2;
			this.actionXOffset = -9;
		} else if (this.direction === "DOWN") {
			this.actionYOffset = 2;
			this.actionXOffset = -9;
		} else if (this.direction === "RIGHT") {
			this.actionXOffset = -7;
			this.actionYOffset = 2;
		}

		this.currentAction = "LINK_LIFTING_" + Math.floor(this.liftCounter / 8);
	}
}