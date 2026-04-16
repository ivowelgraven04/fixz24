/* ============================================================
   FIXZ24 — Blog Post Detail Page
   ============================================================ */

import Layout from "@/components/Layout";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Clock, Share2 } from "lucide-react";
import { useEffect } from "react";
import { getPost, getRelatedPosts, type BlogBlock } from "@/data/blogPosts";
import NotFound from "./NotFound";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

function renderBlock(block: BlogBlock, idx: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={idx}
          className="text-2xl md:text-3xl mt-12 mb-4"
          style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={idx}
          className="text-xl mt-8 mb-3 font-semibold"
          style={{ color: "#464888", fontFamily: "Playfair Display, serif" }}
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={idx} className="text-base leading-relaxed text-muted-foreground mb-4">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={idx} className="mb-6 space-y-2">
          {block.items.map((it, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2.5"
                style={{ background: "#ac9773" }}
              />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={idx}
          className="my-8 pl-6 py-4 relative"
          style={{ borderLeft: "3px solid #ac9773", background: "rgba(172,151,115,0.05)" }}
        >
          <p className="text-lg leading-relaxed italic" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>
            "{block.text}"
          </p>
        </blockquote>
      );
  }
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = getPost(params.slug);
  const related = post ? getRelatedPosts(post.slug, 3) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!post) {
    return <NotFound />;
  }

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url });
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <Layout>
      {/* ── Hero ── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${post.gradient[0]}, ${post.gradient[1]})` }}
      >
        <div className="absolute inset-0 tech-grid opacity-15" />
        <div className="orb w-96 h-96 right-[-100px] top-[-100px] opacity-20" style={{ background: "radial-gradient(circle, #ac9773, transparent)" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #ac9773, transparent)" }} />

        <div className="container relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mb-8 text-sm font-semibold transition-all hover:gap-3"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            <ArrowLeft className="w-4 h-4" /> Terug naar kennisbank
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 bg-white/15 backdrop-blur">
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#f0e2c7" }}>
                {post.category}
              </span>
            </div>
            <h1
              className="text-3xl md:text-5xl leading-tight mb-6 text-white"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {post.title}
            </h1>
            <p className="text-lg mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </span>
              <span>·</span>
              <span>{post.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <article>{post.content.map(renderBlock)}</article>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                style={{ color: "#464888" }}
              >
                <ArrowLeft className="w-4 h-4" /> Meer artikelen
              </Link>
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-[rgba(70,72,136,0.08)]"
                style={{ color: "#464888" }}
              >
                <Share2 className="w-4 h-4" /> Deel dit artikel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section className="py-16 bg-fixz-surface">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-2xl md:text-3xl mb-8" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>
                Ook interessant
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="block group rounded-2xl overflow-hidden bg-white transition-all duration-400 hover:-translate-y-1"
                    style={{ border: "1px solid rgba(70,72,136,0.08)", boxShadow: "0 4px 20px rgba(70,72,136,0.06)" }}
                  >
                    <div
                      className="relative aspect-[5/3] p-6 flex items-end"
                      style={{ background: `linear-gradient(135deg, ${r.gradient[0]}, ${r.gradient[1]})` }}
                    >
                      <div className="absolute inset-0 tech-grid opacity-20" />
                      <div className="relative">
                        <div className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                          {r.category}
                        </div>
                        <h4 className="text-lg text-white leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
                          {r.title}
                        </h4>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">{r.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {r.readTime}
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: "#464888" }} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2e3060 100%)" }}>
        <div className="absolute inset-0 tech-grid opacity-15" />
        <div className="container relative z-10 text-center">
          <h2 className="text-2xl md:text-3xl text-white mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Vraag over jouw situatie?
          </h2>
          <p className="text-white/70 max-w-lg mx-auto mb-8">
            Geen algemeen verhaal — we kijken samen naar jouw cijfers en geven concreet advies.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #ac9773, #c4b08e)", color: "white", boxShadow: "0 8px 30px rgba(172,151,115,0.35)" }}
          >
            Plan een gesprek <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
