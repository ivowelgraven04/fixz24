/* ============================================================
   FIXZ24 — Home Page (Futuristic Upgrade)
   Design: Swiss Precision × Fintech Futurism
   Effects: Glasmorphism, 3D cards, orb glows, scroll reveal,
            gradient text, shimmer, floating elements
   ============================================================ */

import Layout from "@/components/Layout";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Shield,
  Clock,
  Users,
  Phone,
  ChevronDown,
  TrendingUp,
  FileText,
  Calculator,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const HERO_BG = "/images/hero-bg.webp";
const CTA_BG = "/images/cta-bg.webp";
const IMG_ADMIN = "/images/service-admin.webp";
const IMG_TAX = "/images/service-tax.webp";
const IMG_PAYROLL = "/images/service-payroll.webp";

const faqs = [
  { q: "Voor wie is Fixz24 geschikt?", a: "Fixz24 werkt voor ZZP'ers, VOF's, BV's en starters. Of je nu net begint of al jaren ondernemer bent — wij passen onze dienstverlening aan op jouw situatie." },
  { q: "Hoe snel kan ik starten?", a: "Na een eerste kennismaking kunnen we doorgaans binnen één week starten. We nemen de administratie van je over en zorgen voor een soepele overgang." },
  { q: "Wat kost jullie dienstverlening?", a: "We werken met vaste maandpakketten zodat je nooit voor verrassingen staat. Bekijk onze tarieven voor een volledig overzicht." },
  { q: "Kan ik mijn huidige administratie overzetten?", a: "Ja, wij verzorgen de volledige overstap. We nemen contact op met je vorige boekhouder en zorgen dat alles naadloos aansluit." },
  { q: "Werken jullie digitaal?", a: "Volledig. Via ons online portaal heb je altijd inzicht in je cijfers, kun je documenten uploaden en direct communiceren met je vaste contactpersoon." },
];

