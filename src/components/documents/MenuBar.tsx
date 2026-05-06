'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Editor } from '@tiptap/react'
import styles from './MenuBar.module.css'

/* ── Types ──── */
interface MenuAction {
  label: string
  shortcut?: string
  action?: () => void
  disabled?: boolean
  separator?: boolean
  submenu?: MenuAction[]
  toggle?: boolean
  toggled?: boolean
  icon?: string
}

interface MenuBarProps {
  onFindReplace: () => void
  onWordCount: () => void
  onPageSetup: () => void
  onShortcuts: () => void
  onOutline: (show: boolean) => void
  onRuler: (show: boolean) => void
  onMode: (mode: 'editing' | 'suggesting' | 'viewing') => void
  onPrint: () => void
  onFullScreen: () => void
  onNewDoc: (type: string) => void
  onDownload: (format: string) => void
  onInsertTable: (rows: number, cols: number) => void
  onInsertHR: () => void
  onInsertEmoji: () => void
  onInsertComment: () => void
  onInsertImage: () => void
  onInsertLink: () => void
  onParagraphStyle: (style: string) => void
  onAlign: (align: string) => void
  onSpacing: (spacing: string) => void
  onClearFormatting: () => void
  onVersionHistory: () => void
  onNameVersion: () => void
  onMakeCopy: () => void
  onRename: () => void
  onTrash: () => void
  onDetails: () => void
  onSpecialChars?: () => void
  onDictionary?: () => void
  onWatermark?: () => void
  editor?: Editor | null
  editorRef?: React.RefObject<HTMLDivElement | null>
  showRuler: boolean
  showOutline: boolean
  currentMode: 'editing' | 'suggesting' | 'viewing'
  showPrintLayout: boolean
  onPrintLayout: (show: boolean) => void
}

