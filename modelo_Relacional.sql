CREATE TABLE `USUARIO` (
  `id_usuario` int PRIMARY KEY,
  `nombres` varchar(80),
  `apellidos` varchar(80),
  `correo` varchar(120),
  `fecha_registro` varchar(30),
  `salario_mensual_base` int,
  `estado_usuario` varchar(20),
  `creado_por` int,
  `modificado_por` int,
  `creado_en` varchar(30),
  `modificado_en` varchar(30)
);

CREATE TABLE `PRESUPUESTO` (
  `id_presupuesto` int PRIMARY KEY,
  `id_usuario` int,
  `nombre_presupuesto` varchar(100),
  `anio_inicio` int,
  `mes_inicio` int,
  `anio_fin` int,
  `mes_fin` int,
  `total_ingresos_planificados` int,
  `total_gastos_planificados` int,
  `total_ahorro_planificado` int,
  `fecha_creacion` varchar(30),
  `estado_presupuesto` varchar(20),
  `creado_por` int,
  `modificado_por` int,
  `creado_en` varchar(30),
  `modificado_en` varchar(30)
);

CREATE TABLE `CATEGORIA` (
  `id_categoria` int PRIMARY KEY,
  `nombre_categoria` varchar(60),
  `descripcion_categoria` varchar(150),
  `tipo_categoria` varchar(20),
  `icono` varchar(50),
  `color_hex` varchar(10),
  `orden_ui` int,
  `creado_por` int,
  `modificado_por` int,
  `creado_en` varchar(30),
  `modificado_en` varchar(30)
);

CREATE TABLE `SUBCATEGORIA` (
  `id_subcategoria` int PRIMARY KEY,
  `id_categoria` int,
  `nombre_subcategoria` varchar(60),
  `descripcion_subcategoria` varchar(150),
  `activa` boolean,
  `es_defecto` boolean,
  `creado_por` int,
  `modificado_por` int,
  `creado_en` varchar(30),
  `modificado_en` varchar(30)
);

CREATE TABLE `PRESUPUESTO_DETALLE` (
  `id_detalle` int PRIMARY KEY,
  `id_presupuesto` int,
  `id_subcategoria` int,
  `monto_mensual_asignado` int,
  `observaciones` varchar(200),
  `creado_por` int,
  `modificado_por` int,
  `creado_en` varchar(30),
  `modificado_en` varchar(30)
);

CREATE TABLE `OBLIGACION_FIJA` (
  `id_obligacion` int PRIMARY KEY,
  `id_usuario` int,
  `id_subcategoria` int,
  `nombre_obligacion` varchar(100),
  `descripcion_obligacion` varchar(200),
  `monto_fijo_mensual` int,
  `dia_vencimiento` int,
  `vigente` boolean,
  `fecha_inicio` varchar(20),
  `fecha_finalizacion` varchar(20),
  `creado_por` int,
  `modificado_por` int,
  `creado_en` varchar(30),
  `modificado_en` varchar(30)
);

CREATE TABLE `TRANSACCION` (
  `id_transaccion` int PRIMARY KEY,
  `id_usuario` int,
  `id_presupuesto` int,
  `anio` int,
  `mes` int,
  `id_subcategoria` int,
  `id_obligacion` int,
  `tipo_transaccion` varchar(20),
  `descripcion` varchar(200),
  `monto` int,
  `fecha` varchar(20),
  `metodo_pago` varchar(30),
  `num_factura` varchar(40),
  `observaciones` varchar(200),
  `fecha_registro` varchar(30),
  `creado_por` int,
  `modificado_por` int,
  `creado_en` varchar(30),
  `modificado_en` varchar(30)
);

ALTER TABLE `PRESUPUESTO` ADD FOREIGN KEY (`id_usuario`) REFERENCES `USUARIO` (`id_usuario`);

ALTER TABLE `SUBCATEGORIA` ADD FOREIGN KEY (`id_categoria`) REFERENCES `CATEGORIA` (`id_categoria`);

ALTER TABLE `PRESUPUESTO_DETALLE` ADD FOREIGN KEY (`id_presupuesto`) REFERENCES `PRESUPUESTO` (`id_presupuesto`);

ALTER TABLE `PRESUPUESTO_DETALLE` ADD FOREIGN KEY (`id_subcategoria`) REFERENCES `SUBCATEGORIA` (`id_subcategoria`);

ALTER TABLE `OBLIGACION_FIJA` ADD FOREIGN KEY (`id_usuario`) REFERENCES `USUARIO` (`id_usuario`);

ALTER TABLE `OBLIGACION_FIJA` ADD FOREIGN KEY (`id_subcategoria`) REFERENCES `SUBCATEGORIA` (`id_subcategoria`);

ALTER TABLE `TRANSACCION` ADD FOREIGN KEY (`id_usuario`) REFERENCES `USUARIO` (`id_usuario`);

ALTER TABLE `TRANSACCION` ADD FOREIGN KEY (`id_presupuesto`) REFERENCES `PRESUPUESTO` (`id_presupuesto`);

ALTER TABLE `TRANSACCION` ADD FOREIGN KEY (`id_subcategoria`) REFERENCES `SUBCATEGORIA` (`id_subcategoria`);

ALTER TABLE `TRANSACCION` ADD FOREIGN KEY (`id_obligacion`) REFERENCES `OBLIGACION_FIJA` (`id_obligacion`);
