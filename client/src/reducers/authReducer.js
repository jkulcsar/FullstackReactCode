import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
	//console.log(action);

	switch (action.type) {
		// If the user is logged out, the payload is an empty string;
		// return false in this case, not an empty string.
		case FETCH_USER:
			return action.payload || false;

		default:
			return state;
	}
}
