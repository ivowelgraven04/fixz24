/* ============================================================
   FIXZ24 — Cookiebeleid Page
   ============================================================ */

import Layout from "@/components/Layout";

export default function Cookiebeleid() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 bg-fixz-surface">
        <div className="container">
          <div className="max-w-3xl">
            <span className="section-label">Juridisch</span>
            <h1 className="text-4xl md:text-5xl mt-2 mb-4" style={{ color: "#1a1a2e" }}>
              Cookiebeleid
            </h1>
            <p className="text-muted-foreground">
              Laatst bijgewerkt: 1 april 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl prose prose-slate">
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl mb-3" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>
                  Wat zijn cookies?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer u onze website bezoekt. Ze helpen ons de website goed te laten functioneren, uw voorkeuren te onthouden en inzicht te krijgen in hoe bezoekers onze website gebruiken.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-3" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>
                  Welke cookies gebruiken wij?
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      type: "Functionele cookies",
                      desc: "Deze cookies zijn noodzakelijk voor het goed functioneren van de website. Ze zorgen ervoor dat u kunt navigeren en gebruik kunt maken van de functies van de website. Zonder deze cookies werkt de website niet goed.",
                      required: true,
                    },
                    {
                      type: "Analytische cookies",
                      desc: "We gebruiken analytische cookies om te begrijpen hoe bezoekers onze website gebruiken. Deze informatie helpt ons de website te verbeteren. De gegevens worden geanonimiseerd verwerkt.",
                      required: false,
                    },
                    {
                      type: "Marketing cookies",
                      desc: "We gebruiken geen marketing- of tracking cookies van derden. Uw surfgedrag wordt niet gedeeld met advertentienetwerken.",
                      required: false,
                    },
                  ].map((item) => (
                    <div
                      key={item.type}
                      className="p-5 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-sm" style={{ color: "#1a1a2e" }}>
                          {item.type}
                        </h4>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={
                            item.required
                              ? { backgroundColor: "rgba(70,72,136,0.1)", color: "#464888" }
                              : { backgroundColor: "rgba(172,151,115,0.1)", color: "#ac9773" }
                          }
                        >
                          {item.required ? "Verplicht" : "Optioneel"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl mb-3" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>
                  Cookies beheren
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  U kunt cookies beheren via de instellingen van uw browser. U kunt cookies blokkeren of verwijderen. Houd er rekening mee dat het uitschakelen van cookies de functionaliteit van de website kan beïnvloeden.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Meer informatie over het beheren van cookies vindt u op de website van uw browser:
                </p>
                <ul className="mt-3 space-y-1">
                  {[
                    { browser: "Google Chrome", url: "https://support.google.com/chrome/answer/95647" },
                    { browser: "Mozilla Firefox", url: "https://support.mozilla.org/nl/kb/cookies-verwijderen-gegevens-wissen-websites-opgeslagen" },
                    { browser: "Safari", url: "https://support.apple.com/nl-nl/guide/safari/sfri11471/mac" },
                    { browser: "Microsoft Edge", url: "https://support.microsoft.com/nl-nl/microsoft-edge/cookies-verwijderen-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" },
                  ].map((b) => (
                    <li key={b.browser}>
                      <a
                        href={b.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm fixz-blue hover:underline"
                      >
                        {b.browser}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl mb-3" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>
                  Gegevensverwerking
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Fixz24 Financial Services verwerkt uw gegevens conform de Algemene Verordening Gegevensbescherming (AVG). Wij delen uw gegevens niet met derden zonder uw toestemming, tenzij dit wettelijk verplicht is.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-3" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>
                  Contact
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Heeft u vragen over ons cookiebeleid? Neem dan contact met ons op via{" "}
                  <a href="mailto:info@fixz24.nl" className="fixz-blue hover:underline">
                    info@fixz24.nl
                  </a>{" "}
                  of via ons{" "}
                  <a href="/contact" className="fixz-blue hover:underline">
                    contactformulier
                  </a>
                  .
                </p>
              </div>

              <div
                className="p-5 rounded-lg"
                style={{ backgroundColor: "rgba(70,72,136,0.05)", borderLeft: "3px solid #464888" }}
              >
                <p className="text-sm text-muted-foreground">
                  <strong style={{ color: "#464888" }}>Fixz24 Financial Services</strong>
                  <br />
                  Keizersgracht 123, 1015 CJ Amsterdam
                  <br />
                  KvK: 12345678 | BTW: NL123456789B01
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
