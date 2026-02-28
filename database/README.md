# Configuración e Implementación de la Base de Datos

## Este documento describe cómo se implementó la base de datos del proyecto Sistema de Presupuesto Mensual Personal utilizando Firebird 4.0 dentro de un contenedor Docker.
---

## Motor de Base de Datos

Se utilizó Firebird 4.0 como motor de base de datos.
La imagen Docker utilizada fue: jacobalberty/firebird:4.0.

La base de datos se ejecuta dentro de un contenedor Docker y se administra mediante la herramienta DBeaver para la gestión y ejecución de scripts SQL.

---

## Configuración con Docker

Primero se descargó la imagen oficial de Firebird 4.0 desde Docker Hub.
Posteriormente se creó un contenedor llamado firebird_presupuesto, exponiendo el puerto 3050 para permitir conexiones externas.

Se configuró la variable de entorno ISC_PASSWORD para definir la contraseña del usuario SYSDBA.
Además, se creó un volumen llamado firebird_data con el objetivo de garantizar la persistencia de la información aun cuando el contenedor sea eliminado o reiniciado.

---

## Persistencia de Datos

Los datos reales de la base de datos se almacenan en el volumen Docker firebird_data.

El archivo físico de la base de datos (presupuesto.fdb) no se sube al repositorio por tratarse de un archivo binario generado por el motor.

En su lugar, el repositorio almacena únicamente los scripts SQL necesarios para recrear completamente la estructura de la base de datos.

---

## Estructura de Scripts

La carpeta database del proyecto está organizada por responsabilidades:
- DDL: contiene el script de creación de tablas y relaciones.
- procedimientos: incluye los procedimientos almacenados para operaciones CRUD y lógica de negocio.
- funciones: contiene las funciones almacenadas para cálculos dinámicos del sistema.
- triggers: incluye los disparadores utilizados para validaciones y automatización.
- datos_prueba: contiene scripts de inserción de datos para pruebas.

Esta organización permite mantener el proyecto modular, ordenado y fácilmente mantenible.

---

## Modelo Relacional Implementado

Se crearon las siguientes tablas principales:
- USUARIO
- PRESUPUESTO
- CATEGORIA
- SUBCATEGORIA
- PRESUPUESTO_DETALLE
- OBLIGACION_FIJA
- TRANSACCION
- OBLIGACIONFIJA_TRANSACCION

Cada tabla incluye una clave primaria para identificar de manera única cada registro.

Las relaciones entre tablas fueron implementadas mediante llaves foráneas, siguiendo el modelo relacional definido en el diseño del sistema.

Además, todas las tablas incluyen campos de auditoría:
- CREADO_POR
- MODIFICADO_POR
- CREADO_EN
- MODIFICADO_EN

Estos campos permiten llevar control sobre la creación y modificación de los registros.

---

## Integridad Referencial

La integridad referencial fue implementada mediante restricciones FOREIGN KEY.

Esto garantiza que no existan registros dependientes sin su entidad padre correspondiente, evita la inserción de datos inconsistentes y mantiene la coherencia del modelo relacional.

---

## Convenciones Utilizadas

Se utilizaron las siguientes convenciones de desarrollo:
- Uso de mayúsculas en nombres de tablas y columnas.
- Separación de scripts por tipo de responsabilidad.
- Uso de nombres descriptivos en constraints.
- Implementación de lógica de negocio en la base de datos mediante funciones y procedimientos almacenados.

La estructura y organización del proyecto permiten que la base de datos pueda recrearse completamente a partir de los scripts almacenados en el repositorio.
