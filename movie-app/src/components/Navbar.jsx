// ════════════════════════════════════════════════════════════
//  NAVBAR COMPONENT — Top navigation bar
//  Contains: ZENOVA logo, navigation links
//  Uses: Link from react-router-dom (no page reload!)
// ════════════════════════════════════════════════════════════

// ─── 1. IMPORTS ─────────────────────────────────────────────
// Link → like <a> tag but no page reload
// useLocation → tells us which page we are on (for active style)
import { Link, useLocation } from "react-router-dom";

// ─── 2. NAVBAR COMPONENT ────────────────────────────────────
function Navbar() {
  // ─── 3. CURRENT LOCATION ──────────────────────────────────
  // useLocation gives us the current URL path
  // Example: { pathname: "/favorites" }
  const location = useLocation();

  // ─── 4. UI ────────────────────────────────────────────────
  return (
    <nav className="bg-gray-800 px-8 py-4 flex items-center justify-between">
      {/* ── ZENOVA Logo ───────────────────────────────────── */}
      {/* Link to="/" → clicking logo goes to home page */}
      <Link to="/">
        <div className="text-2xl font-bold text-blue-400 tracking-widest">
          ZEN<span className="text-white">OVA</span>
        </div>
      </Link>

      {/* ── NAV LINKS ─────────────────────────────────────── */}
      <div className="flex gap-6">
        {/* Home Link */}
        {/* If current path is "/" → text-white (active) else text-gray-400 */}
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "text-white font-bold"
              : "text-gray-400 hover:text-white transition-all"
          }
        >
          🎬 Home
        </Link>

        {/* Favorites Link */}
        <Link
          to="/favorites"
          className={
            location.pathname === "/favorites"
              ? "text-white font-bold"
              : "text-gray-400 hover:text-white transition-all"
          }
        >
          ❤️ Favorites
        </Link>

        {/* About Link */}
        <Link
          to="/about"
          className={
            location.pathname === "/about"
              ? "text-white font-bold"
              : "text-gray-400 hover:text-white transition-all"
          }
        >
          ℹ️ About
        </Link>
      </div>
    </nav>
  );
  // ── END OF UI ──────────────────────────────────────────────
}
// ── END OF NAVBAR COMPONENT ─────────────────────────────────

// ─── 5. EXPORT ──────────────────────────────────────────────
export default Navbar;
