// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

// the submitSurvey prop here is an action that's wired up through the connect function
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	// using destructuring to extract the name and label fields from each element of the formFields array
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	// to delay the execution of the submitSurvey action, we need to wrap it in an arrow function
	// otherwise it will be executed immediately;
	// the history object passed in to the submitSurvey is provided by withRouter
	return (
		<div>
			<h5>Please confirm your entries.</h5>
			{reviewFields}
			<button className="yellow darken-3 btn-flat" onClick={onCancel}>
				Back
			</button>
			<button
				className="green btn-flat right"
				onClick={() => submitSurvey(formValues, history)}
			>
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	console.log(state);
	return { formValues: state.form.surveyForm.values };
}

// SurveyFormReview is made "aware" of react router;
// means that SurveyFormReview has access to the browser history
// provided by react-router;
// see: https://reacttraining.com/react-router/web/api/withRouter
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
