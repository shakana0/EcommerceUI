import { SignedIn, SignedOut, SignInButton, useAuth } from "@clerk/clerk-react";
import { useApi } from "../api/api";
import type { Product } from "../types/types";

export default function Profile() {
  const { post } = useApi();
  const { getToken } = useAuth();

  async function handleCreateProduct() {
    const newProduct: Product = {
      name: "2 Gaming Laptop",
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
    } catch (err) {
      console.error("Error creating product:", err);
    }
  }

  return (
    <>
      <SignedIn>
        <h1>Your Profile</h1>
        <p>Here is your favorite products...</p>
      </SignedIn>
      <SignedOut>
        <p>You must sign in to view your profile.</p>
        <SignInButton />
      </SignedOut>

      <button onClick={handleCreateProduct}>Save Profile</button>
    </>
  );
}
