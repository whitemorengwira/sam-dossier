'use client';

import { Editor } from '@tiptap/react';
import { useEffect, useState } from 'react';

interface SlashCommandMenuProps {
  editor: Editor | null;
}

export function SlashCommandMenu({ editor }: SlashCommandMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      const { state } = editor;
      const { selection } = state;
      
      if (selection.empty) {
        const textBefore = state.doc.textBetween(Math.max(0, selection.from - 2), selection.from, '\n');
        if (textBefore.endsWith('/')) {
          const coords = editor.view.coordsAtPos(selection.from);
          setPosition({ top: coords.top + 25, left: coords.left });
          setIsOpen(true);
          return;
        }
      }
      setIsOpen(false);
    };

    editor.on('update', handleUpdate);
    editor.on('selectionUpdate', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
      editor.off('selectionUpdate', handleUpdate);
    };
  }, [editor]);

  if (!isOpen) return null;

  const commands = [
    { label: 'Heading 1', desc: 'Big section heading.', icon: 'H1', action: () => editor?.chain().focus().deleteRange({from: editor.state.selection.from - 1, to: editor.state.selection.from}).toggleHeading({ level: 1 }).run() },
    { label: 'Heading 2', desc: 'Medium section heading.', icon: 'H2', action: () => editor?.chain().focus().deleteRange({from: editor.state.selection.from - 1, to: editor.state.selection.from}).toggleHeading({ level: 2 }).run() },
    { label: 'To-do list', desc: 'Track tasks with a to-do list.', icon: '☑', action: () => editor?.chain().focus().deleteRange({from: editor.state.selection.from - 1, to: editor.state.selection.from}).toggleTaskList().run() },
    { label: 'Image', desc: 'Upload or embed an image.', icon: '🖼', action: () => {
      editor?.chain().focus().deleteRange({from: editor.state.selection.from - 1, to: editor.state.selection.from}).run();
      const url = prompt('Image URL:');
      if (url) editor?.chain().focus().insertContent(`<img src="${url}" />`).run();
    }},
    { label: 'Page Break', desc: 'Force a new page in the document.', icon: '✂', action: () => editor?.chain().focus().deleteRange({from: editor.state.selection.from - 1, to: editor.state.selection.from}).insertContent('<div data-type="page-break"></div>').run() },
  ];

  return (
    <div 
      className="fixed z-50 bg-white rounded-lg shadow-2xl border border-gray-200 w-72 overflow-hidden flex flex-col py-2"
      style={{ top: position.top, left: position.left }}
    >
      <div className="px-3 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Basic blocks</div>
      {commands.map((cmd, i) => (
        <button 
          key={i}
          onClick={cmd.action}
          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 text-left w-full transition-colors"
        >
          <div className="w-10 h-10 rounded border border-gray-200 bg-white flex items-center justify-center text-gray-500 font-bold shrink-0 shadow-sm">
            {cmd.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">{cmd.label}</span>
            <span className="text-xs text-gray-500">{cmd.desc}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
