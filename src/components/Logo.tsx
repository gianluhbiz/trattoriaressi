import { Link } from 'react-router'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-3 ${className}`} aria-label="Trattoria Ressi, home">
      <span className="arch grid h-12 w-10 place-items-end overflow-hidden bg-mortar pb-0.5 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5">
        <img src="/images/insegna-trasparente.png" alt="" width={134} height={150} className="h-11 w-auto" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.45rem] font-semibold tracking-tight">Trattoria Ressi</span>
        <span className="mt-1 text-[0.72rem] text-mortar-dim">Pavia</span>
      </span>
    </Link>
  )
}
