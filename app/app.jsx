// a container component keeps track of state and renders child components 
// a presentational component uses props to display information 

var React = require('react');
var ReactDOM = require('react-dom');
var {Router, Route, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Main}> 
		</Route>
	</Router>, document.getElementById('app')
);