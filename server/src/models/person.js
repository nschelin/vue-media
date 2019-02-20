const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { BaseSchema } = require('./baseschema');
delete BaseSchema.title;

const PersonSchema = new Schema(
	Object.assign(
		{},
		{
			lastName: {
				type: String,
				required: true
			},
			firstName: String,
			roles: [
				{
					type: Schema.ObjectId,
					ref: 'Role'
				}
			]
		},
		BaseSchema
	)
);

const Person = mongoose.model('Person', PersonSchema, 'people');
module.exports = { Person };
