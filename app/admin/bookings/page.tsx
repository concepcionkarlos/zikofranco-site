// app/admin/bookings/page.tsx
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default async function AdminBookingsPage() {
  const bookings = await prisma.bookingRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 300,
  });

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 900 }}>Bookings</div>
          <div style={{ fontSize: 12, opacity: 0.65 }}>
            Showing latest {bookings.length} requests.
          </div>
        </div>
      </div>

      <div style={card}>
        {bookings.length === 0 ? (
          <div style={{ opacity: 0.7 }}>No booking requests yet.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ textAlign: "left", opacity: 0.8 }}>
                  <th style={th}>Created</th>
                  <th style={th}>Name</th>
                  <th style={th}>Email</th>
                  <th style={th}>City/Venue</th>
                  <th style={th}>Date</th>
                  <th style={th}>Opt-in</th>
                  <th style={th}></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <td style={td}>{new Date(b.createdAt).toLocaleString()}</td>
                    <td style={td}>{b.name}</td>
                    <td style={td}>{b.email}</td>
                    <td style={td}>{b.cityVenue}</td>
                    <td style={td}>{b.eventDate}</td>
                    <td style={td}>{b.marketingOptIn ? "✅" : "—"}</td>
                    <td style={{ ...td, textAlign: "right" }}>
                      <a href={`/admin/bookings/${encodeURIComponent(b.id)}`} style={viewBtn}>View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const card: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.03)",
  borderRadius: 16,
  padding: 16,
};

const th: React.CSSProperties = { padding: "10px 8px", fontSize: 12, letterSpacing: 0.5 };
const td: React.CSSProperties = { padding: "12px 8px", verticalAlign: "top" };

const viewBtn: React.CSSProperties = {
  textDecoration: "none",
  color: "white",
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  padding: "8px 10px",
  borderRadius: 12,
  fontSize: 13,
};