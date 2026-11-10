import Loading from "@/compoenets/ui/Loading";
import Products from "@/features/Products/Product";
import { Suspense } from "react";

export default function ShopPage() {
  return <Suspense fallback={<Loading></Loading>}>
    <Products />
  </Suspense>;
}
