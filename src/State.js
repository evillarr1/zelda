"use strict";

export default class State {
	constructor() {
		this.state = [];
	}

	push(el) {
		this.state.push(el);
	}

	peek() {
		return this.state.peek();
	}

	pop() {
		let el = this.state.pop();

		if (el.music) {
			el.music.pause();
		}

		return el;
	}
}
