import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import DashboardLayout from './pages/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Presupuestos from './pages/Presupuestos';
import Transacciones from './pages/Transacciones';
import Categorias from './pages/Categorias';
import Obligaciones from './pages/Obligaciones';
import Reportes from './pages/Reportes';
import MetasAhorro from './pages/MetasAhorro';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="presupuestos" element={<Presupuestos />} />
          <Route path="transacciones" element={<Transacciones />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="obligaciones" element={<Obligaciones />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="metas-ahorro" element={<MetasAhorro />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;