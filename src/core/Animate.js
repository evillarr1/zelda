"use strict";

export default class Animate {
	constructor() {
		this.link = new Image();
		this.link.src = "img/link.png";
		this.queue = [];
	}

	openingCircle() {
		for (let i = 0; i < Canvas.width; i += 5) {
			this.queue.push(() => {
				ContextMask.beginPath();
				ContextMask.fillStyle = "#000";
				ContextMask.fillRect(0, 0, Canvas.width, Canvas.height);
				ContextMask.fill();
				ContextMask.closePath();
				ContextMask.beginPath();
				ContextMask.save();
				ContextMask.globalCompositeOperation = 'destination-out';
				ContextMask.arc(50, 75, i, 0, 2 * Math.PI, false);
				ContextMask.fill();
				ContextMask.restore();
				ContextMask.closePath();
			});
		}
	}

	linkSnoozing(xPos, yPos) {
		for (let i = 0; i < 25; i++) {
			this.queue.push([this.link, 12 + (36 * i), 4, 30, 45, xPos, yPos, 30, 45]);
			this.queue.push([this.link, 12 + (36 * i), 4, 30, 45, xPos, yPos, 30, 45]);
		}
	}

	linkJumpingOffBed(xPos, yPos) {
		for (let i = 0; i < 17; i++) {
			this.queue.push([this.link, 50 * i, 55, 50, 50, xPos, yPos, 50, 50]);
			this.queue.push([this.link, 50 * i, 55, 50, 50, xPos, yPos, 50, 50]);
		}
	}

	isAnimating() {
		return this.queue.length > 0;
	}

	draw() {
		let nextFrame;

		if (this.isAnimating()) {
			nextFrame = this.queue.shift();

			if (typeof nextFrame === "function") {
				nextFrame();
			} else {
				Context.drawImage(...nextFrame);
			}
		}
	}
}