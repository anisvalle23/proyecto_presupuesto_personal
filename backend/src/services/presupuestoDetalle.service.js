const { conectarDB } = require('../config/db');

function obtenerDetallesPresupuesto(idPresupuesto) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'SELECT * FROM SP_LISTAR_PRES_DET(?)';

      db.query(sql, [Number(idPresupuesto)], (error, result) => {
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

function obtenerDetallePorId(id) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'EXECUTE PROCEDURE SP_CONSULTAR_PRES_DET(?)';

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

function crearDetallePresupuesto(datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = `
        EXECUTE PROCEDURE SP_INSERTAR_PRES_DET(?, ?, ?, ?, ?)
      `;

      const params = [
        Number(datos.id_presupuesto),
        Number(datos.id_subcategoria),
        Number(datos.monto_mensual_asignado),
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

function actualizarDetallePresupuesto(id, datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = `
        EXECUTE PROCEDURE SP_ACTUALIZAR_PRES_DET(?, ?, ?, ?, ?, ?)
      `;

      const params = [
        Number(id),
        Number(datos.id_presupuesto),
        Number(datos.id_subcategoria),
        Number(datos.monto_mensual_asignado),
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

function eliminarDetallePresupuesto(id) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'EXECUTE PROCEDURE SP_ELIMINAR_PRES_DET(?)';

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
  obtenerDetallesPresupuesto,
  obtenerDetallePorId,
  crearDetallePresupuesto,
  actualizarDetallePresupuesto,
  eliminarDetallePresupuesto
};
