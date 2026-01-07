import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Brain,
  ShieldHalf,
  Network,
  Users2,
  CalendarDays,
  LineChart,
  BadgeCheck,
  ChevronRight,
  ArrowUpRight,
  Mail,
  PhoneCall,
  MapPin,
  Menu,
  X,
  Sparkles,
  Rocket,
  CloudLightning,
  Lock,
  KeySquare,
  BookOpen,
  PanelsTopLeft,
  Lightbulb,
  Workflow,
} from "lucide-react";

// ------------------------------------------------------------
// Syneora Sdn Bhd — Single‑file React site
// TailwindCSS styling; Framer Motion animations; Lucide icons
// ------------------------------------------------------------
// How to use:
// 1) Drop this component into a React app (Next.js, Vite, CRA)
// 2) Ensure Tailwind is enabled. No extra CSS needed.
// 3) All links (#contact, #areas, etc.) work as anchors.
// 4) Replace PLACEHOLDER text (address/email/phone) before going live.
// ------------------------------------------------------------

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Business Areas", href: "#areas" },
  { label: "Services", href: "#services" },
  { label: "Expert Network", href: "#experts" },
  { label: "Events", href: "#events" },
  { label: "Case Studies", href: "#case" },
  { label: "Contact", href: "#contact" },
];

const businessAreas = [
  {
    title: "AI/ML & GenAI Consulting",
    icon: Brain,
    blurb:
      "Strategy to production. We help you pick high‑ROI problems, design the data foundation, and ship prototypes into scalable systems.",
    bullets: [
      "AI readiness & data maturity assessments",
      "Use‑case discovery and value sizing",
      "Model risk & governance by design",
      "POC → Pilot → Production playbooks",
    ],
  },
  {
    title: "AI/ML & GenAI Expert Networks",
    icon: Users2,
    blurb:
      "A curated bench of practitioners for short sprints, advisory boards, and interim leadership across data, ML, and GenAI.",
    bullets: [
      "On‑demand advisors & fractional leaders",
      "Domain‑specific panels (FS, telco, health)",
      "Research interviews & due‑diligence",
      "Talent pipelines for build‑operate‑transfer",
    ],
  },
  {
    title: "AI/ML & GenAI Events",
    icon: CalendarDays,
    blurb:
      "Roundtables, summits, and masterclasses that connect decision‑makers with builders. Thought leadership with outcomes.",
    bullets: [
      "CXO closed‑door roundtables",
      "Hands‑on masterclasses & hack days",
      "Annual GenAI Summit (APAC)",
      "Partner showcases & demos",
    ],
  },
  {
    title: "AI/ML & GenAI Services",
    icon: LineChart,
    blurb:
      "End‑to‑end delivery squads for data engineering, feature stores, model development, evaluation, and MLOps.",
    bullets: [
      "Data engineering & platform setup",
      "Fine‑tuning, RAG, agents & evaluation",
      "MLOps, CICD & observability",
      "Cost optimization & LLM safety",
    ],
  },
  {
    title: "GenAI‑based Cybersecurity & Networking",
    icon: ShieldHalf,
    blurb:
      "AI‑assisted SOC, anomaly detection, threat intel enrichment, and policy automation across networks and endpoints.",
    bullets: [
      "LLM‑assisted triage & threat hunting",
      "UEBA & anomaly detection pipelines",
      "Zero‑trust accelerators & policy codification",
      "Network telemetry summarization & RCA",
    ],
  },
  {
    title: "GenAI Products & Automations",
    icon: Rocket,
    blurb:
      "Reusable accelerators and lightweight products for content, customer ops, analytics co‑pilots, and developer tooling.",
    bullets: [
      "Contact‑center co‑pilot & QA",
      "Document AI (ingest → summarize → act)",
      "Analytics co‑pilot for BI & SQL",
      "Agentic workflows & orchestration",
    ],
  },
];

