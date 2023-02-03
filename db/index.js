const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  findAllManagers(employeeId) {
    return this.connection.promise().query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }


  // Create a new employee
  newEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee);
  }

  // Remove an employee with the given id
  deleteEmployee(employeeId) {
    return this.connection.promise().query(
      "DELETE FROM employee WHERE id = ?",
      employeeId
    );
  }

  // Update the given employee's role
  updateRole(employeeId, roleId) {
    return this.connection.promise().query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [roleId, employeeId]
    );
  }

  // Update the given employee's manager
  updateManager(employeeId, managerId) {
    return this.connection.promise().query(
      "UPDATE employee SET manager_id = ? WHERE id = ?",
      [managerId, employeeId]
    );
  }

  // Find all roles, join with departments to display the department name
  findAllRoles() {
    return this.connection.promise().query(
      "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
  }

  // Create a new role
  newRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  // Remove a role from the db
  deleteRole(roleId) {
    return this.connection.promise().query("DELETE FROM role WHERE id = ?", roleId);
  }

  // Find all departments
  findAllDepartments() {
    return this.connection.promise().query(
      "SELECT department.id, department.name FROM department;"
    );
  }


  // Create a new department
  newDepartment(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department);
  }

  // Remove a department
  deleteDepartment(departmentId) {
    return this.connection.promise().query(
      "DELETE FROM department WHERE id = ?",
      departmentId
    );
  }

  // Find all employees in a given department, join with roles to display role titles
  findEmployeesByDepartment(departmentId) {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
      departmentId
    );
  }

  // Find all employees by manager, join with departments and roles to display titles and department names
  findEmployeesByManager(managerId) {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
      managerId
    );
  }
}

module.exports = new DB(connection);
