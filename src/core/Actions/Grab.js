"use strict";

const DIRECTION = {
	UP: ["UP", "DOWN"],
	DOWN: ["DOWN", "UP"],
	LEFT: ["LEFT", "RIGHT"],
	RIGHT: ["RIGHT", "LEFT"]
};

export default class Grab {
	constructor(entity) {
		this.entity = entity;
	}

	update(directions) {
		if (this.entity.liftCounter <= 40) {
			if (!this.entity.objectLifted && this.entity.pullCounter > 0 && this.entity.collisions.has(this.entity.direction)) {
				if (this.entity.specialCollisions.has(this.entity.direction)) {
					let special = this.entity.mapObjects.special;
					let keys = Object.keys(special);

					for (let i = 0; i < keys.length; i++) {
						if (this.entity.specialCollisions.get(this.entity.direction).prop[4] === special[keys[i]][4]) {
							this.entity.objectLifted = this.entity.mapObjects.special[keys[i]].slice(-1)[0];
							delete this.entity.mapObjects.special[keys[i]];
							delete this.entity.specialCollisions.get(this.entity.direction);
							delete this.entity.collisions.get(this.entity.direction);
							this.entity.liftCounter = 0;
							return true;
						}
					}
				} else {
					this.entity.actions("GRAB", directions);
					return true;
				}
			}
		}

		return false;
	}

	perform() {
		let props = this.entity.collisions.get(DIRECTION[this.entity.direction][0]).prop;

		// Only grab if the entity is not off the edge
		if (this.entity.direction === "UP" || this.entity.direction === "DOWN") {
			if ((this.entity.xPos < props[0] - 6) || (this.entity.xPos > props[0] + props[2] - 10)) {
				this.entity.pullCounter = 0;

				return;
			}
		} else {
			if ((this.entity.yPos < props[1] - 12) || (this.entity.yPos > props[1] + props[3] - 22)) {
				this.entity.pullCounter = 0;

				return;
			}
		}

		this.entity.currentAction = "LINK_GRABBING";
		this.entity.actionIndex = 0;

		if (this.entity.direction === "LEFT") {
			this.entity.actionXOffset = -2;
		} else if (this.entity.direction === "UP") {
			this.entity.actionYOffset = 4;
		} else if (this.entity.direction === "DOWN") {
			this.entity.actionYOffset = 4;
		}
	}
}