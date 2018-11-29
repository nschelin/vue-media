const MediaOptions = require('./options');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Media = require('./baseschema');

const videoSchema = new Schema(
	{
		desc: String,
		year: Number,
		collection: String,
		genre: String, // SciFi, Drama, Comedy, etc.
		videoFormat: String // VHS, Bluray, Digital, etc.
	},
	MediaOptions
);

const movieSchema = new Schema({}, MediaOptions);
const tvShowSchema = new Schema(
	{
		season: Number
	},
	MediaOptions
);

const Video = Media.discriminator('Video', videoSchema);
const Movie = Video.discriminator('Movie', movieSchema);
const TvShow = Video.discriminator('TvShow', tvShowSchema);

module.exports = { Video, Movie, TvShow };
