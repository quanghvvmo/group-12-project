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
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
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
INSERT INTO `admin` VALUES ('be7158f5-8f13-4cce-ba29-6d845aba2707','f9e173d6-2438-48fc-aa5e-9ce28bdb2bb8','techadmin','$2b$10$5SRJDjJL/HvdEAG/WMi3yeQT7DwXxGkLjRuXMWI/pBhtIfJbBMoQK','Tech staff',1,'2021-07-12 04:32:38',NULL,NULL,NULL,0);
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
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
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
INSERT INTO `customer` VALUES ('1cea0a7d-8017-479a-9163-50ba7eeb7cfa','Emma Stoned','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.','2021-07-12 06:45:44','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('21b9a7df-b6b8-4d9d-ba1c-13f429459ebc','John Wick','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.','2021-07-12 06:45:02','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('33b53bf8-6ffc-49fe-9e95-3b3416bf71c5','Hitomi Tanaka','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.','2021-07-12 06:44:55','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('3c641de9-9ca5-4bd1-b0fb-dec46e4935a0','Anri Okita','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.','2021-07-12 06:45:09','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('4c87788f-3139-4747-8c3d-7ef6ec580617','Julia','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.','2021-07-12 06:44:43','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('5784da5a-8d41-4982-935a-898d98b61ab5','Jane Doe','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris ultrices eros in cursus.','2021-07-12 06:45:58','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0);
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
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `foundingDate` datetime DEFAULT NULL,
  `adminId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `createBy` varchar(36) DEFAULT NULL,
  `updateBy` varchar(36) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
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
INSERT INTO `department` VALUES ('1f823394-61f0-4665-9a77-233f9addbb25','C12','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa.','2015-10-22 17:00:00','be7158f5-8f13-4cce-ba29-6d845aba2707','2021-07-14 09:31:16','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('32b3f6d0-b310-4e24-a09e-f3a889663a44','C18','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa.','2018-01-13 17:00:00','be7158f5-8f13-4cce-ba29-6d845aba2707','2021-07-14 09:32:41','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('a0c0c4f2-92be-45dd-ab60-85586a14cba6','C6','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa.','2008-12-28 17:00:00','be7158f5-8f13-4cce-ba29-6d845aba2707','2021-07-14 09:32:05','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('a9de384c-7771-44e9-8897-982a82bb3ca9','C3','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa.','2008-12-28 17:00:00','be7158f5-8f13-4cce-ba29-6d845aba2707','2021-07-14 09:31:37','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('b478c906-4c16-48ce-aa33-79ea46d9826a','R&D testing','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa.','2010-10-22 17:00:00','be7158f5-8f13-4cce-ba29-6d845aba2707','2021-07-13 09:32:23','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0);
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
  CONSTRAINT `departmentemployee_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `departmentemployee_ibfk_2` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departmentemployee`
--

LOCK TABLES `departmentemployee` WRITE;
/*!40000 ALTER TABLE `departmentemployee` DISABLE KEYS */;
INSERT INTO `departmentemployee` VALUES ('42495a68-e993-4a39-ac49-77b6102973e8','1f823394-61f0-4665-9a77-233f9addbb25','5326b8b1-d3c7-4f17-b4aa-4dd8946d97b5'),('377567bb-8951-4528-88d2-0ab80d26852a','1f823394-61f0-4665-9a77-233f9addbb25','5c8e083a-bbc3-49a9-9f2b-949a1f0eec74'),('d16b34e4-e37a-44ec-bd9d-555d1824ac2b','1f823394-61f0-4665-9a77-233f9addbb25','fed16721-c64d-4b03-9e5b-d918a4fa6f20'),('0719e29e-a390-4aaa-9842-dcd8ee600eec','32b3f6d0-b310-4e24-a09e-f3a889663a44','5c8e083a-bbc3-49a9-9f2b-949a1f0eec74'),('0ec11cd0-9040-43f0-bad2-bf7471c98e49','a0c0c4f2-92be-45dd-ab60-85586a14cba6','5c8e083a-bbc3-49a9-9f2b-949a1f0eec74'),('b6971a98-4a89-4b24-9f4a-30216f3c9cc7','a0c0c4f2-92be-45dd-ab60-85586a14cba6','fed16721-c64d-4b03-9e5b-d918a4fa6f20'),('42e4fe21-eebe-4c05-9063-150a02144a77','a9de384c-7771-44e9-8897-982a82bb3ca9','5326b8b1-d3c7-4f17-b4aa-4dd8946d97b5'),('ec78e371-ac59-43af-9c6c-54cc8ef26e37','a9de384c-7771-44e9-8897-982a82bb3ca9','5c8e083a-bbc3-49a9-9f2b-949a1f0eec74'),('56346bd0-4bb6-4f21-8c25-137c2bff2b81','a9de384c-7771-44e9-8897-982a82bb3ca9','fed16721-c64d-4b03-9e5b-d918a4fa6f20'),('4c35d1a8-9ac7-4bea-b477-bece8d542a70','b478c906-4c16-48ce-aa33-79ea46d9826a','5326b8b1-d3c7-4f17-b4aa-4dd8946d97b5'),('c8f81d2c-f284-40c7-b76c-9018a1af4f5f','b478c906-4c16-48ce-aa33-79ea46d9826a','5c8e083a-bbc3-49a9-9f2b-949a1f0eec74'),('1ff8c429-87e4-49e1-9106-55bcaa57c6d7','b478c906-4c16-48ce-aa33-79ea46d9826a','fed16721-c64d-4b03-9e5b-d918a4fa6f20');
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
  CONSTRAINT `departmentproject_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `departmentproject_ibfk_2` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departmentproject`
--

LOCK TABLES `departmentproject` WRITE;
/*!40000 ALTER TABLE `departmentproject` DISABLE KEYS */;
INSERT INTO `departmentproject` VALUES ('dafd9ec7-4cf7-4209-9b82-6a5e63244e74','1f823394-61f0-4665-9a77-233f9addbb25','5121808d-52d2-479c-97e7-be5b46f70ccb'),('6215d040-4654-40da-82e5-2ad8767ff473','32b3f6d0-b310-4e24-a09e-f3a889663a44','5121808d-52d2-479c-97e7-be5b46f70ccb'),('247e84c3-fa85-4a2c-8cd0-1ce1349549cc','a0c0c4f2-92be-45dd-ab60-85586a14cba6','5121808d-52d2-479c-97e7-be5b46f70ccb'),('4b484aaf-4cd0-4a36-a788-d8f9f36125a6','a9de384c-7771-44e9-8897-982a82bb3ca9','5121808d-52d2-479c-97e7-be5b46f70ccb'),('c8f70b09-12b0-4b3f-8d3f-56cb48441bc8','b478c906-4c16-48ce-aa33-79ea46d9826a','5121808d-52d2-479c-97e7-be5b46f70ccb'),('bc1c36ed-812a-4d8a-8041-e3165569b105','b478c906-4c16-48ce-aa33-79ea46d9826a','e397d70d-3e04-44be-8cc0-959d977b3d9f');
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
  `name` varchar(100) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `idNumber` varchar(255) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `experienceYear` int DEFAULT NULL,
  `foreignLanguage` varchar(255) DEFAULT NULL,
  `certificate` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `createAt` datetime DEFAULT NULL,
  `createBy` varchar(36) DEFAULT NULL,
  `updateBy` varchar(36) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('12b73acb-2aee-4f79-abe9-d52812a64a80','Nguyen Thi C','1988-01-11 17:00:00','19 Duy Tan','0087','0951920319',2,'English, Japanese','Dev',0,'2021-07-12 06:35:52','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('1335a44c-a0e3-4a90-b71d-01e81126df8c','Nguyen Thi F','1990-11-29 17:00:00','19 Duy Tan','0071','0951920319',2,'English, Japanese','Dev',0,'2021-07-13 03:32:08','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('16bac330-8913-4258-9b20-e1fff93893d3','Tran D','1970-09-28 16:00:00','19 Duy Tan','0201','0951920319',3,'English','Dev',0,'2021-07-12 06:37:53','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('17215fef-0664-46d5-8639-e9e3d2406238','Nguyen Van A','1992-09-19 17:00:00','19 Duy Tan','0099','0981940219',5,'English, Chinese','Senior Dev',0,'2021-07-12 06:29:52','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('1f1eaf90-2370-4287-aab9-7b4ed096f67e','Nguyen K','1997-12-24 17:00:00','19 Duy Tan','0914','0581930210',0,'English, Japanese','Dev',0,'2021-07-13 03:50:29','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('5326b8b1-d3c7-4f17-b4aa-4dd8946d97b5','Ta Quang H','1998-11-19 17:00:00','19 Duy Tan','0814','0339943489',1,'English, Japanese','Dev',0,'2021-07-13 03:33:59','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('5c8e083a-bbc3-49a9-9f2b-949a1f0eec74','Vu Thi J','1997-12-24 17:00:00','19 Duy Tan','0114','0581930210',0,'English, Japanese','Dev',0,'2021-07-13 03:35:02','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('86189d55-6a3b-46f2-b905-8250fe5a95d1','Vu Van L','1998-12-24 17:00:00','19 Duy Tan','0511','0581930210',0,'English, Japanese','Dev',0,'2021-07-13 03:50:51','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('a05e9374-3848-457c-9f97-be42009aaa99','Le Van E','1990-11-29 17:00:00','19 Duy Tan','0671','0951920319',2,'English','Dev',0,'2021-07-13 03:30:36','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('b6622763-ded2-42b4-8f0f-02248fbc5e55','Nguyen Van B','1997-12-04 17:00:00','19 Duy Tan','0160','0951920319',1,'English','Dev',0,'2021-07-12 06:34:05','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('f06a3d1d-9c55-4d34-9429-3001a5b147c0','Bui Van M','1999-12-24 17:00:00','19 Duy Tan','0911','0581930210',0,'English, Japanese','Dev',0,'2021-07-13 03:51:38','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('f9e173d6-2438-48fc-aa5e-9ce28bdb2bb8','Tech staff','1998-11-20 00:00:00','19 Duy Tan','huytq1','0339943489',1,'English, Japanese','None',1,NULL,NULL,NULL,NULL,0),('fed16721-c64d-4b03-9e5b-d918a4fa6f20','To Vu G','1990-11-29 17:00:00','19 Duy Tan','0070','0951920319',2,'English, Japanese','Dev',0,'2021-07-13 03:32:35','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0);
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
  CONSTRAINT `employeetech_ibfk_1` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employeetech_ibfk_2` FOREIGN KEY (`techId`) REFERENCES `tech` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeetech`
--

LOCK TABLES `employeetech` WRITE;
/*!40000 ALTER TABLE `employeetech` DISABLE KEYS */;
INSERT INTO `employeetech` VALUES ('90c3ee13-f727-4828-be5e-a760bd88e73c','12b73acb-2aee-4f79-abe9-d52812a64a80','1a77b58b-8b66-4886-8169-934cf2616761'),('1e6a5450-b46b-49ce-af17-656435595935','12b73acb-2aee-4f79-abe9-d52812a64a80','c97a2f71-300e-4e5b-a0d0-04e74e32d060'),('d73379eb-5d43-4ec6-8a0d-d43289a612ad','12b73acb-2aee-4f79-abe9-d52812a64a80','d33ded5b-94b2-44a3-bdf2-84472135549e'),('4e5d18ed-6d49-4889-a130-fd4959870ac6','12b73acb-2aee-4f79-abe9-d52812a64a80','e6391e02-3eee-44aa-826f-1562b47b2aa5'),('219139a8-1bdf-44a2-ab3e-048a0233f9cb','1335a44c-a0e3-4a90-b71d-01e81126df8c','c97a2f71-300e-4e5b-a0d0-04e74e32d060'),('958d2b88-188e-47b8-a4d4-e2f0a5743e93','1335a44c-a0e3-4a90-b71d-01e81126df8c','e6391e02-3eee-44aa-826f-1562b47b2aa5'),('a712d037-31f2-419a-9e0d-d81336d63d8f','1335a44c-a0e3-4a90-b71d-01e81126df8c','ee624202-7730-4f85-9e67-d65c4df6adec'),('6f13d19d-daae-42f0-81db-30a337019504','16bac330-8913-4258-9b20-e1fff93893d3','1a77b58b-8b66-4886-8169-934cf2616761'),('197ec913-a511-4987-a195-6f65595ab66e','16bac330-8913-4258-9b20-e1fff93893d3','38916b30-893c-4a9b-9063-13be6a4f7e37'),('5f860f3a-ba7d-480c-a04a-2bd724e33968','16bac330-8913-4258-9b20-e1fff93893d3','c97a2f71-300e-4e5b-a0d0-04e74e32d060'),('d34bbe9c-1915-4b22-b5ca-7d511dbced61','16bac330-8913-4258-9b20-e1fff93893d3','d33ded5b-94b2-44a3-bdf2-84472135549e'),('26720c6b-c50e-4e15-9ea4-88a539d985d5','16bac330-8913-4258-9b20-e1fff93893d3','e6391e02-3eee-44aa-826f-1562b47b2aa5'),('29299260-5cae-4ebf-a430-c273d9bcb10e','17215fef-0664-46d5-8639-e9e3d2406238','05b9793f-fc16-42ae-b64d-aae8f63dc26b'),('ee88a4e8-47ab-437c-b381-7ef6e4f44686','17215fef-0664-46d5-8639-e9e3d2406238','20e92ad4-aa3f-48e0-aad1-4203869ccad6'),('320a893d-4a61-4eed-b255-2758fa5fa20a','17215fef-0664-46d5-8639-e9e3d2406238','c97a2f71-300e-4e5b-a0d0-04e74e32d060'),('6f835499-150d-4587-a513-68ff84935542','1f1eaf90-2370-4287-aab9-7b4ed096f67e','20e92ad4-aa3f-48e0-aad1-4203869ccad6'),('bff44a39-3550-4f98-b961-c0c336af5b18','1f1eaf90-2370-4287-aab9-7b4ed096f67e','4f3e4a6e-38b8-496b-94b1-cb99a3a389e9'),('93789f02-71e1-4e8b-a244-ed81436e2aa1','5326b8b1-d3c7-4f17-b4aa-4dd8946d97b5','20e92ad4-aa3f-48e0-aad1-4203869ccad6'),('283770a6-4937-47d1-9056-90559e2f18c2','5326b8b1-d3c7-4f17-b4aa-4dd8946d97b5','4f3e4a6e-38b8-496b-94b1-cb99a3a389e9'),('2fb23b13-1dcd-4144-948b-4d37c2f43d11','5c8e083a-bbc3-49a9-9f2b-949a1f0eec74','20e92ad4-aa3f-48e0-aad1-4203869ccad6'),('be0acb89-47d3-4fd8-8334-22d269ba044f','5c8e083a-bbc3-49a9-9f2b-949a1f0eec74','4f3e4a6e-38b8-496b-94b1-cb99a3a389e9'),('cb91f110-1d44-4f00-971a-8c8bba7de7b5','86189d55-6a3b-46f2-b905-8250fe5a95d1','20e92ad4-aa3f-48e0-aad1-4203869ccad6'),('d918c7e2-a896-4474-9221-800a5158fd54','86189d55-6a3b-46f2-b905-8250fe5a95d1','4f3e4a6e-38b8-496b-94b1-cb99a3a389e9'),('87d61acd-0459-4c3a-b030-2d535a7f9dbe','a05e9374-3848-457c-9f97-be42009aaa99','c97a2f71-300e-4e5b-a0d0-04e74e32d060'),('98a5a79a-0f8f-486f-8bc7-c68e9491031b','b6622763-ded2-42b4-8f0f-02248fbc5e55','5ae4387f-1caa-4977-b62c-21df6128932e'),('9d6d18cb-60d7-46a2-887e-ecea4907def6','b6622763-ded2-42b4-8f0f-02248fbc5e55','d33ded5b-94b2-44a3-bdf2-84472135549e'),('90818096-1220-4618-a591-bd085b290c25','f06a3d1d-9c55-4d34-9429-3001a5b147c0','20e92ad4-aa3f-48e0-aad1-4203869ccad6'),('d3ea9606-4b28-4572-b76a-d11502b8042d','f06a3d1d-9c55-4d34-9429-3001a5b147c0','4f3e4a6e-38b8-496b-94b1-cb99a3a389e9'),('90db5927-d7af-4064-a8a2-eecd00d68fa6','fed16721-c64d-4b03-9e5b-d918a4fa6f20','c97a2f71-300e-4e5b-a0d0-04e74e32d060'),('e2e4fa8a-8285-4981-bbe4-d08dd2941d45','fed16721-c64d-4b03-9e5b-d918a4fa6f20','e6391e02-3eee-44aa-826f-1562b47b2aa5'),('f6f0c078-6b8d-4a52-8b89-614554fe8edb','fed16721-c64d-4b03-9e5b-d918a4fa6f20','ee624202-7730-4f85-9e67-d65c4df6adec');
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
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `projectTypeId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `projectStatus` enum('InProgress','Maintain','Closed') DEFAULT NULL,
  `customerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `createBy` varchar(36) DEFAULT NULL,
  `updateBy` varchar(36) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `projectTypeId` (`projectTypeId`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`projectTypeId`) REFERENCES `projecttype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_ibfk_2` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES ('5121808d-52d2-479c-97e7-be5b46f70ccb','Medical project','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci a scelerisque purus semper.','78c99209-3e8f-4322-b27d-ac12ba611e40','InProgress','33b53bf8-6ffc-49fe-9e95-3b3416bf71c5','2021-06-16 17:00:00','2021-07-13 06:32:51','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('5b3fdfb7-17a6-4a26-9eb1-18f79450c31f','Service project','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci a scelerisque purus semper.','84e60d49-fac4-491b-9023-0f70989d6760','InProgress','5784da5a-8d41-4982-935a-898d98b61ab5','2021-06-30 17:00:00','2021-07-13 06:39:12','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('95d8eaa0-f921-4981-88df-deb1a0ae10d6','Internal project','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci a scelerisque purus semper.','84e60d49-fac4-491b-9023-0f70989d6760','InProgress','5784da5a-8d41-4982-935a-898d98b61ab5','2021-07-07 17:00:00','2021-07-13 08:17:52','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('b3ab7fc9-38c6-418d-a831-acac927643e5','External project','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci a scelerisque purus semper.','84e60d49-fac4-491b-9023-0f70989d6760','InProgress','5784da5a-8d41-4982-935a-898d98b61ab5','2021-07-07 17:00:00','2021-07-13 09:29:34','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('e397d70d-3e04-44be-8cc0-959d977b3d9f','Fresher project','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci a scelerisque purus semper.','78c99209-3e8f-4322-b27d-ac12ba611e40','InProgress','21b9a7df-b6b8-4d9d-ba1c-13f429459ebc','2021-05-30 17:00:00','2021-07-13 04:49:44','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0);
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
  CONSTRAINT `projectemployee_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `projectemployee_ibfk_2` FOREIGN KEY (`employeeId`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectemployee`
--

LOCK TABLES `projectemployee` WRITE;
/*!40000 ALTER TABLE `projectemployee` DISABLE KEYS */;
INSERT INTO `projectemployee` VALUES ('26ed6933-9282-482b-b9f1-07b6266db4e4','5121808d-52d2-479c-97e7-be5b46f70ccb','17215fef-0664-46d5-8639-e9e3d2406238'),('0343605c-41d2-4486-a577-291564c54190','5121808d-52d2-479c-97e7-be5b46f70ccb','86189d55-6a3b-46f2-b905-8250fe5a95d1'),('6d13801c-97c6-4eea-aeaa-2cf2d3b5b4df','5121808d-52d2-479c-97e7-be5b46f70ccb','fed16721-c64d-4b03-9e5b-d918a4fa6f20'),('9bbf3fae-ad5f-47f9-9252-378c53a312c7','5b3fdfb7-17a6-4a26-9eb1-18f79450c31f','12b73acb-2aee-4f79-abe9-d52812a64a80'),('1e829f38-1580-4126-8264-93ad4d9820ed','5b3fdfb7-17a6-4a26-9eb1-18f79450c31f','17215fef-0664-46d5-8639-e9e3d2406238'),('8a0eaa6e-1e65-4147-911e-2b79e94f4c4e','5b3fdfb7-17a6-4a26-9eb1-18f79450c31f','5326b8b1-d3c7-4f17-b4aa-4dd8946d97b5'),('69f965a2-25cc-4f86-ae71-df55b1a58ba5','5b3fdfb7-17a6-4a26-9eb1-18f79450c31f','86189d55-6a3b-46f2-b905-8250fe5a95d1'),('94cc803d-8b49-4321-84ce-3a4fc15e68b3','5b3fdfb7-17a6-4a26-9eb1-18f79450c31f','fed16721-c64d-4b03-9e5b-d918a4fa6f20'),('3a68d09e-88fe-4113-88e9-a193d500f428','95d8eaa0-f921-4981-88df-deb1a0ae10d6','12b73acb-2aee-4f79-abe9-d52812a64a80'),('b0cb6585-5321-45b3-ab9c-675cedabcbb2','95d8eaa0-f921-4981-88df-deb1a0ae10d6','17215fef-0664-46d5-8639-e9e3d2406238'),('9d0171ea-b1d2-4d2f-bdbd-e774f0f43d8e','95d8eaa0-f921-4981-88df-deb1a0ae10d6','5326b8b1-d3c7-4f17-b4aa-4dd8946d97b5'),('6cf8c2ea-31d1-4edd-89d8-d8f0c3c1114f','95d8eaa0-f921-4981-88df-deb1a0ae10d6','86189d55-6a3b-46f2-b905-8250fe5a95d1'),('a6bc8134-ed04-42d1-99a2-b3ce0132a9fc','95d8eaa0-f921-4981-88df-deb1a0ae10d6','fed16721-c64d-4b03-9e5b-d918a4fa6f20'),('cded6688-a4ae-4d48-badd-782bbe369755','b3ab7fc9-38c6-418d-a831-acac927643e5','12b73acb-2aee-4f79-abe9-d52812a64a80'),('c5192185-0208-4ea0-998f-ea328cd03755','b3ab7fc9-38c6-418d-a831-acac927643e5','17215fef-0664-46d5-8639-e9e3d2406238'),('f11b4870-2c29-4edf-9982-c2af892ea59a','b3ab7fc9-38c6-418d-a831-acac927643e5','5326b8b1-d3c7-4f17-b4aa-4dd8946d97b5'),('43ae1da2-6a53-439e-b438-6a26c0c3e156','b3ab7fc9-38c6-418d-a831-acac927643e5','fed16721-c64d-4b03-9e5b-d918a4fa6f20'),('c4e5280a-acf3-4dad-84d9-4cf18f3d07b2','e397d70d-3e04-44be-8cc0-959d977b3d9f','86189d55-6a3b-46f2-b905-8250fe5a95d1'),('a150df97-bbe5-4182-a729-ec44de0cff4b','e397d70d-3e04-44be-8cc0-959d977b3d9f','fed16721-c64d-4b03-9e5b-d918a4fa6f20');
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
  CONSTRAINT `projecttech_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `projecttech_ibfk_2` FOREIGN KEY (`techId`) REFERENCES `tech` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projecttech`
--

LOCK TABLES `projecttech` WRITE;
/*!40000 ALTER TABLE `projecttech` DISABLE KEYS */;
INSERT INTO `projecttech` VALUES ('5eee2dff-6904-4af7-baeb-8c6b689ae658','5121808d-52d2-479c-97e7-be5b46f70ccb','1a77b58b-8b66-4886-8169-934cf2616761'),('853e529a-cba7-4ffc-8c3e-23fc589f8bfd','5121808d-52d2-479c-97e7-be5b46f70ccb','690ab2d0-2fc9-4360-8a93-d05aaab6c3e2'),('5303fd06-c862-4143-b03c-590fab10f02e','5b3fdfb7-17a6-4a26-9eb1-18f79450c31f','1a77b58b-8b66-4886-8169-934cf2616761'),('60859788-c39f-4c24-a18e-5a99ddb4d1f1','5b3fdfb7-17a6-4a26-9eb1-18f79450c31f','690ab2d0-2fc9-4360-8a93-d05aaab6c3e2'),('3c484b33-aed4-4c34-a6fe-4e9642a457d4','5b3fdfb7-17a6-4a26-9eb1-18f79450c31f','d33ded5b-94b2-44a3-bdf2-84472135549e'),('b5edd613-9653-4e49-84be-65af806dc739','95d8eaa0-f921-4981-88df-deb1a0ae10d6','1a77b58b-8b66-4886-8169-934cf2616761'),('5ee5cdfe-714b-4e45-89bb-0ded36746e4e','95d8eaa0-f921-4981-88df-deb1a0ae10d6','690ab2d0-2fc9-4360-8a93-d05aaab6c3e2'),('de768950-1f12-4d5a-85ea-1bd3fc3a1134','95d8eaa0-f921-4981-88df-deb1a0ae10d6','d33ded5b-94b2-44a3-bdf2-84472135549e'),('981024f9-c9f7-44b1-b03f-bd217c06b4c6','b3ab7fc9-38c6-418d-a831-acac927643e5','690ab2d0-2fc9-4360-8a93-d05aaab6c3e2'),('84adac47-016f-44e5-a244-06fccec73811','b3ab7fc9-38c6-418d-a831-acac927643e5','d33ded5b-94b2-44a3-bdf2-84472135549e'),('3c5a2993-2fbc-48a1-a92b-8216d1ac1d75','e397d70d-3e04-44be-8cc0-959d977b3d9f','1a77b58b-8b66-4886-8169-934cf2616761'),('0b6296ca-8f95-43bd-8007-9f37b887456b','e397d70d-3e04-44be-8cc0-959d977b3d9f','690ab2d0-2fc9-4360-8a93-d05aaab6c3e2');
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
  `name` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `createAt` datetime DEFAULT NULL,
  `createBy` varchar(36) DEFAULT NULL,
  `updateBy` varchar(36) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projecttype`
--

LOCK TABLES `projecttype` WRITE;
/*!40000 ALTER TABLE `projecttype` DISABLE KEYS */;
INSERT INTO `projecttype` VALUES ('64a0a046-bbb0-4f8f-ab00-acba17628a2b','Product',1,'2021-07-12 06:09:31','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('78c99209-3e8f-4322-b27d-ac12ba611e40','Research',1,'2021-07-12 06:09:40','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('84e60d49-fac4-491b-9023-0f70989d6760','Outsource',1,'2021-07-12 06:09:18','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0);
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
  `name` varchar(100) DEFAULT NULL,
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
INSERT INTO `tech` VALUES ('05b9793f-fc16-42ae-b64d-aae8f63dc26b','ExpressJS',1,'2021-07-12 04:49:30','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('1a77b58b-8b66-4886-8169-934cf2616761','Python',1,'2021-07-12 04:45:39','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('20e92ad4-aa3f-48e0-aad1-4203869ccad6','Nodejs',1,'2021-07-12 06:28:05','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('38916b30-893c-4a9b-9063-13be6a4f7e37','ReactNative',1,'2021-07-12 04:45:09','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('47fd59f7-db08-4c40-bd31-9c65fb0cbeb5','MySQL',1,'2021-07-12 04:44:19','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('4d848006-86c4-4fd2-a2df-ce52e52427f6','VueJS',1,'2021-07-12 04:45:16','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('4f3e4a6e-38b8-496b-94b1-cb99a3a389e9','Javascript',1,'2021-07-12 04:44:35','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('5ae4387f-1caa-4977-b62c-21df6128932e','MongoDB',1,'2021-07-12 04:44:27','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('64b27469-7634-4827-b4c2-80df4879354a','Flutter',1,'2021-07-12 04:44:46','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('690ab2d0-2fc9-4360-8a93-d05aaab6c3e2','Postgres',1,'2021-07-12 04:45:01','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('c8c89cfc-ac63-4de0-a6b7-800c4fe19c99','Sequelize',1,'2021-07-12 04:49:38','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('c97a2f71-300e-4e5b-a0d0-04e74e32d060','Typescript',1,'2021-07-12 04:49:16','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('d33ded5b-94b2-44a3-bdf2-84472135549e','Mongoose',1,'2021-07-12 04:49:44','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('e1ef252b-aab5-4ddf-a184-3a9e874e9c5c','Java',1,'2021-07-12 04:44:41','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('e6391e02-3eee-44aa-826f-1562b47b2aa5','C++',1,'2021-07-12 04:45:29','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('ee624202-7730-4f85-9e67-d65c4df6adec','PHP',1,'2021-07-12 04:45:34','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0),('f8f6ff31-4cbb-40e2-a10f-45726a4233d0','ReactJS',1,'2021-07-12 04:44:54','be7158f5-8f13-4cce-ba29-6d845aba2707',NULL,NULL,0);
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

-- Dump completed on 2021-07-14 16:48:39
