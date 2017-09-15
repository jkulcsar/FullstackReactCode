import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
	// A child component is passed into the StripeCheckout component
	// to override the out-of-the-box styling of the "Pay" button
	// that's rendered by StripeCheckout.
	render() {
		return (
			<StripeCheckout
				name="Emaily"
				description="$5 for 5 email credits"
				amount={500}
				token={token => this.props.handleToken(token)}
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			>
				<button className="btn">Add credits</button>
			</StripeCheckout>
		);
	}
}

// we've imported all the actions, just pass all of them in an let the
// component decide which ones to use from its props
export default connect(null, actions)(Payments);
