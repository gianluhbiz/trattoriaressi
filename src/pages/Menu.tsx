import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BookingComposer } from "../components/BookingComposer";
import { Reveal } from "../components/Reveal";
import { useLang, type L } from "../lib/i18n";
import { COURSES, TICINUM } from "../lib/menu";
import { spring, springSnappy } from "../lib/motion";

const SECTIONS: { id: string; title: L }[] = [
  ...COURSES.map((c) => ({ id: c.id, title: c.title })),
  { id: "ticinum", title: { it: "Ticinum", en: "Ticinum" } },
  { id: "vini", title: { it: "Vini", en: "Wine" } },
];

/** Evidenzia la sezione visibile e porta in vista la sua linguetta. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const IDS = SECTIONS.map((s) => s.id);

function Tabs({ active }: { active: string }) {
  const { t } = useLang();
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = bar.current;
    const el = container?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (container && el)
      container.scrollTo({
        left:
          el.offsetLeft -
          container.offsetLeft -
          container.clientWidth / 2 +
          el.clientWidth / 2,
        behavior: "smooth",
      });
  }, [active]);

  return (
    <div className="sticky top-[68px] z-20 mx-[calc(50%-50vw)] border-b border-cream/10 bg-coal/85 backdrop-blur-md">
      <motion.div
        layoutScroll
        ref={bar}
        className="no-scrollbar mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-4 py-3 sm:px-6 lg:px-10"
        role="navigation"
        aria-label={t({ it: "Sezioni del menu", en: "Menu sections" })}
      >
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            data-id={s.id}
            href={`#${s.id}`}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(s.id)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
              history.replaceState(null, "", `#${s.id}`);
            }}
            aria-current={active === s.id ? "true" : undefined}
            className={`relative isolate shrink-0 rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${
              active === s.id ? "text-ink" : "text-cream/80 hover:text-cream"
            }`}
          >
            {active === s.id && (
              <motion.span
                layoutId="menu-tab"
                transition={springSnappy}
                className="absolute inset-0 -z-10 rounded-full bg-cream"
              />
            )}
            {t(s.title)}
          </a>
        ))}
      </motion.div>
    </div>
  );
}

const euro = (n: number) => `€${n}`;

export default function Menu() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const active = useActiveSection(IDS);

  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-28 sm:px-6 lg:px-10 lg:pt-36">
      <header className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-12 md:items-end">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="font-display text-[clamp(3.6rem,9vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em] md:col-span-7"
        >
          {t({ it: "Il menu", en: "The menu" })}
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
          className="max-w-[46ch] text-lg leading-relaxed text-cream/85 md:col-span-5"
        >
          {t({
            it: "La carta cambia con le stagioni. Qui trovate i piatti e i prezzi pubblicati più di recente: chiedete in sala quelli del giorno.",
            en: "The menu changes with the seasons. These are the most recently published dishes and prices: ask in the room for today’s.",
          })}
        </motion.p>
      </header>

      <Tabs active={active} />

      <div className="pb-24">
        {COURSES.map((c) => (
          <section
            key={c.id}
            id={c.id}
            className="grid grid-cols-1 gap-6 border-t border-cream/15 py-14 md:grid-cols-12 md:gap-10 md:py-20"
          >
            <div className="md:col-span-4">
              <Reveal focus>
                <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.035em]">
                  {t(c.title)}
                </h2>
                {c.note && <p className="mt-3 text-muted">{t(c.note)}</p>}
              </Reveal>
            </div>
            <Reveal as="ul" delay={0.06} className="md:col-span-8">
              {c.dishes.map((d) => (
                <li key={d.name} className="group py-5 first:pt-0">
                  <div className="flex items-baseline gap-4">
                    <h3 className="font-display text-[clamp(1.3rem,2.1vw,1.75rem)] leading-tight font-medium tracking-[-0.02em]">
                      {d.name}
                    </h3>
                    <span
                      aria-hidden
                      className="mb-1.5 min-w-6 flex-1 border-b border-dotted border-cream/30 transition-colors group-hover:border-cream/50"
                    />
                    <span className="shrink-0 font-display text-[clamp(1.2rem,1.9vw,1.5rem)] font-medium tabular">
                      {d.price ?
                        euro(d.price)
                      : <span className="font-sans text-sm text-muted">
                          {t({ it: "di stagione", en: "seasonal" })}
                        </span>
                      }
                    </span>
                  </div>
                  {d.desc && (
                    <p className="mt-1.5 max-w-[56ch] text-cream/80">
                      {t(d.desc)}
                    </p>
                  )}
                </li>
              ))}
            </Reveal>
          </section>
        ))}

        <section
          id="ticinum"
          className="relative left-1/2 w-screen -translate-x-1/2 bg-[var(--band)]"
        >
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-4 py-16 sm:px-6 md:grid-cols-12 md:gap-x-10 md:py-24 lg:px-10">
            <Reveal
              focus
              className="md:col-span-4 md:col-start-1 md:row-start-1"
            >
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.035em]">
                {t({ it: "Menu Ticinum", en: "Ticinum menu" })}
              </h2>
              <p className="mt-3 text-muted">
                {t({
                  it: "Quattro portate, anche in versione vegetariana",
                  en: "Four courses, also in a vegetarian version",
                })}
              </p>
            </Reveal>
            <Reveal
              as="ul"
              delay={0.08}
              className="md:col-span-8 md:col-start-5 md:row-span-2 md:row-start-1"
            >
              {TICINUM.courses.map((c) => (
                <li
                  key={c.name}
                  className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-cream/10 py-5 first:pt-0 sm:grid-cols-[7rem_1fr]"
                >
                  <span className="text-sm text-muted">{t(c.course)}</span>
                  <span className="font-display text-[clamp(1.3rem,2.1vw,1.75rem)] leading-snug font-medium tracking-[-0.02em]">
                    {c.name}
                  </span>
                </li>
              ))}
            </Reveal>
            <Reveal
              delay={0.12}
              className="mt-4 md:col-span-4 md:col-start-1 md:row-start-2 md:mt-0"
            >
              <p className="font-display text-6xl font-semibold tracking-[-0.04em] tabular">
                {euro(TICINUM.price)}
              </p>
              <p className="mt-3 max-w-[30ch] text-sm text-muted">
                {t({
                  it: "A persona. Per tutto il tavolo, non cumulabile con altre offerte.",
                  en: "Per person. For the whole table, not combinable with other offers.",
                })}
              </p>
            </Reveal>
          </div>
        </section>

        <section
          id="vini"
          className="grid grid-cols-1 gap-6 py-16 md:grid-cols-12 md:gap-10 md:py-24"
        >
          <div className="md:col-span-4">
            <Reveal focus>
              <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.035em]">
                {t({ it: "Vini", en: "Wine" })}
              </h2>
            </Reveal>
          </div>
          <Reveal className="md:col-span-8">
            <p className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] leading-[1.18] font-medium tracking-[-0.03em] text-balance">
              {t({
                it: "Più di cento etichette, scelte soprattutto tra le cantine dell’Oltrepò Pavese.",
                en: "Over a hundred labels, chosen mostly from the wineries of the Oltrepò Pavese.",
              })}
            </p>
            <p className="mt-4 max-w-[56ch] text-cream/80">
              {t({
                it: "La carta dei vini è in sala: chiedete un consiglio per l’abbinamento.",
                en: "The wine list is in the room: ask us for a pairing.",
              })}
            </p>
          </Reveal>
        </section>

        <aside className="grid grid-cols-1 gap-4 border-t border-cream/15 pt-8 text-sm text-muted md:grid-cols-2">
          <p>
            {t({
              it: "Opzioni vegetariane e senza glutine: segnalatele al momento della prenotazione.",
              en: "Vegetarian and gluten-free options: let us know when you book.",
            })}
          </p>
          <p>
            {t({
              it: "Allergeni: chiedete al personale, che vi indicherà gli ingredienti di ogni piatto.",
              en: "Allergens: ask our staff for the ingredients of every dish.",
            })}
          </p>
        </aside>
      </div>

      <section
        id="prenota"
        className="grid grid-cols-1 gap-10 border-t border-cream/15 py-20 md:py-28 lg:grid-cols-12"
      >
        <Reveal focus className="lg:col-span-5">
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.035em]">
            {t({
              it: "Vi teniamo un tavolo?",
              en: "Shall we keep you a table?",
            })}
          </h2>
          <p className="mt-4 max-w-[40ch] text-lg text-cream/85">
            {t({
              it: "Scegliete giorno, orario e persone: il messaggio parte già scritto.",
              en: "Pick day, time and guests: the message is written for you.",
            })}
          </p>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.08}>
          <BookingComposer compact />
        </Reveal>
      </section>
    </div>
  );
}
