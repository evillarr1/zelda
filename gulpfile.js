"use strict";

const gulp = require("gulp");
const webpack = require("gulp-webpack");
const webpackConfig = require("./webpack.config.js");

const paths = {
	allScripts: ["src/**/*.js"],
	allMusic: ["src/levels/**/*.mp4", "src/levels/**/*.mp3"],
	entryScript: ["src/app.js"],
	allImages: ["src/levels/**/*.png", "src/assets/icons/**/*"],
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
	return gulp.src(paths.entryScript)
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest("build/js"));
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

function webserver() {
	let server = require("gulp-server-livereload");

	gulp.src("build")
		.pipe(server({
			livereload: true
		}));
}

function watch() {
	gulp.watch(paths.allScripts, gulp.series(scripts));
	gulp.watch(paths.mainHtml, gulp.series(html));
	gulp.watch(paths.allImages, gulp.series(images));
	gulp.watch(paths.allStyles, gulp.series(styles));
}

gulp.task("default", gulp.series(clean, html, images, styles, scripts, music, gulp.parallel(webserver, watch)));