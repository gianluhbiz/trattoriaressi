import type { ReactNode } from 'react'
import { useLang, type L } from '../lib/i18n'
import { POLICY_UPDATED } from '../lib/legal'

/** Impaginazione sobria per i testi legali: colonna di lettura, titoli chiari, nessuna animazione. */
export function LegalLayout({ title, intro, children }: { title: L; intro: L; children: ReactNode }) {
  const { t } = useLang()
  return (
    <article className="mx-auto max-w-[1400px] px-4 pt-28 pb-24 sm:px-6 lg:px-10 lg:pt-36">
      <header className="max-w-[68ch] border-b border-cream/15 pb-10">
        <h1 className="font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1] font-semibold tracking-[-0.04em]">{t(title)}</h1>
        <p className="mt-6 text-lg leading-relaxed text-cream/85">{t(intro)}</p>
        <p className="mt-4 text-sm text-muted">
          {t({ it: 'Ultimo aggiornamento:', en: 'Last updated:' })} {t(POLICY_UPDATED)}
        </p>
      </header>
      <div className="legal max-w-[68ch]">{children}</div>
    </article>
  )
}

export function LegalSection({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-b border-cream/10 py-10">
      <h2 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-semibold tracking-[-0.025em]">{title}</h2>
      <div className="mt-4 space-y-4 leading-relaxed text-cream/85">{children}</div>
    </section>
  )
}
