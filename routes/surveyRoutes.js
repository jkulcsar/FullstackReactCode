const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
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
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: false
		});
		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		// note: please be careful not to have a trailing forward slash after the
		// redirect domain name; if a URL has also a starting forward slash (as for root)
		// than the duplicated forward slash will throw off the path-parser find-a-path
		// function
		const p = new Path('/api/surveys/:surveyId/:choice');

		// const events = _.map(req.body, ({ email, url }) => {
		// 	const match = p.test(new URL(url).pathname);
		//
		// 	// filter out the empty/undefined matches from the newly created objects
		// 	if (match) {
		// 		return {
		// 			email,
		// 			surveyId: match.surveyId,
		// 			choice: match.choice
		// 		};
		// 	}
		// });
		//
		// const compactEvents = _.compact(events);
		// const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

		// refactoring the code above using lodash.chain:
		// part of the refactoring is also removing the first parameter
		// from each function in the chain, since these are implicitly
		// passed in through the chaining
		_.chain(req.body)
			.map(({ email, url }) => {
				const match = p.test(new URL(url).pathname);

				// filter out the empty/undefined matches from the newly created objects
				if (match) {
					return {
						email,
						surveyId: match.surveyId,
						choice: match.choice
					};
				}
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: { email: email, responded: false }
						}
					},
					{
						$inc: { [choice]: 1 },
						$set: { 'recipients.$.responded': true },
						lastResponded: new Date()
					}
				).exec();
			})
			.value();

		res.send({});
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
