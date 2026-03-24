const { conectarDB } = require('../config/db');
const bcrypt = require('bcrypt');

function obtenerUsuarios() {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'SELECT * FROM SP_LISTAR_USUARIOS';

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

      const sql = 'EXECUTE PROCEDURE SP_CONSULTAR_USUARIO(?)';

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

function obtenerUsuarioPorCorreo(correo) {
  return new Promise(async (resolve, reject) => {
    let db;
    try {
      db = await conectarDB();
      const sql = 'SELECT * FROM USUARIO WHERE CORREO_ELECTRONICO = ?';
      db.query(sql, [correo], (error, result) => {
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

async function crearUsuario(datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const hashedPassword = await bcrypt.hash(datos.clave, 10);

      const sql = `
        EXECUTE PROCEDURE SP_INSERTAR_USUARIO(?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        datos.primer_nombre,
        datos.segundo_nombre,
        datos.primer_apellido,
        datos.segundo_apellido,
        datos.correo_electronico,
        hashedPassword,
        Number(datos.salario_mensual),
        Number(datos.creado_por),
        Number(datos.modificado_por),
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

function actualizarUsuario(id, datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = `
        EXECUTE PROCEDURE SP_ACTUALIZAR_USUARIO(?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        Number(id),
        datos.primer_nombre,
        datos.segundo_nombre,
        datos.primer_apellido,
        datos.segundo_apellido,
        datos.correo_electronico,
        Number(datos.salario_mensual),
        Number(datos.modificado_por),
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

function desactivarUsuario(id, modificadoPor) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = `
        EXECUTE PROCEDURE SP_ELIMINAR_USUARIO(?, ?)
      `;

      db.query(sql, [Number(id), Number(modificadoPor)], (error) => {
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
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  obtenerUsuarioPorCorreo,
};
