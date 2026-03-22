const { conectarDB } = require('../config/db');

function obtenerCategorias() {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'SELECT * FROM CATEGORIA';

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

function obtenerCategoriaPorId(id) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'SELECT * FROM CATEGORIA WHERE ID_CATEGORIA = ?';

      db.query(sql, [Number(id)], (error, result) => {
        db.detach();

        if (error) {
          reject(error);
          return;
        }

        resolve(result[0] || null);
      });
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

function crearCategoria(datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sqlInsert = `
        INSERT INTO CATEGORIA (
          NOMBRE_CATEGORIA,
          DESCRIPCION_CATEGORIA,
          TIPO_CATEGORIA,
          CREADO_POR,
          MODIFICADO_POR,
          CREADO_EN,
          MODIFICADO_EN
        )
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `;

      const paramsInsert = [
        datos.nombre_categoria,
        datos.descripcion_categoria,
        datos.tipo_categoria,
        Number(datos.creado_por),
        Number(datos.modificado_por)
      ];

      db.execute(sqlInsert, paramsInsert, (errorInsert) => {
        if (errorInsert) {
          db.detach();
          reject(errorInsert);
          return;
        }

        const sqlBuscar = `
          SELECT FIRST 1 *
          FROM CATEGORIA
          WHERE NOMBRE_CATEGORIA = ?
          ORDER BY ID_CATEGORIA DESC
        `;

        db.query(sqlBuscar, [datos.nombre_categoria], (errorBuscar, resultBuscar) => {
          db.detach();

          if (errorBuscar) {
            reject(errorBuscar);
            return;
          }

          resolve(resultBuscar[0] || null);
        });
      });
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

function actualizarCategoria(id, datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sqlUpdate = `
        UPDATE CATEGORIA
        SET
          NOMBRE_CATEGORIA = ?,
          DESCRIPCION_CATEGORIA = ?,
          TIPO_CATEGORIA = ?,
          MODIFICADO_POR = ?,
          MODIFICADO_EN = CURRENT_TIMESTAMP
        WHERE ID_CATEGORIA = ?
      `;

      const paramsUpdate = [
        datos.nombre_categoria,
        datos.descripcion_categoria,
        datos.tipo_categoria,
        Number(datos.modificado_por),
        Number(id)
      ];

      db.execute(sqlUpdate, paramsUpdate, (errorUpdate) => {
        if (errorUpdate) {
          db.detach();
          reject(errorUpdate);
          return;
        }

        db.query(
          'SELECT * FROM CATEGORIA WHERE ID_CATEGORIA = ?',
          [Number(id)],
          (errorBuscar, resultBuscar) => {
            db.detach();

            if (errorBuscar) {
              reject(errorBuscar);
              return;
            }

            resolve(resultBuscar[0] || null);
          }
        );
      });
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

function eliminarCategoria(id) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sqlDelete = 'DELETE FROM CATEGORIA WHERE ID_CATEGORIA = ?';

      db.execute(sqlDelete, [Number(id)], (errorDelete) => {
        db.detach();

        if (errorDelete) {
          reject(errorDelete);
          return;
        }

        resolve(true);
      });
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
};