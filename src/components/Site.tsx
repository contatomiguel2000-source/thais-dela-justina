"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { advice, faq, moreWork, nav, projects, services, steps, studio, testimonials, transformations, videos, whatsappLink, type Project, type Work } from "@/lib/data";
import { asset } from "@/lib/base-path";
import { IconArrow, IconInstagram, IconPlus, IconRight, IconWhatsapp } from "./Icons";
import { Magnetic, RevealImage } from "./FX";
import { useHistoryLayer } from "./Nav";

/* ---------- utilitários ---------- */

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
import { wrap } from "@/lib/ui";
export { wrap };

/** Progresso (0 a 1) do elemento atravessando a tela. */
function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(clamp((window.innerHeight - r.top) / (r.height + window.innerHeight)));
    };
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return [ref, p] as const;
}

/** Fecha com Esc, trava a rolagem e liga a janela ao histórico (voltar do celular fecha). */
function useLayer(open: boolean, close: () => void, extra?: (e: KeyboardEvent) => void) {
  useHistoryLayer(open, close);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      extra?.(e);
    };
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", k);
    };
  }, [open, close, extra]);
}

function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setV(true), io.disconnect()), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, v] as const;
}

function CloseButton({ onClick, light = true }: { onClick: () => void; light?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={`label flex items-center gap-2 border px-3 py-2 transition-colors ${light ? "border-paper/30 text-paper hover:bg-paper hover:text-ink" : "border-ink/30 hover:bg-ink hover:text-paper"}`}>
      ← Voltar
    </button>
  );
}

export function ArrowLink({ href, children, variant = "dark", size = "md" }: { href: string; children: React.ReactNode; variant?: "dark" | "light" | "outline" | "outline-light" | "accent"; size?: "md" | "lg" }) {
  const ext = href.startsWith("http");
  const styles = {
    dark: "bg-ink text-paper border border-ink",
    light: "bg-paper text-ink border border-paper",
    outline: "border border-ink text-ink",
    "outline-light": "border border-paper/60 text-paper",
    accent: "bg-accent text-paper border border-accent",
  }[variant];
  const fill = variant === "accent" ? "bg-ink" : "bg-accent";
  const big = size === "lg" ? "!px-6 !py-4 !text-[0.88rem] shadow-[0_10px_30px_rgba(0,0,0,0.35)]" : "";
  return (
    <Magnetic strength={0.2}>
      <a href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`btn group relative overflow-hidden ${styles} ${big}`}>
        <span className={`absolute inset-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 ${fill}`} />
        <span className="relative transition-colors duration-300 group-hover:text-paper">{children}</span>
        <span className="relative transition-transform duration-300 group-hover:translate-x-1 group-hover:text-paper">
          <IconRight />
        </span>
      </a>
    </Magnetic>
  );
}

/* ---------- cabeçalho ---------- */
export function Header() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useLayer(open, close);
  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setSolid(y > window.innerHeight * 0.8);
      setHidden(y > 500 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const light = !solid && !open;
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${hidden && !open ? "-translate-y-full" : ""} ${solid && !open ? "bg-paper/92 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : ""}`}>
        <div className={`${wrap} flex h-16 items-center justify-between border-b ${light ? "border-paper/15 text-paper" : "border-transparent text-ink"} md:h-[4.5rem]`}>
          <a href="#inicio" data-no-back className="text-[0.95rem] font-semibold uppercase tracking-[0.02em]" onClick={close}>
            Thais Dela Justina
            <span className={`ml-2 hidden text-[0.68rem] font-medium tracking-[0.06em] sm:inline ${light ? "text-paper/70" : "text-muted"}`}>Arquiteta do LOFT</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Menu principal">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="group relative h-4 overflow-hidden text-[0.75rem] font-semibold uppercase tracking-[0.05em]">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">{n.label}</span>
                <span className="block text-accent-soft transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full" aria-hidden>
                  {n.label}
                </span>
              </a>
            ))}
          </nav>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="label flex items-center gap-2 md:hidden">
            {open ? "Fechar" : "Menu"}
            <span className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] border border-current">
              <span className={`h-px w-3.5 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-px w-3.5 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>
      <div className={`fixed inset-0 z-40 bg-paper transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] md:hidden ${open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"}`} aria-hidden={!open}>
        <nav className={`${wrap} flex h-full flex-col justify-center gap-1 pt-16`} aria-label="Menu do celular">
          {nav.map((n, i) => (
            <a key={n.href} href={n.href} tabIndex={open ? 0 : -1} onClick={close} className="t-h1 border-b border-line py-3" style={{ transition: `opacity .6s ${0.2 + i * 0.05}s, transform .6s ${0.2 + i * 0.05}s`, opacity: open ? 1 : 0, transform: open ? "none" : "translateY(20px)" }}>
              {n.label}
            </a>
          ))}
          <a href={studio.whatsapp} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="btn mt-6 justify-center bg-ink text-paper">
            <IconWhatsapp className="h-4 w-4" /> Falar com a Thais
          </a>
        </nav>
      </div>
    </>
  );
}

