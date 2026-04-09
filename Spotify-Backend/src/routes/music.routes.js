const express = require ('express');
const multer = require('multer');
const authMiddleware = require('../middlewares/auth.middewre');
const musicController = require('../controllers/music.controller');

const upload = multer({
    storage: multer.memoryStorage(),
});

const router = express.Router();

router.post('/upload', authMiddleware.autheArtist, upload.single('music'), musicController.createMusic);

router.post('/album', authMiddleware.autheArtist, musicController.createAlbum);

module.exports = router;