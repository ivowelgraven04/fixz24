/* ============================================================
   FIXZ24 — Cookie Consent Banner
   ============================================================ */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X } from "lucide-react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("fixz24-cookie-consent");
    if (!consent) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("fixz24-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("fixz24-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div
        className="max-w-4xl mx-auto rounded-xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4"
        style={{ backgroundColor: "#1a1a2e", color: "white" }}
      >
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-1">Wij gebruiken cookies</h4>
          <p className="text-xs text-white/70 leading-relaxed">
            We gebruiken functionele en analytische cookies om de website goed te laten werken en te verbeteren.{" "}
            <Link href="/cookiebeleid" className="underline text-white/90 hover:text-white">
              Meer informatie
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="text-xs text-white/60 hover:text-white transition-colors px-3 py-2"
          >
            Weigeren
          </button>
          <button
            onClick={accept}
            className="text-xs font-semibold px-4 py-2 rounded-md transition-all hover:scale-105"
            style={{ backgroundColor: "#ac9773", color: "white" }}
          >
            Accepteren
          </button>
          <button
            onClick={decline}
            className="p-1 text-white/40 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
