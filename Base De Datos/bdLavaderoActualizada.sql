-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2023 a las 23:23:00
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdlavadero`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calcularprecio`
--

CREATE TABLE `calcularprecio` (
  `id` int(11) NOT NULL,
  `idTipoServicio` int(11) DEFAULT NULL,
  `idTipoVehiculo` int(11) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Numero` varchar(50) NOT NULL,
  `Ciudad` varchar(50) NOT NULL,
  `Pais` varchar(50) NOT NULL,
  `DNI` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `Nombre`, `Apellido`, `Numero`, `Ciudad`, `Pais`, `DNI`) VALUES
(1, '', '', '', '', 'Argentina', ''),
(2, 'Juan', 'Perez', '3534235978', 'Villa Maria', 'Argentina', '44899234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE `configuracion` (
  `id` int(11) NOT NULL,
  `precioDolar` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `configuracion`
--

INSERT INTO `configuracion` (`id`, `precioDolar`) VALUES
(1, 2.50),
(2, 5.00),
(3, 10.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`id`, `nombre`) VALUES
(1, 'Toyota'),
(2, 'Ford'),
(3, 'Honda'),
(4, 'Chevrolet');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelo`
--

CREATE TABLE `modelo` (
  `id` int(11) NOT NULL,
  `idMarca` int(11) DEFAULT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modelo`
--

INSERT INTO `modelo` (`id`, `idMarca`, `nombre`) VALUES
(1, 1, 'Camry'),
(2, 1, 'Corolla'),
(3, 2, 'F-150'),
(4, 2, 'Mustang'),
(5, 3, 'Civic'),
(6, 3, 'Accord'),
(7, 4, 'Cruze'),
(8, 4, 'Malibu');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`id`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `id` int(11) NOT NULL,
  `idVehiculo` int(11) DEFAULT NULL,
  `Descripcion` varchar(50) DEFAULT NULL,
  `Fecha` date NOT NULL,
  `Hora` time NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`id`, `idVehiculo`, `Descripcion`, `Fecha`, `Hora`, `idUsuario`, `precio`) VALUES
(1, NULL, 'descripcion', '2023-11-07', '02:21:54', NULL, NULL),
(11, 97, 'descripcion', '2023-11-07', '02:38:09', NULL, NULL),
(12, 99, NULL, '2023-11-07', '02:40:15', NULL, NULL),
(13, 99, NULL, '2023-11-07', '02:41:20', NULL, NULL),
(14, 96, 'derwrwrew', '2023-11-07', '02:41:57', NULL, NULL),
(17, 102, 'dardaa', '2023-11-07', '02:44:12', NULL, NULL),
(18, 98, 'completito', '2023-11-07', '02:56:15', NULL, NULL),
(19, 98, 'para dardo', '2023-11-07', '02:57:23', 70, NULL),
(20, 98, 'LAVADOOOOOOO', '2023-11-07', '03:01:37', 70, 7500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sxts`
--

CREATE TABLE `sxts` (
  `id` int(11) NOT NULL,
  `idServicio` int(11) DEFAULT NULL,
  `idTipoServicio` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposervicio`
--

CREATE TABLE `tiposervicio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tiposervicio`
--

INSERT INTO `tiposervicio` (`id`, `nombre`) VALUES
(1, 'Lavado Basico'),
(2, 'Lavado Completo'),
(3, 'Lavado Premium');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipovehiculo`
--

CREATE TABLE `tipovehiculo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipovehiculo`
--

INSERT INTO `tipovehiculo` (`id`, `nombre`) VALUES
(1, '2 ruedas'),
(2, '4 ruedas'),
(3, '4 ruedas chata');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `idPerfil` int(11) DEFAULT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `DNI` int(11) NOT NULL,
  `Numero` int(11) NOT NULL,
  `eliminado` int(11) NOT NULL DEFAULT 0,
  `fecha` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `idPerfil`, `Nombre`, `Apellido`, `DNI`, `Numero`, `eliminado`, `fecha`) VALUES
(1, 2, 'Tomas', 'Blanco', 44899234, 44899234, 0, '2023-11-07'),
(61, NULL, 'pepe', 'argento', 43225253, 4334243, 0, '2023-11-07'),
(62, NULL, 'feli', 'blanco', 432432, 42343, 1, '2023-11-07'),
(63, NULL, 'el', 'loboooo', 465, 456465, 1, '2023-11-07'),
(64, NULL, 'feli', 'oliva', 918451245, 432443233, 0, '2023-10-07'),
(65, NULL, 'LEO', 'MESSI', 17546121, 353425465, 0, '2023-11-07'),
(66, NULL, 'MONICA', 'ARGENTO', 4556465, 5453435, 0, '2023-11-07'),
(67, NULL, 'Juan', 'Negro', 882882, 654657, 0, '2023-08-07'),
(68, NULL, 'Leonel', 'Messi', 8888888, 353459879, 1, '2023-11-07'),
(69, NULL, 'Kun', 'Aguero', 22223223, 345355, 0, '2023-02-07'),
(70, NULL, 'DARDO', 'FUSENECA', 17171717, 35345655, 0, '2023-11-07'),
(71, NULL, 'pela', 'diablovich', 25151, 3533553, 0, '2023-11-07'),
(72, NULL, 'nacho', 'celiz', 421212, 355645, 0, '2023-11-07'),
(73, NULL, 'julian', 'alvarez', 70203, 354543535, 0, '2023-11-07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

CREATE TABLE `vehiculo` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `IdTipoVehiculo` int(11) DEFAULT NULL,
  `idModelo` int(11) DEFAULT NULL,
  `Patente` varchar(50) NOT NULL,
  `eliminado` int(11) NOT NULL DEFAULT 0,
  `idMarca` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculo`
--

INSERT INTO `vehiculo` (`id`, `idUsuario`, `IdTipoVehiculo`, `idModelo`, `Patente`, `eliminado`, `idMarca`) VALUES
(94, 1, 3, 3, 'dsada', 1, 2),
(96, 1, 2, 1, 'PPP999', 0, 1),
(97, 1, 3, 7, 'KKLKL', 1, 4),
(98, 64, 3, 5, 'NONO', 1, 3),
(99, 1, 2, 2, 'pepe555', 1, 1),
(100, 68, 2, 5, 'MESS1G0DD', 1, 3),
(101, 69, 2, 4, 'KUN1020', 1, 2),
(102, 70, 2, 1, 'PPPP1515', 0, 1),
(103, 70, 3, 4, 'DARd0', 0, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calcularprecio`
--
ALTER TABLE `calcularprecio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idTipoServicio` (`idTipoServicio`),
  ADD KEY `idTipoVehiculo` (`idTipoVehiculo`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `modelo`
--
ALTER TABLE `modelo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idMarca` (`idMarca`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idVehiculo` (`idVehiculo`);

--
-- Indices de la tabla `sxts`
--
ALTER TABLE `sxts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idServicio` (`idServicio`),
  ADD KEY `idTipoServicio` (`idTipoServicio`);

--
-- Indices de la tabla `tiposervicio`
--
ALTER TABLE `tiposervicio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipovehiculo`
--
ALTER TABLE `tipovehiculo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPerfil` (`idPerfil`);

--
-- Indices de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IdTipoVehiculo` (`IdTipoVehiculo`),
  ADD KEY `idModelo` (`idModelo`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idMarca` (`idMarca`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calcularprecio`
--
ALTER TABLE `calcularprecio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `modelo`
--
ALTER TABLE `modelo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `sxts`
--
ALTER TABLE `sxts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tiposervicio`
--
ALTER TABLE `tiposervicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipovehiculo`
--
ALTER TABLE `tipovehiculo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT de la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calcularprecio`
--
ALTER TABLE `calcularprecio`
  ADD CONSTRAINT `calcularprecio_ibfk_1` FOREIGN KEY (`idTipoServicio`) REFERENCES `tiposervicio` (`id`),
  ADD CONSTRAINT `calcularprecio_ibfk_2` FOREIGN KEY (`idTipoVehiculo`) REFERENCES `tipovehiculo` (`id`);

--
-- Filtros para la tabla `modelo`
--
ALTER TABLE `modelo`
  ADD CONSTRAINT `modelo_ibfk_1` FOREIGN KEY (`idMarca`) REFERENCES `marca` (`id`);

--
-- Filtros para la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD CONSTRAINT `servicio_ibfk_2` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculo` (`id`);

--
-- Filtros para la tabla `sxts`
--
ALTER TABLE `sxts`
  ADD CONSTRAINT `sxts_ibfk_1` FOREIGN KEY (`idServicio`) REFERENCES `servicio` (`id`),
  ADD CONSTRAINT `sxts_ibfk_2` FOREIGN KEY (`idTipoServicio`) REFERENCES `tiposervicio` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idPerfil`) REFERENCES `perfil` (`id`);

--
-- Filtros para la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD CONSTRAINT `FK_idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `vehiculo_ibfk_2` FOREIGN KEY (`IdTipoVehiculo`) REFERENCES `tipovehiculo` (`id`),
  ADD CONSTRAINT `vehiculo_ibfk_3` FOREIGN KEY (`idModelo`) REFERENCES `modelo` (`id`),
  ADD CONSTRAINT `vehiculo_ibfk_4` FOREIGN KEY (`idMarca`) REFERENCES `marca` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
