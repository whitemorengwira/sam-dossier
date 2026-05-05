# SAM DOSSIER: Complete Google Docs Functionality Replication Specification
# Part 1 of 6 — Foundation, Preservation Mandate & Home Screen

---

> [!CAUTION]
> ## PRESERVATION MANDATE — DO NOT TOUCH EXISTING FUNCTIONALITY
> 
> The SAM Dossier platform already has significant Google Docs-like functionality implemented and working.
> **ALL existing features that currently function correctly MUST remain untouched.**
> This specification is an ENHANCEMENT document — it defines what needs to be ADDED or REFINED
> on top of the existing working codebase. Under no circumstances should working features be
> removed, rewritten from scratch, or broken during enhancement work.
>
> ### What Is Already Built and Must Be Preserved:
> - Authentication system (email/password with Supabase)
> - Forgot Password flow with email-based reset
> - Lisa AI Assistant (30-year-old African investment analyst persona, voice, portrait)
> - Edit Mode (application-wide inline content editing)
> - Editable sidebar menu titles
> - Document Vault with basic CRUD
> - Board Layer (Monday.com-style views: Timeline, Calendar, Chart, Form)
> - Item Detail Panel for tasks
> - Kanban board workspace
> - Geological Report, Team Profiles, Regulatory Mandates modules
> - 4-Phase Operational Roadmap
> - Dark-luxury aesthetic and overall visual design system
> - Cloudflare deployment infrastructure
> - All existing navigation and routing
>
> ### Enhancement Philosophy:
> Every instruction in this document assumes the developer will:
> 1. First audit the existing codebase for the feature area
> 2. Identify what already works
> 3. Only add/modify what is missing or incomplete
> 4. Run regression checks to ensure nothing breaks

---

## 1. PROJECT CONTEXT & SOURCE ANALYSIS

### 1.1 Source Material Description

This specification is derived from a detailed frame-by-frame analysis of a PNG sequence
(3,300+ frames) capturing a complete walkthrough of Google Docs functionality. The sequence
was extracted from a screen recording titled:
`sam-dossier_master-protocol-md_ScreenRecording2026-05-03233801.mp4`

The recording demonstrates every major feature of Google Docs including:
- Home screen document management (grid view, list view, sorting, filtering)
- Document context menus (Rename, Remove, Open in new tab, Available offline)
- Full document editor with complete toolbar
- All menu bar items (File, Edit, View, Insert, Format, Tools, Gemini, Extensions, Help)
- Text selection, formatting, and real-time editing
- Document tabs and outline sidebar
- Share dialog and collaboration controls
- Side panel integrations (Calendar, Keep, Tasks, Contacts)
- Gemini AI integration
- Comment system
- Smart chips and placeholder chips
- Paint format tool
- Font selection, size adjustment, text/highlight color
- Alignment, lists, indentation controls

### 1.2 Frame Sequence Breakdown

| Frame Range | Content Captured | Duration (approx) |
|---|---|---|
| 0001–0058 | Home screen — document grid view, idle state | ~2s |
| 0059–0085 | Context menu opened on document card (3-dot menu) | ~1s |
| 0086–0113 | Context menu interactions: Rename, Remove, Open in new tab, Available offline toggle | ~1s |
| 0114–0172 | Context menu closed, return to grid view, hover states | ~2s |
| 0173–0202 | Scrolling through document list, more documents visible | ~1s |
| 0203–0257 | Continued scrolling, document thumbnails with metadata | ~2s |
| 0258–0505 | Extended document browsing, grid layout with 5-column grid | ~8s |
| 0506–0530 | Scrolling up, transition states | ~1s |
| 0531–0570 | Document grid with various document types visible | ~1.5s |
| 0571–0629 | Rapid scrolling through many documents | ~2s |
| 0630–0675 | Scrolling continues, new document types visible | ~1.5s |
| 0676–0768 | More scrolling, Socinga Africa documents visible | ~3s |
| 0769–0822 | Transition — leaving home screen | ~2s |
| 0823–0855 | New document created — "SAM DOSSIER" title, blank editor | ~1s |
| 0856–0865 | Editor fully loaded, toolbar visible, blank canvas | ~0.3s |
| 0866–0930 | Document tabs sidebar visible (Tab 1), headings placeholder | ~2s |
| 0931–1000 | Text being typed in editor, "Saving..." indicator | ~2.5s |
| 1001–1024 | More typing, document content growing | ~0.8s |
| 1025–1100 | Toolbar interactions begin | ~2.5s |
| 1101–1132 | Text selection and formatting | ~1s |
| 1133–1200 | File menu opened — full menu visible | ~2.5s |
| 1201–1280 | File menu items explored (New, Open, Make a copy, Share, Email, Download, etc.) | ~2.5s |
| 1281–1325 | Edit menu explored | ~1.5s |
| 1326–1400 | View menu opened (Mode, Comments, Show print layout, Show ruler, Full screen) | ~2.5s |
| 1401–1425 | Format menu explored | ~0.8s |
| 1426–1510 | Insert menu opened (Image, Table, Building blocks, Smart chips, etc.) | ~2.8s |
| 1511–1560 | Insert > Image submenu (Generate, Upload, Search web, Drive, Photos, Camera, URL) | ~1.6s |
| 1561–1600 | Insert > Smart chips submenu (Date, People, File, Calendar event, Place, Placeholder chips, Dropdown) | ~1.3s |
| 1601–1665 | Insert > Smart chips > Placeholder chips submenu | ~2s |
| 1666–1725 | Format menu explored | ~2s |
| 1726–1793 | Tools menu opened (Proofread, Word count, Review suggested edits, Compare documents, Citations, etc.) | ~2.2s |
| 1794–1827 | Tools menu continued (Translate, Voice typing, Audio, Gemini, Notification settings, Preferences, Accessibility) | ~1s |
| 1828–1865 | Extensions menu opened (Add-ons, Apps Script) | ~1.2s |
| 1866–1920 | Help menu explored | ~1.8s |
| 1921–1943 | Return to editor canvas | ~0.7s |
| 1944–2050 | Text selection (Ctrl+A select all), text highlighted in blue | ~3.5s |
| 2051–2120 | Toolbar formatting — Paint format tool, selection context menu (edit, comment, emoji) | ~2.3s |
| 2121–2190 | Font dropdown opened — full font list (Amatic SC, Arial, Caveat, Comfortaa, Comic Sans MS, Courier New, EB Garamond, Georgia, Impact, Lexend, Lobster, Lora, Merriweather, Montserrat, Nunito, Oswald, Pacifico, etc.) | ~2.3s |
| 2191–2250 | Font size adjustment | ~2s |
| 2251–2335 | Bold/Italic/Underline toggling on selected text | ~2.8s |
| 2336–2430 | Text color picker interaction | ~3s |
| 2431–2515 | Highlight color picker interaction | ~2.8s |
| 2516–2610 | Alignment options explored (left, center, right, justify) | ~3s |
| 2611–2700 | Bulleted list and numbered list toggling | ~3s |
| 2701–2770 | Indent increase/decrease | ~2.3s |
| 2771–2845 | Line spacing and paragraph spacing | ~2.5s |
| 2846–2935 | More formatting toolbar exploration | ~3s |
| 2936–3050 | Clear formatting, heading styles (Normal text, H1-H6) | ~3.8s |
| 3051–3150 | Link insertion, image insertion workflows | ~3.3s |
| 3151–3250 | Table insertion and manipulation | ~3.3s |
| 3251–3313 | Share button, comment button, side panel icons | ~2s |

---

## 2. HOME SCREEN (DOCUMENT VAULT) — COMPLETE SPECIFICATION

### 2.1 Overview

The Home Screen serves as the primary document management interface. It is the first screen
users see after authentication. It must replicate the Google Docs home page layout, behavior,
and interaction patterns exactly.

> [!IMPORTANT]
> The existing Document Vault already provides basic document listing. This section specifies
> the exact Google Docs-equivalent enhancements needed on top of what exists.

### 2.2 Top Navigation Bar

#### 2.2.1 Layout Structure
```
┌─────────────────────────────────────────────────────────────────────┐
│ ☰  [Logo] Docs          🔍 Search                    ⊞  👤 Avatar │
└─────────────────────────────────────────────────────────────────────┘
```

#### 2.2.2 Component Specifications

**Hamburger Menu (☰)**
- Position: Far left, 24px from edge
- Size: 48x48px touch target, 24x24px icon
- Color: `#5f6368` (Google gray)
- Hover: `rgba(0,0,0,0.04)` circular background
- Click: Opens navigation drawer (see Section 2.3)
- Transition: 200ms ease background-color

**Application Logo + Title**
- Logo: SAM Dossier branded icon (use existing branding)
- Title text: "Docs" → Replace with "SAM Dossier" or "Dossier"
- Font: Google Sans, 22px, `#5f6368`
- Logo size: 40x40px
- Gap between logo and title: 8px
- Clickable: Returns to home screen from any view

**Search Bar**
- Position: Center of top bar
- Width: 720px max, responsive down to 360px
- Height: 48px
- Background: `#f1f3f4` (Google light gray)
- Border-radius: 8px
- Placeholder text: "Search" in `#5f6368`
- Search icon: 🔍 positioned 16px from left edge, `#5f6368`
- Focus state: White background, `0 1px 3px rgba(0,0,0,0.12)` shadow
- Active state: Bottom border 2px `#1a73e8` (Google blue)
- Keyboard shortcut: `/` to focus search bar
- Search functionality:
  - Real-time filtering as user types
  - Search by document title
  - Search by document content (if indexed)
  - Search by owner name
  - Debounce: 300ms
  - Results appear inline, replacing document grid
  - "No results found" state with illustration

**App Grid Icon (⊞)**
- Position: Right side, before avatar
- Size: 48x48px touch target
- Icon: 3x3 dot grid, `#5f6368`
- Hover: `rgba(0,0,0,0.04)` circular background
- Click: Opens app switcher dropdown
- Dropdown contents: Links to other SAM platform modules

**User Avatar**
- Position: Far right
- Size: 32x32px circular
- Border: None in default state
- Hover: 2px solid `#1a73e8`
- Click: Opens account menu dropdown
- Dropdown: User name, email, Sign Out, Settings
- Default: First letter of user's name on colored background

### 2.3 Template Gallery Section

#### 2.3.1 Visibility
- Collapsible section below the top navigation bar
- Default state: Collapsed (show "Template gallery" link)
- Toggle: Click to expand/collapse
- Animation: 300ms slide-down/slide-up

#### 2.3.2 Template Cards
- Card size: 168x224px
- Grid layout: Horizontal scrollable row
- First card: "Blank" document (+ icon centered)
- Additional cards: Resume, Letter, Report, Project Proposal, Meeting Notes
- Card hover: 2px elevation shadow increase
- Card click: Creates new document from template

### 2.4 Document List Section

#### 2.4.1 Section Header
```
┌─────────────────────────────────────────────────────────────────────┐
│ Recent documents              Owned by anyone ▼   ≡  AZ  📁       │
└─────────────────────────────────────────────────────────────────────┘
```

**Title: "Recent documents"**
- Font: Google Sans, 16px, `#202124`
- Position: Left-aligned
- Weight: 500

**Ownership Filter Dropdown: "Owned by anyone"**
- Position: Right side, before view toggles
- Dropdown options:
  - "Owned by anyone"
  - "Owned by me"
  - "Not owned by me"
- Style: Text button with down-arrow caret
- Font: 14px, `#5f6368`
- Hover: Underline
- Active dropdown: Material Design select menu

**Sort Options (AZ)**
- Icon: A↓Z sort icon
- Click: Toggles sort dropdown
- Sort options:
  - Last opened by me
  - Last modified by me
  - Last modified
  - Title (A-Z / Z-A)
- Active sort: Bold text, checkmark indicator

**View Toggle Icons**
- List view icon (≡): Three horizontal lines
- Grid view icon (⊞): 2x2 square grid
- Active state: `#202124` fill
- Inactive state: `#5f6368` fill
- Toggle: Switches between grid and list layouts
- Transition: 200ms crossfade between views

#### 2.4.2 Grid View Layout

**Grid Configuration**
- Columns: 5 on desktop (>1200px), 4 on tablet (768-1200px), 2 on mobile (<768px)
- Gap: 16px horizontal, 24px vertical
- Max content width: 1280px, centered
- Side padding: 80px on desktop, 24px on mobile

**Document Card Structure**
```
┌───────────────────────────┐
│                           │
│    [Document Thumbnail]   │  ← 168x200px preview area
│                           │
│                           │
├───────────────────────────┤
│ document-name-truncat...  │  ← Title, 14px, truncated with ellipsis
│ W 👤👤  Apr 24, 2026  ⋮  │  ← Metadata row
└───────────────────────────┘
```

**Thumbnail Area**
- Size: Full card width × 200px height
- Background: White
- Content: Miniature document preview (rendered text)
- Border: 1px solid `#e0e0e0`
- Border-radius: 8px (top corners only)
- Hover: Slight scale(1.01), shadow increase

