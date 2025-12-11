export type ProductType = {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: number;
    categoryName?: string;
    categoryDescription?: string;
}

export type Product = {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: number;
}
