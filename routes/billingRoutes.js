const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

// req.body.id is the authorization token
module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 email credits',
			source: req.body.id
		});

		// find the user that just made this successful payment
		req.user.credits += 5;
		const user = await req.user.save();

		// send back the updated user
		res.send(user);
	});
};
