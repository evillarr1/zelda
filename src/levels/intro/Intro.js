"use strict";

import Title from "./title/title";
import NameSelect from "./nameSelect/nameSelect";
import KeyCodes from "../../constants/KeyCodes";

export default class Intro {
	constructor() {
		this.canvas = document.getElementById("canvas");
		this.context = this.canvas.getContext("2d");

		document.onkeydown = (event) => {
			if (event.keyCode === KeyCodes.A) {
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

				new NameSelect(this.context);
			} else if (event.keyCode === KeyCodes.DOWN) {
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

			}
		};

		// Create title object
		new Title(this.context);
	}
}