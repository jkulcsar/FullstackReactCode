const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
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

// Add the body-parser middleware.
app.use(bodyParser.json());

// Just like these middlewares, the requireLogin middleware we created
// could be added here, however since the requireLogin middleware is used
// only one some routes, being more specific helps clarity; so we register this
// middleware only in the billingRoutes routes (see billingRoutes).

// Tell express to use cookies.
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
require('./routes/billingRoutes')(app);

// only in production environment.
if (process.env.NODE_ENV === 'production') {
	// Express will server up production assets from the client, like
	// main.js or main.css
	app.use(express.static('client/build'));

	// Express will serve up index.html if it doesn't recognize the routes
	// (act as a pass-through).
	// This section acts as a catch-all for all previous routes: if none were
	// hit/matched, just server back index.html.
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Heroku will inject in the environment variables the PORT constant
const PORT = process.env.PORT || 5000;

app.listen(PORT);
