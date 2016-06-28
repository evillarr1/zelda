"use strict";

const BLOCKS = {
	TOP: 11,
	BOTTOM: 11,
	LEFT: 9,
	RIGHT: 9
};

const ITEM = {
	WINDOW: {
		TOP: [494, 503, 32, 24],
		BOTTOM: [494, 528, 32, 24],
		LEFT: [468, 523, 24, 32],
		RIGHT: [443, 523, 24, 32]
	},
	WELL: {
		TOP: [517, 304, 32, 32],
		BOTTOM: [517, 337, 32, 32],
		LEFT: [550, 337, 32, 32],
		RIGHT: [550, 304, 32, 32]
	},
	MOLDING: {
		TOP: [612, 403, 16, 16],
		BOTTOM: [663, 403, 16, 16],
		LEFT: [629, 403, 16, 16],
		RIGHT: [646, 403, 16, 16]
	},
	CABINET_LARGE: {
		TOP: [443, 387, 48, 32],
		BOTTOM: [443, 421, 48, 32],
		LEFT: [527, 398, 32, 48],
		RIGHT: [493, 398, 32, 48]
	},
	DOOR_FRAME: {
		TOP: [578, 486, 32, 24],
		BOTTOM: [578, 511, 32, 24],
		LEFT: [528, 503, 24, 32],
		RIGHT: [553, 503, 24, 32]
	},
	DOOR: {
		TOP: [561, 437, 32, 24],
		BOTTOM: [561, 462, 32, 24],
		LEFT: [560, 404, 24, 32],
		RIGHT: [585, 404, 24, 32]
	},
	TABLE_SMALL: {
		TOP: [479, 57, 32, 24]
	},
	TABLE_LARGE: {
		TOP: [429, 557, 48, 34]
	},
	BENCH: {
		TOP: [425, 361, 16, 16]
	},
	POT: {
		TOP: [31, 706, 16, 16]
	},
	POT_STAND: {
		TOP: [48, 706, 16, 16]
	},
	CHEST_OPEN: {
		TOP: [121, 659, 16, 16]
	},
	CHEST_CLOSED: {
		TOP: [104, 659, 16, 16]
	},
	HOUSE_FLOOR: {
		TOP: [323, 518, 16, 16]
	}
};

const WALL = {
	HOUSE: {
		TOP: [[542, 623, 16, 32, 39, 30], [478, 702, 24, 24, 15, 30], [503, 702, 24, 24, 215, 30]],
		BOTTOM: [[525, 623, 16, 32, 39, 190], [478, 729, 24, 24, 15, 198], [503, 729, 24, 24, 215, 198]],
		LEFT: [[559, 623, 32, 16, 15, 54], [454, 703, 24, 24, 15, 30], [454, 728, 24, 24, 15, 198]],
		RIGHT: [[559, 640, 32, 16, 207, 54], [527, 703, 24, 24, 215, 30], [527, 728, 24, 24, 215, 198]]
	}
};

export default class Structure {
	constructor() {
		// Create a new image for the name select screen
		this.house = new Image();
		this.house.src = "img/mainSheet.png";
	}

	draw(item, direction, xPos, yPos) {
		let [xCor, yCor, xWidth, yWidth]= ITEM[item][direction];

		Context.drawImage(
			this.house,
			xCor,
			yCor,
			xWidth,
			yWidth,
			xPos,
			yPos,
			xWidth,
			yWidth);
	}

	drawX(item, direction, xPos, yPos, separator, x) {
		let [xCor, yCor, xWidth, yWidth]= ITEM[item][direction];
		let [topBot, leftRight] = ["TOP", "BOTTOM"].indexOf(direction) !== -1 ? [1, 0] : [0, 1];

		for (let i = 0; i < x; i++) {
			Context.drawImage(
				this.house,
				xCor,
				yCor,
				xWidth,
				yWidth,
				xPos + (separator * i * topBot),
				yPos + (separator * i * leftRight),
				xWidth,
				yWidth);
		}
	}

	drawFloor(type) {
		for (let i = 0; i < 8; i++) {
			this.drawX(type, "TOP", 47, 62 + (i * 16), 16, 10);
		}
	}

	drawWall(type, direction) {
		let [main, firstEdge, secondEdge]= WALL[type][direction];
		let [topBot, leftRight] = ["TOP", "BOTTOM"].indexOf(direction) !== -1 ? [1, 0] : [0, 1];

		for (let i = 0; i < BLOCKS[direction]; i++) {
			Context.drawImage(
				this.house,
				main[0],
				main[1],
				main[2],
				main[3],
				main[4] + (16 * i * topBot),
				main[5] + (16 * i * leftRight),
				main[2],
				main[3]);
		}

		// Draw edges
		Context.drawImage(
			this.house,
			firstEdge[0],
			firstEdge[1],
			firstEdge[2],
			firstEdge[3],
			firstEdge[4],
			firstEdge[5],
			firstEdge[2],
			firstEdge[3]);

		Context.drawImage(
			this.house,
			secondEdge[0],
			secondEdge[1],
			secondEdge[2],
			secondEdge[3],
			secondEdge[4],
			secondEdge[5],
			secondEdge[2],
			secondEdge[3]);
	}
}