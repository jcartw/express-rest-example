DROP DATABASE IF EXISTS `RestExample`;
CREATE SCHEMA IF NOT EXISTS `RestExample`
  DEFAULT CHARACTER SET utf8
  COLLATE  utf8_general_ci;
USE `RestExample`;


DROP TABLE IF EXISTS `State`;
CREATE TABLE IF NOT EXISTS `State` (
  `id`             BIGINT NOT NULL AUTO_INCREMENT,
  `uuid`           VARCHAR(36)   NOT NULL,
  `name`           VARCHAR(255) NOT NULL,
  `abbreviation`   VARCHAR(5)   NULL,
  `capital`        VARCHAR(255) NULL,
  `population`     INT          NULL,
  `country`        VARCHAR(255) NULL,
  `valid`          TINYINT(1)   NOT NULL DEFAULT 1,
  `created`        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET=utf8;

