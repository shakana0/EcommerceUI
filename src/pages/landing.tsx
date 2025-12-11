import ProductList from "./productList";

export default function Landing() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome to Product Catalog</h1>
      <p>This is the public landing page.</p>
      <h1>Products</h1>
      <ProductList />
    </div>
  );
}
