/**
 * One-time processing script — transforms all 10 original HTML files
 * to include the document engine (toolbar + editing + enhanced signing pads).
 * Original content is preserved; only infrastructure is added.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DOC_DIR = join(process.cwd(), 'public', 'documents', 'socinga-africa');

const DOCUMENTS = [
  {
    filename: 'Establishment_Policy.html',
    signatories: [
      { id: 'sig-md', name: 'Ms Jabulile Dladla', title: 'Managing Director' },
      { id: 'sig-ceo', name: 'Mr Whitemore Ngwira', title: 'Chief Executive Officer' },
      { id: 'sig-chair', name: 'Mr Tsekane Lukie Tshabalala', title: 'Chairperson' },
    ],
  },
  {
    filename: 'Structural_Policy.html',
    signatories: [
      { id: 'sig-md', name: 'Ms Jabulile Dladla', title: 'Managing Director' },
      { id: 'sig-ceo', name: 'Mr Whitemore Ngwira', title: 'Chief Executive Officer' },
      { id: 'sig-chair', name: 'Mr Tsekane Lukie Tshabalala', title: 'Chairperson' },
    ],
  },
  {
    filename: 'Financial_Policy.html',
    signatories: [
      { id: 'sig-md', name: 'Ms Jabulile Dladla', title: 'Managing Director' },
      { id: 'sig-ceo', name: 'Mr Whitemore Ngwira', title: 'Chief Executive Officer' },
      { id: 'sig-chair', name: 'Mr Tsekane Lukie Tshabalala', title: 'Chairperson' },
    ],
  },
  {
    filename: 'Ecosystem_Policies.html',
    signatories: [
      { id: 'sig-jabu', name: 'Ms Jabulile Dladla', title: 'Managing Director' },
      { id: 'sig-mike', name: 'Mr Mike Dotsey', title: 'Chief Financial Officer' },
      { id: 'sig-white', name: 'Mr Whitemore Ngwira', title: 'Chief Executive Officer' },
      { id: 'sig-tsekane', name: 'Mr Tsekane Lukie Tshabalala', title: 'Chairperson' },
    ],
  },
  {
    filename: 'Mining_Strategic_Policy.html',
    signatories: [
      { id: 'sig-md', name: 'Ms Jabulile Dladla', title: 'Managing Director' },
      { id: 'sig-ceo', name: 'Mr Whitemore Ngwira', title: 'Chief Executive Officer' },
      { id: 'sig-chair', name: 'Mr Tsekane Lukie Tshabalala', title: 'Chairperson' },
    ],
  },
  {
    filename: 'Mining_Strategy_Addendum.html',
    signatories: [
      { id: 'sig-md', name: 'Ms Jabulile Dladla', title: 'Managing Director' },
      { id: 'sig-ceo', name: 'Mr Whitemore Ngwira', title: 'Chief Executive Officer' },
      { id: 'sig-chair', name: 'Mr Tsekane Lukie Tshabalala', title: 'Chairperson' },
    ],
  },
  {
    filename: 'Strategic_Business_Operations.html',
    signatories: [
      { id: 'sig-md', name: 'Ms Jabulile Dladla', title: 'Managing Director' },
      { id: 'sig-ceo', name: 'Mr Whitemore Ngwira', title: 'Chief Executive Officer' },
      { id: 'sig-chair', name: 'Mr Tsekane Lukie Tshabalala', title: 'Chairperson' },
    ],
  },
  {
    filename: 'Corporate_Services_Structure.html',
    signatories: [
      { id: 'sig-md', name: 'Ms Jabulile Dladla', title: 'Managing Director' },
      { id: 'sig-cfo', name: 'Mr Mike Dotsey', title: 'Chief Financial Officer' },
      { id: 'sig-ceo', name: 'Mr Whitemore Ngwira', title: 'Chief Executive Officer' },
      { id: 'sig-chair', name: 'Mr Tsekane Lukie Tshabalala', title: 'Chairperson' },
    ],
  },
  {
    filename: 'Ecosystem_Organogram.html',
    signatories: [
      { id: 'sig-md', name: 'Ms Jabulile Dladla', title: 'Managing Director' },
      { id: 'sig-cfo', name: 'Mr Mike Dotsey', title: 'Chief Financial Officer' },
      { id: 'sig-ceo', name: 'Mr Whitemore Ngwira', title: 'Chief Executive Officer' },
      { id: 'sig-chair', name: 'Mr Tsekane Lukie Tshabalala', title: 'Chairperson' },
    ],
  },
  {
    filename: 'SAM-mission-centre-budget.html',
    signatories: [
      { id: 'sig-cfo', name: 'Mr Mike Dotsey', title: 'Chief Financial Officer' },
      { id: 'sig-ceo', name: 'Mr Whitemore Ngwira', title: 'Chief Executive Officer' },
      { id: 'sig-chair', name: 'Mr Tsekane Lukie Tshabalala', title: 'Chairperson' },
    ],
  },
];

function buildSigningHTML(signatories) {
  const blocks = signatories
    .map(
      (s) => `
            <div class="enh-sig-block">
                <canvas id="${s.id}" class="sig-canvas" width="400" height="120"></canvas>
                <button type="button" class="enh-sig-clear" onclick="clearSignaturePad('${s.id}')">✕ Clear</button>
                <div class="enh-sig-label">${s.name} — ${s.title}</div>
                <div class="enh-sig-date-container">
                    <label for="date-${s.id}" class="enh-sig-date">Date:</label>
                    <input type="date" id="date-${s.id}" class="enh-sig-date-input" />
                </div>
            </div>`
    )
    .join('\n');

  return `
    <div class="enh-signing-section">
        <h3 class="enh-signing-title">Duly Signed and Approved</h3>
        <p class="enh-signing-subtitle">By affixing their signatures below, the undersigned confirm that this document has been duly approved by the Board of Directors of Socinga Africa.</p>
        <div class="enh-sig-grid">
${blocks}
        </div>
        <div class="enh-gold-bar"></div>
        <p class="enh-footer">&copy; 2026 Socinga Africa Mining (Pty) Ltd. All rights reserved. Confidential &amp; Proprietary.</p>
    </div>`;
}

function processDocument(doc) {
  const filePath = join(DOC_DIR, doc.filename);
  let html = readFileSync(filePath, 'utf-8');

  console.log(`Processing ${doc.filename}...`);

  // 1. Add engine CSS before </head>
  if (!html.includes('document-engine.css')) {
    html = html.replace(
      /<\/head>/i,
      '    <link rel="stylesheet" href="/document-engine.css">\n</head>'
    );
  }

  // 2. Remove old inline <script> blocks (initPad, clearPad code)
  html = html.replace(
    /\s*<script>\s*function initPad[\s\S]*?<\/script>\s*/gi,
    '\n'
  );
  html = html.replace(
    /\s*<script>\s*window\.onload[\s\S]*?<\/script>\s*/gi,
    '\n'
  );

  // 3. Remove old signing sections
  html = html.replace(
    /\s*<div class="mt-16 border-t-2[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi,
    ''
  );
  html = html.replace(
    /\s*<div class="mt-16[^"]*">\s*<h3[^>]*>.*?(?:Duly Signed|Declaration)[\s\S]*?<\/div>\s*<\/div>/gi,
    ''
  );

  // 4. Inject the new company seal
  const oldSealText = '<div class="w-32 h-32 border-4 border-slate-300 rounded-full flex items-center justify-center text-slate-300 opacity-50 font-serif text-xs">PLACE SEAL HERE</div>';
  const newSealHtml = '<img src="/documents/socinga-africa/seal.png" class="w-32 h-32 object-contain" alt="Company Seal" />';
  html = html.replace(oldSealText, newSealHtml);

  // 5. Wrap the main content div with id="doc-content"
  if (!html.includes('id="doc-content"')) {
    html = html.replace(
      /(<body[^>]*>)\s*(<div\s)/i,
      '$1\n    $2id="doc-content" '
    );
    if (!html.includes('id="doc-content"')) {
      html = html.replace(
        /(<body[^>]*>)\s*(<div\s+class="container")/i,
        '$1\n    $2 id="doc-content"'
      );
    }
  }

  // 6. Build enhanced signing section
  const signingHTML = buildSigningHTML(doc.signatories);

  // 7. Insert signing section + engine JS before </body>
  html = html.replace(
    /<\/body>/i,
    `${signingHTML}\n\n    <script src="/document-engine.js"></script>\n    <script src="/signing-bridge.js"></script>\n</body>`
  );

  // 8. Clean up any duplicate empty lines
  html = html.replace(/\n{3,}/g, '\n\n');

  writeFileSync(filePath, html, 'utf-8');
  console.log(`  ✓ Saved ${doc.filename}`);
}

// Process all documents
console.log('=== Processing 10 validated documents ===\n');
DOCUMENTS.forEach(processDocument);
console.log('\n=== Done! All documents processed. ===');
