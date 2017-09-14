const passport = require('passport'); // require the original npm passport library

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', { scope: ['profile', 'email'] })
	);

	// Flow summary: after user comes back from OAuth, passport performs
	// its internal state and passes on the request back to this function;
	// this function however has nothing more to do once auth is done,
	// so it just redirects to another URI.
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	app.get('/api/logout', (req, res) => {
		req.logout();
		// We've been returning the current user, just to prove that in the logout case,
		// it's empty; the normal flow is that after logout redirect the user to the
		// root of the app.
		//res.send(req.user);
		res.redirect('/');
	});

	// This will test if the authenticated user is retrieved correctly,
	// that the cookie session mechanism works.
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
