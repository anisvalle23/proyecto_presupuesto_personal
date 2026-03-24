import React, { useEffect, useState } from 'react';
import axios from 'axios';

const usuario = JSON.parse(localStorage.getItem('usuario')) || {};

export default function Reportes() {
  const [resumen, setResumen] = useState({
    presupuestos: 0,
    transacciones: 0,
    metas: 0,
    obligaciones: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchResumen() {
      setLoading(true);
      setError('');
      try {
        const [pres, trans, metas, obl] = await Promise.all([
          axios.get('http://localhost:3000/api/presupuestos', { params: { id_usuario: usuario.ID_USUARIO } }),
          axios.get('http://localhost:3000/api/transacciones', { params: { id_usuario: usuario.ID_USUARIO } }),
          axios.get('http://localhost:3000/api/metas', { params: { id_usuario: usuario.ID_USUARIO } }),
          axios.get('http://localhost:3000/api/obligaciones', { params: { id_usuario: usuario.ID_USUARIO } })
        ]);
        setResumen({
          presupuestos: pres.data.data ? pres.data.data.length : 0,
          transacciones: trans.data.data ? trans.data.data.length : 0,
          metas: metas.data.data ? metas.data.data.length : 0,
          obligaciones: obl.data.data ? obl.data.data.length : 0
        });
      } catch (e) {
        setError('Error al cargar reportes');
      }
      setLoading(false);
    }
    fetchResumen();
  }, []);

  return (
    <div style={{ background: '#fff', color: '#000', minHeight: '100vh', padding: 16 }}>
      <h2>Reportes</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading ? <div>Cargando...</div> : (
        <table border="1" cellPadding="4" style={{ width: '100%', background: '#fff', color: '#000', fontSize: 15 }}>
          <thead>
            <tr>
              <th>Entidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Presupuestos</td><td>{resumen.presupuestos}</td></tr>
            <tr><td>Transacciones</td><td>{resumen.transacciones}</td></tr>
            <tr><td>Metas de Ahorro</td><td>{resumen.metas}</td></tr>
            <tr><td>Obligaciones</td><td>{resumen.obligaciones}</td></tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
