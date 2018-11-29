const { MediaOptions } = require('./options');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Media = require('./mediaBase.js');
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
	MediaOptions
);

module.exports = Media.discriminator('Music', musicSchema);