/* ---------- número que rola dígito a dígito (como no Lumura) ---------- */
function RollingNumber({ value, delay = 0 }: { value: string; delay?: number }) {
  const [ref, v] = useInView<HTMLSpanElement>(0.4);
  return (
    <span ref={ref} className="inline-flex overflow-hidden leading-none" aria-label={value}>
      {value.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="relative inline-block h-[1em] overflow-hidden" aria-hidden>
            {/* o dígito final (invisível) define a largura da coluna: sem buraco depois do "1" */}
            <span className="invisible">{ch}</span>
            <span className="absolute inset-x-0 top-0 flex flex-col items-center transition-transform duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: `translateY(-${v || reduced() ? Number(ch) * 10 : 0}%)`, transitionDelay: `${delay + i * 120}ms` }}>
              {Array.from({ length: 10 }, (_, d) => (
                <span key={d} className="h-[1em]">
                  {d}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden>
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

/* ---------- topo ---------- */
export function Hero({ stats }: { stats: { value: string; unit: string; label: string }[] }) {
  const [y, setY] = useState(0);
  const [m, setM] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const k = reduced() ? 0 : clamp(y / 900);
  const title = ["Projetos que cabem", "no seu terreno", "(e no seu bolso)."];
  return (
    <section
      id="inicio"
      data-title="o início"
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-night text-paper"
      onPointerMove={(e) => e.pointerType === "mouse" && !reduced() && setM({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 })}
    >
      <div className="absolute inset-0 animate-[heroIn_1.5s_cubic-bezier(0.77,0,0.18,1)_both]">
        <div className="absolute inset-0" style={{ transform: `translateY(${k * 200}px)` }}>
          <div className="absolute -inset-6 transition-transform duration-[1.2s] ease-out" style={{ transform: `translate(${m.x * -14}px, ${m.y * -10}px)` }}>
            <div className="absolute inset-0 animate-[kenburns_2.8s_cubic-bezier(0.16,1,0.3,1)_both]">
              <Image src={asset("/img/hero-quarto.webp")} alt="Quarto de casal de uma casa mobiliada para aluguel, projeto de Thais Dela Justina" fill priority unoptimized sizes="100vw" className="object-cover object-[50%_45%]" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/45 to-night/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-night/30" />
      </div>

      <div className={`${wrap} relative flex h-full flex-col justify-end pb-10 pt-28 md:justify-center md:pb-0`} style={{ opacity: 1 - k * 1.3, transform: `translateY(${k * -60}px)` }}>
        <p className="bracket animate-[fadeUp_0.9s_0.6s_both] text-paper/85">Arquiteta do LOFT · Medianeira, PR</p>
        <h1 className="t-hero mt-5">
          {title.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em] md:whitespace-nowrap">
              <span className={`block animate-[riseIn_1.1s_cubic-bezier(0.16,1,0.3,1)_both] ${i === 2 ? "text-accent-soft" : ""}`} style={{ animationDelay: `${0.7 + i * 0.12}s` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p className="mt-6 max-w-[30rem] animate-[fadeUp_1s_1.15s_both] text-[1rem] leading-relaxed text-paper/85">Casas, sobrados, geminadas, kitnets e lofts pensados para a sua realidade. Atendo online todo o Brasil e presencialmente em Medianeira.</p>
        <div className="mt-8 flex animate-[fadeUp_1s_1.3s_both] flex-wrap gap-3">
          <ArrowLink href={studio.whatsapp} variant="accent" size="lg">
            Pedir orçamento
          </ArrowLink>
          <ArrowLink href="#projetos" variant="light" size="lg">
            Ver projetos
          </ArrowLink>
        </div>
      </div>

      {/* números no canto, como no Lumura */}
      <div className={`${wrap} pointer-events-none absolute inset-x-0 bottom-8 hidden justify-end md:flex`}>
        <div className="flex animate-[fadeUp_1s_1.5s_both] gap-10 border border-paper/15 bg-night/45 px-7 py-5 backdrop-blur-md">
          {stats.map((s, i) => (
            <div key={s.label}>
              <p className="text-[2.6rem] font-semibold leading-none tracking-[-0.03em]">
                <RollingNumber value={s.value} delay={1500 + i * 200} />
                <span className="ml-1 text-[0.55em]">{s.unit}</span>
              </p>
              <p className="mt-2 max-w-[9.5rem] text-[0.78rem] leading-snug text-paper/75">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HeroStatsMobile({ stats }: { stats: { value: string; unit: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 bg-night px-4 pb-10 text-paper md:hidden">
      {stats.map((s) => (
        <div key={s.label} className="border-t border-paper/20 pt-4">
          <p className="text-[2.2rem] font-semibold leading-none tracking-[-0.03em]">
            <RollingNumber value={s.value} />
            <span className="ml-1 text-[0.55em]">{s.unit}</span>
          </p>
          <p className="mt-2 text-[0.8rem] text-paper/75">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- parallax ---------- */
export function Parallax({ src, alt, className = "", strength = 70, sizes = "100vw" }: { src: string; alt: string; className?: string; strength?: number; sizes?: string }) {
  const [ref, p] = useScrollProgress<HTMLDivElement>();
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-x-0 -inset-y-[12%]" style={{ transform: `translateY(${(p - 0.5) * -strength}px)` }}>
        <Image src={asset(src)} alt={alt} fill quality={90} sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}

/* ---------- serviços: lista que troca a foto (hover no computador, toque no celular) ---------- */
export function Services() {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.05fr] md:gap-14">
      <div className="relative aspect-[4/3] overflow-hidden md:sticky md:top-28 md:aspect-auto md:h-[30rem]">
        {services.map((s, i) => (
          <div key={s.title} className="absolute inset-0 transition-[clip-path] duration-[0.9s] ease-[cubic-bezier(0.77,0,0.18,1)]" style={{ clipPath: i === active ? "inset(0 0 0 0)" : "inset(0 0 0 100%)", zIndex: i === active ? 2 : 1 }}>
            <Image src={asset(s.image)} alt={s.title} fill quality={90} sizes="(min-width: 768px) 560px, 100vw" className={`object-cover transition-transform duration-[1.4s] ${i === active ? "scale-100" : "scale-110"}`} />
          </div>
        ))}
        <span className="label absolute bottom-3 left-3 z-10 bg-paper px-2.5 py-1 tabular-nums">
          {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
        </span>
      </div>
      <div>
        {services.map((s, i) => (
          <div key={s.title} className="border-b border-line">
            <button type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} aria-expanded={i === active} className="group flex w-full items-center justify-between gap-4 py-4 text-left md:py-5">
              <span className={`t-h1 !text-[clamp(1.35rem,2.3vw,1.9rem)] transition-all duration-500 ${i === active ? "translate-x-0 text-ink" : "text-[#6b655d] group-hover:translate-x-2 group-hover:text-ink"}`}>{s.title}</span>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-500 ${i === active ? "rotate-45 border-ink bg-ink text-paper" : "border-line"}`}>
                <IconPlus />
              </span>
            </button>
            <div className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ gridTemplateRows: i === active ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="max-w-[30rem] pb-3 leading-relaxed text-muted">{s.text}</p>
                <a href={whatsappLink(`Olá, Thais! Vim pelo site e quero saber sobre: ${s.title}.`)} target="_blank" rel="noopener noreferrer" className="label mb-5 inline-flex items-center gap-2 border-b border-ink pb-0.5 hover:border-accent hover:text-accent">
                  Quero esse serviço <IconRight />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- processo: grade com etapas e fotos que entram em sequência ---------- */
const cellStyle = (i: number, v: boolean): React.CSSProperties => ({ transitionDelay: `${i * 110}ms`, opacity: v ? 1 : 0, transform: v ? "none" : "translateY(30px)" });

function ProcessStep({ s, i, v }: { s: (typeof steps)[number]; i: number; v: boolean }) {
  return (
    <div className="group relative flex min-h-[14rem] flex-col justify-between overflow-hidden border border-paper/10 p-5 transition-all duration-700 md:p-6" style={cellStyle(i, v)}>
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <Image src={asset(s.image)} alt="" fill quality={85} sizes="400px" className="scale-110 object-cover transition-transform duration-[1.4s] group-hover:scale-100" />
        <span className="absolute inset-0 bg-night/70" />
      </div>
      <p className="label relative text-paper/70">» Etapa {s.n}</p>
      <div className="relative">
        <p className="t-h3">{s.title}</p>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-paper/75">{s.text}</p>
      </div>
    </div>
  );
}

function ProcessPhoto({ src, i, v }: { src: string; i: number; v: boolean }) {
  return (
    <div className="relative hidden min-h-[14rem] overflow-hidden transition-all duration-700 md:block" style={cellStyle(i, v)}>
      <Image src={asset(src)} alt="" fill quality={90} sizes="400px" className="object-cover transition-transform duration-[1.4s] hover:scale-105" />
    </div>
  );
}

export function Process() {
  const [ref, v] = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className="grid gap-px md:grid-cols-3">
      <ProcessStep s={steps[0]} i={0} v={v} />
      <ProcessStep s={steps[1]} i={1} v={v} />
      <ProcessPhoto src="/img/nossa-casa-2.webp" i={2} v={v} />
      <ProcessPhoto src="/img/barranco-obra-1.webp" i={3} v={v} />
      <ProcessStep s={steps[2]} i={4} v={v} />
      <ProcessStep s={steps[3]} i={5} v={v} />
    </div>
  );
}

/* ---------- projetos em destaque: zigue-zague, hover com 2ª foto e janela com galeria ---------- */
const zig = ["md:col-span-6", "md:col-span-5 md:col-start-8 md:mt-24", "md:col-span-5 md:col-start-2 md:-mt-10", "md:col-span-6 md:col-start-7 md:mt-16", "md:col-span-6", "md:col-span-5 md:col-start-8 md:mt-28"];
const zigAspect = ["aspect-[4/5]", "aspect-[4/3]", "aspect-[4/3]", "aspect-[4/5]", "aspect-[16/10]", "aspect-[4/5]"];

export function Projects() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <div className="grid gap-x-8 gap-y-14 md:grid-cols-12 md:gap-y-6">
        {projects.map((pr, i) => (
          <ProjectCard key={pr.slug} pr={pr} i={i} onOpen={() => setOpen(i)} />
        ))}
      </div>
      {open !== null && <ProjectModal index={open} setIndex={setOpen} />}
    </>
  );
}

function ProjectCard({ pr, i, onOpen }: { pr: Project; i: number; onOpen: () => void }) {
  const [ref, p] = useScrollProgress<HTMLButtonElement>();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const second = pr.gallery[1] ?? pr.before?.images[0];
  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      data-cursor="Ver projeto"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      className={`group block text-left [perspective:1200px] ${zig[i % zig.length]}`}
      aria-label={`Ver projeto: ${pr.title}`}
    >
      <div className="transition-transform duration-500 ease-out" style={{ transform: `rotateY(${tilt.x * 3}deg) rotateX(${tilt.y * -3}deg)` }}>
        <RevealImage className={`relative overflow-hidden ${zigAspect[i % zigAspect.length]}`} delay={(i % 2) * 120}>
          <div className="absolute inset-x-0 -inset-y-[8%]" style={{ transform: `translateY(${(p - 0.5) * -40}px)` }}>
            <Image src={asset(pr.cover)} alt={`${pr.title}, ${pr.place}`} fill quality={90} sizes="(min-width: 768px) 620px, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]" />
            {second && (
              <Image src={asset(second)} alt="" fill quality={90} sizes="(min-width: 768px) 620px, 100vw" className="object-cover opacity-0 transition-[opacity,transform] duration-700 max-md:hidden md:scale-110 md:group-hover:scale-100 md:group-hover:opacity-100" />
            )}
          </div>
          <span className="label absolute bottom-3 right-3 translate-y-2 bg-paper px-2.5 py-1 text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {pr.gallery.length + (pr.before?.images.length ?? 0)} fotos {pr.before ? `· ${pr.before.label.toLowerCase()}` : ""}
          </span>
        </RevealImage>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {[pr.year, pr.tag].map((t) => (
          <span key={t} className="label border border-paper/25 px-2 py-0.5 text-[0.68rem] text-paper/80">
            {t}
          </span>
        ))}
      </div>
      <p className="t-h3 relative mt-2 inline-block">
        {pr.title}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-paper transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
      </p>
      <p className="text-[0.9rem] text-paper/70">{pr.place}</p>
    </button>
  );
}

function ProjectModal({ index, setIndex }: { index: number; setIndex: (v: number | null) => void }) {
  const pr = projects[index];
  const [mode, setMode] = useState<"pronto" | "antes">("pronto");
  const [img, setImg] = useState(0);
  const list = mode === "antes" && pr.before ? pr.before.images : pr.gallery;
  const close = useCallback(() => setIndex(null), [setIndex]);
  const go = useCallback((d: number) => setImg((v) => (v + d + list.length) % list.length), [list.length]);
  const keys = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    },
    [go],
  );
  useLayer(true, close, keys);
  const swipe = useRef<number | null>(null);
  return (
    <div className="fixed inset-0 z-[70] grid animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both] bg-night text-paper md:grid-cols-[1fr_23rem]" role="dialog" aria-modal="true" aria-label={pr.title}>
      <div
        className="relative min-h-[52svh] touch-pan-y"
        onPointerDown={(e) => (swipe.current = e.clientX)}
        onPointerUp={(e) => {
          if (swipe.current === null) return;
          const dx = e.clientX - swipe.current;
          swipe.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        {list.map((src, k) => (
          <Image key={src} src={asset(src)} alt={`${pr.title}: foto ${k + 1}`} fill unoptimized sizes="100vw" className={`object-contain p-3 transition-opacity duration-500 md:p-8 ${k === img ? "opacity-100" : "opacity-0"}`} />
        ))}
        <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-3">
          <button type="button" onClick={() => go(-1)} className="flex h-11 w-11 rotate-180 items-center justify-center border border-paper/25 hover:bg-paper hover:text-ink" aria-label="Foto anterior">
            <IconRight />
          </button>
          <span className="label w-16 text-center tabular-nums text-paper/80">
            {String(img + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
          </span>
          <button type="button" onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center border border-paper/25 hover:bg-paper hover:text-ink" aria-label="Próxima foto">
            <IconRight />
          </button>
        </div>
      </div>
      <aside className="flex flex-col overflow-y-auto border-paper/10 p-6 md:border-l md:p-8">
        <div className="flex items-center justify-between">
          <CloseButton onClick={close} />
          <span className="label text-paper/60">Esc ou voltar do celular</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {[pr.year, pr.tag].map((t) => (
            <span key={t} className="label border border-paper/25 px-2 py-0.5 text-[0.68rem]">
              {t}
            </span>
          ))}
        </div>
        <h3 className="t-h1 mt-3 !text-[2rem]">{pr.title}</h3>
        <p className="mt-1 text-paper/70">{pr.place}</p>
        {pr.before && (
          <div className="mt-6 grid grid-cols-2 border border-paper/20 p-1" role="tablist" aria-label="Ver fotos">
            {(["pronto", "antes"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => {
                  setMode(m);
                  setImg(0);
                }}
                className={`label py-2 transition-colors ${mode === m ? "bg-paper text-ink" : "text-paper/75 hover:text-paper"}`}
              >
                {m === "pronto" ? (pr.slug === "varanda-do-sitio" ? "Projeto" : "Pronta") : pr.before!.label}
              </button>
            ))}
          </div>
        )}
        <p className="mt-6 leading-relaxed text-paper/85">{pr.text}</p>
        {pr.facts && (
          <ul className="mt-5 space-y-1.5 border-t border-paper/15 pt-5 text-[0.95rem]">
            {pr.facts.map((f) => (
              <li key={f}>» {f}</li>
            ))}
          </ul>
        )}
        {pr.credit && <p className="mt-4 text-[0.85rem] text-paper/60">{pr.credit}</p>}
        <div className="mt-auto grid grid-cols-4 gap-2 pt-8">
          {list.map((src, k) => (
            <button key={src} type="button" onClick={() => setImg(k)} className={`relative aspect-square overflow-hidden transition-opacity ${k === img ? "opacity-100 ring-2 ring-paper" : "opacity-45 hover:opacity-90"}`} aria-label={`Ver foto ${k + 1}`}>
              <Image src={asset(src)} alt="" fill quality={70} sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          <button type="button" onClick={() => setIndex((index - 1 + projects.length) % projects.length)} className="label flex-1 border border-paper/20 py-2.5 hover:bg-paper hover:text-ink">
            ← Anterior
          </button>
          <button type="button" onClick={() => setIndex((index + 1) % projects.length)} className="label flex-1 border border-paper/20 py-2.5 hover:bg-paper hover:text-ink">
            Próximo →
          </button>
        </div>
      </aside>
    </div>
  );
}

/* ---------- antes e depois: troca com cortina (as fotos não têm o mesmo ângulo, então é um alternador, não um slider) ---------- */
export function Transformations() {
  const [t, setT] = useState(0);
  const [after, setAfter] = useState(true);
  const cur = transformations[t];
  useEffect(() => {
    if (reduced()) return;
    const id = setTimeout(() => setAfter((v) => !v), after ? 3800 : 2400);
    return () => clearTimeout(id);
  }, [after, t]);
  return (
    <div className="grid gap-6 md:grid-cols-[17rem_1fr] md:gap-10">
      <div className="flex gap-2 overflow-x-auto no-scrollbar md:flex-col md:gap-0">
        {transformations.map((x, i) => (
          <button
            key={x.slug}
            type="button"
            onClick={() => {
              setT(i);
              setAfter(false);
            }}
            className={`group shrink-0 border-b py-3 text-left transition-colors md:py-4 ${i === t ? "border-ink" : "border-line text-[#6b655d] hover:text-ink"}`}
          >
            <span className="label block text-[0.68rem]">{String(i + 1).padStart(2, "0")}</span>
            <span className="t-h3 block whitespace-nowrap md:whitespace-normal">{x.title}</span>
          </button>
        ))}
        <p className="mt-6 hidden text-[0.9rem] leading-relaxed text-muted md:block">As fotos alternam sozinhas. Use o botão para comparar no seu ritmo.</p>
      </div>
      <div>
        <div className="relative aspect-[4/3] overflow-hidden bg-line md:aspect-[16/10]" data-cursor={after ? `Ver ${cur.beforeLabel.toLowerCase()}` : `Ver ${cur.afterLabel.toLowerCase()}`} onClick={() => setAfter((v) => !v)}>
          {transformations.map((x, i) => (
            <div key={x.slug} className={`absolute inset-0 transition-opacity duration-500 ${i === t ? "opacity-100" : "opacity-0"}`}>
              <Image src={asset(x.before)} alt={`${x.title}: ${x.beforeLabel}`} fill quality={90} sizes="(min-width: 768px) 800px, 100vw" className="object-cover" />
              <div className="absolute inset-0 transition-[clip-path] duration-[1.1s] ease-[cubic-bezier(0.77,0,0.18,1)]" style={{ clipPath: i === t && after ? "inset(0 0 0 0)" : "inset(0 0 0 100%)" }}>
                <Image src={asset(x.after)} alt={`${x.title}: ${x.afterLabel}`} fill quality={90} sizes="(min-width: 768px) 800px, 100vw" className="object-cover" />
              </div>
            </div>
          ))}
          <span className="label absolute left-3 top-3 bg-paper px-2.5 py-1">{after ? cur.afterLabel : cur.beforeLabel}</span>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="grid grid-cols-2 border border-ink p-1" role="tablist" aria-label="Comparar">
            {[false, true].map((a) => (
              <button key={String(a)} type="button" role="tab" aria-selected={after === a} onClick={() => setAfter(a)} className={`label px-4 py-2 transition-colors ${after === a ? "bg-ink text-paper" : "hover:bg-line"}`}>
                {a ? cur.afterLabel : cur.beforeLabel}
              </button>
            ))}
          </div>
          <span className="h-px flex-1 bg-line" />
        </div>
      </div>
    </div>
  );
}

/* ---------- mais projetos: filtros por categoria + ampliação ---------- */
const cats = ["Todos", "Casas", "Interiores", "Áreas externas", "Reformas"] as const;
export function WorkGrid() {
  const [cat, setCat] = useState<(typeof cats)[number]>("Todos");
  const [zoom, setZoom] = useState<number | null>(null);
  const list: Work[] = cat === "Todos" ? moreWork : moreWork.filter((w) => w.cat === cat);
  const close = useCallback(() => setZoom(null), []);
  const keys = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setZoom((v) => (v === null ? v : (v + 1) % list.length));
      if (e.key === "ArrowLeft") setZoom((v) => (v === null ? v : (v - 1 + list.length) % list.length));
    },
    [list.length],
  );
  useLayer(zoom !== null, close, keys);
  return (
    <>
      <div className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0" role="tablist" aria-label="Filtrar projetos">
        {cats.map((c) => {
          const n = c === "Todos" ? moreWork.length : moreWork.filter((w) => w.cat === c).length;
          return (
            <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`label shrink-0 border px-3.5 py-2 transition-colors ${cat === c ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}>
              {c} <sup className="ml-0.5 opacity-60">{n}</sup>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {list.map((w, i) => (
          <button key={`${cat}-${w.src}`} type="button" onClick={() => setZoom(i)} data-cursor="Ampliar" className="group animate-[pop_0.6s_cubic-bezier(0.16,1,0.3,1)_both] text-left" style={{ animationDelay: `${i * 45}ms` }} aria-label={`Ampliar: ${w.title}`}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={asset(w.src)} alt={w.title} fill quality={90} sizes="(min-width: 768px) 290px, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className="label absolute left-2 top-2 bg-paper/90 px-2 py-0.5 text-[0.62rem]">{w.cat}</span>
            </div>
            <p className="mt-2 text-[0.92rem] font-semibold uppercase leading-tight tracking-[0.01em]">{w.title}</p>
            <p className="text-[0.82rem] leading-snug text-muted">{w.text}</p>
          </button>
        ))}
      </div>
      {zoom !== null && list[zoom] && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-night/96 p-4 text-paper md:p-8" role="dialog" aria-modal="true" aria-label={list[zoom].title}>
          <div className="flex items-center justify-between">
            <CloseButton onClick={close} />
            <span className="label tabular-nums text-paper/70">
              {String(zoom + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
            </span>
          </div>
          <div key={zoom} className="relative my-4 flex-1 animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
            <Image src={asset(list[zoom].src)} alt={list[zoom].title} fill unoptimized sizes="100vw" className="object-contain" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <button type="button" onClick={() => setZoom((zoom - 1 + list.length) % list.length)} className="flex h-11 w-11 shrink-0 rotate-180 items-center justify-center border border-paper/25 hover:bg-paper hover:text-ink" aria-label="Anterior">
              <IconRight />
            </button>
            <div className="text-center">
              <p className="t-h3">{list[zoom].title}</p>
              <p className="text-[0.9rem] text-paper/70">{list[zoom].text}</p>
            </div>
            <button type="button" onClick={() => setZoom((zoom + 1) % list.length)} className="flex h-11 w-11 shrink-0 items-center justify-center border border-paper/25 hover:bg-paper hover:text-ink" aria-label="Próximo">
              <IconRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- vídeos ---------- */
function VideoCard({ x, i, onOpen }: { x: (typeof videos)[number]; i: number; onOpen: () => void }) {
  const vid = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = vid.current;
    if (!el || reduced() || window.matchMedia("(pointer: fine)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.7 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="Assistir"
      onPointerEnter={(e) => e.pointerType === "mouse" && vid.current?.play().catch(() => {})}
      onPointerLeave={() => vid.current?.pause()}
      className={`group w-[62%] shrink-0 snap-start text-left md:w-auto ${i % 2 ? "md:mt-12" : ""}`}
      aria-label={`Assistir: ${x.title}`}
    >
      <RevealImage className="relative aspect-[9/16] overflow-hidden" delay={(i % 4) * 110}>
        <video ref={vid} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src={asset(`/video/${x.slug}-preview.mp4`)} poster={asset(`/img/reel-${x.slug}.webp`)} muted loop playsInline preload="none" />
        <span className="absolute inset-0 bg-gradient-to-t from-night/75 via-transparent to-transparent" />
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-paper/50 text-paper backdrop-blur transition-all duration-500 group-hover:scale-0 group-hover:opacity-0">▶</span>
        <span className="absolute bottom-3 left-3 text-paper">
          <span className="block text-[1.4rem] font-semibold leading-none tracking-[-0.02em]">{x.views}</span>
          <span className="label text-[0.62rem] text-paper/75">visualizações</span>
        </span>
      </RevealImage>
      <p className="mt-3 text-[0.95rem] font-semibold uppercase leading-tight">{x.title}</p>
      <p className="text-[0.85rem] text-paper/65">{x.text}</p>
    </button>
  );
}

export function VideoCards() {
  const [open, setOpen] = useState<string | null>(null);
  const close = useCallback(() => setOpen(null), []);
  useLayer(open !== null, close);
  const v = videos.find((x) => x.slug === open);
  return (
    <>
      <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0">
        {videos.map((x, i) => (
          <VideoCard key={x.slug} x={x} i={i} onOpen={() => setOpen(x.slug)} />
        ))}
      </div>
      {v && (
        <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 bg-night/96 p-4" role="dialog" aria-modal="true" aria-label={v.title}>
          <div className="absolute left-4 top-4 md:left-8 md:top-8">
            <CloseButton onClick={close} />
          </div>
          <video className="max-h-[80vh] w-auto max-w-full animate-[fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_both]" src={asset(`/video/${v.slug}.mp4`)} poster={asset(`/img/reel-${v.slug}.webp`)} autoPlay controls playsInline />
          <p className="label text-paper/80">
            {v.title} · {v.views} visualizações
          </p>
        </div>
      )}
    </>
  );
}

/* ---------- 5 conselhos: cartas que se espalham e podem ser arrastadas ---------- */
export function Advice() {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [active, setActive] = useState(0);
  const [ref, v] = useInView<HTMLDivElement>(0.25);
  const goTo = (i: number) => {
    const el = track.current?.children[i] as HTMLElement | undefined;
    if (el && track.current) track.current.scrollTo({ left: el.offsetLeft - track.current.offsetLeft, behavior: "smooth" });
  };
  return (
    <div ref={ref}>
      <div
        ref={track}
        data-cursor="Arraste"
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 md:mx-0 md:px-0"
        onScroll={(e) => {
          const el = e.currentTarget;
          const w = (el.children[0] as HTMLElement)?.offsetWidth ?? 1;
          setActive(Math.round(el.scrollLeft / (w + 16)));
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !track.current) return;
          drag.current = { x: e.clientX, left: track.current.scrollLeft };
          track.current.style.scrollSnapType = "none";
        }}
        onPointerMove={(e) => {
          if (!drag.current || !track.current) return;
          track.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
        }}
        onPointerUp={() => {
          drag.current = null;
          if (track.current) track.current.style.scrollSnapType = "";
        }}
        onPointerLeave={() => {
          drag.current = null;
          if (track.current) track.current.style.scrollSnapType = "";
        }}
      >
        {advice.map((a, i) => (
          <article
            key={a.n}
            className="flex min-h-[19rem] w-[82%] shrink-0 snap-start select-none flex-col justify-between border border-ink bg-white p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:bg-ink hover:text-paper md:w-[calc((100%-3rem)/3.3)]"
            style={{ transitionDelay: v ? `${i * 90}ms` : "0ms", opacity: v ? 1 : 0, transform: v ? "none" : `translateX(${60 + i * 40}px) rotate(${3 - i}deg)` }}
          >
            <p className="text-[3.4rem] font-semibold leading-none tracking-[-0.05em] text-accent">{a.n}</p>
            <div>
              <p className="t-h3">{a.title}</p>
              <p className="mt-3 text-[0.92rem] leading-relaxed opacity-75">{a.text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="flex gap-1.5">
          {advice.map((a, i) => (
            <button key={a.n} type="button" onClick={() => goTo(i)} className={`h-[3px] transition-all duration-500 ${i === active ? "w-10 bg-ink" : "w-5 bg-line hover:bg-muted"}`} aria-label={`Conselho ${i + 1}`} />
          ))}
        </div>
        <span className="label text-muted">Arraste para o lado</span>
      </div>
    </div>
  );
}

/* ---------- depoimentos (comentários reais no Instagram) ---------- */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const start = useRef<number | null>(null);
  const n = testimonials.length;
  const go = useCallback((d: number) => setI((v) => (v + d + n) % n), [n]);
  useEffect(() => {
    if (paused || reduced()) return;
    const t = setTimeout(() => go(1), 6500);
    return () => clearTimeout(t);
  }, [i, paused, go]);
  const t = testimonials[i];
  return (
    <div
      className="grid touch-pan-y items-center gap-8 md:grid-cols-[1fr_1.15fr] md:gap-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={(e) => (start.current = e.clientX)}
      onPointerUp={(e) => {
        if (start.current === null) return;
        const dx = e.clientX - start.current;
        start.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden" data-cursor="Arraste">
        {testimonials.map((x, k) => (
          <div key={x.name} className="absolute inset-0 transition-[clip-path] duration-[1.1s] ease-[cubic-bezier(0.77,0,0.18,1)]" style={{ clipPath: k === i ? "inset(0 0 0 0)" : "inset(0 0 0 100%)", zIndex: k === i ? 2 : 1 }}>
            <Image src={asset(x.image)} alt="" fill quality={90} sizes="(min-width: 768px) 560px, 100vw" className={`object-cover transition-transform duration-[1.6s] ${k === i ? "scale-100" : "scale-125"}`} />
          </div>
        ))}
      </div>
      <div className="select-none">
        <span className="label inline-flex items-center gap-2 border border-ink px-2 py-1">
          <IconInstagram className="h-3.5 w-3.5" /> Comentário no Instagram
        </span>
        <blockquote key={i} className="mt-6 text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold uppercase leading-[1.2] tracking-[-0.01em]">
          {`“${t.text}”`.split(" ").map((w, k) => (
            <span key={k} className="inline-block animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: `${k * 30}ms` }}>
              {w}&nbsp;
            </span>
          ))}
        </blockquote>
        <div className="mt-8 flex items-end justify-between gap-6 border-t border-line pt-5">
          <div key={`n${i}`} className="animate-[fadeUp_0.7s_0.2s_both]">
            <p className="font-semibold uppercase">{t.name}</p>
            <p className="text-[0.88rem] text-muted">{t.detail}</p>
          </div>
          <div className="flex gap-2">
            <Magnetic>
              <button type="button" onClick={() => go(-1)} className="flex h-11 w-11 rotate-180 items-center justify-center border border-ink transition-colors hover:bg-ink hover:text-paper" aria-label="Anterior">
                <IconRight />
              </button>
            </Magnetic>
            <Magnetic>
              <button type="button" onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center bg-ink text-paper transition-colors hover:bg-accent" aria-label="Próximo">
                <IconRight />
              </button>
            </Magnetic>
          </div>
        </div>
        <div className="mt-5 flex gap-1.5">
          {testimonials.map((x, k) => (
            <button key={x.name} type="button" onClick={() => setI(k)} className="relative h-[3px] flex-1 overflow-hidden bg-line" aria-label={`Depoimento ${k + 1}`}>
              {k === i && <span key={`${i}-${paused}`} className="absolute inset-0 origin-left bg-ink" style={paused ? undefined : { animation: "fill 6.5s linear forwards" }} />}
              {k < i && <span className="absolute inset-0 bg-ink" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- perguntas ---------- */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-line">
      {faq.map((f, i) => (
        <div key={f.q} className="border-b border-line">
          <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="group flex w-full items-center justify-between gap-6 py-5 text-left">
            <span className="text-[0.98rem] font-semibold uppercase tracking-[0.01em] transition-transform duration-500 group-hover:translate-x-1.5">{f.q}</span>
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center transition-transform duration-500 ${open === i ? "rotate-45" : ""}`}>
              <IconPlus />
            </span>
          </button>
          <div className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}>
            <div className="overflow-hidden">
              <p className="max-w-[40rem] pb-6 leading-relaxed text-muted">{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- contato: formulário que abre o WhatsApp ---------- */
const kinds = ["Casa ou sobrado", "Lofts / kitnets para renda", "Interiores", "Reforma", "Acompanhamento de obra", "Regularização"];
export function ContactForm() {
  const [f, setF] = useState({ nome: "", cidade: "", tipo: kinds[0], msg: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF((v) => ({ ...v, [k]: e.target.value }));
  const field = "w-full border-b border-ink/25 bg-transparent py-3 text-[0.95rem] outline-none transition-colors placeholder:text-muted focus:border-accent";
  return (
    <form
      className="grid gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        const text = `Olá, Thais! Vim pelo site.\nNome: ${f.nome}\nCidade: ${f.cidade}\nProjeto: ${f.tipo}\n${f.msg}`;
        window.open(whatsappLink(text), "_blank", "noopener");
      }}
    >
      <input required value={f.nome} onChange={set("nome")} placeholder="Seu nome" className={field} aria-label="Seu nome" />
      <input required value={f.cidade} onChange={set("cidade")} placeholder="Sua cidade" className={field} aria-label="Sua cidade" />
      <select value={f.tipo} onChange={set("tipo")} className={field} aria-label="Tipo de projeto">
        {kinds.map((k) => (
          <option key={k}>{k}</option>
        ))}
      </select>
      <textarea value={f.msg} onChange={set("msg")} rows={3} placeholder="Conte um pouco: tamanho do terreno, quantos quartos, prazo..." className={`${field} resize-none`} aria-label="Mensagem" />
      <div className="mt-5">
        <button type="submit" className="btn group relative overflow-hidden bg-ink text-paper">
          <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
          <span className="relative flex items-center gap-2">
            <IconWhatsapp className="h-4 w-4" /> Enviar pelo WhatsApp
          </span>
          <span className="relative transition-transform group-hover:translate-x-1">
            <IconArrow className="h-4 w-4" />
          </span>
        </button>
      </div>
    </form>
  );
}
