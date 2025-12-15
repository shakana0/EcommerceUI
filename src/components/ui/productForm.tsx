import { useEffect, useState } from "react";
import type { Product } from "../../types/types";
import { useApiQueries } from "../hooks/queries/useApiQueries";
import { toast } from "react-toastify";

export const ProductForm = () => {
  const { createProduct } = useApiQueries();

  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    categoryId: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stockQuantity" || name === "categoryId"
          ? Number(value)
          : value,
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.description) newErrors.description = "Description is required";
    if (form.price <= 0) newErrors.price = "Price must be greater than 0";
    if (form.stockQuantity <= 0)
      newErrors.stockQuantity = "Stock must be greater than 0";
    if (form.categoryId <= 0)
      newErrors.categoryId = "CategoryId must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      createProduct.mutate(form);
    }
  };

  useEffect(() => {
    if (createProduct.isSuccess) {
      setForm({
        name: "",
        description: "",
        price: 0,
        stockQuantity: 0,
        categoryId: 0,
      });
      setErrors({});
      toast.success("Product saved successfully!");
    }
  }, [createProduct.isSuccess]);

  useEffect(() => {
    if (createProduct.isError) {
      toast.error("Failed to save product. Try again.");
    }
  }, [createProduct.isError]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-lg shadow-lg space-y-4 max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold text-white">Add Product</h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2 focus:ring-2 focus:ring-green-500"
        />
        {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2 focus:ring-2 focus:ring-green-500"
        />
        {errors.description && (
          <p className="text-red-400 text-sm">{errors.description}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Price</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2 focus:ring-2 focus:ring-green-500"
        />
        {errors.price && <p className="text-red-400 text-sm">{errors.price}</p>}
      </div>

      {/* Stock Quantity */}
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Stock Quantity
        </label>
        <input
          type="number"
          name="stockQuantity"
          value={form.stockQuantity}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2 focus:ring-2 focus:ring-green-500"
        />
        {errors.stockQuantity && (
          <p className="text-red-400 text-sm">{errors.stockQuantity}</p>
        )}
      </div>

      {/* CategoryId */}
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Category ID
        </label>
        <input
          type="number"
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 text-white p-2 focus:ring-2 focus:ring-green-500"
        />
        {errors.categoryId && (
          <p className="text-red-400 text-sm">{errors.categoryId}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={createProduct.isPending}
        className={`w-full font-semibold py-2 px-4 rounded-md transition-colors
    ${
      createProduct.isPending
        ? "bg-gray-500 text-gray-300 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700 text-white"
    }`}
      >
        {createProduct.isPending ? "Saving..." : "Save Product"}
      </button>

      {createProduct.isError && (
        <p className="text-red-400 text-sm mt-2">
          Failed to save product. Try again.
        </p>
      )}
      {createProduct.isSuccess && (
        <p className="text-green-400 text-sm mt-2">
          Product saved successfully!
        </p>
      )}
    </form>
  );
};
