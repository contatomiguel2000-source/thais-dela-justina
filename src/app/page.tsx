import Image from "next/image";
import { Cursor, RevealImage, SmoothScroll, Split, VelocityMarquee } from "@/components/FX";
import { BackButton } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Advice, ArrowLink, ContactForm, Faq, Header, Hero, HeroStatsMobile, Parallax, Process, Projects, Services, Testimonials, Transformations, VideoCards, WorkGrid } from "@/components/Site";
import { wrap } from "@/lib/ui";
import { IconCheck, IconInstagram, IconWhatsapp, IconYoutube } from "@/components/Icons";
import { credentials, heroStats, nav, studio } from "@/lib/data";
import { asset } from "@/lib/base-path";

const keywords = ["Casas", "Sobrados", "Geminadas", "Kitnets", "LOFTs", "Interiores", "Reformas", "Regularização"];

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <BackButton />
      <Header />
      <main>
        <Hero stats={heroStats} />
        <HeroStatsMobile stats={heroStats} />

        {/* Sobre */}
        <section id="sobre" data-title="Sobre" className="py-24 md:py-32">
          <div className={`${wrap} grid gap-12 md:grid-cols-2 md:gap-14`}>
            <div className="relative">
              <RevealImage className="relative aspect-[4/5]">
                <Image src={asset("/img/thais-quem.webp")} alt="Thais Dela Justina, arquiteta e urbanista" fill unoptimized sizes="(min-width: 768px) 560px, 100vw" className="object-cover object-top" />
              </RevealImage>
              <span className="label absolute -bottom-4 left-4 bg-ink px-3 py-2 text-paper">Do LOFT de 30 m² à casa de 125 m²</span>
            </div>
            <div className="md:pt-6">
              <span className="bracket">Sobre a Thais</span>
              <Split text="Projetar sonhos que *cabem no bolso*" className="t-h1 mt-4" />
              <div className="mt-6 space-y-4 leading-relaxed text-muted">
                <p>Sou a Thais Dela Justina, arquiteta e urbanista de Medianeira, no Paraná. Eu te ajudo a planejar e projetar a casa dos seus sonhos, a fazer as escolhas certas e a economizar na construção.</p>
                <p>Morar num loft de 30 m² me ensinou o valor de cada pequeno espaço. Depois, construímos a nossa casa e mostramos cada etapa e cada gasto no Instagram e no canal Arquiteta do LOFT. É possível viver bem em casas pequenas, bonitas e funcionais, desde que bem planejadas.</p>
              </div>
              <ul className="mt-7 space-y-2.5">
                {credentials.map((c, i) => (
                  <Reveal key={c} delay={i * 100}>
                    <li className="flex items-start gap-2.5 text-[0.95rem]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-ink text-paper">
                        <IconCheck className="h-3 w-3" />
                      </span>
                      {c}
                    </li>
                  </Reveal>
                ))}
              </ul>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <Parallax src="/img/thais-formatura.webp" alt="Thais na formatura em Arquitetura e Urbanismo" className="aspect-[4/5]" sizes="280px" strength={50} />
                <Parallax src="/img/lofts-fachada.webp" alt="Fachada dos lofts de 30 e 29 m²" className="aspect-[4/5]" sizes="280px" strength={90} />
              </div>
              <div className="mt-8">
                <ArrowLink href="#videos">Ver a obra em vídeo</ArrowLink>
              </div>
            </div>
          </div>
        </section>

        {/* O que eu projeto (faixa) */}
        <section className="border-y border-line py-6 md:py-8">
          <VelocityMarquee items={keywords} />
          <p className="sr-only">{keywords.join(", ")}</p>
        </section>

        {/* Serviços */}
        <section id="servicos" data-title="Serviços" className="py-24 md:py-32">
          <div className={wrap}>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="bracket">Serviços</span>
                <Split text="Como eu posso *te ajudar*" className="t-h1 mt-4 max-w-[36rem]" />
              </div>
              <ArrowLink href={studio.whatsapp} variant="outline">
                Pedir orçamento
              </ArrowLink>
            </div>
            <Services />
          </div>
        </section>

        {/* Processo */}
        <section id="processo" data-title="Como trabalho" className="bg-night py-24 text-paper md:py-32">
          <div className={wrap}>
            <div className="mb-12 text-center">
              <span className="bracket">Processo</span>
              <Split text="Como eu *trabalho*" className="t-h1 mt-4" />
              <p className="mx-auto mt-4 max-w-[30rem] text-paper/70">Online para todo o Brasil e presencial em Medianeira (PR).</p>
            </div>
            <Process />
          </div>
        </section>

        {/* Projetos */}
        <section id="projetos" data-title="Projetos" className="bg-night py-24 text-paper md:py-32">
          <div className={wrap}>
            <div className="mb-14">
              <span className="bracket">Projetos</span>
              <Split text="Trabalhos *selecionados*" className="t-h1 mt-4" />
              <p className="mt-4 max-w-[30rem] text-paper/70">Clique para ver as fotos. Nos projetos com obra, dá para comparar a casa pronta com o canteiro.</p>
            </div>
            <Projects />
          </div>
        </section>

        {/* Antes e depois */}
        <section id="transformacoes" data-title="Antes e depois" className="py-24 md:py-32">
          <div className={wrap}>
            <div className="mb-12">
              <span className="bracket">Transformações</span>
              <Split text="Da obra *à casa pronta*" className="t-h1 mt-4" />
            </div>
            <Transformations />
          </div>
        </section>

        {/* Mais projetos */}
        <section id="mais-projetos" data-title="Mais projetos" className="pb-24 md:pb-32">
          <div className={wrap}>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="bracket">Portfólio</span>
                <Split text="Mais *projetos*" className="t-h1 mt-4" />
              </div>
              <a href={studio.instagram} target="_blank" rel="noopener noreferrer" className="label flex items-center gap-2 border-b border-ink pb-0.5 hover:text-accent">
                <IconInstagram className="h-4 w-4" /> Todos no Instagram
              </a>
            </div>
            <WorkGrid />
          </div>
        </section>

        {/* Vídeos */}
        <section id="videos" data-title="Vídeos" className="bg-night py-24 text-paper md:py-32">
          <div className={wrap}>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="bracket">Arquiteta do LOFT</span>
                <Split text="A obra *em vídeo*" className="t-h1 mt-4" />
                <p className="mt-4 max-w-[30rem] text-paper/70">
                  <span className="max-md:hidden">Passe o mouse para ver a prévia e clique para assistir com som.</span>
                  <span className="md:hidden">As prévias tocam sozinhas. Toque para assistir com som.</span>
                </p>
              </div>
              <ArrowLink href={studio.youtube} variant="outline-light">
                Canal no YouTube
              </ArrowLink>
            </div>
            <VideoCards />
          </div>
        </section>

        {/* Conselhos */}
        <section id="conselhos" data-title="Conselhos" className="py-24 md:py-32">
          <div className={wrap}>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="bracket">Antes de construir</span>
                <Split text="5 conselhos *que parecem óbvios*" className="t-h1 mt-4 max-w-[40rem]" />
              </div>
              <p className="max-w-[22rem] text-muted">Na obra, o óbvio que você ignora costuma ser a parte mais importante.</p>
            </div>
            <Advice />
            <div className="mt-10 flex flex-col items-start gap-4 border border-line bg-white p-5 md:flex-row md:items-center md:p-6">
              <p className="flex-1 text-[0.95rem]">
                <strong className="font-semibold uppercase">Planilha de custos do LOFT</strong> · baixe grátis a planilha com os custos de 2 lofts, em Excel e PDF.
              </p>
              <ArrowLink href={studio.planilha} variant="dark">
                Baixar planilha
              </ArrowLink>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section id="depoimentos" data-title="Depoimentos" className="pb-24 md:pb-32">
          <div className={wrap}>
            <div className="mb-12 text-center">
              <span className="bracket">Depoimentos</span>
              <Split text="Quem já *conhece o trabalho*" className="t-h1 mt-4" />
            </div>
            <Testimonials />
          </div>
        </section>

        {/* Perguntas */}
        <section id="perguntas" data-title="Perguntas" className="pb-24 md:pb-32">
          <div className={`${wrap} grid gap-10 md:grid-cols-[1fr_1.5fr]`}>
            <div>
              <span className="bracket">Perguntas</span>
              <Split text="Antes de *você chamar*" className="t-h1 mt-4" />
            </div>
            <Faq />
          </div>
        </section>

        {/* Contato */}
        <section id="contato" data-title="Contato" className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0">
            <Parallax src="/img/barranco-1.webp" alt="" className="h-full w-full" strength={120} />
            <span className="absolute inset-0 bg-night/55" />
          </div>
          <div className={`${wrap} relative flex justify-end`}>
            <Reveal className="w-full bg-paper p-6 md:max-w-[34rem] md:p-9">
              <span className="bracket">Contato</span>
              <Split text="Vamos tirar a sua casa *do papel?*" className="t-h1 mt-4 !text-[clamp(1.8rem,3vw,2.6rem)]" />
              <p className="mt-3 text-[0.95rem] text-muted">Preencha e a mensagem abre pronta no WhatsApp.</p>
              <div className="mt-4">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-night pt-16 text-paper md:pt-20">
        <div className={`${wrap} grid gap-10 md:grid-cols-[1.4fr_0.7fr_1fr]`}>
          <div>
            <p className="text-[1.15rem] font-semibold uppercase">Thais Dela Justina</p>
            <p className="mt-2 max-w-[22rem] text-[0.92rem] text-paper/70">Arquiteta e Urbanista. Projetos que cabem no seu terreno (e no seu bolso).</p>
            <p className="label mt-6 text-paper/60">Me acompanhe</p>
            <div className="mt-3 flex gap-2">
              {[
                { href: studio.instagram, label: "Instagram", icon: <IconInstagram className="h-4 w-4" /> },
                { href: studio.youtube, label: "YouTube", icon: <IconYoutube className="h-4 w-4" /> },
                { href: studio.whatsapp, label: "WhatsApp", icon: <IconWhatsapp className="h-4 w-4" /> },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-10 w-10 items-center justify-center border border-paper/20 transition-colors hover:border-accent hover:bg-accent">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <nav aria-label="Links do rodapé">
            <p className="label text-paper/60">Navegue</p>
            <ul className="mt-3 space-y-1.5 text-[0.92rem] uppercase">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-accent-soft">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="label text-paper/60">Contato</p>
            <ul className="mt-3 space-y-1.5 text-[0.92rem]">
              <li>
                <a href={studio.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-accent-soft">
                  WhatsApp {studio.whatsappLabel}
                </a>
              </li>
              <li>Medianeira, Paraná · online para todo o Brasil</li>
              <li className="text-paper/70">{studio.hours}</li>
            </ul>
          </div>
        </div>
        <div className={`${wrap} mt-14 flex flex-wrap justify-between gap-3 border-t border-paper/15 py-6 text-[0.8rem] text-paper/60`}>
          <p>© 2026 Thais Dela Justina · Arquiteta do LOFT</p>
          <a href="#inicio" className="uppercase hover:text-paper">
            Voltar ao topo ↑
          </a>
        </div>
      </footer>
    </>
  );
}
