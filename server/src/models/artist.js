const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { BaseSchema } = require('./baseschema');

const artistBaseSchema = {
	title: String,
	description: String,
	genres: [
		{
			type: Schema.ObjectId,
			ref: 'Genre'
		}
	],
	yearsActive: [Number],
	discography: {
		albums: [
			{
				type: Schema.ObjectId,
				ref: 'Album'
			}
		],
		tracks: [
			{
				type: Schema.ObjectId,
				ref: 'Track'
			}
		]
	},
	...BaseSchema
};

const artistSchema = new Schema(artistBaseSchema, { collection: 'artists' });
const Artist = mongoose.model('Artist', artistSchema);
module.exports = { Artist };
