import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

const cakesReducer = (state = initialState.cakes, action) => {
	switch (action.type) {
		case types.GET_CAKES_SUCCESS:
			return action.cakes;
		
		case types.GET_CAKE_SUCCESS:
			return [
				...state.filter(cake => cake.id !== action.cake.id),
				Object.assign({}, action.cake)
			];
			
		case types.CREATE_CAKE_SUCCESS:
			return [
				...state,
				Object.assign({}, action.cake)
			];
			
		case types.UPDATE_CAKE_SUCCESS:
			return [
				...state.filter(cake => cake.id !== action.cake.id),
				Object.assign({}, action.cake)
			];
		
		case types.DELETE_CAKE_SUCCESS:
			return [
				...state.filter(cake => cake.id !== action.cake.id)
			];
		
		default:
			return state;
	}
};

export default cakesReducer;
