import { NextResponse } from "next/server";

const COOKIE_NAME = process.env.ADMIN_COOKIE_NAME || "zf_admin";

export async function GET() {
  const res = NextResponse.redirect(new URL("/", "http://localhost:3000"));
  res.cookies.set({
    name: COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
  });
  return res;
}