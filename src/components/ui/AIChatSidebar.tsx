"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./AIChatSidebar.module.css";

const LISA_PORTRAIT = "/images/lisa-portrait.png";

type Message = {
  id: string;
  role: "user" | "ai";
  text: string;
};

export default function AIChatSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "ai",
      text: "Hello! I'm Lisa, your dedicated SAM Dossier analyst. I can help you explore the Chikonga Mine data, review financials, or assist with workspace tasks. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Load voices
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const speakText = useCallback((text: string) => {
    if (!voiceEnabled || typeof window === "undefined") return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = [
      "Google UK English Female",
      "Microsoft Hazel - English (United Kingdom)",
      "Microsoft Zira - English (United States)",
      "Samantha",
      "Karen",
      "Moira",
      "Fiona",
      "Tessa",
    ];

    let selectedVoice: SpeechSynthesisVoice | null = null;
    for (const name of preferredVoices) {
      const match = voices.find((v) => v.name.includes(name));
      if (match) {
        selectedVoice = match;
        break;
      }
    }
    if (!selectedVoice) {
      selectedVoice = voices.find((v) => v.lang.startsWith("en")) || null;
    }
    if (selectedVoice) utterance.voice = selectedVoice;

    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.volume = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const toggleMute = () => {
    if (voiceEnabled) stopSpeaking();
    setVoiceEnabled(!voiceEnabled);
  };

  const handleNewChat = () => {
    stopSpeaking();
    setMessages([
      {
        id: "intro",
        role: "ai",
        text: "Hello! I'm Lisa, your dedicated SAM Dossier analyst. I can help you explore the Chikonga Mine data, review financials, or assist with workspace tasks. How can I help you today?",
      },
    ]);
    setInput("");
    setIsTyping(false);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.text,
          context: `User is currently viewing the page: ${pathname}`,
          provider: "gemini",
        }),
      });

      const data = await response.json();

      if (data.response) {
        const aiText = data.response;
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "ai",
            text: aiText,
          },
        ]);
        speakText(aiText);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "ai",
          text: "Connection error. Please check the network and try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button — Lisa's Face */}
      <button
        className={`${styles.fab} ${isOpen ? styles.fabHidden : ""}`}
        onClick={() => setIsOpen(true)}
        title="Chat with Lisa"
      >
        <div className={styles.fabIcon}>
          <span className={styles.fabPulse} />
          <div className={styles.fabPortrait}>
            <Image
              src={LISA_PORTRAIT}
              alt="Lisa"
              width={44}
              height={44}
              className={styles.fabPortraitImg}
            />
          </div>
        </div>
      </button>

      {/* Chat Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerPortrait}>
              <Image
                src={LISA_PORTRAIT}
                alt="Lisa"
                width={32}
                height={32}
                className={styles.headerPortraitImg}
              />
              <span className={styles.onlineDot} />
            </div>
            <div>
              <div className={styles.headerTitle}>Lisa</div>
              <div className={styles.headerSubtitle}>SAM Dossier Analyst</div>
            </div>
          </div>
          <div className={styles.headerActions}>
            {/* Mute */}
            <button
              className={`${styles.headerBtn} ${!voiceEnabled ? styles.headerBtnMuted : ""}`}
              onClick={toggleMute}
              title={voiceEnabled ? "Mute Lisa" : "Unmute Lisa"}
            >
              {voiceEnabled ? "🔊" : "🔇"}
            </button>
            {/* Stop speaking */}
            {isSpeaking && (
              <button
                className={styles.headerBtn}
                onClick={stopSpeaking}
                title="Stop speaking"
              >
                ⏹
              </button>
            )}
            {/* New Chat */}
            <button
              className={styles.headerBtn}
              onClick={handleNewChat}
              title="New chat"
            >
              🔄
            </button>
            {/* Close */}
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>
        </div>

        {/* Speaking indicator */}
        {isSpeaking && (
          <div className={styles.speakingBar}>
            <div className={styles.speakingWave}>
              <span /><span /><span /><span /><span />
            </div>
            <span className={styles.speakingText}>Lisa is speaking...</span>
          </div>
        )}

        <div className={styles.messagesContainer}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.messageWrapper} ${
                msg.role === "user" ? styles.messageWrapperUser : styles.messageWrapperAi
              }`}
            >
              {msg.role === "ai" && (
                <div className={styles.msgAvatar}>
                  <Image
                    src={LISA_PORTRAIT}
                    alt="Lisa"
                    width={28}
                    height={28}
                    className={styles.msgAvatarImg}
                  />
                </div>
              )}
              <div
                className={`${styles.message} ${
                  msg.role === "user" ? styles.messageUser : styles.messageAi
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className={`${styles.messageWrapper} ${styles.messageWrapperAi}`}>
              <div className={styles.msgAvatar}>
                <Image
                  src={LISA_PORTRAIT}
                  alt="Lisa"
                  width={28}
                  height={28}
                  className={styles.msgAvatarImg}
                />
              </div>
              <div className={`${styles.message} ${styles.messageAi} ${styles.typingIndicator}`}>
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className={styles.inputForm} onSubmit={handleSend}>
          <input
            type="text"
            className={styles.input}
            placeholder="Chat with Lisa..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={!input.trim() || isTyping}
          >
            ↑
          </button>
        </form>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}
    </>
  );
}
