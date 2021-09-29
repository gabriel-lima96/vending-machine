import ProductManager from '../services/ProductManager';
import ProductRepository from '../repositories/ProductRepository';
import ArrayProductRepository from '../repositories/ArrayProductRepository';
import { ProductType } from '../entities/ProductType';


describe('Product Manager', () => {
    let productManager: ProductManager;
    let productRepository: ProductRepository;

    beforeEach(() => {
        productRepository = new ArrayProductRepository();
        productManager = new ProductManager(productRepository);
    });

    it('should return true when the product is in inventory', async () => {
        const product = ProductType.Chocolate;

        const isInInventory = await productManager.isTheProductInInventory(product);

        expect(isInInventory).toBe(true);
    });

    it('should return false when the product is not in inventory', async () => {
        const product = ProductType.Popcorn;

        // By default ArrayProductRepository have 5 of each product in inventory;
        productRepository.getAndRemoveFromInventory(product);
        productRepository.getAndRemoveFromInventory(product);
        productRepository.getAndRemoveFromInventory(product);
        productRepository.getAndRemoveFromInventory(product);
        productRepository.getAndRemoveFromInventory(product);

        const isInInventory = await productManager.isTheProductInInventory(product);
        expect(isInInventory).toBe(false);
    });

    it('should remove from the inventory when a product is chosen', async () => {
        const product = ProductType.Coke;
        const initialInventory = await productRepository.getProductInventoryByType(product);

        productRepository.getAndRemoveFromInventory(product);

        const finalInventory = await productRepository.getProductInventoryByType(product);
        expect(finalInventory.getQuantity()).toBe(initialInventory.getQuantity() - 1);
    })
});