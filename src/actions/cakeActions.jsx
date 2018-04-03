import cakeApi from '../api/cakeApi';
import * as types from './actionTypes';

export const formStatus = status => {
	return {
		type: types.FORM_STATUS,
		status
	};
};

export const ajaxLoading = status => {
	return {
		type: types.AJAX_LOADING,
		status
	};
};

/* GET ALL CAKES */
export const getCakes = () => {
	return dispatch => {
		dispatch(ajaxLoading(true));
		
		return cakeApi.getCakes()
			.then(cakes => {
				dispatch(getCakesSuccess(cakes));
				
				dispatch(ajaxLoading(false));
			})
			.catch(error => {
				dispatch(ajaxLoading(false));
					
				/* Bubble the error back up the rabbit hole */
				return Promise.reject(error);
			});
	};
};

export const getCakesSuccess = cakes => {
	return {
		type: types.GET_CAKES_SUCCESS,
		cakes
	};
};

/* GET SPECIFIC CAKE */
export const getCake = cake => {
	return dispatch => {
		dispatch(ajaxLoading(true));
		
		return cakeApi.getCake(cake)
			.then(cake => {
				dispatch(getCakeSuccess(cake));
				
				dispatch(ajaxLoading(false));
			})
			.catch(error => {
				dispatch(ajaxLoading(false));
				
				/* Bubble the error back up the rabbit hole */
				return Promise.reject(error);
			});
	};
};

export const getCakeSuccess = cake => {
	return {
		type: types.GET_CAKE_SUCCESS,
		cake
	};
};

/* CREATE NEW CAKE */
export const createCake = cake => {
	return dispatch => {
		dispatch(ajaxLoading(true));
		
		return cakeApi.createCake(cake)
			.then(data => {
				/* The API is not returning any response data, even though I get back a 201 created status, so I'm sticking the cake payload into the cakes list */
				dispatch(createCakeSuccess(cake));
				
				dispatch(ajaxLoading(false));
			})
			.catch(error => {
				dispatch(ajaxLoading(false));
				
				/* Bubble the error back up the rabbit hole */
				return Promise.reject(error);
			});
	};
};

export const createCakeSuccess = cake => {
	return {
		type: types.CREATE_CAKE_SUCCESS,
		cake
	};
};

/* UPDATE SPECIFIC CAKE */
export const updateCake = cake => {
	return dispatch => {
		dispatch(ajaxLoading(true));
		
		return cakeApi.updateCake(cake)
			.then(data => {
				dispatch(updateCakeSuccess(cake));
				
				dispatch(ajaxLoading(false));
			})
			.catch(error => {
				dispatch(ajaxLoading(false));
				
				/* Bubble the error back up the rabbit hole */
				return Promise.reject(error);
			});
	};
};

export const updateCakeSuccess = cake => {
	return {
		type: types.UPDATE_CAKE_SUCCESS,
		cake
	};
};

/* DELETE SPECIFIC CAKE */
export const deleteCake = cake => {
	return dispatch => {
		dispatch(ajaxLoading(true));
		
		return cakeApi.deleteCake(cake)
			.then(data => {
				dispatch(deleteCakeSuccess(cake));
				
				dispatch(ajaxLoading(false));
			})
			.catch(error => {
				dispatch(ajaxLoading(false));
				
				/* Bubble the error back up the rabbit hole */
				return Promise.reject(error);
			});
	};
};

export const deleteCakeSuccess = cake => {
	return {
		type: types.DELETE_CAKE_SUCCESS,
		cake
	};
};