**Document Title**
- Font: 14px, `#202124`
- Weight: 400
- Max lines: 1
- Overflow: Ellipsis truncation
- Padding: 12px horizontal, 8px top

**Metadata Row**
- Height: 32px
- Contents:
  - Document type icon (W for Word/Doc, colored blue/green/etc.)
  - Owner avatar(s): 20x20px circular, max 2 shown
  - Date: "Apr 24, 2026" or "Opened Apr 22, 2026" format
  - Three-dot menu (⋮): Right-aligned
- Font: 12px, `#5f6368`

**Card Selection States**
- Default: 1px solid `#e0e0e0`
- Hover: 1px solid `#d2e3fc`, background `#f8faff`
- Selected: 2px solid `#1a73e8`, background `#e8f0fe`
- Focus (keyboard): 2px solid `#1a73e8` outline

#### 2.4.3 List View Layout

**List Row Structure**
```
┌───────────────────────────────────────────────────────────────────┐
│ [Icon] Document Name                 Owner    Last opened    ⋮   │
└───────────────────────────────────────────────────────────────────┘
```

**Column Definitions**
| Column | Width | Content |
|---|---|---|
| Icon | 36px | Document type icon (colored) |
| Name | flex-grow | Document title, truncated |
| Owner | 200px | Owner name with avatar |
| Last Opened | 160px | Relative or absolute date |
| Actions | 48px | Three-dot menu |

**Row States**
- Default: No background
- Hover: `#f1f3f4` background
- Selected: `#e8f0fe` background
- Alternating: No zebra striping (matches Google Docs)
- Row height: 48px
- Divider: 1px solid `#e0e0e0` between rows

#### 2.4.4 Document Context Menu (Three-Dot Menu)

> [!NOTE]
> This is the popup menu visible in frames 0059-0113 of the PNG sequence.
> It appears when clicking the ⋮ icon on any document card.

**Menu Items (exact order from screenshots)**

| Icon | Label | Action | Shortcut |
|---|---|---|---|
| Tᴛ | Rename | Opens inline rename input | — |
| 🗑 | Remove | Moves document to trash with undo toast | — |
| ↗ | Open in new tab | Opens document in new browser tab | — |
| ✓ | Available offline | Toggle switch — syncs for offline use | — |

**Menu Styling**
- Width: 200px
- Background: White
- Border-radius: 4px
- Shadow: `0 2px 6px rgba(0,0,0,0.15)`
- Item height: 48px
- Item padding: 16px horizontal
- Icon size: 20x20px, `#5f6368`
- Text: 14px, `#202124`
- Hover: `#f1f3f4` background
- Available offline toggle: Material switch, blue when on
- Divider: None between items
- Animation: 100ms scale-in from origin point

**Rename Inline Edit**
- When "Rename" clicked: Menu closes, document title becomes editable input
- Input: Same size as title, auto-focused, text pre-selected
- Confirm: Enter key or click outside
- Cancel: Escape key
- Validation: Non-empty, max 255 characters

**Remove Confirmation**
- When "Remove" clicked: Document immediately hidden from grid
- Toast notification: "Document moved to trash" with "Undo" button
- Undo timeout: 5 seconds
- Toast position: Bottom-left of viewport
- Toast style: Dark background (`#323232`), white text, "UNDO" in blue

### 2.5 Floating Action Button (FAB)

**Position & Style**
- Position: Fixed, bottom-right corner
- Offset: 24px from right, 24px from bottom
- Size: 56x56px
- Shape: Circular
- Background: White with shadow
- Icon: Google-colored "+" (multi-color: blue, red, yellow, green)
- Shadow: `0 2px 8px rgba(0,0,0,0.15)`
- Hover: Shadow increases to `0 4px 12px rgba(0,0,0,0.25)`
- Click: Opens new document creation flow
- Z-index: 1000 (above all content)
- Transition: 200ms all ease

**Extended FAB (hover/focus)**
- Expands to pill shape: "+" icon + "New" text
- Width: ~120px
- Animation: 200ms width expansion

### 2.6 Scroll Behavior

**Infinite Scroll / Pagination**
- Documents load in batches of 20-25
- Loading indicator: Circular spinner at bottom of grid
- Scroll position: Preserved when returning from document editor
- Empty state: Illustration + "No documents" message + "Create" CTA

### 2.7 Responsive Breakpoints

| Breakpoint | Grid Columns | Side Padding | Search Width |
|---|---|---|---|
| >1440px | 5 | 120px | 720px |
| 1200-1440px | 5 | 80px | 600px |
| 768-1200px | 3-4 | 40px | 480px |
| <768px | 2 | 16px | full width |
| <480px | 1 | 12px | full width |

---

## 3. DOCUMENT EDITOR — CORE LAYOUT

### 3.1 Editor Layout Architecture

The document editor is the primary workspace. It must match the exact layout hierarchy
observed in the PNG sequence (frames 823-3313).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ TITLE BAR: [≡][Doc Icon] SAM DOSSIER ★ 💾 ☁ │ 🕐 💬 📺 [Share▼] 👤      │
├─────────────────────────────────────────────────────────────────────────────┤
│ MENU BAR: File  Edit  View  Insert  Format  Tools  Gemini  Extensions Help│
├─────────────────────────────────────────────────────────────────────────────┤
│ TOOLBAR: 🔍 ↩ ↪ 🖨 ✂ │100%▼│Normal text▼│Arial▼│11▼│-│+│B I U│A🎨│≡ ≡ ≡│
├──────────┬──────────────────────────────────────────────────────┬──────────┤
│          │                     RULER                           │          │
│ DOCUMENT │ ┌──────────────────────────────────────────────┐    │  SIDE    │
│ TABS &   │ │                                              │    │  PANEL   │
│ OUTLINE  │ │            EDITING CANVAS                    │    │  ICONS   │
│ SIDEBAR  │ │                                              │    │          │
│          │ │  [Page content area - white canvas]          │    │ 📅 📝    │
│ Tab 1    │ │                                              │    │ ✅ 👤    │
│          │ │                                              │    │          │
│ Headings │ │                                              │    │          │
│ appear   │ │                                              │    │          │
│ here     │ └──────────────────────────────────────────────┘    │          │
│          │              [✦ Gemini prompt button]               │          │
└──────────┴─────────────────────────────────────────────────────┴──────────┘
```

### 3.2 Title Bar

#### 3.2.1 Left Section
- **Document icon**: Blue document icon, 24x24px
- **Document title**: Editable text, click to rename
  - Font: Google Sans, 18px, `#202124`
  - Max width: 400px, truncated with ellipsis if longer
  - Click: Becomes editable input field
  - Blur/Enter: Saves new title
- **Star/Favorite icon (★)**: Toggle, 20x20px
  - Unfavorited: Outline star, `#5f6368`
  - Favorited: Filled star, `#f4b400` (Google yellow)
- **Move icon (📁)**: Folder icon, opens "Move to" dialog
- **Cloud status indicator**:
  - "Saving...": Circular spinner + text
  - "Saved to Drive": Cloud checkmark + text
  - Color: `#5f6368`, 12px

#### 3.2.2 Right Section
- **Version history icon (🕐)**: Clock icon, opens version history panel
- **Comment icon (💬)**: Speech bubble, opens comment thread panel
  - Tooltip: "Show all comments"
- **Video call icon (📺)**: Camera icon, initiates meeting
- **Share button**: Primary action button
  - Background: `#1a73e8` (Google blue)
  - Text: "Share", white, 14px, weight 500
  - Border-radius: 20px (pill shape)
  - Padding: 8px 24px
  - Height: 36px
  - Hover: `#1765cc` background
  - Click: Opens Share dialog (see Section 6)
  - Lock icon dropdown: Arrow next to Share for additional options
- **User avatar**: 32x32px circular

### 3.3 Menu Bar

#### 3.3.1 Menu Items (exact order from frames)
```
File   Edit   View   Insert   Format   Tools   Gemini   Extensions   Help
```

**Menu Bar Styling**
- Background: White
- Height: 32px
- Font: 14px, `#202124`
- Item padding: 8px 12px
- Hover: `#e8f0fe` background, `#202124` text
- Active (menu open): `#d2e3fc` background
- Separator: None between items
- Overflow: Horizontal scroll on narrow screens

---

*End of Part 1. Continued in Part 2.*


# SAM DOSSIER: Complete Google Docs Functionality Replication Specification
# Part 2 of 6 — Menu Bar Dropdown Specifications

---

> [!IMPORTANT]
> All menu specifications below are derived directly from the PNG sequence analysis.
> Existing menus that already work correctly should be preserved.
> Only add missing items or fix broken interactions.

---

## 4. MENU BAR — COMPLETE DROPDOWN SPECIFICATIONS

### 4.1 File Menu

> Observed in frames 1133-1280 of the PNG sequence.

#### 4.1.1 Menu Items

| # | Icon | Label | Shortcut | Submenu | Behavior |
|---|---|---|---|---|---|
| 1 | • | New | — | ▸ | Opens submenu: Document, Spreadsheet, Presentation, Form, Drawing |
| 2 | 📂 | Open | Ctrl+O | — | Opens file picker dialog |
| 3 | 📋 | Make a copy | — | — | Creates duplicate of current document |
| — | — | ─── divider ─── | — | — | — |
| 4 | 👤 | Share | — | ▸ | Opens Share submenu or direct share dialog |
| 5 | ✉ | Email | — | ▸ | Opens Email submenu: Email this file, Email collaborators |
| 6 | ⬇ | Download | — | ▸ | Opens Download submenu (see 4.1.2) |
| — | — | ─── divider ─── | — | — | — |
| 7 | ✏ | Rename | — | — | Activates title rename mode |
| 8 | 📁 | Move | — | — | Opens Move dialog |
| 9 | ➕ | Add shortcut to Drive | — | — | Creates Drive shortcut |
| 10 | 🗑 | Move to trash | — | — | Moves document to trash |
| — | — | ─── divider ─── | — | — | — |
| 11 | 🕐 | Version history | — | ▸ | Opens version history panel |
| 12 | ✓ | Make available offline | — | — | Toggle: enables offline access |
| — | — | ─── divider ─── | — | — | — |
| 13 | ℹ | Details | — | — | Opens document details sidebar |
| 14 | 🔒 | Security limitations | — | — | Opens security settings |
| 15 | 🌐 | Language | — | ▸ | Language selection submenu |
| 16 | 📄 | Page setup | — | — | Opens page setup dialog |
| 17 | 🖨 | Print | Ctrl+P | — | Opens print dialog |

#### 4.1.2 Download Submenu
| Format | Extension |
|---|---|
| Microsoft Word (.docx) | .docx |
| OpenDocument Format (.odt) | .odt |
| Rich Text Format (.rtf) | .rtf |
| PDF Document (.pdf) | .pdf |
| Plain Text (.txt) | .txt |
| Web Page (.html, zipped) | .html |
| EPUB Publication (.epub) | .epub |

#### 4.1.3 Version History Submenu
| Item | Shortcut |
|---|---|
| See version history | Ctrl+Alt+Shift+H |
| Name current version | — |

#### 4.1.4 Menu Styling Specification
- Width: 300px
- Background: White
- Shadow: `0 2px 6px 2px rgba(0,0,0,0.15)`
- Border-radius: 4px
- Item height: 36px
- Padding: 8px 0
- Icon column: 40px wide
- Shortcut column: Right-aligned, `#5f6368`, 12px
- Submenu arrow: `▸` character, right-aligned
- Divider: 1px solid `#e0e0e0`, 8px vertical margin
- Hover state: `#f1f3f4` background
- Disabled items: `#bdc1c6` text color, no hover
- Active submenu: Item highlighted, submenu appears to the right

### 4.2 Edit Menu

#### 4.2.1 Menu Items
| # | Icon | Label | Shortcut | Behavior |
|---|---|---|---|---|
| 1 | ↩ | Undo | Ctrl+Z | Undoes last action |
| 2 | ↪ | Redo | Ctrl+Y | Redoes last undone action |
| — | — | ─── divider ─── | — | — |
| 3 | ✂ | Cut | Ctrl+X | Cuts selected content |
| 4 | 📋 | Copy | Ctrl+C | Copies selected content |
| 5 | 📄 | Paste | Ctrl+V | Pastes clipboard content |
| 6 | — | Paste without formatting | Ctrl+Shift+V | Pastes as plain text |
| — | — | ─── divider ─── | — | — |
| 7 | — | Select all | Ctrl+A | Selects all document content |
| 8 | 🗑 | Delete | — | Deletes selected content |
| — | — | ─── divider ─── | — | — |
| 9 | 🔍 | Find and replace | Ctrl+H | Opens find/replace bar |

### 4.3 View Menu

> Observed in frames 1326-1400 of the PNG sequence.

