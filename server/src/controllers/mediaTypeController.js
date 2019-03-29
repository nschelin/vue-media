const mongoose = require('mongoose').set(
	'debug',
	(collectionName, method, query, doc) => {
		console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
	}
);

const MediaType = mongoose.model('MediaType');

exports.list = async (req, res) => {
	const mediaTypes = await MediaType.find({})
		.select('title _id')
		.sort({ title: 'asc' });
	console.log(mediaTypes);
	res.send(mediaTypes);
};

exports.get = (req, res) => {
	MediaType.findById(req.params.id, function(err, mediaType) {
		console.log(mediaType);
		res.send(mediaType);
	});
};

exports.update = async (req, res) => {
	const mediaType = await MediaType.findOneAndUpdate(
		{ _id: req.params.id },
		req.body,
		{
			new: true // returns new, updated store instead of the old one
		}
	);
	res.send(mediaType);
};

exports.add = async (req, res) => {
	const title = req.body.mediaTypeTitle;
	let mediaType = await MediaType.findOne({
		title: { $regex: new RegExp(`^${title}$`, 'i') }
	});

	if (mediaType) {
		// genre exists
		res.send({ error: { code: 409, message: 'already exists' } });
	} else {
		mediaType = await MediaType.create({ title });
		res.send(mediaType);
	}
};

exports.delete = async (req, res) => {
	const id = req.params.id;
	console.log(id);
	MediaType.findByIdAndDelete(id, err => {
		if (err) {
			res.send({
				success: false,
				error: { code: 500, message: err.errors.message }
			});
		} else {
			res.send({ success: true });
		}
	});
};
