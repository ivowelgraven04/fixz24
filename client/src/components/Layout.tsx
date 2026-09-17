/* ============================================================
   FIXZ24 — Layout Component (Futuristic Upgrade)
   Design: Glasmorphism navbar, gradient footer, micro-animations
   ============================================================ */

import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import CookieBanner from "./CookieBanner";

const LOGO_URL = "/images/fixz24-logo.webp";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(1, y / docHeight) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Magnetic effect on all primary CTAs ──
  useEffect(() => {
    const attached = new WeakSet<HTMLElement>();
    const cleanups: Array<() => void> = [];

    const attach = (el: HTMLElement) => {
      if (attached.has(el)) return;
      attached.add(el);
      const strength = 0.28;
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const mx = (e.clientX - r.left - r.width / 2) * strength;
        const my = (e.clientY - r.top - r.height / 2) * strength;
        el.style.setProperty("--mag-x", `${mx}px`);
        el.style.setProperty("--mag-y", `${my}px`);
      };
      const onLeave = () => {
        el.style.setProperty("--mag-x", "0px");
        el.style.setProperty("--mag-y", "0px");
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    };

    const scan = () => {
      document.querySelectorAll<HTMLElement>(".btn-primary").forEach(attach);
    };
    scan();
    const observer = new MutationObserver(scan);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/over-ons", label: "Over ons" },
    { href: "/diensten", label: "Diensten" },
    { href: "/tarieven", label: "Tarieven" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Scroll progress bar ── */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left pointer-events-none"
        style={{
          background: "linear-gradient(90deg, #464888, #ac9773, #464888)",
          transform: `scaleX(${scrollProgress})`,
          transition: "transform 0.12s ease-out",
          willChange: "transform",
        }}
      />

      {/* ── Floating Header ── */}
      <div className="sticky top-0 z-50 shrink-0">
        <header
          className="relative mx-auto"
          style={{
            marginTop: scrolled ? "12px" : "0",
            width: scrolled ? "calc(100% - 32px)" : "100%",
            maxWidth: scrolled ? "1240px" : "none",
            borderRadius: scrolled ? "20px" : "0 0 24px 24px",
            background: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.96)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: `1px solid rgba(70,72,136,${scrolled ? 0.09 : 0.05})`,
            boxShadow: scrolled
              ? "0 20px 50px -12px rgba(70,72,136,0.18), 0 8px 20px -6px rgba(70,72,136,0.08)"
              : "0 4px 20px rgba(70,72,136,0.06)",
            transition:
              "margin-top 500ms cubic-bezier(0.4, 0, 0.2, 1), width 500ms cubic-bezier(0.4, 0, 0.2, 1), max-width 500ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 500ms cubic-bezier(0.4, 0, 0.2, 1), background 300ms ease, box-shadow 400ms ease, border-color 300ms ease",
          }}
        >
          {/* Shimmer accent line */}
          <div
            className="absolute left-[8%] right-[8%] h-px opacity-60 pointer-events-none"
            style={{ top: 0, background: "linear-gradient(90deg, transparent, #ac9773, transparent)" }}
          />
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <img
                src={LOGO_URL}
                alt="Fixz24 Financial Services"
                width={614}
                height={320}
                fetchPriority="high"
                className="h-10 w-auto cursor-pointer transition-all duration-300 hover:opacity-80 hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-200 relative py-1 group ${
                    isActive(link.href) ? "fixz-blue" : "text-muted-foreground hover:fixz-blue"
                  }`}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300"
                    style={{
                      width: isActive(link.href) ? "100%" : "0%",
                      background: "linear-gradient(90deg, #464888, #ac9773)",
                    }}
                  />
                  <span
                    className="absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:w-full"
                    style={{ width: "0%", background: "linear-gradient(90deg, #464888, #ac9773)" }}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA Button Desktop */}
            <div className="hidden md:block">
              <Link href="/contact" className="btn-primary">
                Neem contact op
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-[rgba(70,72,136,0.08)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen
                ? <X className="w-6 h-6 fixz-blue" />
                : <Menu className="w-6 h-6 fixz-blue" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: mobileMenuOpen ? "400px" : "0px" }}
        >
          <div style={{ borderTop: "1px solid rgba(70,72,136,0.08)", background: "rgba(255,255,255,0.98)" }}>
            <nav className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "fixz-blue bg-[rgba(70,72,136,0.06)]"
                      : "text-muted-foreground hover:fixz-blue hover:bg-[rgba(70,72,136,0.04)]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/contact">
                  <button
                    className="btn-primary w-full justify-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Neem contact op
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Cookie Banner */}
      <CookieBanner />

      {/* ── Footer ── */}
      <footer className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2e3060 60%, #1a1a2e 100%)" }}>
        {/* Tech grid overlay */}
        <div className="absolute inset-0 tech-grid opacity-10" />
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #ac9773, transparent)" }} />
        {/* Orb */}
        <div className="orb w-96 h-96 right-[-100px] top-[-100px] opacity-10" style={{ background: "radial-gradient(circle, #5a5ca8, transparent)" }} />

        <div className="container py-14 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Tagline */}
            <div className="md:col-span-1">
              <img src={LOGO_URL} alt="Fixz24" className="h-10 w-auto mb-4 brightness-0 invert" />
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                Uw moderne financiële partner voor administratie, belastingen en salarisverwerking.
              </p>
              {/* Social / trust */}
              <div className="mt-5 flex gap-2">
                {["KvK 93838388", "AVG-proof"].map((badge) => (
                  <span key={badge} className="text-xs px-2 py-1 rounded-md font-semibold" style={{ backgroundColor: "rgba(172,151,115,0.15)", color: "#c4b08e", border: "1px solid rgba(172,151,115,0.2)" }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-5 text-white text-sm uppercase tracking-wider">Navigatie</h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b08e")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-5 text-white text-sm uppercase tracking-wider">Diensten</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Financiële administratie", href: "/diensten" },
                  { label: "Belastingadvies", href: "/diensten" },
                  { label: "Salarisverwerking", href: "/diensten" },
                  { label: "BTW-aangiften", href: "/diensten" },
                  { label: "Jaarrekening", href: "/diensten" },
                ].map((s) => (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      className="text-sm transition-all duration-200 hover:translate-x-1 inline-block"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b08e")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-5 text-white text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-2.5">
                {[
                  { label: "info@fixz24.nl", href: "mailto:info@fixz24.nl" },
                  { label: "085 - 235 50 81", href: "tel:+31852355081" },
                  { label: "Algerastraat 11A, 3125 BS Schiedam", href: "https://maps.google.com/?q=Algerastraat+11A+3125+BS+Schiedam" },
                ].map((c) => (
                  <li key={c.label}>
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-sm transition-colors duration-200" style={{ color: "rgba(255,255,255,0.65)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b08e")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
                <li className="pt-1">
                  <Link
                    href="/contact"
                    className="text-sm font-semibold transition-all duration-200 inline-flex items-center gap-1"
                    style={{ color: "#c4b08e" }}
                  >
                    Contactformulier →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              &copy; {new Date().getFullYear()} Fixz24 Financial Services. Alle rechten voorbehouden.
            </p>
            <div className="flex gap-6">
              <Link href="/cookiebeleid" className="text-xs transition-colors duration-200" style={{ color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b08e")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                Cookiebeleid
              </Link>
              <Link href="/privacybeleid" className="text-xs transition-colors duration-200" style={{ color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b08e")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >
                Privacybeleid
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
