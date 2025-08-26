"use server";

import { auth } from "@/lib/auth";
// import { parseSetCookieHeader } from "better-auth/cookies";
import {
  // cookies,
  headers,
} from "next/headers";

export async function signInEmailAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Please enter your email" };

  const password = String(formData.get("password"));
  if (!password) return { error: "Please enter your password" };

  try {
    // const res =
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
      //   asResponse: true,
    });

    // ==== MANUALLY SET COOKIES ====
    // const setCookieHeader = res.headers.get("set-cookie");
    // if (setCookieHeader) {
    //   const cookie = parseSetCookieHeader(setCookieHeader);
    //   const cookieStore = await cookies();

    //   const [key, props] = [...cookie.entries()][0];
    //   const value = props.value;
    //   const maxAge = props["max-age"];
    //   const path = props.path;
    //   const httpOnly = props.httponly;
    //   const sameSite = props.samesite;

    //   cookieStore.set(key, decodeURIComponent(value), {
    //     maxAge,
    //     path,
    //     httpOnly,
    //     sameSite,
    //   });
    // }
    // ==============================

    return { error: null };
  } catch (err) {
    if (err instanceof Error) {
      return { error: "Oops! Something went wrong while logging in" };
    }

    return { error: "Internal Server Error" };
  }
}
