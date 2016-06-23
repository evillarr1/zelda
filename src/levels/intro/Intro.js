"use strict";

import Title from "./title/title";

export default class Intro {
	constructor() {
		// Create title object
		let title = new Title();

		State.push(title);
	}
}