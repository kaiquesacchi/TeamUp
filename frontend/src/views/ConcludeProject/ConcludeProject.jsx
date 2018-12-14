import React, { Component } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const API_URL = process.env.API_URL || 'https://teamup-servidor.herokuapp.com';

class ConcludeProject extends Component {
  constructor() {
    super();

    this.state = {
      nps: '',
      comment: '',
      created: false,
      project: '',
      projects: [],
      errorProject: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount(){
    const result = await fetch(API_URL + '/projeto/concluir', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });
    const resultJSON = await result.json();
    this.setState({
      projects: resultJSON.projects,
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
    if (this.state.project === '') {
      this.setState({errorProject: true});
    } else {
      const result = await fetch(API_URL + '/projeto/concluir', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'content-type': 'application/json',
        },
      });
      const resultJSON = await result.json();
      this.setState({
        nps: '',
        comment: '',
        created: true,
        project: '',
        errorProject: false,
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
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
                  <FormControl className={classes.selectField}>
                    <InputLabel htmlFor="project">Projeto</InputLabel>
                    <Select
                      value={this.state.project}
                      onChange={this.handleChange}
                      name="project"
                      inputProps={{
                        id: 'project',
                      }}
                    >
                      <MenuItem value="">
                      <em>-</em>
                      </MenuItem>
                      {this.state.projects.map((project, i) =>
                        <MenuItem key={i} value={project.value}>{project.name}</MenuItem>
                      )}
                    </Select>
								</FormControl>
								{this.state.errorProject &&
									<div style={{fontSize: '1.5rem', padding: '15px 0'}}>
										É preciso selecionar um projeto!
									</div>
								}
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
