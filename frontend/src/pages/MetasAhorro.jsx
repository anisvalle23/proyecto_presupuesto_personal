import React, { useEffect, useState } from 'react';
import axios from 'axios';

const usuario = JSON.parse(localStorage.getItem('usuario')) || {};

export default function MetasAhorro() {
  const [metas, setMetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nombre_meta: '', monto_objetivo: '' });

  const fetchMetas = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:3000/api/metas', {
        params: { id_usuario: usuario.ID_USUARIO }
      });
      setMetas(res.data.data || []);
    } catch (e) {
      setError('Error al cargar metas');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMetas();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3000/api/metas', {
        ...form,
        id_usuario: usuario.ID_USUARIO
      });
      setForm({ nombre_meta: '', monto_objetivo: '' });
      fetchMetas();
    } catch (e) {
      setError('Error al guardar meta');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar meta?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/metas/${id}`);
      fetchMetas();
    } catch (e) {
      setError('Error al eliminar meta');
    }
  };

  return (
    <div style={{ background: '#fff', color: '#000', minHeight: '100vh', padding: 16 }}>
      <h2>Metas de Ahorro</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input name="nombre_meta" placeholder="Nombre de la meta" value={form.nombre_meta} onChange={handleChange} required />{' '}
        <input name="monto_objetivo" placeholder="Monto objetivo" value={form.monto_objetivo} onChange={handleChange} required type="number" style={{ width: 80 }} />{' '}
        <button type="submit">Agregar</button>
      </form>
      {loading ? <div>Cargando...</div> : (
        <table border="1" cellPadding="4" style={{ width: '100%', background: '#fff', color: '#000', fontSize: 15 }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Monto objetivo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {metas.length === 0 ? (
              <tr><td colSpan="3">No hay metas</td></tr>
            ) : (
              metas.map(m => (
                <tr key={m.ID_META}>
                  <td>{m.NOMBRE_META}</td>
                  <td>{m.MONTO_OBJETIVO}</td>
                  <td>
                    <button onClick={() => handleDelete(m.ID_META)} style={{ color: 'red' }}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
