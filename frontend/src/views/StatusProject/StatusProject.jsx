import React, { Component } from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import AccessTime from "@material-ui/icons/AccessTime";
import BugReport from "@material-ui/icons/BugReport";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import {
  dailySalesChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const API_URL = process.env.API_URL || 'http://0.0.0.0:5000';

class StatusProject extends Component {
  constructor() {
    super();

    this.state = {
      foreseenDate: 'DD/MM/AAAA',
      spending: '',
      foreseenSpending: '',
      solvedProblems: '',
      deliveries: {
        labels: ["S", "T", "Q", "Q", "S", "S", "D"],
        series: [],
        last_update: '',
      },
      doneTasks: {
        labels: [
          "Jan", "Feb", "Mar", "Apr", "Mai", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        series: [],
        last_update: '',
      },
      tasks: [],
      employees: {
        value: [],
        last_update: '',
      }
    }
  }

  async componentDidMount(){
    const { id } = this.props.match.params
    if (!id || id === ":id"){
      this.props.history.push('/projetos')
    } else {
      const result = await fetch(API_URL + '/projeto/status/' + id, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const resultJSON = await result.json();
      this.setState(prevState =>({
        foreseenDate: resultJSON.foreseenDate,
        spending: resultJSON.spending,
        foreseenSpending: resultJSON.foreseenSpending,
        solvedProblems: resultJSON.solvedProblems,
        tasks: resultJSON.tasks,
        deliveries: {
          ...prevState.deliveries,
          series: resultJSON.deliveries.value,
          last_update: resultJSON.deliveries.last_update,
        },
        doneTasks: {
          ...prevState.doneTasks,
          series: resultJSON.doneTasks.value,
          last_update: resultJSON.doneTasks.last_update,
        },
        employees: resultJSON.employees,
      }));
  }
	}

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="warning" stats icon>
              <CardIcon color="info">
                  <DateRange />
                </CardIcon>
                <p className={classes.cardCategory}>Data prevista do término</p>
                <h3 className={classes.cardTitle}>
                  {this.state.foreseenDate} <small></small>
                </h3>
              </CardHeader>
              <CardFooter stats>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Gasto atual do projeto</p>
                <h3 className={classes.cardTitle}>R${this.state.spending}</h3>
              </CardHeader>
            <CardFooter stats>
                <div className={classes.stats}>
                  <Store />
                  Previsto de R${this.state.foreseenSpending}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="warning">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Problemas resolvidos</p>
                <h3 className={classes.cardTitle}>{this.state.solvedProblems}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>


                </div>
              </CardFooter>
            </Card>
          </GridItem>
          
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="primary">
                <ChartistGraph
                  className="ct-chart"
                  data={this.state.deliveries}
                  type="Bar"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Gastos diários</h4>
                <p className={classes.cardCategory}>
            
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Atualizado {this.state.doneTasks.last_update}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={this.state.doneTasks}
                  type="Bar"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Quantidade de tarefas realizadas</h4>
                <p className={classes.cardCategory}>
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Atualizado {this.state.deliveries.last_update}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tarefas:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Geral",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={this.state.tasks}
                    />
                  )
                }
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Lista de empregados</h4>
                <p className={classes.cardCategoryWhite}>
                
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Nome", "Salário", "Àrea"]}
                  tableData={this.state.employees.value}
                />
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Atualizado {this.state.employees.last_update}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

StatusProject.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(StatusProject);
