const express = require('express');
const router = express.Router();
const controller = require('../controllers/presupuestoDetalle.controller');

router.get('/presupuesto/:idPresupuesto', controller.listarDetalles);
router.get('/:id', controller.obtenerDetalle);
router.post('/', controller.crearDetalle);
router.put('/:id', controller.actualizarDetalle);
router.delete('/:id', controller.eliminarDetalle);

module.exports = router;
