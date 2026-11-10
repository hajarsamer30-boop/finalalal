'use client'
import { Spinner } from "@/components/ui/spinner"
import { CartRes } from "@/interfaces/cart/cart.interface"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowRight, Minus, Plus, ShoppingBag, ShoppingCart, Trash2, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { updateCountCart } from "../actions/update-cart.actions"
import { toast } from "react-toastify"
import { deleteFromCart } from "../actions/delete-cart.actions"
import { clearCart } from "../actions/clear-cart.actions"
import { useState } from "react"

type CartProduct = {
    _id: string
    count: number
    price: number
    product: {
        _id: string
        title: string
        price: number
        imageCover: string
        category?: { name?: string }
    }
}

const currency = (amount: number) =>
    new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 2 }).format(amount)

export default function CartCom() {
    const [seletctedId,setId] = useState<string|null>(null)
    const { error, data, isLoading } = useQuery<CartRes>({
        queryKey: ['cart'],
        queryFn: async () => {
            const response = await fetch('/api/cart')
            if (!response.ok) throw new Error('We could not load your cart. Please try again.')
            return response.json()
        }
    })

    type pageProps = {
        productId: string;
        count: number;
    };
    const query = useQueryClient()


    const { mutate:delMutate } = useMutation({
        mutationFn: deleteFromCart,
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const { mutate:clrMutate } = useMutation({
        mutationFn: clearCart,
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    const { mutate, data: cartData,isPending } = useMutation<CartRes, Error, pageProps>({
        mutationFn: updateCountCart,
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ['cart'] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })


    function increase(productId:string,count:number)
    {
        mutate({productId,count:count+1})
        setId(productId)
    }
    function decrease(productId:string,count:number)
    {
         mutate({productId,count:count-1})
         setId(productId)
    }


    if (isLoading) {
        return (
            <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-label="Loading cart">
                <div className="mb-8 h-8 w-48 animate-pulse rounded-lg bg-muted" />
                <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
                    <div className="h-72 animate-pulse rounded-2xl bg-muted" />
                    <div className="h-72 animate-pulse rounded-2xl bg-muted" />
                </div>
            </main>
        )
    }

    if (error) {
        return (
            <main className="mx-auto flex min-h-[55vh] w-full max-w-7xl items-center justify-center px-4 py-12">
                <section className="max-w-md text-center">
                    <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-50 text-red-500"><ShoppingCart className="size-7" /></span>
                    <h1 className="mt-5 text-2xl font-bold text-foreground">Your cart is unavailable</h1>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{error.message}</p>
                </section>
            </main>
        )
    }

    const cart = data?.payload
    const products = (cart?.data?.products ?? []) as CartProduct[]
    const total = cart?.data?.totalCartPrice ?? 0


    if (!products.length) {
        return (
            <main className="mx-auto flex min-h-[55vh] w-full max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <section className="flex w-full max-w-lg flex-col items-center rounded-3xl border border-border bg-card px-6 py-10 text-center shadow-sm sm:px-10 sm:py-14">
                    <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"><ShoppingBag aria-hidden="true" className="size-8" /></span>
                    <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">Your cart is empty</h1>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Looks like you haven’t added anything yet. Find something fresh for your home.</p>
                    <Link href="/shop" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        Start shopping <ArrowRight className="size-4" />
                    </Link>
                </section>
            </main>
        )
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="mb-2 text-sm font-medium text-primary">Freshcart / Cart</p>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Your cart</h1>
                    <p className="mt-2 text-sm text-muted-foreground">You have {cart?.numOfCartItems ?? products.length} items in your cart</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <button onClick={()=>clrMutate()} type="button" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-red-200 px-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40">
                        <Trash2 aria-hidden="true" className="size-4"  />
                        Clear cart
                    </button>
                    <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80">
                        Continue shopping <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>

            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
                <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm" aria-label="Cart items">
                    <div className="hidden grid-cols-[minmax(0,1fr)_110px_130px_110px] gap-4 border-b border-border bg-muted/40 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:grid">
                        <span>Product</span><span>Price</span><span>Quantity</span><span className="text-right">Subtotal</span>
                    </div>
                    <ul className="divide-y divide-border">
                        {products.map((item) => {
                            const product = item.product
                            const unitPrice = product?.price ?? item.price ?? 0
                            const quantity = item.count ?? 1
                            return (
                                <li key={item._id} className="grid gap-4 p-4 sm:p-6 md:grid-cols-[minmax(0,1fr)_110px_130px_110px] md:items-center">
                                    <div className="flex min-w-0 items-center gap-4">
                                        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-24">
                                            {product?.imageCover && <Image src={product.imageCover} alt={product.title} fill sizes="96px" className="object-cover" />}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="mb-1 text-xs font-medium text-primary">{product?.category?.name ?? 'Freshcart'}</p>
                                            <h2 className="line-clamp-2 font-semibold leading-6 text-foreground">{product?.title ?? 'Product'}</h2>
                                            <p className="mt-1 text-sm text-muted-foreground md:hidden">{currency(unitPrice)} each</p>
                                        </div>
                                        <button type="button" aria-label={`Remove ${product?.title ?? 'product'} from cart`} className="ml-auto inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:hover:bg-red-950/40">
                                             <Trash2 onClick={()=>delMutate(product._id)} aria-hidden="true" className="size-4" />
                                        </button>
                                    </div>
                                    <p className="hidden text-sm font-medium text-foreground md:block">{currency(unitPrice)}</p>
                                    <div className="flex items-center justify-between md:justify-start">

                                        <span className="text-sm text-muted-foreground md:hidden">Quantity</span>
                                        <div className="inline-flex h-10 items-center rounded-lg border border-border bg-background">
                                            <span onClick={()=>{decrease(item.product._id,item.count)}} className="grid size-9 place-items-center text-muted-foreground"><Minus className="size-3.5" /></span>


                                            <span className="min-w-8 text-center text-sm font-semibold">
                                               {isPending&&seletctedId===product._id?<Spinner></Spinner>:quantity} 
                                            </span>


                                            <span onClick={()=>{increase(item.product._id,item.count)}} className="grid size-9 place-items-center text-muted-foreground"><Plus className="size-3.5" /></span>

                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-dashed border-border pt-3 md:block md:border-0 md:pt-0 md:text-right">
                                        <span className="text-sm text-muted-foreground md:hidden">Subtotal</span>
                                        <span className="font-semibold text-foreground">{currency(unitPrice * quantity)}</span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="flex items-center gap-2 border-t border-border bg-muted/30 px-5 py-4 text-sm text-muted-foreground sm:px-6">
                        <Truck className="size-4 text-primary" /> Your order qualifies for free delivery.
                    </div>
                </section>

                <aside className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
                    <h2 className="text-lg font-bold text-foreground">Order summary</h2>
                    <div className="mt-5 space-y-4 border-b border-border pb-5 text-sm">
                        <div className="flex justify-between gap-4 text-muted-foreground"><span>Subtotal ({cart?.numOfCartItems ?? products.length} items)</span><span className="font-medium text-foreground">{currency(total)}</span></div>
                        <div className="flex justify-between gap-4 text-muted-foreground"><span>Delivery</span><span className="font-semibold text-primary">Free</span></div>
                    </div>
                    <div className="flex justify-between gap-4 py-5 text-base font-bold text-foreground"><span>Total</span><span>{currency(total)}</span></div>
                    <Link href={`/checkout/${cart?.cartId}`} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        Continue to checkout <ArrowRight className="size-4" />
                    </Link>
                    <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">Taxes and delivery fees are calculated at checkout.</p>
                </aside>
            </div>
        </main>
    )
}
