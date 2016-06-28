"use strict";

const BLOCKS = {
	TOP: 11,
	BOTTOM: 11,
	LEFT: 9,
	RIGHT: 9
};

const ITEM = {
	WINDOW: {
		TOP: [99, 77, 32, 24],
		BOTTOM: [99, 133, 32, 24],
		LEFT: [75, 101, 24, 32],
		RIGHT: [131, 101, 24, 32]
	},
	WELL: {
		TOP: [48, 48, 32, 32]
	},
	CABINET_LARGE: {
		TOP: [351, 25, 48, 32]
	},
	MOLDING: {
		TOP: [89, 164, 16, 16],
		BOTTOM: [89, 196, 16, 16],
		LEFT: [73, 180, 16, 16],
		RIGHT: [105, 180, 16, 16]
	},
	DOOR_FRAME: {
		TOP: [166, 132, 32, 24],
		BOTTOM: [166, 188, 32, 24],
		LEFT: [142, 156, 24, 32],
		RIGHT: [198, 156, 24, 32]
	},
	DOOR: {
		TOP: [191, 47, 32, 24],
		BOTTOM: [191, 103, 32, 24],
		LEFT: [167, 71, 24, 32],
		RIGHT: [223, 71, 24, 32]
	},
	TILE: {
		TOP: [47, 211, 8, 8],
		BOTTOM: [47, 227, 8, 8],
		LEFT: [39, 219, 8, 8],
		RIGHT: [55, 219, 8, 8]
	}
};

const WALL = {
	HOUSE: {
		TOP: [[24, 88, 16, 24, 39, 30], [190, 216, 24, 24, 15, 30], [215, 216, 24, 24, 215, 30]],
		BOTTOM: [[24, 128, 16, 24, 39, 198],[190, 243, 24, 24, 15, 198],[215, 243, 24, 24, 215, 198]],
		LEFT: [[0, 112, 24, 16, 15, 54], [166, 217, 24, 24, 15, 30], [166, 242, 24, 24, 15, 198]],
		RIGHT: [[40, 112, 24, 16, 215, 54], [239, 217, 24, 24, 215, 30],[239, 242, 24, 24, 215, 198]]
	}
};

export default class Structure {
	constructor() {
		// Create a new image for the name select screen
		this.house = new Image();
		this.house.src = "img/generic/houseInterior.png";
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