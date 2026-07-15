export function HalftoneBg({ className = '', opacity = 'opacity-[0.03]' }: { className?: string; opacity?: string }) {
  return (
    <div
      className={`absolute inset-0 halftone-bg-subtle pointer-events-none ${opacity} ${className}`}
      aria-hidden="true"
    />
  )
}
