import React, { useEffect, useState } from 'react';
import axios from 'axios';

const usuario = JSON.parse(localStorage.getItem('usuario')) || {};

export default function Transacciones() {
  const [transacciones, setTransacciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    descripcion: '',
    monto: '',
    tipo_transaccion: 'INGRESO',
    fecha_transaccion: ''
  });

  const fetchTransacciones = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:3000/api/transacciones', {
        params: { id_usuario: usuario.ID_USUARIO }
      });
      setTransacciones(res.data.data || []);
    } catch (e) {
      setError('Error al cargar transacciones');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransacciones();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3000/api/transacciones', {
        ...form,
        id_usuario: usuario.ID_USUARIO
      });
      setForm({ descripcion: '', monto: '', tipo_transaccion: 'INGRESO', fecha_transaccion: '' });
      fetchTransacciones();
    } catch (e) {
      setError('Error al guardar transacción');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar transacción?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/transacciones/${id}`);
      fetchTransacciones();
    } catch (e) {
      setError('Error al eliminar transacción');
    }
  };

  return (
    <div style={{ background: '#fff', color: '#000', minHeight: '100vh', padding: 16 }}>
      <h2>Transacciones</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />{' '}
        <input name="monto" placeholder="Monto" value={form.monto} onChange={handleChange} required type="number" style={{ width: 80 }} />{' '}
        <select name="tipo_transaccion" value={form.tipo_transaccion} onChange={handleChange}>
          <option value="INGRESO">Ingreso</option>
          <option value="GASTO">Gasto</option>
          <option value="AHORRO">Ahorro</option>
        </select>{' '}
        <input name="fecha_transaccion" type="date" value={form.fecha_transaccion} onChange={handleChange} required />{' '}
        <button type="submit">Agregar</button>
      </form>
      {loading ? <div>Cargando...</div> : (
        <table border="1" cellPadding="4" style={{ width: '100%', background: '#fff', color: '#000', fontSize: 15 }}>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Tipo</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {transacciones.length === 0 ? (
              <tr><td colSpan="5">No hay transacciones</td></tr>
            ) : (
              transacciones.map(t => (
                <tr key={t.ID_TRANSACCION}>
                  <td>{t.DESCRIPCION}</td>
                  <td>{t.MONTO}</td>
                  <td>{t.TIPO_TRANSACCION}</td>
                  <td>{t.FECHA_TRANSACCION ? t.FECHA_TRANSACCION.substring(0, 10) : ''}</td>
                  <td>
                    <button onClick={() => handleDelete(t.ID_TRANSACCION)} style={{ color: 'red' }}>Eliminar</button>
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
