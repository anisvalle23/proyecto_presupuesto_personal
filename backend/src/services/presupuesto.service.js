const { conectarDB } = require('../config/db');

function obtenerPresupuestos() {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      db.query('SELECT * FROM SP_LISTAR_PRESUPUESTOS', (error, result) => {
        db.detach();
        if (error) return reject(error);
        resolve(result);
      });
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

function obtenerPresupuestoPorId(id) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      db.query(
        'EXECUTE PROCEDURE SP_CONSULTAR_PRESUPUESTO(?)',
        [Number(id)],
        (error, result) => {
          db.detach();
          if (error) return reject(error);
          resolve(result || null);
        }
      );
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

function crearPresupuesto(datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = `
        EXECUTE PROCEDURE SP_INSERTAR_PRESUPUESTO(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        Number(datos.id_usuario),
        datos.nombre_presupuesto,
        Number(datos.anio_inicio),
        Number(datos.mes_inicio),
        Number(datos.anio_fin),
        Number(datos.mes_fin),
        Number(datos.total_ingresos_planificados),
        Number(datos.total_gastos_planificados),
        Number(datos.total_ahorro_planificado),
        datos.estado_presupuesto,
        Number(datos.creado_por)
      ];

      db.query(sql, params, (error, result) => {
        db.detach();
        if (error) return reject(error);
        resolve(result || null);
      });
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

function actualizarPresupuesto(id, datos) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = `
        EXECUTE PROCEDURE SP_ACTUALIZAR_PRESUPUESTO(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        Number(id),
        Number(datos.id_usuario),
        datos.nombre_presupuesto,
        Number(datos.anio_inicio),
        Number(datos.mes_inicio),
        Number(datos.anio_fin),
        Number(datos.mes_fin),
        Number(datos.total_ingresos_planificados),
        Number(datos.total_gastos_planificados),
        Number(datos.total_ahorro_planificado),
        datos.estado_presupuesto,
        Number(datos.modificado_por)
      ];

      db.query(sql, params, (error, result) => {
        db.detach();
        if (error) return reject(error);
        resolve(result || null);
      });
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

function eliminarPresupuesto(id, modificadoPor) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      db.query(
        'EXECUTE PROCEDURE SP_ELIMINAR_PRESUPUESTO(?, ?)',
        [Number(id), Number(modificadoPor)],
        (error, result) => {
          db.detach();
          if (error) return reject(error);
          resolve(result || { ok: true });
        }
      );
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

function obtenerPresupuestoCompleto(id) {
  return new Promise(async (resolve, reject) => {
    let db;

    try {
      db = await conectarDB();

      const sql = `
        SELECT
          p.ID_PRESUPUESTO,
          p.NOMBRE_PRESUPUESTO,
          p.ANIO_INICIO,
          p.MES_INICIO,
          p.ANIO_FIN,
          p.MES_FIN,
          p.TOTAL_INGRESOS_PLANIFICADOS,
          p.TOTAL_GASTOS_PLANIFICADOS,
          p.TOTAL_AHORRO_PLANIFICADO,
          p.ESTADO_PRESUPUESTO,
          d.ID_DETALLE,
          d.MONTO_MENSUAL_ASIGNADO,
          d.OBSERVACIONES,
          s.ID_SUBCATEGORIA,
          s.NOMBRE_SUBCATEGORIA,
          c.NOMBRE_CATEGORIA
        FROM PRESUPUESTO p
        LEFT JOIN PRESUPUESTO_DETALLE d ON p.ID_PRESUPUESTO = d.ID_PRESUPUESTO
        LEFT JOIN SUBCATEGORIA s ON d.ID_SUBCATEGORIA = s.ID_SUBCATEGORIA
        LEFT JOIN CATEGORIA c ON s.ID_CATEGORIA = c.ID_CATEGORIA
        WHERE p.ID_PRESUPUESTO = ?
      `;

      db.query(sql, [Number(id)], (error, result) => {
        db.detach();
        if (error) return reject(error);

        if (!result || result.length === 0) {
          return resolve(null);
        }

        const presupuesto = {
          id: result[0].ID_PRESUPUESTO,
          nombre: result[0].NOMBRE_PRESUPUESTO,
          anio_inicio: result[0].ANIO_INICIO,
          mes_inicio: result[0].MES_INICIO,
          anio_fin: result[0].ANIO_FIN,
          mes_fin: result[0].MES_FIN,
          total_ingresos_planificados: result[0].TOTAL_INGRESOS_PLANIFICADOS,
          total_gastos_planificados: result[0].TOTAL_GASTOS_PLANIFICADOS,
          total_ahorro_planificado: result[0].TOTAL_AHORRO_PLANIFICADO,
          estado_presupuesto: result[0].ESTADO_PRESUPUESTO,
          detalles: []
        };

        result.forEach(row => {
          if (row.ID_DETALLE) {
            presupuesto.detalles.push({
              id_detalle: row.ID_DETALLE,
              id_subcategoria: row.ID_SUBCATEGORIA,
              subcategoria: row.NOMBRE_SUBCATEGORIA,
              categoria: row.NOMBRE_CATEGORIA,
              monto_mensual_asignado: row.MONTO_MENSUAL_ASIGNADO,
              observaciones: row.OBSERVACIONES
            });
          }
        });

        resolve(presupuesto);
      });
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

function obtenerPresupuestosPorUsuario(id_usuario) {
  return new Promise(async (resolve, reject) => {
    let db;
    try {
      db = await conectarDB();
      const sql = 'SELECT * FROM PRESUPUESTO WHERE ID_USUARIO = ?';
      db.query(sql, [Number(id_usuario)], (error, result) => {
        db.detach();
        if (error) return reject(error);
        resolve(result);
      });
    } catch (error) {
      if (db) db.detach();
      reject(error);
    }
  });
}

module.exports = {
  obtenerPresupuestos,
  obtenerPresupuestoPorId,
  crearPresupuesto,
  actualizarPresupuesto,
  eliminarPresupuesto,
  obtenerPresupuestoCompleto,
  obtenerPresupuestosPorUsuario
};
