import React from 'react'

export function TextBlock({ text, bgColour }: any) {
  return (
    <div className="glass-card p-8 lg:p-10" style={{ backgroundColor: bgColour }}>
      <div className="prose prose-invert max-w-none prose-headings:text-gold prose-a:text-gold hover:prose-a:text-gold/80" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  )
}

export function StatCard({ label, value, trend, bgColour, borderColour }: any) {
  return (
    <div className="border p-6" style={{ backgroundColor: bgColour, borderColor: borderColour }}>
      <p className="stat-label mb-2 text-text-muted text-xs uppercase tracking-widest">{label}</p>
      <p className="font-mono text-3xl font-bold text-gold">{value}</p>
      {trend && <p className="text-xs text-success mt-2">{trend}</p>}
    </div>
  )
}

export function TeamMemberCard({ name, title, role, initials, bgColour }: any) {
  return (
    <div className="glass-card w-[260px] p-6 shrink-0" style={{ backgroundColor: bgColour }}>
      <div className="w-12 h-12 bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/30 flex items-center justify-center mb-3">
        <span className="text-xs font-mono text-gold font-bold">{initials}</span>
      </div>
      <h4 className="text-text-primary font-body font-semibold text-sm">{name}</h4>
      <p className="text-gold text-xs font-mono mt-0.5 mb-2">{title}</p>
      <p className="text-text-muted text-xs leading-relaxed">{role}</p>
    </div>
  )
}

export function ImageBanner({ src, alt, overlayText }: any) {
  return (
    <div className="relative w-full h-[300px] overflow-hidden border border-gold/20">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-navy-light flex items-center justify-center text-text-muted">
          No Image Selected
        </div>
      )}
      {overlayText && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-8 text-center">
          <h2 className="text-3xl font-display font-bold text-gold drop-shadow-lg">{overlayText}</h2>
        </div>
      )}
    </div>
  )
}

export function TwoColumnLayout({ col1Html, col2Html, bgColour }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6" style={{ backgroundColor: bgColour }}>
      <div dangerouslySetInnerHTML={{ __html: col1Html }} className="prose prose-invert" />
      <div dangerouslySetInnerHTML={{ __html: col2Html }} className="prose prose-invert" />
    </div>
  )
}

export function CalloutBox({ title, content, bgColour }: any) {
  return (
    <div className="border-l-4 border-gold bg-gold/5 p-6" style={{ backgroundColor: bgColour }}>
      <h4 className="text-gold font-bold mb-2">{title}</h4>
      <p className="text-text-secondary text-sm leading-relaxed">{content}</p>
    </div>
  )
}

export function Divider({ style, colour }: any) {
  return (
    <hr style={{ borderTopStyle: style, borderColor: colour, margin: '2rem 0' }} />
  )
}

export function RichTable({ data, columns, rows: rowsProp }: any) {
  // Support both formats: legacy `data` array-of-arrays, or `columns` + `rows`
  let headers: string[] = []
  let bodyRows: string[][] = []

  if (columns && rowsProp) {
    headers = columns
    bodyRows = rowsProp
  } else if (data && Array.isArray(data)) {
    ;[headers, ...bodyRows] = data
  } else {
    return null
  }

  return (
    <div className="overflow-x-auto border border-gold/20">
      <table className="w-full text-left text-sm">
        <thead className="bg-gold/10 text-gold font-mono uppercase text-xs">
          <tr>
            {headers?.map((h: string, i: number) => <th key={i} className="p-3 border-b border-gold/20">{h}</th>)}
          </tr>
        </thead>
        <tbody className="text-text-secondary">
          {bodyRows.map((row: string[], i: number) => (
            <tr key={i} className="border-b border-gold/10 hover:bg-gold/5">
              {row.map((cell: string, j: number) => <td key={j} className="p-3">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
