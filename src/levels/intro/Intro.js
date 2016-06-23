"use strict";

import Title from "./title/title";
import NameSelect from "./nameSelect/nameSelect";
import KeyCodes from "../../constants/KeyCodes";

export default class Intro {
	constructor() {
		document.onkeydown = (event) => {
			if (event.keyCode === KeyCodes.A) {
				let nameSelect = new NameSelect();

				State.pop();
				State.push(nameSelect);
			} else if (event.keyCode === KeyCodes.DOWN) {

			}
		};

		// Create title object
		let title = new Title();

		State.push(title);
	}
}