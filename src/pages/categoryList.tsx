import { Link, useParams } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ScrollToTopButton from "../components/ui/scrollToTopButton";
import { CometCard } from "../components/ui/comet-card";
import type { PagedResult, ProductData } from "../types/types";
import { useApi } from "../components/hooks/api/useApi";

export default function CategoryList() {
  const queryClient = useQueryClient();
  const { categoryName } = useParams({ from: "/categories/$categoryName" });
  const { getProducts } = useApi();

  useQuery({
    queryKey: ["products", 1, 20],
    queryFn: () => getProducts(1, 20),
  });

  const products = queryClient.getQueryData<PagedResult<ProductData>>([
    "products",
    1,
    20,
  ]);

  const words = categoryName?.toLowerCase().split("-") ?? [];

  const formattedCategory = words
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const filtered = categoryName
    ? products?.items.filter((p) => {
        const cat = p.category.name.toLowerCase();
        return words.every((w: string) => cat.includes(w));
      })
    : products?.items;

  console.log(filtered);

  return (
    <div className="min-h-screen pt-4 flex justify-center items-center flex-col md:justify-start">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center my-6">
        {categoryName ? `Category: ${formattedCategory}` : "All Products"}
      </h1>

      <ul className="category-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 gap-6 pt-16">
        {filtered?.map((p) => (
          <li key={p.id}>
            <Link
              to="/product/$productId"
              params={{ productId: p.id.toString() }}
              onClick={() => queryClient.setQueryData(["product", p.id], p)}
            >
              <CometCard className="h-[28rem] flex flex-col justify-between">
                <div className="p-4 md:p-8 text-white bg-[#1F2121] rounded-xl h-full flex flex-col">
                  <div className="bg-gray-800 rounded-xl h-[15rem] flex items-center justify-center shadow-lg">
                    <span className="text-gray-500">[Product Image]</span>
                  </div>
                  <h3 className="text-lg md:text-2xl text-center my-4 font-semibold truncate">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm">💰 {p.price} SEK</p>
                  <p className="text-sm">📦 Stock: {p.stockQuantity}</p>
                  <p className="text-sm">🏷️ Category: {p.category.name}</p>
                </div>
              </CometCard>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-center gap-4 mt-6 lg:mt-10">
        <p className="text-gray-400 text-sm">
          Showing{" "}
          <span className="font-semibold text-white">
            {filtered?.length ?? 0}
          </span>{" "}
          {categoryName ? "products in category" : "products total"}{" "}
          <span className="font-semibold text-white">
            {" "}
            {categoryName ? `Category: ${formattedCategory}` : "All Products"}
          </span>
        </p>
      </div>

      <ScrollToTopButton />
    </div>
  );
}
