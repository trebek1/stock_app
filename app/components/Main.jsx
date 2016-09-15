var React = require('react');
var StockForm = require('StockForm');

var Main = React.createClass({
	
	stockHandler: function(){
		console.log('Handled a stock');
	},

	render: function(){
		return <div id="main-wrapper">
				<StockForm onSearch={this.stockHandler}/>
			</div>
	}
});

module.exports = Main; 