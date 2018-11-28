const options = require('./descriminatorKey');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseSchema = require('./baseschema');

const videoSchema = new Schema(
	{
		desc: String,
		year: Number,
		collection: String,
		genre: String, // SciFi, Drama, Comedy, etc.
		videoFormat: String // VHS, Bluray, Digital, etc.
	},
	options
);

const movieSchema = new Schema({}, options);
const tvShowSchema = new Schema(
	{
		season: Number
	},
	options
);

const Video = BaseSchema.discriminator('Video', videoSchema);
const Movie = Video.discriminator('Movie', movieSchema);
const TvShow = Video.discriminator('TvShow', tvShowSchema);

module.exports = { Video, Movie, TvShow };
