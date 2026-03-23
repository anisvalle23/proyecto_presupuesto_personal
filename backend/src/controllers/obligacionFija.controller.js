const service = require('../services/obligacionFija.service');

function obligacionNoExiste(data) {
  return !data || !data.ID_OBLIGACION;
}

async function listarObligacionesFijas(req, res) {
  try {
    const data = await service.obtenerObligacionesFijas();

    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener obligaciones fijas',
      error: error.message
    });
  }
}

async function obtenerObligacionFija(req, res) {
  try {
    const { id } = req.params;
    const data = await service.obtenerObligacionFijaPorId(id);

    if (obligacionNoExiste(data)) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Obligacion fija no encontrada'
      });
    }

    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener obligacion fija',
      error: error.message
    });
  }
}

async function crearObligacionFija(req, res) {
  try {
    const {
      id_subcategoria,
      nombre_obligacion,
      descripcion_obligacion,
      monto_fijo_mensual,
      dia_vencimiento,
      vigente,
      fecha_inicio,
      fecha_fin,
      creado_por
    } = req.body;

    if (
      !id_subcategoria ||
      !nombre_obligacion ||
      !monto_fijo_mensual ||
      !dia_vencimiento ||
      !fecha_inicio
    ) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Faltan campos obligatorios'
      });
    }

    const nueva = await service.crearObligacionFija({
      id_subcategoria,
      nombre_obligacion,
      descripcion_obligacion: descripcion_obligacion || '',
      monto_fijo_mensual,
      dia_vencimiento,
      vigente: typeof vigente === 'boolean' ? vigente : true,
      fecha_inicio,
      fecha_fin: fecha_fin || null,
      creado_por: creado_por || 1
    });

    res.status(201).json({
      ok: true,
      mensaje: 'Obligacion fija creada correctamente',
      data: nueva
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear obligacion fija',
      error: error.message
    });
  }
}

async function actualizarObligacionFija(req, res) {
  try {
    const { id } = req.params;
    const {
      id_subcategoria,
      nombre_obligacion,
      descripcion_obligacion,
      monto_fijo_mensual,
      dia_vencimiento,
      vigente,
      fecha_inicio,
      fecha_fin,
      modificado_por
    } = req.body;

    const actual = await service.obtenerObligacionFijaPorId(id);

    if (obligacionNoExiste(actual)) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Obligacion fija no encontrada'
      });
    }

    await service.actualizarObligacionFija(id, {
      id_subcategoria: id_subcategoria || actual.ID_SUBCATEGORIA,
      nombre_obligacion: nombre_obligacion || actual.NOMBRE_OBLIGACION,
      descripcion_obligacion: descripcion_obligacion || actual.DESCRIPCION_OBLIGACION || '',
      monto_fijo_mensual: monto_fijo_mensual || actual.MONTO_FIJO_MENSUAL,
      dia_vencimiento: dia_vencimiento || actual.DIA_VENCIMIENTO,
      vigente: typeof vigente === 'boolean' ? vigente : actual.VIGENTE,
      fecha_inicio: fecha_inicio || actual.FECHA_INICIO,
      fecha_fin: typeof fecha_fin !== 'undefined' ? fecha_fin : actual.FECHA_FIN,
      modificado_por: modificado_por || 1
    });

    const actualizada = await service.obtenerObligacionFijaPorId(id);

    res.status(200).json({
      ok: true,
      mensaje: 'Obligacion fija actualizada correctamente',
      data: actualizada
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar obligacion fija',
      error: error.message
    });
  }
}

async function eliminarObligacionFija(req, res) {
  try {
    const { id } = req.params;
    const { modificado_por } = req.body;

    const actual = await service.obtenerObligacionFijaPorId(id);

    if (obligacionNoExiste(actual)) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Obligacion fija no encontrada'
      });
    }

    await service.eliminarObligacionFija(id, modificado_por || 1);

    res.status(200).json({
      ok: true,
      mensaje: 'Obligacion fija eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar obligacion fija',
      error: error.message
    });
  }
}

module.exports = {
  listarObligacionesFijas,
  obtenerObligacionFija,
  crearObligacionFija,
  actualizarObligacionFija,
  eliminarObligacionFija
};
