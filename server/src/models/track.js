const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { BaseSchema } = require('./baseschema');

const trackBaseSchema = {
	title: String,
	length: Number,
	albums: [
		{
			type: Schema.ObjectId,
			ref: 'Album'
		}
	],
	year: Number,
	artist: [
		{
			type: Schema.ObjectId,
			ref: 'Artist'
		}
	],
	media: [
		{
			type: Schema.ObjectId,
			ref: 'Media'
		}
	],
	...BaseSchema
};

const Track = new Schema(trackBaseSchema);

const Track = mongoose.model('Track', trackSchema);
module.exports = { Track };
