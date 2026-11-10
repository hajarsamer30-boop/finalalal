"use server";

import { getTokenFun } from "@/utlis/getTokenFun";

type pageProps = {
  productId: string;
  count: number;
};

export async function updateCountCart({ productId, count }: pageProps) {
  const token = await getTokenFun();

  if (!token) throw new Error("unauthorized");

  const data = await fetch(`${process.env.PUBLIC_API}/cart/${productId}`, {
    method: "put",
    body: JSON.stringify({ count }),
    headers: {
      "content-type": "application/json",
       token
    },
  });

  if (!data.ok) throw new Error("unauthorized");

  return data.json();
}
