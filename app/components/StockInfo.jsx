var React = require('react');
var ReactDOM = require('react-dom');


var LineChart = React.createClass({
 
    getInitialState:function(){
        return {
            width:800,
            height: 300,
            tooltip:{ display:false,data:{key:'',value:''}}
        	
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
        var data=[
                ["2016-09-20",113.05,114.12,112.51,113.57], 
                ["2016-09-19",115.19,116.18,113.25,113.58],
                ["2016-09-16",115.12,116.13,114.04,114.92]
            ]; 
        
 
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
                console.log(d[d.length -1])
                return d[d.length -1];
            }))
            .rangeRound([0, w]);

            

        var y = d3.scaleLinear()
            .domain([d3.min(data,function(d){
                return d[4] - 20
            }),d3.max(data,function(d){
                console.log(d[4])
                return d[4] + 20
            })])
            .range([h, 0]);
 
        var line = d3.line()
            .x(function (d) {

                return x(d[d.length -1]);
            })
            .y(function (d) {
                return y(d[4]);
            }).curve(d3.curveCatmullRom.alpha(0.5));
 
        var transform='translate(' + margin.left + ',' + margin.top + ')';


        // data.forEach(function (d) {
        //     d.date = parseDate(d.day);
            
          
        // });


        var yAxis = d3.axisLeft()
            .scale(y)
            .ticks(5)

            

        
		var xAxis = d3.axisBottom()
		   .scale(x)
		  //  .tickFormat(function (d) {
		  
			  
		  // return d3.timeFormat('%a %d')(new Date(d))
		//})
		 
		 // .tickFormat(function (d) {
			//   var mapper = {
			//     "This": "This is long",
			//     "That": "That is long",
			//     "Other": "Other is long"
			//   }
			//   return mapper[d]
			// })
		 
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


var Axis = React.createClass({
    propTypes: {
        h:React.PropTypes.number,
        axis:React.PropTypes.func,
        axisType:React.PropTypes.oneOf(['x','y'])
    },
    componentDidUpdate: function(){ 
    	this.renderAxis(); 
    },
    componentDidMount: function(){ 
    	this.renderAxis(); 
    },
    renderAxis: function () {

        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.axis);
    },
    render: function () {
        var translate = "translate(0,"+(this.props.h)+")";
 
        return (
            <g className="axis" transform={this.props.axisType=='x'?translate:""} >
            </g>
        );
    }
 
});
 
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

var ToolTip = React.createClass({
    propTypes: {
        tooltip:React.PropTypes.object
    },

    render: function(){
 
        var visibility="hidden";
        var transform="";
        var x=0;
        var y=0;
        var width=150,height=70;
        var transformText='translate('+width/2+','+(height/2-5)+')';
        var transformArrow="";
 
        if(this.props.tooltip.display === true){
            var position = this.props.tooltip.pos;
 
            x = position.x;
            y = position.y;
            visibility = "visible";
 
 
            if(y > height){
                transform='translate(' + (x-width/2) + ',' + (y-height-20) + ')';
                transformArrow='translate('+(width/2-20)+','+(height-2)+')';
            }else if(y < height){
 
                transform='translate(' + (x-width/2) + ',' + (Math.round(y)+20) + ')';
                transformArrow='translate('+(width/2-20)+','+0+') rotate(180,20,0)';
            }
 
        }else{
            visibility="hidden"
        };
 
        return(
            <g transform={transform}>
                <rect is width={width} height={height} rx="5" ry="5" visibility={visibility} fill="#6391da" opacity=".9"/>
                <polygon class="shadow" is points="10,0  30,0  20,10" transform={transformArrow}
                         fill="#6391da" opacity=".9" visibility={visibility}/>
                <text is visibility={visibility} transform={transformText}>
                    <tspan is x="0" text-anchor="middle" font-size="15px" fill="#ffffff">{this.props.tooltip.data.key}</tspan>
                    <tspan is x="0" text-anchor="middle" dy="25" font-size="20px" fill="#a9f3ff">{this.props.tooltip.data.value}</tspan>
                </text>
            </g>
        );
    }
});


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
})

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
			
			var data = this.props.data.data[0];
			
			return<div>
					<div className="data-container">
							
						<div>Date: {data[0]}  </div>
						<div>Open: {data[1]}  </div>
						<div>High: {data[2]}  </div>
						<div>Low: {data[3]}  </div>
						<div>Close: {data[4]}  </div>
						<div>Volume: {data[5]}  </div>
						

					</div>
					<div className='graph'>
						<Chart/>
					</div>
				</div>
		}
		
	}
});

module.exports = StockInfo; 