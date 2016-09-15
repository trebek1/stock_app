var axios = require('axios');

//const KEY = "32164d9c4c1358379509b682fd35226a"; 
//const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=' + KEY + '&units=imperial'; 

//

module.exports = {
	getData: function(ticker){
		
		var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${ticker}`;

		return axios.get(requestUrl).then(function(res){
			console.log("this is res ", res); 
			//return res; 

		}).catch(function(res){
			throw new Error(res.data.message); 
		});

	}
}