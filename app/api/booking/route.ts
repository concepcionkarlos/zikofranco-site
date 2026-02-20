import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs";

// Evita múltiples conexiones en dev (hot reload)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // log: ["query", "error", "warn"], // opcional
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const created = await prisma.bookingRequest.create({
      data: {
        name: body.name,
        email: body.email,
        cityVenue: body.cityVenue ?? null,
        eventDate: body.eventDate ?? null,
        details: body.details ?? null,
      },
    });

    return NextResponse.json({ ok: true, created });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Failed to create booking request" },
      { status: 500 }
    );
  }
}