'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
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
  onShare: () => void
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
  editorRef: React.RefObject<HTMLDivElement | null>
  showRuler: boolean
  showOutline: boolean
  currentMode: 'editing' | 'suggesting' | 'viewing'
  showPrintLayout: boolean
  onPrintLayout: (show: boolean) => void
}

export default function MenuBar(props: MenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [hoveredSubmenu, setHoveredSubmenu] = useState<string | null>(null)
  const [tableHover, setTableHover] = useState({ r: 0, c: 0 })
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

  const exec = (cmd: string, val?: string) => {
    props.editorRef.current?.focus()
    document.execCommand(cmd, false, val)
  }

  /* ── Menu Definitions ──── */
  const fileMenu: MenuAction[] = [
    { label: 'New', submenu: [
      { label: 'Blank document', action: () => props.onNewDoc('blank') },
      { label: 'From template', action: () => props.onNewDoc('template') },
    ]},
    { label: 'Open', shortcut: 'Ctrl+O', action: () => {} },
    { label: 'Make a copy', action: props.onMakeCopy },
    { label: '', separator: true },
    { label: 'Share', action: props.onShare },
    { label: 'Email', submenu: [
      { label: 'Email this file', action: () => {} },
      { label: 'Email collaborators', action: () => {} },
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
    { label: 'Undo', shortcut: 'Ctrl+Z', action: () => exec('undo') },
    { label: 'Redo', shortcut: 'Ctrl+Y', action: () => exec('redo') },
    { label: '', separator: true },
    { label: 'Cut', shortcut: 'Ctrl+X', action: () => exec('cut') },
    { label: 'Copy', shortcut: 'Ctrl+C', action: () => exec('copy') },
    { label: 'Paste', shortcut: 'Ctrl+V', action: () => exec('paste') },
    { label: 'Paste without formatting', shortcut: 'Ctrl+Shift+V', action: () => exec('paste') },
    { label: '', separator: true },
    { label: 'Select all', shortcut: 'Ctrl+A', action: () => exec('selectAll') },
    { label: 'Delete', disabled: true },
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
    { label: 'Focus mode', action: () => {} },
  ]

  const insertMenu: MenuAction[] = [
    { label: 'Image', submenu: [
      { label: 'Upload from computer', action: props.onInsertImage },
      { label: 'By URL', action: () => { const u = prompt('Image URL:'); if (u) exec('insertImage', u) } },
    ]},
    { label: 'Table', action: () => {} },
    { label: 'Horizontal line', action: props.onInsertHR },
    { label: 'Emoji', action: props.onInsertEmoji },
    { label: '', separator: true },
    { label: 'Footnote', action: () => {} },
    { label: 'Special characters', action: () => {} },
    { label: '', separator: true },
    { label: 'Header & page number', submenu: [
      { label: 'Header', action: () => {} },
      { label: 'Footer', action: () => {} },
      { label: 'Page number', action: () => {} },
    ]},
    { label: 'Break', submenu: [
      { label: 'Page break', action: () => exec('insertHTML', '<div style="page-break-after:always"></div><p><br></p>') },
      { label: 'Section break', action: () => exec('insertHTML', '<hr style="border:none;border-top:2px dashed #dadce0;margin:24px 0"/>') },
    ]},
    { label: '', separator: true },
    { label: 'Link', shortcut: 'Ctrl+K', action: props.onInsertLink },
    { label: 'Comment', shortcut: 'Ctrl+Alt+M', action: props.onInsertComment },
    { label: 'Bookmark', action: () => {} },
    { label: 'Table of contents', action: () => {
      const headings = props.editorRef.current?.querySelectorAll('h1,h2,h3,h4,h5,h6')
      if (!headings) return
      let toc = '<div style="padding:16px;border:1px solid #dadce0;margin-bottom:16px"><p style="font-weight:600;margin-bottom:8px">Table of Contents</p>'
      headings.forEach((h, i) => {
        const level = parseInt(h.tagName[1])
        const id = `toc-heading-${i}`
        h.id = id
        toc += `<p style="margin-left:${(level - 1) * 16}px"><a href="#${id}" style="color:#1a73e8">${h.textContent}</a></p>`
      })
      toc += '</div>'
      exec('insertHTML', toc)
    }},
  ]

  const formatMenu: MenuAction[] = [
    { label: 'Text', submenu: [
      { label: 'Bold', shortcut: 'Ctrl+B', action: () => exec('bold') },
      { label: 'Italic', shortcut: 'Ctrl+I', action: () => exec('italic') },
      { label: 'Underline', shortcut: 'Ctrl+U', action: () => exec('underline') },
      { label: 'Strikethrough', action: () => exec('strikeThrough') },
      { label: 'Superscript', action: () => exec('superscript') },
      { label: 'Subscript', action: () => exec('subscript') },
    ]},
    { label: 'Paragraph styles', submenu: [
      { label: 'Normal text', action: () => props.onParagraphStyle('p') },
      { label: 'Title', action: () => props.onParagraphStyle('h1') },
      { label: 'Subtitle', action: () => props.onParagraphStyle('h2') },
      { label: 'Heading 1', action: () => props.onParagraphStyle('h1') },
      { label: 'Heading 2', action: () => props.onParagraphStyle('h2') },
      { label: 'Heading 3', action: () => props.onParagraphStyle('h3') },
      { label: 'Heading 4', action: () => props.onParagraphStyle('h4') },
      { label: 'Heading 5', action: () => props.onParagraphStyle('h5') },
      { label: 'Heading 6', action: () => props.onParagraphStyle('h6') },
    ]},
    { label: '', separator: true },
    { label: 'Align & indent', submenu: [
      { label: 'Left', action: () => props.onAlign('left') },
      { label: 'Centre', action: () => props.onAlign('center') },
      { label: 'Right', action: () => props.onAlign('right') },
      { label: 'Justified', action: () => props.onAlign('justify') },
      { label: '', separator: true },
      { label: 'Increase indent', action: () => exec('indent') },
      { label: 'Decrease indent', action: () => exec('outdent') },
    ]},
    { label: 'Line & paragraph spacing', submenu: [
      { label: 'Single (1)', action: () => props.onSpacing('1') },
      { label: '1.15', action: () => props.onSpacing('1.15') },
      { label: '1.5', action: () => props.onSpacing('1.5') },
      { label: 'Double (2)', action: () => props.onSpacing('2') },
    ]},
    { label: '', separator: true },
    { label: 'Bullets & numbering', submenu: [
      { label: 'Bullet list', action: () => exec('insertUnorderedList') },
      { label: 'Numbered list', action: () => exec('insertOrderedList') },
      { label: 'Checklist', action: () => exec('insertHTML', '<div style="display:flex;gap:8px;align-items:flex-start"><input type="checkbox" style="margin-top:4px"/><span>Item</span></div>') },
    ]},
    { label: 'Columns', submenu: [
      { label: '1 column', action: () => {} },
      { label: '2 columns', action: () => {} },
      { label: '3 columns', action: () => {} },
    ]},
    { label: '', separator: true },
    { label: 'Clear formatting', shortcut: 'Ctrl+\\', action: props.onClearFormatting },
  ]

  const toolsMenu: MenuAction[] = [
    { label: 'Spelling and grammar', submenu: [
      { label: 'Spell check', action: () => {} },
      { label: 'Show spelling suggestions', toggle: true, toggled: true },
    ]},
    { label: 'Word count', shortcut: 'Ctrl+Shift+C', action: props.onWordCount },
    { label: '', separator: true },
    { label: 'Review suggested edits', action: () => {} },
    { label: 'Compare documents', action: () => {} },
    { label: '', separator: true },
    { label: 'Citations', action: () => {} },
    { label: 'Dictionary', shortcut: 'Ctrl+Shift+Y', action: () => {} },
    { label: 'Translate document', action: () => {} },
    { label: '', separator: true },
    { label: 'Voice typing', shortcut: 'Ctrl+Shift+S', action: () => {} },
    { label: 'Explore', action: () => {} },
    { label: 'Preferences', action: () => {} },
    { label: 'Accessibility settings', action: () => {} },
  ]

  const extensionsMenu: MenuAction[] = [
    { label: 'Manage add-ons', action: () => {} },
    { label: 'Get add-ons', action: () => {} },
  ]

  const helpMenu: MenuAction[] = [
    { label: 'Help', action: () => {} },
    { label: 'Search the menus', shortcut: 'Alt+/', action: () => {} },
    { label: 'Keyboard shortcuts', shortcut: 'Ctrl+/', action: props.onShortcuts },
    { label: '', separator: true },
    { label: "What's new", action: () => {} },
  ]

  const menus: Record<string, MenuAction[]> = {
    File: fileMenu, Edit: editMenu, View: viewMenu, Insert: insertMenu,
    Format: formatMenu, Tools: toolsMenu, Extensions: extensionsMenu, Help: helpMenu,
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
