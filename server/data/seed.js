require('dotenv').config({ path: __dirname + '/../.env' });
const chalk = require('chalk');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
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
const { Role } = require('../src/models/role');
const { Person } = require('../src/models/person');
const { Artist } = require('../src/models/artist');
const { Album } = require('../src/models/album');

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

function getSeedData() {
	const mediaTypes = ['Movie', 'Music', 'Video Game', 'Book'];
	const genres = [
		{ title: 'Science Fiction', types: ['Movie', 'Video Game', 'Book'] },
		{ title: 'Rock', types: ['Music'] },
		{ title: 'Alternative', types: ['Music'] },
		{ title: 'Action', types: ['Movie', 'Video Game'] },
		{ title: 'Thriller', types: ['Movie', 'Video Game', 'Book'] }
	];

	const media = [
		{
			title: 'Compact Disc (CD)',
			types: ['Movie', 'Video Game', 'Book', 'Music']
		},
		{ title: 'VHS', types: ['Movie'] },
		{ title: 'DVD', types: ['Movie', 'Video Game'] },
		{ title: 'Bluray', types: ['Movie', 'Video Game'] },
		{ title: 'Book', types: ['Book'] },
		{ title: 'Magazine', types: ['Book'] },
		{ title: 'Cartridge', types: ['Video Game'] }
	];

	const roles = [
		{ title: 'Director', types: ['Movie', 'Video Game'] },
		{ title: 'Author', types: ['Book'] },
		{ title: 'Actor', types: ['Movie', 'Video Game'] },
		{ title: 'Voice Actor (VO)', types: ['Movie', 'Video Game'] },
		{ title: 'Guitar', types: ['Music'] },
		{ title: 'Drummer', types: ['Music'] }
	];

	const people = [
		{ lastName: 'Spielberg', firstName: 'Steven', roles: ['Director'] },
		{ lastName: 'Cameron', firstName: 'James', roles: ['Director'] },
		{ lastName: 'Hideo', firstName: 'Kojima', roles: ['Director'] },
		{
			lastName: 'North',
			firstName: 'Nolan',
			roles: ['Voice Actor (VO)', 'Actor']
		},
		{ lastName: 'King', firstName: 'Stephen', roles: ['Author', 'Actor'] },
		{ lastName: 'Iha', firstName: 'James', roles: ['Guitar'] }
	];

	const artists = [
		{
			title: 'Blood Red Shoes',
			yearsActive: [
				2004,
				2005,
				2006,
				2007,
				2008,
				2009,
				2010,
				2011,
				2012,
				2013,
				2014,
				2015,
				2016,
				2017,
				2018,
				2019
			]
		},
		{
			title: 'blink-182',
			yearsActive: [
				1992,
				1993,
				1994,
				1995,
				1996,
				1997,
				1998,
				1999,
				2000,
				2001,
				2002,
				2003,
				2004,
				2005,
				2009,
				2010,
				2011,
				2012,
				2013,
				2014,
				2015,
				2016,
				2017,
				2018,
				2019
			]
		}
	];

	const albums = [
		{
			title: 'Get Tragic',
			year: 2019,
			artist: 'Blood Red Shoes'
		},
		{
			title: 'Enema of the State',
			year: 1999,
			artist: 'blink-182'
		},
		{
			title: 'California',
			year: 2016,
			artist: 'blink-182'
		}
	];

	return [mediaTypes, genres, media, roles, people, artists, albums];
}

async function createData() {
	const [
		mediaTypes,
		genres,
		media,
		roles,
		people,
		artists,
		albums
	] = getSeedData();

	log('* Creating Media Types', messageColor);
	for (let mt of mediaTypes) {
		await MediaType.create({ title: mt });
	}

	log('* Creating Genres', messageColor);
	for (let g of genres) {
		await Genre.create({
			title: g.title,
			mediaTypes: await getModelTypes(g.types, 'MediaType')
		});
	}

	log('* Creating Media', messageColor);
	for (let m of media) {
		await Media.create({
			title: m.title,
			mediaTypes: await getModelTypes(m.types, 'MediaType')
		});
	}

	log('* Creating Role', messageColor);
	for (let r of roles) {
		await Role.create({
			title: r.title,
			mediaTypes: await getModelTypes(r.types, 'MediaType')
		});
	}

	log('* Creating People', messageColor);
	for (let p of people) {
		await Person.create({
			lastName: p.lastName,
			firstName: p.firstName,
			roles: await getModelTypes(p.roles, 'Role')
		});
	}

	log('* Creating Artist', messageColor);
	for (let a of artists) {
		await Artist.create({
			title: a.title,
			yearsActive: a.yearsActive
		});
	}

	log('* Creating Albums', messageColor);
	for (let a of albums) {
		await Album.create({
			title: a.title,
			year: a.year
		});
	}

	log('* Mapping Album/Artist', messageColor);
	for (let a of artists) {
		const artistAlbums = albums.filter(album => album.artist === a.title);
		const insertAlbums = [];

		for (let aa of artistAlbums) {
			const album = await Album.findOne({ title: aa.title, year: aa.year });
			if (album) {
				insertAlbums.push(album);

				const artist = await Artist.findOne({ title: a.title });
				if (artist) {
					await Album.findOneAndUpdate({ title: aa.title }, { artist });
				}
			}
		}

		await Artist.findOneAndUpdate(
			{ title: a.title },
			{ discography: { albums: insertAlbums } }
		);
	}

	// Testin
	// const b182 = await Artist.findOne({ title: 'blink-182' })
	// 	.populate({ path: 'discography.albums' })
	// 	.exec();
	// console.log(b182.title);
	// b182.discography.albums.forEach(album =>
	// 	console.log(`${album.title}, ${album.year}`)
	// );

	log('--- Done Creating Data ---', completeColor);
	process.exit();
}

async function getModelTypes(types, typeName) {
	const items = [];
	let model;

	switch (typeName) {
	case 'MediaType':
		model = MediaType;
		break;
	case 'Role':
		model = Role;
		break;
	}
	if (!model) throw Error('model');

	for (let title of types) {
		items.push(await model.findOne({ title }));
	}
	return items;
}

async function deleteData() {
	log('* Deleting Genres', messageColor);
	await Genre.deleteMany();

	log('* Deleting Media', messageColor);
	await Media.deleteMany();

	log('* Deleting Media Types', messageColor);
	await MediaType.deleteMany();

	log('* Deleting Roles', messageColor);
	await Role.deleteMany();

	log('* Deleting People', messageColor);
	await Person.deleteMany();

	log('* Deleting Artist', messageColor);
	await Artist.deleteMany();

	log('* Deleting Album', messageColor);
	await Album.deleteMany();

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