#### 4.3.1 Menu Items
| # | Icon | Label | Shortcut | Type | Behavior |
|---|---|---|---|---|---|
| 1 | ✏ | Mode | — | ▸ Submenu | Editing / Suggesting / Viewing |
| 2 | 💬 | Comments | — | ▸ Submenu | Show comments panel |
| 3 | ≡ | Collapse tabs & outlines sidebar | Ctrl+Alt+A Ctrl+Alt+H | Toggle | Collapses left sidebar |
| — | — | ─── divider ─── | — | — | — |
| 4 | ✓ | Show print layout | — | Toggle | Shows/hides page breaks |
| 5 | ✓ | Show ruler | — | Toggle | Shows/hides horizontal ruler |
| 6 | — | Show equation toolbar | — | Toggle | Shows math equation tools |
| 7 | — | Show non-printing characters | Ctrl+Shift+P | Toggle | Shows paragraph marks, spaces |
| — | — | ─── divider ─── | — | — | — |
| 8 | ✓ | Show Spelling & Grammar underlines | — | Toggle | Red/blue squiggly underlines |
| — | — | ─── divider ─── | — | — | — |
| 9 | ⛶ | Full screen | — | — | Enters full-screen mode |

#### 4.3.2 Mode Submenu
| Mode | Description | Icon |
|---|---|---|
| Editing | Direct editing mode (default) | ✏ |
| Suggesting | Track changes mode | 💬 |
| Viewing | Read-only mode | 👁 |

#### 4.3.3 Toggle Item Behavior
- Checked items show a ✓ checkmark icon on the left
- Clicking toggles the state
- State persists per document
- "Show print layout" and "Show ruler" are checked by default

### 4.4 Insert Menu

> Observed in frames 1426-1665 of the PNG sequence. This is one of the most complex menus.

#### 4.4.1 Menu Items
| # | Icon | Label | Badge | Submenu | Behavior |
|---|---|---|---|---|---|
| 1 | 🖼 | Image | — | ▸ | Image insertion options |
| 2 | ⊞ | Table | — | ▸ | Table size picker grid |
| 3 | 🧱 | Building blocks | — | ▸ | Templates and pre-built components |
| 4 | ⊕ | Smart chips | — | ▸ | Smart chip types |
| 5 | 🔊 | Audio buttons | `New` | ▸ | Audio recording insertion |
| 6 | 🔗 | Link | Ctrl+K | — | Opens link insertion dialog |
| 7 | 🖌 | Drawing | — | ▸ | Drawing editor |
| 8 | 📊 | Chart | — | ▸ | Chart type selection |
| 9 | 😀 | Symbols | — | ▸ | Special character picker |
| — | — | ─── divider ─── | — | — | — |
| 10 | 📄 | Tab | Shift+F11 | — | Inserts new document tab |
| 11 | — | Horizontal line | — | — | Inserts `<hr>` divider |
| 12 | ⤓ | Break | — | ▸ | Page break / Section break |
| 13 | 🔖 | Bookmark | — | — | Inserts bookmark at cursor |
| 14 | 📄 | Page elements | `Updated` | ▸ | Headers, footers, page numbers |
| — | — | ─── divider ─── | — | — | — |
| 15 | 💬 | Comment | Ctrl+Alt+M | — | Inserts comment at cursor |

#### 4.4.2 Image Submenu
> Observed in frames 1511-1560

| Icon | Label | Badge | Behavior |
|---|---|---|---|
| ✦ | Generate an image | `New` | AI image generation |
| ⬆ | Upload from computer | — | File picker dialog |
| 🔍 | Search the web | — | Web image search panel |
| ☁ | Drive | — | Google Drive file picker |
| 📷 | Photos | — | Google Photos picker |
| 📸 | Camera | — | Webcam capture |
| 🔗 | By URL | — | URL input dialog |

#### 4.4.3 Smart Chips Submenu
> Observed in frames 1561-1665

| Icon | Label | Behavior |
|---|---|---|
| 📅 | Date | Inserts interactive date chip |
| 👤 | People | Inserts person mention chip |
| 📄 | File | Inserts file reference chip |
| 📅 | Calendar event | Inserts calendar event chip |
| 📍 | Place | Inserts location chip |
| ⊕ | Placeholder chips | ▸ Opens Placeholder submenu |
| ▼ | Dropdown | Inserts dropdown selector chip |

#### 4.4.4 Smart Chips > Placeholder Chips Submenu
> Observed in frames 1601-1665

| Icon | Label | Behavior |
|---|---|---|
| 📅 | Date | Date placeholder |
| 👤 | Person | Person placeholder |
| 📄 | File | File placeholder |
| 📅 | Calendar event | Event placeholder |
| 📍 | Place | Location placeholder |

#### 4.4.5 Table Submenu
- Grid picker: Visual grid (max 10×10)
- Hover highlights: Blue cells showing table dimensions
- Footer text: "10 × 10" dimension label
- Click: Inserts table with selected dimensions

#### 4.4.6 Break Submenu
| Label | Behavior |
|---|---|
| Page break | Inserts page break |
| Section break (next page) | New section on next page |
| Section break (continuous) | New section same page |

#### 4.4.7 Badge Styling
- `New` badge: Background `#1a73e8`, white text, 10px font, pill shape, 4px padding
- `Updated` badge: Background `#1a73e8`, white text, same styling

### 4.5 Format Menu

#### 4.5.1 Menu Items
| # | Icon | Label | Shortcut | Submenu |
|---|---|---|---|---|
| 1 | — | Text | — | ▸ Bold, Italic, Underline, Strikethrough, Superscript, Subscript |
| 2 | — | Paragraph styles | — | ▸ Normal text, Title, Subtitle, H1-H6 |
| 3 | — | Align & indent | — | ▸ Left, Center, Right, Justified, Increase/Decrease indent |
| 4 | — | Line & paragraph spacing | — | ▸ Single, 1.15, 1.5, Double, Custom spacing |
| 5 | — | Columns | — | ▸ 1, 2, 3 column layout |
| 6 | — | Bullets & numbering | — | ▸ List styles |
| — | — | ─── divider ─── | — | — |
| 7 | — | Headers & footers | — | ▸ Header, Footer settings |
| 8 | — | Page numbers | — | ▸ Page number options |
| 9 | — | Page orientation | — | ▸ Portrait / Landscape |
| — | — | ─── divider ─── | — | — |
| 10 | — | Table | — | ▸ Table properties |
| 11 | — | Image | — | ▸ Image options |
| — | — | ─── divider ─── | — | — |
| 12 | — | Clear formatting | Ctrl+\ | — |

### 4.6 Tools Menu

> Observed in frames 1726-1827 of the PNG sequence.

#### 4.6.1 Menu Items
| # | Icon | Label | Shortcut | Badge | Behavior |
|---|---|---|---|---|---|
| 1 | ✓ | Proofread | — | — | ▸ Spelling/grammar check |
| 2 | #️ | Word count | Ctrl+Shift+C | — | Opens word count dialog |
| 3 | 📝 | Review suggested edits | Ctrl+Alt+O Ctrl+Alt+U | — | Opens suggestions panel |
| 4 | ⚡ | Compare documents | — | — | Opens compare dialog |
| 5 | " | Citations | — | — | Opens citations sidebar |
| 6 | ≡ | Line numbers | — | — | Toggles line numbers |
| 7 | 🔗 | Linked objects | — | — | Lists linked elements |
| 8 | 📖 | Dictionary | Ctrl+Shift+Y | — | Opens dictionary sidebar |
| — | — | ─── divider ─── | — | — | — |
| 9 | 🌐 | Translate document | — | — | Opens translation dialog |
| 10 | 🎤 | Voice typing | Ctrl+Shift+S | — | Activates voice input |
| 11 | 🔊 | Audio | — | `New` | ▸ Audio options |
| 12 | ✦ | Gemini | — | — | Opens Gemini AI sidebar |
| — | — | ─── divider ─── | — | — | — |
| 13 | 🔔 | Notification settings | — | — | Opens notification preferences |
| 14 | ⚙ | Preferences | — | — | Opens editor preferences |
| 15 | ♿ | Accessibility | — | — | Opens accessibility settings |

### 4.7 Gemini Menu

#### 4.7.1 Menu Items
| # | Label | Behavior |
|---|---|---|
| 1 | Help me write | Opens Gemini sidebar with write prompt |
| 2 | Proofread | AI-powered proofreading |
| 3 | Suggest edits | AI suggests improvements |
| 4 | Generate summary | AI generates document summary |

### 4.8 Extensions Menu

> Observed in frames 2190-2220 of the PNG sequence.

#### 4.8.1 Menu Items
| # | Icon | Label | Submenu | Behavior |
|---|---|---|---|---|
| 1 | ≡ | Add-ons | ▸ | Opens add-ons marketplace |
| 2 | 📜 | Apps Script | — | Opens Apps Script editor |

### 4.9 Help Menu

#### 4.9.1 Menu Items
| # | Label | Behavior |
|---|---|---|
| 1 | Search the menus | Searchable command palette |
| 2 | Help | Opens help documentation |
| 3 | Training | Opens training resources |
| 4 | Updates | Shows recent feature updates |
| 5 | Report a problem | Opens feedback form |
| 6 | Report abuse/copyright | Opens abuse report |
| 7 | Keyboard shortcuts | Opens shortcuts reference dialog |

### 4.10 Menu Interaction Specifications

#### 4.10.1 General Menu Behavior
- **Open trigger**: Click on menu item in menu bar
- **Close trigger**: Click outside, Escape key, or click another menu
- **Menu hover navigation**: When one menu is open, hovering over another menu item opens that menu
- **Keyboard navigation**: Arrow keys Up/Down within menu, Left/Right between menus
- **Submenu delay**: 200ms hover delay before submenu appears
- **Submenu position**: Right-aligned to parent item, with viewport boundary detection
- **Animation**: Fade-in 100ms opacity transition
- **Max height**: Viewport height minus 48px, scrollable if exceeded
- **Focus management**: First item receives focus when menu opens
- **Screen reader**: `role="menu"`, `role="menuitem"`, `aria-expanded`, `aria-haspopup`

#### 4.10.2 Keyboard Shortcuts Global Registry
All keyboard shortcuts must be registered globally and work regardless of focus state:
- Prevent browser default behavior for overridden shortcuts
- Show shortcut hints in menu items (right-aligned, gray text)
- Support both Ctrl (Windows) and Cmd (Mac) modifiers
- Shortcuts should work in editing mode but NOT in dialog/modal focus

---

*End of Part 2. Continued in Part 3.*


# SAM DOSSIER: Complete Google Docs Functionality Replication Specification
# Part 3 of 6 — Toolbar, Text Formatting & Editor Canvas

---

## 5. FORMATTING TOOLBAR — COMPLETE SPECIFICATION

### 5.1 Toolbar Layout

> Observed across frames 856-3313. The toolbar is the primary formatting interface.

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│ 🔍 ↩ ↪ 🖨 ✂ │100%▼│Norm▼│Arial  ▼│-│11│+│B│I│U│A▼│🖍▼│≡▼│⊞│⊞│☰▼│☰▼│↦│↤│✕│🔄│↙│
└───────────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Toolbar Items — Left to Right

#### 5.2.1 Search & Navigation Group

| # | Icon | Tooltip | Behavior |
|---|---|---|---|
| 1 | 🔍 | Search (Ctrl+F) | Opens find bar at top of document |
| 2 | ↩ | Undo (Ctrl+Z) | Undoes last editing action |
| 3 | ↪ | Redo (Ctrl+Y) | Redoes last undone action |
| 4 | 🖨 | Print (Ctrl+P) | Opens print dialog |
| 5 | ✂ | Paint format | Copies formatting from selection, applies to next selection |

**Undo/Redo States**
- Enabled: `#444746` icon color
- Disabled (nothing to undo/redo): `#c4c7c5` icon color, cursor: not-allowed

**Paint Format (Frame Roller) Tool**
> Observed in frames 2051-2120 and frame 2500 showing "Paint format" tooltip

- Single click: Copies formatting, applies once, then deactivates
- Double click: Locks paint format mode (applies repeatedly until Escape)
- Active state: Blue highlight background on icon, cursor changes to paint roller
- Keyboard: Escape to exit paint format mode

#### 5.2.2 Zoom Control

| Component | Specification |
|---|---|
| Current zoom | "100%" text display |
| Dropdown arrow | ▼ next to percentage |
| Dropdown options | 50%, 75%, 90%, 100%, 125%, 150%, 200% |
| Custom zoom | Text input field for custom percentage |
| Fit options | "Fit to width", "Fit to page" |
| Width | 64px |
| Font | 12px, `#202124` |

#### 5.2.3 Styles Dropdown

| Component | Specification |
|---|---|
| Label | "Normal text" (or current style name) |
| Width | 120px |
| Dropdown items | Normal text, Title, Subtitle, Heading 1-6 |
| Item preview | Each item shown in its actual style (H1 large, H2 medium, etc.) |
| Apply | Click item to apply to current selection/paragraph |
| Keyboard | Ctrl+Alt+1 through Ctrl+Alt+6 for headings |

