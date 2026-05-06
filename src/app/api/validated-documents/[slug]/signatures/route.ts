/**
 * Signatures API — Validated Documents
 *
 * CRUD endpoints for digital signature persistence via Supabase.
 * - GET: returns all signatures for a document slug.
 * - POST: upserts a signature for the current user + pad.
 * - DELETE: removes the current user's signature for a pad.
 */

import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getDocumentBySlug } from '@/lib/validated-documents/registry';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc) {
    return Response.json({ error: 'Document not found' }, { status: 404 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('document_signatures')
    .select('*')
    .eq('document_slug', slug)
    .order('signed_at', { ascending: true });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data ?? []);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc) {
    return Response.json({ error: 'Document not found' }, { status: 404 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: 'Unauthorised' }, { status: 401 });
  }

  let body: { padId?: string; dataUrl?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { padId, dataUrl } = body;
  if (!padId || !dataUrl) {
    return Response.json(
      { error: 'Missing padId or dataUrl' },
      { status: 400 }
    );
  }

  // Validate padId exists in the document's canvas pad map
  const role = doc.canvasPadMap[padId];
  if (!role) {
    return Response.json(
      { error: 'Invalid pad ID for this document' },
      { status: 400 }
    );
  }

  const signedIp = request.headers.get('x-forwarded-for') ?? null;
  const signedUserAgent = request.headers.get('user-agent') ?? null;

  const { data, error } = await supabase
    .from('document_signatures')
    .upsert(
      {
        document_slug: slug,
        pad_id: padId,
        signature_role: role,
        signature_data_url: dataUrl,
        signed_by_user_id: user.id,
        signed_at: new Date().toISOString(),
        signed_ip: signedIp,
        signed_user_agent: signedUserAgent,
      },
      { onConflict: 'document_slug,pad_id,signed_by_user_id' }
    )
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);
  if (!doc) {
    return Response.json({ error: 'Document not found' }, { status: 404 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: 'Unauthorised' }, { status: 401 });
  }

  let body: { padId?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { padId } = body;
  if (!padId) {
    return Response.json({ error: 'Missing padId' }, { status: 400 });
  }

  const { error } = await supabase
    .from('document_signatures')
    .delete()
    .eq('document_slug', slug)
    .eq('pad_id', padId)
    .eq('signed_by_user_id', user.id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
