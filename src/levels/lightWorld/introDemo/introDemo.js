"use strict";

import Keyboard from "keyboardjs";
import LinksHouse from "./LinksHouse";
import NPC from "../../../core/NPC";

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

		this.uncle = new NPC("UNCLE");
		this.uncle.setLevelObjects(new OBJECTS());
		this.uncle.setCurrentAction("SITTING", "DOWN");
		this.uncle.setPosition(165, 85);

		Player.setLevelObjects(new OBJECTS());
		Player.actions("STAND", "RIGHT");
		Player.setPosition(90, 75);

		this.storyStateIndex = 0;
		this.storyState = [() => {
			Animate.openingCircle();
			this.storyState.shift();
			this.storyStateIndex++;
		}, () => {
			this.init();
			Paint.draw("SLEEPING_IN_BED", "UP", 56, 72, "link", "LINK");
			this.blueMask();

			if (!Animate.isAnimating()) {
				if (Text.drawScrollText(38, 145)) {
					this.music.openingDemo.play("intro");
					this.storyState.shift();
					this.storyStateIndex++;
					Animate.linkSnoozing(56, 61);
				}
			}
		}, () => {
			this.init();

			if (!Animate.isAnimating()) {
				Paint.draw("SITTIN_IN_BED", "UP", 56, 66, "link", "LINK");
				this.uncle.setCurrentAction("SITTING", "LEFT");
				Text.write(Link.charName + DIALOGUE.ZELDA, 40, 152, false, true);
			}
		}, () => {
			this.init();
			Paint.draw("SITTIN_IN_BED", "UP", 56, 66, "link", "LINK");

		}, () => {
			this.init();

			if (!Animate.isAnimating()) {
				Keyboard.setContext("Player");
				Paint.draw("UNCOVERED_COMFORTER", "UP", 56, 86, "link", "LINK");
				this.storyState.shift();
				this.storyStateIndex++;
				Player.draw();
			}
		}, () => {
			Paint.draw("UNCOVERED_COMFORTER", "UP", 56, 86, "link", "LINK");
			Player.draw();
			Paint.draw("DOOR_FRAME", "DOWN", 112, 198);
		}];

		// Display the dialogue text
		Text.setScrollText(DIALOGUE.SCROLL);

		this.currentStrokes = new Map();

		// Setup the key bindings
		Keyboard.withContext("level", () => {
			Keyboard.bind(["a", "s", "d", "w", "enter"], () => {
				Text.animateScroll();
				if (this.storyStateIndex === 3) {
					Animate.linkJumpingOffBed(56, 66);
					this.storyState.shift();
					this.storyStateIndex++;
				} else if (this.storyStateIndex === 2) {
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

		this.leftWall();
		this.rightWall();
		this.bottomWall();
		this.topWall();
		this.floor();
		this.specialObjects();

		this.uncle.draw();
		this.storyState[0]();
		MenuOverlay.drawDefaultOverlay();
		Animate.draw();
	}

	init() {
		Paint.draw("DOOR_FRAME", "DOWN", 112, 198);
		Paint.draw("POT", "UP", 41, 70);
		Paint.draw("POT", "UP", 41, 86);
		Paint.draw("POT", "UP", 41, 102);
	}

	blueMask() {
		Context.beginPath();
		Context.globalAlpha = 0.6;
		Context.fillStyle = "#040188";
		Context.fillRect(0, 0, Canvas.width, Canvas.height);
		Context.fill();
		Context.globalAlpha = 1;
		Context.closePath();
	}

	floor() {
		Paint.draw("POT_STAND", "LEFT", 39, 70);
		Paint.draw("POT_STAND", "LEFT", 39, 86);
		Paint.draw("POT_STAND", "LEFT", 39, 102);
		Paint.draw("BED", "UP", 55, 70);
		Paint.draw("TABLE_LARGE", "UP", 151, 110);
		Paint.draw("TABLE_SMALL", "UP", 55, 158);
		Paint.draw("BENCH", "UP", 167, 142);
		Paint.draw("BENCH", "UP", 167, 94);
	}

	topWall() {
		Paint.drawWall("HOUSE", "UP");

		Paint.draw("MOLDING", "UP", 63, 46);
		Paint.draw("CABINET_LARGE", "UP", 103, 46);
		Paint.draw("WELL", "UP", 167, 46);
	}

	leftWall() {
		Paint.drawWall("HOUSE", "LEFT");

		Paint.draw("WINDOW", "LEFT", 15, 118);
	}

	bottomWall() {
		Paint.drawWall("HOUSE", "DOWN");

		Paint.draw("WINDOW", "DOWN", 48, 198);
		Paint.draw("WINDOW", "DOWN", 174, 198);
		Paint.draw("DOOR", "DOWN", 112, 198);
	}

	rightWall() {
		Paint.drawWall("HOUSE", "RIGHT");

		Paint.draw("WINDOW", "RIGHT", 215, 118);
	}

	specialObjects() {
		Paint.draw("CHEST_CLOSED", "UP", 190, 158);
	}
}