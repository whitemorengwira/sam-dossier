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
import styles from './EditorToolbar.module.css'

interface EditorToolbarProps {
  editorRef?: React.RefObject<HTMLDivElement | null>
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

export default function EditorToolbar({ editorRef, onAddComment }: EditorToolbarProps = {}) {
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())
  const [currentFont, setCurrentFont] = useState('DM Sans')
  const [currentSize, setCurrentSize] = useState('14')
  const [currentStyle, setCurrentStyle] = useState('Normal text')
  const [zoom, setZoom] = useState('100%')
  const [textColour, setTextColour] = useState('#000000')
  const [highlightColour, setHighlightColour] = useState('#ffff00')

  const updateActiveFormats = useCallback(() => {
    const formats = new Set<string>()
    if (document.queryCommandState('bold')) formats.add('bold')
    if (document.queryCommandState('italic')) formats.add('italic')
    if (document.queryCommandState('underline')) formats.add('underline')
    if (document.queryCommandState('strikeThrough')) formats.add('strikeThrough')
    if (document.queryCommandState('justifyLeft')) formats.add('justifyLeft')
    if (document.queryCommandState('justifyCenter')) formats.add('justifyCenter')
    if (document.queryCommandState('justifyRight')) formats.add('justifyRight')
    if (document.queryCommandState('justifyFull')) formats.add('justifyFull')
    if (document.queryCommandState('insertUnorderedList')) formats.add('insertUnorderedList')
    if (document.queryCommandState('insertOrderedList')) formats.add('insertOrderedList')
    setActiveFormats(formats)
  }, [])

  useEffect(() => {
    document.addEventListener('selectionchange', updateActiveFormats)
    return () => document.removeEventListener('selectionchange', updateActiveFormats)
  }, [updateActiveFormats])

  const exec = (command: string, value?: string) => {
    if (editorRef && editorRef.current) {
      editorRef.current.focus()
    }
    document.execCommand(command, false, value)
    updateActiveFormats()
  }

  const isActive = (format: string) => activeFormats.has(format)

  return (
    <div className={styles.toolbar}>
      {/* Undo / Redo / Print / Format */}
      <div className={styles.toolGroup}>
        <button className={styles.toolBtn} onClick={() => exec('undo')} title="Undo">
          <ArrowUUpLeft size={16} />
        </button>
        <button className={styles.toolBtn} onClick={() => exec('redo')} title="Redo">
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
          onChange={(e) => setZoom(e.target.value)}
          title="Zoom"
          style={{ width: 70 }}
        >
          {['50%', '75%', '90%', '100%', '125%', '150%', '200%'].map((z) => (
            <option key={z} value={z}>{z}</option>
          ))}
        </select>
      </div>

      {/* Paragraph styles */}
      <div className={styles.toolGroup}>
        <select
          className={styles.toolSelect}
          value={currentStyle}
          onChange={(e) => {
            setCurrentStyle(e.target.value)
            exec('formatBlock', e.target.value === 'Normal text' ? 'P' : e.target.value)
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
            exec('fontName', e.target.value)
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
            const selection = window.getSelection()
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0)
              const span = document.createElement('span')
              span.style.fontSize = `${e.target.value}px`
              range.surroundContents(span)
            }
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
          onClick={() => exec('bold')}
          title="Bold (Ctrl+B)"
        >
          <TextB size={16} weight="bold" />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive('italic') ? styles.active : ''}`}
          onClick={() => exec('italic')}
          title="Italic (Ctrl+I)"
        >
          <TextItalic size={16} />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive('underline') ? styles.active : ''}`}
          onClick={() => exec('underline')}
          title="Underline (Ctrl+U)"
        >
          <TextUnderline size={16} />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive('strikeThrough') ? styles.active : ''}`}
          onClick={() => exec('strikeThrough')}
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
              exec('foreColor', e.target.value)
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
              exec('hiliteColor', e.target.value)
            }}
            style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
          />
        </div>
      </div>

      {/* Alignment */}
      <div className={styles.toolGroup}>
        <button
          className={`${styles.toolBtn} ${isActive('justifyLeft') ? styles.active : ''}`}
          onClick={() => exec('justifyLeft')}
          title="Align left"
        >
          <TextAlignLeft size={16} />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive('justifyCenter') ? styles.active : ''}`}
          onClick={() => exec('justifyCenter')}
          title="Align centre"
        >
          <TextAlignCenter size={16} />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive('justifyRight') ? styles.active : ''}`}
          onClick={() => exec('justifyRight')}
          title="Align right"
        >
          <TextAlignRight size={16} />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive('justifyFull') ? styles.active : ''}`}
          onClick={() => exec('justifyFull')}
          title="Justify"
        >
          <TextAlignJustify size={16} />
        </button>
      </div>

      {/* Lists & indent */}
      <div className={styles.toolGroup}>
        <button
          className={`${styles.toolBtn} ${isActive('insertChecklist') ? styles.active : ''}`}
          onClick={() => exec('insertUnorderedList')} // Basic fallback for checklist
          title="Checklist"
        >
          <CheckSquareOffset size={16} />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive('insertUnorderedList') ? styles.active : ''}`}
          onClick={() => exec('insertUnorderedList')}
          title="Bullet list"
        >
          <ListBullets size={16} />
        </button>
        <button
          className={`${styles.toolBtn} ${isActive('insertOrderedList') ? styles.active : ''}`}
          onClick={() => exec('insertOrderedList')}
          title="Numbered list"
        >
          <ListNumbers size={16} />
        </button>
        <button className={styles.toolBtn} onClick={() => exec('indent')} title="Increase indent">
          <TextIndent size={16} />
        </button>
        <button className={styles.toolBtn} onClick={() => exec('outdent')} title="Decrease indent">
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
            if (url) exec('createLink', url)
          }}
          title="Insert link"
        >
          <LinkSimple size={16} />
        </button>
        <button className={styles.toolBtn} onClick={onAddComment} title="Add comment">
          <ChatCircle size={16} />
        </button>
        <button className={styles.toolBtn} onClick={() => {
          const url = prompt('Enter image URL:')
          if (url) exec('insertImage', url)
        }} title="Insert image">
          <ImageIcon size={16} />
        </button>
        <button className={styles.toolBtn} onClick={() => exec('insertHorizontalRule')} title="Insert horizontal rule">
          <Minus size={16} />
        </button>
        <button className={styles.toolBtn} onClick={() => exec('removeFormat')} title="Clear formatting">
          <Eraser size={16} />
        </button>
      </div>
    </div>
  )
}
