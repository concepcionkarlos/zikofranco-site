"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [status, setStatus] = useState<
    { type: "idle" } | { type: "loading" } | { type: "err"; msg: string }
  >({ type: "idle" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setStatus({ type: "err", msg: "Please enter username and password." });
      return;
    }

    setStatus({ type: "loading" });

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setStatus({ type: "err", msg: "Invalid credentials." });
        return;
      }

      window.location.href = next;
    } catch {
      setStatus({ type: "err", msg: "Login failed. Please try again." });
    }
  };

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "70vh" }}>
      <form
        onSubmit={onSubmit}
        style={{
          width: "min(460px, 92vw)",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.03)",
          borderRadius: 16,
          padding: 18,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 900 }}>Admin — Sign in</div>
        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
          Admin access only.
        </div>

        <div style={{ marginTop: 14 }}>
          <label style={label}>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            style={input}
            placeholder="Enter username"
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <label style={label}>Password</label>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              style={{ ...input, flex: 1 }}
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              style={smallBtn}
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          style={primaryBtn}
          disabled={status.type === "loading"}
        >
          {status.type === "loading" ? "Signing in..." : "Sign in"}
        </button>

        {status.type === "err" ? <div style={errBox}>{status.msg}</div> : null}

        <a href="/" style={linkBtn}>
          Back to site
        </a>
      </form>
    </div>
  );
}

const label: React.CSSProperties = { fontSize: 12, opacity: 0.8 };

const input: React.CSSProperties = {
  width: "100%",
  marginTop: 6,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(0,0,0,0.25)",
  padding: "10px 12px",
  color: "white",
  outline: "none",
};

const primaryBtn: React.CSSProperties = {
  width: "100%",
  marginTop: 14,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.22)",
  background: "rgba(255,255,255,0.10)",
  padding: "10px 12px",
  color: "white",
  fontWeight: 800,
  cursor: "pointer",
};

const linkBtn: React.CSSProperties = {
  display: "block",
  textAlign: "center",
  marginTop: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  padding: "10px 12px",
  color: "white",
  textDecoration: "none",
  opacity: 0.9,
};

const smallBtn: React.CSSProperties = {
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  padding: "10px 12px",
  color: "white",
  cursor: "pointer",
};

const errBox: React.CSSProperties = {
  marginTop: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,80,80,0.25)",
  background: "rgba(255,80,80,0.12)",
  padding: "10px 12px",
  fontSize: 13,
};