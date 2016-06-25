"use strict";

export default class SaveLoad {
	static save(state) {
		localStorage.setItem("ZELDA", JSON.stringify(state));
	}

	static load() {
		if (!localStorage.hasOwnProperty("ZELDA")) {
			return false;
		}

		return JSON.parse(localStorage.getItem("ZELDA"));
	}
}