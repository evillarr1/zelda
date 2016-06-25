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
	"c": [32, 56, 6, 13],
	"d": [48, 56, 6, 13],
	"e": [64, 56, 6, 13],
	"f": [80, 56, 6, 13],
	"g": [96, 56, 6, 13],
	"h": [112, 56, 6, 13],
	"i": [130, 56, 3, 13],
	"j": [144, 56, 6, 13],
	"k": [0, 72, 6, 13],
	"l": [16, 72, 3, 13],
	"m": [32, 72, 7, 13],
	"n": [48, 72, 6, 13],
	"o": [64, 72, 6, 13],
	"p": [80, 72, 6, 13],
	"q": [96, 72, 6, 13],
	"r": [112, 72, 6, 13],
	"s": [128, 72, 6, 13],
	"t": [144, 72, 6, 13],
	"u": [0, 88, 6, 13],
	"v": [16, 88, 7, 13],
	"w": [32, 88, 7, 13],
	"x": [48, 88, 7, 13],
	"y": [64, 88, 7, 13],
	"z": [80, 88, 6, 13],
	"0": [0, 42, 6, 13],
	"1": [16, 42, 6, 13],
	"2": [32, 42, 4, 13],
	"3": [48, 42, 6, 13],
	"4": [64, 42, 6, 13],
	"5": [80, 42, 6, 13],
	"6": [96, 42, 6, 13],
	"7": [112, 42, 6, 13],
	"8": [128, 42, 6, 13],
	"9": [144, 42, 6, 13],
	"-": [0, 101, 6, 13],
	".": [16, 101, 6, 13],
	",": [32, 101, 6, 13],
	"!": [48, 101, 6, 13],
	"?": [64, 101, 6, 13],
	"(": [80, 101, 6, 15],
	")": [96, 101, 6, 15]
};
export default class Text {
	constructor() {
		// Create a new image for the name select screen
		this.text = new Image();
		this.text.src = "img/characters.png";
	}

	write(text, xPos, yPos, xSep = 8) {
		for (let i = 0; i < text.length; i++) {
			let [xCor, yCor, xWidth, yWidth]= CHAR_MAP[text[i]];

			Context.drawImage(
				this.text,
				xCor,
				yCor,
				xWidth,
				yWidth,
				xPos + (xSep * i),
				yPos,
				xWidth,
				yWidth);
		}
	}
}