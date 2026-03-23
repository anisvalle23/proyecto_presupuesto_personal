const { conectarDB } = require('../config/db');

function obtenerSubcategoriasPorCategoria(idCategoria) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'SELECT * FROM SP_LISTAR_SUBC_POR_CATEGORIA(?)';

      db.query(sql, [Number(idCategoria)], (error, result) => {
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

function obtenerSubcategoriaPorId(id) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'EXECUTE PROCEDURE SP_CONSULTAR_SUBCATEGORIA(?)';

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

function crearSubcategoria(datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'EXECUTE PROCEDURE SP_INSERTAR_SUBCATEGORIA(?, ?, ?, ?, ?, ?)';

      const params = [
        Number(datos.id_categoria),
        datos.nombre_subcategoria,
        datos.descripcion_subcategoria,
        Boolean(datos.es_por_defecto),
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

function actualizarSubcategoria(id, datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'EXECUTE PROCEDURE SP_ACTUALIZAR_SUBCATEGORIA(?, ?, ?, ?)';

      const params = [
        Number(id),
        datos.nombre_subcategoria,
        datos.descripcion_subcategoria,
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

function eliminarSubcategoria(id) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'EXECUTE PROCEDURE SP_ELIMINAR_SUBCATEGORIA(?)';

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
  obtenerSubcategoriasPorCategoria,
  obtenerSubcategoriaPorId,
  crearSubcategoria,
  actualizarSubcategoria,
  eliminarSubcategoria
};
