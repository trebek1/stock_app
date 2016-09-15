var React = require('react');
var StockForm = require('StockForm');
var StockInfo = require('StockInfo');

var Main = React.createClass({
	
	stockHandler: function(){
		console.log('Handled a stock');
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
					<StockInfo/>
				</div>
			</div>
	}
});

module.exports = Main; 