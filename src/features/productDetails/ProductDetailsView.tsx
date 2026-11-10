

import { type ReactNode } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { calcRate } from "@/utlis/calc-rate";
import type { ProductInterface } from "@/features/Products/interfaces/product.interface";
import CartButtonCom from './../../app/(pages)/cart/components/CartButtonCom';

export default function ProductDetailsView({
  product,
  gallery,
  relatedProducts,
}: {
  product: ProductInterface;
  gallery: ReactNode;
  relatedProducts: ReactNode;
}) {



  const { price, quantity } = product

  return (
    <>
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-6 px-4 py-4 sm:px-6 sm:py-8 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div className="min-w-0">{gallery}</div>

        <div className="min-w-0 py-2 sm:py-6">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{product.title}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">


          </div>
          <p className="my-4 text-2xl font-bold text-primary">{price} EGP</p>
          <p className="leading-7 text-muted-foreground">{product.description}</p>

          <div className="my-6 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-xl border border-border">
              <button
                type="button"


                className="inline-flex size-11 items-center justify-center rounded-s-xl transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus aria-hidden="true" className="size-4" />
              </button>
              <span aria-live="polite" className="min-w-10 text-center font-semibold">{0}</span>
              <button
                type="button"


                className="inline-flex size-11 items-center justify-center rounded-e-xl transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus aria-hidden="true" className="size-4" />
              </button>
            </div>

          </div>

          <div className="flex items-center justify-between border-y border-border py-4">
            <span className="text-muted-foreground">total price</span>
            <span>{price} EGP</span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">


             <CartButtonCom  isProductItem={false} pId={product._id} />


            <Button variant="outline" className="h-11" >
              buy now
            </Button>
          </div>
          <Button variant="outline" className="mt-2 h-11 w-full">
            addToWishlist
          </Button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">

        {relatedProducts}
      </section>
    </>
  );
}
