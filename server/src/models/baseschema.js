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
	},
	model: String
};

function preSave(next) {
	this.model = this.constructor.modelName;
	next();
}

module.exports = { BaseSchema, preSave };
