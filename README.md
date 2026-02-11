# Sistema de Presupuesto Mensual Personal 💸📊

## Descripción del Proyecto

Este proyecto consiste en el desarrollo de un sistema de gestión de presupuesto personal que permite a un usuario planificar, controlar y analizar sus finanzas mensuales.

La idea principal es que el usuario pueda registrar sus ingresos, gastos, obligaciones fijas (como servicios o deudas) y metas de ahorro, y posteriormente visualizar reportes que le permitan entender mejor en qué está gastando su dinero y cómo está cumpliendo su presupuesto.

Este proyecto forma parte de la asignatura **Fundamentos de Sistemas de Bases de Datos**.

---

## Objetivo General

Aplicar los conocimientos adquiridos en la clase mediante:

- El diseño de un modelo relacional completo.
- La implementación de la base de datos en **Firebird**.
- La creación de procedimientos almacenados, funciones y triggers.
- La generación de reportes analíticos.

---

## Alcance del Sistema

El sistema permitirá:

- Gestionar usuarios con información básica.
- Crear presupuestos con vigencia por año y mes.
- Clasificar ingresos, gastos y ahorros mediante categorías y subcategorías.
- Registrar obligaciones fijas mensuales.
- Registrar transacciones reales.
- Analizar el cumplimiento del presupuesto.
- Generar reportes financieros.

---

## Motor de Base de Datos

Se utilizará **Firebird** como sistema gestor de base de datos.

En Firebird se implementará:

- Todas las tablas del modelo relacional.
- Relaciones y claves foráneas.
- Procedimientos almacenados (CRUD y lógica de negocio).
- Funciones.
- Triggers obligatorios.
- Campos de auditoría.

La mayor parte de la lógica del sistema estará implementada directamente en la base de datos.

---

## Modelo de Datos

El modelo relacional está compuesto por las siguientes entidades principales:

### 1. USUARIO
Almacena la información básica del usuario del sistema.

### 2. PRESUPUESTO
Define un plan financiero con un período de vigencia determinado (mes y año).

### 3. CATEGORIA
Clasificación principal del presupuesto (ingreso, gasto o ahorro).

### 4. SUBCATEGORIA
Detalle específico de cada categoría.  
Toda categoría debe tener al menos una subcategoría (implementado mediante trigger).

### 5. PRESUPUESTO_DETALLE
Define el monto mensual asignado a cada subcategoría dentro de un presupuesto.

### 6. OBLIGACION_FIJA
Representa gastos recurrentes mensuales con fecha de vencimiento.

### 7. TRANSACCION
Registra los movimientos reales (ingresos, gastos o ahorro).

---

## Reglas Importantes del Sistema

- No se pueden registrar transacciones directamente a una categoría, solo a subcategorías.
- Toda categoría debe tener al menos una subcategoría.
- Las transacciones deben estar dentro del período de vigencia del presupuesto.
- Se deben incluir campos de auditoría en todas las tablas:
  - `creado_por`
  - `modificado_por`
  - `creado_en`
  - `modificado_en`
- La lógica de negocio se implementa en procedimientos almacenados y no mediante SQL directo desde la aplicación.

---

## Reportería

El sistema incluirá reportes como:

- Resumen mensual de ingresos vs gastos.
- Distribución de gastos por categoría.
- Análisis de cumplimiento presupuestal.
- Tendencia de gastos en el tiempo.
- Estado de obligaciones fijas.
- Progreso de metas de ahorro.

Los reportes serán exportables en PDF.

---

## Estructura del Repositorio
```
proyecto-presupuesto-personal/
├── README.md                          # Descripción del proyecto
├── docs/
│   ├── ERD.png                       # Diagrama Entidad-Relación
│   ├── ModeloRelacional.pdf          # Modelo Relacional documentado
│   ├── DiccionarioDatos.xlsx         # Diccionario de datos
│   └── Reportes.pdf                  # Documentación de reportes con SQL
├── database/
│   ├── DDL/
│   │   └── 01_crear_tablas.sql
│   ├── procedimientos/
│   │   ├── crud_usuario.sql
│   │   ├── crud_categoria.sql
│   │   └── ... (otros procedimientos)
│   ├── funciones/
│   │   └── funciones.sql
│   ├── triggers/
│   │   └── triggers.sql
│   └── datos_prueba/
│       └── insertar_datos.sql
├── backend/
│   ├── src/
│   ├── package.json (o equivalente)
│   └── README.md
├── frontend/
│   ├── src/
│   ├── assets/
│   └── README.md
└── metabase/
    └── metabase_backup.zip
```
---

## Datos de Prueba

Se generarán datos de prueba realistas para al menos **dos meses completos**, asegurando:

- Distribución realista de transacciones.
- Variación en gastos.
- Cumplimiento parcial del presupuesto.
- Registro de obligaciones cercanas a su vencimiento.

---

## Arquitectura General

El sistema seguirá una arquitectura de tres capas:

1. Capa de Presentación (Frontend).
2. Capa de Negocio (Backend).
3. Capa de Datos (Firebird).

La lógica principal se implementará en la base de datos.

---

## Tecnologías Utilizadas

- Firebird (Base de Datos)
- DBML (dbdiagram.io)
- Git y GitHub (Control de versiones)
- Metabase (Reportería)

---

## Autor

Nombre: Ana Valle  
Asignatura: Teoria de Bases de Datos
Año: 2026

