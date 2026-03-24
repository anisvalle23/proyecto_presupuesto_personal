import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function HeroSection() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#F5F5DC',
        color: '#800020',
        padding: '50px',
      }}
    >
      <Typography
        variant="h2"
        sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold', marginBottom: '20px' }}
      >
        Controla tu dinero con claridad, estilo y precisión
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontSize: '1.2rem', marginBottom: '30px', lineHeight: '1.6' }}
      >
        Administra tus presupuestos, gastos, ahorros y metas financieras en un solo lugar.
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#800020',
          color: '#FFFFFF',
          padding: '15px 30px',
          borderRadius: '25px',
          fontSize: '1.2rem',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#A52A2A',
          },
        }}
      >
        Comenzar ahora
      </Button>
    </Box>
  );
}

export default HeroSection;