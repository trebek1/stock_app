var React = require('react'); 
var LineChart = require('LineChart');

var Chart = React.createClass({
    render:function(){
        return (
            <div>
                <div>
                    <LineChart/>
                </div>
            </div>
        )
    }
});

module.exports = Chart; 
