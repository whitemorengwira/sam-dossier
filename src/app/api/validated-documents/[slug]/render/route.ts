/**
 * Render Route — Validated Documents
 *
 * Serves the original HTML document with injected enhancements:
 * 1. A data-document-slug attribute on the <body> tag.
 * 2. Centering / overflow CSS fixes.
 * 3. The document-enhancer.js script (signing pads + editability).
 * 4. The signing-bridge.js script (persistence to Supabase).
 *
 * The original file on disc is never modified.
 */

import { NextRequest } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { getDocumentBySlug } from '@/lib/validated-documents/registry';

export const dynamic = 'force-dynamic';

/** CSS injected into every rendered document for proper centering and display */
const INJECTED_CSS = `
<style data-sam-enhancer="true">
  /* Ensure the document fills the viewport and centres content */
  html, body {
    width: 100% !important;
    min-height: 100vh;
    margin: 0 !important;
    overflow-x: hidden !important;
    box-sizing: border-box !important;
  }
  /* Constrain wide containers */
  .container, [class*="max-w-"] {
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  /* Ensure tables don't overflow */
  table {
    table-layout: auto !important;
    word-break: break-word;
  }
  /* Print media - remove sticky bar */
  @media print {
    .enh-edit-bar { display: none !important; }
  }
</style>
`;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);

  if (!doc) {
    return new Response('Document not found', { status: 404 });
  }

  const filePath = path.join(
    process.cwd(),
    'public',
    'documents',
    'socinga-africa',
    doc.filename
  );

  let html: string;
  try {
    html = await readFile(filePath, 'utf-8');
  } catch {
    return new Response('Document file not found on disc', { status: 404 });
  }

  // Inject data-document-slug onto the <body> tag
  html = html.replace(
    /<body([^>]*)>/i,
    `<body$1 data-document-slug="${slug}">`
  );

  // Inject centering CSS before </head>
  html = html.replace(
    /<\/head>/i,
    `${INJECTED_CSS}\n</head>`
  );

  // Inject the enhancer and signing bridge scripts before </body>
  html = html.replace(
    /<\/body>/i,
    '<script src="/document-enhancer.js" defer></script>\n<script src="/signing-bridge.js" defer></script>\n</body>'
  );

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'private, no-store',
    },
  });
}
