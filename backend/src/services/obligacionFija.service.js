const { conectarDB } = require('../config/db');

function obtenerObligacionesFijas() {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'SELECT * FROM SP_LISTAR_OBLIGACIONES_FIJAS';

      db.query(sql, (error, result) => {
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

function obtenerObligacionFijaPorId(id) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'EXECUTE PROCEDURE SP_CONSULTAR_OBLIGACION_FIJA(?)';

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

function crearObligacionFija(datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const vigenteSql = datos.vigente ? 'TRUE' : 'FALSE';

      const sql = `
        EXECUTE PROCEDURE SP_INSERTAR_OBLIGACION_FIJA(
          ?, ?, ?, ?, ?, ${vigenteSql}, ?, ?, ?
        )
      `;

      const params = [
        Number(datos.id_subcategoria),
        datos.nombre_obligacion,
        datos.descripcion_obligacion,
        Number(datos.monto_fijo_mensual),
        Number(datos.dia_vencimiento),
        datos.fecha_inicio,
        datos.fecha_fin,
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

function actualizarObligacionFija(id, datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const vigenteSql = datos.vigente ? 'TRUE' : 'FALSE';

      const sql = `
        EXECUTE PROCEDURE SP_ACTUALIZAR_OBLIGACION_FIJA(
          ?, ?, ?, ?, ?, ?, ${vigenteSql}, ?, ?, ?
        )
      `;

      const params = [
        Number(id),
        Number(datos.id_subcategoria),
        datos.nombre_obligacion,
        datos.descripcion_obligacion,
        Number(datos.monto_fijo_mensual),
        Number(datos.dia_vencimiento),
        datos.fecha_inicio,
        datos.fecha_fin,
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

function eliminarObligacionFija(id, modificadoPor) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'EXECUTE PROCEDURE SP_ELIMINAR_OBLIGACION_FIJA(?, ?)';

      db.query(sql, [Number(id), Number(modificadoPor)], (error, result) => {
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
  obtenerObligacionesFijas,
  obtenerObligacionFijaPorId,
  crearObligacionFija,
  actualizarObligacionFija,
  eliminarObligacionFija
};
