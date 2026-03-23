const { conectarDB } = require('../config/db');

function obtenerTransacciones(filtros) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'SELECT * FROM SP_LISTAR_TRANSACCIONES(?, ?, ?, ?)';

      const params = [
        Number(filtros.id_detalle),
        Number(filtros.anio_transaccion),
        Number(filtros.mes_transaccion),
        filtros.tipo_transaccion
      ];

      db.query(sql, params, (error, result) => {
        db.detach();

        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

function obtenerTransaccionPorId(id) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'EXECUTE PROCEDURE SP_CONSULTAR_TRANSACCION(?)';

      db.query(sql, [Number(id)], (error, result) => {
        db.detach();

        if (error) {
          reject(error);
          return;
        }

        resolve(result || null);
      });
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

function crearTransaccion(datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = `
        EXECUTE PROCEDURE SP_INSERTAR_TRANSACCION(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        Number(datos.id_detalle),
        Number(datos.anio_transaccion),
        Number(datos.mes_transaccion),
        datos.id_obligacion ? Number(datos.id_obligacion) : null,
        datos.tipo_transaccion,
        datos.descripcion,
        Number(datos.monto),
        datos.fecha_transaccion,
        datos.metodo_pago,
        datos.numero_factura,
        datos.observaciones,
        Number(datos.creado_por)
      ];

      db.query(sql, params, (error, result) => {
        db.detach();

        if (error) {
          reject(error);
          return;
        }

        resolve(result || null);
      });
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

function actualizarTransaccion(id, datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = `
        EXECUTE PROCEDURE SP_ACTUALIZAR_TRANSACCION(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        Number(id),
        Number(datos.id_detalle),
        Number(datos.anio_transaccion),
        Number(datos.mes_transaccion),
        datos.id_obligacion ? Number(datos.id_obligacion) : null,
        datos.tipo_transaccion,
        datos.descripcion,
        Number(datos.monto),
        datos.fecha_transaccion,
        datos.metodo_pago,
        datos.numero_factura,
        datos.observaciones,
        Number(datos.modificado_por)
      ];

      db.query(sql, params, (error, result) => {
        db.detach();

        if (error) {
          reject(error);
          return;
        }

        resolve(result || null);
      });
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

function eliminarTransaccion(id) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'EXECUTE PROCEDURE SP_ELIMINAR_TRANSACCION(?)';

      db.query(sql, [Number(id)], (error, result) => {
        db.detach();

        if (error) {
          reject(error);
          return;
        }

        resolve(result || { ok: true });
      });
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

module.exports = {
  obtenerTransacciones,
  obtenerTransaccionPorId,
  crearTransaccion,
  actualizarTransaccion,
  eliminarTransaccion
};
