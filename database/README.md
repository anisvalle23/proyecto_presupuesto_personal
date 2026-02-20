{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 # Configuraci\'f3n e Implementaci\'f3n de la Base de Datos\
\
Este documento describe c\'f3mo se implement\'f3 la base de datos del proyecto Sistema de Presupuesto Mensual Personal utilizando Firebird dentro de un contenedor Docker.\
\
---\
\
# 1. Motor de Base de Datos\
\
Se utiliz\'f3:\
\
- Firebird 4.0\
- Imagen Docker: jacobalberty/firebird:4.0\
\
La base de datos se ejecuta dentro de un contenedor Docker y se conecta mediante DBeaver.\
\
---\
\
# 2. Configuraci\'f3n con Docker\
\
## 2.1 Descargar imagen\
\
docker pull jacobalberty/firebird:4.0\
\
## 2.2 Crear contenedor\
\
docker run -d \\\
--name firebird_presupuesto \\\
-p 3050:3050 \\\
-e ISC_PASSWORD=masterkey \\\
-v firebird_data:/firebird/data \\\
jacobalberty/firebird:4.0\
\
Par\'e1metros utilizados:\
\
- -d \uc0\u8594  ejecuci\'f3n en segundo plano\
- --name \uc0\u8594  nombre del contenedor\
- -p 3050:3050 \uc0\u8594  exposici\'f3n del puerto de Firebird\
- ISC_PASSWORD \uc0\u8594  contrase\'f1a del usuario SYSDBA\
- -v firebird_data \uc0\u8594  volumen para persistencia\
\
---\
\
# 3. Persistencia de Datos\
\
La informaci\'f3n real se almacena en el volumen:\
\
firebird_data\
\
El archivo f\'edsico de la base de datos (presupuesto.fdb) no se sube al repositorio.\
\
El repositorio solo almacena scripts SQL que permiten recrear completamente la base de datos.\
\
---\
\
# 4. Estructura de Scripts\
\
La carpeta database est\'e1 organizada de la siguiente manera:\
\
database/\
\uc0\u9500 \u9472 \u9472  DDL/\
\uc0\u9474    \u9492 \u9472 \u9472  01_crear_tablas.sql\
\uc0\u9500 \u9472 \u9472  procedimientos/\
\uc0\u9474    \u9500 \u9472 \u9472  crud_usuario.sql\
\uc0\u9474    \u9500 \u9472 \u9472  crud_categoria.sql\
\uc0\u9474    \u9492 \u9472 \u9472  ...\
\uc0\u9500 \u9472 \u9472  funciones/\
\uc0\u9474    \u9492 \u9472 \u9472  funciones.sql\
\uc0\u9500 \u9472 \u9472  triggers/\
\uc0\u9474    \u9492 \u9472 \u9472  triggers.sql\
\uc0\u9492 \u9472 \u9472  datos_prueba/\
    \uc0\u9492 \u9472 \u9472  insertar_datos.sql\
\
Descripci\'f3n:\
\
DDL \uc0\u8594  creaci\'f3n de tablas y relaciones  \
procedimientos \uc0\u8594  operaciones CRUD y l\'f3gica de negocio  \
funciones \uc0\u8594  c\'e1lculos din\'e1micos del sistema  \
triggers \uc0\u8594  automatizaci\'f3n y validaciones  \
datos_prueba \uc0\u8594  inserci\'f3n de datos\
\
---\
\
# 5. Modelo Relacional Implementado\
\
Se crearon las siguientes tablas:\
\
- USUARIO\
- PRESUPUESTO\
- CATEGORIA\
- SUBCATEGORIA\
- PRESUPUESTO_DETALLE\
- OBLIGACION_FIJA\
- TRANSACCION\
- OBLIGACIONFIJA_TRANSACCION\
\
Cada tabla incluye:\
\
- Clave primaria\
- Llaves for\'e1neas seg\'fan el modelo relacional\
- Campos de auditor\'eda:\
  - CREADO_POR\
  - MODIFICADO_POR\
  - CREADO_EN\
  - MODIFICADO_EN\
\
---\
\
# 6. Integridad Referencial\
\
Las relaciones fueron implementadas mediante FOREIGN KEY.\
\
Las llaves for\'e1neas garantizan que:\
\
- No existan registros dependientes sin entidad padre.\
- No se puedan insertar datos inconsistentes.\
- Se mantenga la integridad del modelo relacional.\
\
---\
\
# 7. Convenciones Utilizadas\
\
- Uso de MAY\'daSCULAS en nombres de tablas y columnas.\
- Separaci\'f3n de scripts por responsabilidad.\
- Uso de nombres descriptivos en constraints..\
\
}