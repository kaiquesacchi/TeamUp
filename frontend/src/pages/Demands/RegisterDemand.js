import React, { Component } from 'react';

class RegisterDemand extends Component {
	constructor() {
		super();

		this.state = {
			description: '',
			funcionalities: '',
			maxDate: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const target = e.target;
		const { value } = target;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		console.log('The form was submitted with the following data:');
		console.log(this.state);
	}

	render() {
		return (

			<div className="App">
				<div className="AppBackground Colapsed">
				</div>
				<div className="AppForm">
					<div className="FormTitle">
						<div to="/auth/sign-in" className="FormTitle__Link FormTitle__Link--Active">
							Demanda
						</div>
					</div>
					<div className="FormCenter">
						<form onSubmit={this.handleSubmit} className="FormFields">
							<div className="FormField">
								<label className="FormField__Label" htmlFor="name">Descrição do projeto</label>
								<textarea id="description" className="FormField__Input" placeholder="Insira uma descrição do projeto" name="description" value={this.state.description} onChange={this.handleChange} required />
							</div>
							<div className="FormField">
								<label className="FormField__Label" htmlFor="Funcionalities">Funcionalidades</label>
								<textarea id="funcionalities" className="FormField__Input" placeholder="Insira as funções que o sistema deve ter" name="funcionalities" value={this.state.funcionalities} onChange={this.handleChange} required />
							</div>
							<div className="FormField">
								<label className="FormField__Label" htmlFor="maxDate">Data máxima de entrega</label>
								<input type="date" id="maxDate" className="FormField__Input" placeholder="Insira a data máxima de conclusão" name="maxDate" value={this.state.date} onChange={this.handleChange} required />
							</div>

							<div className="FormField">
								<button className="FormField__Button mr-20">Cadastrar</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		
		);
	}
}
export default RegisterDemand;