**Style Dropdown Items Detail**
| Style | Font Size | Weight | Preview Text |
|---|---|---|---|
| Normal text | 11pt | 400 | "Normal text" |
| Title | 26pt | 400 | "Title" |
| Subtitle | 15pt | 400 | "Subtitle" (gray) |
| Heading 1 | 20pt | 400 | "Heading 1" |
| Heading 2 | 16pt | 700 | "Heading 2" |
| Heading 3 | 14pt | 700 | "Heading 3" |
| Heading 4 | 12pt | 700 | "Heading 4" |
| Heading 5 | 11pt | 700 | "Heading 5" |
| Heading 6 | 11pt | 700 | "Heading 6" (italic) |

#### 5.2.4 Font Family Dropdown

> Observed in frames 2700-2715 showing the complete font list

| Component | Specification |
|---|---|
| Default | "Arial" |
| Width | 120px |
| Dropdown width | 240px |
| Dropdown max height | 400px (scrollable) |
| "More fonts" link | Top of dropdown, opens font picker dialog |
| Search | Type-ahead search within dropdown |
| Current font | ✓ checkmark indicator |
| Font preview | Each font name rendered in that font |

**Available Fonts (from screenshot analysis)**
```
Amatic SC
Arial ✓ (default)
Caveat          ▸
Comfortaa       ▸
Comic Sans MS
Courier New
EB Garamond     ▸
Georgia
Impact
Lexend          ▸
Lobster
Lora            ▸
Merriweather    ▸
Montserrat      ▸
Nunito          ▸
Oswald          ▸
Pacifico
Playfair Display ▸
Roboto          ▸
Roboto Mono     ▸
Spectral        ▸
Times New Roman
Trebuchet MS
Verdana
```

**Font Weight Submenus (▸ indicator)**
- Fonts with ▸ have weight variants: Light, Regular, Medium, SemiBold, Bold, ExtraBold
- Submenu appears on hover
- Selected weight shown with checkmark

#### 5.2.5 Font Size Control

> Observed in frames 2191-2250

| Component | Specification |
|---|---|
| Decrease button | "−" button, decrements by 1 |
| Size input | Numeric input, 30px wide, current size displayed |
| Increase button | "+" button, increments by 1 |
| Valid range | 1–400 |
| Default | 11 |
| Common sizes | 8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96 |
| Click behavior | Click input to type custom size |
| Dropdown | Clicking input shows common sizes list |

**Size Control Styling**
- Input: 36px wide, centered text, 12px font
- Buttons: 24x24px, `#444746` icon
- Hover: `rgba(0,0,0,0.04)` background
- Active: `rgba(0,0,0,0.08)` background

#### 5.2.6 Text Style Buttons

| # | Icon | Tooltip | Shortcut | Behavior | Active State |
|---|---|---|---|---|---|
| 1 | **B** | Bold | Ctrl+B | Toggles bold | Blue background highlight |
| 2 | *I* | Italic | Ctrl+I | Toggles italic | Blue background highlight |
| 3 | U̲ | Underline | Ctrl+U | Toggles underline | Blue background highlight |

**Button Specifications**
- Size: 28x28px
- Border-radius: 4px
- Default: No background, `#444746` icon
- Hover: `rgba(0,0,0,0.04)` background
- Active (formatting applied): `#d3e3fd` background, `#0b57d0` icon color
- Click feedback: Brief `rgba(0,0,0,0.08)` flash

#### 5.2.7 Text Color Picker

> Observed in frames 2900 showing "Text color" tooltip

| Component | Specification |
|---|---|
| Button | "A" with colored underline bar |
| Default color | Black underline |
| Dropdown trigger | Small ▼ arrow to the right of A |
| Click on A | Applies last-used color |
| Click on ▼ | Opens color picker dropdown |

**Color Picker Dropdown**
```
┌─────────────────────────────┐
│  Text color                 │
├─────────────────────────────┤
│ ○ [Reset to default]        │
│                             │
│ [Color grid - 10×8]         │
│ ██████████                  │
│ ██████████                  │
│ ██████████                  │
│ ██████████                  │
│ ██████████                  │
│ ██████████                  │
│ ██████████                  │
│ ██████████                  │
├─────────────────────────────┤
│ + Custom color              │
└─────────────────────────────┘
```

**Color Grid Specification**
- 10 columns × 8 rows = 80 preset colors
- Row 1: Standard colors (Black, Dark gray 4-1, Gray, Light gray 1-3, White)
- Rows 2-8: Color hues with lightness variations
- Hues: Red, Orange, Yellow, Green, Cyan, Blue, Purple, Magenta, Berry, Red-Orange
- Cell size: 20×20px
- Cell gap: 2px
- Selected: 2px border `#202124`
- Hover: Slight scale(1.1) with tooltip showing color name

**Custom Color Dialog**
- Hex input: `#000000` format
- Color wheel / gradient selector
- RGB inputs: 0-255 for each channel
- Preview swatch: Shows current vs new color
- OK/Cancel buttons

#### 5.2.8 Highlight Color Picker

| Component | Specification |
|---|---|
| Button | Highlighter pen icon with colored underline |
| Default color | Yellow underline |
| Behavior | Same as Text Color but applies background highlight |
| Dropdown | Same grid layout, but with "Highlight color" title |
| None option | "None" to remove highlight |

#### 5.2.9 Alignment Controls

| # | Icon | Tooltip | Shortcut | Behavior |
|---|---|---|---|---|
| 1 | ≡ | Left align | Ctrl+Shift+L | Aligns text to left |
| 2 | ≡ | Center align | Ctrl+Shift+E | Centers text |
| 3 | ≡ | Right align | Ctrl+Shift+R | Aligns text to right |
| 4 | ≡ | Justify | Ctrl+Shift+J | Justifies text |

**Alignment Dropdown**
- Default shows current alignment icon
- Click: Dropdown shows all 4 options
- Active alignment: Blue icon color

#### 5.2.10 Link Button

| Component | Specification |
|---|---|
| Icon | Chain link 🔗 |
| Shortcut | Ctrl+K |
| Click (no selection) | Opens empty link dialog |
| Click (text selected) | Opens link dialog with text pre-filled |

**Link Dialog**
```
┌────────────────────────────────────┐
│ Link                          ✕    │
├────────────────────────────────────┤
│ Text: [Selected text         ]     │
│ Link: [https://              ]     │
│                                    │
│        [Apply]  [Remove]           │
└────────────────────────────────────┘
```

#### 5.2.11 Insert Image Button

| Component | Specification |
|---|---|
| Icon | Image/photo icon |
| Click | Same submenu as Insert > Image |

#### 5.2.12 List Controls

| # | Icon | Tooltip | Behavior |
|---|---|---|---|
| 1 | ☰ | Bulleted list | Toggles bullet list |
| 2 | ☰ | Numbered list menu | Dropdown with number styles |

> Observed in frame 3200 showing "Numbered list menu" tooltip

**Bulleted List Dropdown**
- Default bullet: • (filled circle)
- Options: ○ (hollow circle), ■ (filled square), ▪ (small square)
- Nested levels use different bullet types automatically

**Numbered List Dropdown**
- Default: 1. 2. 3.
- Options: a. b. c., I. II. III., i. ii. iii., A. B. C.
- Nested levels auto-indent and change number style

#### 5.2.13 Indentation Controls

| # | Icon | Tooltip | Shortcut | Behavior |
|---|---|---|---|---|
| 1 | ↦ | Decrease indent | Ctrl+[ | Decreases left indent by 36px |
| 2 | ↤ | Increase indent | Ctrl+] | Increases left indent by 36px |

#### 5.2.14 Clear Formatting

| Component | Specification |
|---|---|
| Icon | T with eraser / strikethrough |
| Shortcut | Ctrl+\ |
| Behavior | Removes all formatting from selection, resets to Normal text |

#### 5.2.15 Additional Toolbar Items (Right Section)

| # | Icon | Tooltip | Behavior |
|---|---|---|---|
| 1 | 🔄 | Editing mode | Dropdown: Editing / Suggesting / Viewing |
| 2 | ↙ | Hide the menus | Collapses toolbar for more editing space |

### 5.3 Toolbar Responsive Behavior

**Desktop (>1200px)**
- Full toolbar visible, all items shown
- Single row layout

**Tablet (768-1200px)**
- Toolbar wraps to two rows OR
- Less-used items moved to overflow menu (⋯)
- Priority items always visible: B, I, U, Font, Size

**Mobile (<768px)**
- Compact toolbar with essential items only
- Expandable: Tap to show full toolbar
- Bottom toolbar option for touch accessibility

---

## 6. TEXT SELECTION & FORMATTING BEHAVIORS

### 6.1 Text Selection

> Observed in frames 2336-2515 and 2500 showing selected text with floating toolbar

#### 6.1.1 Selection Visualization
- Selected text: Blue highlight `#d2e3fc` background
- Selection handles: None (desktop), Blue circles (mobile)
- Multi-line selection: Continuous blue highlight across lines
- Cursor: I-beam (`text`) when hovering over editable text

#### 6.1.2 Selection Methods
| Method | Behavior |
|---|---|
| Click + Drag | Selects character range |
| Double-click | Selects word |
| Triple-click | Selects paragraph |
| Ctrl+A | Selects all document content |
| Shift+Arrow | Extends selection by character/line |
| Ctrl+Shift+Arrow | Extends selection by word |
| Shift+Home/End | Extends selection to line start/end |
| Ctrl+Shift+Home/End | Extends selection to document start/end |

#### 6.1.3 Floating Selection Toolbar
> Observed in frames 2500 and 2900 showing floating icons below selected text

When text is selected, a small floating toolbar appears below the selection:
```
┌─────────────┐
│ ✏ 💬 😀     │
└─────────────┘
```
| Icon | Label | Behavior |
|---|---|---|
| ✏ | Suggest edits | Opens suggestion mode for selection |
| 💬 | Add comment | Opens comment input anchored to selection |
| 😀 | Add emoji reaction | Opens emoji picker |

**Floating Toolbar Specs**
- Position: Below selection, centered horizontally
- Background: White
- Shadow: `0 1px 4px rgba(0,0,0,0.2)`
- Border-radius: 20px (pill)
- Height: 36px
- Icon size: 20x20px
- Gap: 8px between icons
- Animation: Fade-in 150ms when selection is made
- Dismiss: Deselect text or start typing
- Z-index: 500

### 6.2 Real-Time Formatting Application

#### 6.2.1 Formatting Rules
- Formatting applies immediately to selection
- If no selection, formatting applies to next typed characters
- Bold, Italic, Underline are toggles (on/off)
- Font and size changes apply to entire selection
- Color changes apply to entire selection
- Formatting state reflected in toolbar (active buttons highlighted)

#### 6.2.2 Mixed Formatting Detection
- If selection contains mixed formatting:
  - Bold button: Neither active nor inactive (dash state)
  - Font dropdown: Shows empty or "—"
  - Size input: Shows empty or "—"
- Applying formatting to mixed selection normalizes it

---

## 7. DOCUMENT TABS & OUTLINE SIDEBAR

### 7.1 Left Sidebar Structure

> Observed in frames 866-1000 showing the sidebar with Document tabs and headings

```
┌──────────────────────┐
│ ← Back arrow         │
│                      │
│ Document tabs    [+] │
│ ┌──────────────┐     │
│ │ 📄 Tab 1   ⋮ │     │
│ └──────────────┘     │
│                      │
│ Headings you add to  │
│ the document will    │
│ appear here.         │
└──────────────────────┘
```

### 7.2 Component Specifications

**Back Arrow (←)**
- Position: Top-left of sidebar
- Size: 36x36px
- Click: Navigates back to home screen / document list
- Hover: `rgba(0,0,0,0.04)` circular background

**Document Tabs Section**
- Header: "Document tabs" text, 14px, `#202124`
- Add button (+): 24x24px, right of header
  - Click: Adds new tab to document
  - Hover: `rgba(0,0,0,0.04)` circular background

**Tab Item**
- Height: 36px
- Icon: 📄 document icon, 20x20px
- Label: "Tab 1" (or custom name), 14px, `#202124`
- Three-dot menu (⋮): 20x20px, appears on hover
- Active tab: Blue left border, `#e8f0fe` background
- Inactive tab: No background
- Hover: `#f1f3f4` background
- Tab context menu:
  - Rename tab
  - Duplicate tab
  - Delete tab

**Headings Outline**
- Placeholder text (no headings): "Headings you add to the document will appear here."
  - Font: 14px, `#5f6368`, italic
- When headings exist:
  - H1: No indent, 14px, `#202124`
  - H2: 16px indent, 13px, `#5f6368`
  - H3: 32px indent, 12px, `#5f6368`
  - Click: Scrolls document to that heading
  - Active heading: Bold, `#1a73e8` text

### 7.3 Sidebar Toggle
- Toggle shortcut: Ctrl+Alt+A Ctrl+Alt+H
- Collapsed state: Sidebar hidden, document canvas expands to fill space
- Expand trigger: Click collapse/expand icon or keyboard shortcut
- Animation: 200ms slide left/right

---

## 8. RULER

### 8.1 Ruler Specification

