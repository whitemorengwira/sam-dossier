'use client'

import { useState } from 'react'

interface Props { open: boolean; onClose: () => void; onInsert: (char: string) => void }

const CATEGORIES: Record<string, string[]> = {
  'Latin': ['À','Á','Â','Ã','Ä','Å','Æ','Ç','È','É','Ê','Ë','Ì','Í','Î','Ï','Ð','Ñ','Ò','Ó','Ô','Õ','Ö','Ø','Ù','Ú','Û','Ü','Ý','Þ','ß','à','á','â','ã','ä','å','æ','ç','è','é','ê','ë','ì','í','î','ï','ð','ñ','ò','ó','ô','õ','ö','ø','ù','ú','û','ü','ý','þ','ÿ'],
  'Symbols': ['©','®','™','°','±','×','÷','√','∞','≈','≠','≤','≥','∑','∏','∫','∂','∆','∇','∈','∉','⊂','⊃','∩','∪','⊕','⊗','†','‡','‰','‱','※'],
  'Arrows': ['←','↑','→','↓','↔','↕','⇐','⇑','⇒','⇓','⇔','⟵','⟶','⟷','↗','↘','↙','↖','⤴','⤵','↩','↪','⬅','⬆','➡','⬇'],
  'Currency': ['$','€','£','¥','₹','₽','₩','₪','₱','₿','¢','₣','₤','₦','₧','₫','₭','₮','₯','₰','₲','₳','₵','₸','₺','₻','₼','₾'],
  'Math': ['∀','∃','∄','∅','∈','∉','∋','∌','∏','∐','∑','−','∓','∔','×','÷','∗','∘','∙','√','∛','∜','∝','∞','∟','∠','∡','∢','∣','∤','∥','∦','∧','∨','∩','∪'],
  'Greek': ['α','β','γ','δ','ε','ζ','η','θ','ι','κ','λ','μ','ν','ξ','ο','π','ρ','σ','τ','υ','φ','χ','ψ','ω','Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ','Μ','Ν','Ξ','Ο','Π','Ρ','Σ','Τ','Υ','Φ','Χ','Ψ','Ω'],
  'Punctuation': ['\u2013','\u2014','\u2026','\u00B7','\u2022','\u2023','\u2039','\u203A','\u00AB','\u00BB','\u201C','\u201D','\u2018','\u2019','\u201E','\u201F','\u201A','\u201B','\u00A1','\u00BF','\u203D','\u2042','\u2040','\u2041','\u203B','\u2043','\u204A'],
}

export default function SpecialCharactersModal({ open, onClose, onInsert }: Props) {
  const [category, setCategory] = useState('Symbols')
  const [search, setSearch] = useState('')
  const [recentChars, setRecentChars] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    try { return JSON.parse(localStorage.getItem('sam-recent-chars') || '[]') } catch { return [] }
  })

  if (!open) return null

  const chars = CATEGORIES[category] || []
  const filtered = search ? Object.values(CATEGORIES).flat().filter(c => c.includes(search)) : chars

  const handleInsert = (char: string) => {
    onInsert(char)
    const updated = [char, ...recentChars.filter(c => c !== char)].slice(0, 20)
    setRecentChars(updated)
    try { localStorage.setItem('sam-recent-chars', JSON.stringify(updated)) } catch { /* */ }
  }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background:'var(--navy-light)', border:'1px solid var(--border)', width:520, maxHeight:'70vh', display:'flex', flexDirection:'column', boxShadow:'0 12px 40px rgba(0,0,0,0.5)' }}>
        <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3 style={{ color:'var(--gold)', fontFamily:'var(--font-display)', fontSize:15, fontWeight:700 }}>Special Characters</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', fontSize:18 }}>✕</button>
        </div>
        <div style={{ padding:'12px 20px', display:'flex', gap:8, borderBottom:'1px solid var(--border)', flexWrap:'wrap' }}>
          <input
            type="text" placeholder="Search characters..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex:1, minWidth:150, padding:'6px 10px', background:'var(--navy)', border:'1px solid var(--border)', color:'var(--text-primary)', fontSize:12, fontFamily:'var(--font-body)' }}
          />
          {Object.keys(CATEGORIES).map(cat => (
            <button
              key={cat} onClick={() => { setCategory(cat); setSearch('') }}
              style={{ padding:'4px 10px', fontSize:11, border:'1px solid', borderColor: category === cat ? 'var(--gold)' : 'var(--border)', background: category === cat ? 'rgba(212,175,55,0.15)' : 'transparent', color: category === cat ? 'var(--gold)' : 'var(--text-secondary)', cursor:'pointer', fontFamily:'var(--font-mono)' }}
            >{cat}</button>
          ))}
        </div>
        {recentChars.length > 0 && !search && (
          <div style={{ padding:'8px 20px', borderBottom:'1px solid var(--border)' }}>
            <p style={{ fontSize:10, color:'var(--text-muted)', marginBottom:4, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em' }}>Recent</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:2 }}>
              {recentChars.map((c, i) => (
                <button key={i} onClick={() => handleInsert(c)} style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background:'transparent', border:'1px solid var(--border)', color:'var(--text-primary)', fontSize:16, cursor:'pointer', fontFamily:'serif' }} title={`U+${c.codePointAt(0)?.toString(16).toUpperCase()}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}
        <div style={{ flex:1, overflow:'auto', padding:'12px 20px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, 36px)', gap:3 }}>
            {filtered.map((char, i) => (
              <button
                key={i} onClick={() => handleInsert(char)}
                style={{ width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', background:'transparent', border:'1px solid var(--border)', color:'var(--text-primary)', fontSize:18, cursor:'pointer', fontFamily:'serif', transition:'all 0.1s' }}
                title={`U+${char.codePointAt(0)?.toString(16).toUpperCase()}`}
                onMouseOver={e => { (e.target as HTMLElement).style.background = 'rgba(212,175,55,0.15)'; (e.target as HTMLElement).style.borderColor = 'var(--gold)' }}
                onMouseOut={e => { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.borderColor = 'var(--border)' }}
              >{char}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
