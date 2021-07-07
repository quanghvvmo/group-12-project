CREATE DATABASE  IF NOT EXISTS `projectdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `projectdb`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: projectdb
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `employeeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `createAt` datetime DEFAULT NULL,
  `createBy` varchar(36) DEFAULT NULL,
  `updateBy` varchar(36) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `employeeId` (`employeeId`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('1e58264e-1623-4466-9610-6d952dddbe73','6cae1b63-9bbb-4852-8122-de4bd93cb8dc','admin','$2b$10$jIasXpjAC0sOG5vZgVgx4ePMlmDSJp42jElRrkcEsA5uxW7pEVDoa','Mr Admin',1,NULL,NULL,NULL,NULL,0),('d00025df-d600-4bef-a2e5-8b1a2eb45404','9e776146-5d61-40bb-9b67-2678446cc26b','empladmin','$2b$10$NnFzWgHu59GY1QXS8cjJ1euA7rV7c3yzrqRZBj18Ix5eIIcLCEEui','Employee admin',0,NULL,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `createBy` varchar(36) DEFAULT NULL,
  `updateBy` varchar(36) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('0fd4e376-9111-46bb-a552-5fe4d64329b9','John Wick','Lorem ipsum dolor sit amet, consectetur adipiscing elit','1000-01-01 00:00:00',NULL,NULL,NULL,0),('347e9c32-c384-414c-9ad0-3c9f8aef0a51','Julia Ann','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.','2021-07-01 03:04:05','d00025df-d600-4bef-a2e5-8b1a2eb45404',NULL,NULL,0),('5b119ad0-4ae2-4c7f-b815-cb8395838939','Harry Potter','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.','1000-01-01 00:00:00',NULL,NULL,NULL,0),('66fdc3af-6657-4ff0-a539-393e380c5628','Emma Stoner','Extra Lorem ipsum dolor sit amet, consectetur adipiscing elit','1000-01-01 00:00:00',NULL,'d00025df-d600-4bef-a2e5-8b1a2eb45404','2021-07-01 03:05:42',0),('6efee27a-13b6-4afe-9d1f-2c7841340546','Hitomi Tanaka','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.','1000-01-01 00:00:00',NULL,NULL,NULL,0),('7cafb0bc-e939-4aa8-bd9f-963a3f039fcd','Anri Okita','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.','1000-01-01 00:00:00',NULL,NULL,NULL,0),('958b0f73-a97f-4306-ba51-48926cc1997c','Johnson','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.','1000-01-01 00:00:00',NULL,NULL,NULL,0),('a38a1013-2b7d-4462-a71a-0004e55af5da','Julia','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.','1000-01-01 00:00:00',NULL,NULL,NULL,0),('acb28e8c-813a-4789-a16c-c39d51730b53','Anne Hathaway','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.','1000-01-01 00:00:00',NULL,NULL,NULL,0),('f5cf3676-8577-4030-a49f-cbb132d1c96e','Ron Weasley','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.','1000-01-01 00:00:00',NULL,NULL,NULL,0),('f6fb945a-1fa5-4a54-bcf6-ffff4fc67e6c','Severus Snape','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.','1000-01-01 00:00:00',NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `foundingDate` datetime DEFAULT NULL,
  `adminId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createBy` varchar(36) DEFAULT NULL,
  `updateBy` varchar(36) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `createAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `adminId` (`adminId`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('8cafc6c5-68c4-433a-9af9-a711e53e54ec','Research and Development','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa.','2010-10-22 17:00:00','d00025df-d600-4bef-a2e5-8b1a2eb45404',NULL,NULL,NULL,1,NULL);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departmentemployee`
--

DROP TABLE IF EXISTS `departmentemployee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departmentemployee` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `departmentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `employeeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `departmentemployee_employeeId_departmentId_unique` (`departmentId`,`employeeId`),
  KEY `employeeId` (`employeeId`),
  CONSTRAINT `departmentemployee_ibfk_1023` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `departmentemployee_ibfk_1024` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departmentemployee`
--

LOCK TABLES `departmentemployee` WRITE;
/*!40000 ALTER TABLE `departmentemployee` DISABLE KEYS */;
/*!40000 ALTER TABLE `departmentemployee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departmentproject`
--

DROP TABLE IF EXISTS `departmentproject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departmentproject` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `departmentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `projectId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `departmentproject_projectId_departmentId_unique` (`departmentId`,`projectId`),
  KEY `projectId` (`projectId`),
  CONSTRAINT `departmentproject_ibfk_387` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `departmentproject_ibfk_388` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departmentproject`
--

LOCK TABLES `departmentproject` WRITE;
/*!40000 ALTER TABLE `departmentproject` DISABLE KEYS */;
/*!40000 ALTER TABLE `departmentproject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `idNumber` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `experienceYear` int DEFAULT NULL,
  `foreignLanguage` varchar(255) DEFAULT NULL,
  `certificate` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `createBy` varchar(36) DEFAULT NULL,
  `updateBy` varchar(36) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `createAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idNumber` (`idNumber`),
  UNIQUE KEY `idNumber_2` (`idNumber`),
  UNIQUE KEY `idNumber_3` (`idNumber`),
  UNIQUE KEY `idNumber_4` (`idNumber`),
  UNIQUE KEY `idNumber_5` (`idNumber`),
  UNIQUE KEY `idNumber_6` (`idNumber`),
  UNIQUE KEY `idNumber_7` (`idNumber`),
  UNIQUE KEY `idNumber_8` (`idNumber`),
  UNIQUE KEY `idNumber_9` (`idNumber`),
  UNIQUE KEY `idNumber_10` (`idNumber`),
  UNIQUE KEY `idNumber_11` (`idNumber`),
  UNIQUE KEY `idNumber_12` (`idNumber`),
  UNIQUE KEY `idNumber_13` (`idNumber`),
  UNIQUE KEY `idNumber_14` (`idNumber`),
  UNIQUE KEY `idNumber_15` (`idNumber`),
  UNIQUE KEY `idNumber_16` (`idNumber`),
  UNIQUE KEY `idNumber_17` (`idNumber`),
  UNIQUE KEY `idNumber_18` (`idNumber`),
  UNIQUE KEY `idNumber_19` (`idNumber`),
  UNIQUE KEY `idNumber_20` (`idNumber`),
  UNIQUE KEY `idNumber_21` (`idNumber`),
  UNIQUE KEY `idNumber_22` (`idNumber`),
  UNIQUE KEY `idNumber_23` (`idNumber`),
  UNIQUE KEY `idNumber_24` (`idNumber`),
  UNIQUE KEY `idNumber_25` (`idNumber`),
  UNIQUE KEY `idNumber_26` (`idNumber`),
  UNIQUE KEY `idNumber_27` (`idNumber`),
  UNIQUE KEY `idNumber_28` (`idNumber`),
  UNIQUE KEY `idNumber_29` (`idNumber`),
  UNIQUE KEY `idNumber_30` (`idNumber`),
  UNIQUE KEY `idNumber_31` (`idNumber`),
  UNIQUE KEY `idNumber_32` (`idNumber`),
  UNIQUE KEY `idNumber_33` (`idNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('176dd3f1-97ba-49a9-a497-e67f5005eebc','Employee 4','1997-07-12 17:00:00','18 Ton That Thuyet','0319','09510210510',0,'English','Fresher Frontend',0,NULL,NULL,NULL,0,NULL),('4841b4dc-9825-4a34-8e62-b40159beef20','Employee 6','1999-05-28 17:00:00','18 Ton That Thuyet','0159','0978291901',1,'English, Japanese','Fresher Sale',0,NULL,NULL,NULL,0,NULL),('559a479d-99c2-4441-95d4-6ab00b44c7a4','Employee 3','1998-01-23 17:00:00','18 Ton That Thuyet','0141','0519302100',1,'English','Junior Backend',0,NULL,NULL,NULL,0,NULL),('625afaaa-2d16-4ae6-a9cf-5de61fda8593','Employee 6','1999-05-28 17:00:00','18 Ton That Thuyet','0158','0915010237',1,'English','Fresher Sale',0,NULL,NULL,NULL,0,NULL),('6cae1b63-9bbb-4852-8122-de4bd93cb8dc','Mr Admin','1988-05-09 17:00:00','18 Ton That Thuyet','0001','0951242901',8,'English, Japanese, Vietnamese','Master Dev',1,NULL,NULL,NULL,0,NULL),('8efb0d42-5d65-43ae-83cc-89d6e3bc6d31','Employee 1','2000-09-10 17:00:00','18 Ton That Thuyet','0300','05192310512',0,'English','Fresher Fullstack',0,NULL,NULL,NULL,0,NULL),('9e776146-5d61-40bb-9b67-2678446cc26b','Employee admin','1994-10-19 17:00:00','19 Duy Tan','0591','0901523596',4,'English, Japanese','Master Dev',0,NULL,NULL,NULL,1,NULL),('b5a0e04d-6bcc-4100-b3cc-17a5811882ef','Employee 5','2001-10-08 17:00:00','18 Ton That Thuyet','0519','0123456789',0,'English','Fresher Designer',0,NULL,NULL,NULL,0,NULL),('bb4eb41b-24a9-4e78-b693-7d741261b61b','Employee 2','1999-09-10 17:00:00','18 Ton That Thuyet','0199','0942105104',1,'English','Junior Fullstack',0,NULL,NULL,NULL,0,NULL),('e2e27b8a-ec28-4aff-917c-248fc6690078','Employee 10','1992-10-19 17:00:00','19 Duy Tan','0611','01951023101',5,'English, Chinese','Senior Dev',0,NULL,NULL,NULL,0,NULL),('f48a8d4c-2b4a-4a1b-913f-c4f9bc8acd83','Employee fix','1994-10-19 17:00:00','19 Duy Tan','0590','0901523596',5,'English, Japanese','Senior Dev',0,NULL,NULL,NULL,1,NULL);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeetech`
--

DROP TABLE IF EXISTS `employeetech`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeetech` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `employeeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `techId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employeetech_techId_employeeId_unique` (`employeeId`,`techId`),
  KEY `techId` (`techId`),
  CONSTRAINT `employeetech_ibfk_471` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employeetech_ibfk_472` FOREIGN KEY (`techId`) REFERENCES `tech` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeetech`
--

LOCK TABLES `employeetech` WRITE;
/*!40000 ALTER TABLE `employeetech` DISABLE KEYS */;
INSERT INTO `employeetech` VALUES ('3126055b-6ee4-42b2-b8b7-1295063fa71c','9e776146-5d61-40bb-9b67-2678446cc26b','3ed0ab8d-204d-4803-8586-d521822d9268'),('d6b82ffb-16c6-4dfe-944e-a6c6975ea56f','9e776146-5d61-40bb-9b67-2678446cc26b','6454646f-de1b-4d2c-a36b-0a8306a826bc'),('7b28ba17-e600-4dfd-af35-28f7c690d46c','9e776146-5d61-40bb-9b67-2678446cc26b','6b57df6e-410f-4a2b-8318-e794da17cd04'),('8e607744-79ed-490b-8fa4-dcf0a631f5d9','9e776146-5d61-40bb-9b67-2678446cc26b','6daed0c8-b11f-4c28-950d-2b20e091ada7'),('e834e0c7-4f0a-4d71-9965-4be805c11ce9','e2e27b8a-ec28-4aff-917c-248fc6690078','9bbe5a2e-e8f8-4593-8ead-2b12b1ff72e1'),('9df6e6e1-9038-40ee-9076-704f9b192517','e2e27b8a-ec28-4aff-917c-248fc6690078','d9172cad-0ba6-48d8-8a2b-824853a54035'),('a4f4313a-3add-4f22-beae-a0241f569bc0','e2e27b8a-ec28-4aff-917c-248fc6690078','dfb1f4a2-317e-4580-a6d7-a565ba4ed69d');
/*!40000 ALTER TABLE `employeetech` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `projectTypeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `projectStatus` enum('InProgress','Maintain','Closed') DEFAULT NULL,
  `customerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `createBy` varchar(36) DEFAULT NULL,
  `updateBy` varchar(36) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `createAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projectTypeId` (`projectTypeId`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `project_ibfk_1059` FOREIGN KEY (`projectTypeId`) REFERENCES `projecttype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_ibfk_1060` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES ('300dc5e4-a260-41dd-ae79-935f330442bf','Small project','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci a scelerisque purus semper.','fc21e2fd-cdd6-4c23-b3ef-64318e7150ea','InProgress','0fd4e376-9111-46bb-a552-5fe4d64329b9','2021-06-28 17:00:00',NULL,NULL,NULL,0,NULL),('3fffab77-40ed-497b-8f16-24ae9b7ea3f4','Big project','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci a scelerisque purus semper.','dee61708-4182-408e-bf0e-4b3bdc527eba','InProgress','5b119ad0-4ae2-4c7f-b815-cb8395838939','2021-05-20 17:00:00',NULL,NULL,NULL,0,NULL),('6aaa9770-0871-4a00-ac73-4e5c1c80c6ca','Fresher project','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci a scelerisque purus semper.','dee61708-4182-408e-bf0e-4b3bdc527eba','Closed','6efee27a-13b6-4afe-9d1f-2c7841340546','2021-05-30 17:00:00',NULL,NULL,NULL,1,NULL);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectemployee`
--

DROP TABLE IF EXISTS `projectemployee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectemployee` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `projectId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `employeeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `projectemployee_employeeId_projectId_unique` (`projectId`,`employeeId`),
  KEY `employeeId` (`employeeId`),
  CONSTRAINT `projectemployee_ibfk_1033` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `projectemployee_ibfk_1034` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectemployee`
--

LOCK TABLES `projectemployee` WRITE;
/*!40000 ALTER TABLE `projectemployee` DISABLE KEYS */;
INSERT INTO `projectemployee` VALUES ('9f5582ec-07a6-44ad-be16-266121911ef6','300dc5e4-a260-41dd-ae79-935f330442bf','176dd3f1-97ba-49a9-a497-e67f5005eebc'),('364f6bad-8ca8-45a6-86fd-911d876c9e71','300dc5e4-a260-41dd-ae79-935f330442bf','625afaaa-2d16-4ae6-a9cf-5de61fda8593'),('c36c0b5e-4fd8-4bd2-8878-b1f482ad0c5e','300dc5e4-a260-41dd-ae79-935f330442bf','b5a0e04d-6bcc-4100-b3cc-17a5811882ef'),('cbb19226-16cf-4cf4-9186-d0e7a806be73','300dc5e4-a260-41dd-ae79-935f330442bf','f48a8d4c-2b4a-4a1b-913f-c4f9bc8acd83'),('99856e65-3ea3-4352-ad12-fe8f781716a5','3fffab77-40ed-497b-8f16-24ae9b7ea3f4','4841b4dc-9825-4a34-8e62-b40159beef20'),('ca12b696-0dba-4af3-946a-a70a142c1bef','3fffab77-40ed-497b-8f16-24ae9b7ea3f4','559a479d-99c2-4441-95d4-6ab00b44c7a4'),('ac768dd9-09ed-45a7-8921-d64f0987a7a0','3fffab77-40ed-497b-8f16-24ae9b7ea3f4','8efb0d42-5d65-43ae-83cc-89d6e3bc6d31'),('f70171dd-0909-4e15-bf4e-c6f91c845c04','3fffab77-40ed-497b-8f16-24ae9b7ea3f4','b5a0e04d-6bcc-4100-b3cc-17a5811882ef');
/*!40000 ALTER TABLE `projectemployee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projecttech`
--

DROP TABLE IF EXISTS `projecttech`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projecttech` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `projectId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `techId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `projecttech_techId_projectId_unique` (`projectId`,`techId`),
  KEY `techId` (`techId`),
  CONSTRAINT `projecttech_ibfk_1037` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `projecttech_ibfk_1038` FOREIGN KEY (`techId`) REFERENCES `tech` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projecttech`
--

LOCK TABLES `projecttech` WRITE;
/*!40000 ALTER TABLE `projecttech` DISABLE KEYS */;
INSERT INTO `projecttech` VALUES ('dd45ffa2-abf1-4416-850c-6cddec7b38c8','300dc5e4-a260-41dd-ae79-935f330442bf','6daed0c8-b11f-4c28-950d-2b20e091ada7'),('59f525ff-42ff-4518-91f5-c08319cd0f47','3fffab77-40ed-497b-8f16-24ae9b7ea3f4','3ed0ab8d-204d-4803-8586-d521822d9268'),('2b87820f-25b2-4b50-8d65-d008cd7b4412','3fffab77-40ed-497b-8f16-24ae9b7ea3f4','44685a01-1549-4a59-832d-7964ec86f648'),('984bd175-2ab0-4bc3-804b-65780b3f3153','3fffab77-40ed-497b-8f16-24ae9b7ea3f4','9bbe5a2e-e8f8-4593-8ead-2b12b1ff72e1');
/*!40000 ALTER TABLE `projecttech` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projecttype`
--

DROP TABLE IF EXISTS `projecttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projecttype` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `createBy` varchar(36) DEFAULT NULL,
  `updateBy` varchar(36) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  `createAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projecttype`
--

LOCK TABLES `projecttype` WRITE;
/*!40000 ALTER TABLE `projecttype` DISABLE KEYS */;
INSERT INTO `projecttype` VALUES ('4df042a3-80c9-468c-abad-154c9c000b82','other',0,'d00025df-d600-4bef-a2e5-8b1a2eb45404','d00025df-d600-4bef-a2e5-8b1a2eb45404','2021-07-01 03:26:19',1,'2021-07-01 03:22:40'),('dee61708-4182-408e-bf0e-4b3bdc527eba','products',1,NULL,NULL,NULL,0,NULL),('fc21e2fd-cdd6-4c23-b3ef-64318e7150ea','outsource',1,NULL,NULL,NULL,0,NULL);
/*!40000 ALTER TABLE `projecttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tech`
--

DROP TABLE IF EXISTS `tech`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tech` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `createAt` datetime DEFAULT NULL,
  `createBy` varchar(36) DEFAULT NULL,
  `updateBy` varchar(36) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tech`
--

LOCK TABLES `tech` WRITE;
/*!40000 ALTER TABLE `tech` DISABLE KEYS */;
INSERT INTO `tech` VALUES ('215a177f-4307-4cf3-a036-d0d0a0a41eff','VueJS',0,'1000-01-01 00:00:00',NULL,NULL,NULL,1),('35316ba1-7679-4f4d-9046-78241c74f7b1','ReactNative',1,'1000-01-01 00:00:00',NULL,NULL,NULL,0),('3ed0ab8d-204d-4803-8586-d521822d9268','Flutter',1,'1000-01-01 00:00:00',NULL,NULL,NULL,0),('44685a01-1549-4a59-832d-7964ec86f648','Golang',1,'1000-01-01 00:00:00',NULL,NULL,NULL,0),('4e1881da-1e9d-4f61-ad4d-eb10586e2a6b','ReactJS',1,'1000-01-01 00:00:00',NULL,NULL,NULL,0),('6454646f-de1b-4d2c-a36b-0a8306a826bc','Javascript',1,'1000-01-01 00:00:00',NULL,NULL,NULL,0),('6b57df6e-410f-4a2b-8318-e794da17cd04','Angular',1,'1000-01-01 00:00:00',NULL,NULL,NULL,0),('6ca35f3f-322c-467b-8349-efac19b9332c','C++',1,'1000-01-01 00:00:00',NULL,NULL,NULL,0),('6daed0c8-b11f-4c28-950d-2b20e091ada7','NodeJS',1,'1000-01-01 00:00:00',NULL,'d00025df-d600-4bef-a2e5-8b1a2eb45404','2021-07-01 02:37:37',0),('89aedb32-7cc2-4bf0-91f6-5b360a3332a7','MySQL',1,'2021-07-01 02:27:55','d00025df-d600-4bef-a2e5-8b1a2eb45404',NULL,NULL,0),('9bbe5a2e-e8f8-4593-8ead-2b12b1ff72e1','Pascal',1,'1000-01-01 00:00:00',NULL,NULL,NULL,0),('cd379554-9af9-4b16-8384-e04ff01120c0','Python',1,'1000-01-01 00:00:00',NULL,NULL,NULL,0),('d9172cad-0ba6-48d8-8a2b-824853a54035','Java',1,'1000-01-01 00:00:00',NULL,NULL,NULL,0),('dfb1f4a2-317e-4580-a6d7-a565ba4ed69d','PHP',1,'1000-01-01 00:00:00',NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `tech` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-07 10:13:54
