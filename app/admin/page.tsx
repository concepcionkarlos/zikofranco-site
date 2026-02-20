import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function AdminPage() {
  const bookings = await prisma.bookingRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Booking Requests
      </h1>

      {bookings.length === 0 ? (
        <p>No booking requests yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
          {bookings.map((booking) => (
            <div
              key={booking.id}
              style={{
                border: "1px solid #333",
                padding: "20px",
                borderRadius: "10px",
                background: "#111",
              }}
            >
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>City/Venue:</strong> {booking.cityVenue}</p>
              <p><strong>Event Date:</strong> {booking.eventDate}</p>
              <p><strong>Details:</strong> {booking.details}</p>
              <p style={{ fontSize: "12px", opacity: 0.6 }}>
                Created: {booking.createdAt.toString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}