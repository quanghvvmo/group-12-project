CREATE DATABASE  IF NOT EXISTS `HRM_project`;
USE `HRM_project`;

DROP TABLE IF EXISTS `account`;
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

LOCK TABLES `account` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `form`;
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
LOCK TABLES `form` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `module`;
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

LOCK TABLES `module` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `role`;
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

LOCK TABLES `role` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `rolepermission`;

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

LOCK TABLES `rolepermission` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `user`;
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

LOCK TABLES `user` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `userrole`;
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

LOCK TABLES `userrole` WRITE;
UNLOCK TABLES;