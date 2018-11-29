const BaseSchema = require('./baseschema');
const { MediaOptions } = require('./options');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaBaseSchema = new Schema(BaseSchema, MediaOptions);

const Media = mongoose.model('Media', mediaBaseSchema);

module.exports = Media;
