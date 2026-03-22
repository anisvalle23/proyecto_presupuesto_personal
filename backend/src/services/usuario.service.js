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
      if (db) {
        db.detach();
      }
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

      db.query(sql, [Number(id)], (error, result) => {
        db.detach();

        if (error) {
          reject(error);
          return;
        }

        resolve(result[0] || null);
      });
    } catch (error) {
      if (db) {
        db.detach();
      }
      reject(error);
    }
  });
}

function obtenerUsuarioPorCorreo(correo) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = 'SELECT FIRST 1 * FROM USUARIO WHERE CORREO_ELECTRONICO = ?';

      db.query(sql, [correo], (error, result) => {
        db.detach();

        if (error) {
          reject(error);
          return;
        }

        resolve(result[0] || null);
      });
    } catch (error) {
      if (db) {
        db.detach();
      }
      reject(error);
    }
  });
}

function crearUsuario(datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sqlInsert = `
        INSERT INTO USUARIO (
          PRIMER_NOMBRE,
          SEGUNDO_NOMBRE,
          PRIMER_APELLIDO,
          SEGUNDO_APELLIDO,
          CORREO_ELECTRONICO,
          CLAVE,
          SALARIO_MENSUAL,
          ESTADO_ACTIVO,
          CREADO_POR,
          MODIFICADO_POR,
          CREADO_EN,
          MODIFICADO_EN
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, TRUE, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `;

      const paramsInsert = [
        datos.primer_nombre,
        datos.segundo_nombre,
        datos.primer_apellido,
        datos.segundo_apellido,
        datos.correo_electronico,
        datos.clave,
        Number(datos.salario_mensual),
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
          FROM USUARIO
          WHERE CORREO_ELECTRONICO = ?
          ORDER BY ID_USUARIO DESC
        `;

        db.query(sqlBuscar, [datos.correo_electronico], (errorBuscar, resultBuscar) => {
          db.detach();

          if (errorBuscar) {
            reject(errorBuscar);
            return;
          }

          resolve(resultBuscar[0] || null);
        });
      });
    } catch (error) {
      if (db) {
        db.detach();
      }
      reject(error);
    }
  });
}

function actualizarUsuario(id, datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sqlUpdate = `
        UPDATE USUARIO
        SET
          PRIMER_NOMBRE = ?,
          SEGUNDO_NOMBRE = ?,
          PRIMER_APELLIDO = ?,
          SEGUNDO_APELLIDO = ?,
          CORREO_ELECTRONICO = ?,
          SALARIO_MENSUAL = ?,
          MODIFICADO_POR = ?,
          MODIFICADO_EN = CURRENT_TIMESTAMP
        WHERE ID_USUARIO = ?
      `;

      const paramsUpdate = [
        datos.primer_nombre,
        datos.segundo_nombre,
        datos.primer_apellido,
        datos.segundo_apellido,
        datos.correo_electronico,
        Number(datos.salario_mensual),
        Number(datos.modificado_por),
        Number(id)
      ];

      db.execute(sqlUpdate, paramsUpdate, (errorUpdate) => {
        if (errorUpdate) {
          db.detach();
          reject(errorUpdate);
          return;
        }

        const sqlBuscar = 'SELECT * FROM USUARIO WHERE ID_USUARIO = ?';

        db.query(sqlBuscar, [Number(id)], (errorBuscar, resultBuscar) => {
          db.detach();

          if (errorBuscar) {
            reject(errorBuscar);
            return;
          }

          resolve(resultBuscar[0] || null);
        });
      });
    } catch (error) {
      if (db) {
        db.detach();
      }
      reject(error);
    }
  });
}

function desactivarUsuario(id, modificadoPor) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sqlUpdate = `
        UPDATE USUARIO
        SET
          ESTADO_ACTIVO = FALSE,
          MODIFICADO_POR = ?,
          MODIFICADO_EN = CURRENT_TIMESTAMP
        WHERE ID_USUARIO = ?
      `;

      const paramsUpdate = [
        Number(modificadoPor),
        Number(id)
      ];

      db.execute(sqlUpdate, paramsUpdate, (errorUpdate) => {
        if (errorUpdate) {
          db.detach();
          reject(errorUpdate);
          return;
        }

        const sqlBuscar = 'SELECT * FROM USUARIO WHERE ID_USUARIO = ?';

        db.query(sqlBuscar, [Number(id)], (errorBuscar, resultBuscar) => {
          db.detach();

          if (errorBuscar) {
            reject(errorBuscar);
            return;
          }

          resolve(resultBuscar[0] || null);
        });
      });
    } catch (error) {
      if (db) {
        db.detach();
      }
      reject(error);
    }
  });
}

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  obtenerUsuarioPorCorreo,
  crearUsuario,
  actualizarUsuario,
  desactivarUsuario
};