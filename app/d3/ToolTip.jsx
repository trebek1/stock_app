var React = require('react');

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

module.exports = ToolTip; 