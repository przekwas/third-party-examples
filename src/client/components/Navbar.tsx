import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props: NavbarProps) => {
	return (
		<nav className="nav justify-content-between align-items-center shadow p-3">
			<h6>API Example Site</h6>
			<div>
				<NavLink className="btn btn-link mr-2" activeClassName="bg-primary text-white" exact to="/">
					Contact
				</NavLink>
				<NavLink className="btn btn-link" activeClassName="bg-primary text-white" exact to="/donate">
					Donate
				</NavLink>
			</div>
		</nav>
	);
};

interface NavbarProps {}

export default Navbar;
