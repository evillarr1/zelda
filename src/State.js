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

	pop() {
		let el = this.state.pop();

		// Pause the music if it is currently playing
		if (el.music) {
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