```
┌────┬────┬────┬────┬────┬────┬────┬────┐
  1    1    2    3    4    5    6    7
└────┴────┴────┴────┴────┴────┴────┴────┘
  ▼                              ▼
  Left margin                    Right margin
  indent markers                 indent marker
```

**Ruler Dimensions**
- Height: 20px
- Background: `#f8f9fa`
- Tick marks: Minor (0.5in), Major (1in)
- Numbers: At each inch, 10px, `#5f6368`
- Unit: Inches (default), can switch to cm in preferences

**Indent Markers**
- Left indent: Blue ▼ triangle, draggable
- First line indent: Blue ▽ inverted triangle, draggable
- Right indent: Blue ▼ triangle on right side, draggable
- Drag behavior: Snaps to 0.125in increments
- Drag feedback: Blue vertical guide line on canvas

**Tab Stops**
- Click on ruler to add tab stop
- Tab stop indicator: Small blue ⌐ or similar marker
- Types: Left, Center, Right, Decimal
- Double-click tab stop: Opens tab stop options
- Drag tab stop off ruler: Removes it

---

## 9. EDITING CANVAS

### 9.1 Canvas Specification

**Page Dimensions**
- Default: Letter size (8.5" × 11")
- Margins: 1" all sides (default)
- Background: White (`#ffffff`)
- Canvas shadow: `0 0 0 1px #c4c7c5`
- Page gap: 8px gray space between pages
- Canvas area background: `#f8f9fa` (gray behind white page)

**Page Break**
- Visual indicator: Dashed line or gap between pages
- "Page X" indicator: Small label at bottom of each page

**Cursor**
- Type: I-beam for text areas
- Blink rate: 530ms on, 530ms off
- Color: Black (`#000000`)
- Width: 1px

### 9.2 Gemini AI Prompt Button

> Observed at the bottom of the canvas in frames 866+

**Button Specification**
```
┌───────────────────┐
│    ✦ [sparkle]    │
└───────────────────┘
```
- Position: Centered below last line of text on page
- Icon: Gemini sparkle (✦), multi-color gradient
- Size: 24x24px icon in 40x40px touch target
- Background: None (transparent)
- Hover: `rgba(0,0,0,0.04)` circular background
- Click: Opens inline Gemini prompt input
- Tooltip: "Help me write"

**Inline Gemini Prompt**
```
┌──────────────────────────────────────────┐
│ ✦ Help me write...                   ▶  │
└──────────────────────────────────────────┘
```
- Width: 80% of canvas width
- Height: 44px
- Border: 1px solid `#c4c7c5`
- Border-radius: 24px (pill)
- Placeholder: "Help me write..."
- Icon: ✦ Gemini sparkle on left
- Submit: ▶ arrow button on right, or Enter key
- Focus: Blue border `#1a73e8`

---

*End of Part 3. Continued in Part 4.*


# SAM DOSSIER: Complete Google Docs Functionality Replication Specification
# Part 4 of 6 — Share Dialog, Comments, Side Panels & AI Integration

---

## 10. SHARE DIALOG — COMPLETE SPECIFICATION

### 10.1 Share Button Trigger

> The Share button is the primary blue pill button in the title bar right section.

**Trigger Behavior**
- Click "Share" button → Opens Share modal dialog
- Click dropdown arrow next to Share → Shows additional sharing options
- Keyboard shortcut: None (mouse-only interaction)

### 10.2 Share Dialog Layout

```
┌─────────────────────────────────────────────────────────┐
│ Share "SAM DOSSIER"                                  ✕  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Add people, groups, or calendar events                  │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Email/name input field                           ] │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ People with access                                      │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 👤 Owner Name (you)                         Owner   │ │
│ │    owner@email.com                                  │ │
│ ├─────────────────────────────────────────────────────┤ │
│ │ 👤 Collaborator Name                    Editor  ▼   │ │
│ │    collaborator@email.com                           │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ General access                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 🔒 Restricted                                   ▼   │ │
│ │    Only people with access can open with the link   │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [🔗 Copy link]                              [Done]      │
└─────────────────────────────────────────────────────────┘
```

### 10.3 Share Dialog Components

#### 10.3.1 Dialog Header
- Title: `Share "[Document Name]"`, 18px, `#202124`
- Close button (✕): Top-right corner, 36x36px
- Background: White
- Border-radius: 12px
- Shadow: `0 4px 16px rgba(0,0,0,0.25)`
- Width: 512px
- Max height: 80vh (scrollable)
- Overlay: `rgba(0,0,0,0.5)` backdrop

#### 10.3.2 People Input Field
- Placeholder: "Add people, groups, or calendar events"
- Height: 44px
- Border: 1px solid `#dadce0`
- Border-radius: 8px
- Focus: 2px solid `#1a73e8`
- Autocomplete: Shows matching contacts as user types
- Multi-value: Supports adding multiple recipients (chips)
- Chip: Pill-shaped with avatar, name, and ✕ remove button

#### 10.3.3 Permission Role Dropdown
When adding people, a role dropdown appears:

| Role | Description | Icon |
|---|---|---|
| Viewer | Can view document only | 👁 |
| Commenter | Can view and add comments | 💬 |
| Editor | Can edit document content | ✏ |

**Dropdown Styling**
- Width: 120px
- Background: White
- Active item: `#e8f0fe` background
- Hover: `#f1f3f4` background

#### 10.3.4 Message Field
When adding people, an optional message field appears:

- Label: "Message"
- Textarea: 3 rows, full width
- Placeholder: "Add a message (optional)"
- Max length: 500 characters
- Border: 1px solid `#dadce0`

#### 10.3.5 People with Access Section

**Owner Row**
- Avatar: 36x36px circular
- Name: "Owner Name (you)", 14px, `#202124`
- Email: 12px, `#5f6368`
- Role: "Owner" text (not editable)

**Collaborator Row**
- Avatar: 36x36px circular
- Name: 14px, `#202124`
- Email: 12px, `#5f6368`
- Role dropdown: Same as permission role dropdown
- Remove: Hidden until hover, ✕ button or "Remove access" option

#### 10.3.6 General Access Section

**Access Level Dropdown**
| Option | Icon | Description |
|---|---|---|
| Restricted | 🔒 | Only people with access can open with the link |
| Anyone with the link | 🌐 | Anyone on the internet with the link can view/edit |

**When "Anyone with the link" selected:**
- Sub-dropdown appears for role: Viewer, Commenter, Editor
- Warning text about link sharing visibility

#### 10.3.7 Action Buttons

**Copy Link Button**
- Position: Bottom-left
- Icon: 🔗 link icon
- Text: "Copy link"
- Style: Text button (no background)
- Color: `#1a73e8`
- Click: Copies share link to clipboard
- Feedback: "Link copied" toast notification

**Done Button**
- Position: Bottom-right
- Text: "Done"
- Background: `#1a73e8`
- Color: White
- Border-radius: 20px
- Padding: 8px 24px
- Click: Sends invitations and closes dialog

### 10.4 Share Dialog Animations
- Open: Scale from 0.9 to 1.0 + fade in, 200ms
- Close: Scale to 0.9 + fade out, 150ms
- Backdrop: Fade in 200ms

---

## 11. COMMENT SYSTEM — COMPLETE SPECIFICATION

### 11.1 Adding Comments

#### 11.1.1 Comment Entry Points
1. Select text → Floating toolbar → 💬 Comment icon
2. Select text → Right-click → "Comment" in context menu
3. Select text → Ctrl+Alt+M keyboard shortcut
4. Insert menu → Comment
5. Toolbar comment icon (title bar area)

#### 11.1.2 Comment Input Box

```
┌────────────────────────────────────────┐
│ 👤 [Your comment here...           ]  │
│                                        │
│    [@mention]  [😀]                    │
│                        [Cancel] [Post] │
└────────────────────────────────────────┘
```

**Specifications**
- Position: Right side of document, aligned with selected text
- Width: 280px
- Background: White
- Border-radius: 8px
- Shadow: `0 1px 4px rgba(0,0,0,0.2)`
- Input: Auto-expanding textarea, min 2 rows
- Avatar: 28x28px circular, left of input
- @mention: Type @ to trigger people autocomplete
- Emoji: Opens emoji picker
- Cancel: Text button, `#5f6368`
- Post button: `#1a73e8` background, white text, disabled until text entered

### 11.2 Comment Thread Display

```
┌────────────────────────────────────────┐
│ 👤 Author Name           2:30 PM      │
│ This is the comment text that wraps    │
│ across multiple lines if needed.       │
│                                        │
│ [Reply]  [✓ Resolve]  [⋮]             │
├────────────────────────────────────────┤
│ 👤 Reply Author          2:45 PM      │
│ This is a reply to the comment.        │
│                                        │
│ [Reply]                   [⋮]          │
└────────────────────────────────────────┘
```

#### 11.2.1 Comment Thread Components

**Comment Header**
- Avatar: 28x28px circular
- Author name: 13px, `#202124`, weight 500
- Timestamp: 12px, `#5f6368`

**Comment Body**
- Font: 13px, `#202124`
- Line height: 1.4
- Max lines: None (shows full text)
- Links: Rendered as clickable `#1a73e8` links
- @mentions: Rendered as blue pills

**Comment Actions**
| Action | Visibility | Behavior |
|---|---|---|
| Reply | Always visible | Opens reply input below |
| Resolve (✓) | Only on root comment | Marks thread as resolved, hides from view |
| More (⋮) | On hover | Edit comment, Delete comment, Link to comment |

#### 11.2.2 Comment Highlight
- Selected text with comment: Yellow highlight `#fce8b2`
- Hover on comment: Highlight intensifies to `#f4b400`
- Click on highlight: Scrolls to and opens comment thread
- Active comment: Thread expanded, yellow highlight visible

### 11.3 Comment Panel (Show All Comments)

> Triggered by clicking the 💬 icon in title bar (observed in frame 3300 "Show all comments" tooltip)

**Panel Layout**
- Position: Right sidebar, 320px wide
- Header: "Comments" title with ✕ close button
- Filter: All / Open / Resolved
- Sort: Newest first / Oldest first
- Empty state: "No comments yet" with illustration

**Panel Behavior**
- Opens as overlay on right side
- Pushes document canvas to the left
- Shows all comment threads in chronological order
- Click on thread: Scrolls document to commented text
- Resolved comments: Grayed out, collapsible
- Animation: Slide in from right, 200ms

---

## 12. SIDE PANEL INTEGRATION

### 12.1 Side Panel Icons Strip

> Observed on the right edge of the editor in all frames from 866+

```
┌──┐
│📅│  Calendar
├──┤
│📝│  Keep (Notes)
├──┤
│✅│  Tasks
├──┤
│👤│  Contacts
├──┤
│🧩│  Get add-ons
└──┘
```

**Icon Strip Specifications**
- Position: Fixed right edge of viewport
- Width: 48px
- Icon size: 24x24px
- Icon gap: 4px vertical
- Background: `#f8f9fa`
- Border-left: 1px solid `#e0e0e0`
- Icon color: `#5f6368`
- Hover: `rgba(0,0,0,0.04)` circular background
- Active (panel open): `#1a73e8` icon color, `#e8f0fe` background
- Tooltip: Appears on hover, showing panel name
- Z-index: 200

### 12.2 Side Panel Specifications

#### 12.2.1 General Panel Layout
- Width: 360px
- Position: Right side, between document and icon strip
- Background: White
- Border-left: 1px solid `#e0e0e0`
- Header: Panel name + ✕ close button + ↗ open in new window
- Animation: Slide in from right, 200ms
- Only one panel open at a time (clicking another closes current)

#### 12.2.2 Calendar Panel (📅)
- Displays Google Calendar embed
- Shows events for current day/week
- Quick event creation
- Event details on click
- Mini calendar month view
- Event list view below calendar

#### 12.2.3 Keep Panel (📝)
- Displays Google Keep notes
- Create new note inline
- Note cards with title + content preview
- Pin/unpin notes
- Search notes
- Color-coded note cards
- Click note to expand

#### 12.2.4 Tasks Panel (✅)
- Displays Google Tasks
- Create new task inline
- Task checkbox (toggle complete)
- Task lists with headers
- Due date picker
- Sub-tasks (indented)
- Sort by: My order, Date, Starred

#### 12.2.5 Contacts Panel (👤)
- Displays Google Contacts
- Search contacts
- Contact cards with:
  - Avatar (40x40px circular)
  - Name
  - Email
  - Phone
- Quick actions: Email, Call, Chat
- Click for full contact details

### 12.3 SAM Dossier-Specific Side Panel Enhancements

> [!NOTE]
> These are SAM Dossier platform-specific additions that go beyond standard Google Docs.
> They leverage the existing Lisa AI, Board Layer, and module integrations.

#### 12.3.1 Lisa AI Panel (✦)
- Uses existing Lisa AI assistant
- Shows chat history
- Input field at bottom
- Voice input toggle (existing microphone feature)
- Context-aware: Knows current document content
- Actions: Summarize, Proofread, Translate, Generate content

#### 12.3.2 Board Panel (📋)
- Quick view of related Kanban board items
- Task cards from current workspace
- Status updates inline
- Link tasks to document sections

