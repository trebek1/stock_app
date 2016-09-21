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
			
			var data = this.props.data.data;

			console.log("this is data ", data);
			
			return<div>
					
					<div className="data-container">
						<div className='graph'>
							<Chart data= {data}/>
						</div>

						<div>Date:   {data[0][0]}  </div>
						<div>Open:   {data[0][1]}  </div>
						<div>High:   {data[0][2]}  </div>
						<div>Low:    {data[0][3]}  </div>
						<div>Close:  {data[0][4]}  </div>
						<div>Volume: {data[0][5]}  </div>
						

					</div>
					
				</div>
		}
		
	}
});

module.exports = StockInfo; 