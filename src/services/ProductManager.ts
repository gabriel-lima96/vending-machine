import Product from "../entities/Product";
import { ProductType } from "../entities/ProductType";
import ProductDoesNotExist from "../exceptions/ProductDoesNotExist";
import ProductRepository from "../repositories/ProductRepository";



export default class ProductManager {
    private repository: ProductRepository

    constructor(repository: ProductRepository) {
        this.repository = repository;
    }

    private static containsOnProductTypeEnum(product: string): boolean {
        return Object.values<string>(ProductType).indexOf(product) !== -1
    }

    async isTheProductInInventory(product: string): Promise<boolean> {
        if (!ProductManager.containsOnProductTypeEnum(product))
            throw ProductDoesNotExist;

        const inventory = await this.repository.getProductInventoryByType(product as ProductType);
        return inventory.getQuantity() > 0;
    }

    async chooseProduct(product: string): Promise<Product|null> {
        if (!ProductManager.containsOnProductTypeEnum(product))
            throw ProductDoesNotExist;

        return await this.repository.getAndRemoveFromInventory(product as ProductType) as Product
    }

    async getProductPrice(product: string): Promise<number> {
        if (!ProductManager.containsOnProductTypeEnum(product))
            throw ProductDoesNotExist;

        const inventory = await this.repository.getProductInventoryByType(product as ProductType);
        return inventory.getPrice();
    }
}