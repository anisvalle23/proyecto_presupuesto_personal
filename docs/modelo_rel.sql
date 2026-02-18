CREATE TABLE `usuario` (
  `id_usuario` int PRIMARY KEY,
  `primer_nombre` varchar(80),
  `segundo_nombre` varchar(80),
  `primer_apellido` varchar(80),
  `segundo_apellido` varchar(80),
  `correo_electronico` varchar(120),
  `clave` varchar(255),
  `salario_mensual` decimal(18,2),
  `estado_activo` boolean,
  `creado_por` int,
  `modificado_por` int,
  `creado_en` timestamp,
  `modificado_en` timestamp
);

CREATE TABLE `presupuesto` (
  `id_presupuesto` int PRIMARY KEY,
  `id_usuario` int,
  `nombre_presupuesto` varchar(120),
  `anio_inicio` int,
  `mes_inicio` int,
  `anio_fin` int,
  `mes_fin` int,
  `total_ingresos_planificados` decimal(18,2),
  `total_gastos_planificados` decimal(18,2),
  `total_ahorro_planificado` decimal(18,2),
  `creado_en` timestamp,
  `estado_presupuesto` varchar(20),
  `creado_por` int,
  `modificado_por` int,
  `modificado_en` timestamp
);

CREATE TABLE `categoria` (
  `id_categoria` int PRIMARY KEY,
  `nombre_categoria` varchar(60),
  `descripcion_categoria` varchar(150),
  `tipo_categoria` varchar(20),
  `creado_por` int,
  `modificado_por` int,
  `creado_en` timestamp,
  `modificado_en` timestamp
);

CREATE TABLE `subcategoria` (
  `id_subcategoria` int PRIMARY KEY,
  `id_categoria` int,
  `nombre_subcategoria` varchar(60),
  `descripcion_subcategoria` varchar(150),
  `activa` boolean,
  `es_por_defecto` boolean,
  `creado_por` int,
  `modificado_por` int,
  `creado_en` timestamp,
  `modificado_en` timestamp
);

CREATE TABLE `presupuesto_detalle` (
  `id_detalle` int PRIMARY KEY,
  `id_presupuesto` int,
  `id_subcategoria` int,
  `monto_mensual_asignado` decimal(18,2),
  `observaciones` varchar(200),
  `creado_por` int,
  `modificado_por` int,
  `creado_en` timestamp,
  `modificado_en` timestamp
);

CREATE TABLE `obligacion_fija` (
  `id_obligacion` int PRIMARY KEY,
  `id_subcategoria` int,
  `nombre_obligacion` varchar(100),
  `descripcion_obligacion` varchar(200),
  `monto_fijo_mensual` decimal(18,2),
  `dia_vencimiento` int,
  `vigente` boolean,
  `fecha_inicio` date,
  `fecha_fin` date,
  `creado_por` int,
  `modificado_por` int,
  `creado_en` timestamp,
  `modificado_en` timestamp
);

CREATE TABLE `transaccion` (
  `id_transaccion` int PRIMARY KEY,
  `id_detalle` int,
  `anio_transaccion` int,
  `mes_transaccion` int,
  `id_obligacion` int,
  `tipo_transaccion` varchar(20),
  `descripcion` varchar(200),
  `monto` decimal(18,2),
  `fecha_transaccion` date,
  `metodo_pago` varchar(30),
  `numero_factura` varchar(40),
  `observaciones` varchar(200),
  `registrado_en` timestamp,
  `creado_por` int,
  `modificado_por` int,
  `creado_en` timestamp,
  `modificado_en` timestamp
);

CREATE TABLE `obligacionfija_transaccion` (
  `id_obligacion` int,
  `id_transaccion` int,
  `creado_por` int,
  `modificado_por` int,
  `creado_en` timestamp,
  `modificado_en` timestamp
);

ALTER TABLE `presupuesto` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `presupuesto_detalle` ADD FOREIGN KEY (`id_presupuesto`) REFERENCES `presupuesto` (`id_presupuesto`);

ALTER TABLE `subcategoria` ADD FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);

ALTER TABLE `presupuesto_detalle` ADD FOREIGN KEY (`id_subcategoria`) REFERENCES `subcategoria` (`id_subcategoria`);

ALTER TABLE `obligacion_fija` ADD FOREIGN KEY (`id_subcategoria`) REFERENCES `subcategoria` (`id_subcategoria`);

ALTER TABLE `transaccion` ADD FOREIGN KEY (`id_detalle`) REFERENCES `presupuesto_detalle` (`id_detalle`);

ALTER TABLE `transaccion` ADD FOREIGN KEY (`id_obligacion`) REFERENCES `obligacion_fija` (`id_obligacion`);

ALTER TABLE `obligacionfija_transaccion` ADD FOREIGN KEY (`id_obligacion`) REFERENCES `obligacion_fija` (`id_obligacion`);

ALTER TABLE `obligacionfija_transaccion` ADD FOREIGN KEY (`id_transaccion`) REFERENCES `transaccion` (`id_transaccion`);
