// ════════════════════════════════════════════════════════════
//  FAVORITES PAGE — Shows user's saved favorite movies
//  Currently empty — we will add favorites feature later
// ════════════════════════════════════════════════════════════

// ─── 1. FAVORITES COMPONENT ─────────────────────────────────
function Favorites() {
  // ─── 2. UI ────────────────────────────────────────────────
  return (
    <div className="p-8 text-center">
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-4">❤️ My Favorites</h2>

      {/* Empty state message */}
      <p className="text-gray-400">No favorites yet. Go search some movies!</p>
    </div>
  );
  // ── END OF UI ──────────────────────────────────────────────
}
// ── END OF FAVORITES COMPONENT ──────────────────────────────

// ─── 3. EXPORT ──────────────────────────────────────────────
export default Favorites;
