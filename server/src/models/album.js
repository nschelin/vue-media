const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { BaseSchema } = require('./baseschema');

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
			ref: 'Media'
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
const Album = mongoose.model('Album', albumSchema);
module.exports = { Album };
