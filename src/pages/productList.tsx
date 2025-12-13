import type { ProductData } from "../types/types";
import { CometCard } from "../components/ui/comet-card";
import { Link } from "@tanstack/react-router";
import { productRoute } from "../router";
import { useApiQueries } from "../components/hooks/queries/useApiQueries";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ProductCardSkeleton } from "../components/ui/ProductCardSkeleton";
import { useApiVersion } from "../components/hooks/api/useApiVersion";
import ScrollToTopButton from "../components/ui/ScrollToTopButton";

export default function ProductList() {
  const { productsQuery, allProductsQuery } = useApiQueries();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const queryClient = useQueryClient();
  const version = useApiVersion();
  const query =
    version === "dev" ? allProductsQuery() : productsQuery(page, pageSize);

  if (query.isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (query.error) return <p>Error loading products</p>;

  return (
    <div className="flex justify-center items-center flex-col min-h-screen pt-4">
      <ul className="product-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 gap-6 mt-6">
        {query.data.items?.map((p: ProductData) => (
          <li key={p.id}>
            <Link
              to={productRoute.id}
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
      <div className="flex flex-col items-center gap-4 mt-6">
        <div className="flex gap-4 justify-center">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md 
                 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed 
                 transition-colors duration-200 cursor-pointer"
          >
            Previous
          </button>

          <button
            onClick={() => {
              setPage(page + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={page === query.data?.totalPages}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md 
                 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed 
                 transition-colors duration-200 cursor-pointer"
          >
            Next
          </button>
        </div>

        <p className="text-gray-400 text-sm">
          Page{" "}
          <span className="font-semibold text-white">{query.data?.page}</span>{" "}
          of{" "}
          <span className="font-semibold text-white">
            {query.data?.totalPages}
          </span>{" "}
          ·{" "}
          <span className="font-semibold text-white">
            {query.data?.totalCount}
          </span>{" "}
          products total
        </p>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
