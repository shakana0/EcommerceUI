import ProductList from "./productList";

export default function Landing() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold my-6 text-center">
        Welcome to Product Catalog
      </h1>
      <ProductList />
    </div>
  );
}
