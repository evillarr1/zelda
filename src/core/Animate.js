"use strict";

export default class Animate {
	constructor() {
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
}