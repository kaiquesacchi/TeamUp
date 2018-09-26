import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';

class Authentication extends Component {
	render() {
		return (

<div className="Intro">
	<div className="IntroBackground Colapsed">
	</div>
	<div className="IntroForm">
		
		{/*Navegador superior*/}
		<div className="FormTitle">
			<NavLink to="/auth/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">
				Entrar
			</NavLink>
			ou 
			<NavLink exact to="/auth/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">
				Criar conta
			</NavLink>
		</div>

		{/*Conteúdo da Página*/}
		<Route exact path="/auth/sign-up" component={SignUp}>
		</Route>
		<Route path="/auth/sign-in" component={SignIn}>
		</Route>
	</div>
</div>

		);
	}
}

export default Authentication;