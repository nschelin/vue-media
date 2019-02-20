const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Base Schema
const { BaseSchema } = require('./baseschema');

// Combine baseschema and Media pieces
const MediaSchema = new Schema(
	Object.assign(
		{},
		{
			mediaTypes: [
				{
					type: Schema.ObjectId,
					ref: 'MediaType'
				}
			]
		},
		BaseSchema
	)
);

const Media = mongoose.model('Media', MediaSchema);
module.exports = { Media };
