import Coin from "../entities/Coin";

export default interface CoinRepository {
    insertCoin(coin: Coin): Promise<Coin>;
    removeCoin(coin: Coin): Promise<Coin|undefined>;
    getTransactionValue(): Promise<number>;
    decreaseFromTransaction(value: number): Promise<boolean>;
    getCoins(): Promise<Coin[]>;
    getCoinStackQuantity(coin: Coin): Promise<number>;
}