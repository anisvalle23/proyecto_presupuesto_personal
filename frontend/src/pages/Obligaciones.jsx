import React, { useEffect, useState } from 'react';
import axios from 'axios';

const usuario = JSON.parse(localStorage.getItem('usuario')) || {};

export default function Obligaciones() {
  const [obligaciones, setObligaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nombre_obligacion: '', monto_mensual: '' });

  const fetchObligaciones = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:3000/api/obligaciones', {
        params: { id_usuario: usuario.ID_USUARIO }
      });
      setObligaciones(res.data.data || []);
    } catch (e) {
      setError('Error al cargar obligaciones');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchObligaciones();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3000/api/obligaciones', {
        ...form,
        id_usuario: usuario.ID_USUARIO
      });
      setForm({ nombre_obligacion: '', monto_mensual: '' });
      fetchObligaciones();
    } catch (e) {
      setError('Error al guardar obligación');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar obligación?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/obligaciones/${id}`);
      fetchObligaciones();
    } catch (e) {
      setError('Error al eliminar obligación');
    }
  };

  return (
    <div style={{ background: '#fff', color: '#000', minHeight: '100vh', padding: 16 }}>
      <h2>Obligaciones</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input name="nombre_obligacion" placeholder="Nombre de la obligación" value={form.nombre_obligacion} onChange={handleChange} required />{' '}
        <input name="monto_mensual" placeholder="Monto mensual" value={form.monto_mensual} onChange={handleChange} required type="number" style={{ width: 80 }} />{' '}
        <button type="submit">Agregar</button>
      </form>
      {loading ? <div>Cargando...</div> : (
        <table border="1" cellPadding="4" style={{ width: '100%', background: '#fff', color: '#000', fontSize: 15 }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Monto mensual</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {obligaciones.length === 0 ? (
              <tr><td colSpan="3">No hay obligaciones</td></tr>
            ) : (
              obligaciones.map(o => (
                <tr key={o.ID_OBLIGACION}>
                  <td>{o.NOMBRE_OBLIGACION}</td>
                  <td>{o.MONTO_MENSUAL}</td>
                  <td>
                    <button onClick={() => handleDelete(o.ID_OBLIGACION)} style={{ color: 'red' }}>Eliminar</button>
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
