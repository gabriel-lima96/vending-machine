#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";
import figlet from "figlet";
import path from "path";


console.log(
  chalk.blue(
    figlet.textSync('Vending Machine', { horizontalLayout: 'full' })
  )
);

program
.version('0.1')
.description('A machine vending program')
.option('-i, --insert-coin <value> [<value>...]', 'Insert coins [0.01, 0.05, 0.10, 0.25, 0.50, 1.00]')
.option('-b, --buy <type>', 'Buy a product [COKE, CHOCOLATE, POPCORN]')
.parse(process.argv);