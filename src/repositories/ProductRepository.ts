import Product from "../entities/Product";
import ProductInventory from "../entities/ProductInventory";
import { ProductType } from "../entities/ProductType";

export default interface ProductRepository {
    getProductInventoryByType(type: ProductType): Promise<ProductInventory>;
    getAndRemoveFromInventory(type: ProductType): Promise<Product|null>;
    addToInventory(type: ProductType, howMany?: number): void;
}