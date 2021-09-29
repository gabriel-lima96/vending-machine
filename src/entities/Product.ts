import { ProductType } from "./ProductType";

export default class Product {
    private type: ProductType;

    constructor(type: ProductType) {
        this.type = type;
    }
}