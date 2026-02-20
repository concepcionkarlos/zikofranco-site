import { NextResponse } from "next/server"
import { PrismaClient } from "@/app/generated/prisma"

export const runtime = "nodejs"

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

const prisma =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const created = await prisma.bookingRequest.create({
      data: {
        name: body.name,
        email: body.email,
        cityVenue: body.cityVenue || null,
        eventDate: body.eventDate || null,
        details: body.details || null,
      },
    })

    return NextResponse.json({ ok: true, created })
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to save request" },
      { status: 500 }
    )
  }
}