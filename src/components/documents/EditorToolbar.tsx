'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  ArrowUUpLeft,
  ArrowUUpRight,
  TextB,
  TextItalic,
  TextUnderline,
  TextStrikethrough,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  TextAlignJustify,
  ListBullets,
  ListNumbers,
  TextIndent,
  TextOutdent,
  LinkSimple,
  Minus,
  Eraser,
  Highlighter,
  TextAa,
  Printer,
  TextAUnderline,
  PaintRoller,
  MagnifyingGlass,
  ChatCircle,
  Image as ImageIcon,
  CheckSquareOffset,
  List,
} from '@phosphor-icons/react'
import { Editor } from '@tiptap/react'
import styles from './EditorToolbar.module.css'

interface EditorToolbarProps {
  editor?: Editor | null
  documentId?: string
  onToggleComments?: () => void
  zoom?: string | number
  onZoomChange?: (zoom: string | number) => void
  pageSize?: string
  onAddComment?: () => void
}

const FONTS = [
  'DM Sans',
  'Arial',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Verdana',
  'Playfair Display',
  'Cormorant Garamond',
]

const FONT_SIZES = ['10', '11', '12', '14', '16', '18', '20', '24', '28', '36', '48']

export default function EditorToolbar({ editor, onToggleComments, zoom = '100%', onZoomChange, onAddComment }: EditorToolbarProps) {
  const [currentFont, setCurrentFont] = useState('DM Sans')
  const [currentSize, setCurrentSize] = useState('14')
  const [currentStyle, setCurrentStyle] = useState('Normal text')
  const [textColour, setTextColour] = useState('#000000')
  const [highlightColour, setHighlightColour] = useState('#ffff00')

  // Update local state when editor changes
  useEffect(() => {
    if (!editor) return

    const updateState = () => {
      if (editor.isActive('heading', { level: 1 })) setCurrentStyle('H1')
      else if (editor.isActive('heading', { level: 2 })) setCurrentStyle('H2')
      else if (editor.isActive('heading', { level: 3 })) setCurrentStyle('H3')
      else if (editor.isActive('heading', { level: 4 })) setCurrentStyle('H4')
      else if (editor.isActive('heading', { level: 5 })) setCurrentStyle('H5')
      else if (editor.isActive('heading', { level: 6 })) setCurrentStyle('H6')
      else setCurrentStyle('Normal text')
    }

    editor.on('transaction', updateState)
    return () => {
      editor.off('transaction', updateState)
    }
  }, [editor])

  if (!editor) {
    return null;
  }

  const isActive = (format: any, options?: any) => editor.isActive(format, options)

  return (
    <div className={styles.toolbar}>
      {/* Undo / Redo / Print / Format */}
      <div className={styles.toolGroup}>
        <button className={styles.toolBtn} onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
          <ArrowUUpLeft size={16} />
        </button>
        <button className={styles.toolBtn} onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
          <ArrowUUpRight size={16} />
        </button>
        <button className={styles.toolBtn} onClick={() => window.print()} title="Print (Ctrl+P)">
          <Printer size={16} />
        </button>
        <button className={styles.toolBtn} onClick={() => {}} title="Spelling and grammar check">
          <TextAUnderline size={16} />
        </button>
        <button className={styles.toolBtn} onClick={() => {}} title="Paint format">
          <PaintRoller size={16} />
        </button>
      </div>

      {/* Zoom */}
      <div className={styles.toolGroup}>
        <select
          className={styles.toolSelect}
          value={zoom}
          onChange={(e) => onZoomChange?.(e.target.value)}
          title="Zoom"
          style={{ width: 70 }}
        >
          {['50', '75', '90', '100', '125', '150', '200'].map((z) => (
            <option key={z} value={z}>{z}%</option>
          ))}
        </select>
      </div>

      {/* Paragraph styles */}
      <div className={styles.toolGroup}>
        <select
          className={styles.toolSelect}
          value={currentStyle}
          onChange={(e) => {
            const val = e.target.value
            setCurrentStyle(val)
            if (val === 'Normal text') {
              editor.chain().focus().setParagraph().run()
            } else {
              const level = parseInt(val.replace('H', '')) as 1|2|3|4|5|6
              editor.chain().focus().toggleHeading({ level }).run()
            }
          }}
          title="Styles"
          style={{ width: 110 }}
        >
          <option value="Normal text">Normal text</option>
          <option value="H1">Heading 1</option>
          <option value="H2">Heading 2</option>
          <option value="H3">Heading 3</option>
          <option value="H4">Heading 4</option>
          <option value="H5">Heading 5</option>
          <option value="H6">Heading 6</option>
        </select>
      </div>

      {/* Font family */}
      <div className={styles.toolGroup}>
        <select
          className={styles.toolSelect}
          value={currentFont}
          onChange={(e) => {
            setCurrentFont(e.target.value)
            editor.chain().focus().setFontFamily(e.target.value).run()
          }}
          title="Font"
        >
          {FONTS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Font size */}
      <div className={styles.toolGroup}>
        <select
          className={styles.toolSelect}
          value={currentSize}
          onChange={(e) => {
            setCurrentSize(e.target.value)
            editor.chain().focus().setFontSize(e.target.value).run()
          }}
          title="Font size"
        >
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Text formatting */}
      <div className={styles.toolGroup}>
        <button
          className={`${styles.toolBtn} ${isActive('bold') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold (Ctrl+B)"
        >
          <TextB size={16} weight="bold" />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive('italic') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic (Ctrl+I)"
        >
          <TextItalic size={16} />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive('underline') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline (Ctrl+U)"
        >
          <TextUnderline size={16} />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive('strike') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strikethrough"
        >
          <TextStrikethrough size={16} />
        </button>

        {/* Text colour */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button
            className={styles.toolBtn}
            onClick={() => {
              const input = document.getElementById('text-colour-input') as HTMLInputElement
              input?.click()
            }}
            title="Text colour"
          >
            <TextAa size={16} style={{ color: textColour }} />
          </button>
          <input
            id="text-colour-input"
            type="color"
            className={styles.colorInput}
            value={textColour}
            onChange={(e) => {
              setTextColour(e.target.value)
              editor.chain().focus().setColor(e.target.value).run()
            }}
            style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
          />
        </div>

        {/* Highlight colour */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button
            className={styles.toolBtn}
            onClick={() => {
              const input = document.getElementById('highlight-colour-input') as HTMLInputElement
              input?.click()
            }}
            title="Highlight colour"
          >
            <Highlighter size={16} style={{ color: highlightColour }} />
          </button>
          <input
            id="highlight-colour-input"
            type="color"
            className={styles.colorInput}
            value={highlightColour}
            onChange={(e) => {
              setHighlightColour(e.target.value)
              editor.chain().focus().toggleHighlight({ color: e.target.value }).run()
            }}
            style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
          />
        </div>
      </div>

      {/* Alignment */}
      <div className={styles.toolGroup}>
        <button
          className={`${styles.toolBtn} ${isActive({ textAlign: 'left' }) ? styles.active : ''}`}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          title="Align left"
        >
          <TextAlignLeft size={16} />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive({ textAlign: 'center' }) ? styles.active : ''}`}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          title="Align centre"
        >
          <TextAlignCenter size={16} />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive({ textAlign: 'right' }) ? styles.active : ''}`}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          title="Align right"
        >
          <TextAlignRight size={16} />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive({ textAlign: 'justify' }) ? styles.active : ''}`}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          title="Justify"
        >
          <TextAlignJustify size={16} />
        </button>
      </div>

      {/* Lists & indent */}
      <div className={styles.toolGroup}>
        <button
          className={`${styles.toolBtn} ${isActive('taskList') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          title="Checklist"
        >
          <CheckSquareOffset size={16} />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive('bulletList') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet list"
        >
          <ListBullets size={16} />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive('orderedList') ? styles.active : ''}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered list"
        >
          <ListNumbers size={16} />
        </button>
        <button className={styles.toolBtn} onClick={() => editor.chain().focus().sinkListItem('listItem').run()} title="Increase indent">
          <TextIndent size={16} />
        </button>
        <button className={styles.toolBtn} onClick={() => editor.chain().focus().liftListItem('listItem').run()} title="Decrease indent">
          <TextOutdent size={16} />
        </button>
      </div>

      <div className={styles.toolGroup}>
        <button className={styles.toolBtn} onClick={() => {}} title="Line & paragraph spacing">
          <List size={16} />
        </button>
      </div>

      {/* Insert */}
      <div className={styles.toolGroup}>
        <button
          className={styles.toolBtn}
          onClick={() => {
            const url = prompt('Enter link URL:')
            if (url) editor.chain().focus().setLink({ href: url }).run()
          }}
          title="Insert link"
        >
          <LinkSimple size={16} />
        </button>
        <button className={styles.toolBtn} onClick={onToggleComments || onAddComment} title="Add comment">
          <ChatCircle size={16} />
        </button>
        <button className={styles.toolBtn} onClick={() => {
          const url = prompt('Enter image URL:')
          if (url) editor.chain().focus().insertNexusImage({ src: url }).run()
        }} title="Insert image">
          <ImageIcon size={16} />
        </button>
        <button className={styles.toolBtn} onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Insert horizontal rule">
          <Minus size={16} />
        </button>
        <button className={styles.toolBtn} onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear formatting">
          <Eraser size={16} />
        </button>
      </div>
    </div>
  )
}
