#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import VendingMachine from "./services/VendingMachine";
import CoinAcceptor, { ACCEPTED_COINS } from "./services/CoinAcceptor";
import ArrayCoinRepository from "./repositories/ArrayCoinRepository";
import ProductManager from "./services/ProductManager";
import ArrayProductRepository from "./repositories/ArrayProductRepository";
import columnify from 'columnify';
import { centsToDollar, dollarToCents } from './utils/MoneyParser'

const rlp = require('readline');

const rl = rlp.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(text: string) {
  return new Promise<string>((resolve, reject) => {
    rl.question(text, (input: string) => resolve(input) );
  });
}

console.log(
  chalk.blue(
    figlet.textSync('Vending Machine', { horizontalLayout: 'full' })
  )
);

const listOfProducts = ['coke', 'popcorn', 'chocolate'];

const formattedAcceptedCoins = ACCEPTED_COINS.map((coin) => centsToDollar( coin.toString() )).join('|');

const helpText = columnify({
[listOfProducts.join('|')]: 'choose product',
change: 'get your change back',
[formattedAcceptedCoins]: 'insert coin',
exit: 'exit program'
}, {showHeaders: false});

(async () => {
  const vendingMachine = new VendingMachine(
    new CoinAcceptor(new ArrayCoinRepository()),
    new ProductManager(new ArrayProductRepository()),
    true
  );

  
  const interativeArgs = async () => {
    const answer = await ask('> ');

    if (listOfProducts.includes(answer)) {
      console.log(await vendingMachine.chooseProduct(answer));
      return true;
    }
    else if (/^\d/.test(answer)) {
      const isCoinAccepted = ACCEPTED_COINS.includes(parseInt(dollarToCents(answer)));
      if (/^\d+\.\d{2}$/.test(answer) && isCoinAccepted) {
        const valueAsCents = parseInt(dollarToCents(answer));
        console.log(await vendingMachine.insertCoin(valueAsCents));
        return true;
      }
      else {
        console.log(chalk.red(`Your coin is fake (we only accept the following coins ${formattedAcceptedCoins}).`));
        return true;
      }
    }
    else if (answer === 'change') {
      console.log(await vendingMachine.refund());
      return true;
    }
    else if (answer === 'exit') {
      return false;
    }
    else {
      console.log(`Usage:\n${helpText}`);
      return true;
    }
  }

  while(await interativeArgs()) {}

  rl.close();
})()