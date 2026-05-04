'use client'

import { Editor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import {
  Rows,
  Columns,
  Trash,
  Plus,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface TableBubbleMenuProps {
  editor: Editor
}

export function TableBubbleMenu({ editor }: TableBubbleMenuProps) {
  if (!editor) return null

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={({ editor }) => editor.isActive('table')}
      className="flex items-center bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden divide-x divide-gray-100 p-1 gap-1"
    >
      <div className="flex items-center gap-1 px-1">
        <button
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          className="p-1.5 hover:bg-gray-100 text-gray-600 rounded transition-colors flex items-center justify-center relative group"
          title="Add Column Before"
        >
          <Columns size={16} />
          <Plus size={10} className="absolute -top-0.5 -left-0.5 text-emerald-600 font-bold" />
        </button>
        <button
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          className="p-1.5 hover:bg-gray-100 text-gray-600 rounded transition-colors flex items-center justify-center relative group"
          title="Add Column After"
        >
          <Columns size={16} />
          <Plus size={10} className="absolute -top-0.5 -right-0.5 text-emerald-600 font-bold" />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteColumn().run()}
          className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors flex items-center justify-center relative group"
          title="Delete Column"
        >
          <Columns size={16} />
          <Trash size={10} className="absolute -bottom-0.5 -right-0.5 font-bold" />
        </button>
      </div>

      <div className="flex items-center gap-1 px-1">
        <button
          onClick={() => editor.chain().focus().addRowBefore().run()}
          className="p-1.5 hover:bg-gray-100 text-gray-600 rounded transition-colors flex items-center justify-center relative group"
          title="Add Row Before"
        >
          <Rows size={16} />
          <Plus size={10} className="absolute -top-0.5 -left-0.5 text-emerald-600 font-bold" />
        </button>
        <button
          onClick={() => editor.chain().focus().addRowAfter().run()}
          className="p-1.5 hover:bg-gray-100 text-gray-600 rounded transition-colors flex items-center justify-center relative group"
          title="Add Row After"
        >
          <Rows size={16} />
          <Plus size={10} className="absolute -bottom-0.5 -left-0.5 text-emerald-600 font-bold" />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteRow().run()}
          className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors flex items-center justify-center relative group"
          title="Delete Row"
        >
          <Rows size={16} />
          <Trash size={10} className="absolute -bottom-0.5 -right-0.5 font-bold" />
        </button>
      </div>

      <div className="flex items-center px-1">
        <button
          onClick={() => editor.chain().focus().deleteTable().run()}
          className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors flex items-center justify-center"
          title="Delete Table"
        >
          <Trash size={16} />
        </button>
      </div>
    </BubbleMenu>
  )
}
