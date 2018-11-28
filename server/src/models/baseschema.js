const options = require('./descriminatorKey');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const baseSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		created: {
			type: Date,
			required: true,
			default: Date.now
		},
		modified: {
			type: Date,
			required: true,
			default: Date.now
		}
	},
	options
);

module.exports = mongoose.model('Media', baseSchema);
