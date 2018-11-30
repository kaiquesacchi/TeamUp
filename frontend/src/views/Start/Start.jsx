import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { bugs, website, server } from "variables/general.jsx";

import {
	dailySalesChart,
	emailsSubscriptionChart,
	completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import ImageButtons from 'components/CustomButtons/ImageButtons.js'


const API_URL = process.env.API_URL || 'http://localhost:5000';


class Start extends React.Component {
	constructor() {
		super();
		this.state = {
			earnings: {
				value: 0,
				last_update: 'Desatualizado'
			},
			employees: {
				value: 0,
				last_update: 'Desatualizado'
			},
			graph: emailsSubscriptionChart,
			value: 0,
			images: [
				{
					color: '#2bb551',
					title: 'Crie um Projeto',
					width: '50%',
				},
				{
					color: '#fc9a00',
					title: 'Acompanhe seus Projetos',
					width: '50%',
				},
			]
		};
	}

	async componentDidMount(){
		const result = await fetch(API_URL + '/start', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		});
		const resultJSON = await result.json();
		this.setState(prevState =>({
			earnings: resultJSON.earnings,
			employees: resultJSON.employees,
			graph: {
				...prevState.graph,
				data: {
					...prevState.graph.data,
					series: resultJSON.graph_values
				}
			}
		}))
		console.log(this.state.graph)
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};
	render() {
		const { classes } = this.props;
		return (
<div>

	<GridContainer>
		<GridItem xs={12} sm={12} md={12}>
			<ImageButtons images={this.state.images}/>
		</GridItem>
	</GridContainer>

	<GridContainer>
		<GridItem xs={12} sm={6} md={3}>
			<Card>
				<CardHeader color="success" stats icon>
					<CardIcon color="success">
					<Store />
					</CardIcon>
					<p className={classes.cardCategory}>Lucro</p>
					<h3 className={classes.cardTitle}>R${this.state.earnings.value}</h3>
				</CardHeader>
					<CardFooter stats>
					<div className={classes.stats}>
						<DateRange />
						{this.state.earnings.last_update}
					</div>
				</CardFooter>
			</Card>
		</GridItem>

		<GridItem xs={12} sm={6} md={3}>
			<Card>
				<CardHeader color="info" stats icon>
					<CardIcon color="info">
					<Accessibility />
					</CardIcon>
					<p className={classes.cardCategory}>Funcionários</p>
					<h3 className={classes.cardTitle}>{this.state.employees.value}</h3>
				</CardHeader>
				<CardFooter stats>
					<div className={classes.stats}>
						<Update />
						{this.state.employees.last_update}
					</div>
				</CardFooter>
			</Card>
		</GridItem>
	</GridContainer>

	<GridContainer>
		<GridItem xs={12} sm={12} md={6}>
			<Card chart>
				<CardHeader color="warning">
					<ChartistGraph
						className="ct-chart"
						data={this.state.graph.data}
						type="Bar"
						options={emailsSubscriptionChart.options}
						responsiveOptions={emailsSubscriptionChart.responsiveOptions}
						listener={emailsSubscriptionChart.animation}
					/>
				</CardHeader>
			<CardBody>
				<h4 className={classes.cardTitle}>Entregas</h4>
				<p className={classes.cardCategory}>
					Linhas de código adicionadas
				</p>
			</CardBody>
			<CardFooter chart>
				<div className={classes.stats}>
					<AccessTime /> Última atualização: 2 dias atrás
				</div>
			</CardFooter>
			</Card>
		</GridItem>
	
	<GridItem xs={12} sm={12} md={6}>
		<CustomTabs
			title="Geral:"
			headerColor="primary"
			tabs={[
			{
				tabName: "Bugs",
				tabIcon: BugReport,
				tabContent: (
					<Tasks
					checkedIndexes={[0, 3]}
					tasksIndexes={[0, 1, 2, 3]}
					tasks={bugs}
					/>
					)
			},
			{
				tabName: "Progressos",
				tabIcon: Code,
				tabContent: (
					<Tasks
					checkedIndexes={[0]}
					tasksIndexes={[0, 1]}
					tasks={website}
					/>
				)
			}
			]}
		/>
	</GridItem>
	</GridContainer>
</div>
		);
	}
}

Start.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Start);
