const router = require('express').Router();
const genreController = require('./controllers/genreController');

router.get('/', (req, res) => {
	res.send({ message: 'hello!' });
});

router.get('/genres', genreController.list);

module.exports = router;
