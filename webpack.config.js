const defaultWebpackConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaultWebpackConfig,
	entry: {
		'index' : './src/index.js',
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/build',
	},
}