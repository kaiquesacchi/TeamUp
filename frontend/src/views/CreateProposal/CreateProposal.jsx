import React, { Component } from "react";
import { withRouter } from 'react-router';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const styles = {
	cardCategoryWhite: {
		"&,& a,& a:hover,& a:focus": {
			color: "rgba(255,255,255,.62)",
			margin: "0",
			fontSize: "14px",
			marginTop: "0",
			marginBottom: "0"
		},
		"& a,& a:hover,& a:focus": {
			color: "#FFFFFF"
		}
	},
	cardTitleWhite: {
		color: "#FFFFFF",
		marginTop: "0px",
		minHeight: "auto",
		fontWeight: "300",
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: "3px",
		textDecoration: "none",
		"& small": {
			color: "#777",
			fontSize: "65%",
			fontWeight: "400",
			lineHeight: "1"
		}
	}
};

class ProjectsList extends Component {
	constructor() {
		super();

		this.state = {
			selectedList: [],
			fullList: [
				["Dakota Rice", "Programador", "R$1000,00"],
				["Minerva Hooper", "Tester", "R$800,00"],
				["Sage Rodriguez", "P.O.", "R$1200,00"],
				["Philip Chaney", "Programador front end", "R$1000,00"],
				["Doris Greene", "Designer", "R$700,00"],
				["Mason Porter", "Cientista de dados", "R$900,00"]
			],
			created: false,
		}
	}

	selectPerson(index) {
		const fullList = this.state.fullList;
		const selectedList = this.state.selectedList;
		selectedList.push(fullList.splice(index, 1)[0]);
		this.setState({
			fullList,
			selectedList
		});
	}

	deselectPerson(index) {
		const fullList = this.state.fullList;
		const selectedList = this.state.selectedList;
		fullList.push(selectedList.splice(index, 1)[0]);
		this.setState({
			fullList,
			selectedList
		});
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
						{this.state.selectedList && this.state.selectedList.length > 0 &&
							<div>
								<h3 style={{paddingLeft: '20px'}}>Equipe escolhida</h3>
								<CardBody>
									<Table
										tableHeaderColor="warning"
										tableHead={["Nome", "Função", "Média por projeto", "Adicionar"]}
										tableData={this.state.selectedList}
										buttonAction={(key) => this.deselectPerson(key)}
										buttonText={"Retirar"}
									/>
								</CardBody>
							</div>
						}
						<h3 style={{paddingLeft: '20px'}}>Profissionais</h3>
						<CardBody>
							<Table
								tableHeaderColor="warning"
								tableHead={["Nome", "Função", "Média por projeto", "Adicionar"]}
								tableData={this.state.fullList}
								buttonAction={(key) => this.selectPerson(key)}
								buttonText={"Adicionar"}
							/>
						</CardBody>
					</Card>
				</GridItem>
				{this.state.selectedList}
			</GridContainer>
		);
	}
}

export default withStyles(styles)(ProjectsList);
