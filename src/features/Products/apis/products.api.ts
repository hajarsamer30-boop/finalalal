import { ProductResponse } from "../interfaces/product.interface";

export async function getProducts():Promise<ProductResponse> {
  try {
    const response = await fetch(`${process.env.PUBLIC_API}/products`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("failed to fetch " + response.statusText);
    return response.json();
  } catch (error) {
    throw error;
  }
}
