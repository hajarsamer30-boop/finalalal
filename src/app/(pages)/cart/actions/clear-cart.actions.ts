"use server";

import { getTokenFun } from "@/utlis/getTokenFun";

export async function clearCart() {
  const token = await getTokenFun();

  if (!token) throw new Error("unauthorized");

  const data = await fetch(`${process.env.PUBLIC_API}/cart`, {
    method: "delete",
    headers: {
      "content-type": "application/json",
      token,
    },
  });

  if (!data.ok) throw new Error("unauthorized");

  return data.json();
}
