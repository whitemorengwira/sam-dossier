// src/lib/editor/editor-config.ts
// Central configuration for the Nexus rich text editor.

import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import CharacterCount from '@tiptap/extension-character-count';
import Color from '@tiptap/extension-color';
import Focus from '@tiptap/extension-focus';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import { NexusImage } from './extensions/NexusImage';
import Link from '@tiptap/extension-link';
import Mention from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { NexusPageBreak } from './extensions/NexusPageBreak';
import { NexusComment } from './extensions/NexusComment';
import { NexusFontSize } from './extensions/NexusFontSize';
import { NexusLineHeight } from './extensions/NexusLineHeight';
import type { Doc as YDoc } from 'yjs';

export interface EditorConfigOptions {
  ydoc?: YDoc;
  userInfo?: {
    name: string;
    color: string;
    avatarUrl?: string;
  };
  placeholder?: string;
  mode?: 'document' | 'comment' | 'minimal';
}

export function buildEditorExtensions(options: EditorConfigOptions = {}) {
  const { ydoc, userInfo, placeholder, mode = 'document' } = options;

  const base = [
    StarterKit.configure({
      // history is disabled when using Y.js, we will handle it separately if needed
      heading: { levels: [1, 2, 3, 4, 5, 6] },
      bulletList: { keepMarks: true, keepAttributes: true },
      orderedList: { keepMarks: true, keepAttributes: true },
    }),
    TextStyle,
    Color.configure({ types: ['textStyle'] }),
    Highlight.configure({ multicolor: true }),
    Underline,
    Subscript,
    Superscript,
    Typography,
    Focus.configure({ className: 'nexus-editor-focused', mode: 'shallowest' }),
    Placeholder.configure({
      placeholder: placeholder ?? 'Start writing, or press "/" for commands...',
      emptyNodeClass: 'nexus-editor-empty',
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'nexus-editor-link',
        rel: 'noopener noreferrer',
      },
      autolink: true,
    }),
    TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
    FontFamily,
    NexusFontSize,
    NexusLineHeight,
    CharacterCount,
  ];

  const documentExtensions = mode === 'document' ? [
    NexusImage,
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    TaskList,
    TaskItem.configure({ nested: true }),
    Mention.configure({
      HTMLAttributes: { class: 'nexus-mention' },
      suggestion: {},
    }),
    NexusPageBreak,
    NexusComment,
  ] : [];

  const collaborationExtensions = ydoc ? [
    Collaboration.configure({ document: ydoc }),
    CollaborationCursor.configure({
      provider: null,
      user: userInfo ?? { name: 'Anonymous', color: '#6EE7B7' },
    }),
  ] : [];

  return [...base, ...documentExtensions, ...collaborationExtensions];
}

export const TOOLBAR_GROUPS = [
  { group: 'history', items: ['undo', 'redo'] },
  { group: 'text-style', items: ['bold', 'italic', 'underline', 'strikethrough', 'code'] },
  { group: 'format', items: ['heading1', 'heading2', 'heading3', 'paragraph', 'blockquote'] },
  { group: 'font', items: ['fontFamily', 'fontSize', 'textColor', 'highlight'] },
  { group: 'align', items: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'] },
  { group: 'lists', items: ['bulletList', 'orderedList', 'taskList'] },
  { group: 'insert', items: ['table', 'image', 'link', 'horizontalRule', 'pageBreak'] },
  { group: 'advanced', items: ['subscript', 'superscript', 'lineHeight', 'comment'] },
] as const;
