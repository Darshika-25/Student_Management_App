#! /usr/bin/env node
// shebang for npm execution

import inquirer from "inquirer";
import chalk from "chalk";

// a five digit random student id
let studentid: number = Math.floor(10000 + Math.random() * 90000);

// a variable for balance for each student
let balance: number = 20000;

// fulfilling the app requirements
let query = await inquirer.prompt([
  {
    name: "studentName",
    type: "input",
    message: "Enter student name: ",
  },
  {
    name: "courses",
    type: "list",
    message: "Select the course to enroll: ",
    choices: ["HTML", "CSS", "TYPESCRIPT", "PYTHON", "JAVASCRIPT","BOOTSTRAP"],
  },
]);
console.log(chalk.bold.ansi256(194)(`Your Student ID is ${studentid}`));

const courseFees: { [key: string]: number } = {
  HTML: 3000,
  CSS: 4000,
  TYPESCRIPT: 5500,
  PYTHON: 6500,
	JAVASCRIPT: 9000,
	BOOTSTRAP: 6000,
};
console.log(
  chalk.bold.magentaBright.underline(` TUITION FEES: ${
    courseFees[query.courses]
  }`
));
console.log(chalk.bold.magentaBright.underline(`balance : ${balance}`));

let payAmount = await inquirer.prompt([
  {
    name: "payment",
    type: "input",
    message: "Enter amount:",
  },
]);

// creating tuitionfees and payment amount variable to check strict equality
const tuitionFee = courseFees[query.courses];
const paymentAmount = parseFloat(payAmount.payment);

//checking condition using if_else statement
if (tuitionFee === paymentAmount) {
  console.log(
    chalk.greenBright
      .underline(`\n CONGRATULATIONS! you have successfully enrolled in ${query.courses} \n:`
	));

  let options = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: "what would you like to do next? ",
      choices: ["view status", "exit"],
    },
  ]);

  if (options.select === "view status") {
    console.log(
      chalk.bold.blueBright.underline("\n Student Information \n")
    );
		console.log(
      chalk.bold.whiteBright(`\t\n"Student Name" :${query.studentName}\n\t`
    ));
    console.log(
      chalk.bold.whiteBright(`\t\n"Student ID" : ${studentid}\n\t`
		));
    console.log(
      chalk.bold.whiteBright(`\t\n"Course Enrolled" : ${query.courses}\n\t`
		));
    console.log(
      chalk.bold.whiteBright(`\t\n"Tuition Fees paid" : ${payAmount.payment}\n\t`
		));
    console.log(
      chalk.bold.whiteBright(`\t\n"Balance" : ${(balance -= payAmount.payment)}\n\t`
		));
  } else {
    ("Exit student management system");
  }
} else {
  console.log(chalk.redBright("Invalid Amount, Please TRY AGAIN"));
};

