import React, { Component } from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';

class Home extends Component {
	render() {
		return (

<div className="App">
	<div className="AppBackground">
		<div className="center">
			<Link to="/auth/sign-up" className="ButtonCentered">Começar</Link>
		</div>
	</div>
</div>

		);
	}
}

export default Home; 