/* ── Scroll reveal hook ── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.querySelectorAll(".fade-up").forEach((t) => t.classList.add("visible")); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Animated counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── FAQ Item ── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-border transition-all duration-300 ${open ? "bg-gradient-to-r from-[rgba(70,72,136,0.03)] to-transparent" : ""}`}>
      <button className="w-full flex items-center justify-between py-5 text-left gap-4" onClick={() => setOpen(!open)}>
        <span className="font-semibold text-base" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>{q}</span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${open ? "rotate-180" : ""}`} style={{ backgroundColor: open ? "#464888" : "rgba(70,72,136,0.1)" }}>
          <ChevronDown className="w-3.5 h-3.5" style={{ color: open ? "white" : "#464888" }} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pb-5" : "max-h-0"}`}>
        <p className="text-sm leading-relaxed text-muted-foreground">{a}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on hero
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 10 });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const s1 = useScrollReveal();
  const s2 = useScrollReveal();
  const s3 = useScrollReveal();
  const s4 = useScrollReveal();
  const s5 = useScrollReveal();
  const s6 = useScrollReveal();

  return (
    <Layout>
      {/* ══════════════════════════════════════════
          HERO — Glasmorphism + Orb Glows + Parallax
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[95vh] flex items-center overflow-hidden"
        style={{ backgroundImage: `url(${HERO_BG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/96 via-white/85 to-white/20" />
        {/* Tech grid */}
        <div className="absolute inset-0 tech-grid opacity-50" />

        {/* Orb glows */}
        <div className="orb w-96 h-96 top-[-80px] right-[5%] opacity-20" style={{ background: "radial-gradient(circle, #464888, transparent)", transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`, transition: "transform 0.3s ease" }} />
        <div className="orb w-64 h-64 bottom-[10%] right-[20%] opacity-15" style={{ background: "radial-gradient(circle, #ac9773, transparent)", transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`, transition: "transform 0.4s ease" }} />
        <div className="orb w-48 h-48 top-[30%] right-[35%] opacity-10" style={{ background: "radial-gradient(circle, #5a5ca8, transparent)" }} />

        {/* Left accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: "linear-gradient(to bottom, transparent, #ac9773, transparent)" }} />

        <div className="container relative z-10">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 glass-card" style={{ animation: "scale-in 0.6s ease both" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#ac9773]" style={{ animation: "pulse-ring 2s infinite" }} />
              <span className="section-label" style={{ fontSize: "0.65rem" }}>Fixz24 Financial Services</span>
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{ color: "#1a1a2e", animation: "slide-in-left 0.8s ease both 0.1s" }}
            >
              Uw administratie,{" "}
              <span className="gradient-text">geregeld.</span>
            </h1>

            <p
              className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl"
              style={{ animation: "slide-in-left 0.8s ease both 0.25s" }}
            >
              Wij ontzorgen ZZP'ers, VOF's en BV's met professionele administratie, belastingadvies en salarisverwerking. Persoonlijk, betrouwbaar en altijd bereikbaar.
            </p>

            <div className="flex flex-wrap gap-4 mb-12" style={{ animation: "slide-in-left 0.8s ease both 0.4s" }}>
              <Link href="/contact" className="btn-primary">
                Gratis kennismaking <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/diensten" className="btn-gold">
                <span>Bekijk diensten</span>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4" style={{ animation: "slide-in-left 0.8s ease both 0.55s" }}>
              {[
                { icon: Shield, text: "100% betrouwbaar" },
                { icon: Clock, text: "Altijd bereikbaar" },
                { icon: Users, text: "Persoonlijk contact" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card">
                  <Icon className="w-3.5 h-3.5" style={{ color: "#ac9773" }} />
                  <span className="text-xs font-semibold" style={{ color: "#464888" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating glass card — right side */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block float-anim"
          style={{ animation: "slide-in-right 0.9s ease both 0.6s, float 6s ease-in-out 1.5s infinite" }}
        >
          <div className="glass-card rounded-2xl p-6 w-64 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #464888, #5a5ca8)" }}>
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold" style={{ color: "#1a1a2e" }}>Jaarresultaat</div>
                <div className="text-xs text-muted-foreground">2024 overzicht</div>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1" style={{ color: "#464888", fontFamily: "Playfair Display, serif" }}>€ 84.2k</div>
            <div className="text-xs text-green-600 font-semibold mb-3">↑ 12.4% vs vorig jaar</div>
            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full shimmer" style={{ width: "72%", background: "linear-gradient(90deg, #464888, #ac9773)" }} />
            </div>
            <div className="text-xs text-muted-foreground mt-1.5">72% van jaardoel bereikt</div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "60px" }}>
            <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="#f5f5f8" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DOELGROEPEN — 3D flip cards
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-fixz-surface" ref={s1}>
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-label fade-up">Voor wie</span>
            <h2 className="text-3xl md:text-4xl mt-2 fade-up delay-100" style={{ color: "#1a1a2e" }}>Wij werken voor</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { type: "ZZP", desc: "Zelfstandige ondernemer", detail: "Facturen, BTW, inkomstenbelasting — wij regelen het.", icon: FileText, delay: "delay-100" },
              { type: "VOF", desc: "Vennootschap onder firma", detail: "Gezamenlijke administratie, helder en overzichtelijk.", icon: Users, delay: "delay-200" },
              { type: "BV", desc: "Besloten vennootschap", detail: "Jaarrekening, loonadministratie en vennootschapsbelasting.", icon: TrendingUp, delay: "delay-300" },
              { type: "Starter", desc: "Net begonnen", detail: "Wij helpen je van dag één met de juiste basis.", icon: Calculator, delay: "delay-400" },
            ].map((item) => (
              <div
                key={item.type}
                className={`fade-up ${item.delay} doelgroep-card rounded-2xl p-6 text-center cursor-default`}
              >
                <div className="d-icon-wrap w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <item.icon className="d-icon w-6 h-6" />
                </div>
                <div className="d-type text-2xl font-bold mb-1" style={{ fontFamily: "Playfair Display, serif" }}>{item.type}</div>
                <div className="d-sub text-xs font-semibold uppercase tracking-wider mb-3">{item.desc}</div>
                <p className="d-detail text-xs leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          USP'S — Animated stats + checklist
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden" ref={s2}>
        {/* Background orb */}
        <div className="orb w-[600px] h-[600px] right-[-200px] top-[-100px] opacity-5" style={{ background: "radial-gradient(circle, #464888, transparent)" }} />

        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label fade-up">Waarom Fixz24</span>
              <h2 className="text-3xl md:text-4xl mt-2 mb-6 fade-up delay-100" style={{ color: "#1a1a2e" }}>Meer dan een boekhoudkantoor</h2>
              <p className="text-muted-foreground leading-relaxed mb-8 fade-up delay-200">
                Wij geloven dat financiële administratie geen last hoeft te zijn. Met Fixz24 krijg je een partner die meedenkt, proactief adviseert en altijd bereikbaar is.
              </p>
              <div className="space-y-3">
                {[
                  { text: "Vaste contactpersoon — altijd dezelfde persoon", d: "delay-200" },
                  { text: "Reactie binnen 24 uur gegarandeerd", d: "delay-300" },
                  { text: "Volledig digitaal — altijd en overal inzicht", d: "delay-300" },
                  { text: "Transparante vaste maandprijzen", d: "delay-400" },
                  { text: "Proactief advies, niet alleen verwerken", d: "delay-400" },
                ].map(({ text, d }) => (
                  <div key={text} className={`fade-up ${d} flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-[rgba(70,72,136,0.04)] group`}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg, #464888, #ac9773)" }}>
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium" style={{ color: "#1a1a2e" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Animated stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { target: 500, suffix: "+", label: "Tevreden klanten", d: "delay-100", icon: Users },
                { target: 10, suffix: "+", label: "Jaar ervaring", d: "delay-200", icon: TrendingUp },
                { target: 24, suffix: "u", label: "Reactietijd", d: "delay-300", icon: Clock },
                { target: 99, suffix: "%", label: "Klanttevredenheid", d: "delay-400", icon: Star },
              ].map((stat) => (
                <div key={stat.label} className={`fade-up ${stat.d} card-3d rounded-2xl p-6 text-center relative overflow-hidden`} style={{ background: "linear-gradient(135deg, #f5f5f8 0%, #eeeff5 100%)", boxShadow: "0 4px 20px rgba(70,72,136,0.06)" }}>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(70,72,136,0.08)" }}>
                    <stat.icon className="w-4 h-4" style={{ color: "#464888" }} />
                  </div>
                  <div className="stat-number mb-1">
                    <Counter target={stat.target} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                  {/* Bottom shimmer line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 shimmer" style={{ background: "linear-gradient(90deg, transparent, #ac9773, transparent)" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DIENSTEN — Image cards with glass overlay
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-fixz-surface relative overflow-hidden" ref={s3}>
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-label fade-up">Wat wij doen</span>
            <h2 className="text-3xl md:text-4xl mt-2 fade-up delay-100" style={{ color: "#1a1a2e" }}>Onze diensten</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: IMG_ADMIN, title: "Financiële administratie", desc: "Volledige verwerking van uw boekhouding. Van facturen tot jaarrekening — wij houden alles bij.", href: "/diensten", d: "delay-100" },
              { img: IMG_TAX, title: "Belastingadvies & BTW", desc: "Correcte en tijdige BTW-aangiften, inkomstenbelasting en vennootschapsbelasting. Geen verrassingen.", href: "/diensten", d: "delay-200" },
              { img: IMG_PAYROLL, title: "Salarisverwerking", desc: "Loonadministratie voor uw medewerkers. Loonstroken, jaaropgaven en afdrachten volledig verzorgd.", href: "/diensten", d: "delay-300" },
            ].map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className={`fade-up ${service.d} block group rounded-2xl overflow-hidden relative`}
                style={{ boxShadow: "0 4px 20px rgba(70,72,136,0.08)", transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-10px) scale(1.02)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 60px rgba(70,72,136,0.18)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(70,72,136,0.08)"; }}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={service.img} alt={service.title} loading="lazy" width={1000} height={667} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  {/* Gradient overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>
                {/* Content */}
                <div className="bg-white p-6 relative">
                  {/* Accent line */}
                  <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg, #464888, #ac9773)" }} />
                  <h3 className="text-xl mb-2 mt-1" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.desc}</p>
                  <span className="text-sm font-semibold flex items-center gap-1.5 transition-gap duration-300 group-hover:gap-2.5" style={{ color: "#464888" }}>
                    Meer informatie <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12 fade-up delay-400">
            <Link href="/diensten" className="btn-primary">
              Alle diensten bekijken <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          REVIEWS — Glass cards with star rating
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden" ref={s4}>
        <div className="orb w-80 h-80 left-[-100px] bottom-[-50px] opacity-5" style={{ background: "radial-gradient(circle, #ac9773, transparent)" }} />
        <div className="container relative z-10">
          <div className="text-center mb-14">
            <span className="section-label fade-up">Wat klanten zeggen</span>
            <h2 className="text-3xl md:text-4xl mt-2 fade-up delay-100" style={{ color: "#1a1a2e" }}>Ervaringen van onze klanten</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Marieke van den Berg", role: "ZZP — Grafisch ontwerper", review: "Eindelijk een boekhoudkantoor dat gewoon begrijpelijk communiceert. Fixz24 regelt alles en ik hoef me nergens druk om te maken.", stars: 5, d: "delay-100" },
              { name: "Thomas Jansen", role: "BV — IT-consultant", review: "Overgestapt van een groot kantoor naar Fixz24 en het verschil is enorm. Persoonlijk contact, snelle reacties en altijd proactief advies.", stars: 5, d: "delay-200" },
              { name: "Sara & Pieter Kooij", role: "VOF — Horecaondernemers", review: "Als horecaondernemers hebben we veel aan ons hoofd. Fixz24 neemt de financiële zorgen volledig van ons over. Aanrader!", stars: 5, d: "delay-300" },
            ].map((review) => (
              <div key={review.name} className={`fade-up ${review.d} card-3d rounded-2xl p-6 relative overflow-hidden`} style={{ background: "linear-gradient(145deg, #f8f8fc, #f2f2f8)", border: "1px solid rgba(70,72,136,0.08)" }}>
                {/* Quote mark */}
                <div className="absolute top-4 right-5 text-6xl font-serif leading-none opacity-10" style={{ color: "#464888" }}>"</div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#ac9773" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-6 italic relative z-10">"{review.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg, #464888, #5a5ca8)" }}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "#1a1a2e" }}>{review.name}</div>
                    <div className="text-xs text-muted-foreground">{review.role}</div>
                  </div>
                </div>
                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, #464888, #ac9773, transparent)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TARIEVEN TEASER — Dark glass cards
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-fixz-surface relative overflow-hidden" ref={s5}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label fade-up">Transparante prijzen</span>
              <h2 className="text-3xl md:text-4xl mt-2 mb-4 fade-up delay-100" style={{ color: "#1a1a2e" }}>Vaste maandprijzen, geen verrassingen</h2>
              <p className="text-muted-foreground leading-relaxed mb-6 fade-up delay-200">
                Wij werken met duidelijke pakketten. U weet precies wat u betaalt en wat u krijgt. Geen verborgen kosten, geen uurtje-factuurtje.
              </p>
              <div className="fade-up delay-300">
                <Link href="/tarieven" className="btn-primary">
                  Bekijk alle tarieven <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: "Starter", price: "€ 79", period: "/ maand", desc: "Ideaal voor ZZP'ers die net starten", features: ["BTW-aangifte", "Jaarrekening", "E-mail support"], highlight: false, d: "delay-100" },
                { name: "Groei", price: "€ 149", period: "/ maand", desc: "Voor groeiende ondernemingen", features: ["Alles in Starter", "Salarisverwerking", "Telefonisch advies"], highlight: true, d: "delay-200" },
              ].map((pkg) => (
                <div key={pkg.name} className={`fade-up ${pkg.d} rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]`}
                  style={pkg.highlight
                    ? { background: "linear-gradient(135deg, #464888 0%, #2e3060 100%)", boxShadow: "0 12px 40px rgba(70,72,136,0.3)" }
                    : { background: "white", border: "1px solid rgba(70,72,136,0.1)", boxShadow: "0 4px 20px rgba(70,72,136,0.06)" }
                  }
                >
                  {pkg.highlight && (
                    <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: "#ac9773", color: "white" }}>
                      Populair
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-bold text-lg" style={{ color: pkg.highlight ? "white" : "#1a1a2e", fontFamily: "Playfair Display, serif" }}>{pkg.name}</div>
                      <div className="text-xs" style={{ color: pkg.highlight ? "rgba(255,255,255,0.65)" : "#888" }}>{pkg.desc}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold" style={{ color: pkg.highlight ? "#c4b08e" : "#464888", fontFamily: "Playfair Display, serif" }}>{pkg.price}</span>
                      <span className="text-xs ml-1" style={{ color: pkg.highlight ? "rgba(255,255,255,0.55)" : "#888" }}>{pkg.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="text-sm flex items-center gap-2" style={{ color: pkg.highlight ? "rgba(255,255,255,0.85)" : "#555" }}>
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: pkg.highlight ? "rgba(172,151,115,0.3)" : "rgba(70,72,136,0.1)" }}>
                          <CheckCircle2 className="w-2.5 h-2.5" style={{ color: pkg.highlight ? "#c4b08e" : "#464888" }} />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {/* Shimmer bottom */}
                  {pkg.highlight && <div className="absolute bottom-0 left-0 right-0 h-0.5 shimmer" style={{ background: "linear-gradient(90deg, transparent, #ac9773, transparent)" }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ — Smooth accordion
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-white" ref={s6}>
        <div className="container max-w-3xl">
          <div className="text-center mb-14">
            <span className="section-label fade-up">Veelgestelde vragen</span>
            <h2 className="text-3xl md:text-4xl mt-2 fade-up delay-100" style={{ color: "#1a1a2e" }}>Heeft u een vraag?</h2>
          </div>
          <div className="fade-up delay-200">
            {faqs.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — Immersive dark section
      ══════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden" style={{ backgroundImage: `url(${CTA_BG})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(70,72,136,0.90) 100%)" }} />
        {/* Orbs */}
        <div className="orb w-96 h-96 left-[-100px] top-[-100px] opacity-20" style={{ background: "radial-gradient(circle, #5a5ca8, transparent)" }} />
        <div className="orb w-64 h-64 right-[-50px] bottom-[-50px] opacity-15" style={{ background: "radial-gradient(circle, #ac9773, transparent)" }} />
        {/* Tech grid */}
        <div className="absolute inset-0 tech-grid opacity-20" />

        <div className="container relative z-10 text-center">
          <span className="section-label text-[#c4b08e]/80 mb-4 block">Klaar om te starten?</span>
          <h2 className="text-3xl md:text-5xl text-white mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Laat uw administratie over aan ons
          </h2>
          <p className="text-white/75 text-lg max-w-xl mx-auto mb-10">
            Plan een gratis kennismakingsgesprek en ontdek hoe Fixz24 uw financiële zaken regelt.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, #ac9773, #c4b08e)", color: "white", boxShadow: "0 8px 30px rgba(172,151,115,0.4)" }}
            >
              <Phone className="w-4 h-4" />
              Gratis kennismaking
            </Link>
            <Link
              href="/tarieven"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 glass-card"
              style={{ color: "white", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              Bekijk tarieven
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
