import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const usuario = localStorage.getItem('usuario');

  // Ocultar navbar en dashboard si el usuario está autenticado
  if (usuario && location.pathname === '/dashboard') {
    return null;
  }

  return (
    <AppBar position="sticky" className="AppBar" elevation={3} sx={{ backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Playfair Display, serif', fontSize: '1.5rem' }}>
          Presupuesto Personal
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/features">
            Características
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Iniciar Sesión
          </Button>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#800020',
              color: '#FFFFFF',
              borderRadius: '20px',
              marginLeft: '20px',
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: '#A52A2A',
              },
            }}
            component={Link}
            to="/start"
          >
            Comenzar
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;