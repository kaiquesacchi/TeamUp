import React, { Component } from "react";
import { withRouter } from 'react-router';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const API_URL = process.env.API_URL || 'http://localhost:5000';

class CreateProposal extends Component {
	constructor() {
		super();

		this.state = {
			proposal: '',
			value: '',
			selectedList: [],
			fullList: [],
			created: false,
			error: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount(){
		const result = await fetch(API_URL + '/proposta', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		});
		const resultJSON = await result.json();
		this.setState({
			fullList: resultJSON.professionals,
		});
	}

	selectPerson(index) {
		const fullList = this.state.fullList;
		const selectedList = this.state.selectedList;
		selectedList.push(fullList.splice(index, 1)[0]);
		this.setState({
			fullList,
			selectedList,
			error: false,
		});
	}

	deselectPerson(index) {
		const fullList = this.state.fullList;
		const selectedList = this.state.selectedList;
		fullList.push(selectedList.splice(index, 1)[0]);
		this.setState({
			fullList,
			selectedList,
			error: false,
		});
	}

	handleChange(e) {
		const target = e.target;
		const { value } = target;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	async handleSubmit(e) {
		e.preventDefault();
		if (this.state.selectedList.length === 0) {
			this.setState({error: true});
		} else {
			const result = await fetch(API_URL + '/proposta', {
				method: 'POST',
				body: JSON.stringify(this.state),
				headers: {
					'content-type': 'application/json',
				},
			});
			const resultJSON = await result.json();
			if (resultJSON.erro) {
				this.error = true;
			  } else {
				const fullList = this.state.fullList.concat(this.state.selectedList);
				this.setState({
					proposal: '',
					value: '',
					selectedList: [],
					fullList,
					created: true,
					error: false,
				});
			  }
		}
	}

	render() {
		const { classes } = this.props;
		return (
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader color="warning">
							<h4 className={classes.cardTitleWhite}>Criar Proposta</h4>
							<p className={classes.cardCategoryWhite}>
								Selecione uma equipe e escreva sua proposta
							</p>
						</CardHeader>
						<form onSubmit={this.handleSubmit}>
							<CardBody>
								<GridContainer>
									<GridItem xs={12} sm={12} md={12}>
										<CustomInput
											labelText="Acrescente sua proposta para o cliente."
											id="proposal"
											name="proposal"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												multiline: true,
												rows: 5,
												value: this.state.proposal,
												name: 'proposal',
												onChange: this.handleChange,
												required: true,
											}}
											value={this.state.proposal}
											onChange={this.handleChange}
										/>
									</GridItem>
								</GridContainer>
								<GridContainer>
									<GridItem xs={12} sm={12} md={12}>
										<TextField
											id="value"
											name="value"
											label="Valor do projeto (R$)"
											value={this.state.value}
											onChange={this.handleChange}
											type="number"
											className={classes.textField}
											margin="normal"
											fullWidth
											inputProps={{
												min: "0",
												required: true,
											}}
										/>
									</GridItem>
								</GridContainer>
								{this.state.error &&
									<div style={{fontSize: '1.5rem', padding: '15px 0'}}>
										É preciso adicionar pessoa(s) à equipe!
									</div>
								}
								{this.state.selectedList && this.state.selectedList.length > 0 &&
									<div>
										<h3>Equipe escolhida</h3>
										<Table
											tableHeaderColor="warning"
											tableHead={["Nome", "Função", "Média por projeto", "Adicionar"]}
											tableData={this.state.selectedList}
											buttonAction={(key) => this.deselectPerson(key)}
											buttonText={"Retirar"}
										/>
									</div>
								}
								<h3>Profissionais disponíveis</h3>
								<Table
									tableHeaderColor="warning"
									tableHead={["Nome", "Função", "Média por projeto", "Adicionar"]}
									tableData={this.state.fullList}
									buttonAction={(key) => this.selectPerson(key)}
									buttonText={"Adicionar"}
								/>
							</CardBody>
							<CardFooter>
								<Button color="warning" type="submit">Finalizar</Button>
							</CardFooter>
							{this.state.created &&
								<div style={{padding:'20px', fontSize: '1.5rem'}}>
									Proposta enviada!
								</div>
							}
						</form>
					</Card>
				</GridItem>
			</GridContainer>
		);
	}
}

export default withStyles(dashboardStyle)(CreateProposal);
