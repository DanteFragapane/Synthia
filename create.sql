CREATE DATABASE
IF NOT EXISTS websynth;

CREATE TABLE `websynth`.`users`
(
  `username` VARCHAR
(45) NOT NULL,
`email` VARCHAR
(45) NOT NULL,
  `password` TEXT NULL,
  PRIMARY KEY
(`username`),
  UNIQUE INDEX `username_UNIQUE`
(`username` ASC) VISIBLE);
