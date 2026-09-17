// Vercel serverless function: POST /api/contact
// Verstuurt het contactformulier per e-mail via Resend (env RESEND_API_KEY)
// en/of stuurt het door naar een webhook (env CONTACT_WEBHOOK_URL, bijv. Zapier/GHL).
// Minimaal één van beide moet ingesteld zijn in de Vercel-omgeving.

type Req = { method?: string; body?: unknown; headers: Record<string, string | string[] | undefined> };
type Res = {
  status: (code: number) => Res;
  json: (data: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

const TO = process.env.CONTACT_TO || "info@fixz24.nl";
const FROM = process.env.CONTACT_FROM || "Fixz24 Website <website@fixz24.nl>";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL;

const BEDRIJFSTYPEN: Record<string, string> = {
  zzp: "ZZP / Eenmanszaak",
  vof: "VOF",
  bv: "BV",
  starter: "Starter (nog geen bedrijf)",
  anders: "Anders",
};

function sanitize(v: unknown, maxLen: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, maxLen).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

async function sendViaResend(p: Record<string, string>) {
  const rows = [
    ["Naam", p.naam],
    ["E-mail", p.email],
    ["Telefoon", p.telefoon || "-"],
    ["Bedrijfstype", BEDRIJFSTYPEN[p.bedrijfstype] || p.bedrijfstype || "-"],
    ["Bericht", p.bericht],
  ];
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#1a1a2e">
      <h2 style="color:#464888;margin:0 0 16px">Nieuw bericht via fixz24.nl</h2>
      <table cellpadding="8" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="font-weight:bold;vertical-align:top;border-bottom:1px solid #eee">${k}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
          )
          .join("")}
      </table>
      <p style="color:#888;font-size:12px;margin-top:20px">Verzonden op ${p.timestamp}</p>
    </div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: p.email,
      subject: `Contactformulier: ${p.naam}`,
      html,
      text,
    }),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
}

async function sendViaWebhook(p: Record<string, string>) {
  const r = await fetch(WEBHOOK_URL as string, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...p, bron: "Website contactformulier - fixz24.nl" }),
  });
  if (!r.ok) throw new Error(`Webhook ${r.status}`);
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const body = (typeof req.body === "string" ? safeParse(req.body) : req.body) as Record<string, unknown> | null;
  if (!body) return res.status(400).json({ error: "Ongeldige aanvraag" });

  // Honeypot: bots vullen dit veld, mensen niet. Doe alsof het gelukt is.
  if (sanitize(body.website, 200)) return res.status(200).json({ ok: true });

  const payload = {
    naam: sanitize(body.naam, 120),
    email: sanitize(body.email, 160),
    telefoon: sanitize(body.telefoon, 40),
    bedrijfstype: sanitize(body.bedrijfstype, 40),
    bericht: sanitize(body.bericht, 4000),
    timestamp: new Date().toISOString(),
  };

  if (!payload.naam || !payload.email || !payload.bericht) {
    return res.status(400).json({ error: "Vul alle verplichte velden in." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return res.status(400).json({ error: "E-mailadres lijkt niet te kloppen." });
  }

  if (!RESEND_API_KEY && !WEBHOOK_URL) {
    console.error("[contact] RESEND_API_KEY en CONTACT_WEBHOOK_URL ontbreken beide; bericht niet verzonden:", payload);
    return res.status(503).json({ error: "Het formulier is tijdelijk niet beschikbaar. Mail ons op info@fixz24.nl." });
  }

  const results = await Promise.allSettled([
    RESEND_API_KEY ? sendViaResend(payload) : Promise.resolve(),
    WEBHOOK_URL ? sendViaWebhook(payload) : Promise.resolve(),
  ]);
  const failed = results.filter((r) => r.status === "rejected") as PromiseRejectedResult[];
  failed.forEach((f) => console.error("[contact]", f.reason));

  // Zolang minstens één kanaal slaagde is het bericht aangekomen.
  if (failed.length === results.filter((_, i) => (i === 0 ? !!RESEND_API_KEY : !!WEBHOOK_URL)).length) {
    return res.status(502).json({ error: "Verzenden is niet gelukt. Probeer het later opnieuw of mail ons op info@fixz24.nl." });
  }
  return res.status(200).json({ ok: true });
}

function safeParse(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
