import React from 'react';
import Main from './Main';
import Header from './Header';
import { hot } from 'react-hot-loader';

const App = () => (
	<div>
		<Header />
		<Main />
	</div>
);

export default hot(module)(App);
