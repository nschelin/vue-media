const router = require('express').Router();
const genreController = require('./controllers/genreController');
const mediaTypeController = require('./controllers/mediaTypeController');

router.get('/', (req, res) => {
	res.send({ message: 'hello!' });
});

router.get('/genres', genreController.list);
router.get('/genre/:id', genreController.get);
router.put('/genre/:id', genreController.update);
router.post('/genre', genreController.add);
router.delete('/genre/:id', genreController.delete);

router.get('/mediatypes', mediaTypeController.list);
router.get('/mediatype/:id', mediaTypeController.get);
router.put('/mediatype/:id', mediaTypeController.update);
router.post('/mediatype', mediaTypeController.add);
router.delete('/mediatype/:id', mediaTypeController.delete);

module.exports = router;
