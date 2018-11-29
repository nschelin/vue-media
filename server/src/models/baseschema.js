const BaseSchema = {
	title: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		required: true,
		default: Date.now
	},
	modified: {
		type: Date,
		required: true,
		default: Date.now
	}
};
module.exports = BaseSchema;
