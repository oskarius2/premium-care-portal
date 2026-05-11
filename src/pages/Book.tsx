import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Calendar as CalIcon,
  Clock,
  Tag,
  Phone,
  Mail,
  User,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { sv } from "date-fns/locale";
import { format as formatDate, addHours, startOfDay } from "date-fns";
import "react-day-picker/dist/style.css";
import { treatments, type Treatment } from "@/data/treatments";
import { siteBookingNotice } from "@/config/siteBrand";
import { siteContact } from "@/config/siteContact";
import { TelLink } from "@/components/ContactAnchors";

/**
 * Formatera ett Date-objekt som lokalt YYYY-MM-DD.
 *
 * Använd ALDRIG `date.toISOString().split("T")[0]` här — det konverterar
 * först till UTC, så en svensk användare som väljer "7 maj" sent på
 * kvällen kan få datumet "6 maj" eller "8 maj" skickat till backend.
 */
const toLocalDateStr = (d: Date): string => formatDate(d, "yyyy-MM-dd");

/** Swedish law: 48 h reflection period for aesthetic treatments. */
const BETANKETID_HOURS = 48;

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const fn = (name: string) => `${SUPABASE_URL}/functions/v1/${name}`;
const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

type Step = "treatment" | "date" | "time" | "details" | "done";

