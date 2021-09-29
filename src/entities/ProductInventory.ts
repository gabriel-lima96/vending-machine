import { ProductType } from "./ProductType";

export default class ProductInventory {
    private price: number;
    private type: ProductType;
    private quantity: number;

    constructor(price: number, type: ProductType, quantity: number) {
        this.price = price;
        this.type = type;
        this.quantity = quantity;
    }

    getPrice(): number {
        return this.price;
    }

    getType(): ProductType {
        return this.type;
    }

    getQuantity(): number {
        return this.quantity;
    }
}