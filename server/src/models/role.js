const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { BaseSchema } = require('./baseschema');

const RoleSchema = new Schema(
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

const Role = mongoose.model('Role', RoleSchema);
module.exports = { Role };
