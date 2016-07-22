"use strict";

const LIFT_WALK_OFFSET = {
	UP: [0, -9.9],
	LEFT: [-2, -10],
	RIGHT: [2, -10],
	DOWN: [0, -10]
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
		this.isStanding = true;
		this.itemBounce = 0.25;
	}

	update(directions) {
		if (this.entity.objectLifted) {
			if (directions.length > 0) {
				this.isStanding = false;
				this.entity.actions("WALK", directions);
				this.entity.actions("LIFTWALK", directions);
			} else {
				this.isStanding = true;
				this.entity.actions("LIFTWALK", [this.entity.direction]);
			}

			return true;
		}

		return false;
	}

	perform(directions) {
		let [itemLift, dirLift, xLift, yLift] = this.entity.objectLifted;

		if (this.entity.direction === "UP" || this.entity.direction === "DOWN") {
			this.entity.objectLifted[2] = this.entity.xPos + (Paint.items[itemLift][dirLift][2] / 6);
		}

		let [liftX, liftY] = LIFT_WALK_OFFSET[this.entity.direction];

		this.entity.objectLifted[2] = this.entity.xPos + (Paint.items[itemLift][dirLift][2] / 6) + liftX - Player.disabledX;
		this.entity.objectLifted[3] = this.entity.yPos + (Paint.items[itemLift][dirLift][2] / 6) + liftY + this.itemBounce - Player.disabledY;

		if (this.isStanding) {
			this.actionCounter = 0;
			this.itemBounce = 0.25;
		} else {
			if (this.actionCounter === 0 || this.actionCounter === (Number(LIFT_WALKING[directions[0]] * 3) / 2)) {
				this.itemBounce *= -1;
			}
			this.actionCounter = (this.actionCounter + 1) % ((LIFT_WALKING[directions[0]] * 3) - 1);
		}

		this.entity.currentAction = "LIFT_WALKING_" + Math.floor(this.actionCounter / 3);
	}
}