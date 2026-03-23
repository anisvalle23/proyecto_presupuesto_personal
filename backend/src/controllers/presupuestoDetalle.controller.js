const service = require('../services/presupuestoDetalle.service');

function detalleNoExiste(data) {
  return !data || !data.ID_DETALLE;
}

async function listarDetalles(req, res) {
  try {
    const { idPresupuesto } = req.params;

    if (!idPresupuesto) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Falta el id del presupuesto'
      });
    }

    const data = await service.obtenerDetallesPresupuesto(idPresupuesto);

    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener detalles de presupuesto',
      error: error.message
    });
  }
}

async function obtenerDetalle(req, res) {
  try {
    const { id } = req.params;
    const data = await service.obtenerDetallePorId(id);

    if (detalleNoExiste(data)) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Detalle de presupuesto no encontrado'
      });
    }

    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener detalle de presupuesto',
      error: error.message
    });
  }
}

async function crearDetalle(req, res) {
  try {
    const {
      id_presupuesto,
      id_subcategoria,
      monto_mensual_asignado,
      observaciones,
      creado_por
    } = req.body;

    if (!id_presupuesto || !id_subcategoria || !monto_mensual_asignado) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Faltan campos obligatorios'
      });
    }

    const nuevo = await service.crearDetallePresupuesto({
      id_presupuesto,
      id_subcategoria,
      monto_mensual_asignado,
      observaciones: observaciones || '',
      creado_por: creado_por || 1
    });

    res.status(201).json({
      ok: true,
      mensaje: 'Detalle de presupuesto creado correctamente',
      data: nuevo
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear detalle de presupuesto',
      error: error.message
    });
  }
}

async function actualizarDetalle(req, res) {
  try {
    const { id } = req.params;
    const {
      id_presupuesto,
      id_subcategoria,
      monto_mensual_asignado,
      observaciones,
      modificado_por
    } = req.body;

    const actual = await service.obtenerDetallePorId(id);

    if (detalleNoExiste(actual)) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Detalle de presupuesto no encontrado'
      });
    }

    await service.actualizarDetallePresupuesto(id, {
      id_presupuesto: id_presupuesto || actual.ID_PRESUPUESTO,
      id_subcategoria: id_subcategoria || actual.ID_SUBCATEGORIA,
      monto_mensual_asignado: monto_mensual_asignado || actual.MONTO_MENSUAL_ASIGNADO,
      observaciones: observaciones || actual.OBSERVACIONES || '',
      modificado_por: modificado_por || 1
    });

    const actualizado = await service.obtenerDetallePorId(id);

    if (detalleNoExiste(actualizado)) {
      return res.status(200).json({
        ok: true,
        mensaje: 'Detalle de presupuesto actualizado correctamente',
        data: null
      });
    }

    res.status(200).json({
      ok: true,
      mensaje: 'Detalle de presupuesto actualizado correctamente',
      data: actualizado
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar detalle de presupuesto',
      error: error.message
    });
  }
}

async function eliminarDetalle(req, res) {
  try {
    const { id } = req.params;

    const actual = await service.obtenerDetallePorId(id);

    if (detalleNoExiste(actual)) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Detalle de presupuesto no encontrado'
      });
    }

    await service.eliminarDetallePresupuesto(id);

    res.status(200).json({
      ok: true,
      mensaje: 'Detalle de presupuesto eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar detalle de presupuesto',
      error: error.message
    });
  }
}

module.exports = {
  listarDetalles,
  obtenerDetalle,
  crearDetalle,
  actualizarDetalle,
  eliminarDetalle
};
