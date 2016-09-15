var React = require('react');

var StockInfo = React.createClass({
	render: function(){
		if(!this.props.data){
			return <div>
						<div className="data-container">
							Enter a Ticker to See Stock Data
						</div>	
					</div>
		}else{
			return<div>
					<div className="data-container">
					
					</div>
				</div>
		}
		
	}
});

module.exports = StockInfo; 