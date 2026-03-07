// ════════════════════════════════════════════════════════════
//  ABOUT PAGE — Information about ZENOVA company
// ════════════════════════════════════════════════════════════

// ─── 1. ABOUT COMPONENT ─────────────────────────────────────
function About() {
  // ─── 2. UI ────────────────────────────────────────────────
  return (
    <div className="p-8 max-w-2xl mx-auto text-center">
      {/* ZENOVA Logo */}
      <div className="text-4xl font-bold text-blue-400 tracking-widest mb-4">
        ZEN<span className="text-white">OVA</span>
      </div>

      {/* Company Description */}
      <p className="text-gray-300 text-lg mb-6">
        ZENOVA is a healthcare digital agency based in Islamabad, Pakistan. We
        build modern websites and digital solutions for doctors, clinics,
        pharmacies and hospitals.
      </p>

      {/* Contact Info Card */}
      <div className="bg-gray-800 rounded-xl p-6">
        <p className="text-gray-400 mb-2">📍 Blue Area, Islamabad</p>
        <p className="text-gray-400 mb-2">📞 +92 334 739 3393</p>
        <p className="text-gray-400">✉️ zenova.solutions@gmail.com</p>
      </div>
    </div>
  );
  // ── END OF UI ──────────────────────────────────────────────
}
// ── END OF ABOUT COMPONENT ──────────────────────────────────

// ─── 3. EXPORT ──────────────────────────────────────────────
export default About;
