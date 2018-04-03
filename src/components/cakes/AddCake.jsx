import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import * as cakeActions from '../../actions/cakeActions';

import Form from '../Form';

class AddCake extends Component {
	constructor(props) {
		super(props);
		
		/* Setting a state to pass between parent and child components */
		this.state = {
			formStatus: props.formStatus
		};
		
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	handleSubmit = event => {
		event.preventDefault();
		
		/* Check if form has any errors */
		if (!this.props.cakeForm.syncErrors) {
			/* Make sure the yum factor is an integer */
			this.props.cakeForm.values.yumFactor = parseInt(this.props.cakeForm.values.yumFactor, 10);
			
			/* Add form fields, along with defaults */
			const cake = Object.assign({}, this.props.cakeForm.values, {
				id: this.props.cakeId
			});
			
			this.props.actions.createCake(cake)
				.then(response => {
					/* Update the store (which will update the state) as we need to pass the status between top level components */
					this.props.actions.formStatus('created');
					
					/* Redirect back to the list of cakes */
					this.props.history.push('/');
				})
				/* Updating the state as we are passing between parent and child components */
				.catch(error => this.setState({ formStatus: 'error' }));
		} else {
			/* Updating the state as we are passing between parent and child components */
			this.setState({ formStatus: 'error' });
		}
	};

	render = () => {
		return (
			<div className="row">
				<div className="col-12">
					<h1>Add Cake</h1>
					<Form handleSubmit={this.handleSubmit} formStatus={this.state.formStatus} buttonLabel="Add Cake" />
				</div>
			</div>
		);
	};
};

AddCake.propTypes = {
	formStatus: PropTypes.any,
	cakeForm: PropTypes.object,
	cakeId: PropTypes.any.isRequired
};

const newCakeId = cakes => {
	/**
	 * The API does not return ID's as numbers as per the technical test document.
	 * Cake ID's are returned as random alpha numeric strings.
	 * For the sake of adding a new cake in this technical test, I'm setting a numeric value.
	 */
	return Math.floor((Math.random() * 100) + 1);
};

const mapStateToProps = state => {
	const cakeId = (state.cakes.length) ? newCakeId(state.cakes) : 1;
	
	return {
		cakeId,
		cakeForm: state.form.cake,
		formStatus: state.formStatus
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(cakeActions, dispatch)
	};
};

AddCake = connect(mapStateToProps, mapDispatchToProps)(AddCake);

export default hot(module)(AddCake);
