import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';

import Pagination from './Pagination';

const List = props => {
	const { cakes, pages, formStatus, currentPage } = props;
	
	if (cakes.length) {
		return (
			<div className="row">
				<div className="col-12">
					<div className="row">
						<div className="col-12">
							<p><Link to="/cakes/add" title="Add Cake" className="btn btn-success">Add Cake</Link></p>
						</div>
					</div>
					<div className="row">
						{formStatus === 'created' ? <div className="col-12"><p className="text-success">Cake added successfully.</p></div> : ''}
						{formStatus === 'updated' ? <div className="col-12"><p className="text-success">Cake updated successfully.</p></div> : ''}
						{formStatus === 'deleted' ? <div className="col-12"><p className="text-success">Cake deleted successfully.</p></div> : ''}
						{cakes.map(cake => (
							<div key={cake.id} className="col-sm-12 col-md-2">
								<Link to={`/cakes/edit/${cake.id}`} title={`Edit ${cake.name}`}>
									<figure className="figure">
										<img src={cake.imageUrl} alt={cake.name} className="figure-img img-fluid rounded" />
										<figcaption className="figure-caption">{cake.name}</figcaption>
									</figure>
								</Link>
							</div>
						))}
					</div>
					<Pagination pages={pages} currentPage={currentPage} />
				</div>
			</div>
		);
	} else {
		return (
			<div className="row">
				<div className="col-12">
					<p className="text-warning">No cakes were found.</p>
				</div>
			</div>
		);	
	}
};

List.propTypes = {
	cakes: PropTypes.array.isRequired,
	pages: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired
};

export default hot(module)(List);
