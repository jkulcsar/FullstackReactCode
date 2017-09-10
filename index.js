const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// There is nothing exported from the passport.js file
// but we need to reference it somewhere so it will exist / be brought in scope.
// Same thing for the Mongoose schemas.
// The order of the inclusion matters also; if you see errors in the app terminal
// because of non-existing schema, it's most likely because of a reference to a
// schema was not yet included.
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoUri);

const app = express();

// Tell express to use cookies
// 30 days long, in milliseconds
// cookieKey is just a random string, specific to this app; can be anything
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// Heroku will inject in the environment variables the PORT constant
const PORT = process.env.PORT || 5000;

app.listen(PORT);
