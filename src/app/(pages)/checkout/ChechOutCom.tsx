"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, CheckCircle2, MapPin, Phone, Truck } from "lucide-react";
import { checkout, shippingAddressType } from "./checkout.actions";




export default function CheckoutPage({id}:{id:string}) {
  const [submittedAddress, setSubmittedAddress] = useState<shippingAddressType["shippingAddress"] | null>(null);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<shippingAddressType>({
    defaultValues: { shippingAddress: { details: "", phone: "", city: "" } },
  });

  async function onSubmit(data: shippingAddressType) {
    setSubmitError("");
    try {
      const result = await checkout(data,id);
      console.log("result",result);
      
      setSubmittedAddress(data.shippingAddress);
      const checkoutUrl = result?.session?.url;
      if (checkoutUrl) window.location.assign(checkoutUrl);
    } catch {
      setSubmitError("We couldn't start checkout. Please try again.");
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-primary">FreshCart / Checkout</p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Shipping details</h1>
        <p className="mt-2 text-muted-foreground">Where should we deliver your order?</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin className="size-5" />
            </span>
            <div>
              <h2 className="font-semibold text-foreground">Delivery address</h2>
              <p className="text-sm text-muted-foreground">Enter your contact and location details</p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-1.5">
              <label htmlFor="details" className="block text-sm font-medium text-foreground">Street address</label>
              <input
                id="details"
                autoComplete="street-address"
                placeholder="Building, street, apartment..."
                aria-invalid={!!errors.shippingAddress?.details}
                aria-describedby={errors.shippingAddress?.details ? "details-error" : undefined}
                className="h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15 aria-invalid:border-destructive"
                {...register("shippingAddress.details", { required: "Please enter your street address" })}
              />
              {errors.shippingAddress?.details && <p id="details-error" className="text-sm text-destructive">{errors.shippingAddress.details.message}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="city" className="block text-sm font-medium text-foreground">City</label>
                <input
                  id="city"
                  autoComplete="address-level2"
                  placeholder="e.g. Cairo"
                  aria-invalid={!!errors.shippingAddress?.city}
                  aria-describedby={errors.shippingAddress?.city ? "city-error" : undefined}
                  className="h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15 aria-invalid:border-destructive"
                  {...register("shippingAddress.city", { required: "Please enter your city" })}
                />
                {errors.shippingAddress?.city && <p id="city-error" className="text-sm text-destructive">{errors.shippingAddress.city.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone" className="block text-sm font-medium text-foreground">Phone number</label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="01xxxxxxxxx"
                    aria-invalid={!!errors.shippingAddress?.phone}
                    aria-describedby={errors.shippingAddress?.phone ? "phone-error" : undefined}
                    className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-3.5 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15 aria-invalid:border-destructive"
                    {...register("shippingAddress.phone", {
                      required: "Please enter your phone number",
                      pattern: { value: /^[0-9+\s()-]{8,20}$/, message: "Please enter a valid phone number" },
                    })}
                  />
                </div>
                {errors.shippingAddress?.phone && <p id="phone-error" className="text-sm text-destructive">{errors.shippingAddress.phone.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? "Starting checkout..." : "Continue to payment"} <ArrowRight className="size-4" />
            </button>
          </form>

          {submitError && <p role="alert" className="mt-4 text-sm text-destructive">{submitError}</p>}

          {submittedAddress && (
            <div role="status" className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="mb-3 flex items-center gap-2 font-semibold text-primary">
                <CheckCircle2 className="size-5" /> Shipping details saved
              </div>
              <p className="text-sm text-foreground">{submittedAddress.details}, {submittedAddress.city}</p>
              <p className="mt-1 text-sm text-muted-foreground">Phone: {submittedAddress.phone}</p>
            </div>
          )}
        </section>

        <aside className="h-fit rounded-2xl border border-border bg-muted/40 p-5 sm:p-6">
          <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Truck className="size-5" />
          </div>
          <h2 className="font-semibold text-foreground">Delivery made easy</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Add your address and phone number so we can get your order to you smoothly.</p>
        </aside>
      </div>
    </main>
  );
}
