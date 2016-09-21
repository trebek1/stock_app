var React = require('react');
var ReactDOM = require('react-dom');
 
var Grid = React.createClass({
    propTypes: {
        h:React.PropTypes.number,
        grid:React.PropTypes.func,
        gridType:React.PropTypes.oneOf(['x','y'])
    },
 
    componentDidUpdate: function(){ 
    	this.renderGrid(); 
    },
    componentDidMount: function(){ 
    	this.renderGrid(); 
    },
    renderGrid: function () {
        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.grid);
 
    },
    render: function () {
        var translate = "translate(0,"+(this.props.h)+")";
        return (
            <g className="y-grid" transform={this.props.gridType=='x'?translate:""}>
            </g>
        );
    }
 
});

module.exports = Grid; 
