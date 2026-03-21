const { conectarDB } = require('../config/db');

function obtenerUsuarios() {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'SELECT * FROM USUARIO';

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

function obtenerUsuarioPorId(id) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'SELECT * FROM USUARIO WHERE ID_USUARIO = ?';

      db.query(sql, [id], (error, result) => {
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

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId
};