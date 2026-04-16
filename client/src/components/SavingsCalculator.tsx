/* ============================================================
   FIXZ24 — Savings Calculator
   User enters current boekhouder cost, sees savings per package
   ============================================================ */

import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Coins, TrendingDown } from "lucide-react";

const PACKAGES = [
  { name: "Starter", price: 79, color: "#464888" },
  { name: "Groei", price: 149, color: "#ac9773" },
  { name: "Premium", price: 249, color: "#5a5ca8" },
] as const;

function formatEuro(n: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

export default function SavingsCalculator() {
  const [current, setCurrent] = useState(200);

  const rows = useMemo(() => {
    const maxDiff = Math.max(1, current - PACKAGES[0].price);
    return PACKAGES.map((p) => {
      const monthly = Math.max(0, current - p.price);
      const yearly = monthly * 12;
      const percentOfMax = maxDiff > 0 ? Math.min(1, monthly / maxDiff) : 0;
      return { ...p, monthly, yearly, percentOfMax, saves: monthly > 0 };
    });
  }, [current]);

  const bestPackage = rows.filter((r) => r.saves).sort((a, b) => b.yearly - a.yearly)[0];

  return (
    <div
      className="rounded-3xl overflow-hidden relative"
      style={{
        background: "linear-gradient(145deg, #1a1a2e 0%, #2e3060 100%)",
        boxShadow: "0 20px 60px rgba(70,72,136,0.2)",
      }}
    >
      {/* Orb decoration */}
      <div className="orb w-64 h-64 right-[-60px] top-[-60px] opacity-20" style={{ background: "radial-gradient(circle, #ac9773, transparent)" }} />
      <div className="absolute inset-0 tech-grid opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #ac9773, transparent)" }} />

      <div className="relative z-10 p-8 md:p-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style={{ background: "rgba(172,151,115,0.15)" }}>
            <TrendingDown className="w-3.5 h-3.5" style={{ color: "#c4b08e" }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#c4b08e" }}>Bereken je besparing</span>
          </div>
          <h3 className="text-2xl md:text-3xl text-white mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
            Wat bespaar je met Fixz24?
          </h3>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            Vergelijk wat je nu betaalt met onze vaste maandprijzen.
          </p>
        </div>

        {/* Slider */}
        <div className="mb-10">
          <div className="flex items-baseline justify-between mb-3">
            <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>
              Jouw huidige kosten / maand
            </label>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold" style={{ color: "#c4b08e", fontFamily: "Playfair Display, serif" }}>
                {formatEuro(current)}
              </span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>/ mnd</span>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={500}
            step={5}
            value={current}
            onChange={(e) => setCurrent(Number(e.target.value))}
            className="savings-slider w-full"
            aria-label="Huidige maandkosten"
          />
          <div className="flex justify-between mt-2 text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span>€ 0</span>
            <span>€ 250</span>
            <span>€ 500+</span>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-3 mb-8">
          {rows.map((r) => (
            <div
              key={r.name}
              className="rounded-xl p-4 transition-all duration-300"
              style={{
                background: r.saves ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                border: `1px solid rgba(255,255,255,${r.saves ? 0.1 : 0.05})`,
                opacity: r.saves ? 1 : 0.55,
              }}
            >
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="text-base font-bold text-white" style={{ fontFamily: "Playfair Display, serif" }}>{r.name}</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{formatEuro(r.price)} / mnd</div>
                </div>
                <div className="text-right">
                  {r.saves ? (
                    <>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>Besparing</div>
                      <div className="text-lg font-bold" style={{ color: "#c4b08e", fontFamily: "Playfair Display, serif" }}>
                        {formatEuro(r.yearly)} / jaar
                      </div>
                    </>
                  ) : (
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Geen besparing bij deze invoer</span>
                  )}
                </div>
              </div>
              {/* Visual bar */}
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${r.percentOfMax * 100}%`,
                    background: `linear-gradient(90deg, ${r.color}, #c4b08e)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {bestPackage && (
          <div className="rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap" style={{ background: "rgba(172,151,115,0.15)", border: "1px solid rgba(172,151,115,0.25)" }}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #ac9773, #c4b08e)" }}>
                <Coins className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Bespaar tot {formatEuro(bestPackage.yearly)} per jaar
                </div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Met ons {bestPackage.name}-pakket t.o.v. je huidige kosten
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #ac9773, #c4b08e)", color: "white", boxShadow: "0 6px 16px rgba(172,151,115,0.4)" }}
            >
              Start je overstap
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
