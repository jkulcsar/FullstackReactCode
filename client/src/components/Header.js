import React, { Component } from 'react';
import { connect } from 'react-redux';
class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return;

			case false:
				return (
					<li>
						<a href="/auth/google>">Login with Google</a>
					</li>
				);

			default:
				return (
					<li>
						<a>Logout</a>
					</li>
				);
		}
	}

	render() {
		console.log(this.props);

		return (
			<nav>
				<div className="nav-wrapper">
					<a className="left brand-logo">Emaily</a>
					<ul className="right">{this.renderContent()}</ul>
				</div>
			</nav>
		);
	}
}

// mapStateToProps receives in the 'state' parameter the entire app-wide state;
// extract the props relevant to this component only
// function mapStateToProps(state) {
// 	return { auth: state.auth };
// }
// refactored and condensed:
function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
