/**
 * Render Route — Validated Documents
 *
 * Serves the original HTML document with two injected modifications:
 * 1. A data-document-slug attribute on the <body> tag.
 * 2. The signing-bridge.js script before </body>.
 *
 * The original file on disc is never modified.
 */

import { NextRequest } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { getDocumentBySlug } from '@/lib/validated-documents/registry';

export const dynamic = 'force-dynamic';

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

  // Inject the signing-bridge script before </body>
  html = html.replace(
    /<\/body>/i,
    '<script src="/signing-bridge.js" defer></script></body>'
  );

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'private, no-store',
    },
  });
}
