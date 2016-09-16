var React = require('react');
var StockForm = require('StockForm');
var StockInfo = require('StockInfo');
var StockData = require("Data");

var Main = React.createClass({

	getInitialState: function(){
		return{
			data: null,
			loading: false
		}
	},
	
	stockHandler: function(ticker){
		var _this = this; 
		this.setState({
			loading: true
		})
		StockData.getData(ticker).then(function(temp){
			console.log("this is temp ", temp);
			_this.setState({
				loading: false,
				data: temp
			})
		}, function(errorMessage){
			alert(errorMessage);
			_this.setState({
				loading: false
			})
		});

		console.log(this.state);
	},

	render: function(){
		return <div id="main-wrapper">
				<div>
					<h3> Enter the Ticker for a Stock Here </h3>
				</div>
				<div>
					<StockForm onSearch={this.stockHandler}/>
				</div>
				<br/>
				<div>
					<StockInfo data={this.state.data} loading={this.state.loading}/>
				</div>
			</div>
	}
});

module.exports = Main; 