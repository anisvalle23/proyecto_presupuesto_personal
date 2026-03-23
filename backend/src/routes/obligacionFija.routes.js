const express = require('express');
const router = express.Router();
const controller = require('../controllers/obligacionFija.controller');

router.get('/', controller.listarObligacionesFijas);
router.get('/:id', controller.obtenerObligacionFija);
router.post('/', controller.crearObligacionFija);
router.put('/:id', controller.actualizarObligacionFija);
router.delete('/:id', controller.eliminarObligacionFija);

module.exports = router;
