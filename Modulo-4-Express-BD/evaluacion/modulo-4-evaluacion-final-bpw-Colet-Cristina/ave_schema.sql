-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema api_aves
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema api_aves
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `api_aves` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `api_aves` ;

-- -----------------------------------------------------
-- Table `api_aves`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `api_aves`.`categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(65) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `api_aves`.`aves`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `api_aves`.`aves` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_comun` VARCHAR(65) NOT NULL,
  `nombre_cientifico` VARCHAR(65) NULL DEFAULT NULL,
  `envergadura_cm` DECIMAL(5,2) NULL DEFAULT NULL,
  `descripcion` TEXT NULL DEFAULT NULL,
  `imagen` TEXT NULL DEFAULT NULL,
  `categoria_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ave_categoria` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `fk_ave_categoria`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `api_aves`.`categoria` (`id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `api_aves`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `api_aves`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(65) NOT NULL,
  `nombre` VARCHAR(65) NULL DEFAULT NULL,
  `password` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
