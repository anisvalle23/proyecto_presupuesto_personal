const express = require('express');
const router = express.Router();
const controller = require('../controllers/presupuesto.controller');

router.get('/', controller.listarPresupuestos);
router.get('/:id/completo', controller.obtenerCompleto);
router.get('/:id', controller.obtenerPresupuesto);
router.post('/', controller.crearPresupuesto);
router.put('/:id', controller.actualizarPresupuesto);
router.delete('/:id', controller.eliminarPresupuesto);

module.exports = router;
