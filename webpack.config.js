/**
 * Webpack 4 is meant to be zero config which is fine for a vanilla JS project but since we're dealing with React and dealing with multiple loaders, we still need a config as per Webpack 4 docs.
 * We could pass flags e.g --module-bind js=babel-loader to prevent having a config file but I'm not a fan of this method as it makes NPM scripts very long!
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, options) => {
	console.log(`Running Webpack 4 in ${options.mode} mode.`);
    
    return {
	    entry: [
			'./src/index.jsx',
		],
		output: {
			publicPath: '/',
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist'),
		},
		watchOptions: {
			ignored: /node_modules/,
		},
		devtool: ('production' === options.mode) ? 'source-map' : 'eval-source-map',
		devServer: {
			hot: true,
			watchContentBase: true,
			historyApiFallback: true,
			contentBase: path.join(__dirname, 'src'),
		},
	    module: {
			rules: [{
				test: /\.(js|jsx)$/,
				exclude: /node_modules|bower_components/,
				use: 'babel-loader',
			}, {
				test: /\.js$/,
				exclude: /node_modules|bower_components/,
				use: [
					'babel-loader',
					'eslint-loader',
				],
			}, {
				test: /\.(css|scss)$/,
				exclude: /node_modules|bower_components/,
				use: [
					{
						/* Basically does what it says on the tin - watches for style changes! */
						loader: 'css-hot-loader',
						options: {
							sourceMap: true,
                		},
					},
					/* Commented out as we want to extract the styles into a seperate file which the mini CSS extract plugin will do. If you want to keep the styles within the scripts, comment this back in and comment out mini CSS extract plugin line below */
					/*
					{
						loader: 'style-loader',
						options: {
							sourceMap: true,
                		},	
					},
					*/ 
					MiniCssExtractPlugin.loader,
					{
						/* Interprets `@import` and `url()` like `import/require()` and will resolve them */
						loader: 'css-loader',
						options: {
							sourceMap: true,
                		},
					}, {
						/* Loader for webpack to process CSS with PostCSS */
						loader: 'postcss-loader',
						options: {
							autoprefixer: {
								browsers: ['last 2 versions'],
							},
							plugins: (loader) => [
								require('precss')(),
								require('autoprefixer')(),
							],
							sourceMap: true,
                		},
                	}, {
						/* Loads a SASS/SCSS file and compiles it to CSS */
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			}, {
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				exclude: /node_modules|bower_components/,
				use: 'url-loader?limit=10000',
			}, {
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				exclude: /node_modules|bower_components/,
				use: 'file-loader',
			}, {
				test: /\.(jpe?g|png|gif|svg)$/i,
				exclude: /node_modules|bower_components/,
				use: [
					'file-loader?name=images/[name].[ext]',
					'image-webpack-loader?bypassOnDebug',
				],
			}, {
				test: /\.html$/,
				exclude: /node_modules|bower_components/,
				use: {
					loader: 'html-loader',
					options: {
						minimize: true,
					},
				},
			}, {
				test: /bootstrap\/dist\/js\/umd\//, 
				use: 'imports-loader?jQuery=jquery',
			}],
		},
		resolve: {
			extensions: ['*', '.jsx', '.js', '.scss', '.css', '.html'],
		},
		performance: {
			hints: false,
		},
		optimization: {
			runtimeChunk: false,
			splitChunks: {
				cacheGroups: {
					commons: {
						minSize: 0,
						minChunks: 2,
						chunks: 'all',
						maxInitialRequests: 5,
					},
					vendor: {
						priority: 10,
						chunks: 'all',
						enforce: true,
						name: 'vendors',
						test: /node_modules/,
					},
					styles: {
						chunks: 'all',
						enforce: true,
						test: /\.css$/,
						name: 'styles',
					},
					scripts: {
						chunks: 'all',
						enforce: true,
						test: /\.js$/,
						name: 'scripts',
					},
				},
			},
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
					sourceMap: true,
				}),
				new OptimizeCSSAssetsPlugin(),
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
			new HtmlWebPackPlugin({
				template: './src/html/index.html',
				filename: './index.html',
				hash: (options.mode === 'production') ? false : true,
			}),
			new HtmlWebPackPlugin({
				template: './src/html/404.html',
				filename: './404.html',
				hash: (options.mode === 'production') ? false : true,
			}),
			new webpack.HashedModuleIdsPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					'API_HOST': JSON.stringify('http://ec2-52-209-201-89.eu-west-1.compute.amazonaws.com:5000/api'),
					'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
				},
			})
		],
	}
};
