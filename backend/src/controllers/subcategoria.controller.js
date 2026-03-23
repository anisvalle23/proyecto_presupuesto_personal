const subcategoriaService = require('../services/subcategoria.service');

async function listarSubcategoriasPorCategoria(req, res) {
  try {
    const { idCategoria } = req.params;
    const data = await subcategoriaService.obtenerSubcategoriasPorCategoria(idCategoria);

    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener subcategorias',
      error: error.message
    });
  }
}

async function obtenerSubcategoria(req, res) {
  try {
    const { id } = req.params;
    const data = await subcategoriaService.obtenerSubcategoriaPorId(id);

    if (!data) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Subcategoria no encontrada'
      });
    }

    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener subcategoria',
      error: error.message
    });
  }
}

async function crearSubcategoria(req, res) {
  try {
    const {
      id_categoria,
      nombre_subcategoria,
      descripcion_subcategoria,
      es_por_defecto,
      creado_por,
      modificado_por
    } = req.body;

    if (!id_categoria || !nombre_subcategoria) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Faltan campos obligatorios'
      });
    }

    const nueva = await subcategoriaService.crearSubcategoria({
      id_categoria,
      nombre_subcategoria,
      descripcion_subcategoria: descripcion_subcategoria || '',
      es_por_defecto: es_por_defecto || false,
      creado_por: creado_por || 1,
      modificado_por: modificado_por || 1
    });

    res.status(201).json({
      ok: true,
      mensaje: 'Subcategoria creada correctamente',
      data: nueva
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear subcategoria',
      error: error.message
    });
  }
}

async function actualizarSubcategoria(req, res) {
  try {
    const { id } = req.params;
    const {
      nombre_subcategoria,
      descripcion_subcategoria,
      modificado_por
    } = req.body;

    const actual = await subcategoriaService.obtenerSubcategoriaPorId(id);

    if (!actual) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Subcategoria no encontrada'
      });
    }

    if (!nombre_subcategoria) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Falta el nombre de la subcategoria'
      });
    }

    const actualizada = await subcategoriaService.actualizarSubcategoria(id, {
      nombre_subcategoria,
      descripcion_subcategoria: descripcion_subcategoria || '',
      modificado_por: modificado_por || 1
    });

    res.status(200).json({
      ok: true,
      mensaje: 'Subcategoria actualizada correctamente',
      data: actualizada
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar subcategoria',
      error: error.message
    });
  }
}

async function eliminarSubcategoria(req, res) {
  try {
    const { id } = req.params;

    const actual = await subcategoriaService.obtenerSubcategoriaPorId(id);

    if (!actual) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Subcategoria no encontrada'
      });
    }

    await subcategoriaService.eliminarSubcategoria(id);

    res.status(200).json({
      ok: true,
      mensaje: 'Subcategoria eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar subcategoria',
      error: error.message
    });
  }
}

module.exports = {
  listarSubcategoriasPorCategoria,
  obtenerSubcategoria,
  crearSubcategoria,
  actualizarSubcategoria,
  eliminarSubcategoria
};
