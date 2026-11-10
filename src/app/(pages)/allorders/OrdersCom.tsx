"use client";

import { useQuery } from "@tanstack/react-query";
import { CalendarDays, PackageCheck, PackageOpen, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { orders } from "./Order";

type OrderItem = {
  _id?: string;
  count?: number;
  price?: number;
  product?: {
    _id?: string;
    title?: string;
    imageCover?: string;
  };
};

type OrderData = {
  _id?: string;
  id?: string;
  createdAt?: string;
  totalOrderPrice?: number;
  isPaid?: boolean;
  isDelivered?: boolean;
  paymentMethodType?: string;
  cartItems?: OrderItem[];
};

const currency = (amount: number) =>
  new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 2,
  }).format(amount);

function orderStatus(order: OrderData) {
  if (order.isDelivered) return { label: "Delivered", className: "bg-emerald-50 text-emerald-700", icon: PackageCheck };
  if (order.isPaid) return { label: "On its way", className: "bg-sky-50 text-sky-700", icon: Truck };
  return { label: "Processing", className: "bg-amber-50 text-amber-700", icon: PackageOpen };
}

export default function OrdersCom({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", id],
    queryFn: () => orders(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="space-y-5">{[1, 2].map((item) => <div key={item} className="h-48 animate-pulse rounded-2xl border border-border bg-muted/40" />)}</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div role="alert" className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
          We couldn&apos;t load your orders. Please refresh the page and try again.
        </div>
      </main>
    );
  }

  const ordersList: OrderData[] = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">FreshCart / Account</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My orders</h1>
          <p className="mt-2 text-muted-foreground">
            {ordersList.length === 1 ? "1 order" : `${ordersList.length} orders`} in your order history
          </p>
        </div>
        <Link href="/shop" className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg border border-border bg-card px-4 text-sm font-semibold text-foreground transition hover:bg-muted sm:self-auto">
          <ShoppingBag className="size-4" /> Continue shopping
        </Link>
      </header>

      {ordersList.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
          <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <PackageOpen className="size-7" />
          </span>
          <h2 className="text-lg font-semibold text-foreground">No orders yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">When you place an order, you can follow its details and delivery status here.</p>
          <Link href="/shop" className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">Explore products</Link>
        </section>
      ) : (
        <div className="space-y-5">
          {ordersList.map((order, index) => {
            const orderId = order._id ?? order.id ?? `order-${index + 1}`;
            const status = orderStatus(order);
            const StatusIcon = status.icon;
            const items = order.cartItems ?? [];
            const itemCount = items.reduce((total, item) => total + (item.count ?? 1), 0);

            return (
              <article key={orderId} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <header className="flex flex-col gap-4 border-b border-border bg-muted/30 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Order number</p>
                      <p className="mt-0.5 font-semibold text-foreground">#{orderId.slice(-8).toUpperCase()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Placed on</p>
                      <p className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                        <CalendarDays className="size-3.5 text-muted-foreground" />
                        {order.createdAt ? new Intl.DateTimeFormat("en-EG", { day: "numeric", month: "short", year: "numeric" }).format(new Date(order.createdAt)) : "Date unavailable"}
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}>
                    <StatusIcon className="size-3.5" /> {status.label}
                  </span>
                </header>

                <div className="divide-y divide-border px-5 sm:px-6">
                  {items.length > 0 ? items.map((item, itemIndex) => {
                    const product = item.product;
                    const itemKey = item._id ?? product?._id ?? `${orderId}-item-${itemIndex}`;
                    return (
                      <div key={itemKey} className="flex items-center gap-4 py-4">
                        {product?.imageCover ? (
                          <Image src={product.imageCover} alt={product.title ?? "Ordered product"} width={64} height={64} className="size-16 rounded-xl border border-border bg-muted object-cover" />
                        ) : (
                          <span className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground"><PackageOpen className="size-6" /></span>
                        )}
                        <div className="min-w-0 flex-1">
                          {product?._id ? (
                            <Link href={`/productDetails/${product._id}`} className="line-clamp-2 text-sm font-semibold text-foreground hover:text-primary">{product.title ?? "Product"}</Link>
                          ) : (
                            <p className="line-clamp-2 text-sm font-semibold text-foreground">{product?.title ?? "Product"}</p>
                          )}
                          <p className="mt-1 text-sm text-muted-foreground">Qty: {item.count ?? 1}</p>
                        </div>
                        <p className="shrink-0 text-sm font-semibold text-foreground">{currency(item.price ?? 0)}</p>
                      </div>
                    );
                  }) : <p className="py-5 text-sm text-muted-foreground">Product details are unavailable for this order.</p>}
                </div>

                <footer className="flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <p className="text-sm text-muted-foreground">{itemCount} {itemCount === 1 ? "item" : "items"} · {order.paymentMethodType === "cash" ? "Cash on delivery" : order.paymentMethodType ? order.paymentMethodType.replaceAll("_", " ") : "Payment details unavailable"}</p>
                  <p className="text-sm text-muted-foreground">Order total <span className="ml-2 text-base font-bold text-foreground">{currency(order.totalOrderPrice ?? 0)}</span></p>
                </footer>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
