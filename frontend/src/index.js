import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'assets/css/index.css';
import 'assets/css/App.css';

import indexRoutes from "routes/index.jsx";
import Home from "pages/Home/Home.js"
import Authentication from "pages/Authentication/Authentication.js"


ReactDOM.render(

<BrowserRouter>
	<Switch>
  		<Route exact path="/" component={Home}>
		</Route>
		<Route path="/auth" component={Authentication}>
		</Route>
		{indexRoutes.map((prop, key) => {
			return <Route path={prop.path} component={prop.component} key={key} />;
		})}
	</Switch>
</BrowserRouter>,

document.getElementById('root'));




