const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { BaseSchema, preSave } = require('./baseschema');

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
GenreSchema.pre('save', preSave);

const Genre = mongoose.model('Genre', GenreSchema);
module.exports = { Genre };
