const musicModel = require('../model/music.model');
const jwt = require('jsonwebtoken');
const { uploadfile } = require('../services/storge.service');


async function createMusic(req, res) {
    const token = req.cookies.token || (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.slice(7)
        : undefined);
    const jwtSecret = process.env.JWT_SECRET || process.env.JWT_secret;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!jwtSecret) {
        return res.status(500).json({ message: 'JWT secret is not configured' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

        if (!['artist', 'admin'].includes(decoded.role)) {
            return res.status(403).json({ message: 'you dont have permission to create music' });
        }



        const { title } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'music file is required' });
        }

        const result = await uploadfile(file.buffer.toString('base64'))

        const music = new musicModel({
            uri: result.url,
            title,
            artist: decoded.id,
        })

        await music.save();

        res.status(201).json({
            message: 'music created successfully',
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist,
            }
        });
    } catch (err) {
        if (String(err?.message || '').includes('IMAGEKIT_PRIVATE_KEY') || String(err?.message || '').includes('Your account cannot be authenticated')) {
            return res.status(500).json({ message: 'ImageKit is not configured correctly' });
        }
        return res.status(401).json({ message: 'Unauthorized' });
    }
}


module.exports = {
    createMusic,
}