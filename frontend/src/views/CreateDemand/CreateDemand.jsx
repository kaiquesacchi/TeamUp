import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import avatar from "assets/img/faces/marc.jpg";

const API_URL = process.env.API_URL || 'http://localhost:5000';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class CreateDemand extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      description: '',
      funcionalities: '',
      maxDate: '',
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

  async handleSubmit(e) {
    e.preventDefault();
    const result = await fetch(API_URL + '/demanda', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'content-type': 'application/json',
      },
    });
    const resultJSON = await result.json();
    this.setState({
      name: '',
      description: '',
      funcionalities: '',
      maxDate: '',
      created: true,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <form onSubmit={this.handleSubmit}>
                <CardHeader color="warning">
                  <h4 className={classes.cardTitleWhite}>Cadastrar Demanda</h4>
                  <p className={classes.cardCategoryWhite}>Complete os dados sobre sua necessidade</p>
                </CardHeader>
                <CardBody>
                <InputLabel style={{ color: "#AAAAAA" }}>Informações básicas</InputLabel>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Nome do Projeto"
                        id="project-name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: this.state.name,
                          name: 'name',
                          onChange: this.handleChange,
                          required: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Data Máxima de Término"
                        id="max-date"
                        type="date"
                        formControlProps={{
                          fullWidth: true
                        }}
                        value={this.state.maxDate}
                        onChange={this.handleChange}
                        inputProps={{
                          value: this.state.maxDate,
                          name: 'maxDate',
                          onChange: this.handleChange,
                          required: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <br />
                      <InputLabel style={{ color: "#AAAAAA" }}>Sobre o projeto</InputLabel>
                      <CustomInput
                        labelText="Adicione uma descrição do problema que deverá ser resolvido."
                        id="description"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                          value: this.state.description,
                          name: 'description',
                          onChange: this.handleChange,
                          required: true,
                        }}
                        value={this.state.description}
                        onChange={this.handleChange}
                      />
                      <CustomInput
                        labelText="Cite ou descreva funcionalidades que devem ser desenvolvidas pelo projeto."
                        id="funcionalities"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                          value: this.state.funcionalities,
                          name: 'funcionalities',
                          onChange: this.handleChange,
                          required: true,
                        }}
                        value={this.state.funcionalities}
                        onChange={this.handleChange}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="warning" type="submit">Criar</Button>
                </CardFooter>
                {this.state.created &&
                  <div style={{padding:'20px', fontSize: '1.5rem'}}>
                    Demanda criada!
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

export default withStyles(styles)(CreateDemand);
