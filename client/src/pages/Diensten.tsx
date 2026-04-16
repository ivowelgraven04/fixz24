/* ============================================================
   FIXZ24 — Diensten Page (Futuristic Upgrade)
   ============================================================ */

import Layout from "@/components/Layout";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, FileText, Calculator, Users, TrendingUp, BarChart3, Shield } from "lucide-react";
import { useEffect, useRef } from "react";
import ServiceIllustration from "@/components/ServiceIllustration";

type IllustrationVariant = "admin" | "tax" | "payroll" | "report" | "advice" | "starter";

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

type Service = {
  icon: typeof FileText;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  illustration: IllustrationVariant;
  accent: string;
};

const services: Service[] = [
  {
    icon: FileText,
    title: "Financiële administratie",
    subtitle: "De basis van uw bedrijf",
    desc: "Wij verwerken al uw financiële transacties nauwkeurig en tijdig. Van inkoopfacturen tot verkoopfacturen, bankafschriften en kasboek — alles wordt bijgehouden in een modern boekhoudpakket.",
    features: [
      "Verwerking van alle in- en verkoopfacturen",
      "Bankafschriften en kasboek bijhouden",
      "Debiteuren- en crediteurenadministratie",
      "Maandelijkse rapportages en overzichten",
      "Toegang tot online klantportaal",
    ],
    illustration: "admin",
    accent: "#464888",
  },
  {
    icon: Calculator,
    title: "Belastingadvies & BTW",
    subtitle: "Altijd compliant, nooit te veel",
    desc: "Wij zorgen voor correcte en tijdige belastingaangiften. Van kwartaallijkse BTW-aangiften tot de jaarlijkse inkomstenbelasting of vennootschapsbelasting — wij regelen het volledig.",
    features: [
      "Kwartaallijkse BTW-aangiften",
      "Inkomstenbelasting (IB-aangifte)",
      "Vennootschapsbelasting (VPB)",
      "Belastingadvies op maat",
      "Bezwaar en correspondentie met Belastingdienst",
    ],
    illustration: "tax",
    accent: "#ac9773",
  },
  {
    icon: Users,
    title: "Salarisverwerking",
    subtitle: "Uw medewerkers, correct betaald",
    desc: "Volledige loonadministratie voor uw medewerkers. Wij berekenen de salarissen, verzorgen de loonstroken en dragen zorg voor tijdige afdrachten aan de Belastingdienst.",
    features: [
      "Maandelijkse salarisberekeningen",
      "Loonstroken en jaaropgaven",
      "Loonaangiften bij Belastingdienst",
      "Verwerking van verlof en ziekte",
      "Advies over arbeidsvoorwaarden",
    ],
    illustration: "payroll",
    accent: "#5a5ca8",
  },
  {
    icon: TrendingUp,
    title: "Jaarrekening & rapportage",
    subtitle: "Inzicht in uw financiële positie",
    desc: "Aan het einde van elk boekjaar stellen wij uw jaarrekening op. Wij zorgen voor een heldere balans, winst- en verliesrekening en alle bijbehorende toelichtingen.",
    features: [
      "Volledige jaarrekening opstellen",
      "Balans en winst- en verliesrekening",
      "Deponering bij KvK indien vereist",
      "Toelichting en analyse van resultaten",
      "Advies voor het nieuwe boekjaar",
    ],
    illustration: "report",
    accent: "#464888",
  },
  {
    icon: BarChart3,
    title: "Financieel advies",
    subtitle: "Strategisch meedenken",
    desc: "Naast de dagelijkse administratie denken wij proactief mee over uw financiële strategie. Van cashflow-planning tot investeringsadvies — wij zijn uw financiële sparringpartner.",
    features: [
      "Cashflow-planning en prognoses",
      "Investeringsadvies",
      "Financieringsmogelijkheden",
      "Bedrijfsstructuur optimalisatie",
      "Kwartaalgesprekken over uw cijfers",
    ],
    illustration: "advice",
    accent: "#ac9773",
  },
  {
    icon: Shield,
    title: "Starterspakket",
    subtitle: "De juiste basis van dag één",
    desc: "Net gestart als ondernemer? Wij helpen u met de juiste inrichting van uw administratie, KvK-inschrijving, BTW-registratie en alle andere zaken die bij het starten van een bedrijf komen kijken.",
    features: [
      "Begeleiding bij KvK-inschrijving",
      "BTW-registratie en eerste aangifte",
      "Inrichting van uw administratie",
      "Uitleg over fiscale verplichtingen",
      "Gratis startersgesprek",
    ],
    illustration: "starter",
    accent: "#5a5ca8",
  },
];

