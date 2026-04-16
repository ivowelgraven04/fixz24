/* ============================================================
   FIXZ24 — Tarieven Page (Futuristic Upgrade)
   ============================================================ */

import Layout from "@/components/Layout";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import PriceWizard from "@/components/PriceWizard";
import SavingsCalculator from "@/components/SavingsCalculator";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.querySelectorAll(".fade-up").forEach((t) => t.classList.add("visible")); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const packages = [
  {
    name: "Starter",
    price: "€ 79",
    period: "/ maand",
    desc: "Ideaal voor ZZP'ers die net starten",
    features: [
      "Volledige boekhouding",
      "Kwartaallijkse BTW-aangifte",
      "Jaarrekening",
      "Inkomstenbelasting",
      "E-mail support",
      "Online klantportaal",
    ],
    highlight: false,
    badge: null,
  },
  {
    name: "Groei",
    price: "€ 149",
    period: "/ maand",
    desc: "Voor groeiende ondernemingen",
    features: [
      "Alles in Starter",
      "Salarisverwerking (t/m 3 medewerkers)",
      "Maandelijkse rapportages",
      "Telefonisch advies",
      "Kwartaalgesprek",
      "Prioriteit support",
    ],
    highlight: true,
    badge: "Meest gekozen",
  },
  {
    name: "Premium",
    price: "€ 249",
    period: "/ maand",
    desc: "Voor BV's en grotere bedrijven",
    features: [
      "Alles in Groei",
      "Salarisverwerking (onbeperkt)",
      "Vennootschapsbelasting",
      "Financieel advies op maat",
      "Maandelijks gesprek",
      "Dedicated accountmanager",
    ],
    highlight: false,
    badge: null,
  },
];

const extras = [
  { service: "Aanvullende salarisstrook", price: "€ 15" },
  { service: "Bezwaarschrift Belastingdienst", price: "€ 125" },
  { service: "Tussentijdse jaarrekening", price: "€ 195" },
  { service: "Adviesgesprek (per uur)", price: "€ 95" },
  { service: "KvK-inschrijving begeleiding", price: "€ 75" },
  { service: "Eenmalige opschoning administratie", price: "Op aanvraag" },
];

