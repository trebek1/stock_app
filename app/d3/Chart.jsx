var React = require('react'); 
var LineChart = require('LineChart');

var Chart = React.createClass({
    render:function(){
    	var data = this.props.data;
        return (
            <div>
                <div>
                    <LineChart data={data}/>
                </div>
            </div>
        )
    }
});

module.exports = Chart; 
