import { NextResponse } from "next/server";

const COOKIE_NAME = process.env.ADMIN_COOKIE_NAME || "zf_admin";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const username = String(body?.username || "");
  const password = String(body?.password || "");

  const user = process.env.ADMIN_USER || "";
  const pass = process.env.ADMIN_PASS || "";

  if (!user || !pass) {
    return NextResponse.json(
      { ok: false, error: "Admin not configured" },
      { status: 500 }
    );
  }

  if (username !== user || password !== pass) {
    return NextResponse.json(
      { ok: false, error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });

  // Cookie simple de sesión (si existe cookie, estás logueado)
  res.cookies.set({
    name: COOKIE_NAME,
    value: "1",
    httpOnly: true,
    sameSite: "lax",
    secure: false, // en prod puedes poner true si estás en https
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });

  return res;
}