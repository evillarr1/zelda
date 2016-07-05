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
				src: [`/sounds/${soundName}.m4a`]
			});
		}

		// Only play the sound if it isn't already playing already
		if (sound.playing()) {
			sound.play();
		}
	}
}