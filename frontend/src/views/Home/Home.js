import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
	render() {
		return (

<div className="Intro">
	<div className="IntroBackground">
		<div className="center blur">
			<h1>Team Up</h1>
			<p className="text">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			Donec fermentum sodales orci sit amet tincidunt. 
			</p>
			<Link to="/auth/sign-up" className="ButtonCentered">Começar</Link>
		</div>
	</div>
</div>

		);
	}
}

export default Home; 