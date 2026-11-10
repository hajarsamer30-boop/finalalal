import { ProductInterface } from "@/features/Products/interfaces/product.interface";


type ProductItemRes= {
    data:ProductInterface
}

export async function getSingleProduct(prodId:string):Promise<ProductItemRes> {
  try {
    const response = await fetch(`${process.env.PUBLIC_API}/products/${prodId}`);
    if (!response.ok) throw new Error("failed to fetch " + response.statusText);
    return response.json();
  } catch (error) {
    throw error;
  }
}
