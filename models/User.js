const mongoose = require('mongoose');

// the following statement, de-structured
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String
});

mongoose.model('users', userSchema);
