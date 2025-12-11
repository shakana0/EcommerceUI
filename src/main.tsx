import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { ToastContainer } from "react-toastify";

const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </ClerkProvider>
  </React.StrictMode>
);
