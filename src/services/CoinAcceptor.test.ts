import CoinAcceptor from '../services/CoinAcceptor';
import ArrayCoinRepository from '../repositories/ArrayCoinRepository';
import CoinRepository from '../repositories/CoinRepository';
import Coin from '../entities/Coin';
import NotEnoughChangeError from '../exceptions/NotEnoughChangeError';


describe('Coin Acceptor', () => {
    let coinAcceptor: CoinAcceptor;
    let coinRepository: CoinRepository;

    beforeEach(() => {
        coinRepository = new ArrayCoinRepository();
        coinAcceptor = new CoinAcceptor(coinRepository);
    })

    it('should be able to insert valid coin', async () => {
        const validValue = 50;
        const initialStackLength = await coinRepository.getCoinStackQuantity(new Coin(validValue));
        
        const result = await coinAcceptor.insertCoin(validValue);
        
        const finalStackLength = await coinRepository.getCoinStackQuantity(new Coin(validValue));

        expect(result).toBe(true);
        expect(finalStackLength).toBe(initialStackLength + 1);
    });

    it("shouldn't be able to insert invalid coin", async () => {
        const invalidValue = 21;
        const initialStackLength = await coinRepository.getCoinStackQuantity(new Coin(invalidValue));
        
        const result = await coinAcceptor.insertCoin(invalidValue);
        
        const finalStackLength = await coinRepository.getCoinStackQuantity(new Coin(invalidValue));

        expect(result).toBe(false);
        expect(finalStackLength).toBe(initialStackLength);
    });

    it('should be able to get total value of the transaction', async () => {
        const values = [50, 25, 99]; // 99 shouldn't be added
        const expected = 50 + 25;
        for(let value of values) {
            await coinAcceptor.insertCoin(value);
        }

        const transactionValue = await coinAcceptor.getTotalValueUnderTransaction();

        expect(transactionValue).toBe(expected);
    });

    it('should be able to calculate the change', async () => {
        // 99 shouldn't be added; we should get 5 cents from internal storage
        const values = [100, 25, 99]
        const value = 100 + 25 + 5;
        const expected = [new Coin(100), new Coin(25), new Coin(5)]
        for(let value of values) {
            await coinAcceptor.insertCoin(value);
        }

        const change = await coinAcceptor.calculateChange(value);

        expect(change).toEqual(expected)
    }, 200);

    it('should throw an error when there is not enough coins to use as change', async () => {
        const value = 100*3 + 50*3 + 25*3 + 10*3 + 5*3 + 5; // the + 5 will make it throw the error

        await expect(coinAcceptor.calculateChange(value)).rejects.toThrow(NotEnoughChangeError);
    });
})