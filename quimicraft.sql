-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-10-2024 a las 02:41:53
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `quimicraft`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `idAdmin` int(11) NOT NULL,
  `nombres` varchar(55) NOT NULL,
  `apellidos` varchar(55) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `dni` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`idAdmin`, `nombres`, `apellidos`, `fechaNacimiento`, `dni`) VALUES
(1, 'Nazarena', 'Garcia', '2024-10-01', 46155300),
(2, 'Ayelen', 'Alva', '2005-10-11', 46155400);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `id_estudiante` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `dni` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`id_estudiante`, `nombre`, `apellido`, `correo`, `fecha_nacimiento`, `dni`) VALUES
(1, 'Elias', 'Tiñuk', 'elias@gmail.com', '2006-05-08', 46155112),
(2, 'Belu', 'Garcia', 'belu@gmail.com', '2005-05-18', 46155113),
(3, 'Camila', 'Martinez', 'camila@gmail.com', '2004-08-10', 46155114),
(4, 'Lucas', 'Lopez', 'lucas@gmail.com', '2005-02-25', 46155115),
(5, 'Mateo', 'Perez', 'mateo@gmail.com', '2003-11-30', 46155116),
(6, 'Sofia', 'Gonzalez', 'sofia@gmail.com', '2004-09-18', 46155117),
(7, 'Dante', 'Rodriguez', 'dante@gmail.com', '2003-03-14', 46155118),
(8, 'Valentina', 'Fernandez', 'valentina@gmail.com', '2005-06-21', 46155119),
(9, 'Lautaro', 'Sanchez', 'lautaro@gmail.com', '2004-12-03', 46155120),
(10, 'Martina', 'Ramirez', 'martina@gmail.com', '2003-07-07', 46155121),
(11, 'Bruno', 'Torres', 'bruno@gmail.com', '2004-10-15', 46155122),
(12, 'Mia', 'Vazquez', 'mia@gmail.com', '2005-08-01', 46155123),
(13, 'Ignacio', 'Castro', 'ignacio@gmail.com', '2003-09-29', 46155124),
(14, 'Julia', 'Romero', 'julia@gmail.com', '2004-01-18', 46155125),
(15, 'Guido', 'Molina', 'guido@gmail.com', '2005-04-27', 46155126),
(16, 'Florencia', 'Silva', 'florencia@gmail.com', '2003-06-12', 46155127),
(17, 'Rodrigo', 'Ortiz', 'rodrigo@gmail.com', '2005-11-02', 46155128),
(18, 'Ayelen', 'Morales', 'ayelen@gmail.com', '2004-05-25', 46155129),
(19, 'Nicolas', 'Herrera', 'nicolas@gmail.com', '2003-10-23', 46155130),
(20, 'Santiago', 'Ruiz', 'santiago@gmail.com', '2004-02-11', 46155131),
(21, 'Lucia', 'Mendoza', 'lucia@gmail.com', '2005-09-19', 46155132),
(22, 'Alejandro', 'Rojas', 'alejandro@gmail.com', '2003-03-03', 46155133),
(23, 'Carla', 'Guerrero', 'carla@gmail.com', '2004-07-05', 46155134),
(24, 'Emilia', 'Nunez', 'emilia@gmail.com', '2005-06-09', 46155135),
(25, 'Ramiro', 'Coronel', 'ramiro@gmail.com', '2003-12-28', 46155136),
(26, 'Luna', 'Gallardo', 'luna@gmail.com', '2004-04-01', 46155137),
(27, 'Maximiliano', 'Ocampo', 'maximiliano@gmail.com', '2005-03-14', 46155138),
(28, 'Daniela', 'Medina', 'daniela@gmail.com', '2004-11-30', 46155139),
(29, 'Gabriel', 'Paz', 'gabriel@gmail.com', '2003-08-17', 46155140),
(30, 'Nadia', 'Benitez', 'nadia@gmail.com', '2005-12-15', 46155141),
(31, 'Milagros', 'Figueroa', 'milagros@gmail.com', '2003-07-25', 46155142),
(32, 'Joaquin', 'Peralta', 'joaquin@gmail.com', '2004-06-13', 46155143),
(33, 'Federico', 'Aguirre', 'federico@gmail.com', '2003-05-21', 46155144),
(34, 'Tatiana', 'Pereyra', 'tatiana@gmail.com', '2005-02-09', 46155145),
(35, 'Nahuel', 'Cabrera', 'nahuel@gmail.com', '2004-10-29', 46155146),
(36, 'Agustina', 'Campos', 'agustina@gmail.com', '2003-01-14', 46155147),
(37, 'Juan', 'Villalba', 'juan@gmail.com', '2005-05-27', 46155148),
(38, 'Antonella', 'Martinez', 'antonella@gmail.com', '2004-09-16', 46155149),
(39, 'Fernando', 'Espinoza', 'fernando@gmail.com', '2003-04-19', 46155150),
(40, 'Marina', 'Diaz', 'marina@gmail.com', '2005-11-06', 46155151),
(41, 'Leandro', 'Quiroga', 'leandro@gmail.com', '2004-03-21', 46155152),
(42, 'Esteban', 'Soria', 'esteban@gmail.com', '2003-12-12', 46155153),
(43, 'Pilar', 'Alvarez', 'pilar@gmail.com', '2004-01-30', 46155154),
(44, 'Carlos', 'Romano', 'carlos@gmail.com', '2005-07-28', 46155155),
(45, 'Magali', 'Bustos', 'magali@gmail.com', '2003-06-04', 46155156),
(46, 'Franco', 'Toledo', 'franco@gmail.com', '2004-12-14', 46155157),
(47, 'Alma', 'Ferreyra', 'alma@gmail.com', '2005-08-03', 46155158),
(48, 'Ezequiel', 'Rosales', 'ezequiel@gmail.com', '2003-02-22', 46155159),
(49, 'Tamara', 'Sosa', 'tamara@gmail.com', '2004-03-17', 46155160),
(50, 'Fabian', 'Cardozo', 'fabian@gmail.com', '2005-10-23', 46155161),
(51, 'Bianca', 'Godoy', 'bianca@gmail.com', '2004-11-11', 46155162);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informacion`
--

CREATE TABLE `informacion` (
  `id_informacion` int(11) NOT NULL,
  `titulo` varchar(200) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `tipo` enum('material','anuncio') DEFAULT NULL,
  `id_profesor` int(11) DEFAULT NULL,
  `fecha_publicacion` date DEFAULT NULL,
  `url_material` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje`
