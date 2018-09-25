import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';

import 'assets/css/index.css';
import 'assets/css/App.css';

import RegisterDemand from './pages/Demands/RegisterDemand';
import Authentication from './pages/Authentication/Authentication';
import Home from './pages/Home/Home';

import indexRoutes from "routes/index.jsx";


ReactDOM.render(

<BrowserRouter>
	<Switch>
		<Route exact path="/" component={Home}>
		</Route>
		<Route path="/auth" component={Authentication}>
		</Route>
		<Route path="/demand" component={RegisterDemand}>
		</Route>
	</Switch>
</BrowserRouter>,

document.getElementById('root'));
