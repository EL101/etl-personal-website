import type { CSSProperties } from 'react'

interface Props {
  size?: number | string
  fill?: string
  className?: string
  style?: CSSProperties
}

/** Four-point star used throughout the night-sky design. */
export function Sparkle({ size = 20, fill = 'currentColor', className, style }: Props) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      className={className}
      style={style}
    >
      <path d="M12 2C12.8 8 16 11.2 22 12C16 12.8 12.8 16 12 22C11.2 16 8 12.8 2 12C8 11.2 11.2 8 12 2Z" />
    </svg>
  )
}
