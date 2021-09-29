import chalk from "chalk";
import NotEnoughChangeError from "../exceptions/NotEnoughChangeError";
import { centsToDollar } from "../utils/MoneyParser";
import CoinAcceptor from "./CoinAcceptor";
import ProductManager from "./ProductManager";

export default class VendingMachine {
    private coinAcceptor: CoinAcceptor;
    private productManager: ProductManager;
    private isInteractive: boolean;

    constructor(coinAcceptor: CoinAcceptor, productManager: ProductManager, isInteractive: boolean) {
        this.coinAcceptor = coinAcceptor;
        this.productManager = productManager;
        this.isInteractive = isInteractive;
    }

    async insertCoin(value: number): Promise<string> {
        const success = await this.coinAcceptor.insertCoin(value);
        const total = await this.coinAcceptor.getTotalValueUnderTransaction();
        const totalAsDollar = '$' + centsToDollar(total.toString());
        if (success)
            return `*cltkty*\nTotal inserted money is ` + chalk.green(`${totalAsDollar}`);
        return chalk.red(`Something happened. The machine gave your money back.`);
    }

    private async checkIfHaveEnoughMoney(product: string): Promise<number> {
        const productPrice = await this.productManager.getProductPrice(product);
        const coinsUnderTransaction = await this.coinAcceptor.getTotalValueUnderTransaction();
        return coinsUnderTransaction - productPrice;
    }

    private moneyBackMessage(capitalize: boolean = true): string {
        const changeMessageFragment: string = chalk.underline("change");
        const commandMessageFragment = this.isInteractive ? `use the command ${changeMessageFragment}` : `run again with --${changeMessageFragment}`;
        const message = `choose another product or ${commandMessageFragment} to get your money back.`;
        if (capitalize)
            return message.charAt(0).toUpperCase() + message.slice(1);
        return message;
    }

    async chooseProduct(productType: string): Promise<string> {
        if (!await this.productManager.isTheProductInInventory(productType)) {
            return chalk.yellow(`The product is out of stock. ${this.moneyBackMessage()}`);
        }

        const moneyDifference = await this.checkIfHaveEnoughMoney(productType);
        if (moneyDifference < 0) {
            const moneyDifferenceModulus = moneyDifference * -1;
            const missingMoney: string = centsToDollar(moneyDifferenceModulus.toString());
            return chalk.yellow(`There is not enough money. Please insert ${missingMoney}, ${this.moneyBackMessage(false)}`);
        }

        try {
            const message = await this.getChange(moneyDifference);
            await this.productManager.chooseProduct(productType);
            return chalk.green(`*clunk*\n${message}`);
        }
        catch (e) {
            if (e instanceof NotEnoughChangeError)
                return `There is not enough change. Please fill with exact change, ${this.moneyBackMessage(false)}`;
            return chalk.red(`Something happened. The machine gave your money back.`);
        }
    }

    private async getChange(value: number): Promise<string> {
        const change = await this.coinAcceptor.getChange(value);
        if (change.length === 0)
            return chalk.green('There is no change to get back.');
        change.sort((a, b) => a.getValue() - b.getValue());
        let coinsMessageFragment;
        if(change.length > 0) {
            const sum = change.reduce((prev, curr) => prev + curr.getValue(), 0).toString();
            const detachedCoinsMessage = change.map((value) => `$${centsToDollar(value.getValue().toPrecision())}`).join(', ');
            coinsMessageFragment = `\nYour change is $${centsToDollar(sum)} [${detachedCoinsMessage}]`;
        }
        const message = coinsMessageFragment ?? '';
        return chalk.green(`${message}`);
    }

    async refund(): Promise<string> {
        return this.getChange(await this.coinAcceptor.getTotalValueUnderTransaction());
    }
}