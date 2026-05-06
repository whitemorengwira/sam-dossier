import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT || 'https://905a6490298a11b3dfd862b68ff11f3d.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '562c53ab7c3a061251d97c1c97f04dca',
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '3662479c2c15019e7cd0c45232e568f5f50ef68fa3c88e3f27b69af6ef13a9f4',
  },
});

const BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'socinga-heavy-assets';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { html } = body;

    if (!html) {
      return NextResponse.json({ error: 'No HTML provided' }, { status: 400 });
    }

    const key = `sam-dossier/edits/${slug}.html`;

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: html,
        ContentType: 'text/html',
      })
    );

    return NextResponse.json({ success: true, key });
  } catch (error) {
    console.error('Error saving document edit:', error);
    return NextResponse.json({ error: 'Failed to save document' }, { status: 500 });
  }
}
