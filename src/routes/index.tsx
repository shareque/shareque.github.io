import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DevAvatar } from "@/components/DevAvatar";
import projectsData from "@/data/projects.json";
import portfolioData from "@/data/portfolio.json";

type Project = { t: string; k: string; d: string; s: string[] };
const PROJECTS = projectsData as Project[];

const PROFILE = portfolioData.profile;
const SKILLS = portfolioData.skills;
const TECH = portfolioData.tech;
const EXP = portfolioData.experience;
const EDU = portfolioData.education;
const SOCIAL = portfolioData.social;
const PAGE_SIZE = 6;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mirza Shareque — Technical Architect (.NET) & Full Stack Lead" },
      {
        name: "description",
        content:
          "Portfolio of Mirza Sharequllah Baig: Technical Architect (.NET), enterprise microservices, Saga pattern, Kafka, Redis, and cloud architectures.",
      },
      { property: "og:title", content: "Mirza Shareque — Technical Architect (.NET)" },
      {
        property: "og:description",
        content:
          "12+ years building high-concurrency microservices, distributed systems, and AI-augmented enterprise solutions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = ["about", "skills", "tech", "experience", "projects", "connect"];

function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function Index() {
  const [page, setPage] = useState(0);
  useReveal([page]);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState("about");
  const selectedProjects = PROJECTS.slice(0, 4);
  const moreProjects = PROJECTS.slice(4);
  const pageCount = Math.ceil(moreProjects.length / PAGE_SIZE);
  const pageItems = moreProjects.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const px = (pos.x - 50) / 50;
  const py = (pos.y - 50) / 50;
  const par = (d: number) => ({
    transform: `translate(${px * d}px, ${py * d}px)`,
    transition: "transform .3s ease-out",
  });

  return (
    <div
      className="relative"
      onMouseMove={(e) =>
        setPos({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        })
      }
    >
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(500px at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--primary) 9%, transparent), transparent 70%)`,
        }}
      />

      {/* vertical side nav */}
      <nav className="fixed left-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 md:flex">
        {NAV.map((n, i) => (
          <a
            key={n}
            href={`#${n}`}
            className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest"
          >
            <span
              className={`h-px transition-all ${active === n ? "w-10 bg-primary" : "w-4 bg-muted-foreground group-hover:w-8"}`}
            />
            <span
              className={
                active === n
                  ? "text-primary"
                  : "text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
              }
            >
              0{i + 1} {n}
            </span>
          </a>
        ))}
      </nav>
      <a
        href="#about"
        className="fixed right-5 top-5 z-50 grid h-12 w-12 place-items-center rounded-2xl glass p-2 transition-transform hover:scale-105 hover:border-primary shadow-lg"
        title="Mirza Shareque"
      >
        <img src="/favicon.svg" alt="MS Logo" className="h-7 w-7" />
      </a>

      <main className="relative z-10">
        {/* HERO — overlapping name + avatar */}
        <section id="about" className="relative min-h-screen overflow-hidden px-6 md:px-20">
          <div className="grid-bg absolute inset-0" />
          <div className="float-slow absolute -left-32 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="float-slow absolute -right-20 bottom-10 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl [animation-delay:-4s]" />

          <h1 className="pointer-events-none relative z-20 pt-28 text-[clamp(4.8rem,16vw,15.5rem)] font-semibold leading-[0.82] tracking-tighter">
            <span className="rise block overflow-hidden pb-1">
              <span style={par(-12)} className="inline-block">
                {PROFILE.firstName}
              </span>
            </span>
            <span className="rise block overflow-hidden pl-[6vw] md:pl-[10vw] pr-12 pb-4">
              <span
                className="text-signature font-serif italic inline-block pr-8 pb-2 [animation-delay:.15s]"
                style={par(12)}
              >
                {PROFILE.lastName}
              </span>
            </span>
          </h1>

          <div
            className="absolute right-[4%] lg:right-[6%] xl:right-[10%] 2xl:right-[15%] top-[12%] z-10 hidden lg:block"
            style={par(-20)}
          >
            <DevAvatar x={pos.x} y={pos.y} />
          </div>

          <div className="reveal glass relative z-30 mt-10 max-w-md -rotate-2 rounded-3xl p-6 md:ml-[8vw]">
            <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />{" "}
                {PROFILE.available}
              </span>
            </div>
            <p className="text-lg leading-relaxed">
              {PROFILE.tagline.split(/<\/?primary>/)[0]}
              <span className="text-primary font-medium">
                {PROFILE.tagline.split(/<\/?primary>/)[1]}
              </span>
              {PROFILE.tagline.split(/<\/?primary>/)[2]}
            </p>
          </div>
          <div className="reveal relative z-30 mt-6 flex rotate-1 flex-wrap gap-3 md:ml-[30vw]">
            <a
              href="#projects"
              className="glow rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground transition-transform hover:scale-105"
            >
              View work →
            </a>
            <a
              href="#connect"
              className="glass rounded-full px-7 py-3.5 font-medium transition-colors hover:border-primary"
            >
              Say hello
            </a>
            <a
              href={PROFILE.resume}
              download
              className="glass rounded-full px-7 py-3.5 font-medium transition-colors hover:border-primary"
            >
              Resume ↓
            </a>
          </div>
          <span className="absolute bottom-10 right-10 hidden rotate-90 origin-right font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground md:block">
            scroll ↓ portfolio · 2026
          </span>
        </section>

        {/* SKILLS — scattered overlapping cards */}
        <section id="skills" className="relative mx-auto max-w-6xl px-6 py-32">
          <h2 className="reveal pointer-events-none absolute -top-4 right-0 select-none text-[16vw] font-semibold leading-none tracking-tighter text-secondary md:text-[11rem]">
            skills
          </h2>
          <p className="reveal relative font-mono text-xs uppercase tracking-[0.3em] text-primary">
            // 01 what i do
          </p>
          <div className="relative mt-16 grid gap-6 md:block md:h-[620px]">
            {SKILLS.map((s, i) => (
              <div
                key={s.t}
                className={`reveal group w-full rounded-3xl border bg-card p-8 transition-all duration-500 hover:z-20 hover:rotate-0 hover:scale-105 hover:border-primary md:absolute md:w-[380px] ${["md:left-0 md:top-0 md:-rotate-3", "md:left-[34%] md:top-16 md:rotate-2", "md:left-[8%] md:top-[330px] md:rotate-2", "md:right-0 md:top-[290px] md:-rotate-2"][i]}`}
              >
                <span className="font-mono text-sm text-accent">{s.n}</span>
                <h3 className="mt-4 text-3xl font-semibold">{s.t}</h3>
                <p className="mt-3 text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TECH — tilted marquee bands crossing */}
        <section id="tech" className="relative overflow-hidden py-40">
          <p className="reveal mx-auto max-w-6xl px-6 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            // 02 toolbox
          </p>
          <div className="relative mt-12 h-72">
            {[0, 1].map((row) => (
              <div
                key={row}
                className={`absolute left-[-5%] top-1/2 flex w-[110%] overflow-hidden py-5 ${row ? "-translate-y-1/2 -rotate-3 bg-primary text-primary-foreground" : "-translate-y-1/2 rotate-3 border-y bg-card"}`}
              >
                <div
                  className={`marquee flex shrink-0 gap-10 pr-10 ${row ? "[animation-direction:reverse]" : ""}`}
                >
                  {[...TECH, ...TECH].map((t, i) => (
                    <span
                      key={i}
                      className={`whitespace-nowrap text-4xl font-semibold md:text-6xl ${i % 2 ? "font-serif italic" : ""}`}
                    >
                      {t} ✦
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE — staggered offset blocks */}
        <section id="experience" className="relative mx-auto max-w-6xl px-6 py-32">
          <p className="reveal font-mono text-xs uppercase tracking-[0.3em] text-primary">
            // 03 journey
          </p>
          <h2 className="reveal mt-3 text-6xl font-semibold tracking-tighter md:text-8xl">
            Where I've <span className="font-serif italic text-signature">been.</span>
          </h2>
          <div className="mt-20 space-y-10">
            {EXP.map((e, i) => (
              <div key={e.y} className="reveal relative" style={{ marginLeft: `${(i % 3) * 6}%` }}>
                <span className="pointer-events-none absolute -left-4 -top-14 select-none font-serif text-[9rem] italic leading-none text-secondary">
                  0{i + 1}
                </span>
                <div className="glass relative max-w-2xl rounded-3xl p-8 transition-transform hover:-translate-y-1">
                  <p className="font-mono text-sm text-primary">{e.y}</p>
                  <h3 className="mt-2 text-3xl font-semibold">{e.r}</h3>
                  <p className="text-accent font-medium mt-1">@ {e.c}</p>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{e.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* EDUCATION OVERVIEW */}
          {EDU && EDU.length > 0 && (
            <div className="mt-28">
              <p className="reveal font-mono text-xs uppercase tracking-[0.3em] text-primary">
                // academic foundation
              </p>
              <h3 className="reveal mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Education &amp; <span className="font-serif italic text-signature">Degrees.</span>
              </h3>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {EDU.map((item) => (
                  <div
                    key={item.degree}
                    className="reveal glass rounded-3xl p-6 transition-all hover:border-primary"
                  >
                    <span className="font-mono text-xs text-primary">{item.year}</span>
                    <h4 className="mt-2 text-xl font-semibold">{item.degree}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{item.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* PROJECTS — overlapping collage */}
        <section id="projects" className="relative mx-auto max-w-6xl px-6 py-32">
          <div className="flex items-end justify-between">
            <h2 className="reveal text-6xl font-semibold tracking-tighter md:text-8xl">
              Selected <br />
              <span className="font-serif italic text-signature">work.</span>
            </h2>
            <p className="reveal font-mono text-xs uppercase tracking-[0.3em] text-primary">
              // 04 projects
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-12">
            {selectedProjects.map((p, i) => (
              <article
                key={p.t}
                className={`reveal group relative overflow-hidden rounded-3xl border bg-card p-7 transition-all duration-500 hover:z-20 hover:-translate-y-2 hover:border-primary ${["md:col-span-7", "md:col-span-5 md:-ml-16 md:mt-24 md:rotate-2", "md:col-span-5 md:col-start-2 md:-mt-12 md:-rotate-2", "md:col-span-6 md:-mt-4"][i]}`}
              >
                <div className="relative mb-6 grid aspect-[16/10] place-items-center overflow-hidden rounded-2xl bg-secondary">
                  <div className="bg-signature absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-25" />
                  <div className="spin-slow h-28 w-28 rounded-[2rem] border-2 border-dashed border-primary/40" />
                  <span className="absolute font-serif text-5xl italic">{p.t.split(" ")[0]}</span>
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {p.k}
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{p.t}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{p.d}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.s.map((s) => (
                    <span key={s} className="rounded-full border px-3 py-1 font-mono text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className="reveal mt-24 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            // more work · {moreProjects.length} enterprise projects
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((p) => (
              <article
                key={p.t}
                className="reveal group relative rounded-2xl border bg-card p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary"
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    {p.k}
                  </p>
                  <span className="font-serif text-2xl italic text-secondary transition-colors group-hover:text-primary">
                    {p.t.charAt(0)}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.s.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border px-2.5 py-0.5 font-mono text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          {pageCount > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                aria-label="Previous page"
                className="glass grid h-11 w-11 place-items-center rounded-full transition-all hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
              >
                ←
              </button>
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Page ${i + 1}`}
                  className={`grid h-11 w-11 place-items-center rounded-full font-mono text-sm transition-all ${
                    page === i
                      ? "glow bg-primary text-primary-foreground"
                      : "glass hover:border-primary hover:text-primary"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                disabled={page === pageCount - 1}
                aria-label="Next page"
                className="glass grid h-11 w-11 place-items-center rounded-full transition-all hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-30"
              >
                →
              </button>
            </div>
          )}
        </section>

        {/* CONNECT — tilted giant type with floating links */}
        <section id="connect" className="relative overflow-hidden px-6 pb-16 pt-40">
          <div className="relative mx-auto max-w-6xl">
            <p className="reveal font-mono text-xs uppercase tracking-[0.3em] text-primary">
              // 05 let's connect
            </p>
            <h2 className="reveal mt-6 -rotate-2 text-[14vw] font-semibold leading-[0.85] tracking-tighter md:text-[10rem]">
              Let's <span className="font-serif italic text-signature">connect.</span>
            </h2>
            <div className="mt-10 flex flex-wrap gap-4 md:ml-[30%]">
              <a
                href={`mailto:${PROFILE.email}`}
                className="reveal glow rotate-2 rounded-full bg-primary px-8 py-4 text-lg font-medium text-primary-foreground transition-transform hover:rotate-0 hover:scale-105"
              >
                {PROFILE.email}
              </a>
              <a
                href={PROFILE.resume}
                download
                className="reveal glass rotate-1 rounded-full px-6 py-4 transition-all hover:rotate-0 hover:border-primary hover:text-primary"
              >
                Download resume ↓
              </a>
              {SOCIAL.filter((s) => !s.h.startsWith("mailto:")).map((s, i) => (
                <a
                  key={s.n}
                  href={s.h}
                  target="_blank"
                  rel="noreferrer"
                  className={`reveal glass rounded-full px-6 py-4 transition-all hover:rotate-0 hover:border-primary hover:text-primary ${["-rotate-3", "rotate-1", "-rotate-2"][i % 3]}`}
                >
                  {s.n} ↗
                </a>
              ))}
            </div>
            <p className="mt-24 font-mono text-xs text-muted-foreground">
              © {new Date().getFullYear()}{" "}
              {PROFILE.fullName || `${PROFILE.firstName} ${PROFILE.lastName}`} — Technical Architect
              &amp; Team Lead.
            </p>
          </div>
        </section>
      </main>

      {/* go to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`glass fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full text-lg transition-all duration-500 hover:border-primary hover:text-primary ${showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
      >
        ↑
      </button>
    </div>
  );
}
