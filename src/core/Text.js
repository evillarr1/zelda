"use strict";

const CHAR_MAP = {
	"A": [0, 0, 6, 13],
	"B": [16, 0, 6, 13],
	"C": [32, 0, 6, 13],
	"D": [48, 0, 6, 13],
	"E": [64, 0, 6, 13],
	"F": [80, 0, 6, 13],
	"G": [96, 0, 6, 13],
	"H": [112, 0, 6, 13],
	"I": [130, 0, 3, 13],
	"J": [144, 0, 6, 13],
	"K": [0, 14, 6, 13],
	"L": [16, 14, 6, 13],
	"M": [32, 14, 7, 13],
	"N": [48, 14, 6, 13],
	"O": [64, 14, 6, 13],
	"P": [80, 14, 6, 13],
	"Q": [96, 14, 6, 13],
	"R": [112, 14, 6, 13],
	"S": [128, 14, 6, 13],
	"T": [144, 14, 6, 13],
	"U": [0, 28, 6, 13],
	"V": [16, 28, 7, 13],
	"W": [32, 28, 7, 13],
	"X": [48, 28, 7, 13],
	"Y": [64, 28, 7, 13],
	"Z": [80, 28, 6, 13],
	"a": [0, 56, 6, 13],
	"b": [16, 56, 6, 13],
	"c": [32, 56, 5, 13],
	"d": [48, 56, 6, 13],
	"e": [64, 56, 6, 13],
	"f": [80, 56, 6, 13],
	"g": [96, 56, 6, 15],
	"h": [112, 56, 6, 13],
	"i": [130, 56, 3, 13],
	"j": [144, 56, 6, 14],
	"k": [1, 72, 6, 13],
	"l": [19, 72, 3, 13],
	"m": [33, 72, 7, 13],
	"n": [49, 72, 6, 13],
	"o": [65, 72, 6, 13],
	"p": [81, 72, 6, 15],
	"q": [96, 72, 6, 15],
	"r": [113, 72, 5, 13],
	"s": [129, 72, 6, 13],
	"t": [145, 72, 6, 13],
	"u": [1, 87, 6, 13],
	"v": [17, 87, 7, 13],
	"w": [33, 87, 7, 13],
	"x": [48, 87, 7, 13],
	"y": [65, 87, 7, 16],
	"z": [81, 87, 6, 14],
	"0": [0, 42, 6, 13],
	"1": [16, 42, 6, 13],
	"2": [32, 42, 6, 13],
	"3": [48, 42, 6, 13],
	"4": [64, 42, 6, 13],
	"5": [80, 42, 6, 13],
	"6": [96, 42, 6, 13],
	"7": [112, 42, 6, 13],
	"8": [128, 42, 6, 13],
	"9": [144, 42, 6, 13],
	"-": [0, 102, 6, 13],
	".": [17, 103, 3, 13],
	",": [33, 103, 4, 14],
	"!": [48, 103, 6, 13],
	"?": [64, 103, 7, 13],
	"(": [80, 103, 6, 15],
	")": [96, 103, 6, 15],
	"'": [113, 103, 4, 15],
	" ": [-20, -20, 4, 0]
};

const TICK = 1;
const MAX_ANIMATION_INTERVAL = 5;
const HORIZONTAL_SPACE = 16;

export default class Text {
	constructor() {
		// Create a new image for the name select screen
		this.text = new Image();
		this.text.src = "img/characters.png";
		this.mainSheet = new Image();
		this.mainSheet.src = "img/mainSheet.png";

		this.charTick = 0;
		this.charInterval = 0;
		this.scrollStr = "";
		this.isScrolling = 0;
		this.scrollingTick = 0;
		this.displayComplete = false;
	}

	write(text, xPos, yPos, displayComplete, showFrame = false) {
		let offset = 0;
		let newLine = 0;

		for (let i = 0; i < text.length; i++) {
			// Increase the newline count to start the next text in a new line.
			// Reset the offset so that the text starts at the beginning of the line
			if (text[i] === "\n") {
				newLine++;
				offset = 0;
			} else {
				let [xCor, yCor, width, height]= CHAR_MAP[text[i]];

				if (showFrame) {
					Paint.draw("TEXT_BOX_FRAME", "TOP", xPos - 8, yPos - 9);
				}

				// If the text is currently animating and it is the first line, perform a clipping animation on it
				if (this.isScrolling && newLine === 0) {
					Context.drawImage(
						this.text,
						xCor,
						yCor + this.scrollingTick,
						width,
						height - this.scrollingTick,
						xPos + offset,
						yPos + (HORIZONTAL_SPACE * newLine),
						width,
						height - this.scrollingTick);
				} else {
					Context.drawImage(
						this.text,
						xCor,
						yCor,
						width,
						height,
						xPos + offset,
						yPos + ((HORIZONTAL_SPACE * newLine) - this.scrollingTick),
						width,
						height);
				}

				offset += width;
			}
		}

		// If the animation has reached the final interval, reset back to 0
		if (this.isScrolling >= MAX_ANIMATION_INTERVAL) {
			this.isScrolling = 0;
		} else if (this.isScrolling > 0 && displayComplete) {
			// If the animation is turned on, but not on its final interval, pop the first line off
			if (this.scrollingTick >= HORIZONTAL_SPACE - 1) {
				let splitStr = this.scrollStr.split("\n");
				let slice = splitStr.splice(0, 1);

				this.scrollingTick = 0;
				this.scrollStr = splitStr.join("\n");
				this.isScrolling++;
				// Reduce the number of characters by the number of characters that was just removed
				this.charInterval -= slice[0].length;
			} else {
				this.scrollingTick++;
			}
		}
	}

	setScrollText(paragraph) {
		this.scrollStr = paragraph;
	}

	drawScrollText(xPos, yPos) {
		let displayComplete = false;

		// Don't do anything if we don't have anymore text
		if (!this.scrollStr) {
			return true;
		}

		// Split the string into the first 4 lines
		let str = this.scrollStr.split("\n", 3).join("\n");

		// If the text is done animating and the text has fully displayed, then allow for more animations
		if (this.charInterval >= str.length) {
			displayComplete = true;

			if (this.isScrolling === 0) {
				// Only play the complete sound once
				if (!this.displayComplete) {
					Sound.play("menu/textDone");
				}
				this.displayComplete = true;
			}
		} else if (this.charTick++ >= TICK) {
			// Slowly increase the number of characters using the interval
			this.charTick = 0;
			this.charInterval++;
			Sound.play("menu/textLetter");
		}

		// Cut out only the characters needed in this interval
		str = str.slice(0, this.charInterval);

		this.write(str, xPos, yPos, displayComplete);
	}

	animateScroll() {
		// Don't do anything if we don't have anymore text or if the text is currently animating/displaying
		if (!this.scrollStr || !this.displayComplete) {
			return true;
		}

		// If no new lines exist in the paragraph, then just remove the line
		if (!this.scrollStr.match("\n")) {
			this.scrollStr = this.scrollStr.split("\n").slice(1).join("\n");
		} else {
			// Start animating
			this.isScrolling++;
			this.displayComplete = false;
		}
	}
}