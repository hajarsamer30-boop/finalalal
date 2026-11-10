import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token)
    return NextResponse.json({ message: "unauthorized", status: 401 });

  const data = await fetch(`${process.env.PUBLIC_API}/cart`, {
    headers: {
      "content-type": "application/json",
      token: token?.token,
    },
  });

  const payload = await data.json();

  return NextResponse.json({ payload });
}
