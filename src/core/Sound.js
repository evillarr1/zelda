"use strict";

export default class Sound {
	constructor() {
		this.sounds = {};
	}

	play(soundName) {
		let sound;

		if (this.sounds[soundName]) {
			sound = this.sounds[soundName];
		} else {
			sound = this.sounds[soundName] = new Howl({
				urls: [`/sounds/${soundName}.m4a`]
			});
		}

		// Only play the sound if it isn't already playing already
		if (sound._audioNode[0].paused) {
			sound.play();
		}
	}
}