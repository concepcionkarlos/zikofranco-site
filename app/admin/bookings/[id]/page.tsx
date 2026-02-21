// app/admin/bookings/[id]/page.tsx
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) notFound();

  const booking = await prisma.bookingRequest.findUnique({
    where: { id },
  });

  if (!booking) notFound();

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 900 }}>Booking Detail</div>
          <div style={{ fontSize: 12, opacity: 0.65 }}>ID: {booking.id}</div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="/admin/bookings" style={btn}>Back to bookings</a>
          <a href="/admin" style={btn}>Dashboard</a>
        </div>
      </div>

      <div style={card}>
        <Row label="Name" value={booking.name} />
        <Row label="Email" value={booking.email} />
        <Row label="City/Venue" value={booking.cityVenue || "—"} />
        <Row label="Event Date" value={booking.eventDate || "—"} />
        <Row label="Opt-in" value={booking.marketingOptIn ? "YES ✅" : "NO"} />

        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.65, marginBottom: 6 }}>Details</div>
          <div style={textarea}>{booking.details || "—"}</div>
        </div>

        <div style={{ fontSize: 12, opacity: 0.6, marginTop: 12 }}>
          Created: {new Date(booking.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        gap: 10,
        padding: "10px 0",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div style={{ fontWeight: 700, opacity: 0.85 }}>{label}:</div>
      <div style={{ opacity: 0.95 }}>{value}</div>
    </div>
  );
}

const card: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.03)",
  borderRadius: 16,
  padding: 16,
};

const btn: React.CSSProperties = {
  textDecoration: "none",
  color: "white",
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  padding: "10px 12px",
  borderRadius: 12,
  fontSize: 14,
  opacity: 0.95,
};

const textarea: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.25)",
  borderRadius: 12,
  padding: 12,
  whiteSpace: "pre-wrap",
};