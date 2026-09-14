import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Menu, Mic, User, X } from "lucide-react";

const TITLE = "The Care Conference 2026 | The Purple Global Mission";
const DESCRIPTION =
  "Care as Infrastructure: Building a National Position on Home Care for Nigeria. 19 November 2026, IALA Hub, The Chair Centre, Lagos. Convened by The Purple Global Mission.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConferencePage,
});

const CONF_EMAIL = "thepurpleglobalmission@gmail.com";

const ROOM_OPTIONS = [
  "Room A: Who Cares for Nigeria? (Workforce)",
  "Room B: The Journey Between (Coordination)",
  "Room C: You Cannot Finance What You Cannot Count (Digital)",
  "Room D: Paying for the Load Bearing Layer (Financing)",
];

const SECTORS = [
  "Government or regulator",
  "Health facility or clinical practice",
  "Home or community based care provider",
  "Insurance, HMO or financing",
  "Development partner or multilateral",
  "Academia or research",
  "Technology",
  "Media",
  "Civil society or advocacy",
  "Family caregiver or individual",
  "Other",
];

const PROGRAMME = [
  {
    time: "08:00",
    title: "Registration and CareSouk opens",
    body: "Delegate check-in and the fully digital exhibition open for the day.",
  },
  {
    time: "09:00",
    title: "Opening ceremony",
    body: "Convener welcome, keynote, ministerial address and institutional messages.",
  },
  {
    time: "10:15",
    title: "Plenary 1: The First Caregivers",
    body: "Lived experience of dementia, stroke recovery, disability and long-term care.",
  },
  {
    time: "11:30",
    title: "Plenary 2: Safe at Home",
    body: "Clinical governance and quality assurance for safe care at home.",
  },
  {
    time: "12:45",
    title: "Book launch: The Homecare Framework",
    body: "The official launch flows directly into lunch and networking.",
  },
  {
    time: "13:15",
    title: "Lunch, CareSouk and networking",
    body: "Structured connections across the delegate room and digital exhibition.",
  },
  {
    time: "14:15",
    title: "Four parallel policy sessions",
    body: "Workforce, coordination, digital health data and financing.",
  },
  {
    time: "15:45",
    title: "Closed institutional roundtable",
    body: "Principals refine the National Position while delegates continue networking.",
    tag: "Invitation only",
  },
  {
    time: "17:15",
    title: "Closing plenary",
    body: "Roundtable readout, next steps and closing remarks from the convener.",
  },
  { time: "17:45", title: "Close" },
];

const SPEAKERS = [
  {
    name: "Dr. Adeola Onakoya",
    role: "Keynote Speaker",
    topic: "Care as Infrastructure: The National Vision",
  },
  {
    name: "Prof. Amina Mohammed",
    role: "Panel Chair",
    topic: "The First Caregivers: Lived Experience",
  },
  {
    name: "Barr. Chukwuma Eze",
    role: "Panelist",
    topic: "Regulatory Pathways for Home Care",
  },
];

const ROOMS = [
  {
    letter: "A",
    title: "Who Cares for Nigeria?",
    body: "Care workforce development and protection.",
  },
  {
    letter: "B",
    title: "The Journey Between",
    body: "Care coordination and continuity of care.",
  },
  {
    letter: "C",
    title: "You Cannot Finance What You Cannot Count",
    body: "Digital health infrastructure and care data systems.",
  },
  {
    letter: "D",
    title: "Paying for the Load Bearing Layer",
    body: "Care financing, policy and regulatory architecture.",
  },
];

const HERO_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M48 0 0 48 M96 0 0 96' stroke='%23B8960F' stroke-width='1' fill='none'/%3E%3C/svg%3E\")";

function Kicker({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p
      className={`display mb-5 flex items-center gap-3 text-[11.5px] font-semibold tracking-[0.2em] uppercase ${
        onDark ? "text-gold" : "text-gold-dim"
      }`}
    >
      <span className={`h-px w-8 ${onDark ? "bg-gold/60" : "bg-gold-dim/60"}`} />
      {children}
    </p>
  );
}

