CREATE DATABASE meals_on_wings_db;

CREATE TABLE `meals_on_wings_db`.`customer_details` (
  `cust_id` INT NOT NULL AUTO_INCREMENT,
  `cust_fname` VARCHAR(255) NOT NULL,
  `customer_lname` VARCHAR(255) NOT NULL,
  `cust_location` VARCHAR(1000) NOT NULL,
  `cust_email` VARCHAR(255) NOT NULL,
  `cust_password` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`cust_id`));

  CREATE TABLE `meals_on_wings_db`.`drone_details` (
  `drn_id` INT NOT NULL AUTO_INCREMENT,
  `drn_status` VARCHAR(255) NOT NULL,
  `drn_battery_status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`drn_id`));

  CREATE TABLE `meals_on_wings_db`.`restaurant_details` (
  `rest_id` INT NOT NULL AUTO_INCREMENT,
  `rest_name` VARCHAR(255) NOT NULL,
  `rest_loc` VARCHAR(1000) NOT NULL,
  `rest_email` VARCHAR(255) NOT NULL,
  `rest_password` VARCHAR(255) NULL,
  PRIMARY KEY (`rest_id`));

  CREATE TABLE `meals_on_wings_db`.`charging_station_details` (
  `chrg_stn_id` INT NOT NULL AUTO_INCREMENT,
  `chrg_stn_loc` VARCHAR(1000) NULL,
  `chrg_stn_slot_status` VARCHAR(255) NULL,
  PRIMARY KEY (`chrg_stn_id`));

  CREATE TABLE `meals_on_wings_db`.`drone_charging_details` (
  `chrg_stn_id` INT NOT NULL,
  `drn_id` INT NOT NULL,
  `drn_battery_status` VARCHAR(45) NULL,
  PRIMARY KEY (`chrg_stn_id`, `drn_id`),
  INDEX `drn_id_idx` (`drn_id` ASC) VISIBLE,
  CONSTRAINT `chrg_stn_id`
    FOREIGN KEY (`chrg_stn_id`)
    REFERENCES `meals_on_wings_db`.`charging_station_details` (`chrg_stn_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `drn_id`
    FOREIGN KEY (`drn_id`)
    REFERENCES `meals_on_wings_db`.`drone_details` (`drn_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `meals_on_wings_db`.`restaurant_menu` (
  `rest_id` INT NOT NULL,
  `fd_id` INT NOT NULL,
  `fd_name` VARCHAR(255) NOT NULL,
  `fd_image` VARCHAR(255) NULL,
  `fd_price` DECIMAL(10,2) NOT NULL,
  `fd_weight` DECIMAL(4,2) NOT NULL,
  `fd_desc` VARCHAR(225) NULL,
  `fd_status` VARCHAR(45) NULL,
  PRIMARY KEY (`rest_id`, `fd_id`),
  CONSTRAINT `rest_id`
    FOREIGN KEY (`rest_id`)
    REFERENCES `meals_on_wings_db`.`restaurant_details` (`rest_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `order_details` (
  `odr_id` int NOT NULL,
  `cust_id` int NOT NULL,
  `rest_id` int NOT NULL,
  `drop_loc` varchar(1000) NOT NULL,
  `drn_id` int DEFAULT NULL,
  `trcn_id` int DEFAULT NULL,
  `odr_price` decimal(10,2) DEFAULT NULL,
  `odr_date` datetime DEFAULT NULL,
  PRIMARY KEY (`odr_id`),
  KEY `cust_id_idx` (`cust_id`),
  KEY `rest_id_idx` (`rest_id`),
  CONSTRAINT `fk_cust_id` FOREIGN KEY (`cust_id`) REFERENCES `customer_details` (`cust_id`),
  CONSTRAINT `fk_rest_id` FOREIGN KEY (`rest_id`) REFERENCES `restaurant_details` (`rest_id`));
