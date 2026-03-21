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

module.exports = {
  listarUsuarios,
  obtenerUsuario
};