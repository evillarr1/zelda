"use strict";

const gulp = require("gulp");
const webpack = require('webpack');
const webpackConfig = require("./webpack.config.js");

const paths = {
	allScripts: ["src/**/*.js"],
	allMusic: ["src/levels/**/*.m*"],
	allSounds: ["src/assets/sounds/**/*"],
	allImages: ["src/levels/**/*.png", "src/assets/icons/**/*", "src/assets/img/*.png"],
	entryStyles: ["src/app.scss"],
	allStyles: ["src/**/*.scss"],
	mainHtml: ["src/index.html"]
};

function clean() {
	let del = require("del");

	return del(["build", "build/**"]);
}

function html() {
	return gulp.src(paths.mainHtml)
		.pipe(gulp.dest("build/"));
}

function scripts() {
	return new Promise((resolve) => {
		webpack(webpackConfig).run(resolve);
	});
}

function images() {
	return gulp.src(paths.allImages)
		.pipe(gulp.dest("build/img"));
}

function styles() {
	let sass = require("gulp-sass");

	return gulp.src(paths.entryStyles)
		.pipe(sass())
		.pipe(gulp.dest("build/css"));
}

function music() {
	return gulp.src(paths.allMusic)
		.pipe(gulp.dest("build/music"));
}

function sounds() {
	return gulp.src(paths.allSounds)
		.pipe(gulp.dest("build/sounds"));
}

function webserver() {
	let server = require("gulp-server-livereload");

	gulp.src("build")
		.pipe(server({
			livereload: true,
			open: true
		}));
}

function watch() {
	gulp.watch(paths.allScripts, gulp.series(scripts));
	gulp.watch(paths.mainHtml, gulp.series(html));
	gulp.watch(paths.allImages, gulp.series(images));
	gulp.watch(paths.allStyles, gulp.series(styles));
	gulp.watch(paths.allMusic, gulp.series(music));
	gulp.watch(paths.allSounds, gulp.series(music));
}

gulp.task("build", gulp.series(clean, gulp.parallel(html, images, styles, scripts, music, sounds)));
gulp.task("serve", gulp.parallel(webserver, watch));
gulp.task("default", gulp.series("build", "serve"));