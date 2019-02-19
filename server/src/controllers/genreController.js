const mongoose = require('mongoose');
const Genre = mongoose.model('Genre');

exports.list = async (req, res) => {
	const genres = await Genre.find()
		.select('title created modified')
		.sort({ title: 'asc' });
	res.send(genres);
};

exports.update = async (req, res) => {
	const genre = await Genre.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true // returns new, updated store instead of the old one
	});
	res.send(genre);
};

exports.add = async (req, res) => {
	const title = req.body.genreTitle;
	let genre = await Genre.findOne({
		title: { $regex: new RegExp(`^${title}$`, 'i') }
	});

	if (genre) {
		// genre exists
		res.send({ error: { code: 409, message: 'already exists' } });
	} else {
		genre = await Genre.create({ title });
		res.send(genre);
	}
};

exports.delete = async (req, res) => {
	const id = req.params.id;
	console.log(id);
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