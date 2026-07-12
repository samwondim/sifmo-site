import type { Service } from '@/payload-types'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const initials = service.title.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  const badges = service.badges?.map(b => b.label) ?? []

  return (
    <div className="rounded-xl border border-surface-tertiary bg-surface-secondary p-6">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-sm font-bold text-[#1a1612]"
        style={{ background: 'linear-gradient(135deg, #b8952e, #d4af37, #c9a84c)' }}
      >
        {initials}
      </div>
      <h3 className="text-lg font-bold">{service.title}</h3>
      <p className="text-sm text-ink-light mt-2 leading-relaxed">{service.shortDescription}</p>
      <div className="flex flex-wrap gap-1.5 mt-4">
        {badges.map((badge) => (
          <span key={badge} className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {badge}
          </span>
        ))}
      </div>
    </div>
  )
}
