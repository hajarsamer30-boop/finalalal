import { getTokenFun } from "@/utlis/getTokenFun";

import { jwtDecode } from "jwt-decode";

import OrdersCom from "./OrdersCom";
import { Suspense } from "react";


export default async function page() {

    const token = await getTokenFun();

    if (!token) throw new Error("unauthorized");

   const decoded = jwtDecode<{ id: string }>(token)


    return (
        <Suspense fallback={'loading...'}>
            <OrdersCom  id={decoded.id!} ></OrdersCom>
        </Suspense>
    )
}
