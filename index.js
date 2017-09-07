const express = require('express');

const app = express();

// Heroku will inject in the environment variables the PORT constant
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

app.listen(PORT);
