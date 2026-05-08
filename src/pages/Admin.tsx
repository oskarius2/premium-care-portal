import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X, Trash2, Plus, Calendar, Clock, Bell, LogOut, LayoutDashboard, CalendarDays, Ban, Mail, Phone, MessageSquare, TrendingUp, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Booking = {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  message: string | null;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
  treatment_id: string;
  seen_by_admin: boolean;
  created_at: string;
};

type Treatment = { id: string; name: string; category: string; duration_minutes: number };
type Rule = { id: string; day_of_week: number; start_time: string; end_time: string };
type Blocked = { id: string; blocked_date: string; all_day: boolean; start_time: string | null; end_time: string | null; reason: string | null };

const DAYS = ["", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];

const STATUS_LABELS: Record<string, string> = {
  confirmed: "Bekräftad",
  completed: "Genomförd",
  cancelled: "Avbokad",
  no_show: "Uteblev",
};

const STATUS_COLORS: Record<string, string> = {
  confirmed: "text-accent-deep bg-accent-soft border-primary/20",
  completed: "text-foreground/60 bg-muted border-border",
  cancelled: "text-destructive/80 bg-destructive/10 border-destructive/20",
  no_show: "text-muted-foreground bg-muted border-border",
};

type WindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

// Web Audio: kort, mjuk "ding" — ingen extern fil
const playDing = () => {
  try {
    const AudioContextCtor =
      window.AudioContext || (window as WindowWithWebkitAudio).webkitAudioContext;
    if (!AudioContextCtor) return;
    const ctx = new AudioContextCtor();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type = "sine";
    o.frequency.setValueAtTime(880, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    o.start();
    o.stop(ctx.currentTime + 0.65);
  } catch { /* ignore */ }
};

const todayStr = () => new Date().toISOString().slice(0, 10);
const fmtDateLong = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long" });

export default function Admin() {
  const navigate = useNavigate();
  const [authChecking, setAuthChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");

  const [tab, setTab] = useState<"dashboard" | "bookings" | "availability" | "blocked">("dashboard");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [treatments, setTreatments] = useState<Record<string, Treatment>>({});
  const [rules, setRules] = useState<Rule[]>([]);
  const [blocked, setBlocked] = useState<Blocked[]>([]);
  const [loading, setLoading] = useState(true);

  const [newRule, setNewRule] = useState({ day_of_week: 1, start_time: "09:00", end_time: "17:00" });
  const [newBlocked, setNewBlocked] = useState({ blocked_date: "", all_day: true, start_time: "09:00", end_time: "17:00", reason: "" });

  // Bokningar — sök/filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "confirmed" | "completed" | "cancelled" | "no_show">("all");
  const [rangeFilter, setRangeFilter] = useState<"upcoming" | "today" | "week" | "month" | "past" | "all">("upcoming");
  const [treatmentFilter, setTreatmentFilter] = useState<string>("all");

  const initialLoadDone = useRef(false);

  // ── AUTH ────────────────────────────────────────────────
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) {
        navigate("/admin/auth", { replace: true });
        return;
      }
      setUserEmail(session.user.email ?? "");
      // Check role via has_role through user_roles table directly
      supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle()
        .then(({ data }) => {
          setIsAdmin(!!data);
          setAuthChecking(false);
        });
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin/auth", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // ── DATA LOAD ──────────────────────────────────────────
  const loadAll = useCallback(async () => {
    setLoading(true);
    const [bRes, tRes, rRes, blRes] = await Promise.all([
      supabase.from("bookings").select("*").order("booking_date", { ascending: false }).order("start_time", { ascending: true }),
      supabase.from("booking_treatments").select("id,name,category,duration_minutes"),
      supabase.from("availability_rules").select("*").order("day_of_week"),
      supabase.from("blocked_times").select("*").order("blocked_date", { ascending: false }),
    ]);
    if (bRes.data) setBookings(bRes.data as Booking[]);
    if (tRes.data) {
      const map: Record<string, Treatment> = {};
      tRes.data.forEach((t) => (map[t.id] = t));
      setTreatments(map);
    }
    if (rRes.data) setRules(rRes.data as Rule[]);
    if (blRes.data) setBlocked(blRes.data as Blocked[]);
    setLoading(false);
    initialLoadDone.current = true;
  }, []);

  useEffect(() => {
    if (isAdmin) loadAll();
  }, [isAdmin, loadAll]);

  // ── REALTIME ───────────────────────────────────────────
  useEffect(() => {
    if (!isAdmin) return;
    const channel = supabase
      .channel("admin-bookings")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "bookings" }, (payload) => {
        const b = payload.new as Booking;
        setBookings((prev) => [{ ...b, seen_by_admin: false }, ...prev.filter((x) => x.id !== b.id)]);
        if (initialLoadDone.current) {
          playDing();
          toast.success("Ny bokning!", { description: `${b.customer_name} · ${b.booking_date} ${b.start_time.slice(0,5)}` });
        }
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "bookings" }, (payload) => {
        const b = payload.new as Booking;
        setBookings((prev) => prev.map((x) => (x.id === b.id ? b : x)));
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "bookings" }, (payload) => {
        const oldRow = payload.old as { id: string };
        setBookings((prev) => prev.filter((x) => x.id !== oldRow.id));
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isAdmin]);

  // ── DERIVED ────────────────────────────────────────────
  const unseenCount = useMemo(() => bookings.filter((b) => !b.seen_by_admin && b.status === "confirmed").length, [bookings]);
  const today = todayStr();
  const todayBookings = useMemo(() => bookings
    .filter((b) => b.booking_date === today && b.status !== "cancelled")
    .sort((a, b) => a.start_time.localeCompare(b.start_time)), [bookings, today]);

  const stats = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString().slice(0, 10);
    const monthAgo = new Date(now.getTime() - 30 * 86400000).toISOString().slice(0, 10);
    const upcoming = bookings.filter((b) => b.booking_date >= today && b.status === "confirmed");
    return {
      today: todayBookings.length,
      week: bookings.filter((b) => b.booking_date >= weekAgo && b.status !== "cancelled").length,
      month: bookings.filter((b) => b.booking_date >= monthAgo && b.status !== "cancelled").length,
      upcoming: upcoming.length,
    };
  }, [bookings, today, todayBookings]);

  // ── ACTIONS ────────────────────────────────────────────
  const markAllSeen = async () => {
    const ids = bookings.filter((b) => !b.seen_by_admin).map((b) => b.id);
    if (!ids.length) return;
    await supabase.from("bookings").update({ seen_by_admin: true }).in("id", ids);
    setBookings((prev) => prev.map((b) => ({ ...b, seen_by_admin: true })));
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    toast.success(STATUS_LABELS[status]);
  };

  const deleteRule = async (id: string) => {
    const { error } = await supabase.from("availability_rules").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRules((prev) => prev.filter((r) => r.id !== id));
  };
  const addRule = async () => {
    const { data, error } = await supabase.from("availability_rules").insert(newRule).select().single();
    if (error) return toast.error(error.message);
    setRules((prev) => [...prev, data as Rule]);
    toast.success("Regel tillagd");
  };

  const deleteBlocked = async (id: string) => {
    const { error } = await supabase.from("blocked_times").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setBlocked((prev) => prev.filter((b) => b.id !== id));
  };
  const addBlocked = async () => {
    if (!newBlocked.blocked_date) return toast.error("Välj datum");
    const payload = {
      blocked_date: newBlocked.blocked_date,
      all_day: newBlocked.all_day,
      start_time: newBlocked.all_day ? null : newBlocked.start_time,
      end_time: newBlocked.all_day ? null : newBlocked.end_time,
      reason: newBlocked.reason || null,
    };
    const { data, error } = await supabase.from("blocked_times").insert(payload).select().single();
    if (error) return toast.error(error.message);
    setBlocked((prev) => [data as Blocked, ...prev]);
    setNewBlocked({ blocked_date: "", all_day: true, start_time: "09:00", end_time: "17:00", reason: "" });
    toast.success("Tid spärrad");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth", { replace: true });
  };

  // ── RENDER GUARDS ──────────────────────────────────────
  if (authChecking) {
    return (
      <section className="pt-40 pb-32 container-narrow text-center">
        <p className="text-sm text-muted-foreground font-light">Verifierar...</p>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="pt-28 md:pt-40 pb-32 container-narrow max-w-md">
        <p className="eyebrow mb-5">Admin</p>
        <h1 className="heading-section heading-h2 mb-6">Ingen <span className="italic text-primary">behörighet.</span></h1>
        <p className="text-sm text-muted-foreground font-light mb-8">
          Kontot <span className="text-foreground">{userEmail}</span> har inte adminroll.
          Be en befintlig admin tilldela rollen i databasen.
        </p>
        <button onClick={handleLogout} className="text-xs uppercase tracking-[0.24em] text-primary hover:text-accent-deep transition-colors">
          Logga ut
        </button>
      </section>
    );
  }

  return (
    <>
      {/* ── HEADER ─────────────────────────── */}
      <section className="pt-28 md:pt-32 pb-6 md:pb-8 container-wide border-b border-border">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="eyebrow mb-3">Admin</p>
            <h1 className="font-serif text-3xl md:text-4xl font-light">Bokningspanel</h1>
          </div>
          <div className="flex items-center gap-5">
            {/* Notisbadge — Facebook style */}
            <button
              onClick={() => { setTab("bookings"); markAllSeen(); }}
              className="relative p-2 hover:bg-muted/60 transition-colors rounded-full"
              title={unseenCount ? `${unseenCount} nya bokningar` : "Inga nya bokningar"}
            >
              <Bell size={20} className={unseenCount ? "text-primary" : "text-muted-foreground"} />
              {unseenCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-medium flex items-center justify-center shadow-[0_2px_6px_rgba(220,38,38,0.4)] animate-in zoom-in duration-200">
                  {unseenCount > 9 ? "9+" : unseenCount}
                </span>
              )}
            </button>
            <span className="text-xs text-muted-foreground font-light hidden sm:inline">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut size={13} /> Logga ut
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mt-8 border-b border-border -mb-px overflow-x-auto">
          {([
            ["dashboard", "Översikt", LayoutDashboard],
            ["bookings", "Bokningar", CalendarDays],
            ["availability", "Tillgänglighet", Calendar],
            ["blocked", "Spärrade tider", Ban],
          ] as const).map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => { setTab(id); if (id === "bookings") markAllSeen(); }}
              className={`relative inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.22em] border-b-2 transition-colors -mb-px whitespace-nowrap ${
                tab === id ? "border-primary text-accent-deep" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={13} /> {label}
              {id === "bookings" && unseenCount > 0 && (
                <span className="ml-1 min-w-[16px] h-[16px] px-1 rounded-full bg-destructive text-destructive-foreground text-[9px] flex items-center justify-center">
                  {unseenCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      <div className="container-wide py-10 md:py-14">
        {loading && <p className="text-sm text-muted-foreground">Laddar...</p>}

        {/* ── DASHBOARD ─────────────────────── */}
        {tab === "dashboard" && !loading && (
          <div className="space-y-12">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Idag" value={stats.today} accent />
              <StatCard label="Senaste 7 dagar" value={stats.week} />
              <StatCard label="Senaste 30 dagar" value={stats.month} />
              <StatCard label="Kommande" value={stats.upcoming} icon={<TrendingUp size={14} />} />
            </div>

            {/* Idag */}
            <div>
              <div className="flex items-baseline justify-between mb-5">
                <h2 className="font-serif text-xl md:text-2xl font-light">
                  Idag · <span className="text-muted-foreground">{fmtDateLong(today)}</span>
                </h2>
                <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{todayBookings.length} bokningar</span>
              </div>
              {todayBookings.length === 0 ? (
                <div className="border border-border bg-surface p-10 text-center">
                  <p className="text-sm text-muted-foreground font-light">Inga bokningar idag.</p>
                </div>
              ) : (
                <div className="border border-border divide-y divide-border bg-card">
                  {todayBookings.map((b) => (
                    <BookingRow key={b.id} b={b} t={treatments[b.treatment_id]} onStatus={updateStatus} compact />
                  ))}
                </div>
              )}
            </div>

            {/* Senaste nya */}
            <div>
              <h2 className="font-serif text-xl md:text-2xl font-light mb-5">Senaste bokningar</h2>
              <div className="border border-border divide-y divide-border bg-card">
                {bookings.slice(0, 5).map((b) => (
                  <BookingRow key={b.id} b={b} t={treatments[b.treatment_id]} onStatus={updateStatus} />
                ))}
                {bookings.length === 0 && <p className="p-6 text-sm text-muted-foreground">Inga bokningar än.</p>}
              </div>
            </div>
          </div>
        )}

        {/* ── BOOKINGS ──────────────────────── */}
        {tab === "bookings" && !loading && (() => {
          // Filtrera
          const now = new Date();
          const todayDate = todayStr();
          const weekEnd = new Date(now.getTime() + 7 * 86400000).toISOString().slice(0, 10);
          const monthEnd = new Date(now.getTime() + 30 * 86400000).toISOString().slice(0, 10);
          const q = search.trim().toLowerCase();

          const filtered = bookings.filter((b) => {
            if (statusFilter !== "all" && b.status !== statusFilter) return false;
            if (treatmentFilter !== "all" && b.treatment_id !== treatmentFilter) return false;
            if (rangeFilter === "today" && b.booking_date !== todayDate) return false;
            if (rangeFilter === "upcoming" && b.booking_date < todayDate) return false;
            if (rangeFilter === "week" && (b.booking_date < todayDate || b.booking_date > weekEnd)) return false;
            if (rangeFilter === "month" && (b.booking_date < todayDate || b.booking_date > monthEnd)) return false;
            if (rangeFilter === "past" && b.booking_date >= todayDate) return false;
            if (q) {
              const hay = `${b.customer_name} ${b.customer_email} ${b.customer_phone ?? ""} ${treatments[b.treatment_id]?.name ?? ""}`.toLowerCase();
              if (!hay.includes(q)) return false;
            }
            return true;
          });

          // Idag separat
          const todays = filtered
            .filter((b) => b.booking_date === todayDate)
            .sort((a, b) => a.start_time.localeCompare(b.start_time));
          const upcomingList = filtered
            .filter((b) => b.booking_date > todayDate)
            .sort((a, b) => a.booking_date.localeCompare(b.booking_date) || a.start_time.localeCompare(b.start_time));
          const pastList = filtered
            .filter((b) => b.booking_date < todayDate)
            .sort((a, b) => b.booking_date.localeCompare(a.booking_date) || b.start_time.localeCompare(a.start_time));

          // Gruppera kommande per datum
          const groupedUpcoming: Record<string, Booking[]> = {};
          upcomingList.forEach((b) => {
            (groupedUpcoming[b.booking_date] ||= []).push(b);
          });

          const showToday = rangeFilter === "all" || rangeFilter === "today" || rangeFilter === "upcoming" || rangeFilter === "week" || rangeFilter === "month";
          const showUpcoming = rangeFilter !== "today" && rangeFilter !== "past";
          const showPast = rangeFilter === "all" || rangeFilter === "past";

          const treatmentList = Object.values(treatments).sort((a, b) => a.name.localeCompare(b.name));
          const activeFilters = (statusFilter !== "all" ? 1 : 0) + (treatmentFilter !== "all" ? 1 : 0) + (rangeFilter !== "upcoming" ? 1 : 0) + (q ? 1 : 0);

          return (
            <div className="space-y-10">
              {/* Sök + filter */}
              <div className="space-y-4">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <p className="eyebrow">Bokningsöversikt</p>
                  <span className="text-xs text-muted-foreground font-light">
                    {filtered.length} av {bookings.length}
                    {activeFilters > 0 && (
                      <button onClick={() => { setSearch(""); setStatusFilter("all"); setRangeFilter("upcoming"); setTreatmentFilter("all"); }}
                        className="ml-3 uppercase tracking-[0.2em] text-primary hover:text-accent-deep transition-colors">
                        Rensa
                      </button>
                    )}
                  </span>
                </div>

                {/* Sökfält */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Sök på namn, e-post, telefon eller behandling..."
                    className="w-full border border-border bg-surface pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Filterchips */}
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  <FilterGroup label="Tid">
                    {([
                      ["upcoming", "Kommande"],
                      ["today", "Idag"],
                      ["week", "7 dagar"],
                      ["month", "30 dagar"],
                      ["past", "Tidigare"],
                      ["all", "Alla"],
                    ] as const).map(([id, label]) => (
                      <Chip key={id} active={rangeFilter === id} onClick={() => setRangeFilter(id)}>{label}</Chip>
                    ))}
                  </FilterGroup>
                  <FilterGroup label="Status">
                    {([
                      ["all", "Alla"],
                      ["confirmed", "Bekräftad"],
                      ["completed", "Genomförd"],
                      ["cancelled", "Avbokad"],
                      ["no_show", "Uteblev"],
                    ] as const).map(([id, label]) => (
                      <Chip key={id} active={statusFilter === id} onClick={() => setStatusFilter(id)}>{label}</Chip>
                    ))}
                  </FilterGroup>
                  {treatmentList.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase tracking-[0.24em] text-muted-foreground">Behandling</span>
                      <select
                        value={treatmentFilter}
                        onChange={(e) => setTreatmentFilter(e.target.value)}
                        className="border border-border bg-surface px-3 py-1.5 text-xs focus:outline-none focus:border-primary"
                      >
                        <option value="all">Alla</option>
                        {treatmentList.map((t) => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Idag */}
              {showToday && (
                <section>
                  <div className="flex items-baseline justify-between mb-4">
                    <h2 className="font-serif text-xl md:text-2xl font-light">
                      Idag · <span className="text-muted-foreground">{fmtDateLong(todayDate)}</span>
                    </h2>
                    <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{todays.length}</span>
                  </div>
                  {todays.length === 0 ? (
                    <div className="border border-border bg-surface p-8 text-center">
                      <p className="text-sm text-muted-foreground font-light">Inga bokningar idag.</p>
                    </div>
                  ) : (
                    <div className="border border-border divide-y divide-border bg-card">
                      {todays.map((b) => (
                        <BookingRow key={b.id} b={b} t={treatments[b.treatment_id]} onStatus={updateStatus} compact />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Kommande grupperade per datum */}
              {showUpcoming && (
                <section>
                  <div className="flex items-baseline justify-between mb-4">
                    <h2 className="font-serif text-xl md:text-2xl font-light">Kommande</h2>
                    <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{upcomingList.length}</span>
                  </div>
                  {upcomingList.length === 0 ? (
                    <div className="border border-border bg-surface p-8 text-center">
                      <p className="text-sm text-muted-foreground font-light">Inga kommande bokningar.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {Object.entries(groupedUpcoming).map(([date, items]) => (
                        <div key={date}>
                          <div className="flex items-baseline gap-3 mb-2 pl-1">
                            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">{fmtDateLong(date)}</p>
                            <span className="text-[10px] text-muted-foreground">{items.length} {items.length === 1 ? "bokning" : "bokningar"}</span>
                          </div>
                          <div className="border border-border divide-y divide-border bg-card">
                            {items.map((b) => (
                              <BookingRow key={b.id} b={b} t={treatments[b.treatment_id]} onStatus={updateStatus} compact />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Tidigare */}
              {showPast && pastList.length > 0 && (
                <section>
                  <div className="flex items-baseline justify-between mb-4">
                    <h2 className="font-serif text-xl md:text-2xl font-light text-muted-foreground">Tidigare</h2>
                    <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{pastList.length}</span>
                  </div>
                  <div className="border border-border divide-y divide-border bg-card opacity-90">
                    {pastList.map((b) => (
                      <BookingRow key={b.id} b={b} t={treatments[b.treatment_id]} onStatus={updateStatus} />
                    ))}
                  </div>
                </section>
              )}

              {filtered.length === 0 && (
                <div className="border border-border bg-surface p-12 text-center">
                  <p className="text-sm text-muted-foreground font-light">Inga bokningar matchar filtret.</p>
                </div>
              )}
            </div>
          );
        })()}

        {/* ── AVAILABILITY ──────────────────── */}
        {tab === "availability" && !loading && (
          <div className="max-w-lg">
            <p className="text-sm text-muted-foreground font-light mb-8 leading-relaxed">
              Återkommande veckoschema — vilka dagar och tider du är tillgänglig.
            </p>
            <div className="border border-border divide-y divide-border mb-6 bg-card">
              {rules.length === 0 && <p className="p-5 text-sm text-muted-foreground">Inga regler inlagda.</p>}
              {rules.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-4 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-primary flex-shrink-0" />
                    <span className="text-sm font-light w-20">{DAYS[r.day_of_week]}</span>
                    <span className="font-mono text-sm text-muted-foreground">{r.start_time.slice(0,5)} – {r.end_time.slice(0,5)}</span>
                  </div>
                  <button onClick={() => deleteRule(r.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border border-border p-5 space-y-4 bg-card">
              <p className="eyebrow">Lägg till tid</p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.24em] text-muted-foreground mb-1">Dag</label>
                  <select
                    value={newRule.day_of_week}
                    onChange={(e) => setNewRule((s) => ({ ...s, day_of_week: Number(e.target.value) }))}
                    className="w-full border border-border bg-surface px-2 py-2 text-sm focus:outline-none focus:border-primary"
                  >
                    {[1,2,3,4,5,6,7].map((d) => <option key={d} value={d}>{DAYS[d]}</option>)}
                  </select>
                </div>
                <TimeInput label="Från" value={newRule.start_time} onChange={(v) => setNewRule((s) => ({ ...s, start_time: v }))} />
                <TimeInput label="Till" value={newRule.end_time} onChange={(v) => setNewRule((s) => ({ ...s, end_time: v }))} />
              </div>
              <button onClick={addRule} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-xs uppercase tracking-[0.24em] hover:bg-accent-deep transition-colors">
                <Plus size={13} /> Lägg till
              </button>
            </div>
          </div>
        )}

        {/* ── BLOCKED ───────────────────────── */}
        {tab === "blocked" && !loading && (
          <div className="max-w-lg">
            <p className="text-sm text-muted-foreground font-light mb-8 leading-relaxed">
              Spärra specifika dagar eller tider — t.ex. semester, möten eller övriga åtaganden.
            </p>
            <div className="border border-border divide-y divide-border mb-6 bg-card">
              {blocked.length === 0 && <p className="p-5 text-sm text-muted-foreground">Inga spärrade tider.</p>}
              {blocked.map((b) => (
                <div key={b.id} className="flex items-center justify-between p-4 gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <Clock size={14} className="text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="text-sm font-light">{b.blocked_date}</span>
                      <span className="text-xs text-muted-foreground ml-2">{b.all_day ? "Heldag" : `${b.start_time?.slice(0,5)} – ${b.end_time?.slice(0,5)}`}</span>
                      {b.reason && <p className="text-xs text-muted-foreground/70 italic truncate">{b.reason}</p>}
                    </div>
                  </div>
                  <button onClick={() => deleteBlocked(b.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border border-border p-5 space-y-4 bg-card">
              <p className="eyebrow">Spärra datum</p>
              <div>
                <label className="block text-[9px] uppercase tracking-[0.24em] text-muted-foreground mb-1">Datum</label>
                <input type="date" value={newBlocked.blocked_date} onChange={(e) => setNewBlocked((s) => ({ ...s, blocked_date: e.target.value }))}
                  className="border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:border-primary" />
              </div>
              <label className="flex items-center gap-2 text-sm font-light cursor-pointer">
                <input type="checkbox" checked={newBlocked.all_day} onChange={(e) => setNewBlocked((s) => ({ ...s, all_day: e.target.checked }))} className="accent-primary" />
                Heldag
              </label>
              {!newBlocked.all_day && (
                <div className="grid grid-cols-2 gap-3">
                  <TimeInput label="Från" value={newBlocked.start_time} onChange={(v) => setNewBlocked((s) => ({ ...s, start_time: v }))} />
                  <TimeInput label="Till" value={newBlocked.end_time} onChange={(v) => setNewBlocked((s) => ({ ...s, end_time: v }))} />
                </div>
              )}
              <div>
                <label className="block text-[9px] uppercase tracking-[0.24em] text-muted-foreground mb-1">Anledning (valfritt)</label>
                <input type="text" value={newBlocked.reason} onChange={(e) => setNewBlocked((s) => ({ ...s, reason: e.target.value }))} placeholder="t.ex. Semester"
                  className="w-full border border-border bg-surface px-3 py-2 text-sm focus:outline-none focus:border-primary" />
              </div>
              <button onClick={addBlocked} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-xs uppercase tracking-[0.24em] hover:bg-accent-deep transition-colors">
                <Plus size={13} /> Spärra
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ──────────────────────────────────────────
function StatCard({ label, value, accent, icon }: { label: string; value: number; accent?: boolean; icon?: React.ReactNode }) {
  return (
    <div className={`border p-5 md:p-6 ${accent ? "border-primary/30 bg-accent-soft/55" : "border-border bg-card"}`}>
      <div className="flex items-center justify-between mb-3">
        <p className="eyebrow">{label}</p>
        {icon && <span className="text-primary">{icon}</span>}
      </div>
      <p className={`font-serif text-4xl md:text-5xl font-light leading-none ${accent ? "text-accent-deep" : ""}`}>{value}</p>
    </div>
  );
}

function BookingRow({ b, t, onStatus, compact }: { b: Booking; t?: Treatment; onStatus: (id: string, s: string) => void; compact?: boolean }) {
  const isNew = !b.seen_by_admin && b.status === "confirmed";
  return (
    <div className={`p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 transition-colors ${isNew ? "bg-accent-soft/40" : ""}`}>
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {!compact && (
          <div className="text-center w-12 flex-shrink-0">
            <p className="font-mono text-[10px] text-muted-foreground uppercase">{new Date(b.booking_date + "T12:00:00").toLocaleDateString("sv-SE", { month: "short" })}</p>
            <p className="font-serif text-2xl leading-none">{new Date(b.booking_date + "T12:00:00").getDate()}</p>
          </div>
        )}
        {compact && (
          <div className="font-mono text-sm text-accent-deep w-14 flex-shrink-0">{b.start_time.slice(0,5)}</div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-serif text-lg leading-tight">{b.customer_name}</p>
            {isNew && <span className="text-[9px] uppercase tracking-[0.2em] text-accent-deep bg-accent-soft px-1.5 py-0.5">Ny</span>}
          </div>
          <p className="text-xs text-muted-foreground font-light mt-0.5">
            {t?.name ?? "—"} · {t?.duration_minutes ?? "?"} min{!compact && ` · ${b.start_time.slice(0,5)}`}
          </p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground font-light flex-wrap">
            <span className="inline-flex items-center gap-1"><Mail size={11} /> {b.customer_email}</span>
            {b.customer_phone && <span className="inline-flex items-center gap-1"><Phone size={11} /> {b.customer_phone}</span>}
          </div>
          {b.message && (
            <p className="text-xs text-muted-foreground/80 font-light mt-2 italic flex items-start gap-1.5">
              <MessageSquare size={11} className="mt-0.5 flex-shrink-0" />
              <span>"{b.message}"</span>
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 md:ml-auto flex-shrink-0">
        <span className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] border ${STATUS_COLORS[b.status]}`}>
          {STATUS_LABELS[b.status]}
        </span>
        {b.status === "confirmed" && (
          <>
            <button onClick={() => onStatus(b.id, "completed")} title="Markera som genomförd" className="p-1.5 border border-border hover:border-accent-deep text-muted-foreground hover:text-accent-deep transition-colors">
              <Check size={13} />
            </button>
            <button onClick={() => onStatus(b.id, "cancelled")} title="Avboka" className="p-1.5 border border-border hover:border-destructive text-muted-foreground hover:text-destructive transition-colors">
              <X size={13} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[9px] uppercase tracking-[0.24em] text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] border transition-colors ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-muted-foreground border-border hover:border-primary hover:text-accent-deep"
      }`}
    >
      {children}
    </button>
  );
}

function TimeInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[9px] uppercase tracking-[0.24em] text-muted-foreground mb-1">{label}</label>
      <input type="time" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full border border-border bg-surface px-2 py-2 text-sm focus:outline-none focus:border-primary" />
    </div>
  );
}
