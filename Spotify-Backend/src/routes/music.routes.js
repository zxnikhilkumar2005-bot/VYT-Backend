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

router.get('/', authMiddleware.autheUser, musicController.getAllMusics);
router.get('/albums', authMiddleware.autheUser, musicController.getAllAlbums);

router.get('/albums/:albumId', authMiddleware.autheUser, musicController.getAlbumById);

module.exports = router;