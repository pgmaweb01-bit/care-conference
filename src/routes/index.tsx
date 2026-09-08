import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { Mic, User } from "lucide-react";

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

const CONF_EMAIL = "mycareassistantconference@gmail.com";

const ROOM_OPTIONS = [
  "Room A: Who Cares for Nigeria? (Workforce)",
  "Room B: The Journey Between (Coordination)",
  "Room C: You Cannot Fund What You Cannot Count (Digital)",
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
    body: "Delegate check in. The CareSouk, our fully digital exhibition of care sector organisations, runs throughout the day.",
  },
  {
    time: "09:00",
    title: "Opening ceremony",
    body: "Convener welcome, keynote address framing the National Position and the five policy layers, ministerial address, and goodwill messages from institutional partners.",
  },
  {
    time: "10:15",
    title: "Plenary 1: The First Caregivers",
    body: "The Family Panel. Nigerians who carry care at home open the public programme with lived experience of dementia care, stroke recovery, disability care, and long term caregiving.",
    tag: "Main stage, all delegates",
  },
  {
    time: "11:30",
    title: "Plenary 2: Safe at Home",
    body: "Clinical governance and quality assurance. Regulators, hospital clinical leaders, home care clinical leads, and quality experts on what safe care at home requires.",
    tag: "Main stage, all delegates",
  },
  {
    time: "12:45",
    title: "Book launch: The Homecare Framework",
    body: "The launch of The Homecare Framework: Care as Infrastructure for Everyday Life, flowing into lunch.",
  },
  {
    time: "13:15",
    title: "Lunch, CareSouk and networking",
    body: "Structured networking across the delegate room and the digital exhibition.",
  },
  {
    time: "14:15",
    title: "Side rooms: four parallel policy sessions",
    body: "Each delegate attends one of four side rooms covering workforce, coordination, digital health data, and financing. Seats are assigned before the day from your selection below.",
    tag: "Choose one of four, advance selection",
  },
  {
    time: "15:45",
    title: "Closed institutional roundtable",
    body: "Twenty to thirty principals from government, regulation, financing, and practice contest and refine the National Position text. General delegates continue with the CareSouk, exhibitor spotlights, and networking.",
    tag: "Invitation only",
    closed: true,
  },
  {
    time: "17:15",
    title: "Closing plenary",
    body: "Roundtable readout, next steps for the National Position, and closing remarks from the convener. The refined text follows as a post event communique.",
    tag: "Main stage, all delegates",
  },
  { time: "17:45", title: "Close" },
];

const ROOMS = [
  {
    letter: "Room A",
    title: "Who Cares for Nigeria?",
    layer: "Care Workforce Development and Protection",
    body: "Recognition, certification, training, and labour protection for the people who deliver care, with regulators, nursing academics, training institutions, and practising care workers in the room.",
  },
  {
    letter: "Room B",
    title: "The Journey Between",
    layer: "Care Coordination and Continuity of Care",
    body: "The path from hospital discharge to home. Hospital leaders, insurers, rehabilitation specialists, and coordination leads on making continuity of care reimbursable and routine.",
  },
  {
    letter: "Room C",
    title: "You Cannot Fund What You Cannot Count",
    layer: "Digital Health Infrastructure and Care Data Systems",
    body: "The data layer beneath every financing decision: national digital architecture, claims data, interoperability standards, and the technology builders creating care records infrastructure.",
  },
  {
    letter: "Room D",
    title: "Paying for the Load Bearing Layer",
    layer: "Care Financing, Policy and Regulatory Architecture",
    body: "Benefit design, pooled financing, development finance, and the legislative pathway that moves home care from out of pocket spending into structured financing.",
  },
];

const HERO_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M48 0 0 48 M96 0 0 96' stroke='%23C9A84C' stroke-width='1' fill='none'/%3E%3C/svg%3E\")";

/* Reserved space for photography, replaced when images are supplied. */
function PhotoSlot({
  label,
  ratio = "4 / 3",
  onDark = false,
  className = "",
}: {
  label: string;
  ratio?: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <figure
      style={{ aspectRatio: ratio }}
      aria-hidden="true"
      className={`relative flex w-full items-end overflow-hidden ${
        onDark ? "bg-primary-foreground/[0.06]" : "bg-primary/[0.05]"
      } ${className}`}
    >
      <span
        className={`absolute inset-0 border ${onDark ? "border-gold/35" : "border-primary/15"}`}
      />
      <span
        className={`absolute top-1/2 left-1/2 h-px w-[130%] -translate-x-1/2 -translate-y-1/2 rotate-[24deg] ${
          onDark ? "bg-gold/20" : "bg-primary/10"
        }`}
      />
      <figcaption
        className={`display relative m-4 px-2.5 py-1.5 text-[10.5px] font-semibold tracking-[0.16em] uppercase ${
          onDark ? "bg-primary text-gold" : "bg-background text-primary/70"
        }`}
      >
        {label}
      </figcaption>
    </figure>
  );
}

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