type BookingState = {
  treatmentSlug: string;
  treatmentId: string;
  treatmentName: string;
  date: Date | undefined;
  time: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

type DbTreatmentRef = { id: string; slug: string };

const STEPS: { id: Step; label: string; short: string }[] = [
  { id: "treatment", label: "Konsultation", short: "Val" },
  { id: "date", label: "Dag", short: "Dag" },
  { id: "time", label: "Tid", short: "Tid" },
  { id: "details", label: "Dina uppgifter", short: "Uppg." },
];
const STEP_ORDER: Step[] = ["treatment", "date", "time", "details", "done"];

const formatLongDate = (d: Date | undefined) =>
  d?.toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long" });
const formatShortDate = (d: Date | undefined) =>
  d?.toLocaleDateString("sv-SE", { day: "numeric", month: "long" });

const isDbTreatmentRef = (row: unknown): row is DbTreatmentRef => {
  if (typeof row !== "object" || row === null) return false;
  const candidate = row as Record<string, unknown>;
  return typeof candidate.id === "string" && typeof candidate.slug === "string";
};

export default function Book() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<Step>("treatment");
  const [state, setState] = useState<BookingState>({
    treatmentSlug: "",
    treatmentId: "",
    treatmentName: "",
    date: undefined,
    time: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [dbTreatments, setDbTreatments] = useState<{ id: string; slug: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stepIndex = STEP_ORDER.indexOf(step);
  const go = (s: Step) => { setError(null); setStep(s); };
  const next = () => go(STEP_ORDER[stepIndex + 1]);
  const prev = () => go(STEP_ORDER[stepIndex - 1]);

  const earliest48h = useMemo(() => addHours(new Date(), BETANKETID_HOURS), []);
  const minBookableDate = useMemo(() => startOfDay(earliest48h), [earliest48h]);

  const selectedTreatment = useMemo(
    () => treatments.find((t) => t.slug === state.treatmentSlug),
    [state.treatmentSlug]
  );

  const groupedSlots = useMemo(() => {
    const cutoff = addHours(new Date(), BETANKETID_HOURS);
    const morning: string[] = [];
    const afternoon: string[] = [];
    for (const s of slots) {
      const h = parseInt(s.split(":")[0] ?? "0", 10);
      const m = parseInt(s.split(":")[1] ?? "0", 10);
      if (state.date) {
        const slotDt = new Date(state.date);
        slotDt.setHours(h, m, 0, 0);
        if (slotDt < cutoff) continue;
      }
      (h < 12 ? morning : afternoon).push(s);
    }
    return { morning, afternoon };
  }, [slots, state.date]);

  const fetchTreatmentId = async (slug: string): Promise<string> => {
    if (dbTreatments.length === 0) {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/booking_treatments?select=id,slug&active=eq.true`,
          { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          const parsed = data.filter(isDbTreatmentRef);
          setDbTreatments(parsed);
          return parsed.find((t) => t.slug === slug)?.id ?? slug;
        }
      } catch {
        /* faller tillbaka till slug */
      }
      return slug;
    }
    return dbTreatments.find((t) => t.slug === slug)?.id ?? slug;
  };

  useEffect(() => {
    const slug = searchParams.get("treatment");
    if (!slug) return;
    const t = treatments.find((x) => x.slug === slug);
    if (!t) return;
    (async () => {
      const id = await fetchTreatmentId(t.slug);
      setState((s) => ({ ...s, treatmentSlug: t.slug, treatmentId: id, treatmentName: t.name }));
      setStep("date");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectTreatment = async (slug: string, name: string) => {
    const id = await fetchTreatmentId(slug);
    setState((s) => ({ ...s, treatmentSlug: slug, treatmentId: id, treatmentName: name }));
    next();
  };

  /**
   * Hämtar lediga tider för valt datum.
   *
   * Tar emot `treatmentId` som argument istället för att läsa från `state` —
   * setState är async i React, så om användaren klickar ett datum direkt
   * efter att ha valt behandling kan `state.treatmentId` fortfarande vara
   * tom när effekten körs.
   */
  const loadSlotsFor = async (date: Date, treatmentId: string) => {
    setSlots([]);
    setLoadingSlots(true);
    try {
      const dateStr = toLocalDateStr(date);
      const res = await fetch(
        fn(`get-available-slots?date=${dateStr}&treatment_id=${treatmentId}`),
        { headers }
      );
      if (!res.ok) {
        throw new Error(`Kunde inte h\u00e4mta lediga tider (${res.status})`);
      }
      const data = await res.json();
      setSlots(Array.isArray(data?.slots) ? data.slots : []);
      return true;
    } catch (err) {
      setSlots([]);
      setError(
        err instanceof Error
          ? err.message
          : "Kunde inte h\u00e4mta lediga tider — f\u00f6rs\u00f6k igen."
      );
      return false;
    } finally {
      setLoadingSlots(false);
    }
  };

  const selectDate = async (date: Date) => {
    setState((s) => ({ ...s, date, time: "" }));
    // Tar `treatmentId` från senaste state via uppdatering nedan om det saknas.
    let treatmentId = state.treatmentId;
    if (!treatmentId && state.treatmentSlug) {
      treatmentId = await fetchTreatmentId(state.treatmentSlug);
      setState((s) => ({ ...s, treatmentId }));
    }
    if (!treatmentId) {
      setError("V\u00e4lj konsultation f\u00f6rst.");
      return;
    }
    const ok = await loadSlotsFor(date, treatmentId);
    // G\u00e5 bara vidare till tids-steget om hämtningen lyckades.
    if (ok) next();
  };

  const submit = async () => {
    if (!state.date) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(fn("create-booking"), {
        method: "POST",
        headers,
        body: JSON.stringify({
          treatment_id: state.treatmentId,
          booking_date: toLocalDateStr(state.date),
          start_time: state.time,
          customer_name: state.name,
          customer_email: state.email,
          customer_phone: state.phone || undefined,
          message: state.message || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Något gick fel");
      setBookingId(data.booking_id ?? "ok");
      go("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Något gick fel");
    } finally {
      setSubmitting(false);
    }
  };

  if (bookingId) {
    return <Confirmation state={state} treatment={selectedTreatment} />;
  }

  return (
    <section className="py-8 md:py-14">
      <div className="container-page">
        {/* Sidhuvud */}
        <div className="max-w-2xl mb-8 md:mb-12">
          <span className="eyebrow mb-3">Boka konsultation</span>
          <h1 className="heading-lg">Boka din konsultation hos oss</h1>
          <p className="lead mt-3">
            Fyra korta steg. Första bokningstillfället är konsultation och information
            inför eventuell behandling.
          </p>
        </div>

        {/* Stepper */}
        <Stepper stepIndex={stepIndex} />

        {/* Layout: huvudinnehåll + sticky summary */}
        <div className="mt-8 md:mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
          <div className="min-w-0">
            {/* STEG: Konsultation */}
            {step === "treatment" && (
              <StepShell
                eyebrow="Steg 1 av 4"
                title="Vad vill du boka konsultation för?"
                description="Välj det område du vill prata om. Valet är inte ett beslut om behandling."
              >
                <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {siteBookingNotice}
                  </p>
                </div>
                <ul className="space-y-3">
                  {treatments.map((t) => (
                    <li key={t.slug}>
                      <button
                        onClick={() => selectTreatment(t.slug, t.name)}
                        className="group w-full text-left bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-[var(--shadow-lift)] focus-visible:border-primary transition-all p-4 sm:p-5 flex items-center gap-4 sm:gap-5"
                      >
                        <div className="relative shrink-0 overflow-hidden rounded-md w-20 h-20 sm:w-24 sm:h-24">
                          <img
                            src={t.image}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary/80 mb-1">
                            {t.category}
                          </p>
                          <p className="font-serif text-xl sm:text-2xl leading-tight tracking-tight text-foreground truncate">
                            {t.name}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground mt-2">
                            <span className="inline-flex items-center gap-1.5">
                              <ShieldCheck size={14} className="text-primary" /> Konsultation först
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Tag size={14} className="text-primary" /> {t.price}
                            </span>
                          </div>
                        </div>
                        <ArrowRight
                          size={20}
                          className="text-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </StepShell>
            )}

            {/* STEG: Dag */}
            {step === "date" && (
              <StepShell
                eyebrow="Steg 2 av 4"
                title="Välj dag för konsultation"
                description={`För ${state.treatmentName}`}
              >
                <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    För estetiska behandlingar gäller{" "}
                    <strong className="text-foreground">48 timmars betänketid</strong> efter
                    konsultation och information. Första besöket är konsultation; tidigaste
                    möjliga dag i onlinebokningen är{" "}
                    <strong className="text-foreground">{formatShortDate(minBookableDate)}</strong>.
                  </p>
                </div>
                <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-3 sm:p-6">
                  <DayPicker
                    mode="single"
                    locale={sv}
                    weekStartsOn={1}
                    selected={state.date}
                    onSelect={(d) => d && selectDate(d)}
                    disabled={{ before: minBookableDate }}
                    showOutsideDays
                    className="!m-0"
                    classNames={{
                      months: "flex flex-col gap-4",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 pb-2 relative items-center",
                      caption_label:
                        "font-serif text-xl sm:text-2xl tracking-tight capitalize text-foreground",
                      nav: "flex items-center gap-1",
                      nav_button:
                        "h-9 w-9 rounded-md border border-border bg-card hover:bg-accent-soft hover:border-primary/40 transition-colors flex items-center justify-center text-foreground/70",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse",
                      head_row: "flex",
                      head_cell:
                        "text-muted-foreground rounded-md flex-1 font-semibold text-[0.65rem] uppercase tracking-[0.16em] py-2",
                      row: "flex w-full mt-1.5",
                      cell: "flex-1 aspect-square text-center text-sm relative p-0.5",
                      day:
                        "w-full h-full p-0 font-normal text-base text-foreground rounded-md hover:bg-accent-soft hover:text-accent-deep transition-colors flex items-center justify-center",
                      day_selected:
                        "!bg-primary !text-primary-foreground hover:!bg-accent-deep font-semibold",
                      day_today:
                        "ring-1 ring-primary/40 ring-offset-1 ring-offset-white font-semibold",
                      day_outside: "text-foreground/30",
                      day_disabled:
                        "text-foreground/25 cursor-not-allowed hover:bg-transparent hover:text-foreground/25",
                    }}
                  />
                </div>
                <ActionBar onBack={prev} />
              </StepShell>
            )}

            {/* STEG: Tid */}
            {step === "time" && (
              <StepShell
                eyebrow="Steg 3 av 4"
                title="Välj en tid"
                description={
                  state.date
                    ? `${formatLongDate(state.date)} · konsultation för ${state.treatmentName}`
                    : state.treatmentName
                }
              >
                {loadingSlots ? (
                  <div className="bg-card rounded-2xl border border-border p-10 text-center text-muted-foreground">
                    <Sparkles className="mx-auto mb-3 text-primary animate-pulse" size={24} />
                    <p className="text-base">Hämtar tillgängliga tider…</p>
                  </div>
                ) : slots.length === 0 ? (
                  <div className="bg-card rounded-2xl border border-border p-8 sm:p-10 text-center">
                    <CalIcon className="mx-auto mb-3 text-foreground/40" size={28} />
                    <p className="font-serif text-2xl mb-2">Inga lediga tider</p>
                    <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                      Den här dagen är fullbokad eller utanför öppettiderna. Välj en annan dag — eller ring oss så hjälper vi till manuellt.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button onClick={prev} className="btn-secondary">
                        <ArrowLeft size={18} /> Välj en annan dag
                      </button>
                      <TelLink className="btn-primary">
                        <Phone size={18} /> Ring kliniken
                      </TelLink>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {groupedSlots.morning.length > 0 && (
                      <SlotGroup
                        label="Förmiddag"
                        slots={groupedSlots.morning}
                        onPick={(t) => {
                          setState((s) => ({ ...s, time: t }));
                          next();
                        }}
                      />
                    )}
                    {groupedSlots.afternoon.length > 0 && (
                      <SlotGroup
                        label="Eftermiddag"
                        slots={groupedSlots.afternoon}
                        onPick={(t) => {
                          setState((s) => ({ ...s, time: t }));
                          next();
                        }}
                      />
                    )}
                  </div>
                )}
                <ActionBar onBack={prev} />
              </StepShell>
            )}

            {/* STEG: Uppgifter */}
            {step === "details" && (
              <StepShell
                eyebrow="Steg 4 av 4"
                title="Dina uppgifter"
                description="Vi använder uppgifterna enbart för att bekräfta din konsultation och skicka påminnelse."
              >
                <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-5 sm:p-7 space-y-5">
                  <Field
                    label="Ditt namn"
                    icon={User}
                    autoComplete="name"
                    placeholder="För- och efternamn"
                    value={state.name}
                    onChange={(v) => setState((s) => ({ ...s, name: v }))}
                    required
                  />
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field
                      label="E-post"
                      icon={Mail}
                      type="email"
                      autoComplete="email"
                      placeholder="namn@exempel.se"
                      value={state.email}
                      onChange={(v) => setState((s) => ({ ...s, email: v }))}
                      required
                    />
                    <Field
                      label="Telefon"
                      icon={Phone}
                      type="tel"
                      autoComplete="tel"
                      optional
                      placeholder="070-123 45 67"
                      value={state.phone}
                      onChange={(v) => setState((s) => ({ ...s, phone: v }))}
                    />
                  </div>
                  <Field
                    label="Meddelande"
                    icon={MessageSquare}
                    optional
                    placeholder="T.ex. allergier, läkemedel eller annat vi bör veta."
                    textarea
                    value={state.message}
                    onChange={(v) => setState((s) => ({ ...s, message: v }))}
                  />

                  {error && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 bg-destructive/8 border border-destructive/30 text-destructive rounded-md p-4"
                    >
                      <AlertCircle size={18} className="mt-0.5 shrink-0" />
                      <p className="text-sm font-medium leading-relaxed">{error}</p>
                    </div>
                  )}

                  <p className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed pt-1">
                    <ShieldCheck size={14} className="text-primary mt-0.5 shrink-0" />
                    <span>
                      Vi behandlar uppgifterna enligt GDPR. Inga reklamutskick — bara konsultation och eventuell uppföljning.
                    </span>
                  </p>
                </div>

                <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
                  <button onClick={prev} className="btn-secondary">
                    <ArrowLeft size={18} /> Tillbaka
                  </button>
                  <button
                    onClick={submit}
                    disabled={submitting || !state.name || !state.email}
                    className="btn-primary btn-large disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Sparkles size={18} className="animate-pulse" /> Skickar…
                      </>
                    ) : (
                      <>
                        Bekräfta konsultation <Check size={20} />
                      </>
                    )}
                  </button>
                </div>
              </StepShell>
            )}
          </div>

          {/* Sammanfattning – sticky på lg+, kompakt ovanför p mobil (CSS-ordnad via DOM order: efter på lg, innan på mobil) */}
          <div className="lg:order-last lg:row-start-1">
            <BookingSummary state={state} treatment={selectedTreatment} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Subcomponents --------------------------- */

function Stepper({ stepIndex }: { stepIndex: number }) {
  return (
    <ol className="flex items-center gap-1 sm:gap-2" aria-label="Bokningssteg">
      {STEPS.map((s, i) => {
        const done = i < stepIndex;
        const active = i === stepIndex;
        const isLast = i === STEPS.length - 1;
        return (
          <li
            key={s.id}
            className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 last:flex-none"
            aria-current={active ? "step" : undefined}
          >
            <span
              className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-serif text-sm sm:text-base border transition-colors ${
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : done
                  ? "bg-accent-deep text-white border-accent-deep"
                  : "bg-card text-foreground/45 border-border"
              }`}
            >
              {done ? <Check size={14} strokeWidth={2.5} /> : i + 1}
            </span>
            <span
              className={`hidden sm:block text-xs sm:text-sm font-medium tracking-tight truncate ${
                active ? "text-foreground" : done ? "text-foreground/80" : "text-foreground/45"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block sm:hidden text-[0.65rem] font-semibold uppercase tracking-[0.16em] truncate ${
                active ? "text-foreground" : "text-foreground/40"
              }`}
            >
              {active ? s.label : ""}
            </span>
            {!isLast && (
              <span
                className={`flex-1 min-w-[8px] h-px ${done ? "bg-accent-deep/60" : "bg-border"}`}
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function StepShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6 sm:mb-7">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary/80 mb-2">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl leading-tight tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

function ActionBar({ onBack }: { onBack: () => void }) {
  return (
    <div className="mt-6 flex">
      <button onClick={onBack} className="btn-secondary">
        <ArrowLeft size={18} /> Tillbaka
      </button>
    </div>
  );
}

function SlotGroup({
  label,
  slots,
  onPick,
}: {
  label: string;
  slots: string[];
  onPick: (t: string) => void;
}) {
  return (
    <div>
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary/80 mb-3">
        {label}
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
        {slots.map((t) => (
          <button
            key={t}
            onClick={() => onPick(t)}
            className="px-2 py-3 sm:py-3.5 rounded-md bg-card border border-border hover:border-primary hover:bg-accent-soft hover:text-accent-deep text-base sm:text-lg font-medium tabular-nums tracking-tight min-h-[48px] sm:min-h-[54px] transition-colors"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

function BookingSummary({
  state,
  treatment,
}: {
  state: BookingState;
  treatment: Treatment | undefined;
}) {
  const dateStr = formatLongDate(state.date);
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-5 sm:p-6">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary/80 mb-4">
          Din konsultation
        </p>

        {treatment ? (
          <div className="flex items-start gap-3 mb-5 pb-5 border-b border-border">
            <img
              src={treatment.image}
              alt=""
              className="w-14 h-14 object-cover rounded-md shrink-0"
            />
            <div className="min-w-0">
              <p className="font-serif text-lg leading-tight tracking-tight">{treatment.name}</p>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {treatment.category} · konsultation först
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-5 pb-5 border-b border-border">
            Ingen konsultation vald än.
          </p>
        )}

        <ul className="space-y-3 text-sm">
          <SummaryRow
            icon={CalIcon}
            label="Datum"
            value={state.date ? dateStr : null}
            placeholder="Väljs i nästa steg"
          />
          <SummaryRow
            icon={Clock}
            label="Tid"
            value={state.time || null}
            placeholder="Väljs efter datum"
            tabular
          />
        </ul>

        <p className="text-[0.7rem] text-muted-foreground mt-6 leading-relaxed">
          Första besöket är konsultation. Eventuell behandling planeras efter konsultation
          och 48 timmars betänketid.
        </p>
      </div>

      <div className="hidden lg:block mt-5 px-1">
        <p className="text-xs text-muted-foreground mb-2">Behöver du hjälp?</p>
        {siteContact.phoneDisplay.trim() && siteContact.phoneTel ? (
          <TelLink className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-deep transition-colors">
            <Phone size={14} /> {siteContact.phoneDisplay}
          </TelLink>
        ) : (
          <Link to="/kontakt" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-deep transition-colors">
            <ArrowRight size={14} /> Se adress & kontakt
          </Link>
        )}
      </div>
    </aside>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  placeholder,
  tabular,
}: {
  icon: typeof CalIcon;
  label: string;
  value: string | null | undefined;
  placeholder: string;
  tabular?: boolean;
}) {
  const filled = !!value;
  return (
    <li className="flex items-start gap-3">
      <Icon
        size={16}
        className={`mt-0.5 shrink-0 ${filled ? "text-primary" : "text-foreground/30"}`}
      />
      <div className="min-w-0 flex-1">
        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
        <p
          className={`text-sm leading-snug ${filled ? "text-foreground" : "text-foreground/45"} ${
            tabular ? "tabular-nums" : ""
          }`}
        >
          {value || placeholder}
        </p>
      </div>
    </li>
  );
}

/* --------------------------- Confirmation --------------------------- */

function Confirmation({
  state,
  treatment,
}: {
  state: BookingState;
  treatment: Treatment | undefined;
}) {
  return (
    <section className="py-12 md:py-20">
      <div className="container-page max-w-3xl">
        <div className="text-center mb-10">
          <span
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-soft text-primary mx-auto mb-6"
            aria-hidden
          >
            <Check size={32} strokeWidth={2.25} />
          </span>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary/80 mb-3">
            Konsultation bekräftad
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
            Tack — vi ses snart.
          </h1>
          <p className="lead mt-4 max-w-xl mx-auto">
            Vi har skickat en bekräftelse till{" "}
            <span className="text-foreground font-medium">{state.email}</span>. Kontrollera även
            skräpposten om du inte hittar mejlet.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-6 sm:p-8">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary/80 mb-5">
            Din konsultation
          </p>

          <div className="grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 items-start">
            {treatment && (
              <img
                src={treatment.image}
                alt=""
                className="w-full sm:w-32 sm:h-32 aspect-square object-cover rounded-md"
              />
            )}
            <div className="space-y-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground mb-1">
                  Konsultation om
                </p>
                <p className="font-serif text-2xl tracking-tight">{state.treatmentName}</p>
                {treatment && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {treatment.category} · konsultation först
                  </p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border">
                <DetailRow icon={CalIcon} label="Datum" value={formatLongDate(state.date) ?? "—"} />
                <DetailRow icon={Clock} label="Tid" value={state.time || "—"} tabular />
                <DetailRow icon={User} label="Namn" value={state.name || "—"} />
                {state.phone && <DetailRow icon={Phone} label="Telefon" value={state.phone} tabular />}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-center">
          <Link to="/" className="btn-secondary">
            Tillbaka till start
          </Link>
          {siteContact.phoneDisplay.trim() && siteContact.phoneTel ? (
            <TelLink className="btn-primary">
              <Phone size={18} /> {siteContact.phoneDisplay}
            </TelLink>
          ) : (
            <Link to="/kontakt" className="btn-primary">
              <ArrowRight size={18} /> Kontakt & adress
            </Link>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-8 leading-relaxed max-w-md mx-auto">
          Det bekräftade besöket gäller konsultation och viktig information. Eventuell behandling
          bokas först efter konsultation och 48 timmars betänketid.
        </p>
      </div>
    </section>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  tabular,
}: {
  icon: typeof CalIcon;
  label: string;
  value: string;
  tabular?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="text-primary mt-1 shrink-0" />
      <div className="min-w-0">
        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
        <p className={`text-sm font-medium text-foreground ${tabular ? "tabular-nums" : ""}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

/* --------------------------- Form Field --------------------------- */

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  optional,
  textarea,
  placeholder,
  autoComplete,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  optional?: boolean;
  textarea?: boolean;
  placeholder?: string;
  autoComplete?: string;
  icon?: typeof User;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 mb-2">
        <span className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-foreground/70">
          {Icon && <Icon size={13} className="text-primary" />}
          <span>
            {label}
            {required && <span className="text-primary"> *</span>}
          </span>
        </span>
        {optional && (
          <span className="text-[0.65rem] uppercase tracking-[0.16em] text-foreground/40">
            valfritt
          </span>
        )}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder={placeholder}
          className="w-full px-4 py-3 text-base rounded-md border border-border focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none bg-card placeholder:text-foreground/35 transition-shadow"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="w-full px-4 py-3 text-base rounded-md border border-border focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none bg-card placeholder:text-foreground/35 min-h-[52px] transition-shadow"
        />
      )}
    </label>
  );
}
