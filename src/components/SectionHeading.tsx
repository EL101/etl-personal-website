interface Props {
  numeral: string
  title: string
  align?: 'start' | 'center'
  italic?: boolean
}

export function SectionHeading({ numeral, title, align = 'start', italic }: Props) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">{numeral}</p>
      <h2 className={italic ? 'italic' : undefined}>{title}</h2>
    </div>
  )
}
