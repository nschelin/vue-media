const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { BaseSchema, preSave } = require('./baseschema');

const albumBaseSchema = {
	title: String,
	year: Number,
	genres: [
		{
			type: Schema.ObjectId,
			ref: 'Genre'
		}
	],
	media: [
		{
			type: Schema.ObjectId,
			ref: 'MediaType'
		}
	],
	artist: {
		type: Schema.ObjectId,
		ref: 'Artist'
	},
	tracks: [
		{
			type: Schema.ObjectId,
			ref: 'Track'
		}
	],
	...BaseSchema
};

const albumSchema = new Schema(albumBaseSchema, { collection: 'albums' });
albumSchema.pre('save', preSave);

const Album = mongoose.model('Album', albumSchema);
module.exports = { Album };
