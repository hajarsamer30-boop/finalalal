import { getProducts } from "./apis/products.api";
import ProductsView from "./ProductsView";

export default async function Products() {
  const response = await getProducts();
  return <ProductsView products={response.data} />;
}
