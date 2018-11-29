'use strict';

require('dotenv').config();
const express = require('express');
const http = require('http');
//const fs = require('fs');
//const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
//const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cors());

const dbOptions = {
	useNewUrlParser: true
};

mongoose.connect(
	process.env.DATABASE,
	dbOptions,
	err => {
		if (err) throw err;
		console.log('connected to Db');
	}
);

require('./models/supportModels');

const api = require('./api');
app.use('/api', api);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => {
	console.log(`listening on ${PORT}...`);
});
