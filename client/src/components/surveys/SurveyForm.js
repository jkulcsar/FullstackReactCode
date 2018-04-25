import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields.js';

// SurveyForm shows a form for a user to add input
class SurveyForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}

	// the onSubmit is the perfect place to update the component level state
	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

// the form content validation function that will be ran automatically
function validate(values) {
	const errors = {};

	// check if the provided email addresses are valid
	errors.recipients = validateEmails(values.recipients || '');

	// check if each field of the form has a value at all
	_.each(formFields, ({ name, noValueErrorMessage }) => {
		if (!values[name]) {
			errors[name] = noValueErrorMessage;
		}
	});

	// this is the repetitive way:
	//
	// if (!values.title) {
	// 	errors.title = 'Please provide a title for this email.';
	// }
	//
	// if (!values.subject) {
	// 	errors.subject = 'Please provide a subject for the email.';
	// }
	//
	// if (!values.body) {
	// 	errors.body = 'Please provide a subject for the email.';
	// }

	return errors;
}

// the reduxForm helper provides us, among other things, the handleSubmit interface (prop);
// destroyOnUnmount controls if the values of the form are kept when navigating away
export default reduxForm({
	validate: validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);
