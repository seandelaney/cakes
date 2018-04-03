import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import * as cakeActions from '../../actions/cakeActions';

import Form from '../Form';

class EditCake extends Component {
	constructor(props) {
		super(props);
		
		/* Setting a state to pass between parent and child components */
		this.state = {
			formStatus: props.formStatus
		};
		
		this.handleSubmit = this.handleSubmit.bind(this);
		
		this.handleDelete = this.handleDelete.bind(this);
	};

	handleSubmit = event => {
		event.preventDefault();
		
		/* Check if form has any errors */
		if (!this.props.cakeForm.syncErrors) {
			/* Make sure the yum factor is an integer */
			this.props.cakeForm.values.yumFactor = parseInt(this.props.cakeForm.values.yumFactor, 10);
			
			/* Add form fields, along with defaults */
			const cake = Object.assign({}, this.props.cakeForm.values);
			
			this.props.actions.updateCake(cake)
				.then(response => {
					/* Update the store (which will update the state) as we need to pass the status between top level components */
					this.props.actions.formStatus('updated');
					
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
	
	handleDelete = (event, cake) => {
		event.preventDefault();
		
		if (confirm('Are you sure you want to delete this cake?')) {
			this.props.actions.deleteCake(cake)
				.then(response => {
					/* Update the store (which will update the state) as we need to pass the status between top level components */
					this.props.actions.formStatus('deleted');
					
					/* Redirect back to the list of cakes */
					this.props.history.push('/');
				})
				/* Updating the state as we are passing between parent and child components */
				.catch(error => this.setState({ formStatus: 'error' }));
		}
	};
	
	render = () => {
		if (this.props.ajaxLoading) {
			return (
				<div className="row">
					<div className="col-12">
						<p className="text-info">Loading cake&hellip;</p>
					</div>
				</div>
			);
		} else {
			if (!this.props.cake) {
				return (
					<div className="row">
						<div className="col-12">
							<p className="text-danger">Selected cake not found.</p>
						</div>
					</div>
				);
			} else {
				return (
					<div className="row">
						<div className="col-12">
							<h1>Edit Cake</h1>
							<div className="row">
								<div className="col-sm-12 col-md-6 col-lg-4">
									<figure className="figure">
										<img src={this.props.cake.imageUrl} alt={this.props.cake.name} className="figure-img img-fluid rounded" />
									</figure>
								</div>
							</div>
							<Form handleSubmit={this.handleSubmit} handleDelete={this.handleDelete} formStatus={this.state.formStatus} initialValues={this.props.cake} buttonLabel="Update Cake" showDeleteButton="true" />
						</div>
					</div>
				);
			}
		}
	};
};

EditCake.propTypes = {
	cake: PropTypes.any,
	formStatus: PropTypes.any,
	cakeForm: PropTypes.object,
	ajaxLoading: PropTypes.bool
};

const mapStateToProps = (state, props) => {
	/* Find current cake based on ID passed in URL */
	const cake = state.cakes.length ? state.cakes.find(cake => cake.id === props.match.params.id) : null;
	
	return {
		cake,
		cakeForm: state.form.cake,
		formStatus: state.formStatus,
		ajaxLoading: state.ajaxLoading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(cakeActions, dispatch)
	};
};

EditCake = connect(mapStateToProps, mapDispatchToProps)(EditCake);

export default hot(module)(EditCake);
