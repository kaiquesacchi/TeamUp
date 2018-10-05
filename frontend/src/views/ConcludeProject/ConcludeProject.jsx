import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';
import Icon from "@material-ui/core/Icon";
// @material-ui/core icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Accessibility from "@material-ui/icons/Accessibility";
import Update from "@material-ui/icons/Update";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Danger from "components/Typography/Danger.jsx";

import avatar from "assets/img/faces/marc.jpg";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class ConcludeProject extends Component {
  constructor() {
    super();

    this.state = {
      nps: '',
      comment: '',
      created: false,
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
    this.setState({
      nps: '',
      comment: '',
      created: true,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={5}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="info">
                  <DateRange/>
                </CardIcon>
                <p className={classes.cardCategory}>Data de término</p>
                <h3 className={classes.cardTitle}>
                  DD/MM/AAAA <small></small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Gasto do projeto</p>
                <h3 className={classes.cardTitle}>R$20000,00</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Store />
                  Previsto de R$15000,00
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="warning">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Problemas resolvidos</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <form onSubmit={this.handleSubmit}>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Avaliação</h4>
                  <p className={classes.cardCategoryWhite}>Avalie este projeto que foi concluído</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        id="nps"
                        name="nps"
                        label="NPS - Avalie o projeto de 0 a 10"
                        value={this.state.nps}
                        onChange={this.handleChange}
                        type="number"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        inputProps={{
                          min: "0",
                          max: "10",
                          step: "1",
                          required: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <br />
                      <CustomInput
                        labelText="Acrescente um comentário ou uma avaliação."
                        id="comment"
                        name="comment"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                          value: this.state.comment,
                          name: 'comment',
                          onChange: this.handleChange,
                        }}
                        value={this.state.comment}
                        onChange={this.handleChange}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type="submit">Finalizar</Button>
                </CardFooter>
                {this.state.created &&
                  <div style={{padding:'20px', fontSize: '1.5rem'}}>
                    Projeto finalizado!
                  </div>
                }
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(ConcludeProject);
