"use server";

// server action
import { registerSchmeType } from "../scheme/register.scheme";

export async function signUp(data: registerSchmeType) {
  try {
    const payload = await fetch(`${process.env.PUBLIC_API}/auth/signup`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!payload.ok) throw new Error("failed " + payload.statusText);

    return payload.ok;
  } catch (error) {
    throw error;
  }
}
