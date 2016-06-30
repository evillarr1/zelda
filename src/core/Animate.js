"use strict";

export default class Animate {
	constructor() {
		this.link = new Image();
		this.link.src = "img/link.png";
	}

	openingCircle(obj) {
		if (obj["CIRCLE_ANIMATION_COUNTER"] >= Canvas.width) {
			return true;
		}

		if (!obj["CIRCLE_ANIMATION_COUNTER"]) {
			obj["CIRCLE_ANIMATION_COUNTER"] = 0;
		}

		ContextMask.beginPath();
		ContextMask.fillStyle = "#000";
		ContextMask.fillRect(0, 0, Canvas.width, Canvas.height);
		ContextMask.fill();
		ContextMask.closePath();
		ContextMask.beginPath();
		ContextMask.save();
		ContextMask.globalCompositeOperation = 'destination-out';
		ContextMask.arc(50, 75, obj["CIRCLE_ANIMATION_COUNTER"] += 5, 0, 2 * Math.PI, false);
		ContextMask.fill();
		ContextMask.restore();
		ContextMask.closePath();
	}

	linkSnoozing(obj, xPos, yPos) {
		if (obj["LINK_WAKING_COUNTER"] >= 50) {
			return true;
		}

		if (!obj["LINK_WAKING_COUNTER"]) {
			obj["LINK_WAKING_COUNTER"] = 0;
		}

		Context.drawImage(
			this.link,
			12 + (36 * Math.floor(obj["LINK_WAKING_COUNTER"]++ / 2)),
			4,
			30,
			45,
			xPos,
			yPos,
			30,
			45
		)
	}

	linkJumpingOffBed(obj, xPos, yPos, animate) {
		if (obj["LINK_JUMPING_OFF_BED_COUNTER"] >= 34) {
			return true;
		}

		if (!obj["LINK_JUMPING_OFF_BED_COUNTER"]) {
			obj["LINK_JUMPING_OFF_BED_COUNTER"] = 0;
		}

		Context.drawImage(
			this.link,
			50 * Math.floor(obj["LINK_JUMPING_OFF_BED_COUNTER"] / 2),
			55,
			50,
			50,
			xPos,
			yPos,
			50,
			50
		)

		if (animate) {
			obj["LINK_JUMPING_OFF_BED_COUNTER"]++;
		}
	}

}