const services = [
  {
    title: "Data & Platform Foundation",
    icon: PanelsTopLeft,
    items: [
      "Modern data stack selection",
      "Lakehouse & vector store setup",
      "Security, lineage, governance",
    ],
  },
  {
    title: "Modeling & GenAI",
    icon: Cpu,
    items: [
      "Classical ML (XGBoost, LR, RF)",
      "LLMs: RAG, fine‑tune, eval",
      "Agents, tools, and guardrails",
    ],
  },
  {
    title: "MLOps & Reliability",
    icon: Workflow,
    items: [
      "CI/CD for ML & LLMOps",
      "Observability & drift detection",
      "Benchmarking & cost controls",
    ],
  },
  {
    title: "Security & Networking",
    icon: Network,
    items: [
      "SOC copilots & enrichment",
      "UEBA, NDR, EDR intelligence",
      "Zero‑trust & policy automation",
    ],
  },
];

const caseStudies = [
  {
    tag: "Financial Services",
    title: "Automated Retention Offers Cut Churn by 31%",
    summary:
      "Built a GenAI‑assisted retention engine combining risk segmentation with personalized ROI offers—rolled out to 300+ branches.",
    highlights: ["31% drop in BT‑outs", "5.2× offer throughput", "Nationwide rollout in 10 weeks"],
  },
  {
    tag: "Customer Operations",
    title: "Contact‑Center Co‑Pilot Reduces AHT by 28%",
    summary:
      "Deployed retrieval‑augmented assistant with guardrails and live QA scoring. Integrated with existing CRM and telephony.",
    highlights: ["‑28% AHT", "+22% FCR", "<90 days to pilot"],
  },
  {
    tag: "Cybersecurity",
    title: "LLM‑Assisted SOC Speeds Triage by 3×",
    summary:
      "Augmented alerts with natural‑language summaries, entity resolution, and playbook suggestions for faster investigations.",
    highlights: ["3× faster triage", "Fewer false positives", "Analyst satisfaction ↑"],
  },
];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
      <Sparkles className="h-3.5 w-3.5" /> {children}
    </span>
  );
}

function Container({ children, className = "" }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

function SectionHeader({ kicker, title, subtitle }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {kicker && (
        <div className="mb-3">
          <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
            {kicker}
          </span>
        </div>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-slate-600 dark:text-slate-300">{subtitle}</p>
      )}
    </div>
  );
}

function AreaCard({ title, blurb, bullets, Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-2">
          <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{blurb}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl transition group-hover:bg-indigo-500/20" />
    </motion.div>
  );
}

