const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { BaseSchema } = require('./baseschema');
delete BaseSchema.title;

const personBaseSchema = {
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
	],
	...BaseSchema
};

const PersonSchema = new Schema(personBaseSchema, { collection: 'people' });

const Person = mongoose.model('Person', PersonSchema);
module.exports = { Person };
