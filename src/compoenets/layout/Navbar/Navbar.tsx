"use client";

import Link from "next/link";
import { useState } from "react";
import { Languages, Menu, Moon, Sun, X, ChevronDown, ShoppingCart } from "lucide-react";
import { useAppPreferences } from "@/providers/app-preferences-provider";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from '@tanstack/react-query';
import { CartRes } from "@/interfaces/cart/cart.interface";

const links = [
  { key: "nav.home", href: "/" },
  { key: "nav.shop", href: "/shop" },
  { key: "nav.categories", href: "/categories" },
  { key: "nav.brands", href: "/brands" },

] as const;

export default function Navbar() {

  const { error, data:cartData, isLoading } = useQuery<CartRes>({
        queryKey: ['cart'],
        queryFn: async () => {
            const response = await fetch('/api/cart')
            if (!response.ok) throw new Error('We could not load your cart. Please try again.')
            return response.json()
        }
    })
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const { language, theme, toggleLanguage, toggleTheme, t } = useAppPreferences();

  const { data, status } = useSession()

  function handleLogout() {
    signOut({ callbackUrl: '/', redirect: true })
    setIsAccountMenuOpen(false)
  }



  const controls = (
    <div className="flex items-center gap-2">

      <Link
        href="/cart"
        aria-label={t("nav.cart")}
        className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ShoppingCart aria-hidden="true" className="size-5" />
        <span aria-label="Cart item count" className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold leading-none text-primary-foreground">
          {cartData?.payload.numOfCartItems ?? 0}
        </span>
      </Link>

      {status === "authenticated" && (
        <p className="shrink-0 text-sm font-bold text-green-600 dark:text-green-400">
          Welcome <span className="uppercase tracking-wider">{data.user.name}</span>
        </p>
      )}

      <div className="relative">
        <button
          type="button"
          aria-expanded={isAccountMenuOpen}
          aria-haspopup="menu"
          onClick={() => setIsAccountMenuOpen((open) => !open)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Account
          <ChevronDown aria-hidden="true" className="size-4" />
        </button>
        {isAccountMenuOpen && (
          <div role="menu" className="absolute right-0 top-full z-50 mt-2 min-w-36 rounded-lg border border-border bg-background p-1 shadow-md">


            {status === "authenticated" ? (
              <>
                <button

                  onClick={handleLogout}
                  className="block rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  role="menuitem"
                  onClick={() => setIsAccountMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  role="menuitem"
                  onClick={() => setIsAccountMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent"
                >
                  Login
                </Link>
              </>
            )}



          </div>
        )}
      </div>
      <button
        type="button"
        onClick={toggleLanguage}
        aria-label={t("nav.switchLanguage")}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Languages aria-hidden="true" className="size-4" />
        <span>{language === "en" ? "عربي" : "EN"}</span>
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === "light" ? t("nav.switchToDark") : t("nav.switchToLight")}
        className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {theme === "light" ? <Moon aria-hidden="true" className="size-4" /> : <Sun aria-hidden="true" className="size-4" />}
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav aria-label={t("nav.aria")} className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={t("nav.home")}
          className="shrink-0 text-xl font-bold tracking-tight text-primary sm:text-2xl"
          onClick={() => setIsMenuOpen(false)}
        >
          FreshCart
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-5 lg:flex xl:gap-7">

          <div className="flex items-center gap-5 xl:gap-7">
            {links.map(({ key, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {t(key)}
              </Link>
            ))}
          </div>
          {controls}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {controls}
          <button
            type="button"
            aria-label={isMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="inline-flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>



        {isMenuOpen && (
          <div id="mobile-navigation" className="absolute inset-x-0 top-full border-b border-border bg-background px-4 py-3 shadow-md lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col">
              {links.map(({ key, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-md px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(key)}
                </Link>
              ))}
            </div>
          </div>
        )}

      </nav>
    </header>
  );
}


