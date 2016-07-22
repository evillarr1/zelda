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
	constructor(entity) {
		this.entity = entity;
	}

	update(directions) {
		if (this.entity.liftCounter <= 40 && this.entity.objectLifted) {
			this.entity.actions("LIFT");
			
			return true;
		}

		return false;
	}

	perform() {
		this.entity.liftCounter = Math.min(this.entity.liftCounter + 1, 41);

		if (this.entity.direction === "UP" || this.entity.direction === "DOWN") {
			this.entity.objectLifted[2] = this.entity.xPos + (Paint.items[this.entity.objectLifted[0]][this.entity.objectLifted[1]][2] / 6);
		}

		let liftCounter = this.entity.liftCounter / 8;

		if (Number.isInteger(liftCounter)) {
			let [liftX, liftY] = LIFT_OFFSET[this.entity.direction][liftCounter];
			this.entity.objectLifted[2] += liftX;
			this.entity.objectLifted[3] += liftY;
		}

		if (this.entity.liftCounter === 41) {
			let [liftX, liftY] = LIFT_OFFSET[this.entity.direction][6];

			this.entity.objectLifted[2] = this.entity.xPos + (Paint.items[this.entity.objectLifted[0]][this.entity.objectLifted[1]][2] / 6) + liftX;
			this.entity.objectLifted[3] = this.entity.yPos + (Paint.items[this.entity.objectLifted[0]][this.entity.objectLifted[1]][2] / 6) + liftY;
		}

		if (this.entity.direction === "LEFT") {
			this.entity.actionYOffset = 2;
			this.entity.actionXOffset = -13;
		} else if (this.entity.direction === "UP") {
			this.entity.actionYOffset = 2;
			this.entity.actionXOffset = -9;
		} else if (this.entity.direction === "DOWN") {
			this.entity.actionYOffset = 2;
			this.entity.actionXOffset = -9;
		} else if (this.entity.direction === "RIGHT") {
			this.entity.actionXOffset = -7;
			this.entity.actionYOffset = 2;
		}

		this.entity.currentAction = "LIFTING_" + Math.floor(this.entity.liftCounter / 8);
	}
}