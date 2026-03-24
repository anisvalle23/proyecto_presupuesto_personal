import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Subcategorias() {
  const [subcategorias, setSubcategorias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ nombre_subcategoria: '', id_categoria: '' });

  const fetchSubcategorias = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:3000/api/subcategorias');
      setSubcategorias(res.data.data || []);
    } catch (e) {
      setError('Error al cargar subcategorías');
    }
    setLoading(false);
  };

  const fetchCategorias = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/categorias');
      setCategorias(res.data.data || []);
    } catch {}
  };

  useEffect(() => {
    fetchCategorias();
    fetchSubcategorias();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3000/api/subcategorias', form);
      setForm({ nombre_subcategoria: '', id_categoria: '' });
      fetchSubcategorias();
    } catch (e) {
      setError('Error al guardar subcategoría');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar subcategoría?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/subcategorias/${id}`);
      fetchSubcategorias();
    } catch (e) {
      setError('Error al eliminar subcategoría');
    }
  };

  return (
    <div>
      <h2>Subcategorías</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input name="nombre_subcategoria" placeholder="Nombre de la subcategoría" value={form.nombre_subcategoria} onChange={handleChange} required />{' '}
        <select name="id_categoria" value={form.id_categoria} onChange={handleChange} required>
          <option value="">Selecciona categoría</option>
          {categorias.map(c => (
            <option key={c.ID_CATEGORIA} value={c.ID_CATEGORIA}>{c.NOMBRE_CATEGORIA}</option>
          ))}
        </select>{' '}
        <button type="submit">Agregar</button>
      </form>
      {loading ? <div>Cargando...</div> : (
        <table border="1" cellPadding="4" style={{ width: '100%', background: '#fff', fontSize: 15 }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {subcategorias.length === 0 ? (
              <tr><td colSpan="3">No hay subcategorías</td></tr>
            ) : (
              subcategorias.map(s => (
                <tr key={s.ID_SUBCATEGORIA}>
                  <td>{s.NOMBRE_SUBCATEGORIA}</td>
                  <td>{s.NOMBRE_CATEGORIA || ''}</td>
                  <td>
                    <button onClick={() => handleDelete(s.ID_SUBCATEGORIA)} style={{ color: 'red' }}>Eliminar</button>
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
