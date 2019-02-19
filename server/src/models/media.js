const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { BaseSchema } = require('./baseschema');

const MediaSchema = new Schema(
	Object.assign(
		{},
		{
			mediaTypes: [
				{
					type: Schema.ObjectId,
					ref: 'MediaType'
				}
			]
		},
		BaseSchema
	)
);

const Media = mongoose.model('Media', MediaSchema);
module.exports = { Media };