// app/api/booking/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs"; // Prisma necesita Node runtime

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

type BookingBody = {
  name?: string;
  email?: string;
  cityVenue?: string;
  eventDate?: string;
  details?: string;
  marketingOptIn?: boolean;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BookingBody;

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const cityVenue = (body.cityVenue ?? "").trim();
    const eventDate = (body.eventDate ?? "").trim();
    const detailsRaw = (body.details ?? "").trim();
    const marketingOptIn = Boolean(body.marketingOptIn);

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    // ✅ SIN MIGRACIÓN: guardamos el opt-in dentro de details (temporalmente)
    const details = marketingOptIn
      ? `${detailsRaw}\n\n[Marketing opt-in: YES]`
      : detailsRaw;

    const created = await prisma.bookingRequest.create({
      data: {
        name,
        email,
        cityVenue,
        eventDate,
        details,
      },
    });

    return NextResponse.json({ ok: true, id: created.id });
  } catch (err: any) {
    console.error("BOOKING_API_ERROR:", err?.message || err, err);
    return NextResponse.json(
      { ok: false, error: "Server error creating booking request." },
      { status: 500 }
    );
  }
}