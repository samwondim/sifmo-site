interface TeamCardProps {
  name: string
  role: string
}

export function TeamCard({ name, role }: TeamCardProps) {
  return (
    <div className="rounded-xl border border-surface-tertiary bg-surface-secondary overflow-hidden">
      <div className="h-40 bg-surface-tertiary flex items-center justify-center text-ink-lighter">
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <div className="p-4">
        <h4 className="font-semibold">{name}</h4>
        <p className="text-xs text-ink-light">{role}</p>
      </div>
    </div>
  )
}
