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

const LIFT_WALKING = {
	UP: 5,
	LEFT: 4,
	RIGHT: 4,
	DOWN: 6
};

export default class LiftWalk {
	constructor(entity) {
		this.entity = entity;
		this.actionCounter = 0;
	}

	update(directions) {
		if (this.entity.objectLifted) {
			if (directions.length > 0) {
				this.entity.actions("WALK", directions);
				this.entity.actions("LIFTWALK", directions);

				return true;
			}
		}

		return false;
	}

	perform(directions) {
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

		this.actionCounter = (this.actionCounter + 1) % ((LIFT_WALKING[directions[0]] * 3) - 1);
		this.entity.currentAction = "LINK_LIFT_WALKING_" + Math.floor(this.actionCounter / 3);
	}
}