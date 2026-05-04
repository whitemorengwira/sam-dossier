'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Robot, PaperPlaneTilt, Sparkle, CircleNotch } from '@phosphor-icons/react'

interface Message {
  role: 'assistant' | 'user'
  content: string
}

const suggestedQueries = [
  'What is the current gold grade at Chikonga?',
  'Summarise the investment case for a new investor',
  'What are the key risks and how are they mitigated?',
  'Explain the capital distribution waterfall',
  'Who is on the executive leadership team?',
  'What is the projected ROI over 3 years?',
]

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content:
      'Good day. I am SAM Intelligence, your guide to the Socinga Africa Mining investment dossier. I have full access to the Chikonga Mine profile, financial models, geological reports, legal structures, and operational data. How may I assist you today?',
  },
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (overrideInput?: string) => {
    const text = overrideInput || input
    if (!text.trim() || loading) return

    const userMsg: Message = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].filter((m) => m.role !== 'assistant' || messages.indexOf(m) > 0).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await res.json()

      if (data.response) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.response }])
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'I encountered an error processing your request. Please try again.' },
        ])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error. Please check that the server is running and try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="shrink-0 mb-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-gold/20 to-gold/5">
            <Robot size={24} weight="duotone" className="text-gold" />
          </div>
          <div>
            <h1 className="text-gold font-display font-black text-2xl">AI Assistant</h1>
            <p className="text-text-muted text-sm">SAM Intelligence - Powered by Dossier Data</p>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pb-4 scrollbar-thin">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 ${
                msg.role === 'user' ? 'bg-gold/10 border border-gold/25' : 'glass-card'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkle size={12} weight="duotone" className="text-gold" />
                  <span className="text-gold text-[10px] font-mono uppercase tracking-wider">
                    SAM Intelligence
                  </span>
                </div>
              )}
              <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="glass-card p-4 flex items-center gap-3">
              <CircleNotch size={16} weight="bold" className="text-gold animate-spin" />
              <span className="text-text-muted text-sm font-mono">Processing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Queries */}
      {messages.length <= 1 && (
        <div className="shrink-0 mb-4">
          <p className="text-text-muted text-xs mb-2 font-mono">Suggested queries:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-[10px] px-3 py-1.5 border border-gold/15 text-text-secondary hover:border-gold/30 hover:text-gold transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="shrink-0 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about the investment dossier..."
          className="input flex-1"
          disabled={loading}
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="btn-gold px-4 flex items-center gap-2 disabled:opacity-50"
        >
          <PaperPlaneTilt size={16} weight="bold" /> Send
        </button>
      </div>
    </div>
  )
}
