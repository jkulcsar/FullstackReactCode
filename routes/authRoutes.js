const passport = require('passport'); // require the original npm passport library

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', { scope: ['profile', 'email'] })
	);

	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	// This will test if the authenticated user is retrieved correctly,
	// that the cookie session mechanism works.
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
