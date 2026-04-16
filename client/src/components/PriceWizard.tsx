/* ============================================================
   FIXZ24 — Price Wizard
   3-step quiz: rechtsvorm → volume → personeel → recommendation
   ============================================================ */

import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";

type Rechtsvorm = "zzp" | "vof" | "bv" | "starter";
type Volume = "low" | "mid" | "high";
type Personeel = "none" | "small" | "large";

type Pakket = "Starter" | "Groei" | "Premium";

type Question = {
  id: "rechtsvorm" | "volume" | "personeel";
  title: string;
  sub: string;
  options: { value: string; label: string; hint: string }[];
};

const questions: Question[] = [
  {
    id: "rechtsvorm",
    title: "Wat is je rechtsvorm?",
    sub: "Dit bepaalt welke belastingen en verplichtingen we voor je regelen.",
    options: [
      { value: "zzp", label: "ZZP", hint: "Zelfstandige ondernemer" },
      { value: "vof", label: "VOF", hint: "Vennootschap onder firma" },
      { value: "bv", label: "BV", hint: "Besloten vennootschap" },
      { value: "starter", label: "Starter", hint: "Net begonnen / oprichting" },
    ],
  },
  {
    id: "volume",
    title: "Hoeveel uur administratie per maand?",
    sub: "Een schatting is prima. Hierop baseren we de werkintensiteit.",
    options: [
      { value: "low", label: "< 5 uur", hint: "Licht — weinig facturen" },
      { value: "mid", label: "5–15 uur", hint: "Gemiddeld volume" },
      { value: "high", label: "15+ uur", hint: "Intensief — veel transacties" },
    ],
  },
  {
    id: "personeel",
    title: "Heb je personeel in dienst?",
    sub: "Voor loonadministratie en salarisverwerking.",
    options: [
      { value: "none", label: "Nee", hint: "Geen personeel" },
      { value: "small", label: "1–3 medewerkers", hint: "Klein team" },
      { value: "large", label: "3+ medewerkers", hint: "Groter team" },
    ],
  },
];

function recommend(r: Rechtsvorm, v: Volume, p: Personeel): {
  pakket: Pakket;
  reason: string;
} {
  // BV → Premium (altijd VPB + typisch personeel)
  if (r === "bv") {
    return {
      pakket: "Premium",
      reason: "Als BV heb je vennootschapsbelasting en typisch ook salarisverwerking nodig.",
    };
  }
  // 3+ medewerkers → Premium (onbeperkte salarisverwerking)
  if (p === "large") {
    return {
      pakket: "Premium",
      reason: "Met 3+ medewerkers heb je baat bij onbeperkte salarisverwerking en dedicated accountmanager.",
    };
  }
  // Hoog volume → Premium
  if (v === "high") {
    return {
      pakket: "Premium",
      reason: "Bij 15+ uur administratie per maand krijg je de ruimte voor maandelijks contact en uitgebreide rapportages.",
    };
  }
  // Personeel of VOF of middelmatig volume → Groei
  if (p === "small" || r === "vof" || v === "mid") {
    return {
      pakket: "Groei",
      reason: "Je hebt iets meer nodig dan de basis: salarisverwerking, maandelijkse rapportages en telefonisch advies.",
    };
  }
  // Anders → Starter
  return {
    pakket: "Starter",
    reason: "Voor een ZZP'er of starter met beperkt volume is het Starter-pakket de slimme keuze.",
  };
}

const pakketData: Record<Pakket, { price: string; features: string[]; highlight?: boolean }> = {
  Starter: {
    price: "€ 79 / maand",
    features: ["Volledige boekhouding", "Kwartaallijkse BTW-aangifte", "Jaarrekening", "Inkomstenbelasting"],
  },
  Groei: {
    price: "€ 149 / maand",
    features: ["Alles in Starter", "Salarisverwerking (t/m 3)", "Maandelijkse rapportages", "Telefonisch advies"],
    highlight: true,
  },
  Premium: {
    price: "€ 249 / maand",
    features: ["Alles in Groei", "Salarisverwerking (onbeperkt)", "Vennootschapsbelasting", "Dedicated accountmanager"],
  },
};

