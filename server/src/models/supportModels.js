// const { FormatOptions } = require('./options');
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const BaseSchema = require('./baseschema');
// const FormatBase = require('./formatBase');

// const genreSchema = new Schema(BaseSchema, { collection: 'genre' });

// const videoFormatSchema = new Schema({}, FormatOptions);
// const musicFormatSchema = new Schema({}, FormatOptions);
// const paperFormatSchema = new Schema({}, FormatOptions);

// const Genre = mongoose.model('Genre', genreSchema);

// const VideoFormat = FormatBase.discriminator('VideoFormat', videoFormatSchema);
// const MusicFormat = FormatBase.discriminator('MusicFormat', musicFormatSchema);
// const PaperFormat = FormatBase.discriminator('PaperFormat', paperFormatSchema);

// module.exports = {
// 	Genre,
// 	VideoFormat,
// 	MusicFormat,
// 	PaperFormat
// };
