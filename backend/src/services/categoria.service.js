const { conectarDB } = require('../config/db');

function obtenerCategorias() {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'SELECT * FROM SP_LISTAR_CATEGORIAS';

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

      const sql = 'EXECUTE PROCEDURE SP_CONSULTAR_CATEGORIA(?)';

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

      const sql = `
        EXECUTE PROCEDURE SP_INSERTAR_CATEGORIA(?, ?, ?, ?, ?)
      `;

      const params = [
        datos.nombre_categoria,
        datos.descripcion_categoria,
        datos.tipo_categoria,
        Number(datos.creado_por),
        Number(datos.modificado_por)
      ];

      db.query(sql, params, (error, result) => {
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

function actualizarCategoria(id, datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = `
        EXECUTE PROCEDURE SP_ACTUALIZAR_CATEGORIA(?, ?, ?, ?, ?)
      `;

      const params = [
        Number(id),
        datos.nombre_categoria,
        datos.descripcion_categoria,
        Number(datos.modificado_por),
        datos.tipo_categoria
      ];

      db.query(sql, params, (error, result) => {
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

function eliminarCategoria(id) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'EXECUTE PROCEDURE SP_ELIMINAR_CATEGORIA(?)';

      db.query(sql, [Number(id)], (error) => {
        db.detach();

        if (error) {
          reject(error);
          return;
        }

        resolve({ ok: true });
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
