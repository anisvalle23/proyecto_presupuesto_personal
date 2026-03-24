import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Grid, Card, CardContent, Typography, Avatar, IconButton, LinearProgress, Chip, Tooltip, CircularProgress } from '@mui/material';
import { Logout, Notifications, TrendingUp, TrendingDown, Savings, PieChart, BarChart, CalendarToday, CheckCircle, Warning, ErrorOutline, AccountBalanceWallet } from '@mui/icons-material';

const usuario = JSON.parse(localStorage.getItem('usuario')) || {};

function formatCurrency(num) {
  if (typeof num !== 'number') return num;
  // Mostrar como Lempira (L) en vez de $ o USD
  return `L ${Number(num).toLocaleString('es-HN', { minimumFractionDigits: 0 })}`;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [obligaciones, setObligaciones] = useState([]);
  const [progreso, setProgreso] = useState([]);
  const [metas, setMetas] = useState([]);
  const [resumen, setResumen] = useState([
    { titulo: 'Ingresos del mes', monto: 'L ...', icon: <TrendingUp sx={{ color: '#000' }} />, color: '#fff' },
    { titulo: 'Gastos del mes', monto: 'L ...', icon: <TrendingDown sx={{ color: '#000' }} />, color: '#fff' },
    { titulo: 'Ahorro del mes', monto: 'L ...', icon: <Savings sx={{ color: '#000' }} />, color: '#fff' },
    { titulo: 'Balance actual', monto: 'L ...', icon: <AccountBalanceWallet sx={{ color: '#000' }} />, color: '#fff' },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transacciones, setTransacciones] = useState([]);
  const [loadingTrans, setLoadingTrans] = useState(true);

  useEffect(() => {
    async function fetchResumenYTransacciones() {
      setLoading(true);
      setError('');
      setLoadingTrans(true);
      try {
        // Obtener presupuestos del usuario
        const resPresup = await axios.get(`http://localhost:3000/api/presupuestos`);
        const presupuestos = resPresup.data.data || [];
        // Filtrar por usuario autenticado
        const presupUsuario = presupuestos.filter(p => p.ID_USUARIO === usuario.ID_USUARIO);
        // Tomar el presupuesto más reciente (o el primero)
        const presupuesto = presupUsuario[0];
        if (!presupuesto) {
          setResumen([
            { titulo: 'Ingresos del mes', monto: 'L 0', icon: <TrendingUp sx={{ color: '#000' }} />, color: '#fff' },
            { titulo: 'Gastos del mes', monto: 'L 0', icon: <TrendingDown sx={{ color: '#000' }} />, color: '#fff' },
            { titulo: 'Ahorro del mes', monto: 'L 0', icon: <Savings sx={{ color: '#000' }} />, color: '#fff' },
            { titulo: 'Balance actual', monto: 'L 0', icon: <AccountBalanceWallet sx={{ color: '#000' }} />, color: '#fff' },
          ]);
          setTransacciones([]);
          setLoading(false);
          setLoadingTrans(false);
          return;
        }
        // Consultar presupuesto completo para obtener detalles
        const resCompleto = await axios.get(`http://localhost:3000/api/presupuestos/${presupuesto.ID_PRESUPUESTO}/completo`);
        const data = resCompleto.data.data;
        // Calcular resumen
        const ingresos = data.total_ingresos_planificados || 0;
        const gastos = data.total_gastos_planificados || 0;
        const ahorro = data.total_ahorro_planificado || 0;
        const balance = ingresos - gastos;
        setResumen([
          { titulo: 'Ingresos del mes', monto: formatCurrency(ingresos), icon: <TrendingUp sx={{ color: '#000' }} />, color: '#fff' },
          { titulo: 'Gastos del mes', monto: formatCurrency(gastos), icon: <TrendingDown sx={{ color: '#000' }} />, color: '#fff' },
          { titulo: 'Ahorro del mes', monto: formatCurrency(ahorro), icon: <Savings sx={{ color: '#000' }} />, color: '#fff' },
          { titulo: 'Balance actual', monto: formatCurrency(balance), icon: <AccountBalanceWallet sx={{ color: '#000' }} />, color: '#fff' },
        ]);

        // Obtener detalles de presupuesto para transacciones
        const detalles = data.detalles || [];
        let transaccionesTotales = [];
        // Para cada detalle, obtener transacciones del mes actual
        const hoy = new Date();
        const anio = hoy.getFullYear();
        const mes = hoy.getMonth() + 1;
        for (const det of detalles) {
          // Consultar ingresos, gastos y ahorros
          for (const tipo of ['INGRESO', 'GASTO', 'AHORRO']) {
            try {
              const resTrans = await axios.get(`http://localhost:3000/api/transacciones`, {
                params: {
                  id_detalle: det.id_detalle,
                  anio_transaccion: anio,
                  mes_transaccion: mes,
                  tipo_transaccion: tipo
                }
              });
              if (resTrans.data && resTrans.data.ok && Array.isArray(resTrans.data.data)) {
                transaccionesTotales = transaccionesTotales.concat(resTrans.data.data.map(t => ({ ...t, tipo_transaccion: tipo, categoria: det.categoria, subcategoria: det.subcategoria })));
              }
            } catch (e) {
              // Si falla, continuar
            }
          }
        }
        // Ordenar por fecha descendente y tomar las 5 más recientes
        transaccionesTotales.sort((a, b) => new Date(b.FECHA_TRANSACCION) - new Date(a.FECHA_TRANSACCION));
        setTransacciones(transaccionesTotales.slice(0, 5));
      } catch (err) {
        setError('Error al cargar el resumen financiero o transacciones.');
      }
      setLoading(false);
      setLoadingTrans(false);
    }
    fetchResumenYTransacciones();
  }, []);


// ...existing code...

function getEstadoColor(estado) {
  if (estado === 'Pagado') return 'success';
  if (estado === 'Pendiente') return 'warning';
  return 'error';
}

function getBarColor(porcentaje) {
  if (porcentaje < 80) return 'success';
  if (porcentaje <= 100) return 'warning';
  return 'error';
}
  return (
    <>
      <Box sx={{ mb: 4, p: 3, borderRadius: 3, bgcolor: '#fff', color: '#000', boxShadow: 2, position: 'relative', overflow: 'hidden' }}>
        <Typography variant="h5" sx={{ color: '#800020', fontWeight: 700 }}>Bienvenido, {usuario.PRIMER_NOMBRE}</Typography>
        <Typography variant="subtitle1" sx={{ color: '#4B2C2C' }}>Aquí tienes un resumen de tu situación financiera actual</Typography>
        {/* Floating bubbles */}
        {/* decoraciones eliminadas para máxima simplicidad */}
      {/* ...el resto del contenido permanece igual... */}
          {/* Summary Cards */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
              <CircularProgress color="secondary" />
            </Box>
          ) : error ? (
            <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
          ) : (
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {resumen.map((card) => (
                <Grid item xs={12} sm={6} md={3} key={card.titulo}>
                  <Card sx={{ bgcolor: card.color, borderRadius: 3, boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.04)', boxShadow: 6 } }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        {card.icon}
                        <Typography sx={{ ml: 1, fontWeight: 700 }}>{card.titulo}</Typography>
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>{card.monto}</Typography>
                      <Typography variant="caption" color="text.secondary">Este mes</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          {/* Charts Section (placeholders) */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={7}>
              <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: '#800020' }}>Ingresos vs Gastos vs Ahorro</Typography>
                  <Box sx={{ height: 220, bgcolor: '#fff', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                    {/* Aquí iría la gráfica de barras real */}
                    <BarChart sx={{ fontSize: 60 }} />
                    <Typography sx={{ ml: 2 }}>Gráfica de barras</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: '#800020' }}>Distribución de gastos</Typography>
                  <Box sx={{ height: 220, bgcolor: '#fff', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                    {/* Aquí iría la gráfica de pastel real */}
                    <PieChart sx={{ fontSize: 60 }} />
                    <Typography sx={{ ml: 2 }}>Gráfica de pastel</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {/* Recent Transactions */}
          <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#800020', mb: 2 }}>Transacciones recientes</Typography>
              {loadingTrans ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 80 }}>
                  <CircularProgress size={28} color="secondary" />
                </Box>
              ) : transacciones.length === 0 ? (
                <Typography color="text.secondary">No hay transacciones recientes.</Typography>
              ) : (
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#fff' }}>
                        <th style={{ padding: 8, textAlign: 'left', color: '#000' }}>Fecha</th>
                        <th style={{ padding: 8, textAlign: 'left', color: '#000' }}>Categoría</th>
                        <th style={{ padding: 8, textAlign: 'left', color: '#000' }}>Subcategoría</th>
                        <th style={{ padding: 8, textAlign: 'left', color: '#000' }}>Tipo</th>
                        <th style={{ padding: 8, textAlign: 'right', color: '#000' }}>Monto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transacciones.map((t, idx) => (
                        <tr key={idx} style={{ transition: 'background 0.2s', cursor: 'pointer' }}>
                          <td style={{ padding: 8 }}>{t.FECHA_TRANSACCION ? new Date(t.FECHA_TRANSACCION).toLocaleDateString('es-ES') : ''}</td>
                          <td style={{ padding: 8 }}>{t.categoria || ''}</td>
                          <td style={{ padding: 8 }}>{t.subcategoria || ''}</td>
                          <td style={{ padding: 8 }}>
                            {t.tipo_transaccion === 'GASTO' && <Chip label="Gasto" color="error" size="small" />}
                            {t.tipo_transaccion === 'INGRESO' && <Chip label="Ingreso" color="success" size="small" />}
                            {t.tipo_transaccion === 'AHORRO' && <Chip label="Ahorro" sx={{ background: '#fff', color: '#000' }} size="small" />}
                          </td>
                          <td style={{ padding: 8, textAlign: 'right', color: t.tipo_transaccion === 'GASTO' ? '#e74c3c' : t.tipo_transaccion === 'INGRESO' ? '#27ae60' : '#FFD700' }}>
                            {t.tipo_transaccion === 'GASTO' ? '-' : '+'}{formatCurrency(Number(t.MONTO))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              )}
            </CardContent>
          </Card>
          {/* Fixed Obligations */}
          <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#800020', mb: 2 }}>Obligaciones fijas</Typography>
              <Grid container spacing={2}>
                {obligaciones.map((o) => (
                  <Grid item xs={12} sm={6} md={4} key={o.nombre}>
                    <Card sx={{ borderLeft: `6px solid ${o.estado === 'Pagado' ? '#27ae60' : o.estado === 'Pendiente' ? '#FFD700' : '#e74c3c'}` }}>
                      <CardContent>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{o.nombre}</Typography>
                        <Typography variant="body2">Monto: {o.monto}</Typography>
                        <Typography variant="body2">Vence: {o.fecha}</Typography>
                        <Chip label={o.estado} color={getEstadoColor(o.estado)} size="small" sx={{ mt: 1 }} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
          {/* Budget Progress */}
          <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#800020', mb: 2 }}>Progreso de presupuesto</Typography>
              <Grid container spacing={2}>
                {progreso.map((p) => {
                  const porcentaje = Math.round((p.ejecutado / p.presupuestado) * 100);
                  return (
                    <Grid item xs={12} md={4} key={p.categoria}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{p.categoria}</Typography>
                      <Typography variant="body2">Presupuestado: ${p.presupuestado}</Typography>
                      <Typography variant="body2">Ejecutado: ${p.ejecutado}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress variant="determinate" value={porcentaje} color={getBarColor(porcentaje)} sx={{ flex: 1, height: 10, borderRadius: 5 }} />
                        <Typography variant="body2" sx={{ minWidth: 40 }}>{porcentaje}%</Typography>
                        {porcentaje > 100 && <Tooltip title="¡Excediste el presupuesto!"><ErrorOutline color="error" /></Tooltip>}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
          {/* Savings Goals */}
          <Card sx={{ mb: 4, borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#800020', mb: 2 }}>Metas de ahorro</Typography>
              <Grid container spacing={2}>
                {metas.map((m) => {
                  const porcentaje = Math.round((m.actual / m.objetivo) * 100);
                  return (
                    <Grid item xs={12} md={6} key={m.nombre}>
                      <Card sx={{ bgcolor: '#fff', borderRadius: 2, boxShadow: 1, color: '#000' }}>
                        <CardContent>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{m.nombre}</Typography>
                          <Typography variant="body2">Objetivo: ${m.objetivo}</Typography>
                          <Typography variant="body2">Actual: ${m.actual}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress variant="determinate" value={porcentaje} sx={{ flex: 1, height: 10, borderRadius: 5, background: '#FFD700' }} />
                            <Typography variant="body2" sx={{ minWidth: 40 }}>{porcentaje}%</Typography>
                            {porcentaje >= 100 && <Tooltip title="¡Meta alcanzada!"><CheckCircle color="success" /></Tooltip>}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
      </Box>
    </>
  );
}