const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuario.routes');
const authRoutes = require('./routes/auth.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const subcategoriaRoutes = require('./routes/subcategoria.routes');
const transaccionRoutes = require('./routes/transaccion.routes');
const presupuestoRoutes = require('./routes/presupuesto.routes');
const presupuestoDetalleRoutes = require('./routes/presupuestoDetalle.routes');
const obligacionFijaRoutes = require('./routes/obligacionFija.routes');

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
app.use('/api/subcategorias', subcategoriaRoutes);
app.use('/api/transacciones', transaccionRoutes);
app.use('/api/presupuestos', presupuestoRoutes);
app.use('/api/presupuesto-detalle', presupuestoDetalleRoutes);
app.use('/api/obligaciones-fijas', obligacionFijaRoutes);

module.exports = app;
