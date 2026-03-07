// ════════════════════════════════════════════════════════════
//  APP.JSX — Root component, sets up routing
//  All pages and navigation are connected here
// ════════════════════════════════════════════════════════════

// ─── 1. IMPORTS ─────────────────────────────────────────────
// BrowserRouter → wraps entire app, enables routing
// Routes        → container that holds all Route definitions
// Route         → maps a URL path to a component/page
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ─── 2. IMPORT COMPONENTS ───────────────────────────────────
import Navbar from "./components/Navbar"; // top navigation bar

// ─── 3. IMPORT PAGES ────────────────────────────────────────
import Home from "./pages/Home"; // / → home page
import Favorites from "./pages/Favorites"; // /favorites → favorites page
import About from "./pages/About"; // /about → about page

// ─── 4. APP COMPONENT ───────────────────────────────────────
function App() {
  // ─── 5. UI ────────────────────────────────────────────────
  return (
    // BrowserRouter → must wrap everything for routing to work
    <BrowserRouter>
      {/* Dark background for entire app */}
      <div className="min-h-screen bg-gray-900 text-white">
        {/* ── Navbar shows on ALL pages ─────────────────── */}
        <Navbar />

        {/* ── Routes — only ONE route renders at a time ─── */}
        <Routes>
          {/* / → Home page */}
          <Route path="/" element={<Home />} />

          {/* /favorites → Favorites page */}
          <Route path="/favorites" element={<Favorites />} />

          {/* /about → About page */}
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
  // ── END OF UI ──────────────────────────────────────────────
}
// ── END OF APP COMPONENT ────────────────────────────────────

// ─── 6. EXPORT ──────────────────────────────────────────────
export default App;