function ConferencePage() {
  const [formType, setFormType] = useState<"attendee" | "speaker">("attendee");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ msg: string; ok: boolean } | null>(null);

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
    if (missing.length) {
      setIsSubmitting(false);
      setStatus({
        msg: `Please complete all required fields before registering. Missing: ${missing.join(", ")}.`,
        ok: false,
      });
      return;
    }

    if (answers["First choice"] === answers["Second choice"]) {
      setIsSubmitting(false);
      setStatus({
        msg: "Your first and second choice side rooms must be different.",
        ok: false,
      });
      return;
    }

    const lines = Object.entries(answers)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`);
    const body =
      "Registration — The Care Conference 2026%0D%0A%0D%0A" +
      encodeURIComponent(lines.join("\n")).replace(/%0A/g, "%0D%0A");
    window.location.href =
      `mailto:${CONF_EMAIL}?subject=` +
      encodeURIComponent(`Registration: ${answers["Full Name"]} (${formType})`) +
      `&body=${body}`;

    form.reset();
    setIsSubmitting(false);
    setFormType("attendee");
    setStatus({
      msg: "Your email app has opened with your registration details. Press send to complete your registration. A confirmation will be sent to you before the event.",
      ok: true,
    });
  }

  return (
    <div className="mx-auto max-w-[1440px]">
      {/* Masthead */}
      <header className="sticky top-0 z-30 border-b border-primary/15 bg-background/92 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4 px-[5vw] py-4">
          <a href="/" className="flex items-center">
            <img
              src="/cropped-3-768x242.webp"
              alt="The Purple Global Mission"
              className="h-8 w-auto md:h-10"
            />
          </a>
          <nav
            aria-label="Page navigation"
            className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[13px] font-medium"
          >
            <a
              href="#about"
              className="border-b border-transparent pb-0.5 text-primary/75 transition-colors hover:border-gold hover:text-primary"
            >
              About
            </a>
            <a
              href="#programme"
              className="border-b border-transparent pb-0.5 text-primary/75 transition-colors hover:border-gold hover:text-primary"
            >
              Programme
            </a>
            <a
              href="#siderooms"
              className="border-b border-transparent pb-0.5 text-primary/75 transition-colors hover:border-gold hover:text-primary"
            >
              Side Rooms
            </a>
            <a
              href="#register"
              className="border-b border-transparent pb-0.5 text-primary/75 transition-colors hover:border-gold hover:text-primary"
            >
              Register
            </a>
            <a
              href="#register"
              className="display bg-primary px-5 py-2.5 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-panel"
            >
              Register
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-gold/25 bg-primary text-primary-foreground">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(165deg,#0d1f3e_0%,#15315c_48%,#1d3a68_100%)]" />
          <div className="absolute -top-28 right-[6%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.32),transparent_68%)] blur-2xl" />
          <div className="absolute -bottom-44 -left-28 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.2),transparent_68%)] blur-2xl" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{ backgroundImage: HERO_PATTERN }}
          />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[-2vw] -z-10 overflow-hidden text-center select-none"
        >
          <p className="display text-[clamp(120px,23vw,320px)] leading-none font-bold tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_rgba(247,245,240,0.10)]">
            CARE 2026
          </p>
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
                  Building a National Position on Home Care for Nigeria. A one day national policy
                  convening, hosted by The Purple Global Mission.
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
                  Register now
                </a>
                <a
                  href="#programme"
                  className="display border-[1.5px] border-primary-foreground/30 px-7 py-3.5 text-[14px] font-semibold text-primary-foreground transition-colors hover:border-gold hover:text-gold"
                >
                  View the full programme
                </a>
              </div>
            </div>

            <div className="border border-gold/25 bg-primary-foreground/[0.05] p-8 backdrop-blur-md sm:p-9">
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="display text-[11px] font-semibold tracking-[0.2em] text-gold uppercase">
                  Event details
                </span>
                <span className="display text-[11px] font-semibold tracking-[0.2em] text-primary-foreground/55 uppercase">
                  Third edition
                </span>
              </div>
              <dl className="divide-y divide-gold/15">
                {[
                  ["Date", "Thursday 19 November 2026"],
                  ["Venue", "IALA Hub, The Chair Centre, Lagos"],
                  ["Hours", "08:00 to 17:45"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 py-3.5">
                    <dt className="display text-[11px] font-semibold tracking-[0.16em] text-gold uppercase">
                      {k}
                    </dt>
                    <dd className="text-right text-[14.5px] font-semibold text-primary-foreground">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="relative mt-6 border-t border-gold/15 pt-5">
                <p className="text-[13px] leading-snug text-primary-foreground/70">
                  Seats are assigned first come first served against room capacity and confirmed by
                  email before the day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the conference */}
      <section id="about" className="scroll-mt-20 border-b border-primary/15 px-[5vw] py-16">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[0.8fr_1.9fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Kicker>About the conference</Kicker>
            <h2 className="text-[clamp(28px,3.6vw,42px)] leading-[1.05] font-bold tracking-[-0.01em] text-primary">
              More than a conference, a platform for collective leadership
            </h2>
            <p className="mt-4 max-w-[42ch] text-[15.5px] leading-relaxed text-muted-foreground">
              Convened by The Purple Global Mission on Thursday 19 November 2026 at IALA Hub, The
              Chair Centre, Lagos.
            </p>
            <div className="mt-8 hidden lg:block">
              <PhotoSlot label="Conference image" ratio="1 / 1" />
            </div>
          </div>

          <div className="space-y-6 text-[16px] leading-relaxed text-muted-foreground">
            <p>
              Care Conference 2026 is a national convening that brings together policymakers, health
              system leaders, clinicians, innovators, caregivers, investors, researchers, and
              community advocates committed to strengthening the future of care in Nigeria. At a
              time when countries around the world are rethinking how care is delivered,
              coordinated, and sustained, the conference provides a platform for dialogue that
              connects national priorities with global health conversations on integrated care,
              workforce development, and Universal Health Coverage.
            </p>
            <p>
              As Nigeria responds to rising non-communicable diseases, evolving population health
              needs, workforce constraints, and the growing importance of home and community-based
              care, Care Conference 2026 creates a space for thoughtful exchange, collaboration, and
              shared learning. The convening brings together diverse voices across policy, practice,
              innovation, and community systems to explore how care can be strengthened in ways that
              are resilient, coordinated, and responsive to the realities of the Nigerian and
              African health landscape.
            </p>
            <div className="display border-l-2 border-gold pl-4 pt-1 text-[19px] leading-snug font-medium text-primary">
              More than a conference, Care Conference 2026 is a platform for collective
              leadership—bringing together those who are shaping the next decade of care.
            </div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section id="programme" className="scroll-mt-20 px-[5vw] py-16">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[0.8fr_1.9fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Kicker>Programme</Kicker>
            <h2 className="text-[clamp(28px,3.6vw,42px)] leading-[1.05] font-bold tracking-[-0.01em] text-primary">
              Programme, 19 November 2026
            </h2>
            <p className="mt-4 max-w-[42ch] text-[15.5px] leading-relaxed text-muted-foreground">
              One day, one room, one outcome: a Nigerian National Position on Care as
              Infrastructure, refined in session and transmitted to the National Assembly after the
              convening.
            </p>
            <div className="mt-8 hidden lg:block">
              <PhotoSlot label="Plenary photo" ratio="1 / 1" />
            </div>
          </div>

          <div>
            <ol className="border-t border-primary/15">
              {PROGRAMME.map((slot) => (
                <li
                  key={slot.time}
                  className="group grid grid-cols-[64px_1fr] gap-4 border-b border-primary/15 py-6 transition-colors hover:bg-primary/[0.025] sm:grid-cols-[104px_1fr] sm:gap-8"
                >
                  <div className="display pt-1 text-[15px] font-bold tracking-[-0.01em] text-gold-dim">
                    {slot.time}
                  </div>
                  <div>
                    <h3 className="text-[19px] leading-snug font-semibold text-primary">
                      {slot.title}
                    </h3>
                    {slot.body && (
                      <p className="mt-2 max-w-[64ch] text-[15px] leading-relaxed text-muted-foreground">
                        {slot.body}
                      </p>
                    )}
                    {slot.tag && (
                      <span
                        className={`display mt-3 inline-block border px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.12em] uppercase ${
                          slot.closed
                            ? "border-primary/25 bg-primary/[0.05] text-primary/80"
                            : "border-gold-dim/45 bg-gold/[0.15] text-primary"
                        }`}
                      >
                        {slot.tag}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-[70ch] text-[14px] leading-relaxed text-muted-foreground">
              Speakers and panellists are announced as they are confirmed. Follow The Purple Global
              Mission on LinkedIn for confirmations.
            </p>
          </div>
        </div>
      </section>

      {/* Side rooms */}
      <section
        id="siderooms"
        className="scroll-mt-20 border-y border-primary/15 bg-primary px-[5vw] py-16 text-primary-foreground"
      >
        <div className="grid gap-x-12 gap-y-8 border-b border-gold/25 pb-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Kicker onDark>Four parallel sessions</Kicker>
            <h2 className="text-[clamp(28px,3.6vw,44px)] leading-[1.03] font-bold tracking-[-0.01em]">
              The Side Rooms
            </h2>
          </div>
          <p className="max-w-[58ch] self-end text-[15.5px] leading-relaxed text-primary-foreground/82">
            At 14:15 the convening breaks into four parallel policy sessions, one for each remaining
            layer of the framework. Every delegate attends one. Tell us your first and second choice
            below and your seat is assigned and confirmed by email before the day.
          </p>
        </div>

        <div className="grid gap-px bg-gold/20 md:grid-cols-2">
          {ROOMS.map((room, i) => (
            <article key={room.letter} className="flex flex-col gap-5 bg-primary p-7 sm:flex-row">
              <div className="w-full sm:w-[38%] sm:shrink-0">
                <PhotoSlot
                  label={`Room ${String.fromCharCode(65 + i)} image`}
                  ratio="4 / 3"
                  onDark
                />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="display mb-3 flex items-center gap-2.5 text-[11px] font-bold tracking-[0.18em] text-gold uppercase">
                  <span>{room.letter}</span>
                  <span className="h-px flex-1 bg-gold/35" />
                </div>
                <h3 className="text-[21px] leading-[1.15] font-semibold tracking-[-0.01em]">
                  {room.title}
                </h3>
                <div className="mt-2 text-[13px] font-medium text-gold">{room.layer}</div>
                <p className="mt-3.5 flex-1 text-[14.5px] leading-relaxed text-primary-foreground/82">
                  {room.body}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-[86ch] text-[14px] leading-relaxed text-primary-foreground/72">
          Side rooms run once, in parallel. Selections are honoured first come first served against
          room capacity, which is why early registration matters. Second choices apply only when a
          first choice room is full.
        </p>
      </section>

      {/* Register */}
      <section id="register" className="scroll-mt-20 px-[5vw] py-16">
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-10">
            <Kicker>Register</Kicker>
            <h1 className="font-display text-[clamp(28px,4vw,44px)] leading-[1.08] font-bold tracking-[-0.01em] text-foreground">
              Register for The Care Conference 2026
            </h1>
            <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-muted-foreground">
              Care as Infrastructure — Designing Nigeria&apos;s Next Decade of Homecare.
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
        <div className="grid gap-y-9 border-b border-gold/25 pb-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="display mb-3 text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">
              Convener
            </h4>
            <p className="leading-relaxed">
              The Purple Global Mission
              <br />
              An independent, non partisan convener
              <br />
              <a
                href="https://www.purpleglobalmission.org"
                className="underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold"
              >
                www.purpleglobalmission.org
              </a>
            </p>
          </div>
          <div>
            <h4 className="display mb-3 text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">
              Contact
            </h4>
            <p className="leading-relaxed">
              <a
                href={`mailto:${CONF_EMAIL}`}
                className="underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold"
              >
                {CONF_EMAIL}
              </a>
              <br />
              +234 704 015 9577
            </p>
          </div>
          <div>
            <h4 className="display mb-3 text-[11px] font-semibold tracking-[0.18em] text-gold uppercase">
              Venue
            </h4>
            <p className="leading-relaxed">
              IALA Hub, The Chair Centre
              <br />
              Lagos, Nigeria
              <br />
              Thursday 19 November 2026
            </p>
          </div>
        </div>
        <p className="mt-8 text-[12.5px] text-primary-foreground/55">
          © 2026 The Purple Global Mission. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
