const User = require('./user.router');
const Account = require('./account.router');
const Role = require('./role.router');
const UserRole = require('./userrole.router');
const Module = require('./module.router');
const RolePermission = require('./rolepermission.router');
const Form = require('./form.router')

const router = [
  User,
  Account,
  Role,
  UserRole,
  Module,
  RolePermission,
  Form
];

module.exports = router;