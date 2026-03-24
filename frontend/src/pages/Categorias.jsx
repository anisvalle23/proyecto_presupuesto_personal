import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nombre_categoria: '' });

  const fetchCategorias = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:3000/api/categorias');
      setCategorias(res.data.data || []);
    } catch (e) {
      setError('Error al cargar categorías');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3000/api/categorias', form);
      setForm({ nombre_categoria: '' });
      fetchCategorias();
    } catch (e) {
      setError('Error al guardar categoría');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar categoría?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/categorias/${id}`);
      fetchCategorias();
    } catch (e) {
      setError('Error al eliminar categoría');
    }
  };

  return (
    <div style={{ background: '#fff', color: '#000', minHeight: '100vh', padding: 16 }}>
      <h2>Categorías</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input name="nombre_categoria" placeholder="Nombre de la categoría" value={form.nombre_categoria} onChange={handleChange} required />{' '}
        <button type="submit">Agregar</button>
      </form>
      {loading ? <div>Cargando...</div> : (
        <table border="1" cellPadding="4" style={{ width: '100%', background: '#fff', color: '#000', fontSize: 15 }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length === 0 ? (
              <tr><td colSpan="2">No hay categorías</td></tr>
            ) : (
              categorias.map(c => (
                <tr key={c.ID_CATEGORIA}>
                  <td>{c.NOMBRE_CATEGORIA}</td>
                  <td>
                    <button onClick={() => handleDelete(c.ID_CATEGORIA)} style={{ color: 'red' }}>Eliminar</button>
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
