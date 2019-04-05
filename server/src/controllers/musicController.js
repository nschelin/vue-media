const mongoose = require('mongoose').set(
	'debug',
	(collectionName, method, query, doc) => {
		console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
	}
);

const Album = mongoose.model('Album');

exports.albumList = async (req, res) => {
	const albums = await Album.find({})
		//.select('genres title year artist')
		.populate('genres', '_id title')
		.populate('artist', '_id title')
		.sort({ title: 'asc' });
	console.log(albums);
	res.send(albums);
};
