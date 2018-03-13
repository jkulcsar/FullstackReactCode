const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// This is somewhat non-conventional to get to the Mongo model,
// however it avoids problems with some of the testing frameworks
// that do not support multiple inclusion of a schema (instead of including
// the schema, we are querying it out of Mongoose).
const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});

		// Great place to send an email
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			await mailer.send();
			await survey.save();

			// substract credit after successfully sent out survey
			req.user.credits -= 1;
			const user = await req.user.save();

			// send the updated user profile back as a response;
			// with this, the application header will automatically update
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
