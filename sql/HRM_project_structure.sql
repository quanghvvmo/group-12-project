--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `createBy` varchar(45) DEFAULT NULL,
  `updateBy` varchar(45) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDelete` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='					';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `form`
--

DROP TABLE IF EXISTS `form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `form` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `typeOf` varchar(45) DEFAULT NULL,
  `managerId` varchar(36) DEFAULT NULL,
  `note` varchar(45) DEFAULT NULL,
  `task` varchar(45) DEFAULT NULL,
  `achievement` varchar(45) DEFAULT NULL,
  `managerComment` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `createby` varchar(45) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateBy` varchar(45) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDelete` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `id` varchar(36) NOT NULL,
  `moduleName` varchar(45) DEFAULT NULL,
  `createBy` varchar(45) DEFAULT NULL,
  `updateBy` varchar(45) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDelete` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` varchar(36) NOT NULL,
  `roleName` varchar(45) DEFAULT NULL,
  `createBy` varchar(45) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateBy` varchar(45) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDelete` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rolepermission`
--

DROP TABLE IF EXISTS `rolepermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolepermission` (
  `id` varchar(36) NOT NULL,
  `roleId` varchar(36) DEFAULT NULL,
  `moduleId` varchar(45) DEFAULT NULL,
  `url` varchar(45) DEFAULT NULL,
  `canRead` int DEFAULT NULL,
  `canWrite` int DEFAULT NULL,
  `canUpdate` int DEFAULT NULL,
  `canDelete` int DEFAULT NULL,
  `canApprove` int DEFAULT NULL,
  `createBy` varchar(45) DEFAULT NULL,
  `updateBy` varchar(45) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDelete` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `employeeid` varchar(45) DEFAULT NULL,
  `firstName` varchar(45) DEFAULT NULL,
  `lastName` varchar(45) DEFAULT NULL,
  `emaill` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `avatar` varchar(45) DEFAULT NULL,
  `department` varchar(45) DEFAULT NULL,
  `manager` varchar(45) DEFAULT NULL,
  `identificationNumber` varchar(45) DEFAULT NULL,
  `insuranceNumber` varchar(45) DEFAULT NULL,
  `createBy` varchar(45) DEFAULT NULL,
  `updateBy` varchar(45) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDelete` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userrole`
--

DROP TABLE IF EXISTS `userrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrole` (
  `id` varchar(36) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `roleId` varchar(36) DEFAULT NULL,
  `createBy` varchar(45) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  `updateBy` varchar(45) DEFAULT NULL,
  `updateAt` datetime DEFAULT NULL,
  `isDelete` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

