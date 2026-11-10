
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Suspense } from "react";
import CartCom from './components/CartCom'
export default function CartPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
    
      <Suspense fallback={"loading"}>
        <CartCom/>
      </Suspense>
    </main>
  );
}
