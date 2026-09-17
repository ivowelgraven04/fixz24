/* ============================================================
   FIXZ24 — Privacybeleid Page
   ============================================================ */

import Layout from "@/components/Layout";
import { Link } from "wouter";

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl mb-3" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>
    {children}
  </h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground leading-relaxed">{children}</p>
);

const UL = ({ items }: { items: string[] }) => (
  <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground leading-relaxed">
    {items.map((it) => (
      <li key={it}>{it}</li>
    ))}
  </ul>
);

export default function Privacybeleid() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 bg-fixz-surface">
        <div className="container">
          <div className="max-w-3xl">
            <span className="section-label">Juridisch</span>
            <h1 className="text-4xl md:text-5xl mt-2 mb-4" style={{ color: "#1a1a2e" }}>
              Privacybeleid
            </h1>
            <p className="text-muted-foreground">Laatst bijgewerkt: 17 september 2026</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl">
            <div className="space-y-10">
              <div>
                <H2>Wie zijn wij?</H2>
                <P>
                  Fixz24 Financial Services (KvK 93838388), gevestigd aan de Algerastraat 11A, 3125 BS Schiedam, is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid. Vragen over uw gegevens kunt u stellen via{" "}
                  <a href="mailto:info@fixz24.nl" className="hover:underline" style={{ color: "#464888" }}>info@fixz24.nl</a>{" "}
                  of telefonisch via 085 - 235 50 81.
                </P>
              </div>

              <div>
                <H2>Welke gegevens verwerken wij?</H2>
                <P>Afhankelijk van uw relatie met ons verwerken wij de volgende gegevens:</P>
                <div className="mt-3">
                  <UL
                    items={[
                      "Websitebezoekers: IP-adres, browsergegevens en cookievoorkeuren (zie ons cookiebeleid).",
                      "Contactformulier: naam, e-mailadres, telefoonnummer, bedrijfstype en de inhoud van uw bericht.",
                      "Klanten: bedrijfsgegevens, KvK- en btw-nummer, bankgegevens, identiteitsgegevens, financiële administratie, loongegevens van medewerkers en alle overige gegevens die nodig zijn voor onze dienstverlening.",
                    ]}
                  />
                </div>
              </div>

              <div>
                <H2>Waarvoor gebruiken wij uw gegevens?</H2>
                <div className="mt-3">
                  <UL
                    items={[
                      "Het beantwoorden van uw vraag of offerteaanvraag.",
                      "Het uitvoeren van de overeenkomst: administratie, belastingaangiften, salarisverwerking en advies.",
                      "Het voldoen aan wettelijke verplichtingen, zoals de Wet ter voorkoming van witwassen en financieren van terrorisme (Wwft) en de fiscale bewaarplicht.",
                      "Het verbeteren van onze website op basis van geanonimiseerde statistieken.",
                    ]}
                  />
                </div>
              </div>

              <div>
                <H2>Op welke grondslag?</H2>
                <P>
                  Wij verwerken uw gegevens op basis van de uitvoering van een overeenkomst, een wettelijke verplichting, uw toestemming (bij het contactformulier en analytische cookies) of ons gerechtvaardigd belang bij een goed werkende website en dienstverlening.
                </P>
              </div>

              <div>
                <H2>Hoe lang bewaren wij uw gegevens?</H2>
                <P>
                  Gegevens uit het contactformulier bewaren wij maximaal één jaar na het laatste contact, tenzij daaruit een klantrelatie ontstaat. Administratieve en fiscale gegevens van klanten bewaren wij zeven jaar, conform de wettelijke bewaarplicht van de Belastingdienst. Gegevens die wij op grond van de Wwft moeten vastleggen bewaren wij vijf jaar na het einde van de relatie.
                </P>
              </div>

              <div>
                <H2>Met wie delen wij uw gegevens?</H2>
                <P>
                  Wij delen gegevens uitsluitend wanneer dat nodig is voor onze dienstverlening. Daarbij maken wij gebruik van zorgvuldig geselecteerde verwerkers, zoals boekhoud- en salarissoftware, facturatiesoftware en e-mailvoorzieningen. Met deze partijen sluiten wij een verwerkersovereenkomst. Daarnaast delen wij gegevens met de Belastingdienst en andere instanties wanneer de wet dat vereist. Wij verkopen uw gegevens nooit aan derden.
                </P>
              </div>

              <div>
                <H2>Beveiliging</H2>
                <P>
                  Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen tegen verlies, misbruik en onbevoegde toegang. Denk aan versleutelde verbindingen, tweestapsverificatie op onze systemen en toegang uitsluitend voor medewerkers die de gegevens nodig hebben.
                </P>
              </div>

              <div>
                <H2>Uw rechten</H2>
                <P>U heeft het recht om uw gegevens in te zien, te laten corrigeren of te laten verwijderen. Ook kunt u bezwaar maken tegen de verwerking, de verwerking laten beperken of uw gegevens laten overdragen. Toestemming die u heeft gegeven kunt u altijd intrekken.</P>
                <P>
                  Stuur uw verzoek naar{" "}
                  <a href="mailto:info@fixz24.nl" className="hover:underline" style={{ color: "#464888" }}>info@fixz24.nl</a>. Wij reageren binnen vier weken. Bent u niet tevreden over hoe wij met uw gegevens omgaan, dan kunt u een klacht indienen bij de Autoriteit Persoonsgegevens.
                </P>
              </div>

              <div>
                <H2>Cookies</H2>
                <P>
                  Voor het gebruik van cookies op deze website verwijzen wij naar ons{" "}
                  <Link href="/cookiebeleid" className="hover:underline" style={{ color: "#464888" }}>cookiebeleid</Link>.
                </P>
              </div>

              <div>
                <H2>Wijzigingen</H2>
                <P>
                  Wij kunnen dit privacybeleid aanpassen. De meest actuele versie staat altijd op deze pagina. Bij ingrijpende wijzigingen informeren wij onze klanten actief.
                </P>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
