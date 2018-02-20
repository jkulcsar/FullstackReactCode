const mongoose = require('mongoose');

// the following statement, de-structured
//const Schema = mongoose.Schema;
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

// Recipients are a sub-document because we want to make it very clear that
// there is a strong association between the Survey and Recipients.
// This is also the general rule for deciding to use sub-documents.
// The _user prop is just an mongodb object ID type, referring back to a User (in other words: it's a
// relationship field).
const surveySchema = new Schema({
	titel: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	dateSent: Date,
	lastResponded: Date
});

mongoose.model('surveys', surveySchema);
