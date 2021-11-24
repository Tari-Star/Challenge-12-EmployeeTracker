const connection = require("../config/connection");
class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllEmployees() {
    return this.connection.promise()
      .query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name,
       CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employees INNER JOIN roles ON roles.id = employees.role_id 
        INNER JOIN departments ON departments.id = roles.department_id LEFT JOIN employees e ON employees.manager_id = e.id;`);
  }
  findAllDepartments() {
    return this.connection
      .promise()
      .query(
        `SELECT * FROM departments;`
      );
  }
  findAllRoles() {
    return this.connection
      .promise()
      .query(
        `SELECT roles.id, roles.title , roles.salary , departments.name AS 'department' FROM roles INNER JOIN departments ON departments.id = roles.department_id;`
      );
  }
  newDept(params) {
    return this.connection
    .promise()
    .query(`INSERT INTO departments (name) VALUES (?)`,params);
  }
  newRole(params) {
     return this. connection.promise().query(`INSERT INTO roles SET ?`, params);
     
  }
 
  newEmployee(params) {
      return this.connection.promise().query(`INSERT INTO employees SET ?`, params);
 
}
 findAllManagers() {
  return this.connection.promise().query(`SELECT CONCAT(employees.id, employees.first_name, ' ' , employees.last_name) AS 'manager' FROM employees WHERE manager_id IS NULL`)
 }
 setRole(params){
  return this.connection.promise().query(`UPDATE employees SET role_id = ? WHERE id = ?`, params)
 }
}
module.exports = new DB(connection);
