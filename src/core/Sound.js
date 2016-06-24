"use strict";

export default class Sound {
	constructor() {
	}

	playSound(soundName) {
		new Howl({
			urls: [`/sounds/${soundName}.mp4`]
		}).play();
	}
}