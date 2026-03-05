-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: modulo
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `autor`
--

DROP TABLE IF EXISTS `autor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author` varchar(64) NOT NULL,
  `job` varchar(64) NOT NULL,
  `photo` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autor`
--

LOCK TABLES `autor` WRITE;
/*!40000 ALTER TABLE `autor` DISABLE KEYS */;
INSERT INTO `autor` VALUES (1,'Sofia Minaya','FullStack dev','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-uzogj29HaCj7Sh0GTMTMRNtZt0cPsJSx1g&s'),(4,'Esther Quirós','FullStack Dev','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3yuixEjjSDBtSrmGUokMJd4OeD-8D8DSDQ&s');
/*!40000 ALTER TABLE `autor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `slogan` varchar(1000) NOT NULL,
  `repo` varchar(1000) NOT NULL,
  `demo` varchar(1000) NOT NULL,
  `technologies` varchar(100) NOT NULL,
  `desc` varchar(1000) NOT NULL,
  `image` longtext NOT NULL,
  `autor_id` int NOT NULL,
  PRIMARY KEY (`id`,`autor_id`),
  KEY `fk_proyectos_autor_idx` (`autor_id`),
  CONSTRAINT `fk_proyectos_autor` FOREIGN KEY (`autor_id`) REFERENCES `autor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (1,'bat-magotchi','bienvenido a bat-magotchi','https://github.com/s-minaya/bat-magotchi','https://adalab.es/','HTML CSS JavaScript','No dejes que tu bat-magotchi muera, para ello puedes darle de comer','https://img.freepik.com/vector-premium/pixel-murcielago-8-bits-animales-pixeles-activos-juegos-ilustracion-vectorial_614713-1430.jpg\n',1),(7,'Harry Potter','Busca tu personaje favorito','https://github.com/Adalab/modulo-3-evaluacion-final-estherquiros.git','https://beta.adalab.es/modulo-3-evaluacion-final-estherquiros/','HTML SASS REACT','Encuentra cualquier personaje de la película utilizando filtros','https://www.ecured.cu/images/thumb/3/3b/Harry_potter_personaje.jpg/430px-Harry_potter_personaje.jpg',1);
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-12 12:58:58
