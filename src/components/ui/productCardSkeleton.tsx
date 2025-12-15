import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md w-full max-w-sm animate-pulse space-y-4">
      {/* Image */}
      <Skeleton height={180} className="rounded-md opacity-30" />

      {/* Title */}
      <Skeleton height={20} width="80%" className="rounded opacity-30" />

      {/* Price */}
      <Skeleton height={20} width="40%" className="rounded opacity-30" />

      {/* Btn */}
      <Skeleton height={36} width="100%" className="rounded opacity-30" />
    </div>
  );
};
