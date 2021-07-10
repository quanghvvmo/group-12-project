
--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20210622032542-create-user.js'),('20210622032853-create-role.js'),('20210622033329-create-account.js'),('20210622100743-create-user-role.js'),('20210622101015-create-module.js'),('20210622101249-create-role-permission.js'),('20210622101422-create-form.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createBy` varchar(255) DEFAULT NULL,
  `updateBy` varchar(255) DEFAULT NULL,
  `isDelete` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('06161f12-a647-4dbe-89d7-cb338693d53e','ac3a4c4b-1037-427d-a0ad-c3b2029c709b','manager','$2b$10$XAkyhU2I3sF606rergpcIuX164cScGGVc9ksl.9hjIQR4pA25bG6K','2021-06-24 02:22:37','2021-06-24 02:22:37','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('38d66388-a4d8-44a9-90cb-0049a1b1c332','f2d0582a-0c5e-4716-b834-ae1b8076077f','director','$2b$10$sPagEa8c3Bu3Qi89z8P.meHo1D18NrbPi3L5hjxGM1M1c3Zp3zYgO','2021-06-24 04:40:02','2021-06-24 09:32:36','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('450f3600-f32f-4c0b-a892-e63d7021dc43','fbd0d11c-6ae5-46f9-bd84-87e496a142f5','employee2','$2b$10$ZowJJPWrQAwlnm6U1jQGSuIjGZNY/6n7t8kvmKUx85xhEBCLYln62','2021-06-30 04:24:16','2021-06-30 04:24:16',NULL,'f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('84af41e5-6c07-4812-b2b5-043dd30bf90d','f037a2db-5002-43c1-80cb-1bbffc4758f2','admin','$2b$10$cil/s0.QTshBVcX4Qb/AJOAv6IoxqCC7bqQ.SkIt5JZ1CX.elQeJm','2021-06-23 03:22:12','2021-06-23 03:22:12','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('8c01d07d-3e9f-47d8-adfc-040b1c41ae84','b8552298-7075-45bb-9fc1-4f9e28c127a1','hraccount','$2b$10$ysj8/5uQ2QOwTLFEKrQSRu5yqs.7dJxukbOA8FPDBmQrlAtvfpnAS','2021-06-24 02:23:12','2021-06-24 02:23:12','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('8fc3233a-674a-4107-8fa4-cfbcb148d59a','cab64ec3-e333-4675-985e-1c7cde4b444b','employee3','$2b$10$QugfayuDXNBPWyXsbwM07eERyVwWL1Z7vewWiNAt2V9iC1DgJO9pm','2021-07-02 07:52:56','2021-07-02 07:58:05',NULL,'b8552298-7075-45bb-9fc1-4f9e28c127a1',0),('a6ccb244-7954-42e3-945b-657027547387','8b8ba587-5ec4-4bac-aab7-4923f7af447e','employee1','$2b$10$RPGruenLDJhyF/bwDZWgbOQMVGCt4mXAG1cItZEd4tcGylI/pLlB6','2021-06-25 07:31:30','2021-07-02 04:06:28','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',1),('bb4c88a4-f224-4b6f-b319-4bf7ae105fd2','2b105106-25ed-49d1-8bb5-d0d1001d5793','employee','$2b$10$xdmCkaEQg9mk2XeBdP5NrO0dc1G372fpianMl4yzOEOOmTFLSvnsq','2021-06-24 02:22:02','2021-06-24 02:22:02','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0);
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
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `typeOf` varchar(255) DEFAULT NULL,
  `managerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `note` text,
  `task` text,
  `achievement` text,
  `managerComment` text,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createBy` varchar(255) DEFAULT NULL,
  `updateBy` varchar(255) DEFAULT NULL,
  `isDelete` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forms`
--

