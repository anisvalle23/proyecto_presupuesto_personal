const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuario.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    mensaje: 'Backend del sistema de presupuesto personal funcionando'
  });
});

app.use('/api/usuarios', usuarioRoutes);

module.exports = app;