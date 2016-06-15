var webpack = require('webpack');

module.exports = {
	entry: "./scripts/app",
	devtool: "cheap-inline-module-source-map",
	output: {
		filename: "./app.js"
	},
	watch: true,
	watchOptions: {
		aggregateTimeout: 200
	}
}