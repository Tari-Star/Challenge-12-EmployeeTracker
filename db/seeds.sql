INSERT INTO departments (name)
VALUES
("Engineering"),
("Sales"),
("Finance"), 
("Legal"),
("Marketing");

INSERT INTO roles (title, salary, department_id)
VALUES
("Software Engineer", 120000, 1),
("Lead Engineer", 150000, 1),
("Salesperson", 80000, 2),
("Sales Lead", 100000, 2),
("Accountant", 125000, 3), 
("Lawyer", 190000, 4),
("Legal Team Lead", 250000, 4),
("Marketing Analyst" , 60000, 5),
("Marketing lead", 95000, 5);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
("Patrick", "Summer", 1, 2),
("John", "Snow", 2, null),
("Gary", "Winter", 3, 4 ),
("Lisa", "Flower", 4, null),
("Dan", "Cold", 5, null),
("Sara", "Fall", 6, 7),
("Mike", "Smith", 7, null),
("Lucy", "Spring", 8, 9),
("Andrew", "Lee", 9, null);