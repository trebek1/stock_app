var React = require('react');

var Dots = React.createClass({
	
	propTypes: {
		data: React.PropTypes.array,
		x: React.PropTypes.func,
		y: React.PropTypes.func

	},

	render: function(){

		var _this = this; 

		var data = this.props.data
			

		var circles = data.map(function(d,i){
		var formatTime = d3.timeFormat("%b %e %Y")
            
			return (
					<circle className="dot" r="7" cx={_this.props.x(d[5])} cy={_this.props.y(d[4])} 
					fill="#7dc7f4" stroke="#3f5175" strokeWidth="5px" key={i}
                    onMouseOver={_this.props.showToolTip} 
                    onMouseOut={_this.props.hideToolTip}
                    data-key={formatTime(d[5])} 
                    data-value={d[4]}/>
				)
		});

		return (
			<g> 
				{circles}
			</g>
			)

	}
});

module.exports = Dots; 

