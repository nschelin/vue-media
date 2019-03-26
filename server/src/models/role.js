const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { BaseSchema } = require('./baseschema');

const roleBaseSchema = {
	mediaTypes: [
		{
			type: Schema.ObjectId,
			ref: 'MediaType'
		}
	],
	...BaseSchema
};

const RoleSchema = new Schema(roleBaseSchema, { collection: 'roles' });

const Role = mongoose.model('Role', RoleSchema);
module.exports = { Role };
