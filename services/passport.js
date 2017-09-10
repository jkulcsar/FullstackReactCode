const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

// This is not an import, we're only asking Mongoose to
// provide a reference to this schema based on its name/id, not type.
// Easiest way to fetch  a model out of Mongoose.
const User = mongoose.model('users');

// the user.id here is NOT the profile.id
// user.id is a shortcut to the Mongo DB record identifier;
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// we get whatever had been in the cookie (we packaged user.id)
passport.deserializeUser((id, done) => {
	// Search the collection and retrieve the user with this ID
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			// console.log('Access token:  ', accessToken);
			// console.log('Refresh token:  ', refreshToken);
			// console.log('Profile:  ', profile);

			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					// we already have a user with this id
					done(null, existingUser);
				} else {
					// no such user exists, create a new one
					new User({ googleId: profile.id })
						.save()
						.then(user => done(null, user)); // the 'user' instance here is a confirmation
				}
			});
		}
	)
);
