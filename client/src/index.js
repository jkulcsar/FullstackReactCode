// Data control layer (Redux).

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducers from './reducers';

// create the app-wide state store
const store = createStore(reducers, {}, applyMiddleware());

// Get the 'root' element from public/index.html
// The Provider will inform all it's children that something has changed
// in the overall app state store.
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
