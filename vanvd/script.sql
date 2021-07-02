//account module
INSERT INTO account (userId, username, password, createBy, createAt, updateBy, UpdateAt, isDelete) 
VALUES (userId, username, password, createBy, createAt, updateBy, UpdateAt, 0);

UPDATE account SET userId = userId, username = username, password = password, updateBy, isDelete = 0 WHERE id = id;
DELETE FROM user WHERE id = id;
SELECT * FROM account WHERE username = username;

//form module

INSERT INTO form (userId, typeOf, status, createBy, updateBy, isDelete) 
VALUES (userId, typeOf, status, createBy, updateBy, createAt, updateAt, isDelete);

SELECT * FROM form WHERE userId = userId, isDelete = 0;
SELECT * FROM form WHERE managerId = managerId, isDelete = 0;
SELECT * FROM form WHERE id = id, isDelete = 0;
UPDATE form SET managerId = managerId, note = note, task = task, achievement = achievement, status = "Pending approve" WHERE userId = userId;
UPDATE form SET managerComment = managerComment, status = status WHERE id = id, isDelete = 0;
UPDATE form SET status = "closed" WHERE id = id, isDelete = 0;
UPDATE form SET isDelete = 1, WHERE id = id;
SELECT * FROM form WHERE typeOf = typeOf, status = status, isDelete = 0;

//Module module
SELECT * FROM module WHERE moduleName = moduleName;
INSERT INTO module (moduleName, createBy, createAt, updateBy, updateAt, isDelete)
VALUES (moduleName, createBy, createAt, updateBy, updateAt, 0);
UPDATE module SET moduleName = moduleName, updateBy = updateBy WHERE id = id;
UPDATE module SET isDelete = 1 WHERE id = id;
SELECT * FROM module WHERE id = moduleId LIMIT 1;

//role module 
SELECT * FROM role WHERE roleName = roleName;
INSERT INTO role (roleName, createBy, createAt, updateBy, updateAt, isDelete)
VALUES (oleName, createBy, createAt, updateBy, updateAt, 0);
UPDATE role SET roleName = roleName, updateBy = updateBy WHERE id = id;
UPDATE role SET isDelete = 1 WHERE roleId = id;
SELECT * FROM userRole INNER JOIN role ON userRole.roleId = role.id
INNER JOIN rolePermission ON role.id = rolePermission.roleId WHERE userId = userId, isDelete = 0;
SELECT * FROM role WHERE id = roleId LIMIT 1;

//rolePermission module
INSERT INTO rolePermission (roleId, moduleId, url, canRead, canWrite, canUpdate, canDelete, canApprove)
VALUES (roleId, moduleId, url, canRead, canWrite, canUpdate, canDelete, canApprove)
UPDATE rolePermission SET roleId = roleId, moduleId = moduleId, canRead = 1, canWrite = 1, canUpdate = 1, canDelete = 1, canApprove = 1
WHERE id = id, isDelete = 0;
UPDATE rolePermission SET isDelete = 1 WHERE id = id;


//user module
SELECT * FROM user WHERE id = userId, isDelete = 0;
SELECT * FROM user WHERE id = managerId, isDelete = 0 LIMIT 1;
INSERT INTO user (employeeId, managerId, firstName, lastName, email, phone, avatar, address, department, identificationNumber
insuranceNumber, createBy, updateBy, createAt, updateAt, isDelete)
VALUES (employeeId, managerId, firstName, lastName, email, phone, avatar, address, department, identificationNumber
insuranceNumber, createBy, updateBy, createAt, updateAt, 0);

UPDATE user SET employeeId = employeeId, managerId = managerId, firstName = firstName, lastName= lastName, email = email, phone = phone, avatar =avatar, address = address, 
department = department, identificationNumber = identificationNumber,
insuranceNumber = insuranceNumber, createBy = createBy, updateBy = updateBy, createAt = createAt, updateAt = updateAt, 0
WHERE id = id;
UPDATE user SET isDelete = 1 WHERE id = id;
SELECT * FROM user WHERE id = id, isDelete = 0;

//userRole module 
INSERT INTO userRole (userId, roleId, createAt, createBy, updateAt, updateBy, isDelete)
VALUES (userId, roleId, createAt, createBy, updateAt, updateBy, 0);
