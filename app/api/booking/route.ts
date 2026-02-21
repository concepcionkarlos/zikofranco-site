// app/api/booking/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs"; // Prisma requires Node runtime

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
  eventDate?: string; // "YYYY-MM-DD" from <input type="date">
  details?: string;

  // Accept BOTH names (front-end uses optIn, older code used marketingOptIn)
  optIn?: boolean;
  marketingOptIn?: boolean;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BookingBody;

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const cityVenue = (body.cityVenue ?? "").trim();
    const eventDate = (body.eventDate ?? "").trim();
    const details = (body.details ?? "").trim();

    // ✅ Works with both: optIn OR marketingOptIn
    const optIn = Boolean(body.optIn ?? body.marketingOptIn ?? false);

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    // ✅ Store clean details (do NOT append opt-in text)
    const created = await prisma.bookingRequest.create({
      data: {
        name,
        email,
        cityVenue,
        eventDate,
        details,
      },
    });

    // ✅ Return optIn to the client (useful for UI, logs, future automation)
    return NextResponse.json({ ok: true, id: created.id, optIn });
  } catch (err: any) {
    console.error("BOOKING_API_ERROR:", err?.message || err, err);
    return NextResponse.json(
      { ok: false, error: "Server error creating booking request." },
      { status: 500 }
    );
  }
}