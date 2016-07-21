"use strict";

import Keyboard from "keyboardjs";
import LinksHouse from "./LinksHouse";

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

const OBJECTS = function () {
	return {
		static: [
			[30, 0, 10, 250], //left
			[214, 0, 10, 250], //right
			[-100, 65, 300, 10], //up
			[0, 198, 120, 500], //down
			[136, 198, 114, 500], //down
			[54, 70, 34, 40],
			[150, 110, 48, 34], //large table
			[54, 158, 34, 24], //small table
			[167, 142, 16, 16], //bottom stool
			[167, 95, 16, 16], //top stool
			[167, 46, 32, 32],
			[190, 159, 16, 16],
		],
		special: {
			"POT_1": [39, 70, 16, 16, "POT_1", "LIFT", ["POT", "UP", 41, 70]],
			"POT_2": [39, 86, 16, 16, "POT_2", "LIFT", ["POT", "UP", 41, 86]],
			"POT_3": [39, 102, 16, 16, "POT_3", "LIFT", ["POT", "UP", 41, 102]]
		}
	}
};

export default class IntroDemo {
	constructor() {
		// Create the music elements for the screen
		this.music = {
			"rain": new Howl({
				src: ["/sounds/weather/rain.m4a"],
				autoplay: true,
				loop: true,
				volume: 0.3
			}),
			"openingDemo": new Howl({
				src: ["/music/lightWorld/introDemo/openingDemo.m4a"],
				volume: 0.5,
				sprite: {
					intro: [0, 6800]
				},
				onend: () => {
					this.music.openingDemoRise.play("rise");
				}
			}),
			"openingDemoRise": new Howl({
				src: ["/music/lightWorld/introDemo/openingDemo.m4a"],
				volume: 0.5,
				sprite: {
					rise: [6800, 27141, true]
				}
			})
		};

		Player.setLevelObjects(new OBJECTS());
		Player.actions("STAND", "RIGHT");
		Player.setPostion(90, 75);

		let blueMask = () => {
			Context.beginPath();
			Context.globalAlpha = 0.6;
			Context.fillStyle = "#040188";
			Context.fillRect(0, 0, Canvas.width, Canvas.height);
			Context.fill();
			Context.globalAlpha = 1;
			Context.closePath();
		};

		let initialPaint = () => {
			Paint.draw("DOOR_FRAME", "DOWN", 112, 198);
			Paint.draw("POT", "UP", 41, 70);
			Paint.draw("POT", "UP", 41, 86);
			Paint.draw("POT", "UP", 41, 102);
		}

		this.storyStateIndex = 0;
		this.storyState = [() => {
			Animate.openingCircle();
			this.storyState.shift();
		}, () => {
			initialPaint();
			Paint.draw("LINK_SLEEPING_IN_BED", "UP", 56, 72, "link");
			blueMask();

			if (!Animate.isAnimating()) {
				if (Text.drawScrollText(38, 145)) {
					this.music.openingDemo.play("intro");
					this.storyState.shift();
					this.storyStateIndex++;
					Animate.linkSnoozing(56, 61);
				}
			}
		}, () => {
			initialPaint();

			if (!Animate.isAnimating()) {
				Paint.draw("LINK_SITTIN_IN_BED", "UP", 56, 66, "link");
				Text.write(Link.charName + DIALOGUE.ZELDA, 40, 152, false, true);
			}
		}, () => {
			initialPaint();

			if (!Animate.isAnimating()) {
				Keyboard.setContext("Player");
				Paint.draw("UNCOVERED_COMFORTER", "UP", 56, 86, "link");
				this.storyState.shift();
				this.storyStateIndex++;
				Player.draw();
			}
		}, () => {
			Paint.draw("UNCOVERED_COMFORTER", "UP", 56, 86, "link");
			Player.draw();
			Paint.draw("DOOR_FRAME", "DOWN", 112, 198);
		}];

		this.storyState.splice(0, 0);
		this.storyStateIndex += 0;

		Text.setScrollText(DIALOGUE.SCROLL);

		this.currentStrokes = new Map();

		// Setup the key bindings
		Keyboard.withContext("level", () => {
			Keyboard.bind(["a", "s", "d", "w", "enter"], () => {
				Text.animateScroll();
				if (this.storyStateIndex === 1) {
					Animate.linkJumpingOffBed(56, 66);
					this.storyState.shift();
					this.storyStateIndex++;
				}
			});
		});
		Keyboard.setContext("level");

		document.querySelector("canvas").addEventListener('OFFMAP', function () {
			State.pop();

			let linksHouse = new LinksHouse();

			State.push(linksHouse);
		}, false);
	}

	update() {
		Player.update();
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
		MenuOverlay.drawDefaultOverlay();
		Animate.draw();
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

	static specialObjects() {
		Paint.draw("CHEST_CLOSED", "UP", 190, 158);
	}
}