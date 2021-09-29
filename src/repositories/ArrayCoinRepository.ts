import Coin from "../entities/Coin";
import CoinRepository from "./CoinRepository";

type CoinStack = {
    [key: string]: Coin[]
}

/**
 * Made this class using stacks just because this is the way actual vending machines work
 */
export default class ArrayCoinRepository implements CoinRepository {
    private storedCoins: CoinStack = {
        '1': this.coinGenerator(1, 3),
        '5': this.coinGenerator(5, 3),
        '10': this.coinGenerator(10, 3),
        '25': this.coinGenerator(25, 3),
        '50': this.coinGenerator(50, 3),
        '100': this.coinGenerator(100, 3),
    };

    private transactionValue: number = 0;

    private coinGenerator(value: number, howMany: number): Coin[] {
        const arr = [];
        for(let i = 0; i < howMany; i++) {
            arr.push(new Coin(value));
        }
        return arr;
    }

    async decreaseFromTransaction(value: number): Promise<boolean> {
        if (this.transactionValue <= 0)
            return false;
        
        this.transactionValue -= value;
        return true;
    }

    async insertCoin(coin: Coin) {
        const value = coin.getValue();

        if (this.storedCoins[value] === undefined)
            this.storedCoins[value] = [];
        this.storedCoins[value].push(coin);

        this.transactionValue += value;
        return coin;
    }

    async removeCoin(coin: Coin): Promise<Coin|undefined> {
        const value = coin.getValue();
        
        const poppedCoin = this.storedCoins[value]?.pop();
        if (poppedCoin !== undefined) {
            if (!await this.decreaseFromTransaction(value)) {
                this.storedCoins[value].push(coin);
                return undefined;
            }
        }

        return poppedCoin;
    }

    async getTransactionValue(): Promise<number> {
        return this.transactionValue;
    }

    async getCoins(): Promise<Coin[]> {
        const coins = Object.values(this.storedCoins).flat()
        return coins;
    }

    async getCoinStackQuantity(coin: Coin): Promise<number> {
        const quantity = this.storedCoins[coin.getValue()]?.length ?? 0;
        return quantity;
    }
}