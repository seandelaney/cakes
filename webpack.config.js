/**
 * Webpack 4 is meant to be zero config which is fine for a vanilla JS project but since we're dealing with React and dealing with multiple loaders, we still need a config as per Webpack 4 docs.
 * We could pass flags e.g --module-bind js=babel-loader to prevent having a config file but I'm not a fan of this method as it makes NPM scripts very long!
 */

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, options) => {
	console.log(`Running Webpack 4 in ${options.mode} mode.`);
    
    return {
	    entry: [
			'./src/index.jsx'
		],
	    module: {
			rules: [{
				test: /\.(js|jsx)$/,
				exclude: /node_modules|bower_components/,
				use: 'babel-loader'
			}, {
				test: /\.js$/,
				exclude: /node_modules|bower_components/,
				use: [
					'babel-loader',
					'eslint-loader'
				]
			}, {
				test: /\.(css|scss)$/,
				exclude: /node_modules|bower_components/,
				use: [
					MiniCssExtractPlugin.loader, 
					{
						// Interprets `@import` and `url()` like `import/require()` and will resolve them
						loader: 'css-loader',
						options: {
							sourceMap: true
                		}	
					}, {
						// Loader for webpack to process CSS with PostCSS
						loader: 'postcss-loader',
						options: {
							autoprefixer: {
								browsers: ['last 2 versions']
							},
							plugins: () => [
								require('precss'),
								require('autoprefixer')
							],
							sourceMap: true
                		}
					}, {
						// Loads a SASS/SCSS file and compiles it to CSS
						loader: 'sass-loader',
						options: {
							sourceMap: true
                		}
					}
				]
			}, {
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: 'url-loader?limit=10000',
			}, {
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				use: 'file-loader',
			}, {
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'file-loader?name=images/[name].[ext]',
					'image-webpack-loader?bypassOnDebug'
				]
			}, {
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: {
						minimize: true
					}
				}
			}, {
				test: /bootstrap\/dist\/js\/umd\//, 
				use: 'imports-loader?jQuery=jquery'
			}]
		},
		resolve: {
			extensions: ['*', '.jsx', '.js', '.scss', '.css', '.html']
		},
		performance: {
			hints: false
		},
		optimization: {
			runtimeChunk: false,
			splitChunks: {
				cacheGroups: {
					commons: {
						chunks: 'all',
						minChunks: 2,
						maxInitialRequests: 5,
						minSize: 0
					},
					vendor: {
						test: /node_modules/,
						name: 'vendors',
						chunks: 'all',
						priority: 10,
						enforce: true
					}
				}
			},
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
					sourceMap: true
				})
			]
		},
		plugins: [
			new MiniCssExtractPlugin(),
			new HtmlWebPackPlugin({
				template: './src/index.html',
				filename: './index.html'
			}),
			new webpack.DefinePlugin({
				'process.env': {
					'API_HOST': JSON.stringify('http://ec2-52-209-201-89.eu-west-1.compute.amazonaws.com:5000/api'),
					'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
				}
			})
		]
	}
};
