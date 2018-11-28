const options = require('./descriminatorKey');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BaseSchema = require('./baseschema');

const genreSchema = new Schema({}, options);
const videoFormatSchema = new Schema({}, options);
const musicFormatSchema = new Schema({}, options);
const paperFormatSchema = new Schema({}, options);

const Genre = BaseSchema.discriminator('Genre', genreSchema);
const VideoFormat = BaseSchema.discriminator('VideoFormat', videoFormatSchema);
const MusicFormat = BaseSchema.discriminator('MusicFormat', musicFormatSchema);
const PaperFormat = BaseSchema.discriminator('PaperFormat', paperFormatSchema);

module.exports = {
	Genre,
	VideoFormat,
	MusicFormat,
	PaperFormat
};
