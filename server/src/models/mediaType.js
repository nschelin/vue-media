const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { BaseSchema } = require('./baseschema');

// MediaType schema is same as base
const MediaTypeSchema = new Schema(BaseSchema, { collection: 'mediatypes' });

const MediaType = mongoose.model('MediaType', MediaTypeSchema);

module.exports = { MediaType };
