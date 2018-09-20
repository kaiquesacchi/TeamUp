import React, { Component } from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import './App.css';

import Authentication from './pages/Authentication/Authentication';


class App extends Component {
	render() {
		return (

<BrowserRouter>
	<Switch>
		<Route exact path="/" component={Home}>
		</Route>
		<Route path="/auth" component={Authentication}>
		</Route>
	</Switch>
</BrowserRouter>

		);
	}
}


class Home extends Component {
	render() {
		return (
<div>
	Hello, World!
</div>

		);
	}
}


export default App;