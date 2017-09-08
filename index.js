const express = require('express');

// there is nothing exported from the passport.js file
// but we need to reference it somewhere so it will exist / be brought in scope
require('./services/passport');

const app = express();

require('./routes/authRoutes')(app);

// Heroku will inject in the environment variables the PORT constant
const PORT = process.env.PORT || 5000;

app.listen(PORT);
