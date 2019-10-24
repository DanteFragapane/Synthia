CREATE DATABASE
IF NOT EXISTS websynth;

CREATE TABLE `websynth`.`users`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR
(45) NOT NULL,
  `email` VARCHAR
(45) NOT NULL,
  `password` TEXT NOT NULL,
  PRIMARY KEY
(`id`),
  UNIQUE INDEX `id_UNIQUE`
(`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE`
(`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE`
(`email` ASC) VISIBLE);
