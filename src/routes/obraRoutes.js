const express = require('express');
const multer = require('multer');
const obraController = require('../controllers/obraController');

const router = express.Router();
const upload = multer({ dest: '../upload/' });

router.get('/api/obras', obraController.getObras);
router.get('/api/obras/:id', obraController.getObrasById);
router.post('/api/register/obra', upload.single('file-img'), obraController.createObra);
router.put('/api/edit/obra/:id', upload.single('file-img'), obraController.updateObra);
router.delete('/api/obras/:id', obraController.deleteObra);
module.exports = router;
