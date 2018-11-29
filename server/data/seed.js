require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const {
	Genre,
	VideoFormat,
	MusicFormat
} = require('../src/models/supportModels');

const dbOptions = {
	useNewUrlParser: true
};

mongoose.connect(
	process.env.DATABASE,
	dbOptions,
	err => {
		if (err) throw err;

		if (process.argv.includes('--delete')) deleteData();
		else {
			createData();
		}
	}
);

async function createData() {
	const genres = ['SciFi', 'Fantasy', 'Drama', 'Comedy'];
	const videoFormats = ['VHS', 'DVD', 'Bluray', 'Digital'];
	const musicFormats = ['Cassette', 'Compact Disc', 'Digital'];
	for (const genre of genres) {
		await Genre.create({ title: genre });
	}

	for (const vFormat of videoFormats) {
		await VideoFormat.create({ title: vFormat });
	}

	for (const mFormat of musicFormats) {
		await MusicFormat.create({ title: mFormat });
	}

	console.log('Done Creating Data');
	process.exit();
}

async function deleteData() {
	await Genre.deleteMany();
	await VideoFormat.deleteMany();
	await MusicFormat.deleteMany();

	console.log('Done Deleting Data');
	process.exit();
}
