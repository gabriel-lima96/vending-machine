import Coin from "../entities/Coin";
import NotEnoughChangeError from "../exceptions/NotEnoughChangeError";
import CoinRepository from "../repositories/CoinRepository";

export const ACCEPTED_COINS = [
    5,
    10,
    25,
    50,
    100
];

export type CoinAcceptorResponse = {
    message: string;
    success: boolean;
}

// Coin Acceptor is the actual name of the mechanism where the coins are added.
export default class CoinAcceptor {
    private repository: CoinRepository;

    constructor(repository: CoinRepository) {
        this.repository = repository;
    }

    async insertCoin(value: number): Promise<boolean> {
        if (!ACCEPTED_COINS.includes(value))
            return false;

        await this.repository.insertCoin(new Coin(value));

        return true;
    }

    async getTotalValueUnderTransaction(): Promise<number> {
        return await this.repository.getTransactionValue();
    }

    async calculateChange(value: number): Promise<Coin[]> {
        const orderedCoins = [...ACCEPTED_COINS];
        orderedCoins.sort((a, b) => b - a);
        const change: Coin[] = [];
        let totalValue = value;

        const startingIndex = CoinAcceptor.getStartingIndexForCoinSearch(value, orderedCoins);

        for (let i = startingIndex; totalValue > 0 && i < orderedCoins.length; i++) {
            const coinValue = orderedCoins[i];
            let coinStackQuantity = await this.repository.getCoinStackQuantity(new Coin(coinValue));
            while(coinStackQuantity > 0 && totalValue >= coinValue) {
                change.push(new Coin(coinValue));
                totalValue -= coinValue;
                coinStackQuantity -= 1;
            }
        }

        if (totalValue !== 0)
            throw new NotEnoughChangeError;

        return change;
    }

    private static getStartingIndexForCoinSearch(value: number, orderedCoins: number[]): number {
        for (let i = 0; i < orderedCoins.length; i++) {
            if (value >= orderedCoins[i])
                return i;
        }
        return orderedCoins.length - 1;
    }

    async getChange(change: number): Promise<Coin[]> {
        const productPrice = await this.getTotalValueUnderTransaction() - change;
        await this.repository.decreaseFromTransaction(productPrice);
        const coins = await this.calculateChange(change)
        for (let coin of coins) {
            await this.repository.removeCoin(coin)
        }

        return coins;
    }
}