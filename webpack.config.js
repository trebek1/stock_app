module.exports = {
	entry: './app/app.jsx',
	output: {
		path: __dirname, 
		filename: './public/bundle.js'
	},
	resolve: {
		root: __dirname,
		alias: {
			Main: 'app/components/Main.jsx',
			Data: 'app/api/stockData.jsx',
			StockForm: 'app/components/StockForm.jsx',
			StockInfo: 'app/components/StockInfo.jsx',
			Axis: 'app/d3/Axis.jsx',
			Chart: 'app/d3/Chart.jsx',
			Dots: 'app/d3/Dots.jsx',
			Grid: 'app/d3/Grid.jsx',
			LineChart: 'app/d3/LineChart.jsx',
			ToolTip: 'app/d3/ToolTip.jsx'
		},
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
		{
			loader: 'babel-loader', 
			query: {
				presets: ['react', 'es2015', 'stage-0']
			},
			test: /\.jsx?$/,
			exclude: /(node_modules| bower_components)/
		}
		]
	},
	devtool: 'inline-source-map'
};