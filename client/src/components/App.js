// Rendering conrol layer (React Router).
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

// gotcha: BrowserRouter only expects to have one child (no two divs under BrowserRouter).
// Header should always be visible, no need to wrap it under a Route.
// The App component itself will first make a request to get the current user.
class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div className="container">
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route exact path="/surveys/new" component={SurveyNew} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

// mapStateToProps is not used in this component so it's null
export default connect(null, actions)(App);
