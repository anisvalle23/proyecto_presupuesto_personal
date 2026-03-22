const categoriaService = require('../services/categoria.service');

async function listarCategorias(req, res) {
  try {
    const categorias = await categoriaService.obtenerCategorias();

    res.status(200).json({
      ok: true,
      data: categorias
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener categorias',
      error: error.message
    });
  }
}

async function obtenerCategoria(req, res) {
  try {
    const { id } = req.params;

    const categoria = await categoriaService.obtenerCategoriaPorId(id);

    if (!categoria) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Categoria no encontrada'
      });
    }

    res.status(200).json({
      ok: true,
      data: categoria
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener categoria',
      error: error.message
    });
  }
}

async function crearCategoria(req, res) {
  try {
    const {
      nombre_categoria,
      descripcion_categoria,
      tipo_categoria,
      creado_por,
      modificado_por
    } = req.body;

    if (!nombre_categoria || !descripcion_categoria || !tipo_categoria) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Faltan campos obligatorios'
      });
    }

    const nuevaCategoria = await categoriaService.crearCategoria({
      nombre_categoria,
      descripcion_categoria,
      tipo_categoria,
      creado_por: creado_por || 1,
      modificado_por: modificado_por || 1
    });

    res.status(201).json({
      ok: true,
      mensaje: 'Categoria creada correctamente',
      data: nuevaCategoria
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear categoria',
      error: error.message
    });
  }
}

async function actualizarCategoria(req, res) {
  try {
    const { id } = req.params;
    const {
      nombre_categoria,
      descripcion_categoria,
      tipo_categoria,
      modificado_por
    } = req.body;

    const categoriaActual = await categoriaService.obtenerCategoriaPorId(id);

    if (!categoriaActual) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Categoria no encontrada'
      });
    }

    if (!nombre_categoria || !descripcion_categoria || !tipo_categoria) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Faltan campos obligatorios'
      });
    }

    const categoriaActualizada = await categoriaService.actualizarCategoria(id, {
      nombre_categoria,
      descripcion_categoria,
      tipo_categoria,
      modificado_por: modificado_por || 1
    });

    res.status(200).json({
      ok: true,
      mensaje: 'Categoria actualizada correctamente',
      data: categoriaActualizada
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar categoria',
      error: error.message
    });
  }
}

async function eliminarCategoria(req, res) {
  try {
    const { id } = req.params;

    const categoriaActual = await categoriaService.obtenerCategoriaPorId(id);

    if (!categoriaActual) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Categoria no encontrada'
      });
    }

    await categoriaService.eliminarCategoria(id);

    res.status(200).json({
      ok: true,
      mensaje: 'Categoria eliminada correctamente'
    });
  } catch (error) {
    if (error.message && error.message.includes('FK_SUBCATEGORIA_CATEGORIA')) {
      return res.status(400).json({
        ok: false,
        mensaje: 'No se puede eliminar la categoria porque tiene subcategorias asociadas'
      });
    }

    res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar categoria',
      error: error.message
    });
  }
}

module.exports = {
  listarCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
};