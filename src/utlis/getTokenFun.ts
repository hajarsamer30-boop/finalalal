import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getTokenFun() {
   
  const cookieName = process.env.NODE_ENV=='production'?"__Secure-next-auth.session-token":"next-auth.session-token"
      const cookie = await cookies();

      const authcookies = cookie.get(cookieName)?.value;
      console.log("authcookies", authcookies);
    
      const decodedToken = await decode({
        secret: process.env.NEXTAUTH_SECRET!,
        token: authcookies,
      });

      return decodedToken?.token

}