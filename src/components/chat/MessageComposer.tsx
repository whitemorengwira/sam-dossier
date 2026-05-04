'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export function MessageComposer({ channelId = 'general' }: { channelId?: string }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!content.trim() || !supabase) return;

    setIsSubmitting(true);
    
    // We assume user_id is handled by Supabase auth in a real app, 
    // for this demo we'll use a local string
    const tempUserId = 'User-' + Math.floor(Math.random() * 1000);

    const { error } = await supabase.from('chat_messages').insert([{
      channel_id: channelId,
      user_id: tempUserId,
      content: content.trim(),
    }]);

    if (!error) {
      setContent('');
    } else {
      console.error('Failed to send message:', error);
    }
    
    setIsSubmitting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t bg-white">
      <form onSubmit={handleSend} className="flex gap-2 items-end">
        <div className="flex-1 bg-gray-50 border rounded-lg focus-within:ring-2 ring-blue-500 focus-within:border-blue-500 overflow-hidden">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Press Enter to send)"
            className="w-full max-h-32 min-h-[44px] bg-transparent resize-none outline-none py-3 px-4"
            rows={1}
            disabled={isSubmitting || !supabase}
          />
          <div className="bg-gray-50 px-3 py-2 flex items-center gap-2 border-t text-gray-500">
            <button type="button" className="hover:text-gray-800 p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
            <button type="button" className="hover:text-gray-800 p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting || !supabase}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 disabled:opacity-50 transition-colors h-11 w-11 flex items-center justify-center shrink-0 mb-[40px]"
        >
          <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        </button>
      </form>
    </div>
  );
}
