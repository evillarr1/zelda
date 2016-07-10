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
	constructor(player) {
		this.player = player;
	}

	_lift() {
		if (this.player.direction === "UP" || this.player.direction === "DOWN") {
			this.player.objectLifted[2] = this.player.xPos + (Paint.items[this.player.objectLifted[0]][this.player.objectLifted[1]][2] / 6);
		}

		let liftCounter = this.player.liftCounter / 8;

		if (Number.isInteger(liftCounter)) {
			let [liftX, liftY] = LIFT_OFFSET[this.player.direction][liftCounter];
			this.player.objectLifted[2] += liftX;
			this.player.objectLifted[3] += liftY;
		}

		if (this.player.liftCounter === 41) {
			let [liftX, liftY] = LIFT_OFFSET[this.player.direction][6];

			this.player.objectLifted[2] = this.player.xPos + (Paint.items[this.player.objectLifted[0]][this.player.objectLifted[1]][2] / 6) + liftX;
			this.player.objectLifted[3] = this.player.yPos + (Paint.items[this.player.objectLifted[0]][this.player.objectLifted[1]][2] / 6) + liftY;
		}

		this.player.liftCounter = Math.min(this.player.liftCounter + 1, 41);

		if (this.player.direction === "LEFT") {
			this.player.actionYOffset = 2;
			this.player.actionXOffset = -13;
		} else if (this.player.direction === "UP") {
			this.player.actionYOffset = 2;
			this.player.actionXOffset = -9;
		} else if (this.player.direction === "DOWN") {
			this.player.actionYOffset = 2;
			this.player.actionXOffset = -9;
		} else if (this.player.direction === "RIGHT") {
			this.player.actionXOffset = -7;
			this.player.actionYOffset = 2;
		}

		this.player.currentAction = "LINK_LIFTING_" + Math.floor(this.player.liftCounter / 8);
	}
}