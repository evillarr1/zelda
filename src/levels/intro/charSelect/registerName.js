"use strict";

import Constants from "../../../constants/Constants";
import KeyCodes from "../../../constants/KeyCodes";
import Storage from "../../../core/Storage";

const POS = [132, 148, 164, 180];
const MAIN_DISTANCE = 16;
const MAX_CHAR = 6;
const CHAR_MAP = {
	"-6": {
		132: [5, 311, "A"],
		148: [5, 327, "K"],
		164: [5, 343, "U"],
		180: [5, 359, " "]//
	},
	"-5": {
		132: [21, 311, "B"],
		148: [21, 327, "L"],
		164: [21, 343, "V"],
		180: [21, 359, " "]//
	},
	"-4": {
		132: [37, 311, "C"],
		148: [37, 327, "M"],
		164: [37, 343, "W"],
		180: [37, 359, " "]//
	},
	"-3": {
		132: [53, 311, "D"],
		148: [53, 327, "N"],
		164: [53, 343, "X"],
		180: [53, 359, " "]//
	},
	"-2": {
		132: [69, 311, "E"],
		148: [69, 327, "O"],
		164: [69, 343, "Y"],
		180: [69, 359, " "]//
	},
	"-1": {
		132: [85, 311, "F"],
		148: [85, 327, "P"],
		164: [85, 343, "Z"],
		180: [85, 359, ""]	//If you try to get rid of this one, you'll have an empty name.
	},
	0: {
		132: [101, 311, "G"],
		148: [101, 327, "Q"],
		164: [101, 343, "-"],
		180: [101, 359, ""]
	},
	1: {
		132: [117, 311, "H"],
		148: [117, 327, "R"],
		164: [117, 343, "."],
		180: [101, 359, " "]
	},
	2: {
		132: [133, 311, "I"],
		148: [133, 327, "S"],
		164: [133, 343, ","],
		180: [133, 359, ""]//end
	},
	3: {
		132: [149, 311, "J"],
		148: [149, 327, "T"],
		164: [149, 343, " "],
		180: [149, 359, ""]//end
	},
	4: {
		132: [165, 311, " "],
		148: [165, 327, " "],
		164: [165, 343, " "],
		180: [165, 359, " "]
	},
	5: {
		132: [181, 311, " "],
		148: [181, 327, " "],
		164: [181, 343, " "],
		180: [181, 359, " "]
	},
	6: {
		132: [197, 311, "a"],
		148: [197, 327, "k"],
		164: [197, 343, "u"],
		180: [197, 359, " "]
	},
	7: {
		132: [213, 311, "b"],
		148: [213, 327, "l"],
		164: [213, 343, "v"],
		180: [213, 359, " "]
	},
	8: {
		132: [229, 311, "c"],
		148: [229, 327, "m"],
		164: [229, 343, "w"],
		180: [229, 359, " "]
	},
	9: {
		132: [245, 311, "d"],
		148: [245, 327, "n"],
		164: [245, 343, "x"],
		180: [245, 359, " "]
	},
	10: {
		132: [261, 311, "e"],
		148: [261, 327, "o"],
		164: [261, 343, "y"],
		180: [261, 359, " "]
	},
	11: {
		132: [277, 311, "f"],
		148: [277, 327, "p"],
		164: [277, 343, "z"],
		180: [277, 359, ""]
	},
	12: {
		132: [293, 311, "g"],
		148: [293, 327, "q"],
		164: [293, 343, "-"],
		180: [293, 359, ""]
	},
	13: {
		132: [309, 311, "h"],
		148: [309, 327, "r"],
		164: [309, 343, "."],
		180: [309, 359, " "]
	},
	14: {
		132: [325, 311, "i"],
		148: [325, 327, "s"],
		164: [325, 343, ","],
		180: [325, 359, ""]//end
	},
	15: {
		132: [341, 311, "j"],
		148: [341, 327, "t"],
		164: [341, 343, " "],
		180: [341, 359, ""]//end
	},
	16: {
		132: [357, 311, " "],
		148: [357, 327, " "],
		164: [357, 343, " "],
		180: [357, 359, " "]
	},
	17: {
		132: [373, 311, " "],
		148: [373, 327, " "],
		164: [373, 343, " "],
		180: [373, 359, " "]
	},
	18: {
		132: [389, 311, "0"],
		148: [389, 327, "5"],
		164: [389, 343, "!"],
		180: [389, 359, ""]
	},
	19: {
		132: [405, 311, "1"],
		148: [405, 327, "6"],
		164: [405, 343, "?"],
		180: [405, 359, ""]
	},
	20: {
		132: [421, 311, "2"],
		148: [421, 327, "7"],
		164: [421, 343, "("],
		180: [421, 359, " "]
	},
	21: {
		132: [437, 311, "3"],
		148: [437, 327, "8"],
		164: [437, 343, ")"],
		180: [437, 359, ""]//end
	},
	22: {
		132: [453, 311, "4"],
		148: [453, 327, "9"],
		164: [453, 343, " "],
		180: [453, 359, ""]//end
	},
	23: {
		132: [469, 311, " "],
		148: [469, 327, " "],
		164: [469, 343, " "],
		180: [469, 359, " "]
	},
	24: {
		132: [485, 311, " "],
		148: [485, 327, " "],
		164: [485, 343, " "],
		180: [485, 359, " "]
	},
	25: {
		132: [501, 311, " "],
		148: [501, 327, " "],
		164: [501, 343, " "],
		180: [501, 359, " "]
	}

};

