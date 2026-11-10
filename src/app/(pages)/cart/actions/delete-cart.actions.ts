"use server";

import { getTokenFun } from "@/utlis/getTokenFun";

export async function deleteFromCart(productId: string) {
  const token = await getTokenFun();

  if (!token) throw new Error("unauthorized");

  const data = await fetch(`${process.env.PUBLIC_API}/cart/${productId}`, {
    method: "delete",
    headers: {
      "content-type": "application/json",
      token,
    },
  });

  if (!data.ok) throw new Error("unauthorized");

  return data.json();
}
