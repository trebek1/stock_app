var React = require('react');
var Axis = require('Axis');
var Dots = require('Dots');
var Grid = require('Grid');
var ToolTip = require('ToolTip');

var LineChart = React.createClass({
 
    getInitialState:function(){
        return {
            width:500,
            height: 200,
            tooltip:{ display:false,data:{key:'',value:''}},
            data: this.props.data	
        };
    },

    showToolTip:function(e){
	    e.target.setAttribute('fill', '#FFFFFF');
	 
	    this.setState({tooltip:{
	        display:true,
	        data: {
	            key:e.target.getAttribute('data-key'),
	            value:e.target.getAttribute('data-value')
	            },
	        pos:{
	            x:e.target.getAttribute('cx'),
	            y:e.target.getAttribute('cy')
	        }
	 
	        }
	    });
	},
	hideToolTip:function(e){
	    e.target.setAttribute('fill', '#7dc7f4');
	    this.setState({tooltip:{ display:false,data:{key:'',value:''}}});
	},

    render:function(){

        var data = this.state.data
        var column = 11;
        
        var margin = {top: 5, right: 50, bottom: 20, left: 50},
            w = this.state.width - (margin.left + margin.right),
            h = this.state.height - (margin.top + margin.bottom);
 
        var parseDate = d3.timeParse("%Y-%m-%d");
        var formatTime = d3.timeFormat("%b %y")
 		
        data.forEach(function (d) {
            
            d.push(parseDate(d[0]));
            
            
        });

        var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) {
                return d[d.length -1];
            }))
            .rangeRound([0, w]);

            

        var y = d3.scaleLinear()
            .domain([d3.min(data,function(d){
                return d[column] - 20
            }),d3.max(data,function(d){
                return d[column] + 20
            })])
            .range([h, 0]);
 
        var line = d3.line()
            .x(function (d) {

                return x(d[d.length -1]);
            })
            .y(function (d) {
                return y(d[column]);
            }).curve(d3.curveCatmullRom.alpha(0.5));
 
        var transform='translate(' + margin.left + ',' + margin.top + ')';

        var yAxis = d3.axisLeft()
            .scale(y)
            .ticks(5)

		var xAxis = d3.axisBottom()
		   .scale(x)
		 
		var yGrid = d3.axisLeft()
		   .scale(y)
		   .ticks(5)
		   .tickSize(-w, 0, 0)
		   .tickFormat("")
		   
 
        return (
            <div id='container'>
                <svg id ='svg' width={this.state.width} height={this.state.height}>
 
                    <g transform={transform}>
                        <Grid h={h} grid={yGrid} gridType="y"/>
						<Axis h={h} axis={yAxis} axisType="y" />
						<Axis h={h} axis={xAxis} axisType="x"/>
                        <path className="line" d={line(data)} strokeLinecap="round"/>
                        <Dots data={data} x={x} y={y} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip}/>
                        <ToolTip tooltip={this.state.tooltip}/>
                    </g>
                </svg>
            </div>
        );
    }
});

module.exports = LineChart; 




