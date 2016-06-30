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

Please help me...`,
	ZELDA: `, I'm going out for a
while. I'll be back by morning.
Don't leave the house.`
};

export default class IntroDemo {
	constructor() {
		// Create the music elements for the screen
		this.music = {
			"rain": new Howl({
				urls: ["/sounds/weather/rain.m4a"],
				autoplay: true,
				loop: true,
				volume: 0.3
			}),
			"openingDemo": new Howl({
				urls: ["/music/lightWorld/introDemo/openingDemo.m4a"],
				loop: true,
				volume: 0.5
			})
		};

		let blueMask = () => {
			Context.beginPath();
			Context.globalAlpha = 0.6;
			Context.fillStyle = "#040188";
			Context.fillRect(0, 0, Canvas.width, Canvas.height);
			Context.fill();
			Context.globalAlpha = 1;
			Context.closePath();
		};

		this.storyState = [() => {
			blueMask();

			if (Animate.openingCircle(this)) {
				this.storyState.shift();
			}
		}, () => {
			blueMask();

			if (Text.drawScrollText(38, 145)) {
				this.music.openingDemo.play();
				this.jumpOffBed = false;
				this.storyState.shift();
			}
		}, () => {
			if (Animate.linkSnoozing(this, 56, 61)) {
				Animate.linkJumpingOffBed(this, 56, 66, false);
				Text.write(Link.charName + DIALOGUE.ZELDA, 40, 152, false, true);

				if (this.jumpOffBed) {
					this.storyState.shift();
				}
			}
		}, () => {
			Animate.linkJumpingOffBed(this, 56, 66, true);
		}];

		Text.setScrollText(DIALOGUE.SCROLL);

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
			if ([KeyCodes.Y, KeyCodes.B, KeyCodes.X, KeyCodes.A, KeyCodes.START].indexOf(event.keyCode) !== -1) {
				Text.animateScroll();
				if (this.jumpOffBed === false) {
					this.jumpOffBed = true;
				}
			}
		};
	}

	draw() {
		Context.clearRect(0, 0, Canvas.width, Canvas.height);
		Structure.drawFloor("HOUSE_FLOOR");

		IntroDemo.leftWall();
		IntroDemo.rightWall();
		IntroDemo.bottomWall();
		IntroDemo.topWall();
		IntroDemo.floor();

		this.storyState[0]();
	}

	static floor() {
		// Static elements
		Structure.drawX("POT_STAND", "LEFT", 39, 70, 16, 3);
		Structure.draw("BED", "TOP", 55, 70);
		Structure.draw("TABLE_LARGE", "TOP", 151, 110);
		Structure.draw("TABLE_SMALL", "TOP", 55, 158);
		Structure.draw("BENCH", "TOP", 167, 142);
		Structure.draw("BENCH", "TOP", 167, 94);

		// Dynamic elements
		Structure.draw("POT", "TOP", 39, 70);
		Structure.draw("POT", "TOP", 39, 86);
		Structure.draw("POT", "TOP", 39, 102);
		Structure.draw("CHEST_CLOSED", "TOP", 190, 158);
	}

	static topWall() {
		Structure.drawWall("HOUSE", "TOP");

		Structure.draw("MOLDING", "TOP", 63, 46);
		Structure.draw("CABINET_LARGE", "TOP", 103, 46);
		Structure.draw("WELL", "TOP", 167, 46);
	}

	static leftWall() {
		Structure.drawWall("HOUSE", "LEFT");

		Structure.draw("WINDOW", "LEFT", 15, 118);
	}

	static bottomWall() {
		Structure.drawWall("HOUSE", "BOTTOM");

		Structure.draw("WINDOW", "BOTTOM", 48, 198);
		Structure.draw("WINDOW", "BOTTOM", 174, 198);
		Structure.draw("DOOR", "BOTTOM", 112, 198);
		Structure.draw("DOOR_FRAME", "BOTTOM", 112, 198);
	}

	static rightWall() {
		Structure.drawWall("HOUSE", "RIGHT");

		Structure.draw("WINDOW", "RIGHT", 215, 118);
	}
}