import ArrayProductRepository from "./ArrayProductRepository";
import ProductInventory from "../entities/ProductInventory";
import { ProductType } from "../entities/ProductType";
import Product from "../entities/Product";
import ProductRepository from "./ProductRepository";

describe('Array Product Repository', () => {
    let productRepository: ProductRepository;

    beforeEach(() => {
        productRepository = new ArrayProductRepository;
    })

    it('should be able to get a product inventory by type', async () => {
        const productType = ProductType.Chocolate;
        const expected = new ProductInventory(150, productType, 5);
        
        const current = await productRepository.getProductInventoryByType(productType)

        expect(current).toEqual(expected);
    });

    it('should be able to get and remove 1 from inventory (and always 1)', async () => {
        const productType = ProductType.Popcorn;
        const expected = new Product(productType);
        const initialInventoryQuantity = (await productRepository.getProductInventoryByType(productType)).getQuantity();

        const current = await productRepository.getAndRemoveFromInventory(productType);
        const finalInventoryQuantity = (await productRepository.getProductInventoryByType(productType)).getQuantity();

        expect(current).toEqual(expected);
        expect(finalInventoryQuantity).toBe(initialInventoryQuantity - 1);
    });

    it("shouldn't be able to remove below zero from inventory", async () => {
        const productType = ProductType.Popcorn;
        const initialInventoryQuantity = (await productRepository.getProductInventoryByType(productType)).getQuantity();

        // Clear inventory and let only 1 item
        for (let i = 0; i < initialInventoryQuantity; i++) {
            const product = await productRepository.getAndRemoveFromInventory(productType);
            if (product === null)
                throw new Error('This for loop might be wrong or it is removing more than one item at a time');
        }
        
        const product = await productRepository.getAndRemoveFromInventory(productType);
        const finalInventoryQuantity = (await productRepository.getProductInventoryByType(productType)).getQuantity();

        expect(product).toBeNull();
        expect(finalInventoryQuantity).toBe(0);
    });

    it('should be able to add N item on inventory', async () => {
        const productType = ProductType.Coke;
        const randNumber = Math.floor(Math.random() * 100) + 1
        const initialInventoryQuantity = (await productRepository.getProductInventoryByType(productType)).getQuantity();

        await productRepository.addToInventory(productType, randNumber);

        const finalInventoryQuantity = (await productRepository.getProductInventoryByType(productType)).getQuantity();
        expect(finalInventoryQuantity).toBe(initialInventoryQuantity + randNumber);
    });
});