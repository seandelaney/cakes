import axios from 'axios';

class CakeApi {
	constructor() {
		this.axiosCall = null;
	};
		
	static requestHeaders() {
		return {
			'Content-Type': 'application/json'
		};
	};
	
	static reportError(error) {
		if (error && error.message !== undefined) {
			/* Something happened in setting up the request that triggered an Error */
			console.error(error.message);
		} else if (error && error.response) {
			/* The request was made and the server responded with a status code that falls out of the range of 2xx */
			console.error(error.response.data);
			console.error(error.response.status);
			console.error(error.response.headers);
		} else if (error && error.request) {
			/* The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser */
			console.error(error.request);
		}
	};

	/* Cancellable request */
	static axiosRequest() {
		return (method, url, expectedStatus = 200, data = null) => {
			if (this.axiosCall) {
				this.axiosCall.cancel();
			}
			
			const CancelToken = axios.CancelToken;
			
			this.axiosCall = CancelToken.source();
			
			const headers = this.requestHeaders();
			
			const config = {
				url,
				method,
				headers,
				data,
				validateStatus: status => status === expectedStatus
			};
			
			const cancelable = {
				cancelToken: this.axiosCall.token
			};
			
			return axios.request(config, cancelable)
				.then(response => response.data)
				.catch(thrown => {
					if (axios.isCancel(thrown)) {
						/* Duplicate request cancelled */
					} else {
						/* Prints the error in the console */
						this.reportError(thrown);
						
						/* Bubble the error back up the rabbit hole */
						return Promise.reject(thrown);
					}
				});
		};
	};
	
	static getCakes() {
		const axiosRequest = this.axiosRequest();
		
		return axiosRequest('GET', `${process.env.API_HOST}/cakes`);
	};
	
	static getCake(cake) {
		const axiosRequest = this.axiosRequest();
		
		return axiosRequest('GET', `${process.env.API_HOST}/cakes/${cake.id}`);
	};
	
	static createCake(cake) {
		const axiosRequest = this.axiosRequest();
		
		const data = JSON.stringify(cake);
		
		return axiosRequest('POST', `${process.env.API_HOST}/cakes`, 201, data);
	};
	
	static updateCake(cake) {
		const axiosRequest = this.axiosRequest();
		
		const data = JSON.stringify(cake);
		
		return axiosRequest('PUT', `${process.env.API_HOST}/cakes/${cake.id}`, 204, data);
	};
	
	static deleteCake(cake) {
		const axiosRequest = this.axiosRequest();
		
		return axiosRequest('DELETE', `${process.env.API_HOST}/cakes/${cake.id}`, 204);
	};
}

export default CakeApi;