LOCK TABLES `forms` WRITE;
/*!40000 ALTER TABLE `forms` DISABLE KEYS */;
INSERT INTO `forms` VALUES ('3fa54878-9438-4ed4-9446-56a285711ac8','2b105106-25ed-49d1-8bb5-d0d1001d5793','basic',NULL,NULL,NULL,NULL,NULL,'new','2021-07-06 04:31:22','2021-07-06 04:31:22','b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1',0),('441529ab-982a-4b78-a486-fa475ce9166f','8b8ba587-5ec4-4bac-aab7-4923f7af447e','yearly','ac3a4c4b-1037-427d-a0ad-c3b2029c709b','Not ','Not ','Dont ','Lazy','Approved','2021-06-25 06:52:32','2021-06-27 01:40:26','b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1',0),('4c63b254-8dba-4102-bf4d-99fd3b9d508d','2b105106-25ed-49d1-8bb5-d0d1001d5793','yearly','ac3a4c4b-1037-427d-a0ad-c3b2029c709b','Not ','Not ','Dont ','Lazy','Approved','2021-06-25 06:52:32','2021-06-27 01:40:11','b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1',0),('7aa055e9-035a-4ae4-919c-6b05ba0de612','2b105106-25ed-49d1-8bb5-d0d1001d5793','basic','ac3a4c4b-1037-427d-a0ad-c3b2029c709b','Not ','Not ','Dont ','Lazy','Approved','2021-06-25 08:32:48','2021-06-27 01:40:43','b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1',0),('95b2559d-c9a5-4ca2-97e8-5b18355b3c20','2b105106-25ed-49d1-8bb5-d0d1001d5793','yearly',NULL,NULL,NULL,NULL,NULL,'new','2021-07-06 04:31:28','2021-07-06 04:31:28','b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1',0),('cce896c9-d54a-4beb-aa78-e187ff7a29b8','8b8ba587-5ec4-4bac-aab7-4923f7af447e','yearly',NULL,NULL,NULL,NULL,NULL,'new','2021-07-06 04:31:28','2021-07-06 04:31:28','b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1',0),('e5af0ee6-8e50-48f6-a1c3-bc5aefd726af','8b8ba587-5ec4-4bac-aab7-4923f7af447e','basic',NULL,NULL,NULL,NULL,NULL,'new','2021-07-06 04:31:22','2021-07-06 04:31:22','b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1',0),('f04b05ba-29ba-462e-857a-66a088ebb29c','8b8ba587-5ec4-4bac-aab7-4923f7af447e','basic','ac3a4c4b-1037-427d-a0ad-c3b2029c709b','Not ','Not ','Dont ','Lazy','Closed','2021-06-25 08:32:48','2021-06-28 08:37:44','b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1',0);
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
  `moduleName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createBy` varchar(255) DEFAULT NULL,
  `updateBy` varchar(255) DEFAULT NULL,
  `isDelete` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES ('6b33259f-fcb2-4178-ab81-589cd894f9f4','role','2021-07-02 07:28:06','2021-07-02 07:37:34','b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1',0),('934efd23-3212-4ace-9041-c9d4ed6010aa','account','2021-06-28 06:23:14','2021-06-28 06:23:14','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('aa221bae-884e-4d41-8ca5-f2d36beeab8c','form','2021-06-23 08:33:18','2021-06-23 08:33:18','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('f5ed0de4-b3f2-4e58-871b-8a6a547bfbb7','infor','2021-06-30 04:27:20','2021-06-30 04:27:20','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0);
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolePermissions`
--

DROP TABLE IF EXISTS `rolePermissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolePermissions` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `roleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `moduleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `canRead` int DEFAULT NULL,
  `canWrite` int DEFAULT NULL,
  `canUpdate` int DEFAULT NULL,
  `canDelete` int DEFAULT NULL,
  `canApprove` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createBy` varchar(255) DEFAULT NULL,
  `updateBy` varchar(255) DEFAULT NULL,
  `isDelete` int DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolePermissions`
--

LOCK TABLES `rolePermissions` WRITE;
/*!40000 ALTER TABLE `rolePermissions` DISABLE KEYS */;
INSERT INTO `rolePermissions` VALUES ('02c2461f-b660-411f-9379-a53417c24c83','5a4a612c-a4ee-4b58-a220-38e5b2203741','5a4a612c-a4ee-4b58-a220-38e5b2203741',1,1,1,1,1,'2021-07-01 01:57:26','2021-07-01 01:57:26','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0,'/infors'),('07ac39ec-9d83-4a5f-8e44-69d5ec7c8bde','5a4a612c-a4ee-4b58-a220-38e5b2203741','aa221bae-884e-4d41-8ca5-f2d36beeab8c',1,1,1,1,1,'2021-06-23 08:51:16','2021-06-23 08:51:16','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0,'/forms'),('0c87f819-aee2-4664-a441-3ebcab00e1f5','faafd1f0-518f-4fe4-ae36-654d67da1562','aa221bae-884e-4d41-8ca5-f2d36beeab8c',1,1,1,1,1,'2021-06-23 09:33:56','2021-06-23 09:33:56','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0,'/forms'),('552d7804-9be3-4ecb-88e1-ce897b01035b','ee3c4173-f6e2-454e-99a3-e1c59f455d22','934efd23-3212-4ace-9041-c9d4ed6010aa',0,0,0,0,0,'2021-06-30 04:28:56','2021-06-30 04:28:56','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0,'/forms'),('65c53a8a-1dc1-449e-bd1e-223496144df9','258c3db8-5a98-40e4-94bc-753c2c0eb73c','aa221bae-884e-4d41-8ca5-f2d36beeab8c',1,0,1,0,1,'2021-06-23 09:33:40','2021-06-23 09:33:40','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0,'/forms'),('7deacea8-1b33-4abe-bd26-c5ccc5079b64','38cf3745-268f-43f3-a283-b4a49d9d21ad','aa221bae-884e-4d41-8ca5-f2d36beeab8c',1,1,1,1,0,'2021-06-23 09:32:47','2021-06-23 09:32:47','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0,'/forms'),('89044ffc-cd90-4f98-b2c0-aa9fe94a8e10','faafd1f0-518f-4fe4-ae36-654d67da1562','f5ed0de4-b3f2-4e58-871b-8a6a547bfbb7',1,0,1,0,0,'2021-07-01 02:00:49','2021-07-01 02:00:49','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0,'/users'),('921c88a2-4df3-48bd-9ca0-959d11e666cf','38cf3745-268f-43f3-a283-b4a49d9d21ad','f5ed0de4-b3f2-4e58-871b-8a6a547bfbb7',1,1,1,1,0,'2021-07-01 02:01:09','2021-07-01 02:01:09','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0,'/users'),('a6a542b1-0156-49f7-af49-d7f96b140693','faafd1f0-518f-4fe4-ae36-654d67da1562','aa221bae-884e-4d41-8ca5-f2d36beeab8c',1,1,0,0,0,'2021-07-02 07:45:23','2021-07-02 07:49:30','b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1',0,'/roles'),('b0c6f288-20d2-4069-8797-3dcb0894f230','d9d0ed97-3459-47fe-b60d-a5bb9ca4233c','f5ed0de4-b3f2-4e58-871b-8a6a547bfbb7',1,0,1,0,0,'2021-07-01 02:01:37','2021-07-01 02:01:37','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0,'/users'),('b5a65078-bc13-4b5e-b858-431efc481093','5a4a612c-a4ee-4b58-a220-38e5b2203741','f5ed0de4-b3f2-4e58-871b-8a6a547bfbb7',1,1,1,1,1,'2021-07-01 01:57:53','2021-07-01 01:57:53','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0,'/users'),('bcbe7ca6-4fa1-4b6f-a8ed-82d447c905e1','258c3db8-5a98-40e4-94bc-753c2c0eb73c','f5ed0de4-b3f2-4e58-871b-8a6a547bfbb7',1,0,1,0,0,'2021-07-01 02:00:33','2021-07-01 02:00:33','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0,'/users'),('c9100fb1-3890-477e-bdf9-6261d3d77919','1de057e3-9867-4bbe-b0ad-7c509151f22a','6b33259f-fcb2-4178-ab81-589cd894f9f4',1,0,0,0,0,'2021-07-02 07:44:26','2021-07-02 07:44:26','b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1',0,'/roles'),('da992bf7-de6a-457d-8223-1db27e145dd8','d9d0ed97-3459-47fe-b60d-a5bb9ca4233c','aa221bae-884e-4d41-8ca5-f2d36beeab8c',1,0,1,0,0,'2021-06-23 09:30:42','2021-06-23 09:30:42','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0,'/forms');
/*!40000 ALTER TABLE `rolePermissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `roleName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createBy` varchar(255) DEFAULT NULL,
  `updateBy` varchar(255) DEFAULT NULL,
  `isDelete` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('1de057e3-9867-4bbe-b0ad-7c509151f226','sale','2021-07-02 07:16:09','2021-07-02 07:42:34','b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1',0),('258c3db8-5a98-40e4-94bc-753c2c0eb73c','manager','2021-06-23 04:12:33','2021-06-23 04:12:33','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('38cf3745-268f-43f3-a283-b4a49d9d21ad','hr','2021-06-23 04:10:18','2021-06-23 04:10:18','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('5a4a612c-a4ee-4b58-a220-38e5b2203741','admin','2021-06-23 04:09:11','2021-06-23 04:09:11','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('d9d0ed97-3459-47fe-b60d-a5bb9ca4233c','employee','2021-06-23 04:12:47','2021-06-23 04:12:47','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('ee3c4173-f6e2-454e-99a3-e1c59f455d22','test','2021-06-30 04:24:55','2021-06-30 04:24:55','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('faafd1f0-518f-4fe4-ae36-654d67da1562','director','2021-06-23 04:12:20','2021-06-23 04:12:20','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userRoles`
--

DROP TABLE IF EXISTS `userRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userRoles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `roleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `createBy` varchar(255) DEFAULT NULL,
  `updateBy` varchar(255) DEFAULT NULL,
  `isDelete` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userRoles`
--

LOCK TABLES `userRoles` WRITE;
/*!40000 ALTER TABLE `userRoles` DISABLE KEYS */;
INSERT INTO `userRoles` VALUES ('030ba2b6-d48e-401c-b122-7640c6095a8c','f037a2db-5002-43c1-80cb-1bbffc4758f2','5a4a612c-a4ee-4b58-a220-38e5b2203741','2021-06-23 06:47:13','2021-06-23 06:47:13','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('4db8da86-5243-4f60-a6cd-2e01194e8c1b','cab64ec3-e333-4675-985e-1c7cde4b444b','d9d0ed97-3459-47fe-b60d-a5bb9ca4233c','2021-07-02 07:01:52','2021-07-02 07:23:53','b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1',1),('6b705b9d-eac7-4bc2-a00e-c5671251c325','2b105106-25ed-49d1-8bb5-d0d1001d5793','d9d0ed97-3459-47fe-b60d-a5bb9ca4233c','2021-06-23 06:49:31','2021-06-23 06:49:31','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('a9ed2a80-ea75-4777-a0b8-1a25d1a90265','9b878523-8f7c-4e8e-8ce0-bc9ae261a19f','d9d0ed97-3459-47fe-b60d-a5bb9ca4233c','2021-07-06 04:10:56','2021-07-06 04:10:56','b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1',0),('cd17d89e-82c2-464f-89bb-0947ba5881af','fbd0d11c-6ae5-46f9-bd84-87e496a142f5','d9d0ed97-3459-47fe-b60d-a5bb9ca4233c','2021-06-30 04:23:42','2021-06-30 04:23:42','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('cf4941df-3d20-4de3-b70b-48e0a1164efc','f2d0582a-0c5e-4716-b834-ae1b8076077f','faafd1f0-518f-4fe4-ae36-654d67da1562','2021-06-23 06:48:00','2021-06-23 06:48:00','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('d22bcf43-9ca0-4c26-bd70-4b47bc0d9cc3','b8552298-7075-45bb-9fc1-4f9e28c127a1','258c3db8-5a98-40e4-94bc-753c2c0eb73c','2021-06-30 07:56:03','2021-06-30 07:56:03','b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1',0),('d4d9acfa-92d1-4562-b971-fd8a5504f1b0','ac3a4c4b-1037-427d-a0ad-c3b2029c709b','258c3db8-5a98-40e4-94bc-753c2c0eb73c','2021-06-23 06:48:28','2021-06-23 06:48:28','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('f4d61cc6-ff9a-4e5b-8a67-77af14600774','b8552298-7075-45bb-9fc1-4f9e28c127a1','38cf3745-268f-43f3-a283-b4a49d9d21ad','2021-06-23 06:48:57','2021-06-23 06:48:57','f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2',0),('fb636f57-8603-48b3-904f-f89706304530','8b8ba587-5ec4-4bac-aab7-4923f7af447e','ee3c4173-f6e2-454e-99a3-e1c59f455d22','2021-06-25 06:18:54','2021-07-02 03:47:30','f037a2db-5002-43c1-80cb-1bbffc4758f2','b8552298-7075-45bb-9fc1-4f9e28c127a1',1);
/*!40000 ALTER TABLE `userRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `employeeId` varchar(255) DEFAULT NULL,
  `managerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `identificationNumber` varchar(255) DEFAULT NULL,
  `insuranceNumber` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isDelete` int DEFAULT NULL,
  `createBy` varchar(255) DEFAULT NULL,
  `updateBy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2b105106-25ed-49d1-8bb5-d0d1001d5793','vmo004','ac3a4c4b-1037-427d-a0ad-c3b2029c709b','Vu','Van Employee','vuducvan999@gmail.com','0932217422','22, Ba Dinh','uploads/Screenshot from 2021-05-25 10-03-34.png','C3','789','367','2021-06-23 04:35:38','2021-06-23 04:35:38',0,'f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2'),('8b8ba587-5ec4-4bac-aab7-4923f7af447e','vmo006','ac3a4c4b-1037-427d-a0ad-c3b2029c709b','Hoang','Van employeeeee','canthietcuatoi.van@gmail.com','0932217422','22, Ba Dinh','uploads/anh2.png','C3','789','367','2021-06-25 06:18:54','2021-07-01 02:10:36',0,'f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2'),('9b878523-8f7c-4e8e-8ce0-bc9ae261a19f','vmo009','ac3a4c4b-1037-427d-a0ad-c3b2029c709b','Bui','Le Anh Duc','hrdv@vmodev.com','0932217422','22, Ba Dinh','uploads/anh1.png','C3','789','367','2021-07-06 04:10:56','2021-07-06 04:10:56',0,'b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1'),('ac3a4c4b-1037-427d-a0ad-c3b2029c709b','vmo003','f2d0582a-0c5e-4716-b834-ae1b8076077f','Tran','Thi Manager','mangertt@vmodev.com','0932217422','22, Ho Tung Mau','uploads/Screenshot from 2021-05-25 10-03-34.png','C12','789','367','2021-06-23 04:34:00','2021-06-23 04:34:00',0,'f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2'),('b8552298-7075-45bb-9fc1-4f9e28c127a1','vmo005','ac3a4c4b-1037-427d-a0ad-c3b2029c709b','Do','Van HR','hrdv@vmodev.com','0932217422','22, Ba Dinh','uploads/Screenshot from 2021-05-25 10-03-34.png','C3','789','367','2021-06-23 04:36:21','2021-06-23 04:36:21',0,'f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2'),('cab64ec3-e333-4675-985e-1c7cde4b444b','vmo0009','ac3a4c4b-1037-427d-a0ad-c3b2029c709b','hahah','hihihi','aaaaaa','123','123123','uploads/anh1.png','fff','6666','4444','2021-07-02 07:01:52','2021-07-02 07:23:53',1,'b8552298-7075-45bb-9fc1-4f9e28c127a1','b8552298-7075-45bb-9fc1-4f9e28c127a1'),('f037a2db-5002-43c1-80cb-1bbffc4758f2','vmo001',NULL,'admin','admin','admin@vmodev.com','0912213345','18, Trung Khuong','uploads/Screenshot from 2021-05-25 10-03-34.png','ADMIN','123','234','2021-06-23 03:21:33','2021-06-23 03:21:33',0,'f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2'),('f2d0582a-0c5e-4716-b834-ae1b8076077f','vmo002',NULL,'Nguyen','Van A','anv@vmodev.com','0932217432','18, Trung Hoa','uploads/Screenshot from 2021-05-25 10-03-34.png','C18','789','367','2021-06-23 04:25:25','2021-06-23 04:25:25',0,'f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2'),('fbd0d11c-6ae5-46f9-bd84-87e496a142f5','vmo006','ac3a4c4b-1037-427d-a0ad-c3b2029c709b','Tran ','Hoang employee1','hrdv@vmodev.com','0932217422','22, Ba Dinh','uploads/anh1.png','C3','789','367','2021-06-30 04:23:42','2021-06-30 04:23:42',0,'f037a2db-5002-43c1-80cb-1bbffc4758f2','f037a2db-5002-43c1-80cb-1bbffc4758f2');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
