import { useParams } from "@tanstack/react-router";
import { productRoute } from "../router";
import { useQueryClient } from "@tanstack/react-query";
import type { ProductData } from "../types/types";

export default function Product() {
  const queryClient = useQueryClient();
  const { productId } = useParams({ from: productRoute.id });

  const allPages = queryClient.getQueriesData<{ items: ProductData[] }>({
    queryKey: ["products"],
  });
  const allItems = allPages.flatMap(([, data]) => data?.items ?? []);
  const product = allItems.find((p) => p.id === Number(productId));

  if (!product) {
    return (
      <div className="p-12 text-center text-gray-400">Loading product...</div>
    );
  }

  return (
    <>
      <div className="px-8 mx-auto px-8 py-16 grid gap-24">
        <section className="text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {product.name}
          </h1>
          <p className="text-lg text-black dark:text-gray-400">
            {product.description}
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="bg-gray-800 rounded-xl h-[28rem] flex items-center justify-center shadow-lg">
            <span className="text-gray-500">[Product Image]</span>
          </div>

          <div className="flex flex-col justify-between h-[28rem] rounded-xl p-8 shadow-lg">
            <div className="space-y-6">
              <div className="text-3xl font-semibold text-green-400">
                💰 {product.price} SEK
              </div>

              <div className="text-xl text-black dark:text-gray-400">
                📦 Stock:{" "}
                <span className="font-medium text-white">
                  {product.stockQuantity}
                </span>
              </div>

              <div className="text-xl text-black dark:text-gray-400">
                🏷️ Category:{" "}
                <span className="font-medium text-white">
                  {product.category.name}
                </span>
              </div>
            </div>
            <p className="text-sm text-black dark:text-gray-400 mb-4 mt-2">
              {product.description}
            </p>

            <button className="w-full md:w-auto cursor-pointer px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg">
              Edit ✏️
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-[#1F2121] rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-300">
              Product Details
            </h2>
            <p className="text-gray-300">
              Här kan du lägga till mer detaljerad information om produkten,
              material, specifikationer eller användningsområden.
            </p>
          </div>

          <div className="bg-[#1F2121] rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-300">
              Customer Reviews
            </h2>
            <p className="text-gray-300">
              Sektion för kundrecensioner eller betyg. Detta fyller ut sidan och
              ger mer luft.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
