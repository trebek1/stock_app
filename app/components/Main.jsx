var React = require('react');
var StockForm = require('StockForm');
var StockInfo = require('StockInfo');
var StockData = require("Data");

var Main = React.createClass({

	getInitialState: function(){
		return{
			data: null,
			loading: false,
			error: false
		}
	},
	
	stockHandler: function(ticker){
		var _this = this; 
		this.setState({
			loading: true,
			error: false
		})
		StockData.getData(ticker).then(function(temp){
			
			_this.setState({
				loading: false,
				data: temp,
				error: false
			})
		}, function(errorMessage){
			var error = "Cannot find data for this ticker"
			_this.setState({
				loading: false,
				data: null,
				error: error
			})
		});
	},

	render: function(){
		return <div id="main-wrapper">
				<div>
					<h3 className="stock-header"> Enter the Ticker for a Stock Here </h3>
				</div>
				<div>
					<StockForm onSearch={this.stockHandler}/>
				</div>
				<br/>
				<div>
					<StockInfo data={this.state.data} error={this.state.error} loading={this.state.loading}/>
				</div>
			</div>
	}
});

module.exports = Main; 