import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const API_URL = process.env.API_URL || 'https://teamup-servidor.herokuapp.com';

class SignIn extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		let target = e.target;
		let value = target.type === 'checkbox' ? target.checked : target.value;
		let name = target.name;

		this.setState({
			[name]: value
		});
	}

	async handleSubmit(e) {
		e.preventDefault();

		const result = await fetch(API_URL + '/login', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {
				'content-type': 'application/json',
			},
		});
		const resultJSON = await result.json();

		cookies.set('user_name', resultJSON.user_name, { path: '/' });
		cookies.set('user_id', resultJSON.user_id, { path: '/' });
		console.log(cookies.get('user_name'));
		console.log(cookies.get('user_id'));
		if(resultJSON.login){
			this.props.history.push("/inicio");
		}
		else alert("Login incorreto!")
	}

	render() {
		return (

<div className="FormCenter">
	<form className="FormFields" onSubmit={this.handleSubmit}>
		<div className="FormField">
			<label className="FormField__Label" htmlFor="email">Endereço de email</label>
			<input type="email" id="email" className="FormField__Input" placeholder="Insira seu endereço de Email" name="email" value={this.state.email} onChange={this.handleChange} />
		</div>

		<div className="FormField">
			<label className="FormField__Label" htmlFor="password">Senha</label>
			<input type="password" id="password" className="FormField__Input" placeholder="Insira sua senha" name="password" value={this.state.password} onChange={this.handleChange} />
		</div>

		<div className="FormField">
			<button className="FormField__Button mr-20">Entrar</button> <Link to="/auth/sign-up" className="FormField__Link">Criar uma Conta</Link>
		</div>
	</form>
</div>
		);
	}
}

export default SignIn;