const connection = require('../config/connection');
class DB {
    constructor (connection){
        this.connection = connection
    }

   findAllEmployees(){
        return this.connection.promise().query(`SELECT employees.first_name, employees.last_name, roles.title, departments.name AS 'department',
        roles.salary, employees.manager_id AS 'managers' FROM employees, roles, departments WHERE  departments.id = roles.department_id
         AND roles.id = employees.role_id ORDER BY employees.id ASC`)
    }
    findAllDepartments(){
        return this.connection.promise().query(`SELECT departments.id AS id, departments.name AS department FROM departments`)
    }
    findAllRoles(){
        return this.connection.promise().query(`SELECT roles.id, roles.title, departments.name AS department FROM roles INNER JOIN departments ON roles.department_id = departments.id`)
    }
    findOneRole() {
        return this.connection.promise().query(`SELECT roles.id, roles.title FROM roles`)
    }
    findManager(){
        return this.connection.promise().query(`SELECT manager_id AS 'managers' FROM employees WHERE employees.id = manager_id`)
    }
}

module.exports = new DB(connection);