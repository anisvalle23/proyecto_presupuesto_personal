const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuario.routes');
const authRoutes = require('./routes/auth.routes');
const categoriaRoutes = require('./routes/categoria.routes');

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
app.use('/api', authRoutes);
app.use('/api/categorias', categoriaRoutes);

module.exports = app;
