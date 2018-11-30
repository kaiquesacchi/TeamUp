import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

	handleSubmit(e) {
		e.preventDefault();

		console.log('The form was submitted with the following data:');
		console.log(this.state);
		this.props.history.push("/inicio")
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