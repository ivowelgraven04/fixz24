/* ============================================================
   FIXZ24 — Contact Page (Futuristic Upgrade)
   ============================================================ */

import Layout from "@/components/Layout";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({
    naam: "",
    email: "",
    telefoon: "",
    bedrijfstype: "",
    bericht: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.naam || !form.email || !form.bericht) {
      toast.error("Vul alle verplichte velden in.");
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      });
      const data = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!r.ok || !data.ok) {
        throw new Error(data.error || "Verzenden is niet gelukt.");
      }
      setSubmitted(true);
      toast.success("Uw bericht is verzonden! Wij nemen binnen 24 uur contact op.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Verzenden is niet gelukt. Mail ons op info@fixz24.nl.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: "Telefoon", value: "085 - 235 50 81", sub: "Ma t/m vr 09:00 - 17:30", href: "tel:+31852355081" },
    { icon: Mail, label: "E-mail", value: "info@fixz24.nl", sub: "Reactie binnen 24 uur", href: "mailto:info@fixz24.nl" },
    { icon: MapPin, label: "Adres", value: "Algerastraat 11A", sub: "3125 BS Schiedam", href: "https://maps.google.com/?q=Algerastraat+11A+3125+BS+Schiedam" },
    { icon: Clock, label: "Openingstijden", value: "Ma t/m vr", sub: "09:00 – 17:30 uur" },
  ];

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f5f5f8 0%, #eeeef5 100%)" }}>
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="orb w-96 h-96 right-[-100px] top-[-100px] opacity-10" style={{ background: "radial-gradient(circle, #464888, transparent)" }} />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="section-label">Contact</span>
            <h1 className="text-4xl md:text-5xl mt-2 mb-6" style={{ color: "#1a1a2e" }}>
              Neem <span className="gradient-text">contact op</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Heeft u een vraag, wilt u een offerte of bent u benieuwd wat Fixz24 voor u kan betekenen? Wij reageren altijd binnen 24 uur.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact Content ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="orb w-80 h-80 right-[-80px] top-0 opacity-5" style={{ background: "radial-gradient(circle, #464888, transparent)" }} />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="md:col-span-2">
              <h2 className="text-2xl mb-6" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>Contactgegevens</h2>
              <div className="space-y-4 mb-10">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-[rgba(70,72,136,0.04)] group" style={{ border: "1px solid rgba(70,72,136,0.07)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg, #464888, #5a5ca8)" }}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#ac9773" }}>{item.label}</div>
                      {item.href
                        ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="font-medium text-sm transition-colors hover:underline" style={{ color: "#1a1a2e" }}>{item.value}</a>
                        : <div className="font-medium text-sm" style={{ color: "#1a1a2e" }}>{item.value}</div>
                      }
                      <div className="text-xs text-muted-foreground">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Why us card */}
              <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a2e, #2e3060)" }}>
                <div className="absolute inset-0 tech-grid opacity-15" />
                <div className="relative z-10">
                  <h3 className="text-white font-semibold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>Gratis kennismaking</h3>
                  <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>Het eerste gesprek is altijd vrijblijvend. Wij bespreken uw situatie en adviseren u over het beste pakket.</p>
                  <ul className="space-y-2">
                    {["Reactie binnen 24 uur", "Vaste contactpersoon", "Transparante tarieven", "Volledig digitaal"].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(172,151,115,0.3)" }}>
                          <CheckCircle2 className="w-2.5 h-2.5" style={{ color: "#c4b08e" }} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 shimmer" style={{ background: "linear-gradient(90deg, transparent, #ac9773, transparent)" }} />
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              {submitted ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(135deg, #464888, #ac9773)" }}>
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl mb-3" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>Bericht ontvangen!</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Bedankt voor uw bericht. Wij nemen binnen één werkdag contact met u op.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl p-8" style={{ border: "1px solid rgba(70,72,136,0.1)", boxShadow: "0 8px 40px rgba(70,72,136,0.08)" }}>
                  <h2 className="text-2xl mb-6" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>Stuur ons een bericht</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot tegen spam: onzichtbaar voor mensen */}
                    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                      <label htmlFor="website">Website</label>
                      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#464888" }}>Naam *</label>
                        <input
                          type="text" name="naam" value={form.naam} onChange={handleChange} required
                          placeholder="Uw volledige naam"
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                          style={{ border: "1.5px solid rgba(70,72,136,0.15)", color: "#1a1a2e", background: "#fafafa" }}
                          onFocus={(e) => { e.target.style.borderColor = "#464888"; e.target.style.boxShadow = "0 0 0 3px rgba(70,72,136,0.08)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "rgba(70,72,136,0.15)"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#464888" }}>E-mail *</label>
                        <input
                          type="email" name="email" value={form.email} onChange={handleChange} required
                          placeholder="uw@email.nl"
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                          style={{ border: "1.5px solid rgba(70,72,136,0.15)", color: "#1a1a2e", background: "#fafafa" }}
                          onFocus={(e) => { e.target.style.borderColor = "#464888"; e.target.style.boxShadow = "0 0 0 3px rgba(70,72,136,0.08)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "rgba(70,72,136,0.15)"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#464888" }}>Telefoon</label>
                        <input
                          type="tel" name="telefoon" value={form.telefoon} onChange={handleChange}
                          placeholder="+31 6 12345678"
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                          style={{ border: "1.5px solid rgba(70,72,136,0.15)", color: "#1a1a2e", background: "#fafafa" }}
                          onFocus={(e) => { e.target.style.borderColor = "#464888"; e.target.style.boxShadow = "0 0 0 3px rgba(70,72,136,0.08)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "rgba(70,72,136,0.15)"; e.target.style.boxShadow = "none"; }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#464888" }}>Type onderneming</label>
                        <select
                          name="bedrijfstype" value={form.bedrijfstype} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all bg-white appearance-none"
                          style={{ border: "1.5px solid rgba(70,72,136,0.15)", color: form.bedrijfstype ? "#1a1a2e" : "#888" }}
                          onFocus={(e) => { e.target.style.borderColor = "#464888"; e.target.style.boxShadow = "0 0 0 3px rgba(70,72,136,0.08)"; }}
                          onBlur={(e) => { e.target.style.borderColor = "rgba(70,72,136,0.15)"; e.target.style.boxShadow = "none"; }}
                        >
                          <option value="">Selecteer type</option>
                          <option value="zzp">ZZP</option>
                          <option value="vof">VOF</option>
                          <option value="bv">BV</option>
                          <option value="starter">Starter</option>
                          <option value="anders">Anders</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#464888" }}>Uw bericht *</label>
                      <textarea
                        name="bericht" value={form.bericht} onChange={handleChange} required
                        placeholder="Vertel ons over uw situatie en hoe wij u kunnen helpen..."
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
                        style={{ border: "1.5px solid rgba(70,72,136,0.15)", color: "#1a1a2e", background: "#fafafa" }}
                        onFocus={(e) => { e.target.style.borderColor = "#464888"; e.target.style.boxShadow = "0 0 0 3px rgba(70,72,136,0.08)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(70,72,136,0.15)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" id="privacy" className="mt-1" required style={{ accentColor: "#464888" }} />
                      <label htmlFor="privacy" className="text-xs text-muted-foreground leading-relaxed">
                        Ik ga akkoord met het{" "}
                        <a href="/privacybeleid" className="hover:underline" style={{ color: "#464888" }}>privacybeleid</a>{" "}
                        van Fixz24 Financial Services.
                      </label>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                      style={{ background: loading ? "#888" : "linear-gradient(135deg, #464888, #2e3060)", color: "white", boxShadow: loading ? "none" : "0 8px 25px rgba(70,72,136,0.3)" }}
                    >
                      {loading
                        ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Verzenden...</>
                        : <><Send className="w-4 h-4" /> Verstuur bericht</>
                      }
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