export default function Tarieven() {
  const s1 = useScrollReveal();
  const s2 = useScrollReveal();
  const s3 = useScrollReveal();
  const s4 = useScrollReveal();

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f5f5f8 0%, #eeeef5 100%)" }}>
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="orb w-96 h-96 right-[-100px] top-[-100px] opacity-10" style={{ background: "radial-gradient(circle, #464888, transparent)" }} />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="section-label">Tarieven</span>
            <h1 className="text-4xl md:text-5xl mt-2 mb-6" style={{ color: "#1a1a2e" }}>
              Transparante <span className="gradient-text">vaste prijzen</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Geen verborgen kosten, geen uurtje-factuurtje. U weet precies wat u betaalt en wat u daarvoor krijgt. Alle prijzen zijn exclusief 21% BTW.
            </p>
          </div>
        </div>
      </section>

      {/* ── Wizard + Calculator ── */}
      <section className="py-20 bg-white relative">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <PriceWizard />
            <SavingsCalculator />
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section id="pakketten" className="py-24 bg-white relative overflow-hidden scroll-mt-24" ref={s1}>
        <div className="orb w-96 h-96 left-[-150px] bottom-[-100px] opacity-5" style={{ background: "radial-gradient(circle, #464888, transparent)" }} />
        <div className="container relative z-10">
          <div className="text-center mb-14">
            <span className="section-label fade-up">Maandpakketten</span>
            <h2 className="text-3xl md:text-4xl mt-2 fade-up delay-100" style={{ color: "#1a1a2e" }}>Kies uw pakket</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packages.map((pkg, i) => (
              <div
                key={pkg.name}
                className={`fade-up delay-${(i + 1) * 100} rounded-2xl p-8 relative overflow-hidden transition-all duration-400 hover:scale-[1.03]`}
                style={pkg.highlight
                  ? { background: "linear-gradient(135deg, #464888 0%, #2e3060 100%)", boxShadow: "0 20px 60px rgba(70,72,136,0.35)" }
                  : { background: "white", border: "1px solid rgba(70,72,136,0.1)", boxShadow: "0 4px 20px rgba(70,72,136,0.06)" }
                }
              >
                {/* Popular badge */}
                {pkg.badge && (
                  <div className="absolute top-5 right-5 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: "#ac9773", color: "white" }}>
                    <Star className="w-3 h-3 fill-current" />
                    {pkg.badge}
                  </div>
                )}

                {/* Package name */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1" style={{ color: pkg.highlight ? "white" : "#1a1a2e", fontFamily: "Playfair Display, serif" }}>{pkg.name}</h3>
                  <p className="text-sm" style={{ color: pkg.highlight ? "rgba(255,255,255,0.65)" : "#888" }}>{pkg.desc}</p>
                </div>

                {/* Price */}
                <div className="mb-8 pb-6" style={{ borderBottom: `1px solid ${pkg.highlight ? "rgba(255,255,255,0.15)" : "rgba(70,72,136,0.08)"}` }}>
                  <span className="text-5xl font-bold" style={{ color: pkg.highlight ? "#c4b08e" : "#464888", fontFamily: "Playfair Display, serif" }}>{pkg.price}</span>
                  <span className="text-sm ml-2" style={{ color: pkg.highlight ? "rgba(255,255,255,0.55)" : "#888" }}>{pkg.period}</span>
                  <div className="text-xs mt-1" style={{ color: pkg.highlight ? "rgba(255,255,255,0.45)" : "#aaa" }}>excl. BTW</div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm" style={{ color: pkg.highlight ? "rgba(255,255,255,0.85)" : "#444" }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: pkg.highlight ? "rgba(172,151,115,0.3)" : "rgba(70,72,136,0.08)" }}>
                        <CheckCircle2 className="w-3 h-3" style={{ color: pkg.highlight ? "#c4b08e" : "#464888" }} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="block w-full text-center py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                  style={pkg.highlight
                    ? { background: "linear-gradient(135deg, #ac9773, #c4b08e)", color: "white", boxShadow: "0 6px 20px rgba(172,151,115,0.4)" }
                    : { background: "linear-gradient(135deg, #464888, #2e3060)", color: "white", boxShadow: "0 6px 20px rgba(70,72,136,0.25)" }
                  }
                >
                  Kies {pkg.name}
                </Link>

                {/* Shimmer bottom */}
                {pkg.highlight && <div className="absolute bottom-0 left-0 right-0 h-0.5 shimmer" style={{ background: "linear-gradient(90deg, transparent, #ac9773, transparent)" }} />}
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-10 fade-up delay-400">
            Alle prijzen zijn exclusief 21% BTW. Heeft u een specifieke situatie?{" "}
            <Link href="/contact" className="font-semibold hover:underline" style={{ color: "#464888" }}>
              Vraag een offerte op maat aan.
            </Link>
          </p>
        </div>
      </section>

      {/* ── Losse diensten ── */}
      <section className="py-24 bg-fixz-surface" ref={s2}>
        <div className="container max-w-4xl">
          <div className="text-center mb-14">
            <span className="section-label fade-up">Aanvullende diensten</span>
            <h2 className="text-3xl md:text-4xl mt-2 fade-up delay-100" style={{ color: "#1a1a2e" }}>Losse diensten</h2>
            <p className="text-muted-foreground mt-3 fade-up delay-200">Heeft u een specifieke behoefte buiten uw pakket? Wij bieden ook losse diensten aan.</p>
          </div>
          <div className="rounded-2xl overflow-hidden fade-up delay-200" style={{ border: "1px solid rgba(70,72,136,0.1)", boxShadow: "0 4px 20px rgba(70,72,136,0.06)" }}>
            {extras.map((item, i) => (
              <div
                key={item.service}
                className="flex items-center justify-between px-6 py-4 transition-colors duration-200 hover:bg-[rgba(70,72,136,0.03)]"
                style={{ borderBottom: i < extras.length - 1 ? "1px solid rgba(70,72,136,0.06)" : "none", background: i % 2 === 0 ? "white" : "rgba(245,245,248,0.5)" }}
              >
                <span className="text-sm font-medium" style={{ color: "#1a1a2e" }}>{item.service}</span>
                <span className="text-sm font-bold" style={{ color: "#464888", fontFamily: "Playfair Display, serif" }}>{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vergelijking ── */}
      <section className="py-24 bg-white" ref={s3}>
        <div className="container max-w-4xl">
          <div className="text-center mb-14">
            <span className="section-label fade-up">Vergelijking</span>
            <h2 className="text-3xl md:text-4xl mt-2 fade-up delay-100" style={{ color: "#1a1a2e" }}>Wat zit er in elk pakket?</h2>
          </div>
          <div className="rounded-2xl overflow-hidden fade-up delay-200" style={{ border: "1px solid rgba(70,72,136,0.1)", boxShadow: "0 4px 20px rgba(70,72,136,0.06)" }}>
            {/* Header */}
            <div className="grid grid-cols-4 px-6 py-4" style={{ background: "linear-gradient(135deg, #464888, #2e3060)" }}>
              <div className="text-sm font-semibold text-white/80">Dienst</div>
              {["Starter", "Groei", "Premium"].map((p) => (
                <div key={p} className="text-sm font-bold text-center text-white">{p}</div>
              ))}
            </div>
            {[
              { service: "Boekhouding", s: true, g: true, p: true },
              { service: "BTW-aangifte", s: true, g: true, p: true },
              { service: "Jaarrekening", s: true, g: true, p: true },
              { service: "Inkomstenbelasting", s: true, g: true, p: true },
              { service: "Salarisverwerking", s: false, g: true, p: true },
              { service: "Vennootschapsbelasting", s: false, g: false, p: true },
              { service: "Maandelijkse rapportages", s: false, g: true, p: true },
              { service: "Kwartaalgesprek", s: false, g: true, p: true },
              { service: "Dedicated accountmanager", s: false, g: false, p: true },
            ].map((row, i) => (
              <div key={row.service} className="grid grid-cols-4 px-6 py-3.5 transition-colors hover:bg-[rgba(70,72,136,0.02)]" style={{ borderBottom: "1px solid rgba(70,72,136,0.05)", background: i % 2 === 0 ? "white" : "rgba(245,245,248,0.4)" }}>
                <div className="text-sm" style={{ color: "#1a1a2e" }}>{row.service}</div>
                {[row.s, row.g, row.p].map((v, j) => (
                  <div key={j} className="flex justify-center">
                    {v
                      ? <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #464888, #ac9773)" }}><CheckCircle2 className="w-3 h-3 text-white" /></div>
                      : <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.06)" }}><span className="text-xs text-muted-foreground">—</span></div>
                    }
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden" ref={s4} style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2e3060 100%)" }}>
        <div className="absolute inset-0 tech-grid opacity-15" />
        <div className="orb w-80 h-80 right-[-80px] bottom-[-80px] opacity-15" style={{ background: "radial-gradient(circle, #ac9773, transparent)" }} />
        <div className="container relative z-10 text-center">
          <span className="section-label text-[#c4b08e]/80 mb-4 block">Twijfelt u nog?</span>
          <h2 className="text-3xl md:text-4xl text-white mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Gratis adviesgesprek
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Neem contact op en wij adviseren u gratis over het meest passende pakket voor uw situatie.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #ac9773, #c4b08e)", color: "white", boxShadow: "0 8px 30px rgba(172,151,115,0.35)" }}
          >
            Gratis adviesgesprek <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
