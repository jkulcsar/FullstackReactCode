import { combineReducers } from 'redux';
import authReducer from './authReducer';

// The keys of the object that is passed in as parameter
// to the combineReducers function represents the state of the app,
// some good thought should be put in the naming scheme here.
export default combineReducers({
	auth: authReducer
});
