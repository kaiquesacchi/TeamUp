import React, { Component } from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';

class Authentication extends Component {
	render() {
		return (

<div className="App">
	<div className="AppInfo">
		{/*Local para o LOGO, informações etc*/}
	</div>
	<div className="AppForm">
		
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