const ImageKit = require("@imagekit/nodejs");

let ImageKitClient;

function getImageKitClient() {
    if (!process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_PRIVATE_KEY.startsWith('private_')) {
        throw new Error('IMAGEKIT_PRIVATE_KEY is missing or invalid. Set the real private key from ImageKit dashboard.');
    }

    if (!ImageKitClient) {
        ImageKitClient = new ImageKit({ privateKey: process.env.IMAGEKIT_PRIVATE_KEY });
    }

    return ImageKitClient;
}

async function uploadfile(file){
    const result = await getImageKitClient().files.upload({
        file,
        fileName: 'music_' + Date.now(),
        folder: 'Soptify-Backend/music',
    })

    return result;
}


module.exports ={
    uploadfile,
}