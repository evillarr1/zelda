"use strict";

import IntroDemo from "./introDemo/introDemo";

export default class LightWorld {
	constructor() {
		let introDemo = new IntroDemo();

		State.push(introDemo);
	}
}