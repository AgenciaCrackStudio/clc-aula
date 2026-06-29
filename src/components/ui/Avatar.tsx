import { cn } from '../../lib/cn.ts'

interface AvatarProps {
  /** Full name, used to derive initials and the alt text. */
  name: string
  /** Optional image URL; falls back to initials when absent or it fails to load. */
  src?: string | null
  /** Show the brand-coloured ring around the avatar (as in the topbar). */
  ring?: boolean
  className?: string
}

function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase()
}

/** Circular avatar that shows a photo when available, otherwise initials. */
export function Avatar({ name, src, ring = false, className }: AvatarProps) {
  return (
    <span
      className={cn(
        'inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/15 text-sm font-semibold text-primary-deep',
        ring && 'ring-2 ring-primary',
        className,
      )}
      aria-label={name}
    >
      {src ? (
        <img src={src} alt={name} className="size-full object-cover" />
      ) : (
        initialsFrom(name)
      )}
    </span>
  )
}
