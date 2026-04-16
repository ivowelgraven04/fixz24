/* ============================================================
   FIXZ24 — Blog Index Page
   ============================================================ */

import Layout from "@/components/Layout";
import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";
import { blogPosts } from "@/data/blogPosts";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".fade-up").forEach((t) => t.classList.add("visible"));
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>("Alle");
  const s1 = useScrollReveal();

  const categories = useMemo(() => {
    const set = new Set(blogPosts.map((p) => p.category));
    return ["Alle", ...Array.from(set)];
  }, []);

  const posts = useMemo(() => {
    return blogPosts
      .filter((p) => activeCategory === "Alle" || p.category === activeCategory)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [activeCategory]);

  const [featured, ...rest] = posts;

  return (
    <Layout>
      {/* ── Hero ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f5f5f8 0%, #eeeef5 100%)" }}>
        <div className="absolute inset-0 tech-grid opacity-40" />
        <div className="orb w-96 h-96 right-[-100px] top-[-100px] opacity-10" style={{ background: "radial-gradient(circle, #464888, transparent)" }} />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="section-label">Kennisbank</span>
            <h1 className="text-4xl md:text-5xl mt-2 mb-6" style={{ color: "#1a1a2e" }}>
              Slimmer <span className="gradient-text">ondernemen</span> begint met kennis
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Praktische uitleg, tips en inzichten over administratie, belastingen en financieel advies — geschreven voor ondernemers, niet voor accountants.
            </p>
          </div>
        </div>
      </section>

      {/* ── Category filter ── */}
      <section className="py-10 bg-white border-b border-border/40 sticky top-20 z-20" style={{ backdropFilter: "blur(12px)", background: "rgba(255,255,255,0.9)" }}>
        <div className="container">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0"
                  style={
                    isActive
                      ? { background: "linear-gradient(135deg, #464888, #2e3060)", color: "white", boxShadow: "0 4px 12px rgba(70,72,136,0.25)" }
                      : { background: "rgba(70,72,136,0.06)", color: "#464888" }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(70,72,136,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(70,72,136,0.06)";
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured post ── */}
      {featured && (
        <section className="py-16 bg-white" ref={s1}>
          <div className="container">
            <Link
              href={`/blog/${featured.slug}`}
              className="block group rounded-3xl overflow-hidden fade-up"
              style={{ boxShadow: "0 20px 60px rgba(70,72,136,0.1)" }}
            >
              <div className="grid md:grid-cols-2">
                {/* Visual */}
                <div
                  className="relative aspect-[4/3] md:aspect-auto overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${featured.gradient[0]}, ${featured.gradient[1]})` }}
                >
                  <div className="absolute inset-0 tech-grid opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-white/95 max-w-md">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 bg-white/15 backdrop-blur">
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#f0e2c7" }}>
                          Uitgelicht
                        </span>
                      </div>
                      <div className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
                        {featured.category}
                      </div>
                      <h2 className="text-2xl md:text-4xl leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
                        {featured.title}
                      </h2>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #ac9773, transparent)" }} />
                </div>
                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
                  <p className="text-muted-foreground text-base leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                    <span>{formatDate(featured.date)}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {featured.readTime}
                    </span>
                    <span>·</span>
                    <span>{featured.author}</span>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                    style={{ color: "#464888" }}
                  >
                    Lees artikel <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── Article grid ── */}
      <section className="py-16 bg-fixz-surface">
        <div className="container">
          {rest.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Geen artikelen in deze categorie.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block group rounded-2xl overflow-hidden bg-white transition-all duration-400 hover:-translate-y-1.5"
                  style={{
                    border: "1px solid rgba(70,72,136,0.08)",
                    boxShadow: "0 4px 20px rgba(70,72,136,0.06)",
                    animation: `scale-in 0.4s ease both ${i * 0.08}s`,
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 20px 50px rgba(70,72,136,0.14)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(70,72,136,0.06)")}
                >
                  {/* Visual */}
                  <div
                    className="relative aspect-[5/3] overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${post.gradient[0]}, ${post.gradient[1]})` }}
                  >
                    <div className="absolute inset-0 tech-grid opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-center">
                        <div className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                          {post.category}
                        </div>
                        <h3 className="text-xl md:text-2xl text-white leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
                          {post.title}
                        </h3>
                      </div>
                    </div>
                    {/* Accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #ac9773, transparent)" }} />
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{formatDate(post.date)}</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: "#464888" }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2e3060 100%)" }}>
        <div className="absolute inset-0 tech-grid opacity-15" />
        <div className="orb w-80 h-80 right-[-80px] bottom-[-80px] opacity-15" style={{ background: "radial-gradient(circle, #ac9773, transparent)" }} />
        <div className="container relative z-10 text-center">
          <span className="section-label text-[#c4b08e]/80 mb-4 block">Persoonlijk advies nodig?</span>
          <h2 className="text-3xl md:text-4xl text-white mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Krijg antwoord op jouw vraag
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Lezen is leren. Maar voor jouw situatie is een persoonlijk gesprek vaak sneller én duidelijker.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #ac9773, #c4b08e)", color: "white", boxShadow: "0 8px 30px rgba(172,151,115,0.35)" }}
          >
            Plan een gratis gesprek <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
