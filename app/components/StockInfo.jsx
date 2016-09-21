var React = require('react');
var Chart = require('Chart');

var StockInfo = React.createClass({
	render: function(){

		if(this.props.loading){

			return <div>
						<div className="fa fa-spinner fa-spin cs"></div>
						<h3> Loading </h3>
					</div>
					
		}
		else if(!this.props.data){
			return <div>
						<div className="data-container">
							Enter a Ticker to See Stock Data
						</div>	
					</div>
		}else{
			
			var data = this.props.data.data[0];
			
			return<div>
					
					<div className="data-container">
						<div className='graph'>
							<Chart/>
						</div>

						<div>Date: {data[0]}  </div>
						<div>Open: {data[1]}  </div>
						<div>High: {data[2]}  </div>
						<div>Low: {data[3]}  </div>
						<div>Close: {data[4]}  </div>
						<div>Volume: {data[5]}  </div>
						

					</div>
					
				</div>
		}
		
	}
});

module.exports = StockInfo; 