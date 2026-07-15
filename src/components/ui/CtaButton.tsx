import Link from 'next/link'
import type { ReactNode } from 'react'

interface CtaButtonProps {
  href: string
  variant?: 'primary' | 'secondary'
  children: ReactNode
  className?: string
}

export function CtaButton({ href, variant = 'primary', children, className = '' }: CtaButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 focus-ring'
  const styles = {
    primary: 'text-white gradient-accent hover:opacity-90 shadow-sm hover:shadow-md',
    secondary: 'border border-hairline text-ink-black hover:border-mid-teal hover:text-mid-teal bg-white/60',
  }

  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  )
}
