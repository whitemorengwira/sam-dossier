/**
 * Render Route — Validated Documents
 *
 * Serves the enhanced HTML document.
 * It first checks R2 for any saved edits (acting like Google Docs).
 * If no edits exist, it serves the pristine original from disc.
 *
 * Injects:
 * a data-document-slug attribute on the <body> tag (for signing-bridge).
 */

import { NextRequest } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { getDocumentBySlug } from '@/lib/validated-documents/registry';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

export const dynamic = 'force-dynamic';

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT || 'https://905a6490298a11b3dfd862b68ff11f3d.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '562c53ab7c3a061251d97c1c97f04dca',
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '3662479c2c15019e7cd0c45232e568f5f50ef68fa3c88e3f27b69af6ef13a9f4',
  },
});
const BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'socinga-heavy-assets';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);

  if (!doc) {
    return new Response('Document not found', { status: 404 });
  }

  let html = '';

  // 1. Try to fetch the latest edited version from R2
  try {
    const key = `sam-dossier/edits/${slug}.html`;
    const response = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: key }));
    const bodyString = await response.Body?.transformToString('utf-8');
    if (bodyString) {
      html = bodyString;
    }
  } catch (error) {
    // If not found in R2, we fallback to the original file
  }

  // 2. Fallback to original local file
  if (!html) {
    const filePath = path.join(process.cwd(), 'public', 'documents', 'socinga-africa', doc.filename);
    try {
      html = await readFile(filePath, 'utf-8');
    } catch {
      return new Response('Document file not found on disc', { status: 404 });
    }
  }

  // 3. Inject data-document-slug onto the <body> tag (for signing-bridge persistence)
  if (!html.includes(`data-document-slug="${slug}"`)) {
    html = html.replace(/<body([^>]*)>/i, `<body$1 data-document-slug="${slug}">`);
  }

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'private, no-store',
    },
  });
}
