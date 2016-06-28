"use strict";

export default class IntroDemo {
	constructor() {
		this.charSelectSheet = new Image();
		this.charSelectSheet.src = "/img/generic/houseInterior.png";

		// Create the music element for the screen
		this.music = new Howl({
			urls: ["/sounds/weather/wind.m4a"],
			autoplay: true,
			loop: true,
			volume: 0.6
		});

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
		};
	}

	draw() {
		Context.clearRect(0, 0, Canvas.width, Canvas.height);
		IntroDemo.leftWall();
		IntroDemo.bottomWall();
		IntroDemo.topWall();
		IntroDemo.rightWall()
	}

	static topWall() {
		Structure.drawWall("HOUSE", "TOP");

		Structure.drawX("TILE", "TOP", 39, 54, 8, 22);
		Structure.draw("MOLDING", "TOP", 63, 30);
		Structure.draw("CABINET_LARGE", "TOP", 103, 30);
		Structure.draw("WELL", "TOP", 167, 30);
	}

	static leftWall() {
		Structure.drawWall("HOUSE", "LEFT");

		Structure.drawX("TILE", "BOTTOM", 39, 190, 8, 22);
		Structure.draw("WINDOW", "LEFT", 15, 108);
	}

	static bottomWall() {
		Structure.drawWall("HOUSE", "BOTTOM");

		Structure.drawX("TILE", "LEFT", 39, 62, 8, 16);
		Structure.draw("WINDOW", "BOTTOM", 48, 198);
		Structure.draw("WINDOW", "BOTTOM", 174, 198);
		Structure.draw("DOOR", "BOTTOM", 174, 198);
		Structure.draw("WINDOW", "BOTTOM", 174, 198);
	}

	static rightWall() {
		Structure.drawWall("HOUSE", "RIGHT");

		Structure.drawX("TILE", "RIGHT", 207, 62, 8, 16);
		Structure.draw("WINDOW", "RIGHT", 215, 108);
	}
}