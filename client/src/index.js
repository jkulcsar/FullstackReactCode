// Data control layer (Redux).
// import materializeCSS from 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// create the app-wide state store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Get the 'root' element from public/index.html
// The Provider will inform all it's children that something has changed
// in the overall app state store.
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);

// check the environment variables:
console.log('ENVIRONMENT IS: ', process.env.NODE_ENV);
console.log('STRIPE KEY IS: ', process.env.REACT_APP_STRIPE_KEY);
