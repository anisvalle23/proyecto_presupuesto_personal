const service = require('../services/transaccion.service');

function transaccionNoExiste(data) {
  return !data || !data.ID_TRANSACCION;
}

async function listarTransacciones(req, res) {
  try {
    const {
      id_detalle,
      anio_transaccion,
      mes_transaccion,
      tipo_transaccion
    } = req.query;

    if (!id_detalle || !anio_transaccion || !mes_transaccion || !tipo_transaccion) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Debes enviar id_detalle, anio_transaccion, mes_transaccion y tipo_transaccion'
      });
    }

    const data = await service.obtenerTransacciones({
      id_detalle,
      anio_transaccion,
      mes_transaccion,
      tipo_transaccion
    });

    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener transacciones',
      error: error.message
    });
  }
}

async function obtenerTransaccion(req, res) {
  try {
    const { id } = req.params;
    const data = await service.obtenerTransaccionPorId(id);

    if (transaccionNoExiste(data)) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Transaccion no encontrada'
      });
    }

    res.status(200).json({
      ok: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener transaccion',
      error: error.message
    });
  }
}

async function crearTransaccion(req, res) {
  try {
    const {
      id_detalle,
      anio_transaccion,
      mes_transaccion,
      id_obligacion,
      tipo_transaccion,
      descripcion,
      monto,
      fecha_transaccion,
      metodo_pago,
      numero_factura,
      observaciones,
      creado_por
    } = req.body;

    if (
      !id_detalle ||
      !anio_transaccion ||
      !mes_transaccion ||
      !tipo_transaccion ||
      !descripcion ||
      !monto ||
      !fecha_transaccion ||
      !metodo_pago
    ) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Faltan campos obligatorios'
      });
    }

    const nueva = await service.crearTransaccion({
      id_detalle,
      anio_transaccion,
      mes_transaccion,
      id_obligacion,
      tipo_transaccion,
      descripcion,
      monto,
      fecha_transaccion,
      metodo_pago,
      numero_factura: numero_factura || '',
      observaciones: observaciones || '',
      creado_por: creado_por || 1
    });

    res.status(201).json({
      ok: true,
      mensaje: 'Transaccion creada correctamente',
      data: nueva
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear transaccion',
      error: error.message
    });
  }
}

async function actualizarTransaccion(req, res) {
  try {
    const { id } = req.params;
    const {
      id_detalle,
      anio_transaccion,
      mes_transaccion,
      id_obligacion,
      tipo_transaccion,
      descripcion,
      monto,
      fecha_transaccion,
      metodo_pago,
      numero_factura,
      observaciones,
      modificado_por
    } = req.body;

    const actual = await service.obtenerTransaccionPorId(id);

    if (transaccionNoExiste(actual)) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Transaccion no encontrada'
      });
    }

    await service.actualizarTransaccion(id, {
      id_detalle: id_detalle || actual.ID_DETALLE,
      anio_transaccion: anio_transaccion || actual.ANIO_TRANSACCION,
      mes_transaccion: mes_transaccion || actual.MES_TRANSACCION,
      id_obligacion: id_obligacion || actual.ID_OBLIGACION,
      tipo_transaccion: tipo_transaccion || actual.TIPO_TRANSACCION,
      descripcion: descripcion || actual.DESCRIPCION,
      monto: monto || actual.MONTO,
      fecha_transaccion: fecha_transaccion || actual.FECHA_TRANSACCION,
      metodo_pago: metodo_pago || actual.METODO_PAGO,
      numero_factura: numero_factura || actual.NUMERO_FACTURA || '',
      observaciones: observaciones || actual.OBSERVACIONES || '',
      modificado_por: modificado_por || 1
    });

    const actualizada = await service.obtenerTransaccionPorId(id);

    res.status(200).json({
      ok: true,
      mensaje: 'Transaccion actualizada correctamente',
      data: actualizada
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar transaccion',
      error: error.message
    });
  }
}

async function eliminarTransaccion(req, res) {
  try {
    const { id } = req.params;

    const actual = await service.obtenerTransaccionPorId(id);

    if (transaccionNoExiste(actual)) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Transaccion no encontrada'
      });
    }

    await service.eliminarTransaccion(id);

    res.status(200).json({
      ok: true,
      mensaje: 'Transaccion eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar transaccion',
      error: error.message
    });
  }
}

module.exports = {
  listarTransacciones,
  obtenerTransaccion,
  crearTransaccion,
  actualizarTransaccion,
  eliminarTransaccion
};
