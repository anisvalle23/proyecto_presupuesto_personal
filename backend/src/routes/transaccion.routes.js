const express = require('express');
const router = express.Router();
const controller = require('../controllers/transaccion.controller');

router.get('/', controller.listarTransacciones);
router.get('/:id', controller.obtenerTransaccion);
router.post('/', controller.crearTransaccion);
router.put('/:id', controller.actualizarTransaccion);
router.delete('/:id', controller.eliminarTransaccion);

module.exports = router;
