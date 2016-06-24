"use strict";

export default class Sound {
	constructor() {
		this.sounds = {};
	}

	playSound(soundName) {
		let sound;

		if (this.sounds[soundName]) {
			sound = this.sounds[soundName];
		} else {
			sound = this.sounds[soundName] = new Howl({
				urls: [`/sounds/${soundName}.m4a`]
			});
		}

		sound.play();
	}
}