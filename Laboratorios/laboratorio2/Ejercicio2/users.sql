CREATE DATABASE IF NOT EXISTS db_laboratorio_docker;
USE db_laboratorio_docker;

CREATE TABLE users(
	id SMALLINT AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL UNIQUE,
    fecha_registro DATE NOT NULL,
    CONSTRAINT pd_id PRIMARY KEY(id)
)Engine=InnoDB;