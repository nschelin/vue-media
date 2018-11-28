require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const { Genre, VideoFormat } = require('../src/models/support');

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
	for (const genre of genres) {
		await Genre.create({ title: genre });
	}
	console.log('Done Creating Data');
	process.exit();
}

async function deleteData() {
	await Genre.deleteMany();

	console.log('Done Deleting Data');
	process.exit();
}
// async function deleteData() {
// 	await Genre.remove();
// 	// console.log('deleteData');
// 	// Genre.deleteMany({}, err => {
// 	// 	if (err) {
// 	// 		console.log(err);
// 	// 	}
// 	// 	console.log('deleted');
// 	// });
// }

// deleteData();
