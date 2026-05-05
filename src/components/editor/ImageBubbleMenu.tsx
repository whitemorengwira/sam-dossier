import React from 'react';
import { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import {
  TextAlignCenter,
  TextIndent,
  ImageSquare,
  CornersOut,
  Stack,
  DropHalfBottom,
  Trash
} from '@phosphor-icons/react';
import { ImageLayout } from '@/lib/editor/extensions/NexusImage';

interface ImageBubbleMenuProps {
  editor: Editor;
}

export function ImageBubbleMenu({ editor }: ImageBubbleMenuProps) {
  if (!editor) return null;

  const isActive = editor.isActive('nexusImage');
  if (!isActive) return null;

  const setFormat = (layout: ImageLayout) => {
    editor.chain().focus().updateImageLayout(layout).run();
  };

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor: e }: any) => e.isActive('nexusImage')}
      className="flex items-center gap-1 p-1 bg-white shadow-lg border border-slate-200 rounded-md"
    >
      <div className="flex items-center px-1 border-r border-slate-200">
        <span className="text-[10px] uppercase font-bold text-slate-400 mr-2">Layout</span>
        <button
          onClick={() => setFormat('inline')}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
          title="Inline with text"
        >
          <TextAlignCenter size={16} />
        </button>
        <button
          onClick={() => setFormat('wrap-left')}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
          title="Wrap Left"
        >
          <TextIndent size={16} />
        </button>
        <button
          onClick={() => setFormat('wrap-right')}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
          title="Wrap Right"
        >
          <TextIndent size={16} mirrored />
        </button>
        <button
          onClick={() => setFormat('top-bottom')}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
          title="Top and Bottom"
        >
          <DropHalfBottom size={16} />
        </button>
      </div>

      <div className="flex items-center px-1">
        <span className="text-[10px] uppercase font-bold text-slate-400 mr-2">Float</span>
        <button
          onClick={() => setFormat('behind-text')}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
          title="Behind Text"
        >
          <Stack size={16} />
        </button>
        <button
          onClick={() => setFormat('in-front-text')}
          className="p-1.5 rounded hover:bg-slate-100 text-slate-600 transition-colors"
          title="In Front of Text"
        >
          <ImageSquare size={16} />
        </button>
      </div>

      <div className="flex items-center px-1 border-l border-slate-200">
        <button
          onClick={() => editor.chain().focus().deleteSelection().run()}
          className="p-1.5 rounded hover:bg-red-50 text-red-600 transition-colors"
          title="Delete Image"
        >
          <Trash size={16} />
        </button>
      </div>
    </BubbleMenu>
  );
}
