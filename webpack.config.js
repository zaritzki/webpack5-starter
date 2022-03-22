const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin =
	require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
	mode: 'development',
	entry: {
		bundle: path.resolve(__dirname, 'src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name][contenthash].js',
		clean: true, // to prevent duplication
		assetModuleFilename: '[name][ext]', // to keep name and ext, or else will be renamed.
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i, // i: case sensitive
				type: 'asset/resource',
			},
		],
	},
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		port: 3000, // set port 3000 for frontend stuff
		open: true, // it will open the browser automatically
		hot: true, // how reloading
		compress: true, // enabile gzip compression
		historyApiFallback: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Webpack App',
			filename: 'index.html',
			template: 'src/template.html',
		}),
		new BundleAnalyzerPlugin(),
	],
}