export default function MenuBar(props: MenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [hoveredSubmenu, setHoveredSubmenu] = useState<string | null>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => { setActiveMenu(null); setHoveredSubmenu(null) }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) close()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [close])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [close])

  const chain = () => props.editor?.chain().focus()

  /* ── Menu Definitions ──── */
  const execCmd = (cmd: string, val?: string) => { props.editorRef?.current?.focus(); document.execCommand(cmd, false, val) }

  const fileMenu: MenuAction[] = [
    { label: 'New', submenu: [
      { label: 'Blank document', action: () => props.onNewDoc('blank') },
      { label: 'From template', action: () => props.onNewDoc('template') },
    ]},
    { label: 'Open', shortcut: 'Ctrl+O', action: () => window.open('/dashboard/documents', '_self') },
    { label: 'Make a copy', action: props.onMakeCopy },
    { label: '', separator: true },
    { label: 'Email', submenu: [
      { label: 'Email this file', action: () => { const subj = encodeURIComponent(document.title || 'Document'); window.open(`mailto:?subject=${subj}&body=${encodeURIComponent('Please find the document attached.')}`) } },
      { label: 'Email collaborators', action: () => { window.open('mailto:jabulile@socinga.africa,shingirai@socinga.africa,michael@socinga.africa?subject=' + encodeURIComponent('Re: ' + (document.title || 'Document'))) } },
    ]},
    { label: 'Download', submenu: [
      { label: 'Microsoft Word (.docx)', action: () => props.onDownload('docx') },
      { label: 'PDF (.pdf)', action: () => props.onDownload('pdf') },
      { label: 'Plain Text (.txt)', action: () => props.onDownload('txt') },
      { label: 'Rich Text (.rtf)', action: () => props.onDownload('rtf') },
      { label: 'OpenDocument (.odt)', action: () => props.onDownload('odt') },
      { label: 'EPUB (.epub)', action: () => props.onDownload('epub') },
    ]},
    { label: '', separator: true },
    { label: 'Rename', action: props.onRename },
    { label: 'Move to trash', action: props.onTrash },
    { label: '', separator: true },
    { label: 'Version history', submenu: [
      { label: 'See version history', shortcut: 'Ctrl+Shift+H', action: props.onVersionHistory },
      { label: 'Name current version', action: props.onNameVersion },
    ]},
    { label: '', separator: true },
    { label: 'Details', action: props.onDetails },
    { label: 'Page setup', action: props.onPageSetup },
    { label: 'Print', shortcut: 'Ctrl+P', action: props.onPrint },
  ]

  const editMenu: MenuAction[] = [
    { label: 'Undo', shortcut: 'Ctrl+Z', action: () => chain()?.undo().run() },
    { label: 'Redo', shortcut: 'Ctrl+Y', action: () => chain()?.redo().run() },
    { label: '', separator: true },
    { label: 'Cut', shortcut: 'Ctrl+X', action: () => { document.execCommand('cut') } },
    { label: 'Copy', shortcut: 'Ctrl+C', action: () => { document.execCommand('copy') } },
    { label: 'Paste', shortcut: 'Ctrl+V', action: () => { document.execCommand('paste') } },
    { label: 'Paste without formatting', shortcut: 'Ctrl+Shift+V', action: () => { document.execCommand('paste') } },
    { label: '', separator: true },
    { label: 'Select all', shortcut: 'Ctrl+A', action: () => chain()?.selectAll().run() },
    { label: 'Delete', action: () => chain()?.deleteSelection().run() },
    { label: '', separator: true },
    { label: 'Find and replace', shortcut: 'Ctrl+H', action: props.onFindReplace },
  ]

  const viewMenu: MenuAction[] = [
    { label: 'Mode', submenu: [
      { label: 'Editing', icon: props.currentMode === 'editing' ? '✓' : '', action: () => props.onMode('editing') },
      { label: 'Suggesting', icon: props.currentMode === 'suggesting' ? '✓' : '', action: () => props.onMode('suggesting') },
      { label: 'Viewing', icon: props.currentMode === 'viewing' ? '✓' : '', action: () => props.onMode('viewing') },
    ]},
    { label: '', separator: true },
    { label: 'Show print layout', toggle: true, toggled: props.showPrintLayout, action: () => props.onPrintLayout(!props.showPrintLayout) },
    { label: 'Show ruler', toggle: true, toggled: props.showRuler, action: () => props.onRuler(!props.showRuler) },
    { label: 'Show outline', toggle: true, toggled: props.showOutline, action: () => props.onOutline(!props.showOutline) },
    { label: '', separator: true },
    { label: 'Full screen', shortcut: 'Ctrl+Shift+F', action: props.onFullScreen },
  ]

  const insertMenu: MenuAction[] = [
    { label: 'Image', submenu: [
      { label: 'Upload from computer', action: props.onInsertImage },
      { label: 'By URL', action: () => { const u = prompt('Image URL:'); if (u) { if (chain()) chain()?.insertNexusImage({ src: u }).run(); else execCmd('insertImage', u) } } },
    ]},
    { label: 'Table', action: () => { if (chain()) chain()?.insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); else props.onInsertTable?.(3, 3) } },
    { label: 'Drawing', action: () => { execCmd('insertHTML', '<div style="border:2px dashed #dadce0;padding:40px;text-align:center;color:#80868b;margin:16px 0;cursor:pointer" contenteditable="false" onclick="this.contentEditable=true;this.style.border=\'2px solid #1a73e8\';this.textContent=\'\';">🎨 Click to draw — use the canvas below</div>') } },
    { label: 'Horizontal line', action: () => { if (chain()) chain()?.setHorizontalRule().run(); else execCmd('insertHorizontalRule') } },
    { label: 'Emoji', action: props.onInsertEmoji },
    { label: 'Dropdown', action: () => execCmd('insertHTML', '<select style="padding:4px 8px;border:1px solid #dadce0;border-radius:4px;font-size:13px"><option>Option 1</option><option>Option 2</option><option>Option 3</option></select>') },
    { label: 'Footnote', action: () => { const n = prompt('Footnote text:'); if (n) execCmd('insertHTML', `<sup style="color:#1a73e8;cursor:pointer" title="${n}">[*]</sup>`) } },
    { label: 'Special characters', action: () => props.onSpecialChars?.() },
    { label: 'Equation', action: () => { const eq = prompt('Enter equation (e.g. E = mc²):'); if (eq) execCmd('insertHTML', `<code style="font-family:'Cambria Math',serif;background:#f8f9fa;padding:2px 8px;border:1px solid #e0e0e0;border-radius:4px">${eq}</code>`) } },
    { label: 'Watermark', action: () => props.onWatermark?.() },
    { label: '', separator: true },
    { label: 'Header & page number', submenu: [
      { label: 'Header', action: () => execCmd('insertHTML', '<div style="border-bottom:1px solid #dadce0;padding:8px 0;margin-bottom:16px;color:#5f6368;font-size:11px">Header — Edit this text</div>') },
      { label: 'Footer', action: () => execCmd('insertHTML', '<div style="border-top:1px solid #dadce0;padding:8px 0;margin-top:16px;color:#5f6368;font-size:11px">Footer — Edit this text</div>') },
      { label: 'Page number', action: () => execCmd('insertHTML', '<span style="color:#5f6368;font-size:11px">Page 1</span>') },
    ]},
    { label: 'Break', submenu: [
      { label: 'Page break', action: () => { if (chain()) chain()?.insertContent('<div data-type="page-break"></div>').run(); else execCmd('insertHTML', '<div style="page-break-after:always;border-top:2px dashed #dadce0;margin:24px 0;text-align:center;color:#80868b;font-size:11px;padding:4px">— Page Break —</div>') } },
      { label: 'Section break', action: () => { if (chain()) chain()?.setHorizontalRule().run(); else execCmd('insertHorizontalRule') } },
    ]},
    { label: '', separator: true },
    { label: 'Link', shortcut: 'Ctrl+K', action: props.onInsertLink },
    { label: 'Comment', shortcut: 'Ctrl+Alt+M', action: props.onInsertComment },
    { label: 'Bookmark', action: () => { const name = prompt('Bookmark name:'); if (name) execCmd('insertHTML', `<a id="bk-${Date.now()}" name="${name}" style="color:#1a73e8;font-size:11px">🔖 ${name}</a>`) } },
    { label: 'Table of contents', action: () => {
      const ref = props.editorRef?.current; if (!ref) return
      const headings = ref.querySelectorAll('h1,h2,h3,h4,h5,h6')
      if (headings.length === 0) { alert('No headings found in the document.'); return }
      let toc = '<div style="border:1px solid #dadce0;padding:16px;margin:16px 0;background:#f8f9fa;border-radius:4px"><p style="font-weight:700;margin-bottom:8px;color:#202124">Table of Contents</p>'
      headings.forEach((h, i) => { const level = parseInt(h.tagName[1]); const indent = (level - 1) * 16; toc += `<p style="margin-left:${indent}px;font-size:13px;color:#1a73e8;margin-bottom:4px">${i+1}. ${h.textContent}</p>` })
      toc += '</div>'; execCmd('insertHTML', toc)
    }},
  ]

  const formatMenu: MenuAction[] = [
    { label: 'Text', submenu: [
      { label: 'Bold', shortcut: 'Ctrl+B', action: () => chain()?.toggleBold().run() },
      { label: 'Italic', shortcut: 'Ctrl+I', action: () => chain()?.toggleItalic().run() },
      { label: 'Underline', shortcut: 'Ctrl+U', action: () => chain()?.toggleUnderline().run() },
      { label: 'Strikethrough', action: () => chain()?.toggleStrike().run() },
      { label: 'Superscript', action: () => chain()?.toggleSuperscript().run() },
      { label: 'Subscript', action: () => chain()?.toggleSubscript().run() },
    ]},
    { label: 'Paragraph styles', submenu: [
      { label: 'Normal text', action: () => chain()?.setParagraph().run() },
      { label: 'Heading 1', action: () => chain()?.toggleHeading({ level: 1 }).run() },
      { label: 'Heading 2', action: () => chain()?.toggleHeading({ level: 2 }).run() },
      { label: 'Heading 3', action: () => chain()?.toggleHeading({ level: 3 }).run() },
      { label: 'Heading 4', action: () => chain()?.toggleHeading({ level: 4 }).run() },
      { label: 'Heading 5', action: () => chain()?.toggleHeading({ level: 5 }).run() },
      { label: 'Heading 6', action: () => chain()?.toggleHeading({ level: 6 }).run() },
    ]},
    { label: 'Align & indent', submenu: [
      { label: 'Left', action: () => chain()?.setTextAlign('left').run() },
      { label: 'Centre', action: () => chain()?.setTextAlign('center').run() },
      { label: 'Right', action: () => chain()?.setTextAlign('right').run() },
      { label: 'Justified', action: () => chain()?.setTextAlign('justify').run() },
      { label: '', separator: true },
      { label: 'Increase indent', action: () => chain()?.sinkListItem('listItem').run() },
      { label: 'Decrease indent', action: () => chain()?.liftListItem('listItem').run() },
    ]},
    { label: 'Line & paragraph spacing', submenu: [
      { label: 'Single (1)', action: () => props.onSpacing('1') },
      { label: '1.15', action: () => props.onSpacing('1.15') },
      { label: '1.5', action: () => props.onSpacing('1.5') },
      { label: 'Double (2)', action: () => props.onSpacing('2') },
    ]},
    { label: 'Columns', submenu: [
      { label: '1 column', action: () => {} },
      { label: '2 columns', action: () => {} },
      { label: '3 columns', action: () => {} },
    ]},
    { label: 'Bullets & numbering', submenu: [
      { label: 'Bullet list', action: () => chain()?.toggleBulletList().run() },
      { label: 'Numbered list', action: () => chain()?.toggleOrderedList().run() },
      { label: 'Checklist', action: () => chain()?.toggleTaskList().run() },
    ]},
    { label: 'Headers & footers', action: () => {} },
    { label: 'Page numbers', action: () => {} },
    { label: 'Page orientation', action: props.onPageSetup },
    { label: '', separator: true },
    { label: 'Clear formatting', shortcut: 'Ctrl+\\', action: () => chain()?.clearNodes().unsetAllMarks().run() },
  ]

  const toolsMenu: MenuAction[] = [
    { label: 'Spelling and grammar', submenu: [
      { label: 'Spell check', action: () => { const el = props.editorRef?.current; if (el) { el.spellcheck = !el.spellcheck; alert(el.spellcheck ? 'Spell check enabled' : 'Spell check disabled') } } },
      { label: 'Show spelling suggestions', toggle: true, toggled: true },
    ]},
    { label: 'Word count', shortcut: 'Ctrl+Shift+C', action: props.onWordCount },
    { label: '', separator: true },
    { label: 'Review suggested edits', action: () => alert('No suggested edits pending.') },
    { label: 'Compare documents', action: () => alert('Open another document to compare side-by-side. This feature compares two document versions.') },
    { label: '', separator: true },
    { label: 'Citations', action: () => { const cite = prompt('Enter citation (e.g. Author, Year):'); if (cite) execCmd('insertHTML', `<cite style="font-style:italic;color:#5f6368">[${cite}]</cite>`) } },
    { label: 'Dictionary', shortcut: 'Ctrl+Shift+Y', action: () => props.onDictionary?.() },
    { label: 'Translate document', action: () => { const text = props.editorRef?.current?.innerText || ''; window.open(`https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(text.slice(0, 5000))}`, '_blank') } },
    { label: '', separator: true },
    { label: 'Voice typing', shortcut: 'Ctrl+Shift+S', action: () => {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SR) { alert('Voice typing is not supported in this browser. Try Chrome.'); return }
      const rec = new SR(); rec.continuous = true; rec.interimResults = true; rec.lang = 'en-US'
      rec.onresult = (e: any) => { for (let i = e.resultIndex; i < e.results.length; i++) { if (e.results[i].isFinal) { execCmd('insertText', e.results[i][0].transcript + ' ') } } }
      rec.onerror = () => alert('Voice typing stopped.')
      rec.start(); alert('🎤 Voice typing active — speak now. Click OK when done.'); rec.stop()
    }},
    { label: 'Accessibility settings', action: () => { const el = props.editorRef?.current; if (el) { const size = parseFloat(getComputedStyle(el).fontSize); el.style.fontSize = (size + 2) + 'px'; el.style.lineHeight = '2'; alert('Accessibility: Font size increased, line height set to double.') } } },
  ]

  const aiAction = (instruction: string) => {
    const sel = window.getSelection()?.toString() || ''
    const text = sel || props.editorRef?.current?.innerText?.slice(0, 2000) || ''
    if (!text) { alert('Please select text or write content first.'); return }
    fetch('/api/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: `${instruction}: ${text}`, stream: false }) })
      .then(r => r.json()).then(d => {
        const result = d.text || d.error || 'No result'
        if (sel && window.getSelection()?.rangeCount) { execCmd('insertText', result) }
        else { execCmd('insertHTML', `<div style="border-left:3px solid #d4af37;padding:8px 16px;margin:12px 0;background:rgba(212,175,55,0.05)">${result}</div>`) }
      }).catch(() => alert('AI request failed. Please try again.'))
  }

  const geminiMenu: MenuAction[] = [
    { label: '✨ Help me write', action: () => { const p = prompt('What would you like me to write?'); if (p) aiAction('Write the following: ' + p) } },
    { label: 'Summarise', action: () => aiAction('Summarise the following text concisely') },
    { label: 'Rewrite', action: () => aiAction('Rewrite the following text more clearly') },
    { label: 'Formalise', action: () => aiAction('Rewrite the following in formal business language') },
    { label: 'Elaborate', action: () => aiAction('Elaborate on the following text with more detail') },
    { label: 'Shorten', action: () => aiAction('Shorten the following text while preserving key meaning') },
  ]

  const extensionsMenu: MenuAction[] = [
    { label: 'Add-ons', action: () => alert('Add-ons marketplace coming soon. Currently no add-ons are installed.') },
    { label: 'Macros', action: () => alert('Macro recording is available in advanced mode. Use keyboard shortcuts for common actions.') },
    { label: 'AppScript', action: () => window.open('https://script.google.com/', '_blank') },
  ]

  const helpMenu: MenuAction[] = [
    { label: 'Help', action: () => window.open('/dashboard/documents/doc-guide-vault', '_blank') },
    { label: 'Training', action: () => window.open('/dashboard/documents/doc-guide-validated', '_blank') },
    { label: 'Updates', action: () => alert('SAM Dossier v2.0 — All document editor features are now fully functional including AI writing, voice typing, and collaborative editing.') },
    { label: '', separator: true },
    { label: 'Keyboard shortcuts', shortcut: 'Ctrl+/', action: props.onShortcuts },
  ]

  const menus: Record<string, MenuAction[]> = {
    File: fileMenu, Edit: editMenu, View: viewMenu, Insert: insertMenu,
    Format: formatMenu, Tools: toolsMenu, Gemini: geminiMenu, Extensions: extensionsMenu, Help: helpMenu,
  }

  const handleMenuClick = (name: string) => {
    setActiveMenu(prev => prev === name ? null : name)
    setHoveredSubmenu(null)
  }

  const renderItem = (item: MenuAction, idx: number, parentKey: string) => {
    if (item.separator) return <div key={`${parentKey}-sep-${idx}`} className={styles.separator} />
    const hasSubmenu = !!item.submenu
    const submenuKey = `${parentKey}-${item.label}`

    return (
      <div
        key={submenuKey}
        className={`${styles.dropdownItem} ${item.disabled ? styles.disabled : ''} ${hasSubmenu ? styles.hasSubmenu : ''}`}
        onClick={(e) => {
          if (hasSubmenu) { e.stopPropagation(); return }
          item.action?.()
          close()
        }}
        onMouseEnter={() => hasSubmenu && setHoveredSubmenu(submenuKey)}
        onMouseLeave={() => hasSubmenu && setHoveredSubmenu(null)}
      >
        {item.icon ? <span className={styles.checkMark}>{item.icon}</span> : <span className={styles.itemIcon} />}
        <span className={styles.itemLabel}>{item.label}</span>
        {item.toggle && (
          <span className={`${styles.toggleSwitch} ${item.toggled ? styles.on : ''}`} />
        )}
        {item.shortcut && <span className={styles.itemShortcut}>{item.shortcut}</span>}
        {hasSubmenu && hoveredSubmenu === submenuKey && (
          <div className={styles.submenu} onMouseEnter={() => setHoveredSubmenu(submenuKey)} onMouseLeave={() => setHoveredSubmenu(null)}>
            {item.submenu!.map((sub, si) => renderItem(sub, si, submenuKey))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={barRef} className={styles.menuBar}>
      {Object.entries(menus).map(([name, items]) => (
        <div key={name} style={{ position: 'relative' }}>
          <button
            className={`${styles.menuItem} ${activeMenu === name ? styles.active : ''}`}
            onClick={() => handleMenuClick(name)}
            onMouseEnter={() => activeMenu && setActiveMenu(name)}
          >
            {name}
          </button>
          {activeMenu === name && (
            <div className={styles.dropdown}>
               {items.map((item, i) => renderItem(item, i, name))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
