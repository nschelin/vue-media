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
