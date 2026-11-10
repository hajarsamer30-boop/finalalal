export type Language = "en" | "ar";
export type Theme = "light" | "dark";

const messages = {
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.aria": { en: "Main navigation", ar: "التنقل الرئيسي" },
  "nav.shop": { en: "Shop", ar: "المتجر" },
  "nav.categories": { en: "Categories", ar: "الأقسام" },
  "nav.brands": { en: "Brands", ar: "العلامات التجارية" },
  "nav.cart": { en: "Cart", ar: "السلة" },
  "nav.openMenu": { en: "Open navigation menu", ar: "افتح قائمة التنقل" },
  "nav.closeMenu": { en: "Close navigation menu", ar: "أغلق قائمة التنقل" },
  "nav.switchLanguage": { en: "Switch language to Arabic", ar: "التبديل إلى الإنجليزية" },
  "nav.switchToDark": { en: "Switch to dark mode", ar: "التبديل إلى الوضع الداكن" },
  "nav.switchToLight": { en: "Switch to light mode", ar: "التبديل إلى الوضع الفاتح" },
  "breadcrumb.home": { en: "Home", ar: "الرئيسية" },
  "breadcrumb.aria": { en: "Breadcrumb", ar: "مسار التنقل" },
  "breadcrumb.productDetails": { en: "Product details", ar: "تفاصيل المنتج" },
  "home.eyebrow": { en: "A little something for every day", ar: "اختيارات مميزة لكل يوم" },
  "home.title": { en: "Find your next favorite.", ar: "اكتشف منتجك المفضل القادم." },
  "home.description": {
    en: "Explore carefully selected products from brands you love, all in one place.",
    ar: "اكتشف منتجات مختارة بعناية من علاماتك التجارية المفضلة، في مكان واحد.",
  },
  "home.shopNow": { en: "Shop now", ar: "تسوق الآن" },
  "home.browseCategories": { en: "Browse categories", ar: "تصفح الأقسام" },
  "home.promiseCurated": { en: "Thoughtfully selected", ar: "اختيارات بعناية" },
  "shop.eyebrow": { en: "Find your next favorite", ar: "اكتشف منتجك المفضل القادم" },
  "shop.title": { en: "Shop products", ar: "تسوق المنتجات" },
  "shop.description": {
    en: "Browse our latest picks and find something you will love.",
    ar: "تصفح أحدث اختياراتنا واعثر على ما يناسبك.",
  },
  "shop.empty": { en: "No products are available right now.", ar: "لا توجد منتجات متاحة حاليًا." },
  "product.noImage": { en: "No image available", ar: "لا توجد صورة متاحة" },
  "product.featured": { en: "Featured", ar: "مميز" },
  "product.discount": { en: "Save", ar: "خصم" },
  "product.addToCart": { en: "Add to cart", ar: "أضف إلى السلة" },
  "product.rating": { en: "Rating: {rating} out of 5 stars", ar: "التقييم: {rating} من 5 نجوم" },
  "brands.title": { en: "Brands", ar: "العلامات التجارية" },
  "brands.description": { en: "Brand listings will appear here.", ar: "ستظهر العلامات التجارية هنا." },
  "categories.title": { en: "Categories", ar: "الأقسام" },
  "categories.description": { en: "Explore products by category.", ar: "تصفح المنتجات حسب القسم." },
  "cart.title": { en: "Your cart", ar: "سلة التسوق" },
  "cart.empty": { en: "Your cart is empty", ar: "سلتك فارغة" },
  "cart.description": { en: "Find something you love and it will show up here.", ar: "اختر المنتجات التي تعجبك وستظهر هنا." },
  "cart.continueShopping": { en: "Continue shopping", ar: "تابع التسوق" },
  "details.available": { en: "available", ar: "متوفر" },
  "details.increaseQuantity": { en: "Increase quantity", ar: "زيادة الكمية" },
  "details.decreaseQuantity": { en: "Decrease quantity", ar: "تقليل الكمية" },
  "details.totalPrice": { en: "Total price", ar: "السعر الإجمالي" },
  "details.addToCart": { en: "Add to cart", ar: "أضف إلى السلة" },
  "details.buyNow": { en: "Buy now", ar: "اشترِ الآن" },
  "details.addToWishlist": { en: "Add to wishlist", ar: "أضف إلى المفضلة" },
  "details.relatedProducts": { en: "Related products", ar: "منتجات ذات صلة" },
  "details.productImage": { en: "Product image {number}", ar: "صورة المنتج {number}" },
  "loading": { en: "Loading…", ar: "جارٍ التحميل…" },
  "notFound.title": { en: "Page not found", ar: "الصفحة غير موجودة" },
  "notFound.description": { en: "The page you are looking for may have moved or no longer exists.", ar: "ربما انتقلت الصفحة التي تبحث عنها أو لم تعد موجودة." },
  "notFound.home": { en: "Back to home", ar: "العودة إلى الرئيسية" },
  "error.title": { en: "Something went wrong", ar: "حدث خطأ ما" },
  "error.description": { en: "Please try again. If the problem continues, come back in a little while.", ar: "يرجى المحاولة مرة أخرى. إذا استمرت المشكلة، أعد المحاولة بعد قليل." },
  "error.retry": { en: "Try again", ar: "حاول مرة أخرى" },
} as const;

export type TranslationKey = keyof typeof messages;

export function translate(language: Language, key: TranslationKey) {
  return messages[key][language];
}

export function translateTemplate(
  language: Language,
  key: TranslationKey,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce(
    (message, [name, value]) => message.replaceAll(`{${name}}`, String(value)),
    translate(language, key) as string,
  );
}
