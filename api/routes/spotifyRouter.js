const express = require('express');
const spotifyController = require('../controllers/spotifyController');
const { validateToken } = require('../middlewares/validateToken');

const router = express.Router();

router.get('/login', spotifyController.login);
router.get('/logout', spotifyController.logout);
router.get('/callback', spotifyController.callback);
router.get('/search', validateToken, spotifyController.search);

module.exports = router;
