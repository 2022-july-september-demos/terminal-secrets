#!/usr/bin/env node

const chalk = require("chalk");
const prompt = require("prompt-sync")();
const fetch = require("cross-fetch");
const cookie = require("cookie");

require("dotenv").config();

const { signInUser } = require("../auth-utils");
const { fetchSecrets } = require("../fetch-utils");

async function loadPrompts() {
  console.log(chalk.bold.underline.bgWhite.cyan("Welcome to Top Secrets!"));

  let validUser = false;
  let cookieInfo;
  while (!validUser) {
    const email = prompt(chalk.blue("Hello - what is your email? "));
    console.log(chalk.bold.red(`Hello ${email}`));
    const password = prompt.hide("what is your password? ");
    try {
      cookieInfo = await signInUser(email, password);
      validUser = true;
    } catch (e) {
      console.log(chalk.bold.red(e.message));
      console.log(chalk.bold.red("Please try again!"));
    }
  }
  const secrets = await fetchSecrets(cookieInfo);
  console.log(secrets);
}
loadPrompts();