export default function PriceWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ rechtsvorm?: Rechtsvorm; volume?: Volume; personeel?: Personeel }>({});

  const select = (value: string) => {
    const q = questions[step];
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 280);
    } else {
      setTimeout(() => setStep(questions.length), 280);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  const isDone = step >= questions.length;
  const progress = isDone ? 1 : step / questions.length;

  return (
    <div
      className="rounded-3xl overflow-hidden relative"
      style={{
        background: "linear-gradient(145deg, #ffffff 0%, #fafaff 100%)",
        border: "1px solid rgba(70,72,136,0.1)",
        boxShadow: "0 20px 60px rgba(70,72,136,0.1)",
      }}
    >
      {/* Progress bar */}
      <div className="h-1 bg-[rgba(70,72,136,0.08)]">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, #464888, #ac9773)",
          }}
        />
      </div>

      <div className="p-8 md:p-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style={{ background: "rgba(172,151,115,0.12)" }}>
              <Sparkles className="w-3.5 h-3.5" style={{ color: "#ac9773" }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#ac9773" }}>Pakketwizard</span>
            </div>
            <h3 className="text-2xl md:text-3xl mb-1" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>
              Welk pakket past bij jou?
            </h3>
            <p className="text-sm text-muted-foreground">
              {isDone ? "Klaar — hier is onze aanbeveling." : `Stap ${step + 1} van ${questions.length}`}
            </p>
          </div>
          {isDone && (
            <button
              onClick={reset}
              className="text-xs flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors hover:bg-[rgba(70,72,136,0.08)]"
              style={{ color: "#464888" }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Opnieuw
            </button>
          )}
        </div>

        {!isDone ? (
          <QuestionStep
            key={step}
            question={questions[step]}
            selected={answers[questions[step].id]}
            onSelect={select}
          />
        ) : (
          <Result
            pakket={recommend(answers.rechtsvorm!, answers.volume!, answers.personeel!).pakket}
            reason={recommend(answers.rechtsvorm!, answers.volume!, answers.personeel!).reason}
          />
        )}
      </div>
    </div>
  );
}

function QuestionStep({
  question,
  selected,
  onSelect,
}: {
  question: Question;
  selected?: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="animate-[scale-in_0.35s_ease_both]">
      <h4 className="text-xl mb-2" style={{ color: "#1a1a2e", fontFamily: "Playfair Display, serif" }}>
        {question.title}
      </h4>
      <p className="text-sm text-muted-foreground mb-6">{question.sub}</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {question.options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className="text-left p-4 rounded-xl transition-all duration-200 group"
              style={{
                background: isSelected ? "linear-gradient(135deg, #464888, #2e3060)" : "white",
                border: `1.5px solid ${isSelected ? "#464888" : "rgba(70,72,136,0.12)"}`,
                boxShadow: isSelected ? "0 8px 20px rgba(70,72,136,0.25)" : "0 2px 8px rgba(70,72,136,0.04)",
                transform: isSelected ? "translateY(-2px)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(70,72,136,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(70,72,136,0.12)";
                  (e.currentTarget as HTMLElement).style.transform = "none";
                }
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className="font-bold text-base"
                  style={{ color: isSelected ? "white" : "#1a1a2e", fontFamily: "Playfair Display, serif" }}
                >
                  {opt.label}
                </span>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#ac9773" }}>
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <span
                className="text-xs"
                style={{ color: isSelected ? "rgba(255,255,255,0.75)" : "#888" }}
              >
                {opt.hint}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Result({ pakket, reason }: { pakket: Pakket; reason: string }) {
  const data = pakketData[pakket];
  return (
    <div className="animate-[scale-in_0.5s_cubic-bezier(0.34,1.56,0.64,1)_both]">
      <div
        className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #464888 0%, #2e3060 100%)",
          boxShadow: "0 20px 50px rgba(70,72,136,0.3)",
        }}
      >
        {/* Shimmer */}
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #ac9773, transparent)" }} />
        {/* Tech grid */}
        <div className="absolute inset-0 tech-grid opacity-10" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4" style={{ color: "#ac9773" }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#c4b08e" }}>
              Onze aanbeveling
            </span>
          </div>
          <h4 className="text-3xl md:text-4xl text-white mb-1" style={{ fontFamily: "Playfair Display, serif" }}>
            {pakket}
          </h4>
          <p className="text-2xl font-bold mb-4" style={{ color: "#c4b08e", fontFamily: "Playfair Display, serif" }}>
            {data.price}
          </p>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
            {reason}
          </p>

          <ul className="space-y-2 mb-6">
            {data.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(172,151,115,0.3)" }}>
                  <CheckCircle2 className="w-2.5 h-2.5" style={{ color: "#c4b08e" }} />
                </div>
                {f}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #ac9773, #c4b08e)", color: "white", boxShadow: "0 6px 20px rgba(172,151,115,0.35)" }}
            >
              Start met {pakket}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#pakketten"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-white/10"
              style={{ color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              Vergelijk alle pakketten
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
