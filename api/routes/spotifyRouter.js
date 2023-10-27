const express = require('express');
const spotifyController = require('../controllers/spotifyController');

const router = express.Router();

router.get('/login', spotifyController.login);
router.get('/status', spotifyController.status);
router.get('/search', spotifyController.search);

module.exports = router;
