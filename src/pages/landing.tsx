import ProductList from "./productList";

export default function Landing() {
  return (
    <div>
      <h1 className="sm:text-xl lg:text-3xl font-bold text-center">
        Welcome to Product Catalog
      </h1>
      <h1 className="my-8">Products</h1>
      <ProductList />
    </div>
  );
}
