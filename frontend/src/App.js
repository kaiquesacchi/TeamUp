import React, { Component } from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import './App.css';

import RegisterDemand from './pages/Demands/RegisterDemand';
import Authentication from './pages/Authentication/Authentication';
import Home from './pages/Home/Home';


class App extends Component {
	render() {
		return (

<BrowserRouter>
	<Switch>
		<Route exact path="/" component={Home}>
		</Route>
		<Route path="/auth" component={Authentication}>
		</Route>
		<Route path="/demand" component={RegisterDemand}>
		</Route>
	</Switch>
</BrowserRouter>

		);
	}
}





export default App;