---

## 13. GEMINI AI ASSISTANT — COMPLETE SPECIFICATION

### 13.1 Gemini Integration Points

> [!IMPORTANT]
> The existing Lisa AI assistant provides the AI backend. Gemini-equivalent features
> should be routed through Lisa AI's Cloudflare Workers AI endpoint.
> The UI patterns below replicate Google's Gemini integration in Docs.

#### 13.1.1 Entry Points for AI
1. **Gemini menu item** in menu bar
2. **Tools > Gemini** menu item
3. **✦ Sparkle button** at bottom of page
4. **"Help me write" prompt** inline on canvas
5. **Side panel ✦ icon** (existing Lisa AI)
6. **Right-click > "Help me write"** on selected text

### 13.2 Inline AI Prompt (Canvas Bottom)

**Prompt Input**
```
┌──────────────────────────────────────────────────────────┐
│ ✦  Help me write...                              [▶]    │
└──────────────────────────────────────────────────────────┘
```

- Trigger: Click ✦ sparkle at bottom of page content
- Width: 80% of page width, centered
- Height: 44px (expands with content)
- Border: 1px solid `#c4c7c5`
- Border-radius: 24px
- Background: White
- Placeholder: "Help me write..."
- Submit: ▶ button or Enter key
- Icon: ✦ Gemini sparkle, gradient blue-purple

**Prompt Suggestions (Pre-filled options)**
When activated, shows suggestion chips above the input:
```
┌────────────────────────────────────────────────────────────┐
│ [Create an outline for a policy]  [Summarize this doc]     │
│ [Draft meeting notes]  [Write a business proposal]         │
├────────────────────────────────────────────────────────────┤
│ ✦  Help me write...                               [▶]     │
└────────────────────────────────────────────────────────────┘
```

- Chip style: Pill shape, 1px solid `#dadce0`, 8px 16px padding
- Chip hover: `#f1f3f4` background
- Chip click: Fills prompt input and submits

### 13.3 AI Content Generation Flow

**Step 1: User submits prompt**
- Loading state: Pulsing ✦ icon + "Writing..." text
- Duration: 2-10 seconds typical

**Step 2: Generated content appears**
- Content appears in a bordered preview box on the canvas
- Purple/blue left border indicating AI-generated content
```
┌─────────────────────────────────────────────────────┐
│ ✦ Generated content                                 │
│                                                     │
│ [AI-generated text appears here, formatted as       │
│  it would appear in the document]                   │
│                                                     │
├─────────────────────────────────────────────────────┤
│ [✦ Refine]  [📄 Insert]  [🗑 Discard]  [↻ Retry]  │
└─────────────────────────────────────────────────────┘
```

**Step 3: User actions**
| Action | Behavior |
|---|---|
| Insert | Places generated content at cursor position in document |
| Discard | Removes preview, returns to editing |
| Retry | Re-generates with same prompt |
| Refine | Opens sub-prompt to adjust (shorter, longer, more formal, simpler) |

### 13.4 AI Refine Options

When "Refine" is clicked:
```
┌─────────────────────────────────────┐
│ Refine                              │
│                                     │
│ [Shorter]  [Longer]                 │
│ [More formal]  [More casual]        │
│ [Simpler]  [More detailed]          │
│                                     │
│ Or describe changes:                │
│ ┌─────────────────────────────┐     │
│ │ [Custom refinement input  ] │     │
│ └─────────────────────────────┘     │
│                        [Refine ▶]   │
└─────────────────────────────────────┘
```

### 13.5 AI on Selected Text

When text is selected and AI is invoked:
| Option | Behavior |
|---|---|
| Summarize | Generates a summary of selected text |
| Rewrite | Rewrites selected text with different wording |
| Make shorter | Condenses selected text |
| Make longer | Expands selected text with more detail |
| Change tone | Adjusts formality level |
| Proofread | Checks grammar and suggests corrections |

### 13.6 Gemini Sidebar Panel

**Panel Layout**
- Position: Right sidebar (replaces other side panels)
- Width: 360px
- Header: "✦ Gemini" with ✕ close
- Chat history: Scrollable conversation thread
- Input: Bottom-fixed text area
- Context indicator: "Reading: SAM DOSSIER" showing document awareness

**Chat Messages**
- User messages: Right-aligned, blue background
- AI messages: Left-aligned, white background with ✦ icon
- Code blocks: Monospace with copy button
- Action buttons on AI messages: "Insert at cursor", "Copy", "Retry"

---

*End of Part 4. Continued in Part 5.*


# SAM DOSSIER: Complete Google Docs Functionality Replication Specification
# Part 5 of 6 — Collaboration, Dialogs, Data Models & Backend

---

## 14. REAL-TIME COLLABORATION

### 14.1 Architecture Overview

> [!IMPORTANT]
> Real-time collaboration is the cornerstone of Google Docs parity.
> This must use WebSocket connections for low-latency updates.

**Technology Stack**
- Transport: WebSocket (Supabase Realtime or custom WS server)
- Conflict resolution: Operational Transformation (OT) or CRDT
- Presence: Real-time cursor and user position tracking
- Persistence: Auto-save to Supabase every keystroke batch (debounced 1s)

### 14.2 Presence System

#### 14.2.1 Active Users Display
```
┌──────────────────────────────────────────────────────┐
│                          👤 👤 👤  [Share]  👤       │
│                          ▲ Active collaborator avatars│
└──────────────────────────────────────────────────────┘
```

- Position: Title bar, left of Share button
- Avatar size: 28x28px circular
- Max visible: 3 avatars + "+N" overflow badge
- Each avatar: Unique border color (Google colors: blue, red, green, orange, purple)
- Hover on avatar: Tooltip showing user name
- Click on "+N": Dropdown showing all active users
- Avatar ring: 2px border in assigned user color

#### 14.2.2 Remote Cursor Display
- Each remote user gets a unique cursor color
- Cursor: Colored I-beam with name flag above
```
    ┌────────────┐
    │ User Name  │  ← Name flag (colored background, white text)
    └────────────┘
         |            ← Colored I-beam cursor
```

- Flag: Auto-hides after 3s of no movement, reappears on move
- Flag font: 11px, white text on colored background
- Flag border-radius: 4px
- Cursor color: Matches user's assigned color
- Animation: Smooth interpolation (not teleporting), 100ms transition

#### 14.2.3 Remote Selection Display
- Remote user's text selection shown in their assigned color at 15% opacity
- Does not interfere with local user's selection
- Selection label: Small floating name tag at selection start

### 14.3 Conflict Resolution

#### 14.3.1 Operational Transformation (OT) Rules
| Operation | Priority | Resolution |
|---|---|---|
| Insert + Insert (same position) | Server timestamp | Earlier timestamp wins position |
| Insert + Delete (overlapping) | Insert preserved | Delete adjusts boundaries |
| Delete + Delete (overlapping) | Merge | Combined deletion |
| Format + Format (same range) | Last write wins | Latest timestamp applied |

#### 14.3.2 Offline Editing
- Document continues to be editable offline
- Changes queued in IndexedDB
- On reconnection: OT merge with server state
- Conflict indicator: Yellow bar "Syncing changes..."
- Resolved indicator: Green checkmark "All changes saved"

### 14.4 Auto-Save Behavior

**Save States (as observed in frames)**
| State | Display | Icon |
|---|---|---|
| Editing | Nothing shown | — |
| Saving | "Saving..." | ⟳ spinner |
| Saved | "Saved to Drive" | ☁✓ cloud checkmark |
| Offline | "Available offline" | ☁ cloud with line |
| Error | "Error saving" | ⚠ warning icon |

**Save Triggers**
- Every keystroke (debounced 1 second)
- On blur (tab switch / window unfocus)
- On idle (5 seconds of no activity)
- Manual: Ctrl+S (shows "Saved" confirmation)
- Before close: `beforeunload` event save attempt

---

## 15. FIND & REPLACE DIALOG

### 15.1 Find Bar

**Trigger**: Ctrl+F or Edit > Find and replace

```
┌────────────────────────────────────────────────────────────────┐
│ [Find input                    ] [< >] [1 of 5] [✕] [⋮]     │
└────────────────────────────────────────────────────────────────┘
```

**Components**
| Component | Specification |
|---|---|
| Find input | 280px wide, 36px height, auto-focused |
| Previous (< ) | Navigate to previous match |
| Next (>) | Navigate to next match |
| Match counter | "1 of 5" format, `#5f6368` text |
| Close (✕) | Closes find bar |
| More (⋮) | Opens Find and Replace |

**Match Highlighting**
- Current match: `#f4b400` (yellow) background
- Other matches: `#fff2cc` (light yellow) background
- Scroll: Auto-scrolls to current match
- Counter updates: Real-time as user types

### 15.2 Find & Replace Panel

**Trigger**: Ctrl+H or ⋮ menu in Find bar

```
┌────────────────────────────────────────────────────────┐
│ Find and replace                                   ✕   │
├────────────────────────────────────────────────────────┤
│ Find:     [                           ] [< >] [1 of 5]│
│ Replace:  [                           ]                │
│                                                        │
│ ☐ Match case  ☐ Use regular expressions                │
│                                                        │
│ [Replace] [Replace all]                                │
└────────────────────────────────────────────────────────┘
```

**Specifications**
- Width: 400px
- Position: Top-right of editor
- Background: White
- Shadow: `0 2px 8px rgba(0,0,0,0.15)`
- Border-radius: 8px
- Inputs: Full width, 36px height
- Replace button: Replaces current match
- Replace all: Replaces all matches with confirmation count toast
- Match case: Checkbox toggle
- Regex: Checkbox toggle for regular expression matching

---

## 16. PAGE SETUP DIALOG

### 16.1 Dialog Layout

**Trigger**: File > Page setup

```
┌────────────────────────────────────────────────────────┐
│ Page setup                                         ✕   │
├────────────────────────────────────────────────────────┤
│                                                        │
│ Orientation:  ◉ Portrait   ○ Landscape                 │
│                                                        │
│ Paper size:   [Letter (8.5" x 11")        ▼]          │
│                                                        │
│ Margins (inches):                                      │
│   Top:    [1    ]     Bottom: [1    ]                   │
│   Left:   [1    ]     Right:  [1    ]                   │
│                                                        │
│ Page color: [White ■ ▼]                                │
│                                                        │
│ [Set as default]              [Cancel] [OK]            │
└────────────────────────────────────────────────────────┘
```

**Paper Size Options**
| Size | Dimensions |
|---|---|
| Letter | 8.5" × 11" |
| Tabloid | 11" × 17" |
| Legal | 8.5" × 14" |
| Statement | 5.5" × 8.5" |
| Executive | 7.25" × 10.5" |
| Folio | 8.5" × 13" |
| A3 | 11.69" × 16.54" |
| A4 | 8.27" × 11.69" |
| A5 | 5.83" × 8.27" |
| B4 | 9.84" × 13.90" |
| B5 | 6.93" × 9.84" |

---

## 17. PRINT DIALOG

### 17.1 Specification

**Trigger**: Ctrl+P or File > Print

**Behavior**
- Opens browser's native print dialog
- Before opening: Generates print-optimized view
- Print layout respects:
  - Page margins from Page Setup
  - Page breaks (manual and automatic)
  - Headers and footers
  - Page numbers
  - Images at print resolution
- Background colors/images: Optional (browser setting)

---

## 18. VERSION HISTORY

### 18.1 Version History Panel

**Trigger**: File > Version history > See version history (Ctrl+Alt+Shift+H)

```
┌────────────────────────────────────────────────┐
│ Version history                            ✕   │
├────────────────────────────────────────────────┤
│                                                │
│ ▼ May 3, 2026                                  │
│   ┌──────────────────────────────────────┐     │
│   │ Current version                      │     │
│   │ 👤 Owner Name                        │     │
│   │ 2:30 PM                              │     │
│   └──────────────────────────────────────┘     │
│   ┌──────────────────────────────────────┐     │
│   │ 👤 Editor Name                       │     │
│   │ 1:15 PM                              │     │
│   └──────────────────────────────────────┘     │
│                                                │
│ ▼ May 2, 2026                                  │
│   ┌──────────────────────────────────────┐     │
│   │ "Initial draft" (named)              │     │
│   │ 👤 Owner Name                        │     │
│   │ 4:00 PM                              │     │
│   └──────────────────────────────────────┘     │
│                                                │
│ [Restore this version]                         │
└────────────────────────────────────────────────┘
```

**Specifications**
- Position: Right sidebar, full height
- Width: 320px
- Document canvas shows diff: Green = additions, Red/Strikethrough = deletions
- Each user's changes in their assigned color
- Named versions: Bold title, user can name any version
- Restore: Reverts document to selected version
- Current version: Highlighted with blue background

---

## 19. OFFLINE MODE

### 19.1 Specification

**Enable**: File > Make available offline (or document card context menu toggle)

