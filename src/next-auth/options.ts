import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "login",
      credentials: {
        email: { label: "user Email", placeholder: "your email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "type password",
        },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(`${process.env.PUBLIC_API}/auth/signin`, {
            method: "post",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "content-type": "application/json",
            },
          });

          const payload = await res.json();
          const userToken = jwtDecode<{ id: string }>(payload.token);

          if (!res.ok)
            throw new Error("incorrect email or password", payload?.message);

          // user
          return {
            id: userToken.id,
            name: payload.user.name,
            email: payload.user.email,
            // access token
            token: payload.token,
          };
        } catch (error) {
          throw (error as Error).message;
        }
      },
    }),
  
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.name = user.name;
        token.token = user.token;
      }
      return token;
    },
    session: ({ session, token }) => {
      session.user.name = token.name as string;
      return session;
    },
  },

  pages: {
    error: "/api/auth/signin",
    signIn: "/login",
  },
};

// nextauth token
// access token
