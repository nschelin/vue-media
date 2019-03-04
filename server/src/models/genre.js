const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { BaseSchema } = require('./baseschema');

const genreBaseSchema = {
	mediaTypes: [
		{
			type: Schema.ObjectId,
			ref: 'MediaType'
		}
	],
	...BaseSchema
};

const GenreSchema = new Schema(genreBaseSchema);

const Genre = mongoose.model('Genre', GenreSchema);
module.exports = { Genre };
