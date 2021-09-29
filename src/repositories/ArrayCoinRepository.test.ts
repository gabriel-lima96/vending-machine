import Coin from "../entities/Coin";
import ArrayCoinRepository from "./ArrayCoinRepository";
import CoinRepository from "./CoinRepository";

describe('Array Coin Repository', () => {
    let coinRepository: CoinRepository;

    beforeEach(() => {
        coinRepository = new ArrayCoinRepository;
    });

    it(`should be able to store coins`, async () => {
        const coin = new Coin(50);
        const initialQuantity = await coinRepository.getCoinStackQuantity(coin);
        const initialTransactionValue = await (await coinRepository.getCoins()).reduce((curr, next) => curr + next.getValue(), 0);

        await coinRepository.insertCoin(coin);
        
        const finalQuantity = await coinRepository.getCoinStackQuantity(coin);
        const finalTransactionValue = await (await coinRepository.getCoins()).reduce((curr, next) => curr + next.getValue(), 0);

        expect(finalQuantity).toBe(initialQuantity + 1);
        expect(finalTransactionValue).toBe(initialTransactionValue + coin.getValue());
    });

    it(`should be able to remove coins`, async () => {
        const coin = new Coin(50);
        await coinRepository.insertCoin(coin);
        const initialQuantity = await coinRepository.getCoinStackQuantity(coin);
        const initialTransactionValue = await (await coinRepository.getCoins()).reduce((curr, next) => curr + next.getValue(), 0);

        await coinRepository.removeCoin(coin);
        
        const finalQuantity = await coinRepository.getCoinStackQuantity(coin);
        const finalTransactionValue = await (await coinRepository.getCoins()).reduce((curr, next) => curr + next.getValue(), 0);

        expect(finalQuantity).toBe(initialQuantity - 1);
        expect(finalTransactionValue).toBe(initialTransactionValue - coin.getValue());
    });

    it(`shouldn't let remove coins if transaction value is 0`, async () => {
        const coin = new Coin(50);
        const initialQuantity = await coinRepository.getCoinStackQuantity(coin);
        const initialTransactionValue = await (await coinRepository.getCoins()).reduce((curr, next) => curr + next.getValue(), 0);

        const removedCoin = await coinRepository.removeCoin(coin);
        
        const finalQuantity = await coinRepository.getCoinStackQuantity(coin);
        const finalTransactionValue = await (await coinRepository.getCoins()).reduce((curr, next) => curr + next.getValue(), 0);

        expect(finalQuantity).toBe(initialQuantity);
        expect(finalTransactionValue).toBe(initialTransactionValue);
        expect(removedCoin).toBeUndefined();
    })
})