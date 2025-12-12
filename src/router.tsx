// src/router.tsx
import { createRouter, Route, RootRoute } from "@tanstack/react-router";
import Layout from "./components/Layout/layout";
import Landing from "./pages/landing";
import ProductList from "./pages/productList";
import Product from "./pages/product";
import CategoryList from "./pages/categoryList";
import Profile from "./pages/profile";
import { useAuth, useUser } from "@clerk/clerk-react";

function Protected({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to access this page.</div>;
  }

  const isAdmin = user?.organizationMemberships?.some(
    (m) => m.role === "org:admin"
  );

  if (!isAdmin) {
    return <div>Access denied. Admins only.</div>;
  }

  return <>{children}</>;
}

const rootRoute = new RootRoute({ component: Layout });

const landingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Landing,
});

export const productListRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: ProductList,
});

export const productRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/products/$productId",
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

const routeTree = rootRoute.addChildren([
  landingRoute,
  productListRoute,
  productRoute,
  categoryRoute,
  profileRoute,
]);

export const router = createRouter({ routeTree });
