require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const {
	Genre,
	VideoFormat,
	MusicFormat
} = require('../src/models/supportModels');

const { Music } = require('../src/models/musicModel');

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

	// const mf = await MusicFormat.findOne({ title: 'Compact Disc' });
	// console.log(mf);
	const musicItems = [
		{
			artist: 'Blood Red Shoes',
			title: 'Get Tragic',
			desc: '',
			year: '2019',
			genre: '',
			musicFormat: await MusicFormat.findOne({ title: 'Compact Disc' }),
			IsAlbum: true,
			IsSingleTrack: false
		},
		{
			artist: 'Chris Cornell',
			title: 'Chris Cornell',
			desc: 'Deluxe Album',
			year: '2018',
			genre: '',
			musicFormat: await MusicFormat.findOne({ title: 'Compact Disc' }),
			IsAlbum: true,
			IsSingleTrack: false
		}
	];

	for (const musicItem of musicItems) {
		await Music.create(musicItem);
	}

	console.log('Done Creating Data');
	process.exit();
}

async function deleteData() {
	await Genre.deleteMany();
	await VideoFormat.deleteMany();
	await MusicFormat.deleteMany();
	await Music.deleteMany();

	console.log('Done Deleting Data');
	process.exit();
}
