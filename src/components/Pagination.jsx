import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';

const Pagination = props => {
	const { pages, currentPage } = props;
	
	const prevLink = parseInt(currentPage - 1, 10);
	
	const nextLink = parseInt(currentPage + 1, 10);
	
	const prev = ((prevLink > 0) ? <li className="page-item"><Link to={'/cakes/page/' + prevLink} title="Previous" className="page-link text-muted">Previous</Link></li> : <li className="page-item disabled"><a href="javascript:void(0);" title="Previous" className="page-link text-muted" tabIndex="-1">Previous</a></li>);
	
	const next = ((nextLink <= pages) ? <li className="page-item"><Link to={'/cakes/page/' + nextLink} title="Next" className="page-link text-muted">Next</Link></li> : <li className="page-item disabled"><a href="javascript:void(0);" title="Next" className="page-link text-muted" tabIndex="-1">Next</a></li>);
	
	if (pages > 1) {
		return (
			<nav aria-label="Cakes navigation">
				<ul className="pagination">
					{prev}
					{next}
				</ul>
			</nav>
		);
	}
};

Pagination.propTypes = {
	pages: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired
};

export default hot(module)(Pagination);