function ServiceCard({ title, items, Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center gap-3">
        <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        <h4 className="text-base font-semibold text-slate-900 dark:text-slate-50">{title}</h4>
      </div>
      <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
        {items.map((x, i) => (
          <li key={i} className="flex items-start gap-2">
            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseCard({ tag, title, summary, highlights }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-indigo-500">{tag}</div>
        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{title}</h4>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{summary}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {highlights.map((h, i) => (
          <span
            key={i}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700 dark:border-slate-700 dark:text-slate-300"
          >
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}

function useDarkMode() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (enabled) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [enabled]);
  return { enabled, setEnabled };
}

export default function SyneoraSite() {
  const { enabled, setEnabled } = useDarkMode();
  const [open, setOpen] = useState(false);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div id="home" className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 dark:from-slate-950 dark:to-slate-950 dark:text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/70">
        <Container className="">
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-emerald-500 text-white shadow">
                <svg viewBox="0 0 48 48" className="h-6 w-6">
                  <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                  <path d="M10 24c8-14 20-14 28 0M14 30c6-8 14-8 20 0" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-wider text-slate-900 dark:text-white">SYNEORA SDN BHD</div>
                <div className="text-[11px] tracking-widest text-slate-500 dark:text-slate-400">AI · ML · GENAI</div>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((n) => (
                <a key={n.href} href={n.href} className="text-sm text-slate-700 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400">
                  {n.label}
                </a>
              ))}
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition hover:bg-indigo-500">
                Talk to us <ArrowUpRight className="h-4 w-4" />
              </a>
              <button
                onClick={() => setEnabled(!enabled)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                aria-label="Toggle dark mode"
              >
                {enabled ? "Light" : "Dark"}
              </button>
            </nav>

            {/* Mobile */}
            <div className="md:hidden">
              <button onClick={() => setOpen((v) => !v)} className="rounded-xl border border-slate-200 p-2 dark:border-slate-700" aria-label="Menu">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden">
            <Container>
              <div className="space-y-1 pb-3 pt-2">
                {navItems.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    {n.label}
                  </a>
                ))}
                <div className="flex items-center justify-between px-3 py-2">
                  <a href="#contact" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
                    Talk to us <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => setEnabled(!enabled)}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium dark:border-slate-700"
                    aria-label="Toggle dark mode"
                  >
                    {enabled ? "Light" : "Dark"}
                  </button>
                </div>
              </div>
            </Container>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
          <div className="absolute left-1/2 top-[-10%] h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-400/30 blur-3xl" />
          <div className="absolute right-[10%] top-[30%] h-52 w-52 rounded-full bg-emerald-400/20 blur-2xl" />
          <div className="absolute left-[5%] bottom-[5%] h-40 w-40 rounded-full bg-indigo-300/20 blur-2xl" />
        </div>
        <Container className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-5xl items-center gap-10 text-center">
            <Badge>Malaysia • APAC • Global</Badge>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-6xl"
            >
              Build practical AI that ships — safely, fast, and at scale.
            </motion.h1>
            <p className="mx-auto max-w-2xl text-balance text-slate-600 dark:text-slate-300">
              Syneora helps enterprises turn ideas into value with AI/ML and Generative AI. From discovery and strategy to implementation, operations, and security — we are your build‑operate‑transfer partner.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-indigo-500">
                Book a discovery call <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#areas" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900">
                Explore business areas <ChevronRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 opacity-90 sm:grid-cols-4">
              {[
                { icon: Lock, label: "Security‑first" },
                { icon: KeySquare, label: "Responsible AI" },
                { icon: CloudLightning, label: "Scalable" },
                { icon: Lightbulb, label: "Outcome‑driven" },
              ].map((f, i) => (
                <div key={i} className="rounded-xl border border-white/40 bg-white/50 p-3 text-sm backdrop-blur dark:border-slate-700 dark:bg-white/5">
                  <div className="mb-2 flex items-center gap-2">
                    <f.icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-medium">{f.label}</span>
                  </div>
                  <div className="h-1 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Business Areas */}
      <section id="areas" className="scroll-mt-20 py-16 sm:py-24">
        <Container>
          <SectionHeader
            kicker="What we do"
            title="Business Areas"
            subtitle="Six core lanes that cover strategy, delivery, security, and outcomes."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businessAreas.map((a) => (
              <AreaCard key={a.title} title={a.title} blurb={a.blurb} bullets={a.bullets} Icon={a.icon} />
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-20 bg-slate-50/60 py-16 dark:bg-slate-900/40 sm:py-24">
        <Container>
          <SectionHeader
            kicker="How we deliver"
            title="Services & Accelerators"
            subtitle="Choose targeted sprints or end‑to‑end ownership. We fit into your cadence and stack."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.title} title={s.title} items={s.items} Icon={s.icon} />
            ))}
          </div>
        </Container>
      </section>

      {/* Expert Network */}
      <section id="experts" className="scroll-mt-20 py-16 sm:py-24">
        <Container>
          <SectionHeader
            kicker="People"
            title="Expert Network"
            subtitle="Access vetted practitioners across data, ML engineering, security, infrastructure, and domain consulting."
          />
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <ul className="grid grid-cols-1 gap-3 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
              {[
                "Fractional CDO/CAIO leadership",
                "Advisory boards & research panels",
                "Hands‑on architects & ML engineers",
                "Trainers for GenAI & MLOps",
                "On‑demand red team & evaluators",
                "Recruitment pipelines & BOT",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-500" /> <span>{x}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-500">
                Join the network <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#events" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900">
                Upcoming events <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Events */}
      <section id="events" className="scroll-mt-20 bg-slate-50/60 py-16 dark:bg-slate-900/40 sm:py-24">
        <Container>
          <SectionHeader
            kicker="Community"
            title="Events & Roundtables"
            subtitle="Curated conversations where builders meet decision‑makers."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h4 className="text-base font-semibold">CXO Roundtables</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Intimate, invite‑only sessions with 8–12 leaders to solve one problem deeply and leave with an action plan.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h4 className="text-base font-semibold">Hands‑on Masterclasses</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                One‑day labs on RAG, agents, evaluation, security, and MLOps—taught by practitioners using real stacks.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h4 className="text-base font-semibold">APAC GenAI Summit</h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Annual flagship bringing together enterprises, founders, and researchers to share what actually works.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Case Studies */}
      <section id="case" className="scroll-mt-20 py-16 sm:py-24">
        <Container>
          <SectionHeader kicker="Proof" title="Selected Case Studies" subtitle="Representative outcomes from recent engagements." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((c, idx) => (
              <CaseCard key={idx} {...c} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <Container>
          <div className="relative isolate overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600 to-emerald-600 p-8 shadow sm:p-10">
            <div className="pointer-events-none absolute -left-10 -top-10 h-36 w-36 rounded-full bg-white/20 blur-2xl" />
            <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-black/10 blur-xl" />
            <div className="grid items-center gap-8 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <h3 className="text-2xl font-semibold text-white">Ready to accelerate with AI that ships?</h3>
                <p className="mt-2 text-white/90">
                  Let’s cut through the hype and design a clear first win in 30 days—then scale it safely.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 sm:justify-end">
                <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow hover:bg-white/90">
                  Start a conversation <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#areas" className="inline-flex items-center gap-2 rounded-xl bg-black/20 px-5 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/30 hover:bg-black/30">
                  Explore offerings <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 bg-slate-50/60 py-16 dark:bg-slate-900/40 sm:py-24">
        <Container>
          <SectionHeader kicker="Get in touch" title="Contact Syneora" subtitle="Tell us about your challenge—strategy, build, security, or hiring." />
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-base font-semibold">Say Hello!</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Mail className="h-4 w-4" /> <a className="underline-offset-4 hover:underline" href="mailto:connect@syneora.com">connect@syneora.com</a>
                </li>
                {/*
                <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <PhoneCall className="h-4 w-4" /> +60‑XXX‑XXXX (placeholder)
                </li>
                */}
                <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <MapPin className="mt-0.5 h-4 w-4" /> 2nd Floor Block A, Jalan Pkak 1, Pusat Komersial Ayer Keroh, Melaka 75450, Malaysia
                </li>
              </ul>
              {/* <p className="mt-4 text-xs text-slate-500">Replace placeholders before publishing.</p> */}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = Object.fromEntries(new FormData(e.currentTarget));
                alert(`Thanks! We\n\n${JSON.stringify(data, null, 2)}`);
              }}
              className="lg:col-span-2"

              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"

              {/* required for Netlify */}
              <input type="hidden" name="form-name" value="contact" />
              {/* spam trap */}
              <input type="hidden" name="bot-field" />
            
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Name</label>
                  <input name="name" required className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500/20 focus:ring dark:border-slate-700 dark:bg-slate-950" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Work Email</label>
                  <input type="email" name="email" required className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500/20 focus:ring dark:border-slate-700 dark:bg-slate-950" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Company</label>
                  <input name="company" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500/20 focus:ring dark:border-slate-700 dark:bg-slate-950" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Country</label>
                  <input name="country" className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500/20 focus:ring dark:border-slate-700 dark:bg-slate-950" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium">What can we help with?</label>
                  <textarea name="message" rows={5} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500/20 focus:ring dark:border-slate-700 dark:bg-slate-950" placeholder="e.g., RAG for policy docs, MLOps, SOC co‑pilot, expert network, event partnership…" />
                </div>
                <div className="flex items-center gap-3">
                  <input id="nda" name="nda" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <label htmlFor="nda" className="text-sm">Happy to sign an NDA</label>
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-indigo-500">
                    Send message <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 py-10 dark:border-slate-800/60">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-emerald-500 text-white shadow">
                  <svg viewBox="0 0 48 48" className="h-6 w-6">
                    <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                    <path d="M10 24c8-14 20-14 28 0M14 30c6-8 14-8 20 0" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div className="text-sm font-semibold tracking-wider">SYNEORA SDN BHD</div>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Practical AI/ML and GenAI for enterprises across APAC. Strategy → Build → Operate.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold">Company</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {navItems.slice(1, -1).map((n) => (
                  <li key={n.href}><a className="hover:underline" href={n.href}>{n.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold">Legal</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>Privacy & Cookies</li>
                <li>Terms of Service</li>
                <li>Model Risk & Responsible AI</li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold">Contact</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> connect@syneora.com</li>
                {/* <li className="flex items-center gap-2"><PhoneCall className="h-4 w-4" /> +60‑XXX‑XXXX</li> */}
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Melaka, MY</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span>© {2025} Syneora Sdn Bhd. All rights reserved.</span>
            <span>Built with ❤️ & discipline.</span>
          </div>
        </Container>
      </footer>
    </div>
  );
}
