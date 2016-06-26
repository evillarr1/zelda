"use strict";

export default class SaveLoad {
	static save(state, slot = 0) {
		localStorage.setItem(`ZELDA-${slot}`, JSON.stringify(state));
	}

	static load(slot) {
		if (!localStorage.hasOwnProperty(`ZELDA-${slot}`)) {
			return false;
		}

		return JSON.parse(localStorage.getItem(`ZELDA-${slot}`));
	}

	static remove(slot) {
		localStorage.removeItem(`ZELDA-${slot}`);
	}
}