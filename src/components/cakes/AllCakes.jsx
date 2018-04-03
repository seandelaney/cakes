import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import * as cakeActions from '../../actions/cakeActions';

import List from '../List';

class AllCakes extends Component {
	constructor(props) {
		super(props);
	};
	
	render = () => {
		if (this.props.ajaxLoading) {
			return (
				<div className="row">
					<div className="col-12">
						<p className="text-info">Loading cakes&hellip;</p>
					</div>
				</div>
			);
		} else {
			return (<List cakes={this.props.cakes} pages={this.props.pages} currentPage={this.props.currentPage} formStatus={this.props.formStatus} />);
		}
	};
};

AllCakes.propTypes = {
	formStatus: PropTypes.any,
	cakes: PropTypes.array.isRequired,
	pages: PropTypes.number.isRequired,
	ajaxLoading: PropTypes.bool.isRequired,
	currentPage: PropTypes.number.isRequired
};

/* Generates a list of cakes for a given current page number */
const cakesPerPage = (cakes, currentPage, perPage) => {
	if (cakes.length) {
		/* Filter 10 cakes by current page number */
		return cakes.filter((cake, index) => {
			return index >= (perPage * (currentPage - 1)) && index < (perPage * currentPage);
		});
	}
	
	return [];
};

const mapStateToProps = (state, props) => {
	/* Show 10 cakes per page */
	const perPage = 10;
	
	/* Set the current page o 1 if no page number is passed as a url param */
	const currentPage = parseInt(props.match.params.currentPage, 10) || 1;
	
	const cakes = cakesPerPage(state.cakes, currentPage, perPage);
	
	return {
		cakes: cakes,
		currentPage: currentPage,
		formStatus: state.formStatus,
		ajaxLoading: state.ajaxLoading,
		pages: Math.ceil(state.cakes.length / perPage) /* Sets the number of pages for pagination */
	};
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(cakeActions, dispatch)
	};
};

AllCakes = connect(mapStateToProps, mapDispatchToProps)(AllCakes);

export default hot(module)(AllCakes);