**Behavior**
- Uses Service Worker + IndexedDB for local caching
- Caches: Document content, fonts, images, application shell
- Offline indicator: Cloud icon with line through it in title bar
- Editing: Full editing capability while offline
- Sync: Automatic sync when connection restored
- Conflict: OT merge (see Section 14.3)
- Storage: Per-document, user can select which docs to cache
- Max cache: Configurable, default 100MB

---

## 20. KEYBOARD SHORTCUTS — COMPLETE REGISTRY

### 20.1 Text Formatting Shortcuts

| Shortcut | Action |
|---|---|
| Ctrl+B | Bold |
| Ctrl+I | Italic |
| Ctrl+U | Underline |
| Alt+Shift+5 | Strikethrough |
| Ctrl+. | Superscript |
| Ctrl+, | Subscript |
| Ctrl+\ | Clear formatting |
| Ctrl+Shift+V | Paste without formatting |

### 20.2 Paragraph Formatting Shortcuts

| Shortcut | Action |
|---|---|
| Ctrl+Shift+L | Left align |
| Ctrl+Shift+E | Center align |
| Ctrl+Shift+R | Right align |
| Ctrl+Shift+J | Justify |
| Ctrl+] | Increase indent |
| Ctrl+[ | Decrease indent |
| Ctrl+Shift+7 | Numbered list |
| Ctrl+Shift+8 | Bulleted list |

### 20.3 Heading Shortcuts

| Shortcut | Action |
|---|---|
| Ctrl+Alt+0 | Normal text |
| Ctrl+Alt+1 | Heading 1 |
| Ctrl+Alt+2 | Heading 2 |
| Ctrl+Alt+3 | Heading 3 |
| Ctrl+Alt+4 | Heading 4 |
| Ctrl+Alt+5 | Heading 5 |
| Ctrl+Alt+6 | Heading 6 |

### 20.4 Navigation & Selection Shortcuts

| Shortcut | Action |
|---|---|
| Ctrl+F | Find |
| Ctrl+H | Find and replace |
| Ctrl+A | Select all |
| Home | Go to line start |
| End | Go to line end |
| Ctrl+Home | Go to document start |
| Ctrl+End | Go to document end |

### 20.5 Document Operations

| Shortcut | Action |
|---|---|
| Ctrl+S | Save (force save) |
| Ctrl+P | Print |
| Ctrl+Z | Undo |
| Ctrl+Y | Redo |
| Ctrl+K | Insert link |
| Ctrl+Alt+M | Insert comment |
| Ctrl+Shift+C | Word count |
| Shift+F11 | Insert new tab |

---

## 21. DATA MODELS — SUPABASE SCHEMA

### 21.1 Documents Table

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL DEFAULT 'Untitled document',
  content JSONB NOT NULL DEFAULT '{}',
  content_text TEXT DEFAULT '',
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Document metadata
  document_type TEXT DEFAULT 'document',
  template_id UUID REFERENCES templates(id),
  parent_folder_id UUID REFERENCES folders(id),
  
  -- State
  is_trashed BOOLEAN DEFAULT false,
  is_starred BOOLEAN DEFAULT false,
  is_offline_enabled BOOLEAN DEFAULT false,
  
  -- Page setup
  page_orientation TEXT DEFAULT 'portrait',
  page_size TEXT DEFAULT 'letter',
  margin_top NUMERIC DEFAULT 1.0,
  margin_bottom NUMERIC DEFAULT 1.0,
  margin_left NUMERIC DEFAULT 1.0,
  margin_right NUMERIC DEFAULT 1.0,
  page_color TEXT DEFAULT '#ffffff',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_opened_at TIMESTAMPTZ DEFAULT now(),
  last_opened_by UUID REFERENCES auth.users(id),
  
  -- Access
  general_access TEXT DEFAULT 'restricted',
  general_access_role TEXT DEFAULT 'viewer'
);

CREATE INDEX idx_documents_owner ON documents(owner_id);
CREATE INDEX idx_documents_updated ON documents(updated_at DESC);
CREATE INDEX idx_documents_trashed ON documents(is_trashed);
```

### 21.2 Document Tabs Table

```sql
CREATE TABLE document_tabs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  tab_name TEXT NOT NULL DEFAULT 'Tab 1',
  tab_order INTEGER NOT NULL DEFAULT 0,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_doc_tabs_document ON document_tabs(document_id);
```

### 21.3 Document Versions Table

```sql
CREATE TABLE document_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  version_name TEXT,
  content JSONB NOT NULL,
  content_text TEXT DEFAULT '',
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_versions_document ON document_versions(document_id);
CREATE INDEX idx_versions_created ON document_versions(created_at DESC);
```

### 21.4 Document Shares Table

```sql
CREATE TABLE document_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('viewer', 'commenter', 'editor')),
  invited_by UUID REFERENCES auth.users(id),
  message TEXT,
  accepted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(document_id, email)
);

CREATE INDEX idx_shares_document ON document_shares(document_id);
CREATE INDEX idx_shares_user ON document_shares(user_id);
```

### 21.5 Comments Table

```sql
CREATE TABLE document_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES document_comments(id),
  author_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  
  -- Anchor position in document
  anchor_start INTEGER,
  anchor_end INTEGER,
  anchor_text TEXT,
  
  -- State
  is_resolved BOOLEAN DEFAULT false,
  resolved_by UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_comments_document ON document_comments(document_id);
CREATE INDEX idx_comments_parent ON document_comments(parent_comment_id);
```

### 21.6 Folders Table

```sql
CREATE TABLE folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  parent_folder_id UUID REFERENCES folders(id),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### 21.7 Templates Table

```sql
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  category TEXT DEFAULT 'general',
  is_system BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

*End of Part 5. Continued in Part 6.*


# SAM DOSSIER: Complete Google Docs Functionality Replication Specification
# Part 6 of 6 — API Endpoints, Implementation Guidance & Roadmap

---

## 22. API ENDPOINTS

### 22.1 Document CRUD

| Method | Endpoint | Body | Response | Description |
|---|---|---|---|---|
| GET | /api/documents | — | Document[] | List user's documents |
| GET | /api/documents/:id | — | Document | Get single document |
| POST | /api/documents | `{title, template_id?}` | Document | Create new document |
| PATCH | /api/documents/:id | `{title?, content?, ...}` | Document | Update document |
| DELETE | /api/documents/:id | — | 204 | Trash document |
| POST | /api/documents/:id/copy | — | Document | Duplicate document |
| POST | /api/documents/:id/move | `{folder_id}` | Document | Move to folder |

**Query Parameters for GET /api/documents**
| Param | Type | Description |
|---|---|---|
| q | string | Search query (title, content) |
| owner | string | Filter: "me", "anyone", "not-me" |
| sort | string | "last_opened", "last_modified", "title" |
| order | string | "asc", "desc" |
| trashed | boolean | Include trashed documents |
| starred | boolean | Filter starred only |
| limit | number | Pagination limit (default 25) |
| offset | number | Pagination offset |

### 22.2 Document Sharing

| Method | Endpoint | Body | Response |
|---|---|---|---|
| GET | /api/documents/:id/shares | — | Share[] |
| POST | /api/documents/:id/shares | `{email, role, message?}` | Share |
| PATCH | /api/documents/:id/shares/:shareId | `{role}` | Share |
| DELETE | /api/documents/:id/shares/:shareId | — | 204 |
| PATCH | /api/documents/:id/access | `{general_access, role}` | Document |
| GET | /api/documents/:id/link | — | `{url}` |

### 22.3 Comments

| Method | Endpoint | Body | Response |
|---|---|---|---|
| GET | /api/documents/:id/comments | — | Comment[] |
| POST | /api/documents/:id/comments | `{content, anchor_start, anchor_end, anchor_text, parent_comment_id?}` | Comment |
| PATCH | /api/documents/:id/comments/:commentId | `{content?}` | Comment |
| DELETE | /api/documents/:id/comments/:commentId | — | 204 |
| POST | /api/documents/:id/comments/:commentId/resolve | — | Comment |
| POST | /api/documents/:id/comments/:commentId/reopen | — | Comment |

### 22.4 Version History

| Method | Endpoint | Body | Response |
|---|---|---|---|
| GET | /api/documents/:id/versions | — | Version[] |
| GET | /api/documents/:id/versions/:versionId | — | Version |
| POST | /api/documents/:id/versions | `{version_name?}` | Version |
| POST | /api/documents/:id/versions/:versionId/restore | — | Document |

### 22.5 Document Tabs

| Method | Endpoint | Body | Response |
|---|---|---|---|
| GET | /api/documents/:id/tabs | — | Tab[] |
| POST | /api/documents/:id/tabs | `{tab_name}` | Tab |
| PATCH | /api/documents/:id/tabs/:tabId | `{tab_name?, content?, tab_order?}` | Tab |
| DELETE | /api/documents/:id/tabs/:tabId | — | 204 |

### 22.6 Templates

| Method | Endpoint | Body | Response |
|---|---|---|---|
| GET | /api/templates | — | Template[] |
| GET | /api/templates/:id | — | Template |

### 22.7 AI / Lisa Integration

| Method | Endpoint | Body | Response |
|---|---|---|---|
| POST | /api/ai/generate | `{prompt, context?, document_id?}` | `{content, type}` |
| POST | /api/ai/proofread | `{text, language?}` | `{corrections[]}` |
| POST | /api/ai/summarize | `{text}` | `{summary}` |
| POST | /api/ai/rewrite | `{text, style?, tone?}` | `{content}` |
| POST | /api/ai/translate | `{text, target_language}` | `{translation}` |

### 22.8 File Operations

| Method | Endpoint | Body | Response |
|---|---|---|---|
| POST | /api/documents/:id/download | `{format}` | Binary file |
| POST | /api/documents/:id/upload | FormData (file) | Document |
| POST | /api/documents/:id/email | `{to[], subject, message}` | 200 |
| POST | /api/documents/:id/print | — | Print-optimized HTML |

**Download Format Options**
| Format Param | Content-Type | Extension |
|---|---|---|
| docx | application/vnd.openxmlformats... | .docx |
| pdf | application/pdf | .pdf |
| odt | application/vnd.oasis... | .odt |
| rtf | application/rtf | .rtf |
| txt | text/plain | .txt |
| html | application/zip | .html.zip |
| epub | application/epub+zip | .epub |

### 22.9 WebSocket Events

**Client → Server Events**
| Event | Payload | Description |
|---|---|---|
| join_document | `{document_id, user_id}` | Join document editing session |
| leave_document | `{document_id, user_id}` | Leave document editing session |
| operation | `{document_id, ops[]}` | Send editing operations |
| cursor_move | `{document_id, position, user_id}` | Update cursor position |
| selection_change | `{document_id, start, end, user_id}` | Update selection range |

**Server → Client Events**
| Event | Payload | Description |
|---|---|---|
| user_joined | `{user_id, user_name, color}` | New collaborator joined |
| user_left | `{user_id}` | Collaborator left |
| remote_operation | `{user_id, ops[]}` | Remote editing operations |
| remote_cursor | `{user_id, position}` | Remote cursor position |
| remote_selection | `{user_id, start, end}` | Remote selection range |
| document_saved | `{version_id, timestamp}` | Document saved confirmation |

---

## 23. RICH TEXT EDITOR IMPLEMENTATION

### 23.1 Editor Library

> [!IMPORTANT]
> Use TipTap (ProseMirror-based) as the rich text editor engine.
> It provides the extensibility needed for Google Docs-level feature parity.

**Recommended Stack**
| Component | Technology |
|---|---|
| Editor core | TipTap v2 (ProseMirror) |
| Collaboration | Y.js (CRDT) + y-prosemirror |
| WebSocket | Hocuspocus (TipTap collaboration server) OR Supabase Realtime |
| Storage | Supabase (PostgreSQL JSONB for document content) |

### 23.2 TipTap Extensions Required

#### 23.2.1 Core Extensions
```javascript
// Required TipTap extensions for Google Docs parity
const extensions = [
  // Basic
  StarterKit,           // Bold, Italic, Strike, Code, etc.
  Underline,            // Ctrl+U
  Subscript,            // Ctrl+,
  Superscript,          // Ctrl+.
  
  // Text styling
  TextStyle,            // Base for color/font extensions
  Color,                // Text color
  Highlight,            // Highlight/background color
  FontFamily,           // Font selection
  FontSize,             // Custom font size extension
  
  // Structure
  Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
  BulletList,
  OrderedList,
  ListItem,
  TaskList,             // Checkbox lists
  TaskItem,
  Table.configure({ resizable: true }),
  TableRow,
  TableHeader,
  TableCell,
  
  // Media
  Image.configure({ inline: true, allowBase64: true }),
  Link.configure({ openOnClick: false }),
  HorizontalRule,
  
  // Layout
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Indent,               // Custom indent extension
  
  // Collaboration
  Collaboration,        // Y.js sync
  CollaborationCursor,  // Remote cursors
  
  // Utility
  Placeholder,          // "Start typing..." placeholder
  CharacterCount,       // Word/character counter
  History,              // Undo/Redo (replaced by Y.js in collab mode)
  Dropcursor,           // Drag-and-drop cursor
  Gapcursor,            // Gap cursor between blocks
  
  // Advanced
  Comment,              // Custom comment marks
  SmartChip,            // Custom smart chip nodes
  PageBreak,            // Custom page break node
  Bookmark,             // Custom bookmark node
  TabNode,              // Custom document tab management
];
```

#### 23.2.2 Custom Extensions to Build

**Smart Chips Extension**
```javascript
// Node type: inline
// Attributes: type (date, person, file, event, place), value, display
// Rendering: Pill-shaped chip with icon and text
// Interaction: Click to edit, hover for preview
```

**Comment Mark Extension**
```javascript
// Mark type: comment
// Attributes: commentId, author, resolved
// Rendering: Yellow highlight on marked text
// Interaction: Click to show comment thread
```

**Page Break Extension**
```javascript
// Node type: block
// Rendering: Dashed line with "Page break" label
// Insertion: Insert > Break > Page break
// Behavior: Forces new page in print layout
```

### 23.3 Document Content Schema

```json
{
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "attrs": {
        "textAlign": "left",
        "indent": 0,
        "lineSpacing": 1.15
      },
      "content": [
        {
          "type": "text",
          "text": "Hello world",
          "marks": [
            { "type": "bold" },
            { "type": "textStyle", "attrs": { "color": "#1a73e8", "fontFamily": "Arial", "fontSize": "12pt" } }
          ]
        }
      ]
    }
  ]
}
```

---

## 24. ACCESSIBILITY REQUIREMENTS (WCAG 2.1 AA)

### 24.1 General Requirements

| Requirement | Specification |
|---|---|
| Keyboard navigation | All features accessible via keyboard |
| Screen reader | Full ARIA labels on all interactive elements |
| Focus indicators | Visible 2px outline on focused elements |
| Color contrast | Minimum 4.5:1 for normal text, 3:1 for large text |
| Text scaling | Supports up to 200% browser zoom |
| Motion | Respect `prefers-reduced-motion` media query |
| Language | `lang` attribute on html element |
| Alt text | Required for all images |

### 24.2 ARIA Roles

| Component | Role |
|---|---|
| Menu bar | `role="menubar"` |
| Menu items | `role="menuitem"` |
| Toolbar | `role="toolbar"` |
| Toolbar buttons | `role="button"` with `aria-pressed` for toggles |
| Editor | `role="textbox"` with `aria-multiline="true"` |
| Sidebar | `role="complementary"` |
| Dialog | `role="dialog"` with `aria-modal="true"` |
| Comment thread | `role="article"` |
| Tab list | `role="tablist"` with `role="tab"` children |

---

## 25. PERFORMANCE REQUIREMENTS

### 25.1 Performance Targets

| Metric | Target | Measurement |
|---|---|---|
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Time to Interactive | < 3.5s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| First Input Delay | < 100ms | Lighthouse |
| Editor load time | < 2s | Custom metric |
| Keystroke latency | < 50ms | Custom metric |
| Collaboration sync | < 200ms | Custom metric |
| Document save | < 1s | Custom metric |
| Search results | < 500ms | Custom metric |

### 25.2 Optimization Strategies

| Strategy | Implementation |
|---|---|
| Code splitting | Dynamic imports for menu contents, dialogs |
| Lazy loading | Side panels loaded on first open |
| Virtual scrolling | Document list uses virtual scroll for 100+ docs |
| Debouncing | Search (300ms), auto-save (1s), resize (100ms) |
| Memoization | Toolbar state, formatting computations |
| Web Workers | Spell check, word count, search indexing |
| CDN | Static assets served from Cloudflare CDN |
| Caching | Service Worker for app shell + document cache |

---

## 26. SECURITY REQUIREMENTS

### 26.1 Security Specifications

| Requirement | Implementation |
|---|---|
| Authentication | Supabase Auth (existing) — email/password |
| Authorization | Row Level Security (RLS) on all tables |
| Data encryption | TLS 1.3 in transit, AES-256 at rest (Supabase default) |
| XSS prevention | Sanitize all user-generated HTML content |
| CSRF protection | Token-based CSRF protection on all mutations |
| Rate limiting | API endpoints: 100 req/min per user |
| Input validation | Server-side validation on all inputs |
| Content Security Policy | Strict CSP headers |
| Share link security | UUID-based links (not sequential IDs) |

### 26.2 RLS Policies

```sql
-- Documents: User can read their own and shared documents
CREATE POLICY "Users can view own documents" ON documents
  FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "Users can view shared documents" ON documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM document_shares
      WHERE document_shares.document_id = documents.id
      AND document_shares.user_id = auth.uid()
    )
  );

