import React, { Component } from 'react';

// Imports para os botões com imagem
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import ImageButtons from 'components/CustomButtons/ImageButtons.js'


class CompleteSignUp extends Component {
	constructor(props){
		super(props)
		this.state = {
			images: [
				{
					url: 'client.jpg',
					title: 'Cliente',
					width: '50%',
					onClick: function() {
						props.history.push("/inicio")
					}
				},
				{
					url: '../../assets/img/CompleteSignUp/developer.jpg',
					title: 'Desenvolvedor',
					width: '50%',
					onClick: function() {
						props.history.push("/inicio")
					}
				}
			]
		};
	}


	render() {
	const { classes } = this.props;
		return (

<div className="Intro">
	<div className="IntroBackground Colapsed">
	</div>
	<div className="IntroForm">
		<h1>Seja bem vindo, Fernando</h1>
		<h2>Já estamos terminando, só precisamos saber</h2>
		<h2>com qual desses perfís você se identifica: </h2>
		<ImageButtons images={this.state.images} />
	</div>
</div>

		);
	}
}

export default CompleteSignUp;