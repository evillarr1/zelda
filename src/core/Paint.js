"use strict";

const BLOCKS = {
	UP: 11,
	DOWN: 11,
	LEFT: 8,
	RIGHT: 8
};

const ITEMS = {
	WINDOW: {
		UP: [494, 503, 32, 24],
		DOWN: [494, 528, 32, 24],
		LEFT: [468, 523, 24, 32],
		RIGHT: [443, 523, 24, 32]
	},
	WELL: {
		UP: [517, 304, 32, 32],
		DOWN: [517, 337, 32, 32],
		LEFT: [550, 337, 32, 32],
		RIGHT: [550, 304, 32, 32]
	},
	MOLDING: {
		UP: [612, 403, 16, 16],
		DOWN: [663, 403, 16, 16],
		LEFT: [629, 403, 16, 16],
		RIGHT: [646, 403, 16, 16]
	},
	CABINET_LARGE: {
		UP: [443, 387, 48, 32],
		DOWN: [443, 421, 48, 32],
		LEFT: [527, 398, 32, 48],
		RIGHT: [493, 398, 32, 48]
	},
	DOOR_FRAME: {
		UP: [578, 486, 32, 24],
		DOWN: [578, 511, 32, 24],
		LEFT: [528, 503, 24, 32],
		RIGHT: [553, 503, 24, 32]
	},
	DOOR: {
		UP: [561, 437, 32, 24],
		DOWN: [561, 462, 32, 24],
		LEFT: [560, 404, 24, 32],
		RIGHT: [585, 404, 24, 32]
	},
	TABLE_SMALL: {
		UP: [479, 557, 32, 24]
	},
	TABLE_LARGE: {
		UP: [429, 557, 48, 34]
	},
	BENCH: {
		UP: [425, 361, 16, 16]
	},
	POT: {
		UP: [33, 706, 12, 13],
		LEFT: [33, 706, 12, 16]
	},
	POT_STAND: {
		UP: [48, 706, 16, 16],
		LEFT: [48, 706, 16, 16]
	},
	CHEST_CLOSED: {
		UP: [121, 659, 16, 16]
	},
	CHEST_OPEN: {
		UP: [104, 659, 16, 16]
	},
	HOUSE_FLOOR: {
		UP: [323, 518, 16, 16]
	},
	BED: {
		UP: [442, 304, 32, 40],
		DOWN: [442, 346, 32, 40],
		LEFT: [476, 337, 40, 32],
		RIGHT: [476, 304, 40, 32]
	},
	TEXT_BOX_FRAME: {
		UP: [627, 667, 190, 67]
	},
	HEARTS: {
		HEALTH_FULL: [293, 865, 8, 8],
		HEALTH_HALF: [303, 865, 7, 7],
		HEALTH_EMPTY: [312, 865, 7, 7]
	},
	ROCKS: {
		DAY: [241, 925, 16, 15],
		NIGHT: [260, 925, 16, 15],
		REMOVED: [279, 925, 14, 14]
	},
	BUSHES: {
		DAY_INTACT: [157, 927, 16, 16],
		DAY_DESTROYED: [178, 927, 16, 16],
		NIGHT_INTACT: [198, 927, 16, 16],
		NIGHT_DESTROYED: [218, 927, 16, 16]
	},
	PENDANTS: {
		GREEN: [222, 853, 15, 16],
		BLUE: [243, 853, 15, 16],
		RED: [266, 853, 15, 16]
	},
	RUPEES: {
		GREEN1: [165, 903, 8, 14],
		GREEN2: [178, 903, 8, 14],
		GREEN3: [191, 903, 8, 14],
		BLUE1: [202, 903, 8, 14],
		BLUE2: [215, 903, 8, 14],
		BLUE3: [228, 903, 8, 14],
		RED1: [239, 903, 8, 14],
		RED2: [252, 903, 8, 14],
		RED3: [265, 903, 8, 14]
	},
	NUMBERS: {
		1: [302, 856, 7, 7],
		2: [311, 856, 7, 7],
		3: [318, 856, 7, 7],
		4: [326, 856, 8, 7],
		5: [334, 856, 8, 7],
		6: [342, 856, 8, 7],
		7: [350, 856, 8, 7],
		8: [358, 856, 8, 7],
		9: [366, 856, 8, 7],
		0: [296, 856, 7, 7]
	}
};

