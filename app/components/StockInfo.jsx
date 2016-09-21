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
							
						</div>	
					</div>
		}else{
			
			//Data
			var data = this.props.data.data;

			//Color green if up red if down for the day
			var styles = (data[0][4] > data[1][4] ? 'up no-margin' : 'down no-margin'); 
			var customWidth = "data-width " + styles; 
			
			//Get the name from the extended header
			var name = this.props.data.name.split(' ');
			var res = name.slice(0,name.indexOf('Prices,')).join(' ');
			
			var yesterdayClose = data[1][4];
			var change = (data[0][4] - data[1][4]).toFixed(2); 
			var percent = (change/yesterdayClose*100).toFixed(2) + '%'; 
				
			return<div>
					
					<div className="data-container">
						<div className='graph'>
							<Chart data= {data}/>
						</div>

						<div className="today">
							<h3 className='stock-header'> Information for {res} </h3>
							<div className="data">
								<div className="table-wrapper">
									<table>
										<tbody>
											<tr>
												<td className="stat">Date</td>
												<td>{data[0][0]}</td>
											</tr>
											<tr>
												<td className="stat">Open</td>
												<td>{data[0][1]}</td>
											</tr>
											<tr>
												<td className="stat">High</td>
												<td>{data[0][2]}</td>
											</tr>
											<tr>
												<td className="stat">Low</td>
												<td>{data[0][3]}</td>
											</tr>
											<tr>
												<td className="stat">Close</td>
												<td className={styles}>{data[0][4]}</td>
											</tr>
											<tr>
												<td className="stat">Volume</td>
												<td>{data[0][5]}</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="data-wrapper daily">
									<h2 className="margin"> Daily Change</h2>
			
									<br/>
									<div className="stat-wrapper"><div className="daily-width">Absolute:</div> <div className={customWidth}>{change}</div></div>
									<div className="stat-wrapper"><div className="daily-width">Percent:</div>  <div className={customWidth}>{percent}</div></div>					
									
								</div>
							</div>
							
						</div>

					</div>
					
				</div>
		}
		
	}
});

module.exports = StockInfo; 