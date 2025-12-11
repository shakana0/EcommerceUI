import { SignedIn, SignedOut, SignInButton, useAuth } from "@clerk/clerk-react";
import { useApi } from "../api/api";
import type { Product } from "../types/types";
import { toast } from "react-toastify";

export default function Profile() {
  const { post } = useApi();
  const { getToken } = useAuth();

  async function handleCreateProduct() {
    const newProduct: Product = {
      name: "5 Gaming Laptop",
      description: "High performance laptop for gaming",
      price: 1499.99,
      stockQuantity: 10,
      categoryId: 2,
    };

    try {
      const token = await getToken({ template: "ecom-jwt-template" });
      console.log(token);

      const result = await post("/Products", token!, newProduct);
      console.log("Product created:", result);

      toast.success(`Product "${result.name}" created successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Error creating product:", err);

      toast.error("Failed to create product. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  }

  return (
    <>
      <SignedIn>
        <h1 className="sm:text-xl lg:text-3xl font-bold text-center">
          Profile
        </h1>
        <p>Here is your favorite products...</p>
      </SignedIn>
      <SignedOut>
        <p>You must sign in to view your profile.</p>
        <SignInButton />
      </SignedOut>

      <button
        className="w-full md:w-auto px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg"
        onClick={handleCreateProduct}
      >
        Add Product
      </button>
    </>
  );
}
