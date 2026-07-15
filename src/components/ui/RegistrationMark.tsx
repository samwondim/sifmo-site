export function RegistrationMark({ className = '', size = 16 }: { className?: string; size?: number }) {
  const half = size / 2
  const inner = size * 0.25
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      <circle cx={half} cy={half} r={inner} fill="none" stroke="currentColor" strokeWidth={0.75} />
      <line x1={half} y1={0} x2={half} y2={half - inner - 1} stroke="currentColor" strokeWidth={0.5} />
      <line x1={half} y1={half + inner + 1} x2={half} y2={size} stroke="currentColor" strokeWidth={0.5} />
      <line x1={0} y1={half} x2={half - inner - 1} y2={half} stroke="currentColor" strokeWidth={0.5} />
      <line x1={half + inner + 1} y1={half} x2={size} y2={half} stroke="currentColor" strokeWidth={0.5} />
    </svg>
  )
}
