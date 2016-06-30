"use strict";

const LINK = {
	STANDING: {
		TOP: []
	}
};

export default class Characters {
	constructor() {
		// Create a new image
		this.linkSheet = new Image();
		this.linkSheet.src = "img/link.png";

		this.link = {
			x: 10,
			y: 10
		};
	}

	link(action) {
		switch (action) {
			case "STANDING_RIGHT":
				break;
			default:
				break;
		}
	}
}