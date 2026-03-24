import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Avatar, IconButton, Tooltip } from '@mui/material';
import { Logout, Notifications, TrendingUp, TrendingDown, Savings, PieChart, BarChart, CalendarToday } from '@mui/icons-material';

const usuario = JSON.parse(localStorage.getItem('usuario')) || {};

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    { label: 'Dashboard', icon: <BarChart />, route: '/dashboard' },
    { label: 'Presupuestos', icon: <PieChart />, route: '/dashboard/presupuestos' },
    { label: 'Transacciones', icon: <TrendingDown />, route: '/dashboard/transacciones' },
    { label: 'Categorías', icon: <PieChart />, route: '/dashboard/categorias' },
    { label: 'Obligaciones', icon: <CalendarToday />, route: '/dashboard/obligaciones' },
    { label: 'Reportes', icon: <BarChart />, route: '/dashboard/reportes' },
    { label: 'Metas de ahorro', icon: <Savings />, route: '/dashboard/metas-ahorro' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F5F5DC 0%, #fff 100%)', p: 0 }}>
      {/* Top Bar */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: '#fff', boxShadow: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 4, py: 2 }}>
        <Typography variant="h5" sx={{ color: '#800020', fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
          Presupuesto Personal
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Notificaciones"><IconButton><Notifications sx={{ color: '#800020' }} /></IconButton></Tooltip>
          <Typography sx={{ fontWeight: 500 }}>{usuario.PRIMER_NOMBRE} {usuario.PRIMER_APELLIDO}</Typography>
          <Avatar sx={{ bgcolor: '#800020' }}>{usuario.PRIMER_NOMBRE?.[0]}</Avatar>
          <Tooltip title="Cerrar sesión"><IconButton onClick={() => { localStorage.removeItem('usuario'); window.location.href = '/login'; }}><Logout sx={{ color: '#800020' }} /></IconButton></Tooltip>
        </Box>
      </Box>
      {/* Sidebar + Main Content */}
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        {/* Sidebar */}
        <Box sx={{ width: 220, bgcolor: 'rgba(128,0,32,0.95)', color: '#fff', py: 4, px: 2, display: { xs: 'none', md: 'block' }, minHeight: '100%' }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 700 }}>Menú</Typography>
          </Box>
          {menuItems.map((item) => (
            <Box
              key={item.label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: location.pathname === item.route ? '#fff' : 'transparent',
                color: location.pathname === item.route ? '#800020' : '#fff',
                borderLeft: location.pathname === item.route ? '5px solid #FFD700' : 'none',
                fontWeight: location.pathname === item.route ? 700 : 400,
                boxShadow: location.pathname === item.route ? 2 : 0,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onClick={() => navigate(item.route)}
            >
              {item.icon}
              <Typography sx={{ ml: 2 }}>{item.label}</Typography>
            </Box>
          ))}
        </Box>
        {/* Main Content */}
        <Box sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
