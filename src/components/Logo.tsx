import { Link } from 'react-router'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-3 ${className}`} aria-label="Trattoria Ressi, home">
      <img
        src="/images/insegna.png"
        alt=""
        width={270}
        height={270}
        className="h-10 w-10 rounded-full bg-cream object-cover ring-1 ring-cream/20 transition-transform duration-500 ease-out-expo group-hover:rotate-[-6deg]"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.3rem] font-semibold tracking-[-0.03em]">Trattoria Ressi</span>
        <span className="mt-1 text-xs text-muted">Pavia</span>
      </span>
    </Link>
  )
}
