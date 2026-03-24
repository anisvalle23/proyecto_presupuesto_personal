const usuarioService = require('../services/usuario.service');
const bcrypt = require('bcrypt');

async function login(req, res) {
  try {
    const { correo_electronico, clave } = req.body;
    console.log('Intentando login para:', correo_electronico);

    if (!correo_electronico || !clave) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Correo y clave son obligatorios',
      });
    }

    const usuario = await usuarioService.obtenerUsuarioPorCorreo(correo_electronico);
    console.log('Usuario encontrado:', usuario);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Usuario no encontrado',
      });
    }

    if (!usuario.ESTADO_ACTIVO) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Usuario inactivo',
      });
    }

    const isPasswordValid = await bcrypt.compare(clave, usuario.CLAVE);
    console.log('¿Contraseña válida?', isPasswordValid);
    if (!isPasswordValid) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Clave incorrecta',
      });
    }

    res.status(200).json({
      ok: true,
      mensaje: 'Login exitoso',
      data: usuario,
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error en login',
      error: error.message,
    });
  }
}

module.exports = {
  login
};
