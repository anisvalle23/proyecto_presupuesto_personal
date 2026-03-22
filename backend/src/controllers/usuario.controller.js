const usuarioService = require('../services/usuario.service');

async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuarioService.obtenerUsuarios();

    res.status(200).json({
      ok: true,
      data: usuarios
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener usuarios',
      error: error.message
    });
  }
}

async function obtenerUsuario(req, res) {
  try {
    const { id } = req.params;

    const usuario = await usuarioService.obtenerUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      ok: true,
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al obtener usuario',
      error: error.message
    });
  }
}

async function crearUsuario(req, res) {
  try {
    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      correo_electronico,
      clave,
      salario_mensual,
      creado_por,
      modificado_por
    } = req.body;

    if (!primer_nombre || !primer_apellido || !correo_electronico || !clave) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Faltan campos obligatorios'
      });
    }

    const usuarioExistente = await usuarioService.obtenerUsuarioPorCorreo(correo_electronico);

    if (usuarioExistente) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Ya existe un usuario con ese correo'
      });
    }

    const nuevoUsuario = await usuarioService.crearUsuario({
      primer_nombre,
      segundo_nombre: segundo_nombre || null,
      primer_apellido,
      segundo_apellido: segundo_apellido || null,
      correo_electronico,
      clave,
      salario_mensual: salario_mensual || 0,
      creado_por: creado_por || 1,
      modificado_por: modificado_por || 1
    });

    res.status(201).json({
      ok: true,
      mensaje: 'Usuario creado correctamente',
      data: nuevoUsuario
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear usuario',
      error: error.message
    });
  }
}

async function actualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const {
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      correo_electronico,
      salario_mensual,
      modificado_por
    } = req.body;

    const usuarioActual = await usuarioService.obtenerUsuarioPorId(id);

    if (!usuarioActual) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    if (!primer_nombre || !primer_apellido || !correo_electronico) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Faltan campos obligatorios'
      });
    }

    const usuarioConMismoCorreo = await usuarioService.obtenerUsuarioPorCorreo(correo_electronico);

    if (usuarioConMismoCorreo && usuarioConMismoCorreo.ID_USUARIO !== Number(id)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Ya existe otro usuario con ese correo'
      });
    }

    const usuarioActualizado = await usuarioService.actualizarUsuario(id, {
      primer_nombre,
      segundo_nombre: segundo_nombre || null,
      primer_apellido,
      segundo_apellido: segundo_apellido || null,
      correo_electronico,
      salario_mensual: salario_mensual || 0,
      modificado_por: modificado_por || 1
    });

    res.status(200).json({
      ok: true,
      mensaje: 'Usuario actualizado correctamente',
      data: usuarioActualizado
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al actualizar usuario',
      error: error.message
    });
  }
}

async function eliminarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { modificado_por } = req.body;

    const usuarioActual = await usuarioService.obtenerUsuarioPorId(id);

    if (!usuarioActual) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    const usuarioDesactivado = await usuarioService.desactivarUsuario(
      id,
      modificado_por || 1
    );

    res.status(200).json({
      ok: true,
      mensaje: 'Usuario desactivado correctamente',
      data: usuarioDesactivado
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error al desactivar usuario',
      error: error.message
    });
  }
}

module.exports = {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};