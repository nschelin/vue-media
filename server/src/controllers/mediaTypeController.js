const mongoose = require('mongoose').set(
	'debug',
	(collectionName, method, query, doc) => {
		console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
	}
);

const MediaType = mongoose.model('MediaType');
const Genre = mongoose.model('Genre');

exports.list = async (req, res) => {
	const mediaTypes = await MediaType.find({})
		.lean() // returns plain JS object; mongoose objects are immutable
		.select('title _id')
		.sort({ title: 'asc' });

	for (const mediaType of mediaTypes) {
		const isUsed =
			(await Genre.findOne({ mediaTypes: mediaType._id }).countDocuments()) > 0;

		if (isUsed) mediaType.isUsed = isUsed;
	}

	res.send(mediaTypes);
};

exports.get = async (req, res) => {
	const mediaType = await MediaType.findById(req.params.id);
	res.send(mediaType);
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
	const mt = req.body;
	let mediaType = await MediaType.findOne({
		title: { $regex: new RegExp(`^${mt.title}$`, 'i') }
	});

	if (mediaType) {
		// genre exists
		res.send({ error: { code: 409, message: 'already exists' } });
	} else {
		mediaType = await MediaType.create({ title: mt.title });
		res.send(mediaType);
	}
};

exports.delete = async (req, res) => {
	const id = req.params.id;
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
