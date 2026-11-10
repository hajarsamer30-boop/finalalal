import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const userToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!!userToken) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/cart"],
};


// token
//server file  [com,js]==>
//proxy,handler ==> getToken()