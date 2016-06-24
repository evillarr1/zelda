"use strict";

export default class State {
	constructor() {
		this.state = [];
	}

	push(el) {
		this.state.push(el);

		// Add the binding again, in case pop is called first.
		document.onkeydown = el.keyboard;
	}

	peek() {
		return this.state.peek();
	}

	pop(options) {
		let el = this.state.pop();

		// Pause the music if it is currently playing, unless if the keepMusic option is passed in
		if (el.music && (!options || !options.keepMusic)) {
			el.music.pause();
		}

		// Remove any key bindings from the previous event handler
		document.onkeydown = null;

		// Add the keybindings from the previous state
		if (this.state.length > 0) {
			document.onkeydown = this.peek().keyboard;
		}

		return el;
	}
}