const CONFERENCE_DATE = new Date("2026-11-19T08:00:00+01:00");

function ConferencePage() {
  const [formType, setFormType] = useState<"attendee" | "speaker">("attendee");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ msg: string; ok: boolean } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function tick() {
      const now = Date.now();
      const diff = Math.max(0, CONFERENCE_DATE.getTime() - now);
      setCountdown({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1_000),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (n: string) => String(data.get(n) ?? "").trim();

    const answers: Record<string, string> = {
      "Full Name": get("fullName"),
      Gender: get("gender"),
      "Date of Birth": get("dob"),
      Email: get("email"),
      Phone: get("phone"),
      Country: get("country"),
      State: get("state"),
      City: get("city"),
      Organization: get("organization"),
      Profession: get("profession"),
      Specialty: get("specialty"),
      Position: get("position"),
      "First choice": get("firstChoice"),
      "Second choice": get("secondChoice"),
      Sector: get("sector"),
      "First-time attendee": get("firstTime"),
      "Special needs": get("specialNeeds"),
    };

    const required = [
      "Full Name",
      "Gender",
      "Email",
      "Phone",
      "Country",
      "Organization",
      "Profession",
      "First choice",
      "Second choice",
      "Sector",
    ];

    const missing = required.filter((k) => !answers[k]);
    if (missing.length > 0) {
      setStatus({ msg: `Please fill in: ${missing.join(", ")}`, ok: false });
      setIsSubmitting(false);
      return;
    }

    const subject = encodeURIComponent("Care Conference 2026 Registration");
    const body = Object.entries(answers)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("%0A");
    window.location.href = `mailto:${CONF_EMAIL}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus({
        msg: "Your email client should open now. If not, please copy the address and send manually.",
        ok: true,
      });
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-background font-body text-primary">
      {/* Masthead */}
      <header className="sticky top-0 z-30 border-b border-primary/15 bg-background/92 backdrop-blur-md">
        <div className="flex items-center justify-between px-[5vw] py-4">
          <a href="/" className="flex items-center">
            <img
              src="/cropped-3-768x242.webp"
              alt="The Purple Global Mission"
              className="h-8 w-auto md:h-10"
            />
          </a>
          <nav
            aria-label="Page navigation"
            className="hidden items-center gap-x-7 text-[13px] font-medium md:flex"
          >
            <a
              href="#programme"
              className="border-b border-transparent pb-0.5 text-primary/75 transition-colors hover:border-gold hover:text-primary"
            >
              Programme
            </a>
            <a
              href="#speakers"
              className="border-b border-transparent pb-0.5 text-primary/75 transition-colors hover:border-gold hover:text-primary"
            >
              Speakers
            </a>
            <a
              href="#siderooms"
              className="border-b border-transparent pb-0.5 text-primary/75 transition-colors hover:border-gold hover:text-primary"
            >
              Side Rooms
            </a>
            <a
              href="#venue"
              className="border-b border-transparent pb-0.5 text-primary/75 transition-colors hover:border-gold hover:text-primary"
            >
              Venue
            </a>
            <a
              href="#register"
              className="display bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-panel"
            >
              Register
            </a>
          </nav>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-primary md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-4 border-t border-primary/10 px-[5vw] pb-4 pt-3 text-[14px] font-medium md:hidden"
          >
            <a
              href="#programme"
              className="text-primary/75 transition-colors hover:text-gold"
              onClick={() => setMobileOpen(false)}
            >
              Programme
            </a>
            <a
              href="#speakers"
              className="text-primary/75 transition-colors hover:text-gold"
              onClick={() => setMobileOpen(false)}
            >
              Speakers
            </a>
            <a
              href="#siderooms"
              className="text-primary/75 transition-colors hover:text-gold"
              onClick={() => setMobileOpen(false)}
            >
              Side Rooms
            </a>
            <a
              href="#venue"
              className="text-primary/75 transition-colors hover:text-gold"
              onClick={() => setMobileOpen(false)}
            >
              Venue
            </a>
            <a
              href="#register"
              className="display mt-2 bg-primary px-5 py-2.5 text-center text-[13px] font-semibold text-primary-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Register
            </a>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-gold/25 bg-primary text-primary-foreground">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(165deg,#1a0f40_0%,#2D1B69_48%,#3D2880_100%)]" />
          <img
            src="/Hero Image.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute -top-28 right-[6%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(184,150,15,0.30),transparent_68%)] blur-2xl" />
          <div className="absolute -bottom-44 -left-28 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(184,150,15,0.18),transparent_68%)] blur-2xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: HERO_PATTERN }}
          />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-yellow/60 to-transparent" />
        </div>

        <div className="mx-auto max-w-[1440px] px-[5vw] pt-16 pb-20 sm:pt-20 lg:pt-24 lg:pb-24">
          <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-[1.12fr_0.88fr]">
            <div>
              <Kicker onDark>The Care Conference 2026, Third Edition</Kicker>
              <h1 className="text-[clamp(46px,7vw,96px)] leading-[0.95] font-bold tracking-[-0.02em]">
                Care as
                <br />
                <span className="bg-gradient-to-r from-gold-bright via-gold to-gold-dim bg-clip-text text-transparent">
                  Infrastructure
                </span>
              </h1>
              <div className="mt-7 grid gap-6 sm:grid-cols-[1.2fr_1fr]">
                <p className="max-w-[46ch] text-[17px] leading-relaxed text-primary-foreground/78">
                  Building a National Position on Home Care for Nigeria. A one-day national policy
                  convening hosted by The Purple Global Mission.
                </p>
                <p className="display border-l-2 border-gold pl-4 text-[18px] leading-snug font-medium text-gold">
                  You cannot finance care you cannot count.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#register"
                  className="display bg-gold px-7 py-3.5 text-[14px] font-semibold tracking-[0.02em] text-primary transition-colors hover:bg-gold-bright"
                >
                  Reserve your place
                </a>
                <a
                  href="#programme"
                  className="display border-[1.5px] border-primary-foreground/30 px-7 py-3.5 text-[14px] font-semibold text-primary-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  See the day
                </a>
              </div>
            </div>

            <div className="border border-gold/25 bg-primary-foreground/[0.05] p-8 backdrop-blur-md sm:p-9">
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="display text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
                  Event details
                </span>
                <span className="display text-[11px] font-semibold tracking-[0.2em] text-primary-foreground/55 uppercase">
                  Live countdown
                </span>
              </div>

              <div className="grid grid-cols-4 gap-3 text-center">
                {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
                  <div key={unit}>
                    <span className="display block text-[clamp(28px,4vw,44px)] font-bold leading-none text-primary-foreground tabular-nums">
                      {String(countdown[unit]).padStart(2, "0")}
                    </span>
                    <span className="display mt-1 block text-[10px] font-semibold tracking-[0.15em] text-primary-foreground/45 uppercase">
                      {unit}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-7 space-y-4 border-t border-primary-foreground/10 pt-7">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <div>
                    <span className="display block text-[11px] font-semibold tracking-[0.15em] text-primary-foreground/45 uppercase">
                      Date
                    </span>
                    <span className="text-[15px] font-medium">Thursday 19 November 2026</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <div>
                    <span className="display block text-[11px] font-semibold tracking-[0.15em] text-primary-foreground/45 uppercase">
                      Time
                    </span>
                    <span className="text-[15px] font-medium">08:00 - 17:45</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <div>
                    <span className="display block text-[11px] font-semibold tracking-[0.15em] text-primary-foreground/45 uppercase">
                      Venue
                    </span>
                    <span className="text-[15px] font-medium">
                      IALA Hub, The Chair Centre, Lagos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section id="programme" className="scroll-mt-20 px-[5vw] py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-14">
            <Kicker>The day, hour by hour</Kicker>
            <h2 className="text-[clamp(28px,3.6vw,42px)] leading-[1.05] font-bold tracking-[-0.01em] text-primary">
              Programme,
              <br />
              19 November 2026
            </h2>
          </div>

          <ol className="border-t border-primary/15">
            {PROGRAMME.map((slot) => (
              <li
                key={slot.time}
                className="group grid grid-cols-[56px_1fr] gap-4 border-b border-primary/15 py-7 transition-colors hover:bg-primary/[0.02] sm:grid-cols-[96px_1fr] sm:gap-8"
              >
                <div className="display pt-0.5 text-[14px] font-bold tracking-[-0.01em] text-gold-dim">
                  {slot.time}
                </div>
                <div>
                  <h3 className="text-[18px] leading-snug font-semibold text-primary">
                    {slot.title}
                  </h3>
                  {slot.body && (
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                      {slot.body}
                    </p>
                  )}
                  {slot.tag && (
                    <span className="mt-2 inline-block border border-gold/30 bg-gold/[0.08] px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.05em] text-gold-dim uppercase">
                      {slot.tag}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Speakers */}
      <section
        id="speakers"
        className="scroll-mt-20 bg-primary px-[5vw] py-24 text-primary-foreground"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-14">
            <Kicker onDark>Voices in the room</Kicker>
            <h2 className="text-[clamp(28px,3.6vw,42px)] leading-[1.05] font-bold tracking-[-0.01em]">
              Confirmed speakers and panelists
            </h2>
          </div>
          <div className="space-y-4">
            {SPEAKERS.map((s) => (
              <article
                key={s.name}
                className="group flex gap-5 border border-gold/10 bg-primary-foreground/[0.03] p-5 transition-colors hover:border-gold/25 hover:bg-primary-foreground/[0.06]"
              >
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center bg-primary-foreground/[0.06]">
                  <span className="text-[20px] font-bold text-primary-foreground/20">
                    {s.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="display mb-0.5 text-[10.5px] font-semibold tracking-[0.14em] text-gold uppercase">
                    {s.role}
                  </span>
                  <h3 className="text-[18px] leading-snug font-semibold">{s.name}</h3>
                  <p className="mt-auto pt-2 text-[14px] leading-relaxed text-primary-foreground/60">
                    {s.topic}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-[14px] text-primary-foreground/55">
            Additional speakers and panelists are announced as they are confirmed.
          </p>
        </div>
      </section>

      {/* Side Rooms */}
      <section
        id="siderooms"
        className="scroll-mt-20 bg-primary px-[5vw] py-24 text-primary-foreground"
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-14">
            <Kicker onDark>Four parallel policy sessions</Kicker>
            <h2 className="text-[clamp(28px,3.6vw,42px)] leading-[1.05] font-bold tracking-[-0.01em]">
              The Side Rooms
            </h2>
            <p className="mt-4 max-w-[56ch] text-[15.5px] leading-relaxed text-primary-foreground/72">
              At 14:15, every delegate attends one focused room. Selections are honoured first come,
              first served.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {ROOMS.map((room) => (
              <article
                key={room.letter}
                className="border border-gold/15 bg-primary-foreground/[0.04] p-6 transition-colors hover:border-gold/25 sm:p-7"
              >
                <div className="display mb-3 flex items-center gap-3 text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
                  <span className="flex h-8 w-8 items-center justify-center border border-gold/30 text-[14px] font-bold">
                    {room.letter}
                  </span>
                </div>
                <h3 className="text-[20px] leading-[1.15] font-semibold tracking-[-0.01em]">
                  {room.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-primary-foreground/65">
                  {room.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Venue */}
      <section id="venue" className="scroll-mt-20 px-[5vw] py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10">
            <Kicker>The venue</Kicker>
            <h2 className="text-[clamp(28px,3.6vw,42px)] leading-[1.05] font-bold tracking-[-0.01em] text-primary">
              IALA Hub at The Chair Centre, Lagos
            </h2>
            <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-muted-foreground">
              A serious civic setting for shaping Nigeria&apos;s national position on home care in
              one focused day.
            </p>
          </div>
          <div className="relative">
            <img
              src="/Conference Image.webp"
              alt="IALA Hub conference venue in Lagos"
              className="w-full object-cover"
              style={{ aspectRatio: "16 / 9" }}
            />
            <div className="absolute -bottom-4 -right-4 border border-gold/20" />
          </div>
        </div>
      </section>

      {/* Register CTA */}
      <div className="border-y border-primary/15 bg-secondary px-[5vw] py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Kicker>Be part of the national position</Kicker>
          <p className="display text-[clamp(20px,2.8vw,30px)] leading-[1.4] font-medium tracking-[-0.01em] text-primary">
            Seats are assigned first come, first served and confirmed by email.
          </p>
          <a
            href="#register"
            className="display mt-8 inline-block bg-gold px-8 py-4 text-[14px] font-semibold tracking-[0.02em] text-primary transition-colors hover:bg-gold-bright"
          >
            Register now
          </a>
        </div>
      </div>

      {/* Register */}
      <section id="register" className="scroll-mt-20 px-[5vw] py-16">
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-10">
            <Kicker>Register</Kicker>
            <h1 className="font-display text-[clamp(28px,4vw,44px)] leading-[1.08] font-bold tracking-[-0.01em] text-foreground">
              Register for The Care Conference 2026
            </h1>
            <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-muted-foreground">
              Care as Infrastructure: Building a National Position on Homecare for Nigeria
            </p>
            <div className="mt-6 flex gap-2 rounded-xl border border-border bg-card p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setFormType("attendee")}
                className={`display flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-[13px] font-semibold transition-all ${
                  formType === "attendee"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <User className="h-4 w-4" />
                Attendee
              </button>
              <button
                type="button"
                onClick={() => setFormType("speaker")}
                className={`display flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-[13px] font-semibold transition-all ${
                  formType === "speaker"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Mic className="h-4 w-4" />
                Speaker
              </button>
            </div>
          </div>

          {formType === "attendee" ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
                  Personal Information
                </h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="block space-y-1.5 sm:col-span-2">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Full Name<span className="ml-0.5 text-destructive">*</span>
                    </span>
                    <input
                      required
                      className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                      placeholder="Adaeze Okafor"
                      name="fullName"
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Gender<span className="ml-0.5 text-destructive">*</span>
                    </span>
                    <select
                      name="gender"
                      required
                      defaultValue=""
                      className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </label>
                  <label className="block space-y-1.5">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Date of Birth
                    </span>
                    <input
                      type="date"
                      name="dob"
                      className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Email Address<span className="ml-0.5 text-destructive">*</span>
                    </span>
                    <input
                      type="email"
                      required
                      className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                      placeholder="you@example.com"
                      name="email"
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Phone Number<span className="ml-0.5 text-destructive">*</span>
                    </span>
                    <input
                      type="tel"
                      required
                      className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                      placeholder="+234 ..."
                      name="phone"
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Country of Residence<span className="ml-0.5 text-destructive">*</span>
                    </span>
                    <input
                      required
                      className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                      placeholder="Nigeria"
                      name="country"
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="block text-xs font-medium text-muted-foreground">
                      State / Province
                    </span>
                    <input
                      name="state"
                      className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="block text-xs font-medium text-muted-foreground">City</span>
                    <input
                      name="city"
                      className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
                  Professional Information
                </h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="block space-y-1.5">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Organization<span className="ml-0.5 text-destructive">*</span>
                    </span>
                    <input
                      required
                      name="organization"
                      className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Profession<span className="ml-0.5 text-destructive">*</span>
                    </span>
                    <input
                      required
                      name="profession"
                      className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                      placeholder="Clinician, Researcher, Policy maker..."
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Specialty
                    </span>
                    <input
                      name="specialty"
                      className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Position / Role
                    </span>
                    <input
                      name="position"
                      className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
                  Conference Information
                </h2>
                <div className="mt-5 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block space-y-1.5">
                      <span className="block text-xs font-medium text-muted-foreground">
                        Side room, first choice<span className="ml-0.5 text-destructive">*</span>
                      </span>
                      <select
                        name="firstChoice"
                        required
                        defaultValue=""
                        className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                      >
                        <option value="" disabled>
                          Select a room
                        </option>
                        {ROOM_OPTIONS.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block space-y-1.5">
                      <span className="block text-xs font-medium text-muted-foreground">
                        Side room, second choice<span className="ml-0.5 text-destructive">*</span>
                      </span>
                      <select
                        name="secondChoice"
                        required
                        defaultValue=""
                        className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                      >
                        <option value="" disabled>
                          Select a room
                        </option>
                        {ROOM_OPTIONS.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="block space-y-1.5">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Sector<span className="ml-0.5 text-destructive">*</span>
                    </span>
                    <select
                      name="sector"
                      required
                      defaultValue=""
                      className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                    >
                      <option value="" disabled>
                        Select your sector
                      </option>
                      {SECTORS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                  <fieldset>
                    <legend className="mb-2 text-sm font-medium text-foreground">
                      First-time attendee?
                    </legend>
                    <div className="flex gap-6 text-sm text-foreground">
                      <label className="inline-flex items-center gap-2">
                        <input type="radio" name="firstTime" value="yes" defaultChecked /> Yes
                      </label>
                      <label className="inline-flex items-center gap-2">
                        <input type="radio" name="firstTime" value="no" /> No
                      </label>
                    </div>
                  </fieldset>
                  <label className="block space-y-1.5">
                    <span className="block text-xs font-medium text-muted-foreground">
                      Special needs or accessibility requirements
                    </span>
                    <textarea
                      name="specialNeeds"
                      rows={3}
                      placeholder="Optional"
                      className="w-full rounded-lg border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:outline-none focus:shadow-[0_0_0_3px_oklch(0.743_0.099_84.5/0.1)]"
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-6">
                <p className="text-xs text-muted-foreground">
                  By registering you agree to receive event communications.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary via-primary to-primary/80 px-7 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-60"
                >
                  <span className="absolute inset-0 -translate-x-[100%] bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 transition-transform duration-700 group-hover:translate-x-[100%]" />
                  <span className="relative z-10">
                    {isSubmitting ? "Registering..." : "Complete Registration"}
                  </span>
                </button>
              </div>

              {status && (
                <div
                  role="status"
                  className={`mt-2 rounded-lg border-l-2 px-4 py-3.5 text-[14.5px] leading-relaxed ${
                    status.ok
                      ? "border-gold bg-gold/[0.14] text-primary"
                      : "border-destructive bg-destructive/10 text-destructive"
                  }`}
                >
                  {status.msg}
                </div>
              )}
            </form>
          ) : (
            <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
              <Mic className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                Speaker registration opening soon
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Speaker submissions are managed separately. Please check back soon or email{" "}
                <a
                  href={`mailto:${CONF_EMAIL}`}
                  className="text-primary underline underline-offset-2 hover:text-gold"
                >
                  {CONF_EMAIL}
                </a>{" "}
                to express interest.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Colophon */}
      <footer className="border-t border-primary/15 bg-primary px-[5vw] py-14 text-[14.5px] text-primary-foreground/85">
        <div className="mx-auto max-w-3xl text-center">
          <img
            src="/cropped-3-768x242.webp"
            alt="The Purple Global Mission"
            className="mx-auto mb-4 h-8 w-auto"
          />
          <p className="text-[13px] text-primary-foreground/60">
            Care Conference 2026 &mdash; Purple Global Mission
          </p>
          <p className="mt-1 text-[12px] text-primary-foreground/45">
            Third Edition &middot; IALA Hub, Lagos
          </p>
        </div>
      </footer>
    </div>
  );
}