const LINK = {
	SLEEPING_IN_BED: {
		UP: [12, 15, 30, 31]
	},
	SITTIN_IN_BED: {
		UP: [0, 55, 50, 50]
	},
	STANDING: {
		UP: [515, 123, 16, 24],
		RIGHT: [844, 119, 17, 24],
		DOWN: [161, 119, 16, 24],
		LEFT: [1318, 118, 17, 24]
	},
	WALKING_0: {
		UP: [515, 123, 16, 24],
		RIGHT: [844, 119, 17, 24],
		DOWN: [161, 119, 16, 24],
		LEFT: [1318, 118, 17, 24]
	},
	WALKING_1: {
		UP: [538, 123, 16, 24],
		RIGHT: [866, 119, 17, 24],
		DOWN: [184, 119, 16, 24],
		LEFT: [1340, 118, 17, 24]
	},
	WALKING_2: {
		UP: [561, 123, 16, 24],
		RIGHT: [888, 119, 17, 24],
		DOWN: [208, 119, 16, 24],
		LEFT: [1362, 118, 17, 24]
	},
	WALKING_3: {
		UP: [584, 123, 16, 24],
		RIGHT: [910, 119, 17, 24],
		DOWN: [231, 119, 16, 24],
		LEFT: [1385, 118, 17, 24]
	},
	WALKING_4: {
		UP: [446, 123, 16, 24],
		RIGHT: [777, 119, 17, 24],
		DOWN: [91, 119, 16, 24],
		LEFT: [1251, 118, 17, 24]
	},
	WALKING_5: {
		UP: [469, 123, 16, 24],
		RIGHT: [800, 119, 17, 24],
		DOWN: [114, 119, 16, 24],
		LEFT: [1274, 118, 17, 24]
	},
	WALKING_6: {
		UP: [492, 123, 16, 24],
		RIGHT: [822, 119, 17, 24],
		DOWN: [138, 119, 16, 24],
		LEFT: [1296, 118, 17, 24]
	},
	PUSHING_0: {
		UP: [503, 262, 16, 22],
		RIGHT: [823, 278, 16, 23],
		DOWN: [134, 259, 16, 26],
		LEFT: [1282, 276, 16, 23]
	},
	PUSHING_1: {
		UP: [523, 262, 16, 22],
		RIGHT: [843, 278, 16, 23],
		DOWN: [154, 259, 16, 26],
		LEFT: [1302, 276, 16, 23]
	},
	PUSHING_2: {
		UP: [543, 262, 16, 22],
		RIGHT: [863, 278, 16, 23],
		DOWN: [174, 259, 16, 26],
		LEFT: [1322, 276, 16, 23]
	},
	PUSHING_3: {
		RIGHT: [883, 278, 16, 23],
		LEFT: [1342, 276, 16, 23]
	},
	GRABBING: {
		UP: [435, 188, 16, 21],
		RIGHT: [804, 179, 17, 23],
		DOWN: [96, 186, 16, 20],
		LEFT: [1365, 178, 17, 23]
	},
	TUGGING_0: {
		UP: [463, 189, 30, 20],
		RIGHT: [826, 181, 23, 22],
		DOWN: [120, 185, 30, 21],
		LEFT: [1340, 180, 19, 22]
	},
	TUGGING_1: {
		UP: [493, 189, 30, 20],
		RIGHT: [857, 181, 23, 22],
		DOWN: [155, 185, 30, 21],
		LEFT: [1309, 180, 21, 22]
	},
	TUGGING_2: {
		UP: [525, 189, 30, 20],
		RIGHT: [886, 181, 23, 22],
		DOWN: [189, 185, 30, 21],
		LEFT: [1280, 180, 23, 22]
	},
	LIFTING_0: {
		UP: [428, 227, 34, 22],
		RIGHT: [764, 225, 34, 22],
		DOWN: [68, 231, 34, 22],
		LEFT: [1197, 225, 34, 22]
	},
	LIFTING_1: {
		UP: [464, 227, 34, 22],
		RIGHT: [806, 225, 34, 22],
		DOWN: [103, 231, 34, 22],
		LEFT: [1238, 225, 34, 22]
	},
	LIFTING_2: {
		UP: [499, 227, 34, 22],
		RIGHT: [849, 225, 34, 22],
		DOWN: [141, 231, 34, 22],
		LEFT: [1276, 225, 34, 22]
	},
	LIFTING_3: {
		UP: [536, 227, 34, 22],
		RIGHT: [888, 225, 34, 22],
		DOWN: [180, 231, 34, 22],
		LEFT: [1316, 225, 34, 22]
	},
	LIFTING_4: {
		UP: [570, 227, 34, 22],
		RIGHT: [928, 225, 34, 22],
		DOWN: [218, 231, 34, 22],
		LEFT: [1353, 225, 34, 22]
	},
	LIFTING_5: {
		UP: [608, 227, 34, 22],
		RIGHT: [964, 225, 34, 22],
		DOWN: [254, 231, 34, 22],
		LEFT: [1384, 225, 34, 22]
	},
	LIFT_WALKING_0: {
		UP: [570, 262, 16, 22],
		RIGHT: [925, 280, 17, 23],
		DOWN: [221, 263, 16, 22],
		LEFT: [1384, 273, 17, 23]
	},
	LIFT_WALKING_1: {
		UP: [587, 262, 16, 22],
		RIGHT: [943, 280, 17, 23],
		DOWN: [238, 263, 16, 22],
		LEFT: [1402, 273, 17, 23]
	},
	LIFT_WALKING_2: {
		UP: [604, 262, 16, 22],
		RIGHT: [961, 280, 17, 23],
		DOWN: [255, 263, 16, 22],
		LEFT: [1419, 273, 17, 23]
	},
	LIFT_WALKING_3: {
		UP: [621, 262, 16, 22],
		RIGHT: [979, 280, 17, 23],
		DOWN: [272, 263, 16, 22],
		LEFT: [1438, 273, 17, 23]
	},
	LIFT_WALKING_4: {
		UP: [638, 262, 16, 22],
		DOWN: [289, 263, 16, 22],
	},
	LIFT_WALKING_5: {
		DOWN: [306, 263, 16, 22],
	},
	UNCOVERED_COMFORTER: {
		UP: [800, 75, 30, 17]
	},
};