export default function Diensten() {
  const s1 = useScrollReveal();
  const s2 = useScrollReveal();
  const s3 = useScrollReveal();

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f5f5f8 0%, #eeeef5 100%)" }}>
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="orb w-96 h-96 right-[-100px] top-[-100px] opacity-10" style={{ background: "radial-gradient(circle, #464888, transparent)" }} />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="section-label">Onze diensten</span>
            <h1 className="text-4xl md:text-5xl mt-2 mb-6" style={{ color: "#1a1a2e" }}>
              Alles voor uw <span className="gradient-text">financiële administratie</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Van dagelijkse boekhouding tot strategisch advies — wij bieden een compleet pakket aan financiële diensten voor iedere ondernemer.
            </p>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-8 bg-white" ref={s1}>
        <div className="container">
          {services.map((service, index) => (
            <section
              key={service.title}
              className={`py-20 ${index < services.length - 1 ? "border-b border-border/50" : ""}`}
            >
              <div className={`grid md:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                {/* Content */}
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${service.accent}, ${service.accent}99)` }}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="section-label">{service.subtitle}</div>
                    </div>
                  </div>
                  <h2 className="text-3xl mb-4" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>{service.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.desc}</p>
                  <ul className="space-y-2.5 mb-8">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 group">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${service.accent}, ${service.accent}88)` }}>
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm" style={{ color: "#1a1a2e" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary">
                    Meer informatie <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Illustration */}
                <div className={`${index % 2 === 1 ? "md:order-1" : ""} relative`}>
                  <div className="rounded-2xl overflow-hidden card-3d aspect-[4/3] relative" style={{ boxShadow: "0 20px 60px rgba(70,72,136,0.12)" }}>
                    <ServiceIllustration variant={service.illustration} />
                    {/* Subtle accent glow */}
                    <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: `linear-gradient(135deg, ${service.accent}0F, transparent 60%)` }} />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -right-4 glass-card rounded-xl p-4 shadow-xl" style={{ border: `1px solid ${service.accent}20` }}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${service.accent}15` }}>
                        <service.icon className="w-4 h-4" style={{ color: service.accent }} />
                      </div>
                      <div>
                        <div className="text-xs font-bold" style={{ color: "#1a1a2e" }}>Inbegrepen</div>
                        <div className="text-xs text-muted-foreground">in uw pakket</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden" ref={s3} style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2e3060 100%)" }}>
        <div className="absolute inset-0 tech-grid opacity-15" />
        <div className="orb w-80 h-80 right-[-80px] bottom-[-80px] opacity-15" style={{ background: "radial-gradient(circle, #ac9773, transparent)" }} />
        <div className="container relative z-10 text-center">
          <span className="section-label text-[#c4b08e]/80 mb-4 block">Interesse in onze diensten?</span>
          <h2 className="text-3xl md:text-4xl text-white mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Neem contact op voor een vrijblijvend gesprek
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Wij bespreken graag wat wij voor u kunnen betekenen.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #ac9773, #c4b08e)", color: "white", boxShadow: "0 8px 30px rgba(172,151,115,0.35)" }}
          >
            Gratis kennismaking <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
