const presupuestoService = require('../services/presupuesto.service');

async function listarPresupuestos(req, res) {
  try {
    const data = await presupuestoService.obtenerPresupuestos();

    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener presupuestos',
      error: error.message
    });
  }
}

async function obtenerPresupuesto(req, res) {
  try {
    const { id } = req.params;
    const data = await presupuestoService.obtenerPresupuestoPorId(id);

    if (!data) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Presupuesto no encontrado'
      });
    }

    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener presupuesto',
      error: error.message
    });
  }
}

async function crearPresupuesto(req, res) {
  try {
    const {
      id_usuario,
      nombre_presupuesto,
      anio_inicio,
      mes_inicio,
      anio_fin,
      mes_fin,
      total_ingresos_planificados,
      total_gastos_planificados,
      total_ahorro_planificado,
      estado_presupuesto,
      creado_por
    } = req.body;

    if (
      !id_usuario ||
      !nombre_presupuesto ||
      !anio_inicio ||
      !mes_inicio ||
      !anio_fin ||
      !mes_fin
    ) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Faltan campos obligatorios'
      });
    }

    const nuevo = await presupuestoService.crearPresupuesto({
      id_usuario,
      nombre_presupuesto,
      anio_inicio,
      mes_inicio,
      anio_fin,
      mes_fin,
      total_ingresos_planificados: total_ingresos_planificados || 0,
      total_gastos_planificados: total_gastos_planificados || 0,
      total_ahorro_planificado: total_ahorro_planificado || 0,
      estado_presupuesto: estado_presupuesto || 'activo',
      creado_por: creado_por || 1
    });

    res.status(201).json({
      ok: true,
      mensaje: 'Presupuesto creado correctamente',
      data: nuevo
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear presupuesto',
      error: error.message
    });
  }
}

async function actualizarPresupuesto(req, res) {
  try {
    const { id } = req.params;
    const {
      id_usuario,
      nombre_presupuesto,
      anio_inicio,
      mes_inicio,
      anio_fin,
      mes_fin,
      total_ingresos_planificados,
      total_gastos_planificados,
      total_ahorro_planificado,
      estado_presupuesto,
      modificado_por
    } = req.body;

    const actual = await presupuestoService.obtenerPresupuestoPorId(id);

    if (!actual) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Presupuesto no encontrado'
      });
    }

    await presupuestoService.actualizarPresupuesto(id, {
      id_usuario,
      nombre_presupuesto,
      anio_inicio,
      mes_inicio,
      anio_fin,
      mes_fin,
      total_ingresos_planificados,
      total_gastos_planificados,
      total_ahorro_planificado,
      estado_presupuesto: estado_presupuesto || actual.ESTADO_PRESUPUESTO || 'activo',
      modificado_por: modificado_por || 1
    });

    const actualizado = await presupuestoService.obtenerPresupuestoPorId(id);

    res.status(200).json({
      ok: true,
      mensaje: 'Presupuesto actualizado correctamente',
      data: actualizado
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar presupuesto',
      error: error.message
    });
  }
}

async function eliminarPresupuesto(req, res) {
  try {
    const { id } = req.params;
    const { modificado_por } = req.body;

    const actual = await presupuestoService.obtenerPresupuestoPorId(id);

    if (!actual) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Presupuesto no encontrado'
      });
    }

    await presupuestoService.eliminarPresupuesto(id, modificado_por || 1);

    res.status(200).json({
      ok: true,
      mensaje: 'Presupuesto eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar presupuesto',
      error: error.message
    });
  }
}

async function obtenerCompleto(req, res) {
  try {
    const { id } = req.params;
    const data = await presupuestoService.obtenerPresupuestoCompleto(id);

    if (!data) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Presupuesto no encontrado'
      });
    }

    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener presupuesto completo',
      error: error.message
    });
  }
}

module.exports = {
  listarPresupuestos,
  obtenerPresupuesto,
  crearPresupuesto,
  actualizarPresupuesto,
  eliminarPresupuesto,
  obtenerCompleto
};
