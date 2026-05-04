// src/components/chat/MessageArea.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize a generic Supabase client using existing env vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

interface Message {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
}

export function MessageArea({ channelId = 'general' }: { channelId?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!supabase) {
      console.warn('Supabase client not initialized. Chat will not connect.');
      setLoading(false);
      return;
    }

    // 1. Fetch initial messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('channel_id', channelId)
        .order('created_at', { ascending: true })
        .limit(50);
        
      if (!error && data) {
        setMessages(data);
      }
      setLoading(false);
      scrollToBottom();
    };

    fetchMessages();

    // 2. Subscribe to realtime updates
    const channel = supabase
      .channel(`room:${channelId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `channel_id=eq.${channelId}`,
        },
        (payload) => {
          console.log('New message received:', payload);
          setMessages((prev) => [...prev, payload.new as Message]);
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelId]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center text-gray-500">Loading messages...</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
      {messages.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          No messages yet. Be the first to say hello!
        </div>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="flex gap-4 group">
            <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">
              {msg.user_id ? msg.user_id.substring(0, 2).toUpperCase() : 'U'}
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-gray-900">{msg.user_id || 'Anonymous User'}</span>
                <span className="text-xs text-gray-500">
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
