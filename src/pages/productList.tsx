import { useEffect, useState } from "react";
import type { ProductData } from "../types/types";
import { CometCard } from "../components/ui/comet-card";
import { Link } from "@tanstack/react-router";
import { productRoute } from "../router";
import { useApi } from "../components/hooks/api/useApi";

export default function ProductList() {
  const [products, setProducts] = useState<Array<ProductData>>([]);
  const { get } = useApi();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await get();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ul className="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((p: ProductData) => (
          <li key={p.id}>
            <Link to={productRoute.id} params={{ productId: p.id.toString() }}>
              <CometCard>
                <div className="p-4 md:p-8 text-white bg-[#1F2121] rounded-xl">
                  <div className="bg-gray-800 rounded-xl h-[15rem] flex items-center justify-center shadow-lg">
                    <span className="text-gray-500">[Product Image]</span>
                  </div>
                  <h3 className="text-lg md:text-2xl text-center my-4 font-semibold">
                    {p.name}
                  </h3>

                  <p className="text-sm font-bold text-gray-300 mb-4 mt-2">
                    {p.description}
                  </p>
                  <p className="mt-2 text-sm">💰 {p.price} SEK</p>
                  <p className="text-sm">📦 Stock: {p.stockQuantity}</p>
                  <p className="text-sm">🏷️ Category ID: {p.category.name}</p>
                </div>
              </CometCard>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
