-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 14-11-2024 a las 20:35:09
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `noticiasdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticias`
--

CREATE TABLE `noticias` (
  `id_noticia` int NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `contenido` text NOT NULL,
  `autor` varchar(100) DEFAULT NULL,
  `fecha_publicacion` date DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `noticias`
--

INSERT INTO `noticias` (`id_noticia`, `titulo`, `contenido`, `autor`, `fecha_publicacion`, `categoria`) VALUES
(1, 'Nueva ley de medio ambiente aprobada', 'El congreso aprobó una nueva ley', 'Ana Pérez', '2024-11-07', 'Políticaaaa'),
(3, 'Claves para una economía sostenible', 'Expertos discuten los puntos clave...dsjdksjdkjsdjsjksdjdskdjsdk ay', 'Sofía Martínez', '2024-11-03', 'Economía'),
(15, 'Innovadora tecnología de reciclaje llega a la ciudad', 'Una nueva planta de reciclaje, equipada con tecnología avanzada de clasificación de residuos, ha comenzado a operar en la ciudad, marcando un hito en el tratamiento de desechos urbanos. Este innovador proyecto, promovido por el gobierno local en colaboración con empresas privadas, busca reducir drásticamente los desechos que llegan a los vertederos. La planta, mediante procesos automatizados y sistemas de inteligencia artificial, separa materiales reciclables con una precisión y eficiencia sin precedentes, minimizando el impacto ambiental. Además, la instalación ha creado más de 200 empleos directos, lo que representa un beneficio económico para la comunidad. Las autoridades locales destacan que esta iniciativa no solo mejora el manejo de residuos, sino que también fomenta la educación ambiental en la ciudadanía. Con la apertura de esta planta, se espera que más personas se motiven a adoptar prácticas de reciclaje en sus hogares, contribuyendo activamente al cuidado del medio ambiente y a un futuro más sostenible.', 'Maria', '2024-11-14', 'Medio Ambiente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id_noticia`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id_noticia` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