export default class RegisterName {
	constructor(music, slot = 0) {
		this.nameText = [];

		// Create a new image for the name select screen
		this.registerNameSheet = new Image();
		this.registerNameSheet.src = "img/intro/charSelect/charSelect.png";

		// This page depends on music from the previous page
		this.music = music;

		// This page depends on the save slot from the previous page selected
		this.slot = slot;

		this.barIndex = 0;
		this.barTick = 0;

		// Initial position for first column of letters on registerMame.png
		this.barXPos = 5;

		// Current position of the character displayed in name field
		this.currentCharIndex = 0;
		this.loopBool = true;

		// Cursor's horizontal movement Counters, for mirage of infinite scroll
		this.cursorMoveCount = 0;
		this.secondCursorMoveCount = -32;

		// Main horizontal counters for assignment of critical values
		this.cursorTotalMoveCount = 0;
		this.cursorAndButtonTrack = [];

		// Values shared for looping through characterIndex of name field
		this.i = 0;
		this.loopCharIndex = 0;

		// Coordinates x, y of chosen character of charSelect.png
		this.xPosHolder = [];
		this.yPosHolder = [];

		// Holders for the case of '<' or '>' pressed. Will insert previous value for the respective currentcharacter position
		this.horizontalStorage = [];
		this.verticalStorage = [];

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
			if (event.keyCode === KeyCodes.DOWN && this.barIndex < POS.length - 1) {
				this.barTick++;
			} else if (event.keyCode === KeyCodes.UP && this.barIndex > 0) {
				this.barTick--;
			} else if (event.keyCode === KeyCodes.LEFT) {
				this.cursorMoveCount--;
				this.secondCursorMoveCount--;
				this.cursorTotalMoveCount--;
			} else if (event.keyCode === KeyCodes.RIGHT) {
				this.cursorMoveCount++;
				this.secondCursorMoveCount++;
				this.cursorTotalMoveCount++;

			} else if ([KeyCodes.Y, KeyCodes.B, KeyCodes.X, KeyCodes.A].indexOf(event.keyCode) !== -1) {
				Sound.play(("link/lowHealth"));
				this.nameText[this.currentCharIndex] = [this.cursorTotalMoveCount, POS[this.barIndex]];

				// If cursor was positioned at 'END' at the time of  (Y or B or X or A) pressed
				if (this.nameText[this.currentCharIndex].equals([2, 180])||(this.nameText[this.currentCharIndex].equals([3, 180]))
					||(this.nameText[this.currentCharIndex].equals([14, 180]))||(this.nameText[this.currentCharIndex].equals([15, 180]))
					||(this.nameText[this.currentCharIndex].equals([21, 180]))||(this.nameText[this.currentCharIndex].equals([22, 180]))) {
					this._terminate();
				}

				// If cursor was positioned at '<' at the time of (Y or B or X or A) pressed
				if (this.nameText[this.currentCharIndex].equals([-1, 180])||(this.nameText[this.currentCharIndex].equals([11, 180]))
					||(this.nameText[this.currentCharIndex].equals([18, 180]))) {

					this.nameText[this.currentCharIndex] = [this.horizontalStorage[this.currentCharIndex], this.verticalStorage[this.currentCharIndex]];
					if (this.currentCharIndex === 0){

						if(this.xPosHolder.length !== MAX_CHAR) {
						 this.xPosHolder.length = MAX_CHAR;
						 this.xPosHolder.fill(5, this.yPosHolder.length, this.xPosHolder.length);
						 let yLength = this.yPosHolder.length;
						 this.yPosHolder.length = MAX_CHAR;
						 this.yPosHolder.fill(359, yLength, this.xPosHolder.length);
						 }

						this.currentCharIndex = this.currentCharIndex + 4;
						this.loopCharIndex = this.loopCharIndex + 4;
					} else {
						this.currentCharIndex = this.currentCharIndex - 2;
						this.loopCharIndex = this.loopCharIndex - 2;
					}
				}
				// If cursor was positioned at '>' at the time of (Y or B or X or A) pressed
				else if (this.nameText[this.currentCharIndex].equals([0, 180])||(this.nameText[this.currentCharIndex].equals([12, 180]))
					||(this.nameText[this.currentCharIndex].equals([19, 180]))) {
					this.nameText[this.loopCharIndex] = [this.horizontalStorage[this.loopCharIndex], this.verticalStorage[this.loopCharIndex]];
				}

				this.currentCharIndex = (this.currentCharIndex + 1) % MAX_CHAR;
				this.cursorAndButtonTrack[this.i] = this.cursorTotalMoveCount * MAIN_DISTANCE + 101;
				this.loopCharIndex++;
				if (this.loopBool === false) {
					this.loopCharIndex = (this.loopCharIndex + 1) % 7;
					this.loopBool = true;
				}

			} else if (event.keyCode === KeyCodes.START) {
				this._terminate();
			}
		};
	}

	_terminate() {
		let isValid = this.nameText.reduce((prev, cur) => {
			return prev || CHAR_MAP[cur[0]][cur[1]][2].length > 0;
		}, false);

		if (this.nameText.length === 0 || !isValid) {
			Sound.play("menu/error");
		} else {
			let name = this.nameText.reduce((prev, val) => {
				return prev + CHAR_MAP[val[0]][val[1]][2];
			}, "");
			let state = {
				charName: name,
				hearts: 3,
				slot: this.slot
			};

			Storage.save(state, this.slot);

			Sound.play(("menu/select"));
			// Go back to the name select screen
			State.pop({
				dontPause: true
			});
		}
	}

	update() {
		this.animateBar();
		this.resetCursorIndex();
	}

	resetCursorIndex() {
		// Give mirage of infinite letters
		if (this.cursorMoveCount === 32) {
			this.cursorMoveCount = 0;
			this.secondCursorMoveCount = -32;
		}
		if (this.cursorMoveCount === -3) {
			this.secondCursorMoveCount = 29;
		}
		if (this.cursorMoveCount === -32) {
			this.cursorMoveCount = 0;
			this.secondCursorMoveCount = -32
		}
		if (this.secondCursorMoveCount === 51) {
			this.cursorMoveCount = 19;
			this.secondCursorMoveCount = -13;
		}
		// Bound number of total cursor movements(horizontal only): (0-26)
		if (this.cursorTotalMoveCount > 25) {
			this.cursorTotalMoveCount = -6;
		}
		else if (this.cursorTotalMoveCount < -9) {
			this.cursorTotalMoveCount = 22;
		}
	}

	animateBar() {
		if (this.barTick > 0) {
			this.barTick++;

			if (this.barTick >= MAIN_DISTANCE) {
				this.barTick = 0;
				this.barIndex++;
			}
		} else if (this.barTick < 0) {
			this.barTick--;

			if (this.barTick <= -MAIN_DISTANCE) {
				this.barTick = 0;
				this.barIndex--;
			}
		}

	}

	draw() {
		Context.clearRect(0, 0, Canvas.width, Canvas.height);

		// Draw the background
		Context.drawImage(
			this.registerNameSheet,
			1,
			1,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT,
			0,
			0,
			Constants.GAME_WIDTH,
			Constants.GAME_HEIGHT);

		// Draw register your name text
		Context.drawImage(
			this.registerNameSheet,
			3,
			229,
			158,
			13,
			41,
			39,
			158,
			13);

		// Draw letters
		Context.drawImage(
			this.registerNameSheet,
			this.barXPos + this.cursorMoveCount * 16,
			310,
			200,
			62,
			31,
			126,
			200,
			62);

		// Redraw letters after looping through
		Context.drawImage(
			this.registerNameSheet,
			this.secondCursorMoveCount * 16 + 5,
			310,
			200,
			62,
			31,
			126,
			200,
			62);

		// Draw horizontal bar
		Context.drawImage(
			this.registerNameSheet,
			1,
			225,
			208,
			1,
			23,
			POS[this.barIndex] + this.barTick,
			208,
			1);

		// Draw heart
		Context.drawImage(
			this.registerNameSheet,
			253,
			232,
			8,
			7,
			30 + (this.currentCharIndex * MAIN_DISTANCE),
			87,
			8,
			7);

		this.drawName();
	}

	drawName() {
		// Collect x,y coordinates of characters on charSelect.png
		for (this.i = 0; this.i < this.loopCharIndex; this.i++) {
			let [x, y] = this.nameText[this.i];
			let [xCor, yCor] = CHAR_MAP[x][y];
			if (((xCor === 85)||(xCor === 101)||(xCor === 277)||(xCor === 293)||(xCor === 389)||(xCor === 405))
				&& (yCor === 359)){
			} else {
				this.yPosHolder[this.i] = yCor;
				this.xPosHolder[this.i] = xCor;

				this.horizontalStorage[this.i] = x;
				this.verticalStorage[this.i] = y;
			}

			if (this.yPosHolder.length === 6){

			}

			if (this.loopCharIndex === 6) {
				this.loopBool = false;
			}
		}
		// Display all characters, using previous x,y coordinates
		for (let j = 0; j < 6; j++) {
			console.log(this.xPosHolder[j],this.nameText);
			//console.log(this.xPosHolder.slice(-1)[0]);
			Context.drawImage(
				this.registerNameSheet,
				this.xPosHolder[j],
				this.yPosHolder[j],
				7,
				13,
				31 + (j * MAIN_DISTANCE),
				96,
				7,
				13);
		}
	}
}