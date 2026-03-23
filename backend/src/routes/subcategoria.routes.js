const express = require('express');
const router = express.Router();
const controller = require('../controllers/subcategoria.controller');

router.get('/categoria/:idCategoria', controller.listarSubcategoriasPorCategoria);
router.get('/:id', controller.obtenerSubcategoria);
router.post('/', controller.crearSubcategoria);
router.put('/:id', controller.actualizarSubcategoria);
router.delete('/:id', controller.eliminarSubcategoria);

module.exports = router;