const UNCLE = {
	SITTING: {
		DOWN: [454, 356, 20, 30],
		LEFT: [434, 356, 20, 30]
	},
	SITTING_FAT: [550, 359, 28, 28],
	SITTING_SWORD: [519, 359, 28, 28],
	STANDING: {
		LEFT: [291, 355, 22, 26],
		DOWN:[340, 354, 22, 26]
	},
	WALKING_0: {
		LEFT: [291, 355, 22, 26],
		DOWN:[340, 354, 22, 26]
	},
	WALKING_1: {
		LEFT: [317, 355, 22, 26],
		DOWN: [363, 355, 22, 26]
	}
};

const WALL = {
	HOUSE: {
		UP: [[542, 623, 16, 32, 39, 46], [478, 702, 24, 24, 15, 46], [503, 702, 24, 24, 215, 46]],
		DOWN: [[525, 623, 16, 32, 39, 190], [478, 729, 24, 24, 15, 198], [503, 729, 24, 24, 215, 198]],
		LEFT: [[559, 623, 32, 16, 15, 70], [454, 703, 24, 24, 15, 46], [454, 728, 24, 24, 15, 198]],
		RIGHT: [[559, 640, 32, 16, 207, 70], [527, 703, 24, 24, 215, 46], [527, 728, 24, 24, 215, 198]]
	}
};

const MAPS = {
	linksHouse: [512, 512]
};

export default class Paint {
	constructor() {
		this.house = new Image();
		this.house.src = "img/mainSheet.png";

		this.link = new Image();
		this.link.src = "img/link.png";

		this.linksHouse = new Image();
		this.linksHouse.src = "img/linksHouse.png";

		this.npc = new Image();
		this.npc.src = "img/npc.png";

		this.ITEMS = ITEMS;
		this.LINK = LINK;
		this.UNCLE = UNCLE
	}

	draw(item, subItem, xPos, yPos, imageSet = "house", char = "ITEMS") {
		let [xCor, yCor, xWidth, yWidth] =  subItem ? this[char][item][subItem] : this[char][item];

		Context.drawImage(
			this[imageSet],
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
		let [xCor, yCor, xWidth, yWidth]= ITEMS[item][direction];
		let [topBot, leftRight] = ["UP", "DOWN"].indexOf(direction) !== -1 ? [1, 0] : [0, 1];

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
			this.drawX(type, "UP", 47, 62 + (i * 16), 16, 10);
		}
	}

	drawWall(type, direction) {
		let [main, firstEdge, secondEdge]= WALL[type][direction];
		let [topBot, leftRight] = ["UP", "DOWN"].indexOf(direction) !== -1 ? [1, 0] : [0, 1];

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

	drawMap(imageSet, xCor, yCor, xPos, yPos) {
		let [xWidth, yWidth]= MAPS[imageSet];

		Context.drawImage(
			this[imageSet],
			xCor,
			yCor,
			xWidth,
			yWidth,
			xPos,
			yPos,
			xWidth,
			yWidth);
	}
}
