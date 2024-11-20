-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-11-2024 a las 19:54:19
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
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `description`, `created_at`) VALUES
(1, 'General', 'Espacio para temas generales relacionados con la química, presentaciones, anuncios y novedades.', '2024-11-15 14:21:25'),
(2, 'Clases y Material de Estudio', 'Discusión sobre el contenido de las clases, recursos de estudio, guías, apuntes y libros recomendados.', '2024-11-15 14:21:25'),
(3, 'Laboratorios y Experimentos', 'Foro dedicado a la discusión de prácticas de laboratorio, procedimientos experimentales, problemas y soluciones en el laboratorio de química.', '2024-11-15 14:21:25'),
(4, 'Química Orgánica', 'Debate sobre conceptos, reacciones, mecanismos y ejercicios relacionados con la química orgánica.', '2024-11-15 14:21:25'),
(5, 'Química Inorgánica', 'Discusión sobre la química de compuestos inorgánicos, estructuras, reacciones y principios fundamentales.', '2024-11-15 14:21:25'),
(6, 'Química Analítica', 'Espacio para discutir métodos de análisis, técnicas instrumentales, y resolución de problemas de química analítica.', '2024-11-15 14:21:25'),
(7, 'Química Física', 'Foro para profundizar en las bases físicas de los procesos químicos, termodinámica, cinética y química cuántica.', '2024-11-15 14:21:25'),
(8, 'Investigación y Proyectos', 'Espacio para compartir y discutir proyectos de investigación, trabajos finales, prácticas de investigación y avances en el campo de la química.', '2024-11-15 14:21:25'),
(9, 'Técnicas de Laboratorio', 'Debate sobre las técnicas más comunes en los laboratorios de química, como la titulación, espectrometría, cromatografía, etc.', '2024-11-15 14:21:25'),
(10, 'Tareas y Exámenes', 'Ayuda con tareas, exámenes y problemas prácticos, compartición de soluciones y estrategias de estudio.', '2024-11-15 14:21:25'),
(11, 'Eventos y Actividades', 'Anuncios sobre congresos, seminarios, conferencias, concursos y otras actividades relacionadas con la química.', '2024-11-15 14:21:25'),
(12, 'Química Ambiental', 'Espacio para discutir temas sobre química ambiental, procesos contaminantes, sostenibilidad y la química en el contexto del medio ambiente.', '2024-11-15 14:21:25'),
(13, 'Química Farmacéutica', 'Debate sobre la química relacionada con la industria farmacéutica, medicamentos, formulaciones y su impacto en la salud.', '2024-11-15 14:21:25'),
(14, 'Dudas y Consultas', 'Espacio donde los estudiantes pueden hacer preguntas y buscar respuestas a dudas específicas sobre la química o su curso.', '2024-11-15 14:21:25'),
(15, 'Foro Social', 'Un lugar para los estudiantes de química para interactuar de manera más informal, compartir intereses comunes, experiencias y hacer amigos.', '2024-11-15 14:21:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comment_likes`
--

CREATE TABLE `comment_likes` (
  `like_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comment_replies`
--

CREATE TABLE `comment_replies` (
  `reply_id` int(11) NOT NULL,
  `parent_comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `elements`
--

CREATE TABLE `elements` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `symbol` varchar(5) NOT NULL,
  `number` int(11) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `xpos` int(11) DEFAULT NULL,
  `ypos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `elements`
--

INSERT INTO `elements` (`id`, `name`, `symbol`, `number`, `category`, `xpos`, `ypos`) VALUES
(1, 'Hidrógeno', 'H', 1, 'nonmetal', 1, 1),
(2, 'Helio', 'He', 2, 'noble gas', 18, 1),
(3, 'Litio', 'Li', 3, 'alkali metal', 1, 2),
(4, 'Berilio', 'Be', 4, 'alkaline earth metal', 2, 2),
(5, 'Boro', 'B', 5, 'metalloid', 13, 2),
(6, 'Carbono', 'C', 6, 'nonmetal', 14, 2),
(7, 'Nitrógeno', 'N', 7, 'nonmetal', 15, 2),
(8, 'Oxígeno', 'O', 8, 'nonmetal', 16, 2),
(9, 'Flúor', 'F', 9, 'halogen', 17, 2),
(10, 'Neón', 'Ne', 10, 'noble gas', 18, 2),
(11, 'Sodio', 'Na', 11, 'Alkali metal', 1, 3),
(12, 'Magnesio', 'Mg', 12, 'Alkaline earth metal', 2, 3),
(13, 'Aluminio', 'Al', 13, 'Post-transition metal', 13, 3),
(14, 'Silicio', 'Si', 14, 'Metalloid', 14, 3),
(15, 'Fósforo', 'P', 15, 'Nonmetal', 15, 3),
(16, 'Azufre', 'S', 16, 'Nonmetal', 16, 3),
(17, 'Cloro', 'Cl', 17, 'Halogen', 17, 3),
(18, 'Argón', 'Ar', 18, 'Noble gas', 18, 3),
(19, 'Potasio', 'K', 19, 'Alkali metal', 1, 4),
(20, 'Calcio', 'Ca', 20, 'Alkaline earth metal', 2, 4),
(21, 'Escandio', 'Sc', 21, 'Transition metal', 3, 4),
(22, 'Titanio', 'Ti', 22, 'Transition metal', 4, 4),
(23, 'Vanadio', 'V', 23, 'Transition metal', 5, 4),
(24, 'Cromo', 'Cr', 24, 'Transition metal', 6, 4),
(25, 'Manganeso', 'Mn', 25, 'Transition metal', 7, 4),
(26, 'Hierro', 'Fe', 26, 'Transition metal', 8, 4),
(27, 'Cobalto', 'Co', 27, 'Transition metal', 9, 4),
(28, 'Niquel', 'Ni', 28, 'Transition metal', 10, 4),
(29, 'Cobre', 'Cu', 29, 'Transition metal', 11, 4),
(30, 'Zinc', 'Zn', 30, 'Transition metal', 12, 4),
(31, 'Galio', 'Ga', 31, 'Post-transition metal', 13, 4),
(32, 'Germanio', 'Ge', 32, 'Metalloid', 14, 4),
(33, 'Arsénico', 'As', 33, 'Metalloid', 15, 4),
(34, 'Selenio', 'Se', 34, 'Nonmetal', 16, 4),
(35, 'Bromo', 'Br', 35, 'Halogen', 17, 4),
(36, 'Kriptón', 'Kr', 36, 'Noble gas', 18, 4),
(37, 'Rubidio', 'Rb', 37, 'Alkali metal', 1, 5),
(38, 'Estroncio', 'Sr', 38, 'Alkaline earth metal', 2, 5),
(39, 'Itrio', 'Y', 39, 'Transition metal', 3, 5),
(40, 'Zirconio', 'Zr', 40, 'Transition metal', 4, 5),
(41, 'Niobio', 'Nb', 41, 'Transition metal', 5, 5),
(42, 'Molibdeno', 'Mo', 42, 'Transition metal', 6, 5),
(43, 'Tecnecio', 'Tc', 43, 'Transition metal', 7, 5),
(44, 'Rutenio', 'Ru', 44, 'Transition metal', 8, 5),
(45, 'Rodio', 'Rh', 45, 'Transition metal', 9, 5),
(46, 'Paladio', 'Pd', 46, 'Transition metal', 10, 5),
(47, 'Plata', 'Ag', 47, 'Transition metal', 11, 5),
(48, 'Cadmio', 'Cd', 48, 'Transition metal', 12, 5),
(49, 'Indio', 'In', 49, 'Post-transition metal', 13, 5),
(50, 'Estaño', 'Sn', 50, 'Post-transition metal', 14, 5),
(51, 'Antimonio', 'Sb', 51, 'Metalloid', 15, 5),
(52, 'Telurio', 'Te', 52, 'Metalloid', 16, 5),
(53, 'Yodo', 'I', 53, 'Halogen', 17, 5),
(54, 'Xenón', 'Xe', 54, 'Noble gas', 18, 5),
(55, 'Cesio', 'Cs', 55, 'Alkali metal', 1, 6),
(56, 'Bario', 'Ba', 56, 'Alkaline earth metal', 2, 6),
(57, 'Lantano', 'La', 57, 'Lanthanide', 3, 9),
(58, 'Cerio', 'Ce', 58, 'Lanthanide', 4, 9),
(59, 'Praseodimio', 'Pr', 59, 'Lanthanide', 5, 9),
(60, 'Neodimio', 'Nd', 60, 'Lanthanide', 6, 9),
(61, 'Prometio', 'Pm', 61, 'Lanthanide', 7, 9),
(62, 'Samario', 'Sm', 62, 'Lanthanide', 8, 9),
(63, 'Europio', 'Eu', 63, 'Lanthanide', 9, 9),
(64, 'Gadolinio', 'Gd', 64, 'Lanthanide', 10, 9),
(65, 'Terbio', 'Tb', 65, 'Lanthanide', 11, 9),
(66, 'Disprosio', 'Dy', 66, 'Lanthanide', 12, 9),
(67, 'Holmio', 'Ho', 67, 'Lanthanide', 13, 9),
(68, 'Erbio', 'Er', 68, 'Lanthanide', 14, 9),
(69, 'Tulio', 'Tm', 69, 'Lanthanide', 15, 9),
(70, 'Ytterbio', 'Yb', 70, 'Lanthanide', 16, 9),
(71, 'Lutecio', 'Lu', 71, 'Lanthanide', 17, 9),
(72, 'Hafnio', 'Hf', 72, 'Transition metal', 4, 6),
(73, 'Tántalo', 'Ta', 73, 'Transition metal', 5, 6),
(74, 'Wolframio', 'W', 74, 'Transition metal', 6, 6),
(75, 'Renio', 'Re', 75, 'Transition metal', 7, 6),
(76, 'Osmio', 'Os', 76, 'Transition metal', 8, 6),
(77, 'Iridio', 'Ir', 77, 'Transition metal', 9, 6),
(78, 'Platino', 'Pt', 78, 'Transition metal', 10, 6),
(79, 'Oro', 'Au', 79, 'Transition metal', 11, 6),
(80, 'Mercurio', 'Hg', 80, 'Transition metal', 12, 6),
(81, 'Talio', 'Tl', 81, 'Post-transition metal', 13, 6),
(82, 'Plomo', 'Pb', 82, 'Post-transition metal', 14, 6),
(83, 'Bismuto', 'Bi', 83, 'Post-transition metal', 15, 6),
(84, 'Polonio', 'Po', 84, 'Metalloid', 16, 6),
(85, 'Astato', 'At', 85, 'Halogen', 17, 6),
(86, 'Radón', 'Rn', 86, 'Noble gas', 18, 6),
(87, 'Francio', 'Fr', 87, 'Alkali metal', 1, 7),
(88, 'Radio', 'Ra', 88, 'Alkaline earth metal', 2, 7),
(89, 'Actinio', 'Ac', 89, 'Actinide', 3, 10),
(90, 'Torio', 'Th', 90, 'Actinide', 4, 10),
(91, 'Protactinio', 'Pa', 91, 'Actinide', 5, 10),
(92, 'Uranio', 'U', 92, 'Actinide', 6, 10),
(93, 'Neptunio', 'Np', 93, 'Actinide', 7, 10),
(94, 'Plutonio', 'Pu', 94, 'Actinide', 8, 10),
(95, 'Americio', 'Am', 95, 'Actinide', 9, 10),
(96, 'Curio', 'Cm', 96, 'Actinide', 10, 10),
(97, 'Berkelio', 'Bk', 97, 'Actinide', 11, 10),
(98, 'Californio', 'Cf', 98, 'Actinide', 12, 10),
(99, 'Einstenio', 'Es', 99, 'Actinide', 13, 10),
(100, 'Fermio', 'Fm', 100, 'Actinide', 14, 10),
(101, 'Mendelevio', 'Md', 101, 'Actinide', 15, 10),
(102, 'Nobelio', 'No', 102, 'Actinide', 16, 10),
(103, 'Laurencio', 'Lr', 103, 'Actinide', 17, 10),
(104, 'Rutherfordio', 'Rf', 104, 'Transition metal', 4, 7),
(105, 'Dubnio', 'Db', 105, 'Transition metal', 5, 7),
(106, 'Seaborgio', 'Sg', 106, 'Transition metal', 6, 7),
(107, 'Bohrio', 'Bh', 107, 'Transition metal', 7, 7),
(108, 'Hassio', 'Hs', 108, 'Transition metal', 8, 7),
(109, 'Meitnerio', 'Mt', 109, 'Transition metal', 9, 7),
(110, 'Darmstatio', 'Ds', 110, 'Transition metal', 10, 7),
(111, 'Roentgenio', 'Rg', 111, 'Transition metal', 11, 7),
(112, 'Copernicio', 'Cn', 112, 'Post-transition metal', 12, 7),
(113, 'Nihonio', 'Nh', 113, 'Post-transition metal', 13, 7),
(114, 'Flerovio', 'Fl', 114, 'Post-transition metal', 14, 7),
(115, 'Moscovio', 'Mc', 115, 'Post-transition metal', 15, 7),
(116, 'Livermorio', 'Lv', 116, 'Post-transition metal', 16, 7),
(117, 'Tenesino', 'Ts', 117, 'Halogen', 17, 7),
(118, 'Oganesón', 'Og', 118, 'Noble gas', 18, 7),
(119, 'Unununio', 'Uue', 119, 'Alkali metal', 1, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `element_details`
--

CREATE TABLE `element_details` (
  `id` int(11) NOT NULL,
  `element_id` int(11) NOT NULL,
  `discovery_description` text NOT NULL,
  `name_origin` text NOT NULL,
  `symbol_meaning` text NOT NULL,
  `periodic_law_description` text NOT NULL,
  `periodic_table_evolution` text NOT NULL,
  `electronic_configuration` text NOT NULL,
  `density` decimal(10,2) NOT NULL,
  `melting_point` decimal(10,2) NOT NULL,
  `boiling_point` decimal(10,2) NOT NULL,
  `conductivity` text NOT NULL,
  `isotopes` text NOT NULL,
  `valence` int(11) NOT NULL,
  `reactivity` text NOT NULL,
  `typical_compounds` text NOT NULL,
  `industrial_uses` text NOT NULL,
  `everyday_uses` text NOT NULL,
  `environmental_impact` text NOT NULL,
  `image` longblob NOT NULL,
  `protons` int(11) NOT NULL,
  `electrons` int(11) NOT NULL,
  `neutrons` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `element_details`
--

INSERT INTO `element_details` (`id`, `element_id`, `discovery_description`, `name_origin`, `symbol_meaning`, `periodic_law_description`, `periodic_table_evolution`, `electronic_configuration`, `density`, `melting_point`, `boiling_point`, `conductivity`, `isotopes`, `valence`, `reactivity`, `typical_compounds`, `industrial_uses`, `everyday_uses`, `environmental_impact`, `image`, `protons`, `electrons`, `neutrons`) VALUES
(1, 1, 'El hidrógeno fue descubierto en 1766 por Henry Cavendish, quien lo identificó como un gas inflamable al reaccionar con metales.', 'Su nombre proviene del griego \"hydor\" que significa \"agua\", ya que al quemarlo produce agua.', 'Hidrógeno proviene del griego \"hydro\" que significa agua, debido a que al quemarlo forma agua.', 'El hidrógeno, al ser el elemento más ligero, es crucial para la comprensión de la química y la formación del universo.', 'Es el primer elemento en la tabla periódica y el más abundante en el universo.', '1s1', 0.00, -259.16, -252.87, 'Muy pobre', 'Ningún isótopo estable', 1, 'Extremadamente reactivo, especialmente con oxígeno.', 'Agua (H2O), Ácido clorhídrico (HCl)', 'Usos en la industria de la energía (como combustible), producción de amoníaco, y propulsores.', 'Usado en la industria de cohetes, y en la producción de combustibles limpios como el hidrógeno para pilas de combustible.', 'El hidrógeno es el principal componente de las estrellas y su reactividad contribuye a procesos químicos en la atmósfera.', 0x696d6167655f75726c, 1, 1, 0),
(2, 2, 'El helio fue descubierto en 1868 por el astrónomo Pierre Janssen, observando una línea amarilla en el espectro solar.', 'Su nombre proviene del griego \"Helios\", que significa \"sol\".', 'El símbolo He proviene del nombre griego Helios (Sol), debido a su presencia en el sol.', 'Helio es un gas noble, inerte y no reactivo. Es el segundo elemento más abundante en el universo.', 'Se encuentra en la tabla periódica como un gas noble y forma parte de los elementos con capas de electrones completas.', '1s2', 0.00, -272.20, -268.93, 'Muy malo', 'He-3, He-4', 0, 'Inerte, no reacciona con otros elementos.', 'Ninguno en particular', 'Se utiliza como refrigerante en superconductores, en la industria de la criogenia, y en globos de helio.', 'En la medicina para obtener imágenes por resonancia magnética, y en la NASA para la refrigeración de cohetes.', 'Es ambientalmente seguro, ya que no reacciona fácilmente y se encuentra en concentraciones bajas en la atmósfera.', 0x696d6167655f75726c, 2, 2, 2),
(3, 3, 'El litio fue descubierto en 1817 por Johan August Arfvedson en minerales de espodumeno.', 'Su nombre proviene del griego \"lithos\", que significa \"piedra\".', 'El símbolo Li proviene de la palabra griega para piedra, ya que se descubrió en un mineral.', 'Es un metal alcalino que reacciona fácilmente con el agua y el oxígeno, utilizado en baterías recargables.', 'El litio ocupa el tercer lugar en la tabla periódica y es conocido por su baja densidad y su capacidad para liberar energía.', '1s2 2s1', 0.53, 180.54, 1590.00, 'Bueno', 'Li-6, Li-7', 1, 'Muy reactivo con agua, forma hidróxido de litio (LiOH).', 'Carbonato de litio (Li2CO3)', 'Se usa en baterías de ion-litio, en la fabricación de cerámica, y como tratamiento para trastornos psiquiátricos.', 'Baterías recargables, tratamiento de trastornos bipolares, y en la fabricación de aleaciones.', 'El litio tiene un bajo impacto ambiental, pero la minería y el procesamiento de litio pueden causar daños ecológicos.', 0x696d6167655f75726c, 3, 3, 4),
(4, 4, 'El berilio fue descubierto en 1798 por Louis-Nicolas Vauquelin en un mineral de berilo.', 'Su nombre proviene del mineral berilo, del cual fue extraído por primera vez.', 'El símbolo Be proviene de su nombre en griego, \"beryllos\".', 'El berilio es un metal alcalinotérreo que es fuerte, pero ligero, utilizado en aleaciones para mejorar su resistencia.', 'El berilio ocupa el cuarto lugar en la tabla periódica y es conocido por su capacidad para formar compuestos muy estables.', '1s2 2s2', 1.85, 1278.00, 2471.00, 'Bueno', 'Be-9', 2, 'Bajo en reactividad, aunque forma compuestos con halógenos.', 'Óxido de berilio (BeO)', 'Usado en la fabricación de materiales de alta resistencia, en la industria aeroespacial y en dispositivos electrónicos.', 'Usos en componentes de aviones, satélites, y equipos de energía nuclear.', 'El berilio puede ser tóxico cuando se inhala como polvo o vapor, por lo que se requiere manejo adecuado.', 0x696d6167655f75726c, 4, 4, 5),
(5, 5, 'El boro fue descubierto en 1808 por Sir Humphry Davy y Joseph Louis Gay-Lussac.', 'Su nombre proviene del árabe \"buraq\", que significa \"borra\", un mineral que contiene boro.', 'El símbolo B proviene de la palabra \"borax\", un mineral que contiene boro.', 'El boro es un metaloide que se utiliza en una variedad de compuestos, como el ácido bórico y el borato.', 'El boro ocupa el quinto lugar en la tabla periódica y se utiliza ampliamente en la fabricación de vidrios y productos cerámicos.', '1s2 2s2 2p1', 2.34, 2076.00, 3927.00, 'Moderado', 'B-10, B-11', 3, 'Bajo en reactividad, pero reacciona con metales y halógenos.', 'Ácido bórico (H3BO3)', 'Usos en detergentes, vidrios, y en la fabricación de productos de limpieza.', 'Baterías de alta capacidad, en la industria del vidrio, y en la fabricación de insecticidas.', 'El boro tiene un bajo impacto ambiental, aunque algunos compuestos de boro pueden ser tóxicos en grandes concentraciones.', 0x696d6167655f75726c, 5, 5, 6),
(6, 6, 'El carbono fue descubierto por los antiguos griegos que lo usaban como carbón vegetal en 375 a.C. Fue aislado en su forma pura en 1772 por Antoine Lavoisier.', 'El nombre carbono proviene del latín \"carbo\", que significa \"carbón\".', 'El símbolo C proviene de la palabra latina \"carbo\", que significa carbón.', 'El carbono es un elemento fundamental para la vida en la Tierra y forma la base de toda la química orgánica.', 'El carbono es el sexto elemento en la tabla periódica, conocido por sus formas alotrópicas como diamante, grafito y grafeno.', '1s2 2s2 2p2', 2.27, 3550.00, 4827.00, 'Bueno', 'C-12, C-13, C-14', 4, 'Reacciona con muchos elementos para formar compuestos orgánicos.', 'Dióxido de carbono (CO2)', 'Usado en la producción de acero, en la fabricación de plásticos y en la química orgánica.', 'Es esencial en la fotosíntesis y en la producción de combustibles derivados del carbono.', 'El carbono tiene un impacto ambiental principalmente por la emisión de CO2 en la atmósfera, contribuyendo al cambio climático.', 0x696d6167655f75726c, 6, 6, 6),
(7, 7, 'El nitrógeno fue descubierto en 1772 por Daniel Rutherford al aislarlo del aire.', 'Su nombre proviene del griego \"nitron\" (salitre) y \"genes\" (productor), porque fue identificado en el aire.', 'El símbolo N proviene de la palabra griega \"nitron\".', 'El nitrógeno es un gas incoloro e inodoro que compone el 78% del aire y es esencial para la vida.', 'El nitrógeno es el séptimo elemento en la tabla periódica y es crucial en la formación de proteínas y ácidos nucleicos.', '1s2 2s2 2p3', 1.25, -209.86, -195.79, 'Excelente', 'N-14, N-15', 5, 'Muy reactivo en forma de compuestos nitrogenados.', 'Óxidos de nitrógeno (NOx)', 'Usado en fertilizantes, explosivos y en la producción de amoníaco.', 'Fertilizantes, alimentos, en la industria química y en la fabricación de plásticos.', 'El nitrógeno tiene un bajo impacto ambiental, aunque sus compuestos pueden contribuir a la contaminación del aire.', 0x696d6167655f75726c, 7, 7, 7),
(8, 8, 'El oxígeno fue descubierto en 1774 por Joseph Priestley y Carl Wilhelm Scheele de manera independiente.', 'Su nombre proviene del griego \"oxys\" (ácido) y \"genes\" (productor), ya que se pensaba que el oxígeno era esencial para formar ácidos.', 'El símbolo O proviene de la palabra griega \"oxys\".', 'El oxígeno es un gas vital para la respiración de la mayoría de los organismos en la Tierra.', 'El oxígeno es el octavo elemento en la tabla periódica y es indispensable para la respiración celular y la combustión.', '1s2 2s2 2p4', 0.00, -218.79, -182.96, 'Excelente', 'O-16, O-17, O-18', 2, 'Muy reactivo, especialmente con metales y no metales.', 'Óxidos, agua (H2O)', 'Uso en la respiración, la combustión y en procesos industriales como la fabricación de acero.', 'En la medicina para respiración, en la industria para combustión y en cohetes.', 'El oxígeno tiene un impacto ambiental positivo al ser esencial para la vida, pero la contaminación por óxidos de nitrógeno puede ser un problema.', 0x696d6167655f75726c, 8, 8, 8),
(9, 9, 'El flúor fue descubierto en 1886 por Henri Moissan, quien lo aisló por primera vez en su forma elemental.', 'El nombre proviene del latín \"fluere\", que significa \"fluir\", ya que el flúor se encuentra en minerales que se disuelven con facilidad.', 'El símbolo F proviene de la palabra \"fluere\".', 'El flúor es un gas reactivo utilizado principalmente para hacer compuestos como los fluorocarbonos.', 'El flúor es el noveno elemento en la tabla periódica y es el más reactivo de todos los halógenos.', '1s2 2s2 2p5', 1.70, -219.67, -188.12, 'Excelente', 'F-19', 1, 'Altamente reactivo, especialmente con hidrógeno y metales.', 'Fluoruro de sodio (NaF)', 'Usado en la producción de materiales para tratar agua potable y en la fabricación de pasta dental.', 'En la industria química, en la fabricación de gases refrigerantes y en materiales sintéticos.', 'El flúor tiene impactos ambientales negativos debido a su alta toxicidad y efectos corrosivos en el agua.', 0x696d6167655f75726c, 9, 9, 10),
(10, 10, 'El neón fue descubierto en 1898 por los químicos británicos Morris Travers y Sir William Ramsay.', 'El nombre proviene del griego \"neos\", que significa \"nuevo\".', 'El símbolo Ne proviene de la palabra griega \"neos\".', 'El neón es un gas noble incoloro e inodoro que emite una luz brillante cuando se electrifica.', 'El neón es el décimo elemento en la tabla periódica y se encuentra en las lámparas de neón utilizadas en la publicidad.', '1s2 2s2 2p6', 0.00, -248.59, -246.05, 'Muy malo', 'Ne-20, Ne-21, Ne-22', 0, 'Inerte, no reacciona fácilmente con otros elementos.', 'Ningún compuesto típico', 'Se usa en la fabricación de letreros luminosos y en la criogenia.', 'En la industria de la publicidad, y en la tecnología de lámparas de neón.', 'El neón tiene un impacto ambiental mínimo, debido a su inactividad química y baja concentración en la atmósfera.', 0x696d6167655f75726c, 10, 10, 10),
(11, 11, 'El sodio fue descubierto en 1807 por Humphry Davy mediante la electrólisis de la sosa.', 'Su nombre proviene del árabe \"natrun\", que significa \"sosa\".', 'El símbolo Na proviene de la palabra latina \"natron\", que significa sosa.', 'El sodio es un metal alcalino altamente reactivo, utilizado en la fabricación de sales y productos químicos.', 'El sodio es el undécimo elemento en la tabla periódica y se encuentra comúnmente en compuestos como la sal común.', '1s2 2s2 2p6 3s1', 0.97, 97.72, 883.00, 'Bueno', 'Na-23', 1, 'Extremadamente reactivo, especialmente con agua.', 'Cloruro de sodio (NaCl)', 'Usado en la fabricación de vidrio, jabones, y en la industria química.', 'En la producción de sal, detergentes y como agente fundente en procesos industriales.', 'El sodio tiene un impacto ambiental debido a su uso en sal y su impacto en ecosistemas marinos cuando se utiliza en exceso.', 0x696d6167655f75726c, 11, 11, 12),
(12, 12, 'El magnesio fue descubierto en 1808 por Joseph Black, quien lo aisló a partir de agua de mar.', 'Su nombre proviene del griego \"Magnesia\", una región de Tesalia donde se encontró el mineral.', 'El símbolo Mg proviene del nombre de la región griega Magnesia.', 'El magnesio es un metal alcalinotérreo ligero y altamente reactivo con el agua.', 'El magnesio es el duodécimo elemento de la tabla periódica y es esencial en varios procesos biológicos.', '1s2 2s2 2p6 3s2', 1.74, 650.00, 1090.00, 'Bueno', 'Mg-24', 2, 'Reacciona fácilmente con oxígeno y agua, formando óxidos.', 'Óxido de magnesio (MgO)', 'Usado en la fabricación de aleaciones ligeras y en la industria de la construcción.', 'En la industria química, en la producción de acero y en la fabricación de componentes electrónicos.', 'El magnesio tiene un impacto ambiental moderado, especialmente en la extracción de recursos minerales.', 0x696d6167655f75726c, 12, 12, 12),
(13, 13, 'El aluminio fue descubierto en 1825 por Hans Christian Ørsted y aislado por primera vez en 1827 por Friedrich Wöhler.', 'Su nombre proviene del latín \"alumen\", que significa \"alumbre\", un mineral en el que se encuentra.', 'El símbolo Al proviene de la palabra latina \"alumen\".', 'El aluminio es un metal ligero, utilizado en una amplia variedad de aplicaciones industriales.', 'El aluminio es el decimotercer elemento de la tabla periódica y es conocido por su resistencia a la corrosión.', '1s2 2s2 2p6 3s2 3p1', 2.70, 660.32, 2519.00, 'Excelente', 'Al-27', 3, 'Reacciona con el oxígeno para formar una capa protectora de óxido.', 'Óxido de aluminio (Al2O3)', 'Usado en la fabricación de aviones, vehículos y en la construcción.', 'En la fabricación de envases, en la construcción de edificios y en la producción de energía solar.', 'El aluminio tiene un impacto ambiental debido a la extracción y al reciclaje en los procesos industriales.', 0x696d6167655f75726c, 13, 13, 14),
(14, 14, 'El silicio fue descubierto en 1824 por Jöns Jacob Berzelius.', 'Su nombre proviene del latín \"silex\", que significa \"piedra\" o \"roca\".', 'El símbolo Si proviene de la palabra \"silex\".', 'El silicio es un metaloide utilizado principalmente en la fabricación de dispositivos electrónicos y semiconductores.', 'El silicio es el decimocuarto elemento en la tabla periódica y es ampliamente utilizado en la industria de la tecnología.', '1s2 2s2 2p6 3s2 3p2', 2.33, 1414.00, 2900.00, 'Buen conductor', 'Si-28, Si-29, Si-30', 4, 'Reacciona con oxígeno para formar dióxido de silicio.', 'Dióxido de silicio (SiO2)', 'Usado en la fabricación de chips y semiconductores.', 'En la industria electrónica y en la fabricación de vidrio y cerámica.', 'El silicio tiene un impacto ambiental bajo, aunque su extracción puede ser intensiva en recursos naturales.', 0x696d6167655f75726c, 14, 14, 14),
(15, 15, 'El fósforo fue descubierto en 1669 por Hennig Brand en Hamburgo, Alemania, mientras intentaba hacer oro a partir de orina.', 'El nombre proviene del griego \"phos\", que significa \"luz\", ya que el fósforo emite una luz tenue en la oscuridad.', 'El símbolo P proviene de la palabra griega \"phos\".', 'El fósforo es un no metal esencial en los organismos vivos, siendo un componente clave de los ácidos nucleicos y las membranas celulares.', 'El fósforo es el decimoquinto elemento en la tabla periódica y se encuentra principalmente en la forma de fosfatos en la naturaleza.', '1s2 2s2 2p6 3s2 3p3', 1.82, 44.20, 280.50, 'Excelente', 'P-31', 3, 'Reacciona fácilmente con oxígeno para formar compuestos como el fósforo blanco.', 'Óxidos de fósforo (P2O5)', 'Usado en la fabricación de fertilizantes y en la industria química.', 'En la fabricación de fertilizantes, en la producción de detergentes y en la industria agrícola.', 'El fósforo tiene un impacto ambiental negativo debido a su uso en fertilizantes y su contribución a la contaminación de aguas.', 0x696d6167655f75726c, 15, 15, 16),
(16, 16, 'El azufre ha sido conocido desde la antigüedad, siendo utilizado en la época de los egipcios y griegos. Fue estudiado en detalle por los químicos medievales.', 'El nombre proviene del latín \"sulphur\", que significa \"azufre\".', 'El símbolo S proviene de la palabra latina \"sulphur\".', 'El azufre es un no metal que se encuentra comúnmente en la naturaleza en forma de compuestos, como los sulfuros.', 'El azufre es el decimosexto elemento en la tabla periódica y es esencial en muchos procesos biológicos.', '1s2 2s2 2p6 3s2 3p4', 2.07, 115.21, 444.60, 'Buen conductor', 'S-32, S-33, S-34', 2, 'Reacciona fácilmente con muchos metales y con oxígeno para formar dióxido de azufre.', 'Dióxido de azufre (SO2)', 'Usado en la fabricación de ácido sulfúrico y en la industria de la minería.', 'En la producción de ácido sulfúrico, en la fabricación de pesticidas y en la industria farmacéutica.', 'El azufre tiene un impacto ambiental debido a la formación de dióxido de azufre, que contribuye a la lluvia ácida.', 0x696d6167655f75726c, 16, 16, 16),
(17, 17, 'El cloro fue descubierto en 1774 por Carl Wilhelm Scheele, aunque su nombre y características fueron confirmados posteriormente.', 'El nombre proviene del griego \"khloros\", que significa \"verde amarillento\", por el color de su gas.', 'El símbolo Cl proviene de la palabra griega \"khloros\".', 'El cloro es un gas tóxico e irritante utilizado ampliamente en la industria química y en la purificación del agua.', 'El cloro es el decimoséptimo elemento en la tabla periódica y pertenece al grupo de los halógenos.', '1s2 2s2 2p6 3s2 3p5', 3.21, -101.50, -34.04, 'Excelente', 'Cl-35, Cl-37', 1, 'Altamente reactivo, especialmente con metales y con agua.', 'Nitrato de cloro (ClNO3)', 'Usado en la fabricación de productos químicos, como desinfectantes, y en la industria de la depuración del agua.', 'En la fabricación de plásticos, productos de limpieza y en la desinfección del agua potable.', 'El cloro tiene un impacto ambiental negativo cuando se libera en grandes cantidades, contribuyendo a la contaminación del aire y agua.', 0x696d6167655f75726c, 17, 17, 18),
(18, 18, 'El argón fue descubierto en 1894 por Lord Rayleigh y William Ramsay, quienes lo aislaron del aire.', 'El nombre proviene del griego \"argos\", que significa \"inactivo\", ya que es un gas noble que no reacciona fácilmente con otros elementos.', 'El símbolo Ar proviene de la palabra griega \"argos\".', 'El argón es un gas noble incoloro, inodoro e insípido, utilizado en la industria de la soldadura y en la iluminación.', 'El argón es el decimoctavo elemento en la tabla periódica y se encuentra en pequeñas cantidades en la atmósfera.', '1s2 2s2 2p6 3s2 3p6', 1.78, -189.34, -185.85, 'Muy malo', 'Ar-36, Ar-38, Ar-40', 0, 'Es un gas noble, por lo que no reacciona fácilmente con otros elementos.', 'Ningún compuesto típico', 'Usado en la industria de la soldadura y en la fabricación de lámparas de neón.', 'En la fabricación de luces y en procesos industriales donde se necesita un ambiente sin reacciones químicas.', 'El argón tiene un impacto ambiental mínimo debido a su baja reactividad.', 0x696d6167655f75726c, 18, 18, 22),
(19, 19, 'El potasio fue descubierto en 1807 por Humphry Davy mediante la electrólisis de la potasa.', 'El nombre proviene del latín \"potassa\", que significa \"potasa\", un mineral rico en potasio.', 'El símbolo K proviene de la palabra alemana \"Kalium\", que significa potasio.', 'El potasio es un metal alcalino altamente reactivo utilizado en la fabricación de fertilizantes.', 'El potasio es el decimonoveno elemento en la tabla periódica y es un componente esencial en la biología celular.', '1s2 2s2 2p6 3s2 3p6 4s1', 0.86, 63.50, 759.00, 'Bueno', 'K-39', 1, 'Altamente reactivo, especialmente con agua.', 'Hidróxido de potasio (KOH)', 'Usado en la fabricación de fertilizantes y en la industria química.', 'En la producción de fertilizantes, en la fabricación de jabón y en la industria química.', 'El potasio tiene un impacto ambiental debido a su uso en fertilizantes y su contribución a la contaminación de aguas.', 0x696d6167655f75726c, 19, 19, 20),
(20, 20, 'El calcio fue descubierto en 1808 por Humphry Davy mediante la electrólisis de la cal.', 'El nombre proviene del latín \"calx\", que significa \"cal\", un mineral que contiene calcio.', 'El símbolo Ca proviene de la palabra latina \"calx\".', 'El calcio es un metal alcalinotérreo utilizado en la fabricación de materiales de construcción y en la biología.', 'El calcio es el vigésimo elemento en la tabla periódica y es esencial para la formación de huesos y dientes.', '1s2 2s2 2p6 3s2 3p6 4s2', 1.54, 842.00, 1484.00, 'Bueno', 'Ca-40, Ca-42', 2, 'Reacciona con agua, oxígeno y otros elementos formando compuestos.', 'Carbonato de calcio (CaCO3)', 'Usado en la fabricación de cemento, cal, y en la producción de acero.', 'En la fabricación de cemento, en la producción de cal y en la fabricación de fertilizantes.', 'El calcio tiene un impacto ambiental debido a su uso en la construcción y en la extracción minera.', 0x696d6167655f75726c, 20, 20, 20),
(21, 21, 'El escandio fue descubierto en 1879 por Lars Fredrik Nilson, quien lo aisló a partir de un mineral llamado gadolinita.', 'El nombre proviene de la palabra latina \"Scania\", que es la región de donde se originó el mineral.', 'El símbolo Sc proviene de la palabra latina \"Scania\".', 'El escandio es un metal de transición ligero utilizado principalmente en aleaciones de aluminio.', 'El escandio es el vigésimo primer elemento en la tabla periódica y se encuentra principalmente en minerales raros.', '1s2 2s2 2p6 3s2 3p6 4s2 3d1', 2.99, 1539.00, 2836.00, 'Bueno', 'Sc-45', 3, 'Reacciona con el oxígeno para formar una capa de óxido.', 'Oxido de escandio (Sc2O3)', 'Usado en aleaciones de aluminio y en la fabricación de lámparas de alta intensidad.', 'En la fabricación de materiales de alta resistencia y en aplicaciones electrónicas.', 'El escandio tiene un impacto ambiental mínimo debido a su bajo uso industrial.', 0x696d6167655f75726c, 21, 21, 24),
(22, 22, 'El titanio fue descubierto en 1791 por William Gregor en Cornualles, Inglaterra, aunque su identificación fue completada por Martin Heinrich Klaproth en 1795.', 'El nombre proviene del griego \"titanos\", que significa \"gigante\" o \"titán\", debido a su gran resistencia.', 'El símbolo Ti proviene de la palabra griega \"titanos\".', 'El titanio es un metal resistente a la corrosión, ligero y fuerte, ampliamente utilizado en aleaciones y componentes aeroespaciales.', 'El titanio es el vigésimo segundo elemento en la tabla periódica y se encuentra en varios minerales, como el rutilo.', '1s2 2s2 2p6 3s2 3p6 4s2 3d2', 4.54, 1668.00, 3287.00, 'Excelente', 'Ti-46, Ti-47', 4, 'Reacciona lentamente con oxígeno para formar una capa pasivadora de óxido.', 'Oxido de titanio (TiO2)', 'Usado en la fabricación de aleaciones ligeras y en la industria aeroespacial.', 'En la fabricación de piezas para aeronaves, en la industria automotriz y en la fabricación de pigmentos.', 'El titanio tiene un impacto ambiental bajo debido a su alta durabilidad y resistencia a la corrosión.', 0x696d6167655f75726c, 22, 22, 26),
(23, 23, 'El vanadio fue descubierto en 1801 por Andrés Manuel del Río, pero no fue reconocido hasta 1831 por Nils Gabriel Sefström.', 'El nombre proviene de la diosa nórdica \"Vanadis\", que simboliza la belleza, debido a los colores brillantes de sus compuestos.', 'El símbolo V proviene de la palabra nórdica \"Vanadis\".', 'El vanadio es un metal de transición utilizado en aleaciones para mejorar la resistencia y la durabilidad.', 'El vanadio es el vigésimo tercer elemento en la tabla periódica y se encuentra en varios minerales, como la patronita.', '1s2 2s2 2p6 3s2 3p6 4s2 3d3', 6.00, 1910.00, 3380.00, 'Excelente', 'V-51', 5, 'Reacciona con oxígeno para formar óxidos como el óxido de vanadio.', 'Oxido de vanadio (V2O5)', 'Usado en la fabricación de acero y en la industria de baterías recargables.', 'En la fabricación de acero de alta resistencia y en la industria química.', 'El vanadio tiene un impacto ambiental moderado debido a la extracción minera y el uso industrial.', 0x696d6167655f75726c, 23, 23, 28),
(24, 24, 'El cromo fue descubierto en 1797 por Louis Nicolas Vauquelin, quien aisló el elemento a partir de un mineral llamado crocoíta.', 'El nombre proviene del griego \"chroma\", que significa \"color\", debido a los colores brillantes de sus compuestos.', 'El símbolo Cr proviene de la palabra griega \"chroma\".', 'El cromo es un metal de transición duro y brillante, conocido por su resistencia a la corrosión y su capacidad para dar colores brillantes en los productos acabados.', 'El cromo es el vigésimo cuarto elemento en la tabla periódica y se encuentra principalmente en el mineral cromita.', '1s2 2s2 2p6 3s2 3p6 4s2 3d4', 7.19, 1907.00, 2671.00, 'Excelente', 'Cr-52, Cr-53', 6, 'Reacciona fácilmente con oxígeno para formar compuestos como el óxido de cromo.', 'Oxido de cromo (Cr2O3)', 'Usado en la fabricación de aceros inoxidables, cromado de metales y pigmentos.', 'En la fabricación de herramientas de corte, en el cromado de metales y en la producción de pigmentos.', 'El cromo tiene un impacto ambiental debido a la contaminación por compuestos de cromo hexavalente.', 0x696d6167655f75726c, 24, 24, 28),
(25, 25, 'El manganeso fue descubierto en 1774 por Johan Gottlieb Gahn, quien lo aisló a partir de mineral de pirolusita.', 'El nombre proviene del latín \"magnes\", que significa \"magnetismo\", debido a las propiedades magnéticas de sus compuestos.', 'El símbolo Mn proviene de la palabra latina \"magnes\".', 'El manganeso es un metal duro y quebradizo utilizado principalmente en la fabricación de acero.', 'El manganeso es el vigésimo quinto elemento en la tabla periódica y se encuentra principalmente en el mineral pirolusita.', '1s2 2s2 2p6 3s2 3p6 4s2 3d5', 7.43, 1244.00, 2061.00, 'Bueno', 'Mn-55', 2, 'Reacciona con oxígeno y agua, formando óxidos.', 'Oxido de manganeso (MnO2)', 'Usado en la fabricación de aleaciones y en la industria de baterías.', 'En la producción de acero, en la fabricación de baterías y en la industria química.', 'El manganeso tiene un impacto ambiental debido a su minería y uso en productos químicos.', 0x696d6167655f75726c, 25, 25, 27),
(26, 26, 'El hierro fue conocido desde la antigüedad, pero su descubrimiento en términos modernos se debe a las observaciones realizadas en el siglo XVIII sobre su obtención del mineral hematites.', 'El nombre proviene del latín \"ferrum\", que significa \"hierro\".', 'El símbolo Fe proviene de la palabra latina \"ferrum\".', 'El hierro es un metal de transición ampliamente utilizado en la fabricación de acero y en la construcción debido a su dureza y resistencia.', 'El hierro es el vigésimo sexto elemento en la tabla periódica y se encuentra en minerales como la hematites.', '1s2 2s2 2p6 3s2 3p6 4s2 3d6', 7.87, 1538.00, 2861.00, 'Excelente', 'Fe-56, Fe-57', 2, 'Reacciona con oxígeno y agua para formar óxido de hierro.', 'Oxido de hierro (Fe2O3)', 'Usado en la fabricación de acero, en la construcción y en la fabricación de imanes.', 'En la producción de acero, en la construcción y en imanes permanentes.', 'El hierro tiene un impacto ambiental debido a la extracción y al uso de productos de acero.', 0x696d6167655f75726c, 26, 26, 30),
(27, 27, 'El cobalto fue descubierto en 1735 por Georg Brandt, quien lo aisló a partir de un mineral llamado cobaltita.', 'El nombre proviene del alemán \"kobold\", que significa \"duende\", debido a la toxicidad de sus compuestos y su difícil extracción.', 'El símbolo Co proviene de la palabra alemana \"kobold\".', 'El cobalto es un metal duro y magnético utilizado en aleaciones de alta resistencia y en la fabricación de baterías recargables.', 'El cobalto es el vigésimo séptimo elemento en la tabla periódica y se encuentra principalmente en minerales como la cobaltita.', '1s2 2s2 2p6 3s2 3p6 4s2 3d7', 8.90, 1495.00, 2927.00, 'Excelente', 'Co-59', 2, 'Reacciona con oxígeno y agua, formando óxidos.', 'Oxido de cobalto (CoO)', 'Usado en la fabricación de baterías recargables y en la industria de aleaciones.', 'En la fabricación de baterías recargables, imanes permanentes y en la industria química.', 'El cobalto tiene un impacto ambiental debido a su extracción y su toxicidad.', 0x696d6167655f75726c, 27, 27, 32),
(28, 28, 'El níquel fue descubierto en 1751 por Axel Fredrik Cronstedt, quien lo aisló a partir de un mineral llamado niccolita.', 'El nombre proviene de la palabra alemana \"kupfernickel\", que significa \"cobre de duende\", debido a que los mineros pensaban que el mineral era cobre pero contenía níquel.', 'El símbolo Ni proviene de la palabra alemana \"nickel\".', 'El níquel es un metal resistente a la corrosión que se utiliza en aleaciones y en la fabricación de baterías recargables.', 'El níquel es el vigésimo octavo elemento en la tabla periódica y se encuentra principalmente en minerales como la niccolita.', '1s2 2s2 2p6 3s2 3p6 4s2 3d8', 8.91, 1455.00, 2913.00, 'Bueno', 'Ni-58', 2, 'Reacciona con oxígeno para formar óxidos.', 'Oxido de níquel (NiO)', 'Usado en la fabricación de aleaciones, baterías y en la industria química.', 'En la fabricación de aleaciones de alta resistencia, en baterías recargables y en catalizadores.', 'El níquel tiene un impacto ambiental debido a la minería y la liberación de óxidos de níquel.', 0x696d6167655f75726c, 28, 28, 31),
(29, 29, 'El cobre fue conocido desde la antigüedad, pero su identificación moderna fue realizada por los antiguos egipcios y romanos.', 'El nombre proviene del latín \"cuprum\", que significa \"de Cerdeña\", debido a la abundancia de cobre en la isla de Cerdeña.', 'El símbolo Cu proviene de la palabra latina \"cuprum\".', 'El cobre es un metal conductor de electricidad y calor, ampliamente utilizado en la fabricación de cables y componentes eléctricos.', 'El cobre es el vigésimo noveno elemento en la tabla periódica y se encuentra principalmente en minerales como la calcopirita.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10', 8.96, 1085.00, 2562.00, 'Excelente', 'Cu-63', 1, 'Reacciona fácilmente con oxígeno para formar una capa de óxido.', 'Oxido de cobre (CuO)', 'Usado en la fabricación de cables eléctricos, en la construcción y en la fabricación de aleaciones.', 'En la fabricación de cables eléctricos, en la construcción de viviendas y en la fabricación de joyería.', 'El cobre tiene un impacto ambiental moderado debido a la minería y su procesamiento.', 0x696d6167655f75726c, 29, 29, 30),
(30, 30, 'El zinc fue descubierto en la antigüedad por los chinos, pero su aislamiento puro fue logrado por Andreas Sigismund Marggraf en 1746.', 'El nombre proviene del alemán \"zinke\", que significa \"diente\", debido a su apariencia.', 'El símbolo Zn proviene de la palabra alemana \"zinke\".', 'El zinc es un metal utilizado principalmente en la galvanización y en la fabricación de aleaciones.', 'El zinc es el trigésimo elemento en la tabla periódica y se encuentra principalmente en minerales como la esfalerita.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10', 7.14, 419.00, 907.00, 'Bueno', 'Zn-64', 2, 'Reacciona con oxígeno y ácido clorhídrico.', 'Oxido de zinc (ZnO)', 'Usado en la galvanización, en la fabricación de baterías y en productos cosméticos.', 'En la fabricación de aleaciones, en la protección contra la corrosión y en cremas para la piel.', 'El zinc tiene un impacto ambiental bajo debido a su uso en aleaciones y en la industria de la galvanización.', 0x696d6167655f75726c, 30, 30, 34),
(31, 31, 'El galio fue descubierto en 1875 por Paul Émile Lecoq de Boisbaudran, quien lo aisló a partir de un mineral llamado esfalerita.', 'El nombre proviene de \"Gallia\", el nombre latino de Francia, en honor a su país natal.', 'El símbolo Ga proviene del nombre latino \"Gallia\".', 'El galio es un metal blando utilizado en la fabricación de semiconductores y dispositivos electrónicos.', 'El galio es el trigésimo primer elemento en la tabla periódica y se encuentra en minerales como la galena.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p1', 5.91, 29.76, 2204.00, 'Bueno', 'Ga-69, Ga-71', 3, 'Reacciona con oxígeno y agua para formar una capa protectora de óxido.', 'Oxido de galio (Ga2O3)', 'Usado en semiconductores, pantallas LED y en la fabricación de láseres.', 'En la fabricación de semiconductores, en la producción de LEDs y en las telecomunicaciones.', 'El galio tiene un impacto ambiental bajo debido a su bajo uso y alta eficiencia en tecnología.', 0x696d6167655f75726c, 31, 31, 34),
(32, 32, 'El germanio fue descubierto en 1886 por Clemens Winkler, quien lo aisló a partir de un mineral llamado argyrodíta.', 'El nombre proviene de \"Germania\", el nombre latino de Alemania, en honor al país de su descubridor.', 'El símbolo Ge proviene del nombre \"Germania\".', 'El germanio es un semiconductor utilizado en electrónica y óptica debido a sus propiedades únicas.', 'El germanio es el trigésimo segundo elemento en la tabla periódica y se encuentra en minerales como la argyrodíta.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p2', 5.32, 938.30, 2833.00, 'Bueno', 'Ge-74', 4, 'Reacciona con oxígeno para formar óxidos.', 'Oxido de germanio (GeO2)', 'Usado en la fabricación de transistores, lentes y fibra óptica.', 'En la fabricación de transistores, en la industria óptica y en la electrónica.', 'El germanio tiene un impacto ambiental bajo debido a su uso en electrónica.', 0x696d6167655f75726c, 32, 32, 38),
(33, 33, 'El arsénico fue conocido desde la antigüedad, pero su descubrimiento moderno se atribuye a Albertus Magnus en el siglo XIII.', 'El nombre proviene del griego \"arsenikon\", que significa \"masculino\" o \"poderoso\", debido a la toxicidad de sus compuestos.', 'El símbolo As proviene de la palabra griega \"arsenikon\".', 'El arsénico es un metaloide tóxico utilizado en aleaciones y en pesticidas.', 'El arsénico es el trigésimo tercer elemento en la tabla periódica y se encuentra en minerales como la arsenopirita.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p3', 5.73, 817.00, 613.00, 'Bueno', 'As-75', 3, 'Reacciona con oxígeno para formar compuestos tóxicos como el óxido de arsénico.', 'Oxido de arsénico (As2O3)', 'Usado en la fabricación de pesticidas, en la industria de semiconductores y en aleaciones.', 'En la fabricación de pesticidas, en la industria de semiconductores y en la producción de vidrio.', 'El arsénico tiene un impacto ambiental y sanitario significativo debido a su toxicidad.', 0x696d6167655f75726c, 33, 33, 40),
(34, 34, 'El selenio fue descubierto en 1817 por Jöns Jacob Berzelius, quien lo aisló a partir de un mineral llamado de la argentita.', 'El nombre proviene del griego \"selene\", que significa \"luna\", debido a su similitud con el telurio, cuyo nombre proviene del latín \"tellus\", que significa \"tierra\".', 'El símbolo Se proviene de la palabra griega \"selene\".', 'El selenio es un no metal utilizado en la fabricación de semiconductores y en la producción de vidrio.', 'El selenio es el trigésimo cuarto elemento en la tabla periódica y se encuentra principalmente en minerales como la selenita.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p4', 4.79, 221.00, 684.00, 'Bueno', 'Se-80', 2, 'Reacciona con oxígeno para formar compuestos como el dióxido de selenio.', 'Oxido de selenio (SeO2)', 'Usado en la fabricación de semiconductores, vidrio y pigmentos.', 'En la producción de vidrio, en la fabricación de semiconductores y en la industria fotovoltaica.', 'El selenio tiene un impacto ambiental bajo, aunque su minería puede afectar los ecosistemas cercanos.', 0x696d6167655f75726c, 34, 34, 41),
(35, 35, 'El bromo fue descubierto en 1826 por Antoine Jérôme Balard, quien lo aisló a partir de agua salada.', 'El nombre proviene del griego \"bromos\", que significa \"olor fuerte\", debido a su característico olor a cloro.', 'El símbolo Br proviene de la palabra griega \"bromos\".', 'El bromo es un halógeno líquido a temperatura ambiente que se utiliza en la fabricación de productos químicos.', 'El bromo es el trigésimo quinto elemento en la tabla periódica y se encuentra principalmente en el agua salada.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p5', 3.12, -7.20, 58.80, 'Bueno', 'Br-79', 1, 'Reacciona con muchos metales y no metales formando compuestos como el bromuro.', 'Bromuro de sodio (NaBr)', 'Usado en la fabricación de productos químicos, en la industria farmacéutica y en la producción de productos de limpieza.', 'En la fabricación de productos de limpieza, en la producción de plásticos y en la industria farmacéutica.', 'El bromo tiene un impacto ambiental moderado debido a su uso industrial.', 0x696d6167655f75726c, 35, 35, 44),
(36, 36, 'El criptón fue descubierto en 1898 por William Ramsay y Morris Travers, quienes lo aislaron a partir del aire.', 'El nombre proviene del griego \"kryptos\", que significa \"oculto\", debido a la dificultad de aislarlo de los demás gases nobles.', 'El símbolo Kr proviene de la palabra griega \"kryptos\".', 'El criptón es un gas noble utilizado en la fabricación de lámparas fluorescentes y en algunos dispositivos de iluminación.', 'El criptón es el trigésimo sexto elemento en la tabla periódica y se encuentra en el aire en pequeñas cantidades.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6', 3.75, -157.40, 58.80, 'Bueno', 'Kr-84', 0, 'No es reactivo debido a ser un gas noble.', 'Criptón', 'Usado en la fabricación de lámparas de descarga y en la industria de la iluminación.', 'En la fabricación de lámparas fluorescentes, en la industria de iluminación y en la investigación científica.', 'El criptón tiene un impacto ambiental bajo debido a su uso en iluminación y tecnología.', 0x696d6167655f75726c, 36, 36, 48),
(37, 37, 'El rubidio fue descubierto en 1861 por Robert Bunsen y Gustav Kirchhoff, quienes lo aislaron a partir de un mineral llamado lepidolita.', 'El nombre proviene del latín \"rubidus\", que significa \"rojo intenso\", debido a la coloración roja de su espectro.', 'El símbolo Rb proviene de la palabra latina \"rubidus\".', 'El rubidio es un metal blando y altamente reactivo utilizado en investigación científica y en la fabricación de baterías.', 'El rubidio es el trigésimo séptimo elemento en la tabla periódica y se encuentra en minerales como la lepidolita.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1', 1.53, 39.30, 688.00, 'Bueno', 'Rb-85', 1, 'Reacciona con agua para formar hidróxido de rubidio.', 'Hidróxido de rubidio (RbOH)', 'Usado en investigación científica, en la fabricación de baterías y en algunos reactores nucleares.', 'En la investigación científica, en la fabricación de baterías recargables y en tecnología de energía.', 'El rubidio tiene un impacto ambiental bajo debido a su uso limitado y altamente controlado.', 0x696d6167655f75726c, 37, 37, 48),
(38, 38, 'El estroncio fue descubierto en 1790 por William Cruickshank y Humphry Davy, quienes lo aislaron a partir de un mineral llamado celestina.', 'El nombre proviene de la ciudad escocesa de Strontian, donde se descubrió el mineral que contenía el elemento.', 'El símbolo Sr proviene del nombre de la ciudad Strontian.', 'El estroncio es un metal alcalinotérreo utilizado en la fabricación de fuegos artificiales y en la producción de imanes.', 'El estroncio es el trigésimo octavo elemento en la tabla periódica y se encuentra principalmente en minerales como la celestina.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2', 2.64, 777.00, 1382.00, 'Bueno', 'Sr-88', 2, 'Reacciona con agua y oxígeno para formar compuestos como el hidróxido de estroncio.', 'Hidróxido de estroncio (Sr(OH)2)', 'Usado en la fabricación de fuegos artificiales, en la producción de imanes y en la medicina.', 'En la producción de fuegos artificiales, en la fabricación de imanes y en la industria nuclear.', 'El estroncio tiene un impacto ambiental bajo, aunque la minería puede causar alteraciones en el ecosistema.', 0x696d6167655f75726c, 38, 38, 50),
(39, 39, 'El ytrio fue descubierto en 1794 por Johan Gadolin, quien lo aisló a partir de un mineral llamado gadolinita.', 'El nombre proviene de la ciudad de Ytterby en Suecia, donde se descubrió el mineral que contenía el elemento.', 'El símbolo Y proviene del nombre de la ciudad Ytterby.', 'El ytrio es un metal de transición utilizado en la fabricación de materiales cerámicos y en aplicaciones de alta tecnología.', 'El ytrio es el trigésimo noveno elemento en la tabla periódica y se encuentra principalmente en minerales como la gadolinita.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 4d1', 4.47, 1526.00, 3337.00, 'Bueno', 'Y-89', 3, 'Reacciona con oxígeno para formar óxidos.', 'Oxido de ytrio (Y2O3)', 'Usado en la fabricación de imanes, en tecnología de superconductores y en láseres.', 'En la producción de imanes, en la fabricación de componentes electrónicos y en tecnología de iluminación.', 'El ytrio tiene un impacto ambiental bajo debido a su uso en tecnología avanzada.', 0x696d6167655f75726c, 39, 39, 50),
(40, 40, 'El circonio fue descubierto en 1789 por Martin Heinrich Klaproth, quien lo aisló a partir de un mineral llamado zirconio.', 'El nombre proviene del mineral \"circon\" que se encuentra abundantemente en la naturaleza.', 'El símbolo Zr proviene de la palabra árabe \"zarqūn\", que significa \"rojo\", en referencia al color del mineral.', 'El circonio es un metal de transición utilizado en la fabricación de reactores nucleares y en la industria química.', 'El circonio es el cuadragésimo elemento en la tabla periódica y se encuentra principalmente en el mineral circón.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 4d2', 6.52, 1855.00, 4377.00, 'Bueno', 'Zr-90', 2, 'Es resistente a la corrosión y reacciona lentamente con el oxígeno.', 'Oxido de circonio (ZrO2)', 'Usado en la fabricación de componentes de reactores nucleares, en la producción de cerámica y en tecnologías aeroespaciales.', 'En la fabricación de componentes de reactores nucleares, en la industria de cerámica avanzada y en la producción de materiales refractarios.', 'El circonio tiene un impacto ambiental bajo debido a su uso en aplicaciones industriales especializadas.', 0x696d6167655f75726c, 40, 40, 51),
(41, 41, 'El niobio fue descubierto en 1801 por Charles Hatchett en Inglaterra a partir de un mineral llamado columbita.', 'El nombre niobio proviene de la mitología griega, en la que Niobe era la hija del rey de Tebas. Se creía que este elemento estaba relacionado con el mineral que contenía el metal.', 'El símbolo Nb proviene del nombre de la mitología griega, Niobe.', 'El niobio es un metal de transición utilizado en la fabricación de aleaciones de alta resistencia y en tecnología aeroespacial.', 'El niobio se encuentra en la tabla periódica en la serie de metales de transición y es conocido por su capacidad para mantener la resistencia a bajas temperaturas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 4d4', 8.57, 2477.00, 4744.00, 'Bueno', 'Nb-93', 5, 'Reacciona con oxígeno para formar óxidos.', 'Oxido de niobio (Nb2O5)', 'Se utiliza en la fabricación de aleaciones para la industria aeroespacial, en tecnología de superconductores y en la fabricación de materiales electrónicos.', 'En aleaciones de alta resistencia, en tecnología de imanes superconductores y en la fabricación de componentes electrónicos.', 'El niobio tiene un impacto ambiental bajo debido a su uso principalmente en aleaciones y superconductores.', 0x696d6167655f75726c, 41, 41, 52),
(42, 42, 'El molibdeno fue descubierto en 1778 por Carl Wilhelm Scheele y aislado por primera vez en 1781 por Peter Jacob Hjelm.', 'El nombre molibdeno proviene del griego \"molybdos\", que significa plomo, ya que los minerales en los que se encuentra tienen una apariencia similar al plomo.', 'El símbolo Mo proviene del nombre del mineral molibdenita, que es donde se encuentra este metal.', 'El molibdeno es un metal de transición usado principalmente en la fabricación de aleaciones de acero y en aplicaciones electrónicas.', 'El molibdeno se encuentra en la tabla periódica como parte de los metales de transición y se utiliza principalmente en la fabricación de aceros especiales.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 4d5', 10.22, 2623.00, 4639.00, 'Bueno', 'Mo-98', 6, 'Es resistente a la corrosión y reacciona lentamente con el oxígeno.', 'Oxido de molibdeno (MoO3)', 'Usado en la fabricación de aceros especiales, en la industria aeroespacial y en la producción de componentes electrónicos.', 'En aleaciones de acero, en la fabricación de componentes electrónicos y en la industria aeroespacial.', 'El molibdeno tiene un impacto ambiental moderado debido a su uso en aleaciones y en procesos industriales.', 0x696d6167655f75726c, 42, 42, 54),
(43, 43, 'El tecnecio fue descubierto en 1937 por Carlo Perrier y Emilio Segrè.', 'El nombre tecnecio proviene del griego \"techne\", que significa \"artificial\", ya que es el primer elemento químico que se ha producido de forma sintética.', 'El símbolo Tc proviene del nombre del elemento, basado en su descubrimiento artificial.', 'El tecnecio es un metal de transición utilizado en medicina nuclear y en la producción de reactores nucleares.', 'El tecnecio es el primer elemento sintético en la tabla periódica y se utiliza principalmente en aplicaciones médicas, como en la obtención de imágenes por tomografía.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 4d6', 8.57, 2157.00, 4265.00, 'Bueno', 'Tc-98', 7, 'Es un elemento radiactivo y reacciona con oxígeno para formar compuestos de tecnecio.', 'Cloruro de tecnecio', 'Usado en medicina nuclear para la obtención de imágenes por tomografía, y en reactores nucleares para aplicaciones científicas.', 'En la producción de reactores nucleares y en aplicaciones médicas, como el diagnóstico por imágenes.', 'El tecnecio tiene un impacto ambiental bajo debido a su uso restringido en medicina nuclear y su manejo controlado.', 0x696d6167655f75726c, 43, 43, 55),
(44, 44, 'El rutenio fue descubierto en 1844 por el químico ruso Karl Ernst Claus.', 'El nombre rutenio proviene del latín \"Ruthenia\", que significa Rusia, debido a que el elemento fue descubierto en Rusia.', 'El símbolo Ru proviene del nombre Ruthenia, en honor a su lugar de descubrimiento.', 'El rutenio es un metal de transición utilizado en la fabricación de contactos eléctricos y en la producción de catalizadores.', 'El rutenio se encuentra en la tabla periódica como un elemento del grupo del platino, y es valioso para la industria electrónica.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 4d7', 12.37, 2334.00, 4137.00, 'Bueno', 'Ru-102', 4, 'Es resistente a la corrosión y forma compuestos con oxígeno.', 'Oxido de rutenio (RuO2)', 'Se utiliza en la fabricación de contactos eléctricos, en la producción de catalizadores y en la industria electrónica.', 'En la fabricación de contactos eléctricos, en tecnología de sensores y en la producción de catalizadores.', 'El rutenio tiene un impacto ambiental bajo debido a su uso en tecnologías especializadas y su manejo controlado.', 0x696d6167655f75726c, 44, 44, 57),
(45, 45, 'El rodio fue descubierto en 1803 por William Hyde Wollaston.', 'El nombre rodio proviene del griego \"rhodon\", que significa \"rosa\", debido al color rosado de sus compuestos.', 'El símbolo Rh proviene del nombre del mineral en el que fue descubierto.', 'El rodio es un metal raro utilizado en la fabricación de catalizadores y en la industria automotriz.', 'El rodio es un metal precioso utilizado principalmente en la industria de la automoción y en la producción de joyería.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 4d8', 12.41, 1964.00, 3695.00, 'Excelente', 'Rh-103', 3, 'Es resistente a la corrosión y forma compuestos con oxígeno.', 'Oxido de rodio (Rh2O3)', 'Se utiliza en la fabricación de catalizadores para automóviles, en la producción de joyería y en la industria de la electrónica.', 'En la fabricación de catalizadores automotrices, en la producción de joyería y en tecnología de sensores.', 'El rodio tiene un impacto ambiental bajo debido a su uso especializado en aplicaciones industriales y automotrices.', 0x696d6167655f75726c, 45, 45, 58),
(46, 46, 'El paladio fue descubierto en 1803 por William Hyde Wollaston.', 'El nombre paladio proviene del asteroide Pallas, que fue nombrado así en honor a la diosa griega de la sabiduría.', 'El símbolo Pd proviene del nombre del asteroide Pallas, en honor al cuerpo celeste que fue descubierto en el mismo año.', 'El paladio es un metal de transición utilizado en la fabricación de catalizadores y en la producción de joyería.', 'El paladio se encuentra en la tabla periódica como un miembro del grupo del platino y es ampliamente utilizado en la industria automotriz y en la joyería.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 4d10', 12.02, 1555.00, 2963.00, 'Excelente', 'Pd-106', 2, 'Es resistente a la corrosión y reacciona lentamente con el oxígeno.', 'Oxido de paladio (PdO)', 'Se utiliza en la fabricación de catalizadores para vehículos, en la producción de joyería y en tecnología electrónica.', 'En la fabricación de catalizadores automotrices, en la producción de joyería y en la industria electrónica.', 'El paladio tiene un impacto ambiental bajo debido a su uso principalmente en catalizadores y joyería, y su reciclaje es eficiente.', 0x696d6167655f75726c, 46, 46, 60),
(47, 47, 'El plata fue conocida desde la antigüedad, y su aislamiento como metal puro se remonta a la prehistoria.', 'El nombre plata proviene del latín \"argentum\", que significa brillante o blanco, debido a su color metálico.', 'El símbolo Ag proviene del latín \"argentum\", en referencia al elemento químico.', 'La plata es un metal precioso utilizado en la fabricación de joyería, monedas y en tecnología electrónica.', 'La plata es un metal blando y brillante que se ha utilizado a lo largo de la historia en monedas y joyería.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 4d10', 10.49, 961.80, 2162.00, 'Excelente', 'Ag-107', 1, 'Es resistente a la corrosión y tiene una alta conductividad eléctrica.', 'Oxido de plata (Ag2O)', 'Se utiliza en la fabricación de joyería, en la producción de monedas, en tecnología electrónica y en la fabricación de espejos.', 'En la fabricación de joyería, en la industria de la electrónica, en la producción de espejos y en la fabricación de productos fotográficos.', 'La plata tiene un impacto ambiental bajo, aunque su minería puede generar impacto ambiental significativo si no se maneja adecuadamente.', 0x696d6167655f75726c, 47, 47, 61);
INSERT INTO `element_details` (`id`, `element_id`, `discovery_description`, `name_origin`, `symbol_meaning`, `periodic_law_description`, `periodic_table_evolution`, `electronic_configuration`, `density`, `melting_point`, `boiling_point`, `conductivity`, `isotopes`, `valence`, `reactivity`, `typical_compounds`, `industrial_uses`, `everyday_uses`, `environmental_impact`, `image`, `protons`, `electrons`, `neutrons`) VALUES
(48, 48, 'El cadmio fue descubierto en 1817 por Friedrich Stromeyer en Alemania.', 'El nombre cadmio proviene de la palabra griega \"kadmeia\", que significa \"la tierra de Cadmo\", debido a su descubrimiento en un mineral de zinc llamado calamina, que se asocia a la leyenda griega de Cadmo.', 'El símbolo Cd proviene del nombre del mineral calamina, de donde se extrae este elemento.', 'El cadmio es un metal de transición que se usa principalmente en la fabricación de baterías recargables, en la galvanización y en aplicaciones electrónicas.', 'El cadmio es un elemento muy utilizado en la industria debido a sus propiedades en la fabricación de componentes electrónicos y baterías.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 4d10', 8.65, 321.10, 767.00, 'Bueno', 'Cd-112', 2, 'Reacciona con oxígeno para formar óxidos.', 'Oxido de cadmio (CdO)', 'Usado en la fabricación de baterías recargables, en la galvanización de metales y en componentes electrónicos.', 'En baterías recargables, galvanización de metales y en la fabricación de componentes electrónicos.', 'El cadmio tiene un impacto ambiental moderado debido a la toxicidad de sus compuestos y su liberación en la minería.', 0x696d6167655f75726c, 48, 48, 64),
(49, 49, 'El indio fue descubierto en 1863 por Ferdinand Reich y Theodor Richter en Alemania.', 'El nombre indio proviene del color índigo de la línea espectral del elemento, que fue detectada en su espectro.', 'El símbolo In proviene de la palabra \"indicum\", que significa \"de la India\" o \"relacionado con el color índigo\".', 'El indio es un metal blando y maleable, usado principalmente en la fabricación de aleaciones y en la industria electrónica.', 'El indio es un metal raro que se encuentra principalmente en las minas de zinc y se usa en la fabricación de semiconductores y componentes electrónicos.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p1', 7.31, 156.60, 2072.00, 'Excelente', 'In-115', 3, 'Es resistente a la corrosión y se oxida lentamente en el aire.', 'Oxido de indio (In2O3)', 'Se utiliza en la fabricación de semiconductores, en pantallas táctiles y en la industria electrónica.', 'En pantallas táctiles, en la fabricación de semiconductores y en la producción de componentes electrónicos.', 'El indio tiene un impacto ambiental bajo, pero su minería puede generar efectos negativos si no se maneja adecuadamente.', 0x696d6167655f75726c, 49, 49, 66),
(50, 50, 'El estaño fue conocido desde la antigüedad y se utilizaba para fabricar aleaciones como el bronce.', 'El nombre estaño proviene del latín \"stannum\", que era el nombre de este metal en la antigüedad.', 'El símbolo Sn proviene de la palabra latina \"stannum\".', 'El estaño es un metal blando y flexible utilizado principalmente en la fabricación de aleaciones, en la industria electrónica y en la fabricación de soldaduras.', 'El estaño ha sido conocido y utilizado desde tiempos antiguos, principalmente para la fabricación de aleaciones como el bronce y en la soldadura de componentes electrónicos.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2', 7.31, 231.90, 2270.00, 'Excelente', 'Sn-120', 2, 'Es resistente a la corrosión y se oxida con el tiempo.', 'Oxido de estaño (SnO2)', 'Usado en la fabricación de soldaduras, en aleaciones y en componentes electrónicos.', 'En la fabricación de soldaduras, en aleaciones y en la producción de componentes electrónicos.', 'El estaño tiene un impacto ambiental bajo debido a su uso principalmente en aleaciones y componentes electrónicos, aunque la minería puede generar efectos negativos.', 0x696d6167655f75726c, 50, 50, 69),
(51, 51, 'El antimonio fue conocido desde la antigüedad, y su extracción se remonta a tiempos antiguos en Egipto.', 'El nombre antimonio proviene del griego \"antimonos\", que significa \"no solo\" o \"sin unidad\", debido a sus propiedades químicas.', 'El símbolo Sb proviene del latín \"stibium\", que hace referencia al mineral de donde se extraía este elemento en la antigüedad.', 'El antimonio es un metaloide utilizado en aleaciones y productos electrónicos debido a su resistencia a la corrosión.', 'El antimonio es un metaloide que se usa en la fabricación de aleaciones, en la industria electrónica y en productos ignífugos.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10', 6.68, 630.60, 1587.00, 'Pobre', 'Sb-121', 3, 'Es resistente a la corrosión y se utiliza en aleaciones.', 'Oxido de antimonio (Sb2O3)', 'Se utiliza en la fabricación de aleaciones, baterías, y productos ignífugos.', 'En la fabricación de aleaciones, productos electrónicos y en la industria de materiales ignífugos.', 'El antimonio tiene un impacto ambiental moderado debido a sus compuestos tóxicos, aunque su uso controlado minimiza el riesgo.', 0x696d6167655f75726c, 51, 51, 71),
(52, 52, 'El telurio fue descubierto en 1782 por Franz-Joseph Müller von Reichenstein en Austria.', 'El nombre telurio proviene de la palabra latina \"tellus\", que significa \"tierra\".', 'El símbolo Te proviene de la palabra \"tellus\".', 'El telurio es un metaloide utilizado en la fabricación de aleaciones, semiconductores y en tecnología solar.', 'El telurio es un metaloide raro que se usa en la fabricación de aleaciones y en aplicaciones de energía solar.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2', 6.24, 450.00, 988.00, 'Bueno', 'Te-130', 2, 'Es un material semiconductor con aplicaciones en energía solar.', 'Oxido de telurio (TeO2)', 'Se utiliza en la fabricación de semiconductores, dispositivos electrónicos y tecnología solar.', 'En la fabricación de semiconductores y en la industria de energía solar.', 'El telurio tiene un impacto ambiental bajo, pero su minería y procesamiento pueden generar efectos negativos si no se manejan adecuadamente.', 0x696d6167655f75726c, 52, 52, 76),
(53, 53, 'El yodo fue descubierto en 1811 por Bernard Courtois en Francia.', 'El nombre yodo proviene del griego \"iodes\", que significa \"púrpura\" debido al color de su vaporización.', 'El símbolo I proviene de \"iodes\".', 'El yodo es un halógeno esencial para la producción de hormonas tiroideas en el cuerpo humano y se usa en la industria farmacéutica y química.', 'El yodo es un elemento químico que se usa principalmente en la medicina y en la industria química.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p5', 4.93, 113.70, 184.30, 'Bueno', 'I-127', 1, 'Es un reactivo importante en medicina y en la desinfección.', 'Yoduro de potasio (KI)', 'Se utiliza en la medicina para tratar la deficiencia de yodo y en productos de desinfección.', 'En medicina y en la industria química, especialmente en la fabricación de tintes y productos farmacéuticos.', 'El yodo tiene un impacto ambiental bajo, aunque su extracción en algunas regiones puede ser problemática.', 0x696d6167655f75726c, 53, 53, 80),
(54, 54, 'El xenón fue descubierto en 1898 por William Ramsay y Morris Travers en el Reino Unido.', 'El nombre xenón proviene del griego \"xenos\", que significa \"extraño\" o \"alienígena\", debido a su rareza en la atmósfera.', 'El símbolo Xe proviene de \"xenos\".', 'El xenón es un gas noble utilizado en lámparas de descarga y en la industria de la anestesia.', 'El xenón es un gas noble que se utiliza en lámparas de alta intensidad y en aplicaciones médicas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6', 5.90, -111.80, -108.10, 'Excelente', 'Xe-131', 0, 'Es inerte y no forma compuestos fácilmente.', 'Hexafluoruro de xenón (XeF6)', 'Se utiliza en lámparas de descarga, en anestesia y en la investigación de gases nobles.', 'En lámparas de descarga, en anestesia y en la investigación científica.', 'El xenón tiene un impacto ambiental bajo debido a su uso limitado y su inercia química.', 0x696d6167655f75726c, 54, 54, 77),
(55, 55, 'El cesio fue descubierto en 1860 por Robert Bunsen y Gustav Kirchhoff en Alemania.', 'El nombre cesio proviene del latín \"caesius\", que significa \"azul cielo\", debido a las líneas espectrales de color azul que emitía.', 'El símbolo Cs proviene de \"caesius\".', 'El cesio es un metal alcalino utilizado en relojes atómicos y en la producción de componentes electrónicos.', 'El cesio es un metal alcalino suave y altamente reactivo, utilizado en relojes atómicos y en diversas aplicaciones electrónicas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s1', 1.93, 28.50, 671.00, 'Excelente', 'Cs-133', 1, 'Es altamente reactivo y puede formar compuestos con halógenos.', 'Oxido de cesio (Cs2O)', 'Se utiliza en relojes atómicos, en la producción de componentes electrónicos y en aplicaciones nucleares.', 'En relojes atómicos, en la producción de componentes electrónicos y en investigación científica.', 'El cesio tiene un impacto ambiental moderado debido a su alta reactividad, aunque su uso controlado minimiza los riesgos.', 0x696d6167655f75726c, 55, 55, 82),
(56, 56, 'El bario fue descubierto en 1774 por Carl Wilhelm Scheele en Suecia.', 'El nombre bario proviene del griego \"barys\", que significa \"pesado\", debido a la alta densidad de sus compuestos.', 'El símbolo Ba proviene de \"barys\".', 'El bario es un metal alcalinotérreo que se utiliza en la industria de perforación y en la producción de vidrios.', 'El bario es un metal alcalinotérreo que se utiliza en la industria de perforación, en productos químicos y en la fabricación de vidrios.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2', 3.62, 727.00, 1640.00, 'Bueno', 'Ba-138', 2, 'Es reactivo con agua y forma hidróxidos.', 'Oxido de bario (BaO)', 'Se utiliza en la industria de perforación, en la fabricación de vidrios y en productos químicos.', 'En perforación de petróleo, fabricación de vidrios y en la industria química.', 'El bario tiene un impacto ambiental bajo cuando se maneja adecuadamente, aunque sus compuestos son tóxicos.', 0x696d6167655f75726c, 56, 56, 83),
(57, 57, 'El lantano fue descubierto en 1839 por Carl Gustav Mosander en Suecia.', 'El nombre lantano proviene del griego \"lanthanein\", que significa \"pasar desapercibido\", debido a su difícil detección en los minerales.', 'El símbolo La proviene de \"lanthanein\".', 'El lantano es un metal raro utilizado en la fabricación de imanes, en el tratamiento de la industria petroquímica y en catalizadores.', 'El lantano es un metal raro utilizado principalmente en la fabricación de imanes, lentes ópticas y en catalizadores para la industria petroquímica.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2', 6.15, 920.00, 3464.00, 'Bueno', 'La-138', 3, 'Es bastante reactivo y forma compuestos fácilmente con el oxígeno y el agua.', 'Oxido de lantano (La2O3)', 'Se utiliza en imanes, lentes ópticas y en catalizadores para la industria petroquímica.', 'En la fabricación de imanes, lentes ópticas y en la industria petroquímica.', 'El lantano tiene un impacto ambiental bajo, pero su extracción y procesamiento pueden generar residuos si no se gestionan adecuadamente.', 0x696d6167655f75726c, 57, 57, 83),
(58, 58, 'El cerio fue descubierto en 1803 por Martin Heinrich Klaproth en Alemania.', 'El nombre cerio proviene del asteroide Ceres, que fue descubierto poco después del elemento.', 'El símbolo Ce proviene de \"Ceres\".', 'El cerio es un metal raro utilizado en catalizadores, en aleaciones y en la fabricación de componentes electrónicos.', 'El cerio es un metal raro y activo que se usa principalmente en la fabricación de aleaciones y catalizadores, así como en la producción de componentes electrónicos.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2', 6.77, 798.00, 3432.00, 'Bueno', 'Ce-140', 3, 'Es reactivo y se oxida fácilmente en presencia de aire.', 'Oxido de cerio (CeO2)', 'Se utiliza en la fabricación de catalizadores, aleaciones, y en la industria electrónica.', 'En la fabricación de catalizadores, componentes electrónicos y en aleaciones.', 'El cerio tiene un impacto ambiental moderado debido a su uso en la fabricación de catalizadores y aleaciones, aunque su extracción es controlada.', 0x696d6167655f75726c, 58, 58, 83),
(59, 59, 'El praseodimio fue descubierto en 1885 por Carl Auer von Welsbach en Austria.', 'El nombre praseodimio proviene del griego \"praseos\", que significa \"verde\", debido a los compuestos verdes que forma.', 'El símbolo Pr proviene de \"praseos\".', 'El praseodimio es un metal raro utilizado en la fabricación de imanes, en la industria aeroespacial y en la producción de materiales de alta resistencia.', 'El praseodimio es un metal raro utilizado principalmente en la fabricación de imanes, aleaciones y en aplicaciones industriales de alta temperatura.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2', 6.77, 931.00, 3563.00, 'Bueno', 'Pr-141', 3, 'Es reactivo y forma compuestos fácilmente con oxígeno.', 'Oxido de praseodimio (Pr6O11)', 'Se utiliza en la fabricación de imanes y en aleaciones para la industria aeroespacial.', 'En la fabricación de imanes, en la industria aeroespacial y en aleaciones de alta resistencia.', 'El praseodimio tiene un impacto ambiental bajo, pero su extracción debe ser cuidadosamente gestionada para evitar la contaminación.', 0x696d6167655f75726c, 59, 59, 85),
(60, 60, 'El neodimio fue descubierto en 1885 por Carl Auer von Welsbach en Austria.', 'El nombre neodimio proviene del griego \"neos\", que significa \"nuevo\", debido a que fue considerado como un nuevo elemento en su serie.', 'El símbolo Nd proviene de \"neos\".', 'El neodimio es un metal raro utilizado en la fabricación de imanes, en la producción de fibra óptica y en la industria de la óptica.', 'El neodimio es un metal raro utilizado principalmente en la fabricación de imanes permanentes, en la producción de láseres y en la industria de la óptica.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2', 7.00, 1021.00, 3127.00, 'Excelente', 'Nd-144', 3, 'Es muy reactivo y forma compuestos con oxígeno fácilmente.', 'Oxido de neodimio (Nd2O3)', 'Se utiliza en la fabricación de imanes, láseres, fibra óptica y dispositivos electrónicos.', 'En la fabricación de imanes permanentes, en láseres, fibra óptica y dispositivos electrónicos.', 'El neodimio tiene un impacto ambiental bajo, aunque su extracción y procesamiento pueden generar residuos si no se manejan adecuadamente.', 0x696d6167655f75726c, 60, 60, 85),
(61, 61, 'El prometio fue descubierto en 1945 por Albert Ghiorso, Glenn T. Seaborg y otros científicos en los Estados Unidos.', 'El nombre prometio proviene de Prometeo, quien en la mitología griega robó el fuego a los dioses para dárselo a los hombres.', 'El símboloPm proviene de \"Prometeo\".', 'El prometio es un elemento radiactivo utilizado en la fabricación de baterías nucleares y en aplicaciones de iluminación.', 'El prometio es un metal raro y radiactivo utilizado en baterías nucleares y fuentes de luz en ciertas aplicaciones de investigación.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2', 7.30, 1300.00, 3000.00, 'Pobre', 'Pm-145', 3, 'Es altamente radiactivo, lo que lo hace peligrosamente reactivo y tóxico.', 'Oxido de prometio (Pm2O3)', 'Se utiliza en la fabricación de baterías nucleares y en aplicaciones de iluminación radiactiva.', 'En baterías nucleares, en fuentes de luz radiactiva y en experimentos científicos.', 'El prometio es altamente radiactivo y su uso está restringido debido a los riesgos para la salud y el medio ambiente.', 0x696d6167655f75726c, 61, 61, 89),
(62, 62, 'El samario fue descubierto en 1853 por Carl Gustaf Mosander en Suecia.', 'El nombre samario proviene de Samarsk, una región en Rusia donde se encontró el mineral de samario.', 'El símbolo Sm proviene de \"Samarsk\".', 'El samario es un metal raro utilizado en la fabricación de imanes y en sistemas de almacenamiento de energía.', 'El samario se utiliza principalmente en imanes de alta resistencia, así como en dispositivos electrónicos de almacenamiento de energía.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2', 7.52, 1072.00, 1794.00, 'Bueno', 'Sm-147', 3, 'Es moderadamente reactivo y forma compuestos con el oxígeno y el agua.', 'Oxido de samario (Sm2O3)', 'Se utiliza en la fabricación de imanes y en la producción de sistemas de almacenamiento de energía.', 'En la fabricación de imanes, en dispositivos electrónicos y sistemas de almacenamiento de energía.', 'El samario tiene un bajo impacto ambiental, aunque su extracción y procesamiento deben ser gestionados adecuadamente para evitar la contaminación.', 0x696d6167655f75726c, 62, 62, 90),
(63, 63, 'El europio fue descubierto en 1896 por Georges Urbain en Francia.', 'El nombre europio proviene de Europa, en referencia al continente europeo.', 'El símbolo Eu proviene de \"Europa\".', 'El europio es un metal raro utilizado en la fabricación de dispositivos electrónicos y en la industria de la fluorescencia.', 'El europio se utiliza en la fabricación de materiales fosforescentes, como los que se encuentran en pantallas de televisión y en la industria de los láseres.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2', 5.24, 826.00, 1527.00, 'Pobre', 'Eu-151', 3, 'Es bastante reactivo, especialmente en su estado metálico.', 'Oxido de europio (Eu2O3)', 'Se utiliza en pantallas de televisión, láseres y dispositivos electrónicos.', 'En la fabricación de pantallas de televisión, láseres y dispositivos electrónicos.', 'El europio tiene un bajo impacto ambiental si se maneja adecuadamente, aunque su extracción puede generar residuos.', 0x696d6167655f75726c, 63, 63, 94),
(64, 64, 'El gadolinio fue descubierto en 1880 por Carl Gustaf Mosander en Suecia.', 'El nombre gadolinio proviene de Johan Gadolin, un químico finlandés.', 'El símbolo Gd proviene de \"Gadolin\".', 'El gadolinio es un metal raro utilizado en la fabricación de imanes y en dispositivos médicos de imágenes por resonancia magnética (RMN).', 'El gadolinio se utiliza en dispositivos médicos de imágenes por resonancia magnética, así como en imanes de alta potencia.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2', 7.90, 1312.00, 3273.00, 'Bueno', 'Gd-157', 3, 'Es moderadamente reactivo y se oxida fácilmente en el aire.', 'Oxido de gadolinio (Gd2O3)', 'Se utiliza en dispositivos médicos, imanes y en aleaciones para mejorar la conductividad.', 'En dispositivos médicos (RMN), imanes y en aleaciones de alta potencia.', 'El gadolinio tiene un bajo impacto ambiental, pero su extracción y procesamiento deben ser gestionados cuidadosamente para minimizar riesgos.', 0x696d6167655f75726c, 64, 64, 95),
(65, 65, 'El terbio fue descubierto en 1843 por Carl Gustaf Mosander en Suecia.', 'El nombre terbio proviene de la región de Terbium, en Suecia.', 'El símbolo Tb proviene de \"Terbium\".', 'El terbio es un metal raro utilizado en la fabricación de imanes y dispositivos electrónicos de alta capacidad.', 'El terbio se utiliza en la fabricación de imanes, lámparas fluorescentes y en aplicaciones de almacenamiento de energía.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2', 8.23, 1356.00, 3230.00, 'Excelente', 'Tb-159', 3, 'Es moderadamente reactivo y forma compuestos con oxígeno y el agua.', 'Oxido de terbio (Tb4O7)', 'Se utiliza en la fabricación de imanes, lámparas fluorescentes y dispositivos de almacenamiento de energía.', 'En la fabricación de imanes, lámparas fluorescentes y dispositivos electrónicos.', 'El terbio tiene un bajo impacto ambiental si se maneja adecuadamente.', 0x696d6167655f75726c, 65, 65, 98),
(66, 66, 'El disprosio fue descubierto en 1886 por Paul-Émile Lecoq de Boisbaudran en Francia.', 'El nombre disprosio proviene de la palabra griega \"dysprositos\", que significa \"difícil de obtener\".', 'El símbolo Dy proviene de \"Dysprositos\".', 'El disprosio es un metal raro utilizado en la fabricación de imanes y en aplicaciones de almacenamiento de energía.', 'El disprosio se utiliza en la fabricación de imanes permanentes de alto rendimiento y en la mejora de las propiedades de los materiales para la tecnología de energía.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2', 8.55, 1412.00, 2567.00, 'Excelente', 'Dy-164', 3, 'Es moderadamente reactivo y forma compuestos con oxígeno, agua y ácido.', 'Oxido de disprosio (Dy2O3)', 'Se utiliza en imanes de alto rendimiento, en aplicaciones electrónicas y en la fabricación de aleaciones.', 'En la fabricación de imanes de alto rendimiento, en aplicaciones electrónicas y de almacenamiento de energía.', 'El disprosio tiene un bajo impacto ambiental si se maneja adecuadamente, pero su extracción y procesamiento pueden generar residuos tóxicos.', 0x696d6167655f75726c, 66, 66, 99),
(67, 67, 'El holmio fue descubierto en 1878 por Per Theodor Cleve en Suecia.', 'El nombre holmio proviene de Estocolmo, la capital de Suecia, en latín \"Holmia\".', 'El símbolo Ho proviene de \"Holmia\".', 'El holmio es un metal raro utilizado en la fabricación de imanes y en dispositivos electrónicos de alta precisión.', 'El holmio se utiliza en la fabricación de imanes, láseres y equipos de diagnóstico médico.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2', 8.80, 1474.00, 2720.00, 'Excelente', 'Ho-165', 3, 'Es bastante reactivo, especialmente en condiciones de alta temperatura.', 'Oxido de holmio (Ho2O3)', 'Se utiliza en la fabricación de imanes, láseres, en dispositivos electrónicos de alta precisión y en la medicina.', 'En la fabricación de imanes, láseres, equipos de diagnóstico médico y dispositivos electrónicos.', 'El holmio tiene un impacto ambiental relativamente bajo si se maneja adecuadamente, aunque su extracción puede generar residuos.', 0x696d6167655f75726c, 67, 67, 100),
(68, 68, 'El erbio fue descubierto en 1843 por Carl Gustaf Mosander en Suecia.', 'El nombre erbio proviene de la ciudad de Ytterby, Suecia, donde se encontró el mineral que contenía este elemento.', 'El símbolo Er proviene de \"Erbia\".', 'El erbio es un metal raro utilizado en la fabricación de fibra óptica y en sistemas de amplificación de señales.', 'El erbio se utiliza en la fabricación de fibras ópticas para comunicaciones, así como en láseres y equipos de amplificación de señales.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2', 9.07, 1529.00, 2868.00, 'Excelente', 'Er-167', 3, 'Es moderadamente reactivo y forma compuestos con oxígeno y agua.', 'Oxido de erbio (Er2O3)', 'Se utiliza en la fabricación de fibra óptica, láseres y dispositivos de amplificación de señales.', 'En la fabricación de fibra óptica, en láseres y equipos de amplificación de señales.', 'El erbio tiene un bajo impacto ambiental si se maneja adecuadamente.', 0x696d6167655f75726c, 68, 68, 101),
(69, 69, 'El tulio fue descubierto en 1879 por Carl Gustaf Mosander en Suecia.', 'El nombre tulio proviene de Tullio, una palabra latina para referirse a la ciudad italiana de Tullio, en honor a su descubrimiento.', 'El símbolo Tm proviene de \"Tulio\".', 'El tulio es un metal raro utilizado en la fabricación de láseres y en aplicaciones científicas y médicas.', 'El tulio se utiliza en la fabricación de láseres de alta potencia y en equipos de diagnóstico médico y de imagen.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2', 9.32, 1818.00, 2227.00, 'Excelente', 'Tm-169', 3, 'Es reactivo y puede formar compuestos con oxígeno y agua.', 'Oxido de tulio (Tm2O3)', 'Se utiliza en la fabricación de láseres y dispositivos electrónicos.', 'En la fabricación de láseres, dispositivos de diagnóstico médico y en investigación científica.', 'El tulio tiene un impacto ambiental relativamente bajo si se maneja adecuadamente, aunque su extracción puede generar residuos.', 0x696d6167655f75726c, 69, 69, 104),
(70, 70, 'El iterbio fue descubierto en 1878 por Carl Gustaf Mosander en Suecia.', 'El nombre iterbio proviene de la ciudad de Ytterby, Suecia, donde se encontró el mineral que contenía este elemento.', 'El símbolo Yb proviene de \"Ytterby\".', 'El iterbio es un metal raro utilizado en la fabricación de imanes, láseres y materiales electrónicos.', 'El iterbio se utiliza en la fabricación de láseres, imanes y en la investigación científica de alta precisión.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2', 6.90, 824.00, 1196.00, 'Excelente', 'Yb-170', 3, 'Es reactivo en presencia de oxígeno y agua.', 'Oxido de iterbio (Yb2O3)', 'Se utiliza en la fabricación de láseres, imanes y en la investigación científica de alta precisión.', 'En la fabricación de láseres, imanes y dispositivos electrónicos.', 'El iterbio tiene un bajo impacto ambiental si se maneja adecuadamente.', 0x696d6167655f75726c, 70, 70, 105),
(71, 71, 'El lutecio fue descubierto en 1907 por Carl Auer von Welsbach.', 'El nombre lutecio proviene de Lutecia, el antiguo nombre de París, en honor a su descubrimiento en un mineral encontrado en esa ciudad.', 'El símbolo Lu proviene de Lutecia.', 'El lutecio es un metal raro utilizado en la fabricación de láseres, materiales nucleares y como catalizador.', 'El lutecio se utiliza principalmente en la investigación científica, en la fabricación de láseres de alta potencia y en aplicaciones nucleares.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d1', 9.84, 1663.00, 3402.00, 'Excelente', 'Lu-175', 3, 'Es reactivo en presencia de oxígeno y agua, formando compuestos con ambos.', 'Oxido de lutecio (Lu2O3)', 'Se utiliza en láseres, como catalizador y en la fabricación de equipos nucleares.', 'En la fabricación de láseres, equipos nucleares y como catalizador en la industria química.', 'El lutecio tiene un impacto ambiental bajo si se maneja adecuadamente.', 0x696d6167655f75726c, 71, 71, 107),
(72, 72, 'El hafnio fue descubierto en 1923 por Dirk Coster y Georg von Hevesy.', 'El nombre hafnio proviene de la ciudad de Copenhague, Dinamarca, en latín \"Hafnia\".', 'El símbolo Hf proviene de \"Hafnia\".', 'El hafnio es un metal utilizado en la fabricación de reactores nucleares, en la industria electrónica y en la fabricación de aleaciones de alta resistencia.', 'El hafnio es un componente clave en la fabricación de aleaciones de alta resistencia, en la industria electrónica y en reactores nucleares.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d2', 13.31, 2233.00, 4603.00, 'Excelente', 'Hf-178', 4, 'Es moderadamente reactivo, especialmente con halógenos y oxígeno.', 'Oxido de hafnio (HfO2)', 'Se utiliza en reactores nucleares, en la fabricación de chips electrónicos y en aleaciones de alta resistencia.', 'En reactores nucleares, componentes electrónicos y en la fabricación de aleaciones.', 'El hafnio tiene un bajo impacto ambiental cuando se maneja correctamente, pero su extracción y procesamiento pueden generar residuos.', 0x696d6167655f75726c, 72, 72, 109),
(73, 73, 'El tantalio fue descubierto en 1802 por Anders Ekeberg.', 'El nombre tantalio proviene de la palabra griega \"tantalos\", que significa \"sediento\" o \"insaciable\", debido a su incapacidad para disolverse en ácidos.', 'El símbolo Ta proviene de \"Tantalos\".', 'El tantalio es un metal raro utilizado principalmente en la fabricación de componentes electrónicos, en la industria aeroespacial y en dispositivos médicos.', 'El tantalio se utiliza en la fabricación de condensadores y resistores en electrónica, así como en la fabricación de implantes médicos y componentes aeroespaciales.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d3', 16.69, 3017.00, 5458.00, 'Excelente', 'Ta-180', 5, 'Es bastante reactivo, especialmente con oxígeno y ácidos.', 'Oxido de tantalio (Ta2O5)', 'Se utiliza en la fabricación de componentes electrónicos, implantes médicos y dispositivos aeroespaciales.', 'En la fabricación de componentes electrónicos, implantes médicos y en la industria aeroespacial.', 'El tantalio tiene un impacto ambiental bajo si se maneja adecuadamente, pero su extracción puede ser problemática.', 0x696d6167655f75726c, 73, 73, 111),
(74, 74, 'El wolframio (también conocido como tungsteno) fue descubierto en 1783 por los hermanos Fausto y Juan José Elhuyar.', 'El nombre wolframio proviene de la palabra alemana \"Wolfram\", que significa \"lodo de metal\", en referencia a su mineral de origen.', 'El símbolo W proviene de \"Wolfram\".', 'El wolframio es un metal utilizado en la fabricación de filamentos de bombillas, en la industria de la soldadura y en la fabricación de aleaciones de alta resistencia.', 'El wolframio se utiliza principalmente en la fabricación de filamentos de bombillas incandescentes, en la industria aeroespacial y en la producción de aleaciones.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d4', 19.25, 3422.00, 5555.00, 'Excelente', 'W-184', 6, 'Es altamente reactivo con oxígeno y se oxida fácilmente a temperaturas elevadas.', 'Oxido de wolframio (WO3)', 'Se utiliza en la fabricación de filamentos de bombillas, en la industria aeroespacial y en la fabricación de aleaciones de alta resistencia.', 'En la fabricación de filamentos de bombillas, dispositivos de soldadura y en aleaciones de alta resistencia.', 'El wolframio tiene un impacto ambiental bajo cuando se maneja adecuadamente, aunque su extracción y procesamiento pueden generar residuos peligrosos.', 0x696d6167655f75726c, 74, 74, 112),
(75, 75, 'El renio fue descubierto en 1925 por Otto Berg.', 'El nombre renio proviene del río Rin, en Europa, cerca del lugar donde se descubrió el elemento.', 'El símbolo Re proviene de \"Rhenium\".', 'El renio es un metal raro utilizado en la fabricación de aleaciones de alta temperatura y en catalizadores para la industria química.', 'El renio se utiliza en la fabricación de turbinas de gas, en la industria aeroespacial y en la producción de catalizadores para la refinación de petróleo.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d5', 21.02, 3186.00, 5596.00, 'Excelente', 'Re-185', 7, 'Es reactivo, especialmente en presencia de oxígeno y halógenos.', 'Oxido de renio (Re2O7)', 'Se utiliza en aleaciones de alta temperatura, catalizadores para la industria química y en la fabricación de componentes aeroespaciales.', 'En la fabricación de turbinas de gas, catalizadores para la refinación de petróleo y en componentes aeroespaciales.', 'El renio tiene un bajo impacto ambiental si se maneja adecuadamente, aunque su extracción puede ser costosa y generar residuos.', 0x696d6167655f75726c, 75, 75, 115),
(76, 76, 'El osmio fue descubierto en 1803 por Smithson Tennant.', 'El nombre osmio proviene de la palabra griega \"osme\", que significa \"olor\", debido al fuerte olor de su óxido.', 'El símbolo Os proviene de \"Osme\".', 'El osmio es un metal raro y denso utilizado en la fabricación de contactos eléctricos, plumas de bolígrafo de alta calidad y como catalizador en reacciones químicas.', 'El osmio se utiliza en aplicaciones especializadas como contactos eléctricos, dispositivos médicos y en la producción de compuestos químicos.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d6', 22.59, 3045.00, 5027.00, 'Buena', 'Os-187', 8, 'Es moderadamente reactivo con oxígeno, formando óxidos tóxicos.', 'Oxido de osmio (OsO4)', 'Se utiliza en contactos eléctricos, plumas de bolígrafo de lujo y como catalizador en la industria química.', 'En la fabricación de dispositivos médicos, contactos eléctricos y en plumas de bolígrafo.', 'El osmio tiene un impacto ambiental moderado debido a la toxicidad de sus óxidos.', 0x696d6167655f75726c, 76, 76, 116),
(77, 77, 'El iridio fue descubierto en 1803 por Smithson Tennant.', 'El nombre iridio proviene del latín \"iris\", que significa \"arco iris\", debido a la variedad de colores de sus compuestos.', 'El símbolo Ir proviene de \"Iris\".', 'El iridio es un metal raro y denso utilizado en la fabricación de dispositivos electrónicos, joyería y en la industria aeroespacial como material de alta resistencia.', 'El iridio se utiliza en la fabricación de componentes electrónicos, en la industria aeroespacial y en joyería de alta gama.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d7', 22.56, 2446.00, 4130.00, 'Buena', 'Ir-191', 9, 'Es muy reactivo en contacto con halógenos, pero bastante estable frente al oxígeno.', 'Oxido de iridio (IrO2)', 'Se utiliza en la fabricación de componentes electrónicos, joyería de lujo y en la industria aeroespacial.', 'En joyería de lujo, componentes electrónicos y en la industria aeroespacial.', 'El iridio tiene un impacto ambiental bajo, aunque su extracción puede ser costosa y generar residuos.', 0x696d6167655f75726c, 77, 77, 118),
(78, 78, 'El platino fue descubierto en 1735 por Antonio de Ulloa.', 'El nombre platino proviene del término español \"platina\", que significa \"pequeña plata\", debido a su apariencia similar a la plata.', 'El símbolo Pt proviene de \"Platina\".', 'El platino es un metal noble utilizado en la fabricación de catalizadores automotrices, joyería, y en la producción de dispositivos médicos.', 'El platino se utiliza principalmente como catalizador en los convertidores de emisiones de automóviles y en la fabricación de joyería.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d9', 21.45, 1768.00, 3825.00, 'Excelente', 'Pt-195', 10, 'Es bastante reactivo con cloro y ácido nítrico, pero es resistente a la corrosión.', 'Oxido de platino (PtO2)', 'Se utiliza en la fabricación de convertidores catalíticos, joyería y dispositivos médicos.', 'En la fabricación de convertidores catalíticos, joyería y dispositivos médicos.', 'El platino tiene un bajo impacto ambiental si se maneja adecuadamente, aunque la extracción y procesamiento pueden generar residuos.', 0x696d6167655f75726c, 78, 78, 119),
(79, 79, 'El oro fue conocido desde tiempos antiguos y documentado en la antigüedad.', 'El nombre oro proviene del latín \"aurum\", que significa \"brillante\" o \"resplandeciente\".', 'El símbolo Au proviene de \"Aurum\".', 'El oro es un metal precioso ampliamente utilizado en joyería, en la fabricación de monedas y en la industria electrónica debido a su alta conductividad.', 'El oro se utiliza principalmente en la fabricación de joyas, monedas, y como material conductor en la electrónica de alta precisión.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 19.32, 1064.00, 2970.00, 'Excelente', 'Au-197', 11, 'Es muy estable y no reacciona con oxígeno, ácido o agua.', 'Oxido de oro (Au2O3)', 'Se utiliza en joyería, en la fabricación de monedas y en la industria electrónica.', 'En joyería, monedas y dispositivos electrónicos de alta precisión.', 'El oro tiene un impacto ambiental bajo, aunque su minería puede generar grandes impactos ecológicos.', 0x696d6167655f75726c, 79, 79, 122),
(80, 80, 'El mercurio fue conocido desde la antigüedad y documentado en la China antigua.', 'El nombre mercurio proviene del latín \"mercurius\", en referencia al dios romano del comercio, debido a su fluidez y movilidad.', 'El símbolo Hg proviene de \"Hydrargyrum\", que significa \"agua plateada\" en latín.', 'El mercurio es un metal líquido utilizado en termómetros, barómetros y en la industria de la minería y la producción de energía.', 'El mercurio se utiliza principalmente en la fabricación de termómetros, barómetros y en la minería de oro.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 13.53, -38.83, 356.73, 'Excelente', 'Hg-202', 12, 'Es altamente reactivo con oxígeno, halógenos y metales pesados.', 'Oxido de mercurio (HgO)', 'Se utiliza en termómetros, barómetros y en la minería de oro.', 'En la fabricación de termómetros, barómetros y en procesos de minería.', 'El mercurio es altamente tóxico para el medio ambiente, y su liberación puede tener efectos destructivos.', 0x696d6167655f75726c, 80, 80, 124),
(81, 81, 'El talio fue descubierto en 1861 por William Crookes.', 'El nombre talio proviene del griego \"thallos\", que significa \"brote verde\", debido a la coloración verde de su óxido.', 'El símbolo Tl proviene de \"thallos\".', 'El talio es un metal pesado tóxico utilizado en la fabricación de semiconductores, dispositivos electrónicos y en la industria farmacéutica.', 'El talio se utiliza principalmente en la fabricación de dispositivos electrónicos, semiconductores y en el tratamiento de algunas enfermedades.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 11.85, 304.00, 1473.00, 'Buena', 'Tl-205', 13, 'Es un metal altamente reactivo, especialmente cuando se oxida en el aire.', 'Oxido de talio (Tl2O3)', 'Se utiliza en la fabricación de semiconductores, dispositivos electrónicos y en el tratamiento de algunas enfermedades.', 'En semiconductores, dispositivos electrónicos y tratamientos médicos específicos.', 'El talio es altamente tóxico, y su liberación puede tener un gran impacto ambiental, afectando tanto a la fauna como a los seres humanos.', 0x696d6167655f75726c, 81, 81, 126),
(82, 82, 'El plomo fue conocido desde la antigüedad y utilizado en diversas culturas.', 'El nombre plomo proviene del latín \"plumbum\".', 'El símbolo Pb proviene de \"Plumbum\".', 'El plomo es un metal pesado utilizado en la fabricación de baterías, en la protección contra radiación y en la industria de la construcción.', 'El plomo se utiliza principalmente en la fabricación de baterías de plomo-ácido, y como material de protección contra radiación en aplicaciones médicas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 11.34, 327.50, 1740.00, 'Buena', 'Pb-206', 14, 'Es un metal altamente reactivo en presencia de oxígeno, especialmente cuando se expone al aire.', 'Oxido de plomo (PbO)', 'Se utiliza en la fabricación de baterías de plomo-ácido, protección contra radiación y en la industria de la construcción.', 'En baterías de plomo-ácido, protección contra radiación y aplicaciones en construcción.', 'El plomo es altamente tóxico para el medio ambiente, y su liberación puede tener efectos negativos sobre la salud humana y animal.', 0x696d6167655f75726c, 82, 82, 127),
(83, 83, 'El bismuto fue descubierto en 1753 por Claude François Geoffroy.', 'El nombre bismuto proviene del alemán \"wismut\", que significa \"materia pesada\".', 'El símbolo Bi proviene de \"Bismuthum\".', 'El bismuto es un metal pesado y quebradizo utilizado en aleaciones, cosméticos y en la industria farmacéutica.', 'El bismuto se utiliza principalmente en aleaciones, productos cosméticos y como material en medicamentos para el tratamiento de problemas digestivos.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 9.78, 271.50, 1564.00, 'Buena', 'Bi-209', 15, 'Es moderadamente reactivo, especialmente en contacto con ácidos.', 'Oxido de bismuto (Bi2O3)', 'Se utiliza en aleaciones, cosméticos y en productos farmacéuticos.', 'En cosméticos, aleaciones y en productos farmacéuticos para tratar problemas digestivos.', 'El bismuto tiene un bajo impacto ambiental, aunque su extracción puede generar residuos tóxicos.', 0x696d6167655f75726c, 83, 83, 127),
(84, 84, 'El polonio fue descubierto en 1898 por Marie y Pierre Curie.', 'El nombre polonio proviene de Polonia, el país natal de Marie Curie.', 'El símbolo Po proviene de \"Polonia\".', 'El polonio es un elemento radiactivo utilizado en la fabricación de dispositivos de ionización y en investigaciones científicas sobre radiactividad.', 'El polonio se utiliza principalmente en dispositivos de ionización y en investigaciones científicas relacionadas con la radiactividad.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 9.32, 254.00, 962.00, 'Moderada', 'Po-210', 16, 'Es altamente radiactivo y reacciona rápidamente con oxígeno y halógenos.', 'Oxido de polonio (Po2)', 'Se utiliza en dispositivos de ionización y en investigaciones científicas sobre radiactividad.', 'En dispositivos de ionización y en investigaciones científicas sobre radiactividad.', 'El polonio tiene un impacto ambiental extremadamente alto debido a su radiactividad y su toxicidad.', 0x696d6167655f75726c, 84, 84, 125),
(85, 85, 'El astato fue descubierto en 1940 por Dale R. Corson, Kenneth Ross MacKenzie y Emilio Segrè.', 'El nombre astato proviene del griego \"astatos\", que significa \"inestable\", debido a la naturaleza radiactiva del elemento.', 'El símbolo At proviene de \"Astatos\".', 'El astato es un elemento radiactivo utilizado en la investigación científica y en la radioterapia en dosis muy pequeñas.', 'El astato se utiliza principalmente en investigaciones científicas y en aplicaciones médicas limitadas como parte de la radioterapia.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 6.99, 302.00, 337.00, 'Moderada', 'At-210', 17, 'Es altamente radiactivo, reaccionando rápidamente con oxígeno y halógenos.', 'Oxido de astato (At2O)', 'Se utiliza en investigaciones científicas y en aplicaciones médicas limitadas.', 'En investigaciones científicas y en aplicaciones de radioterapia.', 'El astato tiene un impacto ambiental alto debido a su radiactividad y escasa presencia en la naturaleza.', 0x696d6167655f75726c, 85, 85, 124),
(86, 86, 'El radón fue descubierto en 1899 por Friedrich Oskar Giesel.', 'El nombre radón proviene de \"radio\", debido a su relación con el radiactivo radiactivo y su origen en el gas radiactivo.', 'El símbolo Rn proviene de \"Radium\" y \"gas noble\".', 'El radón es un gas noble radiactivo utilizado principalmente en terapias médicas y en estudios de radiactividad.', 'El radón se utiliza en algunos tratamientos médicos, aunque su presencia y liberación en el ambiente se asocia con riesgos de cáncer de pulmón.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 9.73, -71.00, -62.00, 'Nulo', 'Rn-222', 18, 'Reacciona rápidamente con oxígeno y otros gases para formar compuestos tóxicos.', 'Oxido de radón (RnO)', 'Se utiliza en terapias médicas y en investigaciones radiactivas.', 'En terapia médica y estudios de radiactividad.', 'El radón tiene un alto impacto ambiental debido a su radiactividad y su potencial de ser una causa importante de cáncer de pulmón.', 0x696d6167655f75726c, 86, 86, 136),
(87, 87, 'El francio fue descubierto en 1939 por Marguerite Perey.', 'El nombre francio proviene de Francia, el país de origen de su descubrimiento.', 'El símbolo Fr proviene de \"Francia\".', 'El francio es un metal alcalino radiactivo, muy raro y altamente inestable, utilizado principalmente en investigaciones científicas.', 'El francio se utiliza principalmente en investigaciones científicas, aunque su disponibilidad es extremadamente limitada debido a su radiactividad y corta vida útil.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 1.87, 27.00, 677.00, 'Muy baja', 'Fr-223', 1, 'El francio reacciona rápidamente con el oxígeno y el agua para formar compuestos muy inestables.', 'Oxido de francio (Fr2O)', 'Se utiliza principalmente en investigaciones científicas.', 'En investigaciones científicas.', 'El francio tiene un impacto ambiental extremadamente alto debido a su radiactividad y escasa disponibilidad.', 0x696d6167655f75726c, 87, 87, 136),
(88, 88, 'El radio fue descubierto en 1898 por Marie y Pierre Curie.', 'El nombre radio proviene del latín \"radius\", que significa \"rayo\", debido a la intensa radiactividad que emite.', 'El símbolo Ra proviene de \"Radium\".', 'El radio es un metal radiactivo utilizado en la industria médica para el tratamiento de ciertos tipos de cáncer.', 'El radio se utiliza en medicina, especialmente en radioterapia, aunque su uso ha disminuido debido a su radiactividad y los riesgos asociados.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 5.50, 700.00, 1413.00, 'Buena', 'Ra-226', 2, 'Reacciona con agua y oxígeno formando compuestos radiactivos.', 'Oxido de radio (RaO)', 'Se utiliza en radioterapia y en la fabricación de tubos radiactivos.', 'En radioterapia y tubos radiactivos.', 'El radio tiene un impacto ambiental y en la salud muy alto debido a su radiactividad.', 0x696d6167655f75726c, 88, 88, 138),
(89, 89, 'El actinio fue descubierto en 1899 por Friedrich Oskar Giesel.', 'El nombre actinio proviene del griego \"aktinos\", que significa \"rayo\" debido a su radiactividad.', 'El símbolo Ac proviene de \"Actinium\".', 'El actinio es un metal radiactivo utilizado principalmente en investigaciones científicas sobre radiactividad y en ciertos tipos de radioterapia.', 'El actinio se utiliza principalmente en investigaciones científicas, aunque también se utiliza en radioterapia debido a su capacidad de emitir partículas alfa.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 1.90, 1050.00, 327.00, 'Alta', 'Ac-227', 3, 'Es altamente reactivo, especialmente cuando está expuesto al oxígeno y a otros compuestos.', 'Oxido de actinio (Ac2O3)', 'Se utiliza principalmente en investigaciones científicas y radioterapia.', 'En investigaciones científicas y radioterapia.', 'El actinio tiene un alto impacto ambiental debido a su radiactividad y su alta toxicidad.', 0x696d6167655f75726c, 89, 89, 138),
(90, 90, 'El torio fue descubierto en 1828 por Jöns Jakob Berzelius.', 'El nombre torio proviene de \"Thor\", el dios nórdico del trueno.', 'El símbolo Th proviene de \"Thorium\".', 'El torio es un metal radiactivo utilizado principalmente como fuente de energía en reactores nucleares.', 'El torio se utiliza principalmente en reactores nucleares, y se considera una alternativa a la uranio debido a su abundancia y menor radiactividad.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 11.72, 1750.00, 5061.00, 'Buena', 'Th-232', 4, 'Es altamente reactivo con el oxígeno y otros compuestos, formando óxidos inestables.', 'Oxido de torio (ThO2)', 'Se utiliza en reactores nucleares y en la fabricación de aleaciones resistentes a altas temperaturas.', 'En reactores nucleares, aleaciones y en la producción de energía.', 'El torio tiene un impacto ambiental potencialmente alto debido a su radiactividad, pero su uso en energía nuclear es más seguro que el uranio.', 0x696d6167655f75726c, 90, 90, 142),
(91, 91, 'El protactinio fue descubierto en 1896 por Otto Hahn y Lise Meitner.', 'El nombre protactinio proviene del griego \"protos\" (primero) y \"aktinos\" (rayo), ya que se predijo que sería el precursor del elemento más pesado, el uranio.', 'El símbolo Pa proviene de \"Protactinium\".', 'El protactinio es un metal radiactivo utilizado principalmente en investigaciones científicas sobre radiactividad y en reactores nucleares.', 'El protactinio se utiliza en investigaciones científicas debido a su alta radiactividad y como precursor de uranio en algunas reacciones nucleares.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 15.37, 1568.00, 4027.00, 'Moderada', 'Pa-231', 5, 'Reacciona con oxígeno y otros elementos formando compuestos radiactivos.', 'Oxido de protactinio (Pa2O5)', 'Se utiliza en reactores nucleares y en investigaciones radiactivas.', 'En reactores nucleares y estudios de radiactividad.', 'El protactinio tiene un impacto ambiental muy alto debido a su radiactividad y su alta toxicidad.', 0x696d6167655f75726c, 91, 91, 140),
(92, 92, 'El uranio fue descubierto en 1789 por Martin Heinrich Klaproth.', 'El nombre uranio proviene de Urano, el planeta, debido a su descubrimiento poco después de que se descubriese el planeta.', 'El símbolo U proviene de \"Uranium\".', 'El uranio es un metal radiactivo utilizado principalmente como combustible nuclear en reactores nucleares y en la fabricación de armas nucleares.', 'El uranio se utiliza principalmente en la producción de energía nuclear y como material para armas nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 18.95, 1132.00, 4131.00, 'Buena', 'U-238', 6, 'Reacciona con oxígeno, formando compuestos como el óxido de uranio.', 'Oxido de uranio (UO2)', 'Se utiliza en reactores nucleares, fabricación de armas nucleares y en medicina nuclear.', 'En reactores nucleares, armas nucleares, medicina y energía.', 'El uranio tiene un alto impacto ambiental y en la salud debido a su radiactividad y los residuos nucleares.', 0x696d6167655f75726c, 92, 92, 146),
(93, 93, 'El neptunio fue descubierto en 1940 por Glenn T. Seaborg, Arthur C. Wahl y Joseph W. Kennedy.', 'El nombre neptunio proviene de Neptuno, el planeta, ya que fue el primer elemento transuránico descubierto después del uranio.', 'El símbolo Np proviene de \"Neptunium\".', 'El neptunio es un metal radiactivo utilizado principalmente en investigaciones nucleares y en la fabricación de reactores nucleares.', 'El neptunio se utiliza en la fabricación de combustibles nucleares y en investigaciones nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 20.45, 640.00, 3902.00, 'Buena', 'Np-239', 7, 'Es altamente reactivo con oxígeno y otros compuestos químicos, formando compuestos radiactivos.', 'Oxido de neptunio (NpO2)', 'Se utiliza en investigaciones nucleares y como fuente de neutrones.', 'En investigaciones nucleares y como fuente de neutrones en reactores.', 'El neptunio tiene un impacto ambiental significativo debido a su radiactividad y su toxicidad.', 0x696d6167655f75726c, 93, 93, 150);
INSERT INTO `element_details` (`id`, `element_id`, `discovery_description`, `name_origin`, `symbol_meaning`, `periodic_law_description`, `periodic_table_evolution`, `electronic_configuration`, `density`, `melting_point`, `boiling_point`, `conductivity`, `isotopes`, `valence`, `reactivity`, `typical_compounds`, `industrial_uses`, `everyday_uses`, `environmental_impact`, `image`, `protons`, `electrons`, `neutrons`) VALUES
(94, 94, 'El plutonio fue descubierto en 1940 por Glenn T. Seaborg, Arthur C. Wahl y Joseph W. Kennedy.', 'El nombre plutonio proviene de Plutón, el planeta.', 'El símbolo Pu proviene de \"Plutonium\".', 'El plutonio es un metal radiactivo utilizado principalmente en reactores nucleares y en la fabricación de armas nucleares.', 'El plutonio se utiliza principalmente en reactores nucleares y en la fabricación de armas nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 19.86, 640.00, 3235.00, 'Buena', 'Pu-239', 8, 'Es altamente reactivo con el oxígeno y el agua, formando compuestos radiactivos.', 'Oxido de plutonio (PuO2)', 'Se utiliza en reactores nucleares y como fuente de energía.', 'En reactores nucleares, energía y en armas nucleares.', 'El plutonio tiene un alto impacto ambiental debido a su radiactividad y su toxicidad.', 0x696d6167655f75726c, 94, 94, 150),
(95, 95, 'El americio fue descubierto en 1944 por Glenn T. Seaborg y Ralph A. James.', 'El nombre americio proviene del continente americano, en honor a su descubrimiento en los EE.UU.', 'El símbolo Am proviene de \"Americium\".', 'El americio es un metal radiactivo utilizado principalmente en detectores de humo y en medicina.', 'El americio se utiliza en detectores de humo, investigaciones nucleares y en aplicaciones médicas debido a su radiactividad.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 13.67, 1176.00, 2880.00, 'Buena', 'Am-241', 9, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de americio (AmO2)', 'Se utiliza en detectores de humo, en medicina y en fuentes de neutrones.', 'En detectores de humo y en medicina nuclear.', 'El americio tiene un impacto ambiental debido a su radiactividad y a los residuos nucleares.', 0x696d6167655f75726c, 95, 95, 148),
(96, 96, 'El curio fue descubierto en 1944 por Albert Ghiorso, Glenn T. Seaborg y Ralph A. James.', 'El nombre curio proviene de Marie y Pierre Curie, famosos pioneros en el estudio de la radiactividad.', 'El símbolo Cm proviene de \"Curium\".', 'El curio es un elemento radiactivo utilizado principalmente en investigaciones nucleares.', 'El curio se utiliza principalmente en fuentes de neutrones y en investigaciones nucleares.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 13.51, 1340.00, 3110.00, 'Buena', 'Cm-244', 10, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de curio (CmO2)', 'Se utiliza en investigaciones nucleares y en aplicaciones como fuentes de neutrones.', 'En investigación nuclear y en fuentes de neutrones.', 'El curio tiene un impacto ambiental debido a su alta radiactividad.', 0x696d6167655f75726c, 96, 96, 151),
(97, 97, 'El berkelio fue descubierto en 1949 por Glenn T. Seaborg, Albert Ghiorso y Ralph A. James.', 'El nombre berkelio proviene de la ciudad de Berkeley, California, donde fue descubierto.', 'El símbolo Bk proviene de \"Berkelium\".', 'El berkelio es un elemento radiactivo utilizado principalmente en investigaciones nucleares.', 'El berkelio se utiliza en la fabricación de reactores nucleares y en la investigación nuclear debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 14.78, 986.00, 3147.00, 'Buena', 'Bk-249', 11, 'Es altamente reactivo con oxígeno, formando compuestos radiactivos.', 'Oxido de berkelio (BkO2)', 'Se utiliza en reactores nucleares y en investigaciones nucleares.', 'En investigaciones nucleares y en reactores nucleares.', 'El berkelio tiene un impacto ambiental debido a su radiactividad y toxicidad.', 0x696d6167655f75726c, 97, 97, 154),
(98, 98, 'El californio fue descubierto en 1950 por Glenn T. Seaborg, Albert Ghiorso y Glenn L. Larrabee.', 'El nombre californio proviene del estado de California, en honor al laboratorio de Berkeley.', 'El símbolo Cf proviene de \"Californium\".', 'El californio es un elemento radiactivo utilizado en investigaciones nucleares y en algunos reactores nucleares.', 'El californio se utiliza en la fabricación de reactores nucleares y en investigaciones científicas debido a su radiactividad.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 15.10, 900.00, 1470.00, 'Buena', 'Cf-252', 12, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de californio (CfO2)', 'Se utiliza en investigaciones nucleares y en fuentes de neutrones.', 'En investigación nuclear y fuentes de neutrones.', 'El californio tiene un impacto ambiental significativo debido a su radiactividad y sus residuos nucleares.', 0x696d6167655f75726c, 98, 98, 154),
(99, 99, 'El einstenio fue descubierto en 1952 por Albert Ghiorso, Glenn T. Seaborg y Sylvia M. T. Seaborg.', 'El nombre einstenio proviene de Albert Einstein, en honor a su contribución al campo de la física.', 'El símbolo Es proviene de \"Einsteinium\".', 'El einstenio es un elemento radiactivo utilizado en investigaciones nucleares y en el estudio de la radiactividad.', 'El einstenio se utiliza principalmente en investigaciones nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 13.50, 860.00, 1530.00, 'Buena', 'Es-252', 13, 'Reacciona con oxígeno y otros compuestos formando compuestos radiactivos.', 'Oxido de einstenio (EsO2)', 'Se utiliza en investigaciones nucleares y en fuentes de neutrones.', 'En investigación nuclear y fuentes de neutrones.', 'El einstenio tiene un impacto ambiental debido a su radiactividad y sus residuos nucleares.', 0x696d6167655f75726c, 99, 99, 158),
(100, 100, 'El fermio fue descubierto en 1952 por Albert Ghiorso, Glenn T. Seaborg y Bernard G. Harvey.', 'El nombre fermio proviene de Enrico Fermi, un físico que contribuyó al desarrollo de la teoría nuclear.', 'El símbolo Fm proviene de \"Fermium\".', 'El fermio es un elemento radiactivo utilizado principalmente en investigaciones nucleares y en el estudio de la radiactividad.', 'El fermio se utiliza en investigaciones nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 19.10, 1527.00, 3000.00, 'Buena', 'Fm-257', 14, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de fermio (FmO2)', 'Se utiliza en investigaciones nucleares y como fuente de neutrones.', 'En investigaciones nucleares y como fuente de neutrones.', 'El fermio tiene un impacto ambiental debido a su radiactividad y sus residuos nucleares.', 0x696d6167655f75726c, 100, 100, 158),
(101, 101, 'El mendelévio fue descubierto en 1955 por Albert Ghiorso, Glenn T. Seaborg y Ralph A. James.', 'El nombre mendelévio proviene de Dmitri Mendeléyev, el creador de la tabla periódica de los elementos.', 'El símbolo Md proviene de \"Mendelevium\".', 'El mendelévio es un elemento radiactivo utilizado en investigaciones nucleares y en el estudio de la radiactividad.', 'El mendelévio se utiliza principalmente en investigaciones nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 17.60, 1100.00, 2600.00, 'Buena', 'Md-258', 15, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de mendelévio (MdO2)', 'Se utiliza en investigaciones nucleares y en el estudio de la radiactividad.', 'En investigaciones nucleares y en el estudio de la radiactividad.', 'El mendelévio tiene un impacto ambiental debido a su radiactividad y sus residuos nucleares.', 0x696d6167655f75726c, 101, 101, 158),
(102, 102, 'El nobelio fue descubierto en 1958 por Albert Ghiorso, Glenn T. Seaborg y otros.', 'El nombre nobelio proviene de Alfred Nobel, el inventor de la dinamita y el fundador del Premio Nobel.', 'El símbolo No proviene de \"Nobelium\".', 'El nobelio es un elemento radiactivo utilizado principalmente en investigaciones nucleares y en el estudio de la radiactividad.', 'El nobelio se utiliza en investigaciones nucleares debido a su radiactividad.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 18.70, 1100.00, 2300.00, 'Buena', 'No-259', 16, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de nobelio (NoO2)', 'Se utiliza en investigaciones nucleares y en el estudio de la radiactividad.', 'En investigaciones nucleares y en el estudio de la radiactividad.', 'El nobelio tiene un impacto ambiental debido a su radiactividad y sus residuos nucleares.', 0x696d6167655f75726c, 102, 102, 160),
(103, 103, 'El lawrencio fue descubierto en 1961 por Albert Ghiorso, Glenn T. Seaborg y otros.', 'El nombre lawrencio proviene de Ernest O. Lawrence, quien desarrolló el ciclotrón.', 'El símbolo Lr proviene de \"Lawrencium\".', 'El lawrencio es un elemento radiactivo utilizado en investigaciones nucleares y en el estudio de la radiactividad.', 'El lawrencio se utiliza en investigaciones nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 19.00, 1627.00, 4000.00, 'Buena', 'Lr-260', 17, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de lawrencio (LrO2)', 'Se utiliza en investigaciones nucleares y en el estudio de la radiactividad.', 'En investigaciones nucleares y en el estudio de la radiactividad.', 'El lawrencio tiene un impacto ambiental debido a su radiactividad y sus residuos nucleares.', 0x696d6167655f75726c, 103, 103, 164),
(104, 104, 'El rutherfordio fue descubierto en 1969 por un equipo de científicos de la Unión Soviética.', 'El nombre rutherfordio proviene de Ernest Rutherford, el científico que contribuyó al descubrimiento de la radiactividad.', 'El símbolo Rf proviene de \"Rutherfordium\".', 'El rutherfordio es un elemento radiactivo utilizado en investigaciones nucleares.', 'El rutherfordio se utiliza en investigaciones nucleares debido a su radiactividad.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 23.00, 2400.00, 5000.00, 'Buena', 'Rf-267', 18, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de rutherfordio (RfO2)', 'Se utiliza en investigaciones nucleares.', 'En investigaciones nucleares.', 'El rutherfordio tiene un impacto ambiental debido a su radiactividad.', 0x696d6167655f75726c, 104, 104, 166),
(105, 105, 'El dubnio fue descubierto en 1970 por científicos de la Unión Soviética y Estados Unidos.', 'El nombre dubnio proviene de Dubna, Rusia, donde se realizó su descubrimiento.', 'El símbolo Db proviene de \"Dubnium\".', 'El dubnio es un elemento radiactivo utilizado en investigaciones nucleares.', 'El dubnio se utiliza en investigaciones nucleares debido a su radiactividad.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 29.00, 1500.00, 5000.00, 'Buena', 'Db-270', 19, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de dubnio (DbO2)', 'Se utiliza en investigaciones nucleares.', 'En investigaciones nucleares.', 'El dubnio tiene un impacto ambiental debido a su radiactividad.', 0x696d6167655f75726c, 105, 105, 166),
(106, 106, 'El seaborgio fue descubierto en 1974 por científicos de la Universidad de California.', 'El nombre seaborgio proviene de Glenn T. Seaborg, un químico estadounidense que ayudó a descubrir los elementos actínidos.', 'El símbolo Sg proviene de \"Seaborgium\".', 'El seaborgio es un elemento radiactivo utilizado en investigaciones nucleares y en el estudio de la radiactividad.', 'El seaborgio se utiliza en investigaciones nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 30.00, 1300.00, 5000.00, 'Buena', 'Sg-271', 21, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de seaborgio (SgO2)', 'Se utiliza en investigaciones nucleares.', 'En investigaciones nucleares.', 'El seaborgio tiene un impacto ambiental debido a su radiactividad.', 0x696d6167655f75726c, 106, 106, 164),
(107, 107, 'El bohrium fue descubierto en 1976 por un equipo de científicos de Alemania y Rusia.', 'El nombre bohrium proviene de Niels Bohr, el físico danés conocido por su modelo del átomo.', 'El símbolo Bh proviene de \"Bohrium\".', 'El bohrium es un elemento radiactivo utilizado principalmente en investigaciones nucleares.', 'El bohrium se utiliza en investigaciones nucleares debido a su radiactividad.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 35.00, 1500.00, 5500.00, 'Buena', 'Bh-270', 22, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de bohrium (BhO2)', 'Se utiliza en investigaciones nucleares.', 'En investigaciones nucleares.', 'El bohrium tiene un impacto ambiental debido a su radiactividad.', 0x696d6167655f75726c, 107, 107, 164),
(108, 108, 'El hassio fue descubierto en 1984 por un equipo de científicos de Alemania.', 'El nombre hassio proviene del estado alemán de Hesse, donde se realizó el descubrimiento.', 'El símbolo Hs proviene de \"Hassium\".', 'El hassio es un elemento radiactivo utilizado en investigaciones nucleares y en el estudio de la radiactividad.', 'El hassio se utiliza en investigaciones nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 37.00, 1500.00, 6000.00, 'Buena', 'Hs-277', 23, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de hassio (HsO2)', 'Se utiliza en investigaciones nucleares.', 'En investigaciones nucleares.', 'El hassio tiene un impacto ambiental debido a su radiactividad.', 0x696d6167655f75726c, 108, 108, 162),
(109, 109, 'El meitnerio fue descubierto en 1982 por un equipo de científicos alemanes.', 'El nombre meitnerio proviene de Lise Meitner, una física austriaca conocida por sus contribuciones al descubrimiento de la fisión nuclear.', 'El símbolo Mt proviene de \"Meitnerium\".', 'El meitnerio es un elemento radiactivo utilizado en investigaciones nucleares y en el estudio de la radiactividad.', 'El meitnerio se utiliza en investigaciones nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 39.00, 1500.00, 6000.00, 'Buena', 'Mt-278', 24, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de meitnerio (MtO2)', 'Se utiliza en investigaciones nucleares.', 'En investigaciones nucleares.', 'El meitnerio tiene un impacto ambiental debido a su radiactividad.', 0x696d6167655f75726c, 109, 109, 162),
(110, 110, 'El darmstadtio fue descubierto en 1994 por un equipo de científicos alemanes.', 'El nombre darmstadtio proviene de Darmstadt, Alemania, donde se realizó el descubrimiento.', 'El símbolo Ds proviene de \"Darmstadtium\".', 'El darmstadtio es un elemento radiactivo utilizado en investigaciones nucleares.', 'El darmstadtio se utiliza en investigaciones nucleares debido a su radiactividad.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 40.00, 1500.00, 6500.00, 'Buena', 'Ds-281', 25, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de darmstadtio (DsO2)', 'Se utiliza en investigaciones nucleares.', 'En investigaciones nucleares.', 'El darmstadtio tiene un impacto ambiental debido a su radiactividad.', 0x696d6167655f75726c, 110, 110, 159),
(111, 111, 'El roentgenio fue descubierto en 1994 por un equipo de científicos alemanes.', 'El nombre roentgenio proviene de Wilhelm Röntgen, físico alemán conocido por descubrir los rayos X.', 'El símbolo Rg proviene de \"Roentgenium\".', 'El roentgenio es un elemento radiactivo utilizado en investigaciones nucleares.', 'El roentgenio se utiliza en investigaciones nucleares debido a su radiactividad.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 45.00, 1500.00, 7000.00, 'Buena', 'Rg-280', 26, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de roentgenio (RgO2)', 'Se utiliza en investigaciones nucleares.', 'En investigaciones nucleares.', 'El roentgenio tiene un impacto ambiental debido a su radiactividad.', 0x696d6167655f75726c, 111, 111, 159),
(112, 112, 'El copernicio fue descubierto en 1996 por un equipo de científicos de Alemania.', 'El nombre copernicio proviene de Nicolás Copérnico, astrónomo y matemático polaco.', 'El símbolo Cn proviene de \"Copernicium\".', 'El copernicio es un elemento radiactivo utilizado en investigaciones nucleares.', 'El copernicio se utiliza en investigaciones nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 27.00, 1600.00, 7200.00, 'Buena', 'Cn-285', 27, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de copernicio (CnO2)', 'Se utiliza en investigaciones nucleares.', 'En investigaciones nucleares.', 'El copernicio tiene un impacto ambiental debido a su radiactividad.', 0x696d6167655f75726c, 112, 112, 159),
(113, 113, 'El nihonio fue descubierto en 2004 por un equipo de científicos rusos y japoneses.', 'El nombre nihonio proviene de Japón, ya que \"Nihon\" es el nombre japonés para Japón.', 'El símbolo Nh proviene de \"Nihonium\".', 'El nihonio es un elemento radiactivo que se utiliza en investigaciones nucleares.', 'El nihonio se utiliza en investigaciones nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 28.00, 1700.00, 7400.00, 'Buena', 'Nh-284', 28, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de nihonio (NhO2)', 'Se utiliza en investigaciones nucleares.', 'En investigaciones nucleares.', 'El nihonio tiene un impacto ambiental debido a su radiactividad.', 0x696d6167655f75726c, 113, 113, 157),
(114, 114, 'El flerovio fue descubierto en 1998 por un equipo de científicos rusos.', 'El nombre flerovio proviene de Georgy Flerov, un físico ruso conocido por sus contribuciones a la física nuclear.', 'El símbolo Fl proviene de \"Flerovium\".', 'El flerovio es un elemento radiactivo utilizado en investigaciones nucleares.', 'El flerovio se utiliza en investigaciones nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 29.00, 1800.00, 7600.00, 'Buena', 'Fl-289', 29, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de flerovio (FlO2)', 'Se utiliza en investigaciones nucleares.', 'En investigaciones nucleares.', 'El flerovio tiene un impacto ambiental debido a su radiactividad.', 0x696d6167655f75726c, 114, 114, 157),
(115, 115, 'El moscovio fue descubierto en 2003 por un equipo de científicos rusos y estadounidenses.', 'El nombre moscovio proviene de Moscú, la capital de Rusia.', 'El símbolo Mc proviene de \"Moscovium\".', 'El moscovio es un elemento radiactivo que se utiliza en investigaciones nucleares.', 'El moscovio se utiliza en investigaciones nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 30.00, 1900.00, 7800.00, 'Buena', 'Mc-290', 30, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de moscovio (McO2)', 'Se utiliza en investigaciones nucleares.', 'En investigaciones nucleares.', 'El moscovio tiene un impacto ambiental debido a su radiactividad.', 0x696d6167655f75726c, 115, 115, 157),
(116, 116, 'El livermorio fue descubierto en 2000 por un equipo de científicos rusos y estadounidenses.', 'El nombre livermorio proviene de la Universidad de California, Berkeley (donde está ubicada la sede de investigación de Livermore).', 'El símbolo Lv proviene de \"Livermorium\".', 'El livermorio es un elemento radiactivo utilizado en investigaciones nucleares.', 'El livermorio se utiliza en investigaciones nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 31.00, 2000.00, 8000.00, 'Buena', 'Lv-293', 31, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de livermorio (LvO2)', 'Se utiliza en investigaciones nucleares.', 'En investigaciones nucleares.', 'El livermorio tiene un impacto ambiental debido a su radiactividad.', 0x696d6167655f75726c, 116, 116, 157),
(117, 117, 'El tenesino fue descubierto en 2010 por un equipo de científicos rusos y estadounidenses.', 'El nombre tenesino proviene del estado de Tennessee, Estados Unidos.', 'El símbolo Ts proviene de \"Tennessine\".', 'El tenesino es un elemento radiactivo utilizado en investigaciones nucleares.', 'El tenesino se utiliza en investigaciones nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 32.00, 2100.00, 8200.00, 'Buena', 'Ts-294', 32, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de tenesino (TsO2)', 'Se utiliza en investigaciones nucleares.', 'En investigaciones nucleares.', 'El tenesino tiene un impacto ambiental debido a su radiactividad.', 0x696d6167655f75726c, 117, 117, 157),
(118, 118, 'El oganesón fue descubierto en 2002 por un equipo de científicos rusos y estadounidenses.', 'El nombre oganesón proviene del físico ruso Armen Oganesyan, quien contribuyó significativamente a la investigación de elementos superpesados.', 'El símbolo Og proviene de \"Oganesson\".', 'El oganesón es un elemento radiactivo utilizado en investigaciones nucleares.', 'El oganesón se utiliza en investigaciones nucleares debido a sus propiedades radiactivas.', '1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10', 34.00, 2200.00, 8400.00, 'Buena', 'Og-294', 34, 'Reacciona con oxígeno y otros compuestos formando productos radiactivos.', 'Oxido de oganesón (OgO2)', 'Se utiliza en investigaciones nucleares.', 'En investigaciones nucleares.', 'El oganesón tiene un impacto ambiental debido a su radiactividad.', 0x696d6167655f75726c, 118, 118, 157),
(119, 119, 'El ununennium es un elemento hipotético, no ha sido descubierto.', 'El nombre ununennium proviene de la forma sistemática de los elementos de la IUPAC, representando el elemento con número atómico 119.', 'El símbolo Uue proviene de \"Ununennium\".', 'El ununennium es un elemento hipotético, se predice que sea un metal alcalino.', 'El ununennium sería el primer elemento en la octava fila del bloque s en la tabla periódica.', 'El ununennium podría formar compuestos con otros elementos de la tabla periódica.', 1.00, 0.00, 0.00, 'No disponible', 'Predicha', 0, 'Muy reactivo', 'Compuestos hipotéticos con hidrógeno y oxígeno.', 'No tiene usos industriales conocidos debido a su naturaleza hipotética.', 'No se utiliza en la vida diaria debido a su naturaleza hipotética.', 'Podría tener un impacto ambiental radiactivo si se llegara a producir.', 0x696d6167655f75726c, 119, 119, 165);

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
(51, 'Bianca', 'Godoy', 'bianca@gmail.com', '2004-11-11', 46155162),
(52, 'luciano', 'roa', 'lu@gmail.com', '2017-11-12', 46066131);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `event_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Estructura de tabla para la tabla `notes`
--

CREATE TABLE `notes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `note_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`post_id`, `user_id`, `title`, `content`, `created_at`, `updated_at`) VALUES
(1, 25, 'hola', 'hola', '2024-11-15 19:06:46', '2024-11-15 19:06:46'),
(2, 25, 'no se ', 'jeje', '2024-11-15 19:11:33', '2024-11-15 19:11:33'),
(3, 25, 'nueva termodinamica de todo lo que existe', '\nLa termodinámica es una rama fundamental de la física que estudia la relación entre el calor, el trabajo, la energía y la entropía, y cómo estos interactúan en los sistemas físicos. Se basa en un conjunto de leyes fundamentales que describen cómo la energía se transfiere entre los sistemas y cómo cambian las propiedades de estos sistemas como resultado de esas transferencias.', '2024-11-15 19:34:40', '2024-11-15 19:34:40'),
(5, 21, 'este soy yo pero desde otra cuenta', 'queria verificar si se carga bien el nombre de usuario', '2024-11-18 22:22:31', '2024-11-18 22:22:31'),
(6, 21, 'hola, soy yo', 'es una prueba', '2024-11-20 14:17:58', '2024-11-20 14:17:58'),
(7, 21, 'hola', 'hola', '2024-11-20 14:20:12', '2024-11-20 14:20:12'),
(8, 21, 'hola', 'hola', '2024-11-20 14:24:15', '2024-11-20 14:24:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post_categories`
--

CREATE TABLE `post_categories` (
  `post_category_id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `post_categories`
--

INSERT INTO `post_categories` (`post_category_id`, `post_id`, `category_id`) VALUES
(1, 1, 3),
(2, 2, 15),
(3, 3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post_comments`
--

CREATE TABLE `post_comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `post_comments`
--

INSERT INTO `post_comments` (`comment_id`, `post_id`, `user_id`, `content`, `created_at`, `updated_at`) VALUES
(1, 1, 21, 'hola', '2024-11-18 22:33:50', '2024-11-18 22:33:50'),
(8, 1, 21, 'hola', '2024-11-19 01:35:46', '2024-11-19 01:35:46'),
(10, 5, 25, 'hola', '2024-11-19 12:01:10', '2024-11-19 12:01:10'),
(11, 5, 25, 'hola,no', '2024-11-19 12:35:35', '2024-11-19 12:35:40'),
(12, 5, 25, 'hola ya no es tal vez', '2024-11-19 12:35:49', '2024-11-19 12:35:57'),
(14, 2, 25, 'hola', '2024-11-20 17:27:00', '2024-11-20 17:27:00'),
(15, 3, 25, 'tenes toda la razon, te aplaudo\n', '2024-11-20 17:27:09', '2024-11-20 17:27:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post_likes`
--

CREATE TABLE `post_likes` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `like_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `post_likes`
--

INSERT INTO `post_likes` (`post_id`, `user_id`, `created_at`, `like_ID`) VALUES
(1, 21, '2024-11-18 23:59:50', 28),
(2, 21, '2024-11-18 23:59:55', 29),
(3, 21, '2024-11-19 13:40:20', 32),
(3, 25, '2024-11-20 17:27:20', 34);

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
(22, 'nazarena', 'garcia', 'nazarena', 'nazaaagarcia@gmail.com', '$2b$10$yFSZDSs.ncEt.c61nleqiuBPz06MvQtV5zmSe2n9y8Otv82//cns6', 1, 46155300),
(23, 'lucianno', 'Roa', 'luciannoFr', 'lucianno@gmail.com', '$2b$10$91etnUKKhEz/2io5yj1yrO8lUibYoOyINv9jAnQG6jqiE9zHjMuXO', 2, 0),
(24, 'luciano', 'villalba', 'luciano', 'lu@gmail.com', '$2b$10$LIhQnnOOJMHG95dkPlYWR.Np4RhW2re9PiyhEc11.2JkYiw0lLob.', 3, 0),
(25, 'lucas', 'roa', 'luci', 'luci@gmail.com', '$2b$10$oCwBXn8iS2NWC0cJV8gp.upBYibMoFGNBw0Fr4WgVkmxAuOWDg9IG', 3, 46066131);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`idAdmin`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indices de la tabla `comment_likes`
--
ALTER TABLE `comment_likes`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_reply_id` (`comment_id`);

--
-- Indices de la tabla `comment_replies`
--
ALTER TABLE `comment_replies`
  ADD PRIMARY KEY (`reply_id`),
  ADD KEY `parent_comment_id` (`parent_comment_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `elements`
--
ALTER TABLE `elements`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `element_details`
--
ALTER TABLE `element_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `element_id` (`element_id`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`id_estudiante`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

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
-- Indices de la tabla `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `post_categories`
--
ALTER TABLE `post_categories`
  ADD PRIMARY KEY (`post_category_id`),
  ADD UNIQUE KEY `post_id` (`post_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `post_comments`
--
ALTER TABLE `post_comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`like_ID`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_idfk` (`post_id`);

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
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `comment_likes`
--
ALTER TABLE `comment_likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comment_replies`
--
ALTER TABLE `comment_replies`
  MODIFY `reply_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `elements`
--
ALTER TABLE `elements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT de la tabla `element_details`
--
ALTER TABLE `element_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `id_estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT de la tabla `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `post_categories`
--
ALTER TABLE `post_categories`
  MODIFY `post_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `post_comments`
--
ALTER TABLE `post_comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `like_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comment_likes`
--
ALTER TABLE `comment_likes`
  ADD CONSTRAINT `comment_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `fk_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `post_comments` (`comment_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_reply_id` FOREIGN KEY (`comment_id`) REFERENCES `comment_replies` (`reply_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `comment_replies`
--
ALTER TABLE `comment_replies`
  ADD CONSTRAINT `comment_replies_ibfk_1` FOREIGN KEY (`parent_comment_id`) REFERENCES `post_comments` (`comment_id`),
  ADD CONSTRAINT `comment_replies_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `element_details`
--
ALTER TABLE `element_details`
  ADD CONSTRAINT `element_details_ibfk_1` FOREIGN KEY (`element_id`) REFERENCES `elements` (`id`);

--
-- Filtros para la tabla `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);

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

--
-- Filtros para la tabla `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `post_categories`
--
ALTER TABLE `post_categories`
  ADD CONSTRAINT `post_categories_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `post_comments`
--
ALTER TABLE `post_comments`
  ADD CONSTRAINT `post_comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  ADD CONSTRAINT `post_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `post_likes`
--
ALTER TABLE `post_likes`
  ADD CONSTRAINT `post_idfk` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  ADD CONSTRAINT `post_likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  ADD CONSTRAINT `post_likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
