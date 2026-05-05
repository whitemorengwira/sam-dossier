// src/components/editor/NexusEditor.tsx
// The main document editor. Wraps TipTap with the full Nexus UI.

'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';
import { buildEditorExtensions } from '@/lib/editor/editor-config';
import EditorToolbar from '../documents/EditorToolbar';
import { TableBubbleMenu } from './TableBubbleMenu';
import { ImageBubbleMenu } from './ImageBubbleMenu';
// import { CommentsSidebar } from './CommentsSidebar'; // To be implemented later
import { CURSOR_COLORS } from '@/lib/editor/cursor-colors';

// Simple mock store and hooks for this example
function useCurrentUser() {
  return { user: { id: 'user-1', email: 'test@example.com', user_metadata: { full_name: 'Test User' } } };
}

function getCursorColor(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CURSOR_COLORS[Math.abs(hash) % CURSOR_COLORS.length];
}

interface NexusEditorProps {
  documentId: string;
  initialContent?: string;
  readOnly?: boolean;
  collaborative?: boolean;
  pageSize?: 'A4' | 'Letter' | 'A3' | 'Legal';
  onContentChange?: (json: string, html: string) => void;
}

export function NexusEditor({
  documentId,
  initialContent,
  readOnly = false,
  collaborative = true,
  pageSize = 'A4',
  onContentChange,
}: NexusEditorProps) {
  const { user } = useCurrentUser();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<{ id: string; text: string; author: string; date: string }[]>([]);
  const [zoom, setZoom] = useState('100');
  const [isReady, setIsReady] = useState(false);
  const ydocRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<WebrtcProvider | null>(null);
  const persistenceRef = useRef<IndexeddbPersistence | null>(null);

  useEffect(() => {
    if (!collaborative || !user) return;

    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;

    const persistence = new IndexeddbPersistence(`nexus-doc-${documentId}`, ydoc);
    persistenceRef.current = persistence;

    const provider = new WebrtcProvider(`nexus-${documentId}`, ydoc, {
      signaling: ['wss://signaling.yjs.dev'],
      password: documentId,
    });
    providerRef.current = provider;

    persistence.on('synced', () => setIsReady(true));

    return () => {
      provider.destroy();
      persistence.destroy();
      ydoc.destroy();
    };
  }, [documentId, collaborative, user]);

  const editor = useEditor({
    extensions: buildEditorExtensions({
      ydoc: collaborative ? ydocRef.current ?? undefined : undefined,
      userInfo: user ? {
        name: user.user_metadata?.full_name || user.email || 'Anonymous',
        color: getCursorColor(user.id),
      } : undefined,
      placeholder: 'Start writing, or type "/" for a menu of formatting and insert options...',
    }),
    content: initialContent ? JSON.parse(initialContent) : undefined,
    editable: !readOnly,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = JSON.stringify(editor.getJSON());
      const html = editor.getHTML();
      onContentChange?.(json, html);
    },
  });

  const PAGE_SIZES = {
    A4:     { width: 794,  height: 1123 },
    Letter: { width: 816,  height: 1056 },
    A3:     { width: 1123, height: 1587 },
    Legal:  { width: 816,  height: 1344 },
  };
  const page = PAGE_SIZES[pageSize];
  const zoomFactor = parseFloat(zoom) / 100;

  return (
    <div className="flex flex-col h-full bg-[#E8EAED] w-full min-h-screen">
      {!readOnly && editor && (
        <EditorToolbar
          editor={editor}
          documentId={documentId}
          onToggleComments={() => setShowComments(v => !v)}
          onAddComment={() => {
            const id = `comment-${Date.now()}`;
            editor.chain().focus().setMark('comment', { commentId: id }).run();
            setComments(prev => [...prev, { id, text: '', author: user?.user_metadata?.full_name || 'Anonymous', date: new Date().toISOString() }]);
            setShowComments(true);
          }}
          zoom={zoom}
          onZoomChange={(z) => setZoom(z.toString())}
          pageSize={pageSize}
        />
      )}

      <div className="flex-1 overflow-y-auto overflow-x-auto flex justify-center py-8 px-4">
        <div className="flex gap-6 items-start">
          <div
            className="nexus-editor-page bg-white shadow-xl rounded-sm relative"
            style={{
              width: `${page.width * zoomFactor}px`,
              minHeight: `${page.height * zoomFactor}px`,
              padding: `${96 * zoomFactor}px`,
              transform: `scale(${zoomFactor})`,
              transformOrigin: 'top center',
            }}
          >
            <EditorContent
              editor={editor}
              className="prose prose-slate max-w-none focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[200px]"
            />
            {!readOnly && editor && (
              <>
                <TableBubbleMenu editor={editor} />
                <ImageBubbleMenu editor={editor} />
              </>
            )}
          </div>

          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                className="w-80 shrink-0 bg-white shadow-xl rounded-sm p-4 flex flex-col max-h-[80vh] overflow-hidden"
              >
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                  <h3 className="text-sm font-semibold text-slate-800">Comments</h3>
                  <button onClick={() => setShowComments(false)} className="text-slate-400 hover:text-slate-600">×</button>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                  {comments.length === 0 ? (
                    <p className="text-xs text-slate-500 italic text-center py-8">No comments yet. Highlight text and click the comment icon to add one.</p>
                  ) : (
                    comments.map(comment => (
                      <div key={comment.id} className="bg-slate-50 rounded p-3 border border-slate-100">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                            {comment.author[0]}
                          </div>
                          <span className="text-xs font-medium text-slate-700">{comment.author}</span>
                          <span className="text-[10px] text-slate-400 ml-auto">{new Date(comment.date).toLocaleDateString()}</span>
                        </div>
                        <textarea
                          autoFocus={comment.text === ''}
                          className="w-full text-xs p-2 bg-white border border-slate-200 rounded focus:border-blue-400 focus:outline-none resize-none"
                          rows={3}
                          placeholder="Type your comment..."
                          value={comment.text}
                          onChange={e => setComments(comments.map(c => c.id === comment.id ? { ...c, text: e.target.value } : c))}
                        />
                        <div className="flex justify-end mt-2">
                          <button onClick={() => setComments(comments.filter(c => c.id !== comment.id))} className="text-[10px] text-red-500 hover:text-red-700">Delete</button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
