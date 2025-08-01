const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'tmp/'), // match the folder you already have
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

module.exports = multer({ storage });
