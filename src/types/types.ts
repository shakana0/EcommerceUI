export type Product = {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: number;
}

export type ProductData = {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: Category;
}

type Category = {
    id: number,
    name: string,
    description: string
}

export type PagedResult<T> = {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
};