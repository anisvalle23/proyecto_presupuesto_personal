import React, { useEffect, useState } from 'react';
import axios from 'axios';

const usuario = JSON.parse(localStorage.getItem('usuario')) || {};

export default function Presupuestos() {
  const [presupuestos, setPresupuestos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    nombre_presupuesto: '',
    anio_inicio: '',
    mes_inicio: '',
    anio_fin: '',
    mes_fin: '',
    total_ingresos_planificados: '',
    total_gastos_planificados: '',
    total_ahorro_planificado: '',
    estado_presupuesto: 'activo'
  });
  const [editId, setEditId] = useState(null);

  const fetchPresupuestos = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:3000/api/presupuestos', {
        params: { id_usuario: usuario.ID_USUARIO }
      });
      setPresupuestos(res.data.data || []);
    } catch (e) {
      setError('Error al cargar presupuestos');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPresupuestos();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (editId) {
        await axios.put(`http://localhost:3000/api/presupuestos/${editId}`, {
          ...form,
          id_usuario: usuario.ID_USUARIO,
          modificado_por: usuario.ID_USUARIO
        });
      } else {
        await axios.post('http://localhost:3000/api/presupuestos', {
          ...form,
          id_usuario: usuario.ID_USUARIO,
          creado_por: usuario.ID_USUARIO
        });
      }
      setForm({
        nombre_presupuesto: '', anio_inicio: '', mes_inicio: '', anio_fin: '', mes_fin: '',
        total_ingresos_planificados: '', total_gastos_planificados: '', total_ahorro_planificado: '', estado_presupuesto: 'activo'
      });
      setEditId(null);
      fetchPresupuestos();
    } catch (e) {
      setError('Error al guardar presupuesto');
    }
  };

  const handleEdit = p => {
    setEditId(p.ID_PRESUPUESTO);
    setForm({
      nombre_presupuesto: p.NOMBRE_PRESUPUESTO || '',
      anio_inicio: p.ANIO_INICIO != null ? String(p.ANIO_INICIO) : '',
      mes_inicio: p.MES_INICIO != null ? String(p.MES_INICIO) : '',
      anio_fin: p.ANIO_FIN != null ? String(p.ANIO_FIN) : '',
      mes_fin: p.MES_FIN != null ? String(p.MES_FIN) : '',
      total_ingresos_planificados: p.TOTAL_INGRESOS_PLANIFICADOS != null ? String(p.TOTAL_INGRESOS_PLANIFICADOS) : '',
      total_gastos_planificados: p.TOTAL_GASTOS_PLANIFICADOS != null ? String(p.TOTAL_GASTOS_PLANIFICADOS) : '',
      total_ahorro_planificado: p.TOTAL_AHORRO_PLANIFICADO != null ? String(p.TOTAL_AHORRO_PLANIFICADO) : '',
      estado_presupuesto: p.ESTADO_PRESUPUESTO || 'activo'
    });
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar presupuesto?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/presupuestos/${id}`, {
        data: { modificado_por: usuario.ID_USUARIO }
      });
      fetchPresupuestos();
    } catch (e) {
      setError('Error al eliminar presupuesto');
    }
  };

  return (
    <div style={{ background: '#fff', color: '#000', minHeight: '100vh', padding: 16 }}>
      <h2>Presupuestos</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input name="nombre_presupuesto" placeholder="Nombre" value={form.nombre_presupuesto} onChange={handleChange} required />{' '}
        <input name="anio_inicio" placeholder="Año inicio" value={form.anio_inicio} onChange={handleChange} required type="number" style={{ width: 70 }} />{' '}
        <input name="mes_inicio" placeholder="Mes inicio" value={form.mes_inicio} onChange={handleChange} required type="number" min={1} max={12} style={{ width: 50 }} />{' '}
        <input name="anio_fin" placeholder="Año fin" value={form.anio_fin} onChange={handleChange} required type="number" style={{ width: 70 }} />{' '}
        <input name="mes_fin" placeholder="Mes fin" value={form.mes_fin} onChange={handleChange} required type="number" min={1} max={12} style={{ width: 50 }} />{' '}
        <input name="total_ingresos_planificados" placeholder="Ingresos" value={form.total_ingresos_planificados} onChange={handleChange} required type="number" style={{ width: 80 }} />{' '}
        <input name="total_gastos_planificados" placeholder="Gastos" value={form.total_gastos_planificados} onChange={handleChange} required type="number" style={{ width: 80 }} />{' '}
        <input name="total_ahorro_planificado" placeholder="Ahorro" value={form.total_ahorro_planificado} onChange={handleChange} required type="number" style={{ width: 80 }} />{' '}
        <select name="estado_presupuesto" value={form.estado_presupuesto} onChange={handleChange}>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>{' '}
        <button type="submit">{editId ? 'Actualizar' : 'Crear'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ nombre_presupuesto: '', anio_inicio: '', mes_inicio: '', anio_fin: '', mes_fin: '', total_ingresos_planificados: '', total_gastos_planificados: '', total_ahorro_planificado: '', estado_presupuesto: 'activo' }); }}>Cancelar</button>}
      </form>
      {loading ? <div>Cargando...</div> : (
        <table border="1" cellPadding="4" style={{ width: '100%', background: '#fff', color: '#000', fontSize: 15 }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Ingresos</th>
              <th>Gastos</th>
              <th>Ahorro</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {presupuestos.length === 0 ? (
              <tr><td colSpan="8">No hay presupuestos</td></tr>
            ) : (
              presupuestos.map(p => (
                <tr key={p.ID_PRESUPUESTO}>
                  <td>{p.NOMBRE_PRESUPUESTO}</td>
                  <td>{p.ANIO_INICIO}/{p.MES_INICIO}</td>
                  <td>{p.ANIO_FIN}/{p.MES_FIN}</td>
                  <td>{Number(p.TOTAL_INGRESOS_PLANIFICADOS) || 0}</td>
                  <td>{Number(p.TOTAL_GASTOS_PLANIFICADOS) || 0}</td>
                  <td>{Number(p.TOTAL_AHORRO_PLANIFICADO) || 0}</td>
                  <td>{p.ESTADO_PRESUPUESTO}</td>
                  <td>
                    <button onClick={() => handleEdit(p)}>Editar</button>{' '}
                    <button onClick={() => handleDelete(p.ID_PRESUPUESTO)} style={{ color: 'red' }}>Eliminar</button>
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
