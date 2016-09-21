var axios = require('axios');

// To get fundamental data example curl "https://www.quandl.com/api/v3/datatables/ZACKS/FC.json?ticker=MSFT&api_key=4D1WMS5wp8gfKKexQFsv"
// To get gold https://www.quandl.com/api/v3/datasets/WGC/GOLD_DAILY_USD.json?api_key=4D1WMS5wp8gfKKexQFsv
// bitcoin https://www.quandl.com/api/v3/datasets/BITFINEX/BTCUSD.json?api_key=4D1WMS5wp8gfKKexQFsv
// S&P500 https://www.quandl.com/api/v3/datasets/YAHOO/INDEX_SPY.json?api_key=4D1WMS5wp8gfKKexQFsv


const KEY = "4D1WMS5wp8gfKKexQFsv"; 

module.exports = {
	getData: function(ticker){
		
		const QUANDL_DATA = 'https://www.quandl.com/api/v3/datasets/WIKI/' + ticker + '.json' + '?api_key=' + KEY;

		return axios.get(QUANDL_DATA).then(function(res){
			return res.data.dataset;

		}).catch(function(res){
			throw new Error(res.data.message); 
		});

	},
	gold: function(){
		
		const QUANDL_DATA = 'https://www.quandl.com/api/v3/datasets/WGC/GOLD_DAILY_USD.json?api_key=' + KEY;

		return axios.get(QUANDL_DATA).then(function(res){
			return res.data.dataset;

		}).catch(function(res){
			throw new Error(res.data.message); 
		});

	}
}