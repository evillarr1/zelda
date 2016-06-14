var path = require("path");

module.exports = {
	entry: "./src/app.js",
	output: {
		filename: "app.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [
					path.resolve(__dirname, 'src')
				],
				exclude: /node_modules/,
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /pixi.js/, loader: "script"
			},
			{
				test: /phaser.js/, loader: "script"
			}
		]
	}
};