-- Documents: User can update own documents or documents shared as editor
CREATE POLICY "Users can update own documents" ON documents
  FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Editors can update shared documents" ON documents
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM document_shares
      WHERE document_shares.document_id = documents.id
      AND document_shares.user_id = auth.uid()
      AND document_shares.role = 'editor'
    )
  );

-- Comments: Anyone with access can read comments
CREATE POLICY "Users can read comments on accessible docs" ON document_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_comments.document_id
      AND (
        documents.owner_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM document_shares
          WHERE document_shares.document_id = documents.id
          AND document_shares.user_id = auth.uid()
        )
      )
    )
  );

-- Comments: Commenters and editors can create comments
CREATE POLICY "Commenters can create comments" ON document_comments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM document_shares
      WHERE document_shares.document_id = document_comments.document_id
      AND document_shares.user_id = auth.uid()
      AND document_shares.role IN ('commenter', 'editor')
    )
    OR EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_comments.document_id
      AND documents.owner_id = auth.uid()
    )
  );
```

---

## 27. TESTING STRATEGY

### 27.1 Test Coverage Requirements

| Test Type | Coverage Target | Tools |
|---|---|---|
| Unit tests | 80% code coverage | Vitest / Jest |
| Integration tests | All API endpoints | Vitest + Supertest |
| E2E tests | Critical user flows | Playwright |
| Accessibility tests | All interactive components | axe-core |
| Performance tests | Core Web Vitals | Lighthouse CI |
| Visual regression | Key pages/components | Percy / Chromatic |

### 27.2 Critical E2E Test Scenarios

| # | Scenario | Steps |
|---|---|---|
| 1 | Create document | Login → Click FAB → Verify editor opens → Type text → Verify auto-save |
| 2 | Format text | Open doc → Select text → Apply bold → Verify bold applied |
| 3 | Share document | Open doc → Click Share → Enter email → Set role → Click Done |
| 4 | Add comment | Open doc → Select text → Add comment → Verify thread appears |
| 5 | Version history | Open doc → Edit → Open version history → Restore version |
| 6 | Offline mode | Enable offline → Go offline → Edit → Go online → Verify sync |
| 7 | Collaboration | User A types → User B sees update in < 500ms |
| 8 | Menu navigation | Open each menu → Verify all items present → Execute items |
| 9 | Document management | Create → Rename → Star → Move → Trash → Restore |
| 10 | AI integration | Select text → Invoke AI → Generate content → Insert |

---

## 28. IMPLEMENTATION ROADMAP

### Phase 1: Core Editor Enhancement (Weeks 1-3)
> Priority: CRITICAL

- [ ] Audit existing Document Vault — identify gaps vs this spec
- [ ] Integrate TipTap editor if not already present
- [ ] Implement full toolbar (all icons, dropdowns, behaviors)
- [ ] Implement all menu bar dropdowns (File through Help)
- [ ] Implement document tabs and outline sidebar
- [ ] Implement ruler with draggable indent markers
- [ ] Implement page setup dialog
- [ ] Implement find & replace

### Phase 2: Collaboration & Sharing (Weeks 4-6)
> Priority: HIGH

- [ ] Implement Share dialog with all permission levels
- [ ] Set up WebSocket infrastructure for real-time sync
- [ ] Implement collaborative cursor and selection display
- [ ] Implement comment system (add, reply, resolve, threads)
- [ ] Implement version history panel and restore
- [ ] Implement auto-save with status indicators
- [ ] Implement "Show all comments" panel

### Phase 3: AI & Side Panels (Weeks 7-9)
> Priority: HIGH

- [ ] Implement Gemini sparkle button and inline prompt
- [ ] Connect AI features to existing Lisa AI backend
- [ ] Implement AI content generation preview and actions
- [ ] Implement AI refine options
- [ ] Implement Calendar, Keep, Tasks, Contacts side panels
- [ ] Implement side panel icon strip
- [ ] Implement Gemini sidebar panel

### Phase 4: Polish & Advanced Features (Weeks 10-12)
> Priority: MEDIUM

- [ ] Implement Smart Chips (date, people, file, event, place)
- [ ] Implement offline mode with Service Worker
- [ ] Implement document download in all formats
- [ ] Implement print layout and print dialog
- [ ] Implement template gallery
- [ ] Complete keyboard shortcuts registry
- [ ] Accessibility audit and fixes
- [ ] Performance optimization pass
- [ ] E2E test suite completion
- [ ] Document context menu: Rename, Remove, Open in new tab, Available offline

---

## 29. CROSS-REFERENCE INDEX

### Feature → Specification Section Map

| Feature | Section | Priority |
|---|---|---|
| Home Screen / Document Vault | 2.x | Phase 1 |
| Top Navigation Bar | 2.2 | Phase 1 |
| Template Gallery | 2.3 | Phase 4 |
| Document Grid View | 2.4.2 | Phase 1 |
| Document List View | 2.4.3 | Phase 1 |
| Document Context Menu | 2.4.4 | Phase 4 |
| FAB (New Document) | 2.5 | Phase 1 |
| Editor Core Layout | 3.x | Phase 1 |
| Title Bar | 3.2 | Phase 1 |
| Menu Bar | 3.3, 4.x | Phase 1 |
| File Menu | 4.1 | Phase 1 |
| Edit Menu | 4.2 | Phase 1 |
| View Menu | 4.3 | Phase 1 |
| Insert Menu | 4.4 | Phase 1 |
| Format Menu | 4.5 | Phase 1 |
| Tools Menu | 4.6 | Phase 2 |
| Gemini Menu | 4.7 | Phase 3 |
| Extensions Menu | 4.8 | Phase 4 |
| Help Menu | 4.9 | Phase 4 |
| Formatting Toolbar | 5.x | Phase 1 |
| Font Selector | 5.2.4 | Phase 1 |
| Font Size | 5.2.5 | Phase 1 |
| Bold/Italic/Underline | 5.2.6 | Phase 1 |
| Text Color | 5.2.7 | Phase 1 |
| Highlight Color | 5.2.8 | Phase 1 |
| Alignment | 5.2.9 | Phase 1 |
| Lists | 5.2.12 | Phase 1 |
| Indentation | 5.2.13 | Phase 1 |
| Text Selection | 6.x | Phase 1 |
| Floating Selection Toolbar | 6.1.3 | Phase 2 |
| Document Tabs Sidebar | 7.x | Phase 1 |
| Ruler | 8.x | Phase 1 |
| Editing Canvas | 9.x | Phase 1 |
| Gemini Prompt Button | 9.2 | Phase 3 |
| Share Dialog | 10.x | Phase 2 |
| Comment System | 11.x | Phase 2 |
| Side Panel Icons | 12.1 | Phase 3 |
| Calendar Panel | 12.2.2 | Phase 3 |
| Keep Panel | 12.2.3 | Phase 3 |
| Tasks Panel | 12.2.4 | Phase 3 |
| Contacts Panel | 12.2.5 | Phase 3 |
| Lisa AI Panel | 12.3.1 | Phase 3 |
| Gemini AI Integration | 13.x | Phase 3 |
| Real-Time Collaboration | 14.x | Phase 2 |
| Find & Replace | 15.x | Phase 1 |
| Page Setup | 16.x | Phase 1 |
| Print | 17.x | Phase 4 |
| Version History | 18.x | Phase 2 |
| Offline Mode | 19.x | Phase 4 |
| Keyboard Shortcuts | 20.x | Phase 1 |
| Data Models | 21.x | Phase 1 |
| API Endpoints | 22.x | Phase 1-2 |
| TipTap Integration | 23.x | Phase 1 |
| Accessibility | 24.x | Phase 4 |
| Performance | 25.x | Phase 4 |
| Security | 26.x | Phase 1-2 |
| Testing | 27.x | Phase 4 |

---

> [!CAUTION]
> ## FINAL REMINDER: PRESERVATION MANDATE
> 
> Before implementing ANY section of this specification:
> 1. **AUDIT** the existing codebase for that feature area
> 2. **IDENTIFY** what already works correctly
> 3. **ONLY ADD** what is missing or broken
> 4. **TEST** that existing functionality still works after changes
> 5. **NEVER** delete or rewrite working code
>
> The SAM Dossier platform has significant existing functionality.
> This specification is an **enhancement guide**, not a rebuild instruction.

---

**END OF SPECIFICATION**

*Total sections: 29 | Total specification parts: 6*
*Source: PNG sequence analysis (3,313 frames) + existing platform audit*
*Generated for: Socinga Africa — SAM Dossier Platform*
*Date: May 2026*

