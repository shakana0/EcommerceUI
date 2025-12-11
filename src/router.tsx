// src/router.tsx
import {
  createRouter,
  RouterProvider,
  Route,
  RootRoute,
} from "@tanstack/react-router";

import Layout from "./components/Layout/layout";
import Landing from "./pages/landing";
import ProductList from "./pages/productList";
import Product from "./pages/product";
import CategoryList from "./pages/categoryList";
import Profile from "./pages/profile";

import { useAuth } from "@clerk/clerk-react";

function Protected({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <div>Please sign in to access this page.</div>;
  }
  return <>{children}</>;
}

// Root layout
const rootRoute = new RootRoute({
  component: Layout,
});

// Child routes
const landingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Landing,
});

const productListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: ProductList,
});

const productRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/products/$id", // dynamic route
  component: Product,
});

const categoryRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/categories",
  component: CategoryList,
});

const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <Protected>
      <Profile />
    </Protected>
  ),
});

// Create router
const routeTree = rootRoute.addChildren([
  landingRoute,
  productListRoute,
  productRoute,
  categoryRoute,
  profileRoute,
]);

export const router = createRouter({ routeTree });
