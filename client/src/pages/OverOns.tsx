/* ============================================================
   FIXZ24 — Over Ons Page (Futuristic Upgrade)
   ============================================================ */

import Layout from "@/components/Layout";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Target, Eye, Heart } from "lucide-react";
import { useEffect, useRef } from "react";

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

export default function OverOns() {
  const s1 = useScrollReveal();
  const s2 = useScrollReveal();
  const s3 = useScrollReveal();
  const s4 = useScrollReveal();

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f5f5f8 0%, #eeeef5 100%)" }}>
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="orb w-80 h-80 right-[-50px] top-[-50px] opacity-10" style={{ background: "radial-gradient(circle, #464888, transparent)" }} />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="section-label">Over ons</span>
            <h1 className="text-4xl md:text-5xl mt-2 mb-6" style={{ color: "#1a1a2e" }}>
              Wij zijn <span className="gradient-text">Fixz24</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Een modern financieel dienstverlener opgericht met één doel: ondernemers ontzorgen zodat zij zich kunnen focussen op wat echt telt — hun bedrijf.
            </p>
          </div>
        </div>
      </section>

      {/* ── Missie, Visie, Waarden ── */}
      <section className="py-24 bg-white relative overflow-hidden" ref={s1}>
        <div className="orb w-96 h-96 left-[-150px] top-0 opacity-5" style={{ background: "radial-gradient(circle, #464888, transparent)" }} />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Onze missie", text: "Elke ondernemer verdient een betrouwbare financiële partner. Wij maken professionele administratie toegankelijk, begrijpelijk en betaalbaar voor ZZP'ers, VOF's en BV's.", d: "delay-100" },
              { icon: Eye, title: "Onze visie", text: "Een wereld waarin ondernemers zich volledig kunnen richten op hun passie, terwijl wij de financiële zaken naadloos regelen. Digitaal, transparant en persoonlijk.", d: "delay-200" },
              { icon: Heart, title: "Onze waarden", text: "Betrouwbaarheid, transparantie en persoonlijk contact staan centraal. Wij zijn niet zomaar een kantoor — wij zijn uw partner die meedenkt en proactief adviseert.", d: "delay-300" },
            ].map((item) => (
              <div
                key={item.title}
                className={`fade-up ${item.d} doelgroep-card rounded-2xl p-8 relative`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg, #464888, #5a5ca8)" }}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="d-type text-xl mb-3" style={{ fontFamily: "Playfair Display, serif" }}>{item.title}</h3>
                <p className="d-detail text-sm leading-relaxed">{item.text}</p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, #464888, #ac9773, transparent)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Verhaal ── */}
      <section className="py-24 bg-fixz-surface relative overflow-hidden" ref={s2}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label fade-up">Ons verhaal</span>
              <h2 className="text-3xl md:text-4xl mt-2 mb-6 fade-up delay-100" style={{ color: "#1a1a2e" }}>
                Opgericht door ondernemers, voor ondernemers
              </h2>
              <div className="space-y-4 fade-up delay-200">
                <p className="text-muted-foreground leading-relaxed">
                  Fixz24 is ontstaan uit frustratie met traditionele boekhoudkantoren: trage communicatie, ondoorzichtige tarieven en het gevoel dat u slechts een dossiernummer bent.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Wij hebben een kantoor gebouwd dat anders werkt. Met vaste contactpersonen, heldere maandprijzen en een volledig digitaal platform bent u altijd op de hoogte van uw financiële situatie.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Vandaag bedienen wij meer dan 500 tevreden klanten in heel Nederland — van freelance fotografen tot groeiende BV's.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 fade-up delay-300">
              {[
                { year: "2014", event: "Fixz24 opgericht in Amsterdam" },
                { year: "2017", event: "Lancering digitaal klantportaal" },
                { year: "2020", event: "Uitbreiding naar heel Nederland" },
                { year: "2024", event: "500+ tevreden klanten bereikt" },
              ].map((item, i) => (
                <div key={item.year} className={`card-3d rounded-xl p-5 ${i % 2 === 1 ? "mt-6" : ""}`} style={{ background: "white", border: "1px solid rgba(70,72,136,0.08)", boxShadow: "0 4px 20px rgba(70,72,136,0.06)" }}>
                  <div className="text-2xl font-bold mb-1" style={{ color: "#464888", fontFamily: "Playfair Display, serif" }}>{item.year}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Kernwaarden ── */}
      <section className="py-24 bg-white" ref={s3}>
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-label fade-up">Wat ons onderscheidt</span>
            <h2 className="text-3xl md:text-4xl mt-2 fade-up delay-100" style={{ color: "#1a1a2e" }}>Onze kernwaarden</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              { title: "Persoonlijk contact", desc: "Altijd dezelfde vaste contactpersoon die uw situatie kent.", d: "delay-100" },
              { title: "Transparantie", desc: "Vaste maandprijzen zonder verborgen kosten of verrassingen.", d: "delay-200" },
              { title: "Proactief advies", desc: "Wij denken mee en signaleren kansen en risico's vroegtijdig.", d: "delay-300" },
              { title: "Digitaal & bereikbaar", desc: "24/7 inzicht via ons portaal, altijd bereikbaar per telefoon en e-mail.", d: "delay-400" },
            ].map((item) => (
              <div key={item.title} className={`fade-up ${item.d} flex items-start gap-4 p-5 rounded-xl transition-all duration-300 hover:bg-[rgba(70,72,136,0.03)] group`} style={{ border: "1px solid rgba(70,72,136,0.06)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg, #464888, #ac9773)" }}>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-sm" style={{ color: "#1a1a2e" }}>{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
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
          <span className="section-label text-[#c4b08e]/80 mb-4 block fade-up">Klaar om te starten?</span>
          <h2 className="text-3xl md:text-4xl text-white mb-4 fade-up delay-100" style={{ fontFamily: "Playfair Display, serif" }}>
            Plan een gratis kennismaking
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8 fade-up delay-200">
            Plan een gratis kennismakingsgesprek en ontdek hoe Fixz24 uw administratie regelt.
          </p>
          <div className="fade-up delay-300">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #ac9773, #c4b08e)", color: "white", boxShadow: "0 8px 30px rgba(172,151,115,0.35)" }}
            >
              Neem contact op <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
