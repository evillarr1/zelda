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

const OBJECTS = {
	static: [
		[30, 0, 10, 250], //left
		[214, 0, 10, 250], //right
		[0, 65, 300, 10], //up
		[0, 198, 120, 500], //down
		[136, 198, 114, 500], //down
		[55, 70, 32, 40],
		[151, 110, 48, 34], //large table
		[55, 158, 32, 24], //small table
		[167, 142, 16, 16], //bottom stool
		[167, 95, 16, 16], //top stool
		[167, 46, 32, 32],
		[190, 159, 16, 16],
	],
	movable: [
		[39, 70, 16, 16],
		[39, 86, 16, 16],
		[39, 102, 16, 16]
	]
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
				volume: 0.5,
				sprite: {
					complete: [0, 27141],
					riseOnly: [6800, 27141]
				},
				onend: () => {
					this.music.openingDemo.play("riseOnly");
				}
			})
		};

		Player.setLevelObjects(OBJECTS);

		let blueMask = () => {
			Context.beginPath();
			Context.globalAlpha = 0.6;
			Context.fillStyle = "#040188";
			Context.fillRect(0, 0, Canvas.width, Canvas.height);
			Context.fill();
			Context.globalAlpha = 1;
			Context.closePath();
		};

		this.storyStateIndex = 0;
		this.storyState = [() => {
			blueMask();

			Paint.draw("LINK_SLEEPING_IN_BED", "UP", 56, 72, "link");
			if (Animate.openingCircle(this)) {
				this.storyState.shift();
				this.storyStateIndex++;
			}
		}, () => {
			blueMask();

			Paint.draw("LINK_SLEEPING_IN_BED", "UP", 56, 72, "link");
			if (Text.drawScrollText(38, 145)) {
				this.music.openingDemo.play("complete");
				this.storyState.shift();
				this.storyStateIndex++;
			}
		}, () => {
			if (Animate.linkSnoozing(this, 56, 61)) {
				Paint.draw("LINK_SITTIN_IN_BED", "UP", 56, 66, "link");
				Text.write(Link.charName + DIALOGUE.ZELDA, 40, 152, false, true);
			}
		}, () => {
			if (Animate.linkJumpingOffBed(this, 56, 66)) {
				Paint.draw("UNCOVERED_COMFORTER", "UP", 56, 86, "link");
				this.storyState.shift();
				this.storyStateIndex++;
				Player.action("STAND", "RIGHT");
				Player.postion(90, 75);
				Player.draw();
			}
		}, () => {
			Paint.draw("UNCOVERED_COMFORTER", "UP", 56, 86, "link");
			Player.draw();
		}];

		this.storyState.splice(0, 0);
		this.storyStateIndex += 0;

		Text.setScrollText(DIALOGUE.SCROLL);

		this.currentStrokes = new Map();

		// Setup the key bindings
		this.keyboard = document.onkeydown = (event) => {
			if ([KeyCodes.Y, KeyCodes.B, KeyCodes.X, KeyCodes.A, KeyCodes.START].indexOf(event.keyCode) !== -1) {
				Text.animateScroll();
				if (this.storyStateIndex === 2) {
					this.storyState.shift();
					this.storyStateIndex++;
				}
			}

			if (event.keyCode === KeyCodes.DOWN) {
				this.currentStrokes.delete("UP");
				this.currentStrokes.set("DOWN", true);
			}

			if (event.keyCode === KeyCodes.UP) {
				this.currentStrokes.delete("DOWN");
				this.currentStrokes.set("UP", true);
			}

			if (event.keyCode === KeyCodes.LEFT) {
				this.currentStrokes.delete("RIGHT");
				this.currentStrokes.set("LEFT", true);
			}

			if (event.keyCode === KeyCodes.RIGHT) {
				this.currentStrokes.delete("LEFT");
				this.currentStrokes.set("RIGHT", true);
			}
		};

		document.onkeyup = (event) => {
			if (event.keyCode === KeyCodes.DOWN) {
				this.currentStrokes.delete("DOWN");
			}

			if (event.keyCode === KeyCodes.UP) {
				this.currentStrokes.delete("UP");
			}

			if (event.keyCode === KeyCodes.LEFT) {
				this.currentStrokes.delete("LEFT");
			}

			if (event.keyCode === KeyCodes.RIGHT) {
				this.currentStrokes.delete("RIGHT");
			}
		}
	}

	update() {
		Player.action("STEP", Array.from(this.currentStrokes.keys()));

		if (this.currentStrokes.size === 0) {
			Player.action("STAND");
		}
	}

	draw() {
		Context.clearRect(0, 0, Canvas.width, Canvas.height);
		Paint.drawFloor("HOUSE_FLOOR");

		IntroDemo.leftWall();
		IntroDemo.rightWall();
		IntroDemo.bottomWall();
		IntroDemo.topWall();
		IntroDemo.floor();
		IntroDemo.specialObjects();

		this.storyState[0]();
		IntroDemo.traitOverlay();
		Paint.draw("DOOR_FRAME", "DOWN", 112, 198);
	}

	static floor() {
		// Static elements
		Paint.draw("POT_STAND", "LEFT", 39, 70);
		Paint.draw("POT_STAND", "LEFT", 39, 86);
		Paint.draw("POT_STAND", "LEFT", 39, 102);
		Paint.draw("BED", "UP", 55, 70);
		Paint.draw("TABLE_LARGE", "UP", 151, 110);
		Paint.draw("TABLE_SMALL", "UP", 55, 158);
		Paint.draw("BENCH", "UP", 167, 142);
		Paint.draw("BENCH", "UP", 167, 94);
	}

	static topWall() {
		Paint.drawWall("HOUSE", "UP");

		Paint.draw("MOLDING", "UP", 63, 46);
		Paint.draw("CABINET_LARGE", "UP", 103, 46);
		Paint.draw("WELL", "UP", 167, 46);
	}

	static leftWall() {
		Paint.drawWall("HOUSE", "LEFT");

		Paint.draw("WINDOW", "LEFT", 15, 118);
	}

	static bottomWall() {
		Paint.drawWall("HOUSE", "DOWN");

		Paint.draw("WINDOW", "DOWN", 48, 198);
		Paint.draw("WINDOW", "DOWN", 174, 198);
		Paint.draw("DOOR", "DOWN", 112, 198);
	}

	static rightWall() {
		Paint.drawWall("HOUSE", "RIGHT");

		Paint.draw("WINDOW", "RIGHT", 215, 118);
	}

	static traitOverlay() {
		Paint.draw("TRAIT", "LEFT", 9, 20);
		Paint.draw("TRAIT", "LEFT2", 26, 20);
		Paint.draw("TRAIT", "MIDDLE_RUPEE", 67, 21);
		Paint.draw("TRAIT", "MIDDLE_BOMB", 92, 21);
		Paint.draw("TRAIT", "MIDDLE_ARROW", 114, 20);
		Paint.draw("TRAIT", "RIGHT", 166, 17);
	}

	static specialObjects() {
		Paint.draw("POT", "UP", 41, 70);
		Paint.draw("POT", "UP", 41, 86);
		Paint.draw("POT", "UP", 41, 102);
		Paint.draw("CHEST_CLOSED", "UP", 190, 158);
	}
}