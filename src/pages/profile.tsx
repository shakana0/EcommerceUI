import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { ProductForm } from "../components/ui/ProductForm";

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="pb-8">
        <SignedIn>
          <h1 className="sm:text-xl lg:text-3xl font-bold text-center">
            Profile
          </h1>
        </SignedIn>
        <SignedOut>
          <p className="text-center">You must sign in to view your profile.</p>
          <div className="flex justify-center mt-4">
            <SignInButton />
          </div>
        </SignedOut>
      </div>

      <div className="flex justify-center pt-12">
        <div className="w-full max-w-md">
          <ProductForm />
        </div>
      </div>
    </div>
  );
}
