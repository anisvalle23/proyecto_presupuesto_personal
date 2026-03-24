import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [summary, setSummary] = useState({ ingresos: 0, gastos: 0, ahorro: 0 });

  useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await axios.get('http://localhost:3000/api/summary');
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    }

    fetchSummary();
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#F5F5DC',
      color: '#800020',
      padding: '50px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', color: '#800020', marginBottom: '20px' }}>
        Presupuesto Personal
      </h1>
      <p style={{ fontSize: '1.5rem', color: '#4B2C2C', lineHeight: '1.8', marginBottom: '30px' }}>
        Controla tu dinero con claridad, estilo y precisión.
      </p>
      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        <button
          style={{
            backgroundColor: '#800020',
            color: '#FFFFFF',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '25px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#A52A2A')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#800020')}
        >
          Comenzar ahora
        </button>
        <button
          style={{
            backgroundColor: 'transparent',
            color: '#800020',
            border: '2px solid #800020',
            padding: '15px 30px',
            borderRadius: '25px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#800020';
            e.target.style.color = '#FFFFFF';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#800020';
          }}
        >
          Más información
        </button>
      </div>
      {/* Floating bubbles effect */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: -1 }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '20px',
              height: '20px',
              backgroundColor: '#800020',
              borderRadius: '50%',
              animation: `float ${Math.random() * 5 + 5}s ease-in-out infinite`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random(),
            }}
          ></div>
        ))}
      </div>
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Home;