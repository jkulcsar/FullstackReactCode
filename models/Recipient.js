const mongoose = require('mongoose');

// the following statement, de-structured
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

// Recipients are a sub-document because we want to make it very clear that
// there is a strong association between the Survey and Recipients.
// This is also the general rule for deciding to use sub-documents.
const recipientSchema = new Schema({
	email: String,
	responded: { type: Boolean, default: false }
});

// This schema is just exported from this module, not registered with Mongo.
// It will be used in document composition, inside of Survey.
//mongoose.model('recipients', recipientSchema);
module.exports = recipientSchema;