--

CREATE TABLE `mensaje` (
  `id_mensaje` int(11) NOT NULL,
  `id` int(11) DEFAULT NULL,
  `contenido` text DEFAULT NULL,
  `fecha_envio` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
  `id_profesor` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `dni` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`id_profesor`, `nombre`, `apellido`, `correo`, `dni`) VALUES
(1, 'Maxi', 'Gomez', 'maxi@gmail.com', 46155200),
(2, 'Luciana', 'Perez', 'luciana@gmail.com', 46155201),
(3, 'Martin', 'Fernandez', 'martin@gmail.com', 46155202),
(4, 'Silvia', 'Lopez', 'silvia@gmail.com', 46155203),
(5, 'Federico', 'Martinez', 'federico@gmail.com', 46155204),
(6, 'Laura', 'Rodriguez', 'laura@gmail.com', 46155205),
(7, 'Gonzalo', 'Sanchez', 'gonzalo@gmail.com', 46155206),
(8, 'Cecilia', 'Ramirez', 'cecilia@gmail.com', 46155207),
(9, 'Hernan', 'Torres', 'hernan@gmail.com', 46155208),
(10, 'Mariana', 'Silva', 'mariana@gmail.com', 46155209),
(11, 'Rodrigo', 'Ortiz', 'rodrigo@gmail.com', 46155210),
(12, 'Paula', 'Morales', 'paula@gmail.com', 46155211),
(13, 'Sebastian', 'Herrera', 'sebastian@gmail.com', 46155212),
(14, 'Gabriela', 'Ruiz', 'gabriela@gmail.com', 46155213),
(15, 'Carlos', 'Mendoza', 'carlos@gmail.com', 46155214),
(16, 'Valeria', 'Rojas', 'valeria@gmail.com', 46155215),
(17, 'Marcos', 'Guerrero', 'marcos@gmail.com', 46155216),
(18, 'Romina', 'Molina', 'romina@gmail.com', 46155217),
(19, 'Pablo', 'Castro', 'pablo@gmail.com', 46155218),
(20, 'Lucia', 'Vazquez', 'lucia@gmail.com', 46155219),
(21, 'Miguel', 'Paz', 'miguel@gmail.com', 46155220),
(22, 'Natalia', 'Benitez', 'natalia@gmail.com', 46155221),
(23, 'Diego', 'Figueroa', 'diego@gmail.com', 46155222),
(24, 'Veronica', 'Peralta', 'veronica@gmail.com', 46155223),
(25, 'Sergio', 'Aguirre', 'sergio@gmail.com', 46155224),
(26, 'Patricia', 'Pereyra', 'patricia@gmail.com', 46155225),
(27, 'Rafael', 'Cabrera', 'rafael@gmail.com', 46155226),
(28, 'Cristina', 'Campos', 'cristina@gmail.com', 46155227),
(29, 'Agustin', 'Villalba', 'agustin@gmail.com', 46155228),
(30, 'Claudia', 'Espinoza', 'claudia@gmail.com', 46155229);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipousuario`
--

CREATE TABLE `tipousuario` (
  `idTipoUsuario` int(11) NOT NULL,
  `descripcion` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tipousuario`
