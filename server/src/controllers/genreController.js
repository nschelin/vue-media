const mongoose = require('mongoose');
const Genre = mongoose.model('Genre');

exports.list = async (req, res) => {
	const genres = await Genre.find()
		.select('title created modified')
		.sort({ title: 'asc' });
	res.send(genres);
};
