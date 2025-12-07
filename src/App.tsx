import "./index.css";

import {
  RouterProvider,
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";

import Layout from "./components/Layout/layout";

const rootRoute = createRootRoute({
  component: Layout,
});

const router = createRouter({
  routeTree: rootRoute,
});

export default function App() {
  return <RouterProvider router={router} />;
}