--

INSERT INTO `tipousuario` (`idTipoUsuario`, `descripcion`) VALUES
(1, 'admin'),
(2, 'profesor'),
(3, 'estudiante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(55) NOT NULL,
  `apellido` varchar(55) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contrasenia` varchar(255) NOT NULL,
  `id_rela_tipo_usuario` int(11) NOT NULL,
  `dni` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `usuario`, `correo`, `contrasenia`, `id_rela_tipo_usuario`, `dni`) VALUES
(1, 'naza', 'garcia', 'naza', 'naza@gmail.com', '$2b$10$y6NCL3H8MxykBPSAmbqfcORyPYE4HnVDGL2RngXABfrufYEOzo/0C', 1, 0),
(2, 'naza', 'garcia', 'naza', 'nazagarcia@gmail.com', '$2b$10$ANYmwccd9I2t6Q/23TifEuPUEnQV7hS2ZmMrkouGCWTEWaYzV0.7W', 1, 0),
(3, 'naza', 'garcia', 'admin', 'admin@gmail.com', '$2b$10$m0d3US.QjmE40PfgiAQ0j.ipISBwfph8FJU4vAu1JTqhhFnrC7156', 2, 0),
(4, 'naza', 'garcia', 'student', 'student@gmail.com', '$2b$10$D/T2O955e7p7OPXePAnhtORiwfR6PiI.WLUZ2bpSMwVxDj/LNRiZG', 2, 0),
(5, 'naza', 'garcia', 'profesor', 'profesor@gmail.com', '$2b$10$w44rZiIUCoBtv2j7XwWu.e3yF/oxdzOK89xGv61CE3rpI7QqUpODa', 2, 0),
(6, 'nazaa', 'garciaa', 'adminUno', 'admin@gmail.com', '$2b$10$ZwWIbA7FJ45PrSDayef0M.RyyVvGNtiol7aUUgR3o0L0bUBBGBaRG', 1, 0),
(7, 'naza', 'garcia', 'estudiante', 'estudiante@gmail.com', '$2b$10$6BhUyjUjJR5BxSMAZqmxyurJg.DStCzveDqfNgqOSJWPnfJplIkAO', 3, 0),
(8, 'juancho', 'tobias', 'juantobi', 'tobi@napoli.polo.com', '$2b$10$oCbyDx.v6emnv1ZsB2/Lfef6YONFNbwLmZJ2pgfEmLLRcDMBOEjRK', 1, 0),
(9, 'mirko', 'mirko', 'mirko', 'mirko@gmail.com', '$2b$10$4D4.YsM4puXZ18FlajesX.kaiPh9cQrYmrjX1phqXP7hvK/KbWu7W', 2, 0),
(10, 'belu', 'garcia', 'belu', 'belu@gmail.com', '$2b$10$d61udCps3R/6BKLKOiVMtOdX2Kmybfh.hm1K1lJPoAmaEOhceuck2', 3, 0),
(11, 'naza', 'naza', 'adminn', 'admin@gmail.com', '$2b$10$vVayfGnfWHoD59VfAu0iGeU4tZPf08r8T7Z69I4CpIMeVWoX35a1G', 1, 0),
(12, 'naza', 'naza', 'nazaProf', 'nazaprofe@gmail.com', '$2b$10$FvnpmsPyJ1MqhoZGaThpLenAaCJ.UnxIDPOe9UusHuMdh.zu2D0Ay', 2, 0),
(13, 'teo', 'garcia', 'teo', 'teo@gmail.com', '$2b$10$A8A.pO3yZTG1PDsi74iVxeJgWHZvmjUScC0kEct9pEQgTTHv8XVUS', 3, 0),
(14, 'profesor', 'profesor', 'profesor', 'profesor@gmai.com', '$2b$10$taJ9LHWo7crn.6laj1WIke2.NF9Jf.3DGiq8BqnfQ7tGnayArgmje', 2, 0),
(15, 'camila', 'garcia', 'camila', 'camilugarcia7@gmail.com', '$2b$10$PU1qVDT6kWRWd7PCAB5XMOEAW1i7WPwPGLgQHrbKisaT8MdVyyQ2K', 3, 0),
(17, 'elias', 'tiñuk', 'elias', 'elias@gmail.com', '$2b$10$bYTzp/qdFGRvOzxf6qKX8.BBLKRg4jUHAt.vBssfprYBtQeEmaIN.', 3, 46155112),
(18, 'beluu', 'garcia', 'beluu', 'belu@gmail.com', '$2b$10$TaLAiIpVXPafgTHgLXqKMeAuewwctRUQPnLw8F6bwes9/7sA6JKbC', 3, 46155113),
(20, 'maxi', 'gomez', 'maxi', 'maxi@gmail.com', '$2b$10$cP.s0G7TlDiFhj0NQiOTieuVbj3zDe1eaMzEr20eyH4FAdYm7RQ1y', 2, 46155200),
(21, 'camila', 'martinez', 'cami', 'cami@gmail.com', '$2b$10$iiiu74s27.bPTTFh0wjP/OfHsDDPQidb/qm/iD/AzakNCk/OyeuZC', 3, 46155114),
(22, 'nazarena', 'garcia', 'nazarena', 'nazaaagarcia@gmail.com', '$2b$10$yFSZDSs.ncEt.c61nleqiuBPz06MvQtV5zmSe2n9y8Otv82//cns6', 1, 46155300);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`idAdmin`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id_estudiante`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `informacion`
--
ALTER TABLE `informacion`
  ADD PRIMARY KEY (`id_informacion`),
  ADD KEY `id_profesor` (`id_profesor`);

--
-- Indices de la tabla `mensaje`
--
ALTER TABLE `mensaje`
  ADD PRIMARY KEY (`id_mensaje`),
  ADD KEY `id` (`id`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD PRIMARY KEY (`id_profesor`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
  ADD PRIMARY KEY (`idTipoUsuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `id_estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `informacion`
--
ALTER TABLE `informacion`
  MODIFY `id_informacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mensaje`
--
ALTER TABLE `mensaje`
  MODIFY `id_mensaje` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `profesor`
--
ALTER TABLE `profesor`
  MODIFY `id_profesor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `tipousuario`
--
ALTER TABLE `tipousuario`
  MODIFY `idTipoUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `informacion`
--
ALTER TABLE `informacion`
  ADD CONSTRAINT `informacion_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `profesor` (`id_profesor`);

--
-- Filtros para la tabla `mensaje`
--
ALTER TABLE `mensaje`
  ADD CONSTRAINT `mensaje_ibfk_1` FOREIGN KEY (`id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
