const connection = require("./config/connection");
const inquirer = require("inquirer");
const cTable = require("console.table");

const db = require('./db/index');

const figlet = require("figlet");
const chalk = require("chalk");


connection.connect((error) => {
    if (error) throw error;
    console.log(chalk.greenBright.bold(`============================================================`));
    console.log(``);
    console.log(chalk.blueBright.bold(figlet.textSync(`        ` + "Employee \n Manager")));
    console.log(``);
    console.log(chalk.greenBright.bold(`============================================================`));
    userInput();
});

const userInput = () => {
    inquirer
        .prompt([
            {
                name: "choices",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View All Employees",
                    "View All Roles",
                    "View All Departments",
                    "Add a Department",
                    "Add a Role",
                    "Add an Employee",
                    "Update Employee Role",
                    "Quit",
                ],
            },
        ])
        .then((answers) => {
            const choice = answers.choices;
            if (choice === "View All Departments") {
                viewAllDepartments();
            }
            if (choice === "View All Roles") {
                viewAllRoles();
            }
            if (choice === "View All Employees") {
                viewAllEmployees();
            }
            if (choice === "Add a Department") {
                addDepartment();
            }
            if (choice === "Add a Role") {
                addRole();
            }
            if (choice === "Add an Employee") {
                addEmployee();
            }
            if (choice === "Update Employee Role") {
                updateEmployeeRole();
            }
            if (choice === "Quit") {
                connection.end();
            }
        })
};


// function to get all employees
viewAllEmployees = () => {
    db.findAllEmployees().then(([employees]) => {
        console.log(chalk.greenBright.bold(`========================================================================================`));
        console.table(employees);
        console.log(chalk.greenBright.bold(`========================================================================================`));
    })
        .then(() => userInput())
};
// function to get all roles
viewAllRoles = () => {
    db.findAllRoles().then(([roles]) => {
        console.log(chalk.greenBright.bold(`========================================================================================`));
        console.table(roles);
        console.log(chalk.greenBright.bold(`========================================================================================`));
    })
        .then(() => userInput())
};

// function to get all departments
viewAllDepartments = () => {
    db.findAllDepartments().then(([departments]) => {
        console.log(chalk.greenBright.bold(`========================================================================================`));
        console.table(departments);
        console.log(chalk.greenBright.bold(`========================================================================================`));
    })
        .then(() => userInput())
};

//function to add department
addDepartment = () => {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: "What's the name of new Department?"
        }
    ]).then((answer) => {
        const params = answer.department
        db.newDept(params)
            .then(() =>
                console.log(chalk.greenBright.bold(`===============` + "New Department has been added!" + `===============`)))
            .then(() => userInput())

    })
};

// function to add a role
const addRole = () => {
    //find department
    db.findAllDepartments().then(([departments]) => {
        const deptChoices = departments.map(({ id, name }) =>
            ({ value: id, name: name }))

        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: " What's the title of your role?"
            },
            {
                name: "salary",
                type: "input",
                message: " What salary for new role?"
            },
            {
                name: "department_id",
                type: "list",
                message: " What department your new role in?",
                choices: deptChoices
            }
        ]).then(role => {
            db.newRole(role)
                .then(() => console.log(chalk.greenBright.bold(`===============` + "New Role has been added!" + `===============`)))
                .then(() => userInput())
        })
    })

};
addEmployee = () => {

    // find role
    db.findAllRoles().then(([roles]) => {
        const roleChoices = roles.map(({ id, title }) =>
            ({ value: id, name: title }))
        // find  employees
       db.findAllEmployees().then(([employees]) => {
            const managerChoices = employees.map(({ id, first_name, last_name }) => ({ value: id, name: first_name + " " + last_name }))
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "What is the employee's first name?"
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "What is the employee's last name?"
                },
                {
                    name: 'role_id',
                    type: 'list',
                    message: "What is the employee's role?",
                    choices: roleChoices
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Who is the employee's manager?",
                    choices: managerChoices
                }
            ]).then(employee => {
                    db.newEmployee(employee)
                        .then(() => console.log(chalk.greenBright.bold(`===============` + "New Employee has been added!" + `===============`)))
                        .then(() => userInput())
                })
        })
    })

}
updateEmployeeRole = () => {

    db.findAllEmployees().then(([employees]) => {
        const employeeChoices = employees.map(({ id, first_name, last_name}) => ({ value: id, name: first_name + " " + last_name}))

        db.findAllRoles().then(([roles]) => {
            const roleChoices = roles.map(({ id, title }) =>
                ({ value: id, name: title }))
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employeeId",
                        message: "Which employee's role do you want to update?",
                        choices: employeeChoices
                    },
                    {
                        type: "list",
                        name: "roleId",
                        message: "Which role do you want to update?",
                        choices: roleChoices
                    },
                ]).then(answer => {
                    const params = (answer.roleId, answer.employeeId)
                    db.setRole(answer.roleId, answer.employeeId)
                     .then(() => 
                     console.log(chalk.greenBright.bold(`=============` + "Employee's Role has been updated!" + `==============`)))
                        .then(() => userInput())
                })
        })
    })
}



