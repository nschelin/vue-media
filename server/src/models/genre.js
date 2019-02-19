const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { BaseSchema } = require('./baseschema');

const GenreSchema = new Schema(
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

const Genre = mongoose.model('Genre', GenreSchema);
module.exports = { Genre };
