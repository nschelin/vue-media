const mongoose = require('mongoose').set(
	'debug',
	(collectionName, method, query, doc) => {
		console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
	}
);

const Genre = mongoose.model('Genre');

exports.list = async (req, res) => {
	const genres = await Genre.find({})
		.select('title _id')
		.populate('mediaTypes', '_id title')
		.sort({ title: 'asc' });
	res.send(genres);
};

exports.get = (req, res) => {
	Genre.findById(req.params.id, function(err, genre) {
		res.send(genre);
	});
};

exports.update = async (req, res) => {
	const genre = await Genre.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true // returns new, updated store instead of the old one
	}).populate('mediaTypes', '_id title');

	res.send(genre);
};

exports.add = async (req, res) => {
	const newGenre = req.body;
	console.log(newGenre);
	let genre = await Genre.findOne({
		title: { $regex: new RegExp(`^${newGenre.title}$`, 'i') }
	});

	if (genre) {
		// genre exists
		res.send({ error: { code: 409, message: 'already exists' } });
	} else {
		genre = await Genre.create({
			title: newGenre.title,
			mediaTypes: newGenre.mediaTypes
		});
		await genre.populate('mediaTypes').execPopulate();
		res.send(genre);
		// Genre.populate(genre, { path: 'mediaTypes' }, (err, genre) => {
		// 	res.send(genre);
		// });
	}
};

exports.delete = async (req, res) => {
	const id = req.params.id;
	Genre.findByIdAndDelete(id, err => {
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
