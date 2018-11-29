const BaseSchema = require('./baseschema');
const { FormatOptions } = require('./options');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formatBaseSchema = new Schema(BaseSchema, FormatOptions);

const FormatBase = mongoose.model('FormatBase', formatBaseSchema);

module.exports = FormatBase;
