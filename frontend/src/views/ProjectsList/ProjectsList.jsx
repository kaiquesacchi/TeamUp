import React, { Component } from "react";
// @material-ui/core components
import { withRouter } from 'react-router';
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const API_URL = process.env.API_URL || 'http://localhost:5000';

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
			projetos: [],
			urlIds: []
		}
	}

	async componentDidMount() {
		const result = await fetch(API_URL + '/projetos', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		});
		const resultJSON = await result.json();
		const urls = [];
		resultJSON.ids.map(id => {urls.push('/projeto/status/' + id)})
		this.setState({
			projetos: resultJSON.projetos,
			urlIds: urls,
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardHeader color="primary">
							<h4 className={classes.cardTitleWhite}>Meus Projetos</h4>
							<p className={classes.cardCategoryWhite}>
								Aqui está a lista dos seus projetos existentes
							</p>
						</CardHeader>
						<CardBody>
							<Table
								tableHeaderColor="primary"
								tableHead={["Nome", "Status", "Data prevista", "Preço", "Acompanhar"]}
								tableData={this.state.projetos}
								buttonLink={this.state.urlIds}
								buttonText={"Verificar status"}
							/>
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>
		);
	}
}
export default withStyles(styles)(ProjectsList);
