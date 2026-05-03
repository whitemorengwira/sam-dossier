'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Robot, PaperPlaneTilt, Sparkle } from '@phosphor-icons/react'

interface Message {
  role: 'assistant' | 'user'
  content: string
}

const suggestedQueries = [
  'What is the current gold price and how does it affect Chikonga revenue?',
  'Summarise the investment case for a new investor',
  'What are the key risks and how are they mitigated?',
  'Calculate projected EBITDA at 12 KG/month production',
  'Explain the capital distribution waterfall',
  'What is the SAMREC CPR status?',
]

const initialMessages: Message[] = [
  { role: 'assistant', content: 'Good day. I am the SAM Intelligence Assistant, your guide to the Socinga Africa Mining investment dossier. I have full access to the Chikonga Mine profile, financial models, geological reports, legal structures, and operational data. How may I assist you today?' },
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: Message = { role: 'user', content: input }
    const aiResponse: Message = { role: 'assistant', content: `Thank you for your query regarding "${input}". This feature will be connected to an AI backend in a future release. For now, please refer to the relevant dossier pages in the sidebar for comprehensive information on this topic.` }
    setMessages(prev => [...prev, userMsg, aiResponse])
    setInput('')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="shrink-0 mb-4">
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
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 ${msg.role === 'user' ? 'bg-gold/10 border border-gold/25' : 'glass-card'}`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkle size={12} weight="duotone" className="text-gold" />
                  <span className="text-gold text-[10px] font-mono uppercase tracking-wider">SAM Intelligence</span>
                </div>
              )}
              <p className="text-text-secondary text-sm leading-relaxed">{msg.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Suggested Queries */}
      {messages.length <= 1 && (
        <div className="shrink-0 mb-4">
          <p className="text-text-muted text-xs mb-2 font-mono">Suggested queries:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((q) => (
              <button key={q} onClick={() => setInput(q)} className="text-[10px] px-3 py-1.5 border border-gold/15 text-text-secondary hover:border-gold/30 hover:text-gold transition-colors">
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
        />
        <button onClick={handleSend} className="btn-gold px-4 flex items-center gap-2">
          <PaperPlaneTilt size={16} weight="bold" /> Send
        </button>
      </div>
    </div>
  )
}
