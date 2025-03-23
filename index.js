#!/usr/bin/env node

import inquirer from "inquirer";
import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import chalk from "chalk";
import createDirectoryContents from "./createDirectoryContents.js";
const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));

const REQUIRED_NODE_VERSION = "22.14.0";
const REQUIRED_NPM_VERSION = "11.1.0";

const compareVersions = (v1, v2) => {
  const v1Parts = v1.split(".").map(Number);
  const v2Parts = v2.split(".").map(Number);

  for (let i = 0; i < v1Parts.length; i++) {
    if (v1Parts[i] > v2Parts[i]) return 1;
    if (v1Parts[i] < v2Parts[i]) return -1;
  }
  return 0;
};

const checkRequirements = () => {
  try {
    if (!process.version) {
      console.error(
        chalk.red(
          "❌ Node.js is not installed. Please install it from https://nodejs.org/."
        )
      );
      process.exit(1);
    }
    console.log(chalk.green(`✅ Node.js is installed: ${process.version}`));
    const npmVersion = execSync("npm -v").toString().trim();
    console.log(chalk.green(`✅ npm is installed: ${npmVersion}`));
  } catch (error) {
    console.error(
      chalk.red(
        "❌ npm is not installed. Please install it with Node.js from https://nodejs.org/."
      )
    );
    process.exit(1);
  }
};

const checkVersionSpecificRequirements = () => {
  try {
    // Check Node.js version
    const nodeVersion = process.version.replace("v", ""); // Remove "v" from version string
    if (compareVersions(nodeVersion, REQUIRED_NODE_VERSION) < 0) {
      console.error(
        chalk.red(
          `❌ Node.js version ${nodeVersion} is too old. Please upgrade to ${REQUIRED_NODE_VERSION} or later.`
        )
      );
      process.exit(1);
    }

    // Check npm version
    const npmVersion = execSync("npm -v").toString().trim();
    if (compareVersions(npmVersion, REQUIRED_NPM_VERSION) < 0) {
      console.error(
        chalk.red(
          `❌ npm version ${npmVersion} is too old. Please upgrade to ${REQUIRED_NPM_VERSION} or later.`
        )
      );
      process.exit(1);
    }
  } catch (error) {
    console.error(
      chalk.red(
        "❌ Error checking Node.js or npm. Make sure they are installed."
      )
    );
    process.exit(1);
  }
};

checkRequirements();
checkVersionSpecificRequirements();

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: "project-choice",
    type: "list",
    message: chalk.blue("What project template would you like to generate?"),
    choices: CHOICES,
  },
  {
    name: "project-name",
    type: "input",
    message: chalk.blue("Project name:"),
    validate: function (input) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else
        return chalk.red(
          "Project name may only include letters, numbers, underscores and hashes."
        );
    },
  },
];

inquirer
  .prompt([
    {
      name: "project-choice",
      type: "list",
      message: chalk.blue("What project template would you like to generate?"),
      choices: CHOICES,
    },
  ])
  .then(({ "project-choice": projectChoice }) => {
    return inquirer
      .prompt([
        {
          name: "project-name",
          type: "input",
          message: chalk.blue("Project name:"),
          default: projectChoice, // <-- Default project name = template name
          validate: function (input) {
            if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
            else
              return chalk.red(
                "❌ Project name may only include letters, numbers, underscores, and dashes."
              );
          },
        },
      ])
      .then(({ "project-name": projectName }) => ({
        projectChoice,
        projectName,
      }));
  })
  .then(({ projectChoice, projectName }) => {
    const templatePath = `${__dirname}/templates/${projectChoice}`;
    const projectPath = `${CURR_DIR}/${projectName}`;

    fs.mkdirSync(projectPath);
    createDirectoryContents(templatePath, projectName);

    console.log(
      chalk.green(`\n✅ Project '${projectName}' created successfully!`)
    );
    console.log(chalk.yellow(`\n📦 Installing dependencies...\n`));

    try {
      execSync("npm install", { cwd: projectPath, stdio: "inherit" });
      console.log(chalk.green("\n✅ Dependencies installed successfully.\n"));
    } catch (error) {
      console.error(
        chalk.red("\n❌ Error installing dependencies:", error.message)
      );
    }

    const instructionsPath = `${templatePath}/instructions.txt`;
    if (fs.existsSync(instructionsPath)) {
      const instructions = fs.readFileSync(instructionsPath, "utf8");
      console.log(chalk.blue("\n📌 Next steps:\n"));
      console.log(chalk.white(instructions));
    } else {
      console.log(chalk.blue(`\n🎉 Your project is ready! Next steps:`));
      console.log(chalk.cyan(`  cd ${projectName}`));
      console.log(chalk.cyan(`  npm start`));
    }
  });
