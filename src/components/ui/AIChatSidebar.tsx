"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./AIChatSidebar.module.css";

type Message = {
  id: string;
  role: "user" | "ai";
  text: string;
};

export default function AIChatSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "ai",
      text: "Welcome to SAM Dossier. I am SAM-AI, your secure executive assistant. How can I help you analyse the Chikonga Mine data or assist with your workspace tasks today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
          provider: "gemini", // Defaulting to Gemini based on user preference
        }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "ai",
            text: data.response,
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "ai",
          text: "System Error: Unable to reach AI core. Please check your network connection.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        className={`${styles.fab} ${isOpen ? styles.fabHidden : ""}`}
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Open SAM-AI Assistant"
      >
        <div className={styles.fabIcon}>
          <span className={styles.fabPulse} />
          {isHovered ? "🤖" : "✨"}
        </div>
      </button>

      {/* Chat Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span className={styles.pulseDot} />
            SAM-AI Assistant
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            ✕
          </button>
        </div>

        <div className={styles.messagesContainer}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.messageWrapper} ${
                msg.role === "user" ? styles.messageWrapperUser : styles.messageWrapperAi
              }`}
            >
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
            placeholder="Ask about Chikonga Mine, budget..."
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
