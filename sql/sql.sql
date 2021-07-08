-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: hr_management_system
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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createBy` varchar(255) DEFAULT NULL,
  `updateBy` varchar(255) DEFAULT NULL,
  `isDeleted` varchar(255) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('319308d1-a73b-4f1e-9d32-efcbb132c48c','e6f62dd3-5775-4b0f-93d1-76e43044e057','$2b$10$By5KZhCfDfbEatMhjF0dM.Lov9TbPaHhIlaKPlqufz5M9IqspMPxW','anhvtk@vmodev.com','2021-06-25 09:30:30','2021-06-25 09:30:30',NULL,NULL,'0'),('bac31a07-4419-4783-b0f6-e9884f416e3a','5984b4cb-841e-4897-b3a0-2dbe71f21f26','$2b$10$K87bOhl4fLwoDO50Y98aAOVdv2OOAo19IjZ/UvQpiOC3Uzjtc4kv6','ducbla@vmodev.com','2021-06-25 09:33:05','2021-06-25 09:33:05',NULL,NULL,'0'),('bd80774e-6b35-4076-beed-c2c4a7f3ae6f','8536a99b-23e7-452f-bd93-ea021d015e6f','$2b$10$PEISxuuxsKvOho9OhGoeke6VC7rSzXTxCrIBnBZJEflx1cnVOUILy','huongntt@vmodev.com','2021-06-25 09:28:46','2021-06-25 09:28:46',NULL,NULL,'0'),('c002f7e0-454d-4add-83a1-10060ff935a6','2d4683cd-37ae-4952-af63-da027f8cc6af','$2b$10$GFz8We3klQHBSQ9OfkO98OJnQeWzNJ9wgxynvKbbC314ZAmxUZj32','admin@vmodev.com','2021-06-25 09:25:17','2021-06-25 09:25:17',NULL,NULL,'0'),('dd9fcb73-4971-4586-81a0-f053ecbe1938','5bba59cc-30e3-430d-934d-522fb72c0d81','$2b$10$olkQpKAnQlRemD6n0EFGIeTLKKRgKk.CcRLT0QIEoR7xrrDExVSuK','vanvd@vmodev.com','2021-06-25 09:26:56','2021-06-25 09:26:56',NULL,NULL,'0');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forms`
--

DROP TABLE IF EXISTS `forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forms` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `form_type` varchar(255) DEFAULT NULL,
  `manager` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `personal_review` varchar(255) DEFAULT NULL,
  `manager_review` varchar(255) DEFAULT NULL,
  `hr_review` varchar(255) DEFAULT NULL,
  `task` varchar(255) DEFAULT NULL,
  `archivement` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createBy` varchar(255) DEFAULT NULL,
  `updateBy` varchar(255) DEFAULT NULL,
  `isDeleted` varchar(255) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forms`
--

