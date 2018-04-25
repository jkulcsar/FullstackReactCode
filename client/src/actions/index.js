import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// redux-thunk allows us to bend the rule: it gives access to the Redux internal
// 'dispatch' function, thus enabling us to call 'dispatch' anytime just pass an action
// into 'dispatch' directly from the action creator rather than just flat-out return it
// from the action creator.

// An action is defined as an object with a 'type' property
// and optionally a payload.
// export const fetchUser = () => {
// 	// this is the normal flow: just returns an action
// 	//const request = axios.get('/api/current_user');
// 	//
// 	// return {
// 	// 	type: FETCH_USER,
// 	// 	payload: request
// 	// };
//
// 	// here's the difference: redux-thunk inspects what was been returned by the
// 	// action creator; if it is a function (like here) then it automatically calls
// 	// this function and passes a reference to its internal 'dispatch' function into it.
// 	return function(dispatch) {
// 		axios
// 			.get('/api/current_user')
// 			.then(res => dispatch({ type: FETCH_USER, payload: res }));
// 	};
// };
//
// refactored: condensed with ES2017 and using async/await
// From the response, only 'data' is the actual payload, ignore the other props
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');

	// the backend server returns the user
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
	// make a POST request to the backend server
	const res = await axios.post('/api/stripe', token);

	// the backend server returns the same user however with an updated credit stand
	// this means we can dispatch the same type of action as when fetching the user
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
	// make a POST request to the backend server
	const res = await axios.post('/api/surveys', values);

	// on successfully POST-ing, use the browser history provided by withRouter
	// to navigate; here: to the root of the Surveys
	history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
	const res = await axios.get('/api/surveys');

	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
