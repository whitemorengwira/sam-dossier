// src/app/api/upload/complete/route.ts
// Called once the browser has confirmed the R2 upload is done.
// Creates the document record in the DB.
// Queues a background conversion job for DOCX/XLSX/PPTX files.

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const CONVERTIBLE_TYPES = [
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/markdown',
  'text/html',
  'application/rtf',
];

const RequestSchema = z.object({
  uploadId: z.string().uuid(),
  storagePath: z.string().min(1),
  fileName: z.string().min(1),
  fileType: z.string().min(1),
  fileSize: z.number().positive(),
  workspaceId: z.string().uuid(),
  folderId: z.string().uuid().optional(),
});

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = RequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { uploadId, storagePath, fileName, fileType, fileSize, workspaceId, folderId } = parsed.data;

  // Verify the upload intent exists and belongs to this user
  const { data: intent, error: intentError } = await supabase
    .from('upload_intents')
    .select('*')
    .eq('id', uploadId)
    .eq('user_id', user.id)
    .eq('status', 'pending')
    .single();

  if (intentError || !intent) {
    return NextResponse.json({ error: 'Upload intent not found or already processed.' }, { status: 404 });
  }

  const needsConversion = CONVERTIBLE_TYPES.includes(fileType);

  // Determine document type
  const docType = determineDocumentType(fileType);

  // The public URL for R2 objects
  const r2PublicBaseUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL!; // e.g. https://pub-xxx.r2.dev
  const fileUrl = `${r2PublicBaseUrl}/${storagePath}`;

  // Create the document record
  const { data: document, error: docError } = await supabase
    .from('documents')
    .insert({
      workspace_id: workspaceId,
      folder_id: folderId || null,
      title: fileName.replace(/\.[^/.]+$/, ''), // remove extension from title
      original_file_name: fileName,
      file_type: fileType,
      file_size: fileSize,
      file_url: fileUrl,
      storage_path: storagePath,
      document_type: docType,
      created_by: user.id,
      conversion_status: needsConversion ? 'pending' : 'not_required',
    })
    .select('id')
    .single();

  if (docError || !document) {
    return NextResponse.json({ error: 'Failed to create document record.' }, { status: 500 });
  }

  // Mark upload intent as complete
  await supabase
    .from('upload_intents')
    .update({ status: 'complete', document_id: document.id })
    .eq('id', uploadId);

  // Queue conversion if needed (via Supabase Edge Function or background route)
  if (needsConversion) {
    // In a real app we would fire this but not await it, or put it in a queue.
    // For this prototype we will just call it synchronously or silently ignore if not yet implemented.
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/documents/${document.id}/convert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-key': process.env.INTERNAL_API_KEY!,
      },
    }).catch(console.error);
  }

  // Build the edit URL based on document type
  const editUrl = buildEditUrl(document.id, docType);

  return NextResponse.json({
    documentId: document.id,
    editUrl,
    needsConversion,
  });
}

function determineDocumentType(mimeType: string): string {
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (
    mimeType === 'application/vnd.ms-powerpoint' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ) return 'presentation';
  if (
    mimeType === 'application/vnd.ms-excel' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    mimeType === 'text/csv'
  ) return 'spreadsheet';
  return 'document'; // Everything else opens in the rich text editor
}

function buildEditUrl(documentId: string, docType: string): string {
  const base = '/workspace';
  switch (docType) {
    case 'pdf': return `${base}/pdf/${documentId}`;
    case 'presentation': return `${base}/presentation/${documentId}`;
    case 'spreadsheet': return `${base}/spreadsheet/${documentId}`;
    case 'image': return `${base}/media/${documentId}`;
    default: return `${base}/editor/${documentId}`;
  }
}
