import type { GDocsDocument, SharedUser, DocTemplate } from '@/types';

/* ── Team ─────────────────────────────────────────────────────────────────── */
export const TEAM: SharedUser[] = [
  { id: 'u1', name: 'Whitemore Ngwira', email: 'whitemore@socinga.africa', role: 'owner', avatar: 'WN' },
  { id: 'u2', name: 'Jabulile Dladla', email: 'jabulile@socinga.africa', role: 'editor', avatar: 'JD' },
  { id: 'u3', name: 'Shingirai Muyenda', email: 'shingirai@socinga.africa', role: 'editor', avatar: 'SM' },
  { id: 'u4', name: 'Michael Dotsey', email: 'michael@socinga.africa', role: 'editor', avatar: 'MD' },
  { id: 'u5', name: 'Patience Ngwira', email: 'patience@socinga.africa', role: 'viewer', avatar: 'PN' },
  { id: 'u6', name: 'Olwethu Mlokoti', email: 'olwethu@socinga.africa', role: 'viewer', avatar: 'OM' },
];

/* ── Version type ──────────────────────────────────────────────────────── */
export interface DocVersion {
  id: string; date: string; author: string; label?: string; snapshot: string;
}

/* ── Documents — only 2 guide documents ──────────────────────────────── */
export const DOCUMENTS: GDocsDocument[] = [
  {
    id: 'doc-guide-vault',
    title: 'How to Use the Document Vault',
    category: 'corporate',
    owner: TEAM[0],
    lastModified: '2026-05-05T22:00:00Z',
    starred: true,
    shared: TEAM,
    signatureStatus: 'none',
    isPublished: true,
    content: `<h1>Document Vault — User Guide</h1>
<h2>Welcome to the SAM Dossier Document Vault</h2>
<p>The Document Vault is your workspace for <strong>creating, editing, and collaborating</strong> on corporate documents. Think of it as your digital drafting table — where ideas become polished, board-ready deliverables.</p>

<h3>Creating a New Document</h3>
<ol>
  <li>Click the <strong>+ button</strong> (bottom-right) or select a template from the gallery at the top.</li>
  <li>Choose from templates: Meeting Minutes, NDA, Board Resolution, Policy Document, and more.</li>
  <li>Begin editing immediately — your work is auto-saved every few seconds.</li>
</ol>

<h3>Editing Tools</h3>
<p>The toolbar provides full formatting control:</p>
<ul>
  <li><strong>Text styling:</strong> Bold, italic, underline, strikethrough, font family, font size, and text colour.</li>
  <li><strong>Structure:</strong> Headings (H1–H6), bullet lists, numbered lists, blockquotes, and tables.</li>
  <li><strong>Insert:</strong> Images, links, horizontal rules, tables, and page breaks.</li>
  <li><strong>Advanced:</strong> Find &amp; Replace (Ctrl+H), Word Count (Ctrl+Shift+C), and AI Writing Assistant.</li>
</ul>

<h3>Collaboration</h3>
<ul>
  <li><strong>Share:</strong> Click the Share button to invite team members with Owner, Editor, or Viewer roles.</li>
  <li><strong>Comments:</strong> Select text and click the comment icon to leave contextual feedback.</li>
  <li><strong>Version History:</strong> Every save creates a snapshot. Restore any previous version instantly.</li>
</ul>

<h3>The Finalisation Workflow</h3>
<p>When a document is ready for permanent archival:</p>
<ol>
  <li><strong>Sign</strong> the document using the e-Sign button (draw your signature on the pad).</li>
  <li>Once signed, the <strong>"Finalise → Validated Docs"</strong> button appears in the toolbar.</li>
  <li>Click it to permanently move the document into the <strong>Validated Documents Vault</strong>, where it becomes an immutable, board-approved record.</li>
</ol>

<hr/>
<p><em>For questions, contact the SAM Dossier support team.</em></p>`,
    comments: [],
  },
  {
    id: 'doc-guide-validated',
    title: 'How Validated Documents Work',
    category: 'corporate',
    owner: TEAM[0],
    lastModified: '2026-05-05T22:00:00Z',
    starred: true,
    shared: TEAM,
    signatureStatus: 'none',
    isPublished: true,
    content: `<h1>Validated Documents — User Guide</h1>
<h2>What Are Validated Documents?</h2>
<p>The <strong>Validated Documents Vault</strong> is the secure, permanent archive for all finalised corporate documents. Once a document has been signed and moved here, it carries the <em>Validated</em> badge — confirming it has been reviewed, approved, and digitally signed by an authorised signatory.</p>

<h3>How Documents Get Here</h3>
<p>Documents arrive in the Validated Vault through two paths:</p>
<ol>
  <li><strong>Finalised from the Document Vault:</strong> Any document that is signed and then finalised is automatically transferred here.</li>
  <li><strong>Pre-loaded Master Documents:</strong> The 10 master corporate documents (Shareholder Agreement, NDA, Term Sheet, etc.) are pre-loaded from the Cloudflare R2 CDN.</li>
</ol>

<h3>What You Can Do Here</h3>
<ul>
  <li><strong>View &amp; Edit:</strong> Open any document in the full-screen editor. Edits are saved to your session.</li>
  <li><strong>Digital Signature:</strong> Add your electronic signature to any document using the e-Sign button.</li>
  <li><strong>Export:</strong> Download documents in three formats:
    <ul>
      <li><strong>PDF</strong> — For printing and formal distribution.</li>
      <li><strong>Word (.docx)</strong> — For further editing in Microsoft Word.</li>
      <li><strong>HTML</strong> — For web publishing or email distribution.</li>
    </ul>
  </li>
  <li><strong>Upload:</strong> Replace a document's content by uploading a local HTML or text file.</li>
</ul>

<h3>Document Categories</h3>
<p>Documents are organised by category for easy filtering:</p>
<ul>
  <li><strong>Corporate</strong> — Company profiles and organisational documents.</li>
  <li><strong>Legal</strong> — Agreements, NDAs, and binding contracts.</li>
  <li><strong>Finance</strong> — Term sheets, off-take agreements, and financial instruments.</li>
  <li><strong>Governance</strong> — MOIs, SPV memoranda, and board resolutions.</li>
  <li><strong>Compliance</strong> — EIA, Code of Conduct, and regulatory documents.</li>
  <li><strong>HR</strong> — Employment contracts and staff policies.</li>
</ul>
<hr/>
<p><em>All validated documents carry cryptographic integrity markers and are archived for audit purposes.</em></p>`,
    comments: [],
  },
];

