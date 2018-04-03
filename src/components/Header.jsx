import React from 'react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';

const Header = () => (
	<header>
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<a href="/" title="All Cakes" className="navbar-brand">All Cakes</a>
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
			</div>
		</nav>
	</header>
);

export default hot(module)(Header);
