import { cookies } from "next/headers";

const COOKIE_NAME = process.env.ADMIN_COOKIE_NAME || "zf_admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = Boolean((await cookies()).get(COOKIE_NAME)?.value);

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "white" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 18,
          }}
        >
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 1 }}>
              Ziko Franco — Admin
            </div>
            <div style={{ fontSize: 12, opacity: 0.65 }}>
              Dashboard & Requests
            </div>
          </div>

          {/* Solo mostrar nav si hay sesión */}
          {isLoggedIn ? (
            <nav style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="/admin" style={navBtn}>Dashboard</a>
              <a href="/admin/bookings" style={navBtn}>Bookings</a>
              <a href="/" style={navBtn}>Back to site</a>
              <a href="/admin/logout" style={dangerBtn}>Logout</a>
            </nav>
          ) : null}
        </div>

        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.08)",
            marginBottom: 18,
          }}
        />
        {children}
      </div>
    </main>
  );
}

const navBtn: React.CSSProperties = {
  textDecoration: "none",
  color: "white",
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.04)",
  padding: "10px 12px",
  borderRadius: 12,
  fontSize: 14,
  opacity: 0.9,
};

const dangerBtn: React.CSSProperties = {
  ...navBtn,
  border: "1px solid rgba(255,80,80,0.35)",
  background: "rgba(255,80,80,0.12)",
};