/* ── Templates ──────────────────────────────────────────────────────────── */
export const TEMPLATES: DocTemplate[] = [
  { id: 'tpl-blank', title: 'Blank', category: '', preview: '' },
  { id: 'tpl-minutes', title: 'Meeting Minutes', category: 'MINUTES', preview: '<h1>Meeting Minutes</h1><p><strong>Date:</strong><br/><strong>Present:</strong></p><h3>Agenda</h3><ol><li></li></ol><h3>Resolutions</h3><ul><li></li></ul>' },
  { id: 'tpl-nda', title: 'Non-Disclosure Agreement', category: 'LEGAL', preview: '<h1>Non-Disclosure Agreement</h1><p>This agreement is entered into between...</p>' },
  { id: 'tpl-board-res', title: 'Board Resolution', category: 'GOVERNANCE', preview: '<h1>Board Resolution</h1><p><strong>Resolution No:</strong></p>' },
  { id: 'tpl-mining-report', title: 'Mining Report', category: 'GEOLOGICAL', preview: '<h1>Mining Operations Report</h1><h3>Production Summary</h3>' },
  { id: 'tpl-financial', title: 'Financial Summary', category: 'FINANCE', preview: '<h1>Financial Summary Report</h1><h3>Period:</h3>' },
  { id: 'tpl-policy', title: 'Policy Document', category: 'GOVERNANCE', preview: '<h1>SOCINGA AFRICA</h1><h2>Policy Title</h2><h3>Purpose</h3><p></p>' },
  { id: 'tpl-loi', title: 'Letter of Intent', category: 'LEGAL', preview: '<h1>LETTER OF INTENT</h1><p><strong>To:</strong><br/><strong>Re:</strong></p>' },
];

/* ── Persistence ────────────────────────────────────────────────────────── */
const STORAGE_KEY = 'sam-dossier-docs-v3';
const VERSIONS_KEY = 'sam-dossier-versions';

export function loadDocuments(): GDocsDocument[] {
  if (typeof window === 'undefined') return DOCUMENTS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return DOCUMENTS;
}

export function saveDocuments(docs: GDocsDocument[]) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(docs)); } catch { /* ignore */ }
}

export function loadVersions(docId: string): DocVersion[] {
  if (typeof window === 'undefined') return [];
  try {
    const all = JSON.parse(localStorage.getItem(VERSIONS_KEY) || '{}');
    return all[docId] || [];
  } catch { return []; }
}

export function saveVersion(docId: string, version: DocVersion) {
  if (typeof window === 'undefined') return;
  try {
    const all = JSON.parse(localStorage.getItem(VERSIONS_KEY) || '{}');
    if (!all[docId]) all[docId] = [];
    all[docId].unshift(version);
    if (all[docId].length > 50) all[docId] = all[docId].slice(0, 50);
    localStorage.setItem(VERSIONS_KEY, JSON.stringify(all));
  } catch { /* ignore */ }
}

/* ── Finalised Documents (moved to Validated Vault) ───────────────────── */
const FINALISED_KEY = 'sam-dossier-finalised-docs';

export function loadFinalisedDocuments(): GDocsDocument[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(FINALISED_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return [];
}

export function saveFinalisedDocument(doc: GDocsDocument) {
  if (typeof window === 'undefined') return;
  try {
    const existing = loadFinalisedDocuments();
    existing.unshift({ ...doc, lastModified: new Date().toISOString() });
    localStorage.setItem(FINALISED_KEY, JSON.stringify(existing));
  } catch { /* ignore */ }
}
