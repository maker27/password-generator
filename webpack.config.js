const path = require('path'),
	autoprefixer = require('autoprefixer'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
	HtmlWebPackPlugin = require('html-webpack-plugin');

const conf = {
	mode: "production",
	entry: {
		script: './js/script.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '/password-generator/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"]
				}
			},
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								autoprefixer()
							],
							sourceMap: true
						}
					},
					"sass-loader",
				]
			}
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css',
			chunkFilename: "[id].css"
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessorPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }],
			},
			canPrint: true
		}),
		new HtmlWebPackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: true,
			}
		})
	],

	context: path.resolve(__dirname, 'src'),
	devServer: {
		overlay: true,
		contentBase: path.join(__dirname, 'dist'),
		compress: true
	},
};

module.exports = (env, options) => {
	conf.devtool = options.mode === 'production' ? false/*'source-map'*/ : 'eval-sourcemap';
	return conf;
};