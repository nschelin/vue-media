const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Base Schema
const { BaseSchema } = require('./baseschema');

const mediaBaseSchema = {
	mediaTypes: [
		{
			type: Schema.ObjectId,
			ref: 'MediaType'
		}
	],
	...BaseSchema
};

// Combine baseschema and Media pieces
const MediaSchema = new Schema(mediaBaseSchema);

const Media = mongoose.model('Media', MediaSchema);
module.exports = { Media };
