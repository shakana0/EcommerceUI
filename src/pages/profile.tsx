import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { ProductForm } from "../components/ui/ProductForm";

export default function Profile() {
  return (
    <>
      <div className="pb-8">
        <SignedIn>
          <h1 className="sm:text-xl lg:text-3xl font-bold text-center">
            Profile
          </h1>
        </SignedIn>
        <SignedOut>
          <p>You must sign in to view your profile.</p>
          <SignInButton />
        </SignedOut>
      </div>

      <ProductForm />
    </>
  );
}
