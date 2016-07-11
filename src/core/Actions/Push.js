"use strict";

export default class Push {
	constructor(entity) {
		this.entity = entity;
		this.actionCounter = 0;
		this.pushCounter = 0;
	}

	update(directions) {
		if (directions.length === 0) {
			this.pushCounter = 0;
		}

		if (this.entity.collisions.has(this.entity.direction) && directions[0] === this.entity.direction) {
			if (this.pushCounter++ > 30) {
				this.entity.actions("PUSH", directions);
				return true;
			}
		}
		return false;
	}

	perform(direction) {
		if (direction === "UP" || direction === "DOWN") {
			this.actionCounter = (this.actionCounter + 1) % 23;
		} else {
			this.actionCounter = (this.actionCounter + 1) % 31;
		}

		this.entity.currentAction = "LINK_PUSHING_" + Math.floor(this.actionCounter / 8);

	}
}