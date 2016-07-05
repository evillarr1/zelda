"use strict";

export default class Sound {
	constructor() {
		this.sounds = {};
	}

	play(soundName, whenReady) {
		let sound;

		if (this.sounds[soundName]) {
			sound = this.sounds[soundName];
		} else {
			sound = this.sounds[soundName] = new Howl({
				src: [`/sounds/${soundName}.m4a`]
			});
		}

		// If whenReady is set, then only play the sound if it isn't already playing
		if (!whenReady || (whenReady && !sound.playing())) {
			sound.play();
		}
	}
}