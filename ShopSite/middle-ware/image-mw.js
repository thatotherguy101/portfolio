const multer = require('multer');

const imageStorageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname);
    }
});

const upload = multer({storage: imageStorageConfig});

module.exports = upload;