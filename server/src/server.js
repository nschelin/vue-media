'use strict';

require('dotenv').config();
const express = require('express');
const http = require('http');
const chalk = require('chalk');
//const fs = require('fs');
//const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
//const cors = require('cors');
const mongoose = require('mongoose');
//mongoose.Promise = Promise;

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cors());

const dbOptions = {
	useNewUrlParser: true
};

mongoose.connect(process.env.DATABASE, dbOptions, err => {
	if (err) {
		console.log(
			chalk.bgRed.yellow('Unable to Connect to Db - is it running???')
		);
		throw err;
	}
	console.log(chalk.yellow('Connected to Db'));
});

//require('./models/supportModels');
require('./models');

const api = require('./api');
app.use('/api', api);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

process.once('SIGHUP', () => {
	console.log(chalk.red('Shutting down...'));
	server.close();
	mongoose.disconnect();
	process.kill(process.pid, 'SIGHUP');
});

server.listen(PORT, () => {
	console.log(chalk.cyan(`Server listening on ${PORT}...`));
});
