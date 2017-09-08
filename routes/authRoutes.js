const passport = require('passport'); // require the original npm passport library

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', { scope: ['profile', 'email'] })
	);

	app.get('/auth/google/callback', passport.authenticate('google'));
};
