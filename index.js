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
            name: 'newDepartment',
            type: 'input',
            message: "What's the name of new Department?"
        }
    ])
    .then ((answer) => {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        const params = answer.newDepartment;
        connection.query(sql, params, (error, response) => {
            if (error) throw error;
            console.log(chalk.greenBright.bold(`========================================================================================`));
            console.log(chalk.blueBright(params + `Department created!`));
            console.log(chalk.greenBright.bold(`========================================================================================`));
            viewAllDepartments();
        })
    })
};

// function to add a role
const addRole = () => {
    //find department
    db.findAllDepartments().then(([departments]) => {
        const deptChoices = departments.map(({id, name}) =>
         ({ value:id, name: name}))

    inquirer.prompt ([
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
        .then(() => console.log("role added"))
        .then(() => userInput())
    })
})
   
};
addEmployee = () => {
    
}


