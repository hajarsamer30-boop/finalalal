"use server";

import { getTokenFun } from "@/utlis/getTokenFun";

export type shippingAddressType = {
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
};

export async function checkout(shippingAddress: shippingAddressType,cartId:string) {
 

 const token = await getTokenFun();

  if (!token) throw new Error("unauthorized");



     const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
    {
      method: "post",
      body: JSON.stringify(shippingAddress),
      headers: {
        "content-type": "application/json",
        token
      },
    },
  );

  if (!res.ok) throw new Error("eroor");

  const payload = await res.json();

  return payload;
 
}
