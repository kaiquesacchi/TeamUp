import React, { Component } from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';

class Home extends Component {
	render() {
		return (

<div className="App">
	<div className="AppBackground">
		<Link to="/auth/sign-up" className="ButtonCentered Centralize">Começar</Link>
	</div>
</div>

		);
	}
}

export default Home; 