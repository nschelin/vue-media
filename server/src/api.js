const router = require('express').Router();
const genreController = require('./controllers/genreController');

router.get('/', (req, res) => {
	res.send({ message: 'hello!' });
});

router.get('/genres', genreController.list);
router.put('/genre/:id', genreController.update);
router.post('/genre', genreController.add);
router.delete('/genre/:id', genreController.delete);

module.exports = router;
