"use strict";

export default class State {
	constructor() {
		this.state = [];
	}

	popAndPush(el, options) {
		this.state.pop(options);
		this.state.push(el);
	}

	push(el) {
		this.state.push(el);

		// Add the binding again, in case pop is called first.
		document.onkeydown = el.keyboard;
	}

	peek() {
		return this.state.peek();
	}

	pop(options = {}) {
		let el = this.state.pop();

		// Pause the music if it is currently playing
		if (el.music && !options.dontPause) {
			let keys = Object.keys(el.music);

			for (let i = 0; i < keys.length; i++) {
				el.music[keys[i]].pause()
			}
		}

		// Remove any key bindings from the previous event handler
		document.onkeydown = null;

		if (this.state.length > 0) {
			let newState = this.peek();

			// Add the keybindings from the previous state
			document.onkeydown = newState.keyboard;

			// Perform any updates needed by the previous state
			if (newState.loadState) {
				newState.loadState();
			}
		}

		// Clear the objects from the level
		Player.mapObjects = {};

		return el;
	}
}
