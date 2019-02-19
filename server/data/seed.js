require('dotenv').config({ path: __dirname + '/../.env' });
const chalk = require('chalk');
const mongoose = require('mongoose');
// const {
// 	//Genre,
// 	VideoFormat,
// 	MusicFormat
// } = require('../src/models/supportModels');

// const { Music } = require('../src/models/musicModel');

const messageColor = 'cyan';
const completeColor = 'red';

const { MediaType } = require('../src/models/mediaType');
const { Genre } = require('../src/models/genre');
const { Media } = require('../src/models/media');

const dbOptions = {
	useNewUrlParser: true
};

mongoose.connect(process.env.DATABASE, dbOptions, err => {
	if (err) throw err;

	if (process.argv.includes('--delete')) {
		deleteData();
	} else {
		createData();
	}
});

async function createData() {
	const mediaTypes = ['Movie', 'Music', 'Video Game', 'Book'];
	const genres = [
		{ title: 'Science Fiction', types: ['Movie', 'Video Game', 'Book'] },
		{ title: 'Rock', types: ['Music'] },
		{ title: 'Action', types: ['Movie', 'Video Game'] }
	];

	const media = [
		{
			title: 'Compact Disc (CD)',
			types: ['Movie', 'Video Game', 'Book', 'Music']
		},
		{ title: 'VHS', types: ['Movie'] },
		{ title: 'DVD', types: ['Movie', 'Video Game'] },
		{ title: 'Bluray', types: ['Movie', 'Video Game'] }
	];

	log('* Creating Media Types', messageColor);
	for (let mt of mediaTypes) {
		await MediaType.create({ title: mt });
	}

	log('* Creating Genres', messageColor);
	for (let g of genres) {
		const mediaTypes = [];
		const types = g.types;
		for (let title of types) {
			mediaTypes.push(await MediaType.findOne({ title }));
		}

		await Genre.create({ title: g.title, mediaTypes });
	}

	log('* Creating Media', messageColor);
	for (let m of media) {
		const mediaTypes = [];
		const types = m.types;
		for (let title of types) {
			mediaTypes.push(await MediaType.findOne({ title }));
		}

		await Media.create({ title: m.title, mediaTypes });
	}

	log('--- Done Creating Data ---', completeColor);
	process.exit();
}

async function deleteData() {
	log('* Deleting Genres', messageColor);
	await Genre.deleteMany();

	log('* Deleting Media', messageColor);
	await Media.deleteMany();

	log('* Deleting Media Types', messageColor);
	await MediaType.deleteMany();

	log('--- Done Deleting Data ---', completeColor);
	process.exit();
}

function log(message, color) {
	console.log(chalk[color](message));
}

// async function _oldCreateData() {
// 	const genres = ['SciFi', 'Fantasy', 'Drama', 'Comedy'];
// 	const videoFormats = ['VHS', 'DVD', 'Bluray', 'Digital'];
// 	const musicFormats = ['Cassette', 'Compact Disc', 'Digital'];

// 	for (const genre of genres) {
// 		//await Genre.create({ title: genre });
// 	}

// 	for (const vFormat of videoFormats) {
// 		await VideoFormat.create({ title: vFormat });
// 	}

// 	for (const mFormat of musicFormats) {
// 		await MusicFormat.create({ title: mFormat });
// 	}

// 	// const mf = await MusicFormat.findOne({ title: 'Compact Disc' });
// 	// console.log(mf);
// 	const musicItems = [
// 		{
// 			artist: 'Blood Red Shoes',
// 			title: 'Get Tragic',
// 			desc: '',
// 			year: '2019',
// 			genre: '',
// 			musicFormat: await MusicFormat.findOne({ title: 'Compact Disc' }),
// 			IsAlbum: true,
// 			IsSingleTrack: false
// 		},
// 		{
// 			artist: 'Chris Cornell',
// 			title: 'Chris Cornell',
// 			desc: 'Deluxe Album',
// 			year: '2018',
// 			genre: '',
// 			musicFormat: await MusicFormat.findOne({ title: 'Compact Disc' }),
// 			IsAlbum: true,
// 			IsSingleTrack: false
// 		}
// 	];

// 	for (const musicItem of musicItems) {
// 		await Music.create(musicItem);
// 	}

// 	console.log('Done Creating Data');
// 	process.exit();
// }

// async function _oldDeleteData() {
// 	//await Genre.deleteMany();
// 	await VideoFormat.deleteMany();
// 	await MusicFormat.deleteMany();
// 	await Music.deleteMany();

// 	console.log('Done Deleting Data');
// 	process.exit();
// }
