import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import fastclick from 'fastclick';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

/* Included here to reduce the number of requests */
import './scss/global';

import App from './components/App';
import { getCakes } from './actions/cakeActions';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

/* Loads the cake list from the API */
store.dispatch(getCakes());

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('app'),
);

/* Polyfill to remove click delays on touch UIs */
fastclick.attach(document.body);

/* Add a service worker for Progressive Web App purposes */
registerServiceWorker();