LOCK TABLES `forms` WRITE;
/*!40000 ALTER TABLE `forms` DISABLE KEYS */;
INSERT INTO `forms` VALUES ('25d2b504-b7fe-426b-8883-b6f9b29585ad','5984b4cb-841e-4897-b3a0-2dbe71f21f26','1','5bba59cc-30e3-430d-934d-522fb72c0d81','pending approve','Excellent',NULL,'Test Form 2','HRM SYS','HRM SYS','2021-07-07 02:01:54','2021-07-07 02:05:09','e6f62dd3-5775-4b0f-93d1-76e43044e057','5984b4cb-841e-4897-b3a0-2dbe71f21f26','0'),('6b73f9e1-2459-47f2-9d65-c79b4a41d9a6','5984b4cb-841e-4897-b3a0-2dbe71f21f26','1',NULL,'submitted',NULL,NULL,'Test Form 2',NULL,NULL,'2021-07-07 01:38:17','2021-07-07 01:38:17','e6f62dd3-5775-4b0f-93d1-76e43044e057','e6f62dd3-5775-4b0f-93d1-76e43044e057','0'),('b7457fe1-afec-4849-a6c8-835474481855','5984b4cb-841e-4897-b3a0-2dbe71f21f26','0','5bba59cc-30e3-430d-934d-522fb72c0d81','approved','Excellent','Awesome','Chicken','HRM SYS','HRM SYS','2021-07-02 03:38:36','2021-07-02 03:51:24','e6f62dd3-5775-4b0f-93d1-76e43044e057','5bba59cc-30e3-430d-934d-522fb72c0d81','0'),('c6238aa0-c52a-4e9b-b280-318a56937ca0','5984b4cb-841e-4897-b3a0-2dbe71f21f26','1',NULL,'submitted',NULL,NULL,'Test Form 1',NULL,NULL,'2021-07-06 07:53:02','2021-07-06 07:53:02','e6f62dd3-5775-4b0f-93d1-76e43044e057','e6f62dd3-5775-4b0f-93d1-76e43044e057','0'),('db1bb9cb-ac4a-47d3-be2b-6408c1e24f98','5984b4cb-841e-4897-b3a0-2dbe71f21f26','0',NULL,'submitted',NULL,NULL,'Test Form 2',NULL,NULL,'2021-07-07 02:02:15','2021-07-07 02:02:15','e6f62dd3-5775-4b0f-93d1-76e43044e057','e6f62dd3-5775-4b0f-93d1-76e43044e057','0'),('e28ad543-f9bf-411f-979a-026b12aa365d','e6f62dd3-5775-4b0f-93d1-76e43044e057','0','8536a99b-23e7-452f-bd93-ea021d015e6f','approved','Excellent','Awesome','Good','Hire NodeJS Fresher','Hire NodeJS Fresher','2021-06-30 06:22:17','2021-06-30 06:28:10','e6f62dd3-5775-4b0f-93d1-76e43044e057','8536a99b-23e7-452f-bd93-ea021d015e6f','0'),('e6731b1b-c341-4a43-bebd-caeec27010a8','5984b4cb-841e-4897-b3a0-2dbe71f21f26','0',NULL,'submitted',NULL,NULL,'Chicken 1',NULL,NULL,'2021-07-06 04:34:59','2021-07-06 04:34:59','e6f62dd3-5775-4b0f-93d1-76e43044e057','e6f62dd3-5775-4b0f-93d1-76e43044e057','0'),('f41a70cd-9c14-4224-afc3-076962eea9c4','5984b4cb-841e-4897-b3a0-2dbe71f21f26','1',NULL,'submitted',NULL,NULL,'Test Form 2',NULL,NULL,'2021-07-07 01:44:36','2021-07-07 01:44:36','e6f62dd3-5775-4b0f-93d1-76e43044e057','e6f62dd3-5775-4b0f-93d1-76e43044e057','0');
/*!40000 ALTER TABLE `forms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `module_name` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createBy` varchar(255) DEFAULT NULL,
  `updateBy` varchar(255) DEFAULT NULL,
  `isDeleted` varchar(255) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES ('2d79f89e-fc12-4bf0-9e27-6c495fb92534','accounts','2021-07-07 02:43:36','2021-07-07 02:43:36','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('3a50a4d0-1815-4bdf-b590-558b3533f6eb','users','2021-07-01 02:53:06','2021-07-07 03:00:05','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('43868a52-a4e8-4265-84b8-fc43f4869b78','modules','2021-07-07 02:39:27','2021-07-07 02:39:27','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('7903aae5-b2c2-44b5-b982-c4a48ae79484','fake','2021-07-07 02:50:48','2021-07-07 02:51:55','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','1'),('7cd912a6-bd6b-4e55-88bc-bc12aaeb9843','user-roles','2021-07-07 02:36:37','2021-07-07 02:36:37','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('8dd504a7-c244-48e3-a9cc-09f90fbc0da3','forms','2021-06-28 08:56:38','2021-07-07 03:00:36','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('bbe65132-53a9-4670-8353-581ef6abc402','permissions','2021-07-07 03:01:55','2021-07-07 03:01:55','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('f18fa1c5-a55f-44b4-91fc-c3e0c238e813','roles','2021-07-07 03:01:28','2021-07-07 03:01:28','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0');
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission_forms`
--

DROP TABLE IF EXISTS `role_permission_forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission_forms` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role_id` varchar(255) NOT NULL,
  `module_id` varchar(255) NOT NULL,
  `canCreate` int NOT NULL,
  `canRead` int NOT NULL,
  `canUpdate` int NOT NULL,
  `canDelete` int NOT NULL,
  `canApprove` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `url` varchar(255) NOT NULL,
  `createBy` varchar(255) DEFAULT NULL,
  `updateBy` varchar(255) DEFAULT NULL,
  `isDeleted` varchar(255) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission_forms`
--

LOCK TABLES `role_permission_forms` WRITE;
/*!40000 ALTER TABLE `role_permission_forms` DISABLE KEYS */;
INSERT INTO `role_permission_forms` VALUES ('34dd5d52-2b13-4992-9c73-7ef56daf995b','ce9ee71e-e287-4998-912f-bc70b708fb53','8dd504a7-c244-48e3-a9cc-09f90fbc0da3',1,1,1,1,0,'2021-06-25 10:17:45','2021-06-30 04:24:32','/forms','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('38c226b0-ab7a-4ccb-b4ce-41db9bf817da','ce9ee71e-e287-4998-912f-bc70b708fb53','3a50a4d0-1815-4bdf-b590-558b3533f6eb',1,1,1,1,0,'2021-07-01 02:56:19','2021-07-01 02:56:19','/users','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('534ed4cf-cbfc-4032-885f-9798e828f162','1459bfb7-a981-4a5d-aa99-aa04aa0311f2','8dd504a7-c244-48e3-a9cc-09f90fbc0da3',0,1,1,0,0,'2021-06-25 10:18:10','2021-06-30 04:24:43','/forms','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('559736c2-d2a3-4673-8e0c-c083e2287499','ffc8c623-ee2f-48e7-9f7c-42edad317a69','3a50a4d0-1815-4bdf-b590-558b3533f6eb',1,1,1,1,1,'2021-07-01 03:06:39','2021-07-01 03:06:39','/users','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('a0b6e430-32dd-45f1-b066-e8f6ff466f17','c6220169-3d04-4ce4-86bc-e5ddb251e3dc','8dd504a7-c244-48e3-a9cc-09f90fbc0da3',1,1,1,1,1,'2021-06-25 10:03:09','2021-06-30 04:24:54','/forms','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('a3c1958d-b358-4b30-b742-9b47f0798f31','ffc8c623-ee2f-48e7-9f7c-42edad317a69','8dd504a7-c244-48e3-a9cc-09f90fbc0da3',1,1,1,1,1,'2021-06-25 10:04:49','2021-06-30 04:25:06','/forms','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('b54b1a75-d7b3-4791-869e-5d5605bce1e1','7b8badc1-44a6-4e12-9f25-5d7753468549','8dd504a7-c244-48e3-a9cc-09f90fbc0da3',1,1,1,1,1,'2021-06-25 10:03:59','2021-06-30 04:25:18','/forms','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0');
/*!40000 ALTER TABLE `role_permission_forms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role_name` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createBy` varchar(255) DEFAULT NULL,
  `updateBy` varchar(255) DEFAULT NULL,
  `isDeleted` varchar(255) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('1459bfb7-a981-4a5d-aa99-aa04aa0311f2','employee','2021-06-24 08:23:48','2021-06-30 04:15:36','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('7b8badc1-44a6-4e12-9f25-5d7753468549','director','2021-06-24 08:15:20','2021-06-30 04:15:51','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('c6220169-3d04-4ce4-86bc-e5ddb251e3dc','admin','2021-06-24 08:10:18','2021-06-30 04:16:02','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('ce9ee71e-e287-4998-912f-bc70b708fb53','hr','2021-06-24 08:23:27','2021-06-30 04:16:13','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('ffc8c623-ee2f-48e7-9f7c-42edad317a69','manager','2021-06-24 08:23:23','2021-06-30 04:16:25','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20210623021459-create-user.js'),('20210623021521-create-role.js'),('20210623021532-create-user-role.js'),('20210623021544-create-account.js'),('20210623021554-create-role-permission-form.js'),('20210623021620-create-module.js'),('20210623021640-create-form.js'),('20210625063519-create-modules.js'),('20210630034419-modify_database_fied.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createBy` varchar(255) DEFAULT NULL,
  `updateBy` varchar(255) DEFAULT NULL,
  `isDeleted` varchar(255) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES ('3d4310db-047f-4009-af2c-a7d650bd9c0f','ffc8c623-ee2f-48e7-9f7c-42edad317a69','e6f62dd3-5775-4b0f-93d1-76e43044e057','2021-06-30 07:05:24','2021-06-30 07:05:24','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('60c42b26-3f7e-4884-98da-3c92aafe1e05','1459bfb7-a981-4a5d-aa99-aa04aa0311f2','c7483735-94e9-4f70-ac72-e84aa296e5ad','2021-07-07 23:54:11','2021-07-07 23:54:11','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('790e2c86-e241-42ff-8fac-06999f665879','c6220169-3d04-4ce4-86bc-e5ddb251e3dc','2d4683cd-37ae-4952-af63-da027f8cc6af','2021-06-25 09:25:17','2021-06-30 04:05:18','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('82b29f56-7b3e-4a0e-8cb8-0358ffad2252','7b8badc1-44a6-4e12-9f25-5d7753468549','5bba59cc-30e3-430d-934d-522fb72c0d81','2021-06-25 09:26:56','2021-06-30 04:05:30','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('866e3fa2-39c0-4d0f-8928-0933bcb154ff','ffc8c623-ee2f-48e7-9f7c-42edad317a69','e6f62dd3-5775-4b0f-93d1-76e43044e057','2021-07-01 03:02:32','2021-07-01 03:02:32','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('da88c103-1dd0-4dda-99ba-f5dbf1ae9484','1459bfb7-a981-4a5d-aa99-aa04aa0311f2','84e8ac8c-b778-43d7-8116-3ca68e8e8b60','2021-07-07 23:36:56','2021-07-07 23:36:56','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('eeeb2b5e-b858-468a-972c-294f07c96cac','ffc8c623-ee2f-48e7-9f7c-42edad317a69','8536a99b-23e7-452f-bd93-ea021d015e6f','2021-06-25 09:28:46','2021-06-30 04:05:41','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('efa541d9-12ca-4e7c-8d64-f210375ff45b','ce9ee71e-e287-4998-912f-bc70b708fb53','e6f62dd3-5775-4b0f-93d1-76e43044e057','2021-06-25 09:30:30','2021-06-30 04:14:55','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `employee_code` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` int NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `identification_card` varchar(100) NOT NULL,
  `social_insurance` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `parent` varchar(200) NOT NULL,
  `position` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createBy` varchar(255) DEFAULT NULL,
  `updateBy` varchar(255) DEFAULT NULL,
  `isDeleted` varchar(255) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2d4683cd-37ae-4952-af63-da027f8cc6af','801','Admin','Admin','admin@vmodev.com',988877656,'uploads\\1624613117207.png','26374893','127384213','Ha Noi','Admin','Admin','admin','2021-06-25 09:25:17','2021-06-25 09:25:17','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('5984b4cb-841e-4897-b3a0-2dbe71f21f26','805','Duc','Bui','ducbla@vmodev.com',906583034,'uploads\\1624613585087.png','153123122','13242342','Ha Noi','Dev','8536a99b-23e7-452f-bd93-ea021d015e6f','employee','2021-06-25 09:33:05','2021-06-25 09:33:05','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('5bba59cc-30e3-430d-934d-522fb72c0d81','802','Van','Vu','vanvd@vmodev.com',973647389,'uploads\\1624613216653.png','123456789','987654321','Ha Noi','BOD','2d4683cd-37ae-4952-af63-da027f8cc6af','director','2021-06-25 09:26:56','2021-06-25 09:26:56','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('8536a99b-23e7-452f-bd93-ea021d015e6f','803','Huong','Nguyen','huongntt@vmodev.com',235647389,'uploads\\1624613326022.png','526372818','126338173','Ha Noi','HR','5bba59cc-30e3-430d-934d-522fb72c0d81','manager','2021-06-25 09:28:46','2021-06-25 09:28:46','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('c7483735-94e9-4f70-ac72-e84aa296e5ad','806','Huy','Ta Quang','ducbla@vmodev.com',906583034,'uploads\\1625702051261.png','153123122','13242342','Ha Noi','Dev','e6f62dd3-5775-4b0f-93d1-76e43044e057','employee','2021-07-07 23:54:11','2021-07-07 23:54:11','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0'),('e6f62dd3-5775-4b0f-93d1-76e43044e057','804','Anh','Vu','anhvtk@vmodev.com',967387489,'uploads\\1624613430832.png','123455432','987655678','Ha Noi','HR','8536a99b-23e7-452f-bd93-ea021d015e6f','hr','2021-06-25 09:30:30','2021-06-25 09:30:30','2d4683cd-37ae-4952-af63-da027f8cc6af','2d4683cd-37ae-4952-af63-da027f8cc6af','0');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-09  1:55:01
