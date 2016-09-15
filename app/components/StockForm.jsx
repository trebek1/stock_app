var React = require('react');

var StockForm = React.createClass({
	clickHandler: function(event){
		event.preventDefault();
		var value = this.refs.ticker.value; 
		
		if(value.length > 0){
			this.refs.ticker.value = ''; 
			this.props.onSearch(value);	
		}
		
	},
	render: function(){
		return(
			<div>
				<form onSubmit={this.clickHandler}>
					<input ref="ticker" placeholder="enter a stock symbol"></input>
					<button> Look up Stock Information</button>
				</form>
			</div>
		)
	}
});

module.exports = StockForm; 