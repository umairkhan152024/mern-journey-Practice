// ============================================
// FILE: app/layout.js
// ============================================

import "./globals.css";

// import Link from next/link
// this is Next.js built-in link component
// works like <Link> from react-router-dom
// but built into Next.js — no install needed
import Link from "next/link";

export const metadata = {
  title: "Dr. Ahmed Hassan Clinic",
  description: "Best clinic in Islamabad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav
          style={{
            backgroundColor: "#1a1a2e",
            padding: "16px 40px",
            display: "flex",
            gap: "24px",
            alignItems: "center",
            fontFamily: "sans-serif",
          }}
        >
          <span
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: "16px",
              marginRight: "16px",
            }}
          >
            Dr. Ahmed Clinic
          </span>

          {/* =============================================
              Link from next/link
              =============================================
              href="/about" instead of to="/about"
              (small difference from React Router)

              no page refresh
              instant navigation
              state stays alive
              ============================================= */}
          <Link
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Home
          </Link>

          <Link
            href="/about"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            About
          </Link>

          <Link
            href="/doctors"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Doctors
          </Link>
        </nav>

        {children}
      </body>
    </html>
  );
}
