import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const API_URL = process.env.API_URL || 'http://0.0.0.0:5000';

class SignUp extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
			name: '',
			hasAgreed: false
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

		const result = await fetch(API_URL + '/conta/criar', {
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
		if(resultJSON.user_id){
			this.props.history.push("/auth/complete-sign-up");
		}
		else alert("Houve um problema na criação do Usuário. Tente outra vez")
	}

	render() {
		return (

<div className="FormCenter">
	<form onSubmit={this.handleSubmit} className="FormFields">
		<div className="FormField">
			<label className="FormField__Label" htmlFor="name">Nome Completo</label>
			<input type="text" id="name" className="FormField__Input" placeholder="Insira seu nome completo" name="name" value={this.state.name} onChange={this.handleChange} />
		</div>
		<div className="FormField">
			<label className="FormField__Label" htmlFor="password">Senha</label>
			<input type="password" id="password" className="FormField__Input" placeholder="Insira sua senha" name="password" value={this.state.password} onChange={this.handleChange} />
		</div>
		<div className="FormField">
			<label className="FormField__Label" htmlFor="email">Endereço de Email</label>
			<input type="email" id="email" className="FormField__Input" placeholder="Insira seu endereço de Email" name="email" value={this.state.email} onChange={this.handleChange} />
		</div>

		<div className="FormField">
			<label className="FormField__CheckboxLabel">
			<input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /> Li e aceito todos os  <a href="" className="FormField__TermsLink">termos de uso</a>
			</label>
		</div>

		<div className="FormField">
			<button className="FormField__Button mr-20">Criar Conta</button> <Link to="/auth/sign-in" className="FormField__Link">Já sou cadastrado</Link>
		</div>
	</form>
</div>
		
		);
	}
}
export default SignUp;