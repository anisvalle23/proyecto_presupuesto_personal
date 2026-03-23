# 💰 Sistema de Presupuesto Mensual Personal - Backend

## 📌 Descripción

Este backend corresponde a un sistema de gestión de presupuesto personal que permite a los usuarios planificar, registrar y analizar sus finanzas mensuales.

El sistema está desarrollado utilizando **Node.js + Express** y se conecta a una base de datos **Firebird**, donde toda la lógica de negocio se implementa mediante **procedimientos almacenados (Stored Procedures)**.

---

## 🧠 Arquitectura

El backend sigue una arquitectura en capas:

routes → controllers → services → database (Stored Procedures)

- Routes: Definen los endpoints de la API
- Controllers: Manejan las solicitudes HTTP
- Services: Ejecutan lógica y llaman a los SP
- Database: Firebird con procedimientos almacenados

---

## ⚙️ Tecnologías utilizadas

- Node.js
- Express.js
- Firebird
- dotenv
- CORS

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio
git clone <URL_DEL_REPO>
cd backend

### 2. Instalar dependencias
npm install

### 3. Configurar variables de entorno (.env)

DB_HOST=localhost
DB_PORT=3050
DB_NAME=nombre_db
DB_USER=SYSDBA
DB_PASSWORD=masterkey
PORT=3000

### 4. Ejecutar servidor
npm run dev

Servidor disponible en:
http://localhost:3000

---

## 📡 Endpoints principales

### 👤 Usuarios
GET /api/usuarios
GET /api/usuarios/:id
POST /api/usuarios
PUT /api/usuarios/:id
DELETE /api/usuarios/:id

---

### 📂 Categorías
GET /api/categorias
GET /api/categorias/:id
POST /api/categorias
PUT /api/categorias/:id
DELETE /api/categorias/:id

---

### 📁 Subcategorías
GET /api/subcategorias/categoria/:idCategoria
GET /api/subcategorias/:id
POST /api/subcategorias
PUT /api/subcategorias/:id
DELETE /api/subcategorias/:id

---

### 📊 Presupuestos
GET /api/presupuestos
GET /api/presupuestos/:id
GET /api/presupuestos/:id/completo
POST /api/presupuestos
PUT /api/presupuestos/:id
DELETE /api/presupuestos/:id

---

### 📌 Presupuesto Detalle
GET /api/presupuesto-detalle/presupuesto/:idPresupuesto
GET /api/presupuesto-detalle/:id
POST /api/presupuesto-detalle
PUT /api/presupuesto-detalle/:id
DELETE /api/presupuesto-detalle/:id

---

### 💳 Transacciones
GET /api/transacciones
GET /api/transacciones/:id
POST /api/transacciones
PUT /api/transacciones/:id
DELETE /api/transacciones/:id

Filtros:
?id_detalle=&anio_transaccion=&mes_transaccion=&tipo_transaccion=

---

### 🔁 Obligaciones Fijas
GET /api/obligaciones-fijas
GET /api/obligaciones-fijas/:id
POST /api/obligaciones-fijas
PUT /api/obligaciones-fijas/:id
DELETE /api/obligaciones-fijas/:id

---

## 🧩 Lógica importante

- Toda la lógica se maneja mediante Stored Procedures
- No se ejecuta SQL directo desde el backend
- Validaciones se hacen en la base de datos

---

## ⚠️ Consideraciones técnicas

### 🔥 Manejo de booleanos en Firebird
Los valores booleanos se envían como:
TRUE / FALSE directamente en el SQL

---

## 🧪 Pruebas

Ejemplo:
curl http://localhost:3000/api/usuarios

---

## 📁 Estructura del proyecto

src/
├── config/
├── controllers/
├── services/
├── routes/
├── app.js
└── server.js

---

## 🎯 Estado del proyecto

- CRUD completo implementado
- Conexión con procedimientos almacenados
- Backend listo para frontend

---

## 👨‍💻 Autor

Ana Valle - Bases de Datos I

