import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

// The keys of the object that is passed in as parameter
// to the combineReducers function represents the state of the app,
// some good thought should be put in the naming scheme here.
export default combineReducers({
	auth: authReducer,
	form: reduxForm,
	surveys: surveysReducer
});
