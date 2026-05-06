'use client'

import { useState } from 'react'

interface Props { open: boolean; onClose: () => void; editorRef?: React.RefObject<HTMLDivElement | null> }

export default function DictionaryModal({ open, onClose, editorRef }: Props) {
  const [word, setWord] = useState(() => {
    if (typeof window !== 'undefined') {
      const sel = window.getSelection()
      return sel?.toString().trim() || ''
    }
    return ''
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const lookup = async () => {
    if (!word.trim()) return
    setLoading(true); setError(''); setResult(null)
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.trim())}`)
      if (!res.ok) { setError(`No definition found for "${word}".`); setLoading(false); return }
      const data = await res.json()
      setResult(data[0])
    } catch { setError('Failed to look up word. Check your connection.') }
    setLoading(false)
  }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background:'var(--navy-light)', border:'1px solid var(--border)', width:460, maxHeight:'70vh', display:'flex', flexDirection:'column', boxShadow:'0 12px 40px rgba(0,0,0,0.5)' }}>
        <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3 style={{ color:'var(--gold)', fontFamily:'var(--font-display)', fontSize:15, fontWeight:700 }}>📖 Dictionary</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', fontSize:18 }}>✕</button>
        </div>
        <div style={{ padding:'16px 20px', display:'flex', gap:8, borderBottom:'1px solid var(--border)' }}>
          <input
            type="text" placeholder="Enter a word..." value={word}
            onChange={e => setWord(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && lookup()}
            style={{ flex:1, padding:'8px 12px', background:'var(--navy)', border:'1px solid var(--border)', color:'var(--text-primary)', fontSize:13, fontFamily:'var(--font-body)' }}
            autoFocus
          />
          <button onClick={lookup} disabled={loading} style={{ padding:'8px 16px', background:'var(--gold)', color:'var(--onyx)', border:'none', cursor:'pointer', fontSize:12, fontWeight:600, fontFamily:'var(--font-body)', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Looking up…' : 'Define'}
          </button>
        </div>
        <div style={{ flex:1, overflow:'auto', padding:'16px 20px' }}>
          {error && <p style={{ color:'#f87171', fontSize:13 }}>{error}</p>}
          {result && (
            <div>
              <h2 style={{ color:'var(--text-primary)', fontSize:22, fontFamily:'var(--font-display)', fontWeight:700, marginBottom:4 }}>{result.word}</h2>
              {result.phonetic && <p style={{ color:'var(--text-muted)', fontSize:13, fontFamily:'var(--font-mono)', marginBottom:12 }}>{result.phonetic}</p>}
              {result.phonetics?.find((p: any) => p.audio) && (
                <button
                  onClick={() => {
                    const audio = result.phonetics.find((p: any) => p.audio)
                    if (audio) new Audio(audio.audio).play()
                  }}
                  style={{ padding:'4px 12px', background:'rgba(212,175,55,0.1)', border:'1px solid var(--border)', color:'var(--gold)', fontSize:11, cursor:'pointer', marginBottom:12, fontFamily:'var(--font-mono)' }}
                >🔊 Pronounce</button>
              )}
              {result.meanings?.map((meaning: any, i: number) => (
                <div key={i} style={{ marginBottom:16 }}>
                  <p style={{ color:'var(--gold)', fontSize:11, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6, borderBottom:'1px solid var(--border)', paddingBottom:4 }}>{meaning.partOfSpeech}</p>
                  {meaning.definitions?.slice(0, 4).map((def: any, j: number) => (
                    <div key={j} style={{ marginBottom:8, paddingLeft:12, borderLeft:'2px solid var(--border)' }}>
                      <p style={{ color:'var(--text-primary)', fontSize:13, lineHeight:1.6 }}>{j+1}. {def.definition}</p>
                      {def.example && <p style={{ color:'var(--text-muted)', fontSize:12, fontStyle:'italic', marginTop:2 }}>"{def.example}"</p>}
                    </div>
                  ))}
                  {meaning.synonyms?.length > 0 && (
                    <div style={{ marginTop:4 }}>
                      <span style={{ color:'var(--text-muted)', fontSize:11 }}>Synonyms: </span>
                      {meaning.synonyms.slice(0, 6).map((s: string, k: number) => (
                        <span key={k} onClick={() => { setWord(s); setTimeout(lookup, 100) }} style={{ padding:'2px 8px', background:'rgba(212,175,55,0.08)', border:'1px solid var(--border)', color:'var(--text-secondary)', fontSize:11, cursor:'pointer', marginRight:4, display:'inline-block', marginBottom:4 }}>{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {!result && !error && !loading && (
            <p style={{ color:'var(--text-muted)', fontSize:13, textAlign:'center', paddingTop:30 }}>
              Select a word in your document or type one above, then click <strong>Define</strong>.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
