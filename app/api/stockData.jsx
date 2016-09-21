var axios = require('axios');

const KEY = "4D1WMS5wp8gfKKexQFsv"; 

module.exports = {
	getData: function(ticker){
		
		const QUANDL_DATA = 'https://www.quandl.com/api/v3/datasets/WIKI/' + ticker + '.json' + '?api_key=' + KEY;
		

		return axios.get(QUANDL_DATA).then(function(res){
			console.log("this is res ", res)
			return res.data.dataset;
			//return res; 

		}).catch(function(res){
			throw new Error(res.data.message); 
		});

	}
}