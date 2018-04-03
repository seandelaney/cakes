import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

const formStatusReducer = (state = initialState.formStatus, action) => {
	if (action.type === types.FORM_STATUS) {
		return action.status;
	}
	
	return state;
};

export default formStatusReducer;
