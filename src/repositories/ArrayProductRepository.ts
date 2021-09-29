import Product from "../entities/Product";
import ProductInventory from "../entities/ProductInventory";
import ProductRepository from "./ProductRepository";
import { ProductType } from "../entities/ProductType";

export default class ArrayProductRepository implements ProductRepository {
    private products = {
        'coke': { price: 200, quantity: 5 },
        'chocolate': { price: 150, quantity: 5 },
        'popcorn': { price: 500, quantity: 5 },
    };

    getProductInventoryByType(type: ProductType): Promise<ProductInventory> {
        const productData = this.products[type];
        const inventory = new ProductInventory(productData.price, type, productData.quantity);
        return Promise.resolve(inventory);
    }

    getAndRemoveFromInventory(type: ProductType): Promise<Product|null> {
        if (this.products[type].quantity <= 0)
            return Promise.resolve(null);

        const product = new Product(type);

        this.products[type].quantity -= 1;

        return Promise.resolve(product);
    }

    addToInventory(type: ProductType, howMany:number = 1): void {
        this.products[type].quantity += howMany;
    }

}