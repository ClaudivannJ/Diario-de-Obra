const express = require('express');
const multer = require('multer');
const obraController = require('../controllers/obraController');

const router = express.Router();
const upload = multer({ dest: '../upload/' });

router.get('/api/obras', obraController.getObras);
router.post('/api/register/obra', upload.single('file-img'), obraController.createObra);

module.exports = router;
