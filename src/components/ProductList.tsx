import { useEffect, useState } from "react";
import { getProducts } from "../api/api";
import type { ProductType } from "../types/types";
import Product from "./Product";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((p: ProductType) => (
          <Product key={p.id} product={p} />
        ))}
      </ul>
    </div>
  );
}
