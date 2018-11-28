const options = require('./descriminatorKey');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseSchema = require('./baseschema');

const musicSchema = new Schema(
	{
		desc: String,
		year: Number,
		genre: String,
		musicFormat: {
			type: Schema.ObjectId,
			ref: 'MusicFormat'
		},
		IsAlbum: Boolean,
		IsSingleTrack: Boolean
	},
	options
);

module.exports = BaseSchema.discriminator('Music', musicSchema);
