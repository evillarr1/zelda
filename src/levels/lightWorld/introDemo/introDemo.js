"use strict";

import KeyCodes from "../../../constants/KeyCodes";

const DIALOGUE = {
	SCROLL: `Help me...

Please help me...

I am a prisoner in the dungeon
of the castle.
My name is Zelda.

The wizard, Agahnim, has done...
something to the other missing
girls. Now only I remain...

Agahnim has seized control of
the castle and is now trying to
open the seven wise men's

seal. ... ...
I am in the dungeon of the
castle.

Please help me...`
};

export default class IntroDemo {
	constructor() {
		// Create the music element for the screen
		this.music = new Howl({
			urls: ["/sounds/weather/wind.m4a"],
			autoplay: true,
			loop: true,
			volume: 0.6
		});

		Text.setScrollText(DIALOGUE.SCROLL);

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
			if ([KeyCodes.Y, KeyCodes.B, KeyCodes.X, KeyCodes.A, KeyCodes.START].indexOf(event.keyCode) !== -1) {
				Text.animateScroll();
			}
		};
	}

	draw() {
		Context.clearRect(0, 0, Canvas.width, Canvas.height);
		IntroDemo.floor();
		IntroDemo.leftWall();
		IntroDemo.bottomWall();
		IntroDemo.topWall();
		IntroDemo.rightWall();
		Text.drawScrollText(38, 145);
	}

	static floor() {
		Structure.drawFloor("HOUSE_FLOOR");
	}

	static topWall() {
		Structure.drawWall("HOUSE", "TOP");

		Structure.draw("MOLDING", "TOP", 63, 30);
		Structure.draw("CABINET_LARGE", "TOP", 103, 30);
		Structure.draw("WELL", "TOP", 167, 30);
	}

	static leftWall() {
		Structure.drawWall("HOUSE", "LEFT");

		Structure.draw("WINDOW", "LEFT", 15, 108);
	}

	static bottomWall() {
		Structure.drawWall("HOUSE", "BOTTOM");

		Structure.draw("WINDOW", "BOTTOM", 48, 198);
		Structure.draw("WINDOW", "BOTTOM", 174, 198);
		Structure.draw("DOOR", "BOTTOM", 174, 198);
		Structure.draw("WINDOW", "BOTTOM", 174, 198);
	}

	static rightWall() {
		Structure.drawWall("HOUSE", "RIGHT");

		Structure.draw("WINDOW", "RIGHT", 215, 108);
	}
}