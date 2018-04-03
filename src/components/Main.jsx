import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route } from 'react-router-dom';

import AddCake from './cakes/AddCake';
import AllCakes from './cakes/AllCakes';
import EditCake from './cakes/EditCake';

const Main = () => (
	<main className="p-3">
		<Switch>
			<Route exact path='/' component={AllCakes} />
			<Route path='/cakes/page/:currentPage?' component={AllCakes} />
			<Route exact path='/cakes/add' component={AddCake} />
			<Route path='/cakes/edit/:id' component={EditCake} />
		</Switch>
	</main>
);

export default hot(module)(Main);
