import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

// SurveyNew is a container component, showing SurveyForm and SurveyFormReview
// Section 11 - Lecture 157 is a great example of how to reason on
// application level state (using redux) vs. component level state
class SurveyNew extends Component {
	// classic React way to initialize component level state
	// constructor(props) {
	// 	super(props);
	//
	// 	this.state = { newParam: true };
	// }

	// a simpler way to initialize component level state in a create-create-app is:
	state = { showFormReview: false };

	// the decision making function: what to render based on the component state
	renderContent() {
		if (this.state.showFormReview === true) {
			return (
				<SurveyFormReview
					onCancel={() => this.setState({ showFormReview: false })}
				/>
			);
		}

		// the role of the onSurveySubmit callback function is to update the
		// component level state (in this case: the showFormReview flag)
		return (
			<SurveyForm
				onSurveySubmit={() => this.setState({ showFormReview: true })}
			/>
		);
	}

	// the render function
	render() {
		return <div>{this.renderContent()}</div>;
	}
}

// Section 11 Lecture 164 explains why this works:
// we are tying the SurveyNew form to the form named surveyForm however we are
// not setting the destroyOnUnmount prop to false, by default is true
// which means that the form data will be dumped as soon as we navigate away
// from SurveyNew (which is the parent of SurveyForm and SurveyFormReview)
// but not when we navigate between the two child components SurveyForm and
// SurveyFormReview
export default reduxForm({ form: 'surveyForm' })(SurveyNew);
