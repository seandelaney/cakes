import { createStore, applyMiddleware, compose } from 'redux';

/* Used to handle async actions in the store */
import thunk from 'redux-thunk';

/* Reducers */
import reducers from '../reducers';

/* Initial state */
import initialState from './initialState';

const configureStore = () => createStore(reducers, initialState, applyMiddleware(thunk));

export default configureStore;
