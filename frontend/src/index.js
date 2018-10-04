import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'assets/css/index.css';
import 'assets/css/Intro.css';
import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";
import Home from "views/Home/Home.js"
import Authentication from "views/Authentication/Authentication.js"
import CompleteSignUp from "views/Authentication/CompleteSignUp.js"

ReactDOM.render(

<BrowserRouter>
	<Switch>
  		<Route exact path="/" component={Home}>
		</Route>
		<Route path="/auth/complete-sign-up" component={CompleteSignUp}>
		</Route>
		<Route path="/auth" component={Authentication}>
		</Route>
		{indexRoutes.map((prop, key) => {
			return <Route path={prop.path} component={prop.component} key={key} />;
		})}
	</Switch>
</BrowserRouter>,

document.getElementById('root'));




