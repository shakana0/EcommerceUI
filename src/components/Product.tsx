import type { ProductType } from "../types/types";

type ProductProps = {
  product: ProductType;
};

export default function Product({ product }: ProductProps) {
  return (
    <li className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: {product.price} SEK</p>
      <p>Stock: {product.stockQuantity}</p>
      <p>Category ID: {product.categoryId}</p>
    </li>
  );
}
