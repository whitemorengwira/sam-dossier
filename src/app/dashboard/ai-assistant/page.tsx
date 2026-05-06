'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  PaperPlaneTilt,
  Sparkle,
  CircleNotch,
  SpeakerHigh,
  SpeakerSlash,
  ArrowCounterClockwise,
  Microphone,
  MicrophoneSlash,
  Stop,
} from '@phosphor-icons/react'

const LISA_PORTRAIT = '/images/lisa-portrait.png'

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

const LISA_GREETING =
  'Good day! I am Lisa, your dedicated investment analyst for the Socinga Africa Mining dossier. I have comprehensive access to the Chikonga Mine profile, financial models, geological reports, legal structures, and operational data. How may I assist you today?'

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content: LISA_GREETING,
  },
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Initialise speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript
        if (transcript.trim()) {
          handleSendDirect(transcript.trim())
        }
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const speakText = useCallback((text: string) => {
    if (!voiceEnabled || typeof window === 'undefined') return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)

    // Try to find a good female English voice
    const voices = window.speechSynthesis.getVoices()
    const preferredVoices = [
      // Prioritise female voices with these names
      'Google UK English Female',
      'Microsoft Hazel - English (United Kingdom)',
      'Microsoft Zira - English (United States)',
      'Samantha',
      'Karen',
      'Moira',
      'Fiona',
      'Tessa',
      'Google US English',
    ]

    let selectedVoice: SpeechSynthesisVoice | null = null

    // First try preferred voices by name
    for (const name of preferredVoices) {
      const match = voices.find((v) => v.name.includes(name))
      if (match) {
        selectedVoice = match
        break
      }
    }

    // Fallback: find any female-sounding English voice
    if (!selectedVoice) {
      selectedVoice =
        voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.toLowerCase().includes('female') ||
              v.name.toLowerCase().includes('woman') ||
              v.name.toLowerCase().includes('zira') ||
              v.name.toLowerCase().includes('hazel') ||
              v.name.toLowerCase().includes('samantha'))
        ) || null
    }

    // Final fallback: any English voice
    if (!selectedVoice) {
      selectedVoice = voices.find((v) => v.lang.startsWith('en')) || null
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice
    }

    utterance.rate = 0.95
    utterance.pitch = 1.05
    utterance.volume = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }, [voiceEnabled])

  // Load voices (they load asynchronously in some browsers)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.getVoices()
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices()
      }
    }
  }, [])

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  const toggleMute = () => {
    if (voiceEnabled) {
      stopSpeaking()
    }
    setVoiceEnabled(!voiceEnabled)
  }

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else if (recognitionRef.current) {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const handleNewChat = () => {
    stopSpeaking()
    setMessages(initialMessages)
    setInput('')
    setLoading(false)
  }

  const handleSendDirect = async (text: string) => {
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
          messages: [...messages, userMsg]
            .filter((m) => m.role !== 'assistant' || messages.indexOf(m) > 0)
            .map((m) => ({
              role: m.role,
              content: m.content,
            })),
        }),
      })

      const data = await res.json()

      if (data.response) {
        const aiResponse = data.response
        setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }])
        speakText(aiResponse)
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

  const handleSend = async (overrideInput?: string) => {
    const text = overrideInput || input
    await handleSendDirect(text)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="shrink-0 mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Lisa's Portrait */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold/50 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Image
                  src={LISA_PORTRAIT}
                  alt="Lisa — SAM Dossier AI Analyst"
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-navy shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            </div>
            <div>
              <h1 className="text-gold font-display font-black text-2xl leading-tight">Lisa</h1>
              <p className="text-text-muted text-sm">Investment Analyst · SAM Dossier Staff</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Voice Mute/Unmute */}
            <button
              onClick={toggleMute}
              className={`p-2.5 border transition-all duration-200 ${
                voiceEnabled
                  ? 'border-gold/25 text-gold hover:bg-gold/10 hover:border-gold/40'
                  : 'border-red-500/25 text-red-400 hover:bg-red-500/10 hover:border-red-500/40'
              }`}
              title={voiceEnabled ? 'Mute Lisa\'s voice' : 'Unmute Lisa\'s voice'}
            >
              {voiceEnabled ? <SpeakerHigh size={18} weight="duotone" /> : <SpeakerSlash size={18} weight="duotone" />}
            </button>

            {/* Stop Speaking */}
            {isSpeaking && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={stopSpeaking}
                className="p-2.5 border border-orange-500/25 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/40 transition-all duration-200"
                title="Stop speaking"
              >
                <Stop size={18} weight="fill" />
              </motion.button>
            )}

            {/* Voice Input */}
            {recognitionRef.current && (
              <button
                onClick={toggleListening}
                className={`p-2.5 border transition-all duration-200 ${
                  isListening
                    ? 'border-red-500/40 text-red-400 bg-red-500/10 animate-pulse'
                    : 'border-gold/25 text-gold hover:bg-gold/10 hover:border-gold/40'
                }`}
                title={isListening ? 'Stop listening' : 'Speak to Lisa'}
              >
                {isListening ? <MicrophoneSlash size={18} weight="duotone" /> : <Microphone size={18} weight="duotone" />}
              </button>
            )}

            {/* New Chat */}
            <button
              onClick={handleNewChat}
              className="p-2.5 border border-gold/25 text-gold hover:bg-gold/10 hover:border-gold/40 transition-all duration-200"
              title="Start new chat"
            >
              <ArrowCounterClockwise size={18} weight="bold" />
            </button>
          </div>
        </div>

        {/* Speaking Indicator */}
        <AnimatePresence>
          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex items-center gap-2"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-gold rounded-full"
                    animate={{
                      height: [4, 16, 8, 20, 4],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
              <span className="text-gold/60 text-xs font-mono">Lisa is speaking...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Listening Indicator */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex items-center gap-2"
            >
              <motion.div
                className="w-3 h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-red-400/80 text-xs font-mono">Listening... speak now</span>
            </motion.div>
          )}
        </AnimatePresence>
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
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {/* Avatar */}
              {msg.role === 'assistant' && (
                <div className="shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-gold/30">
                    <Image
                      src={LISA_PORTRAIT}
                      alt="Lisa"
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}

              <div
                className={`p-4 ${
                  msg.role === 'user' ? 'bg-gold/10 border border-gold/25' : 'glass-card'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkle size={12} weight="duotone" className="text-gold" />
                    <span className="text-gold text-[10px] font-mono uppercase tracking-wider">
                      Lisa
                    </span>
                  </div>
                )}
                <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          </motion.div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gold/30">
                  <Image
                    src={LISA_PORTRAIT}
                    alt="Lisa"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="glass-card p-4 flex items-center gap-3">
                <CircleNotch size={16} weight="bold" className="text-gold animate-spin" />
                <span className="text-text-muted text-sm font-mono">Lisa is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Queries */}
      {messages.length <= 1 && (
        <div className="shrink-0 mb-4">
          <p className="text-text-muted text-xs mb-2 font-mono">Ask Lisa about:</p>
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
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Chat with Lisa about the investment dossier..."
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
