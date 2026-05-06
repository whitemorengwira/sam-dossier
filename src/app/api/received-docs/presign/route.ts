// src/app/api/received-docs/presign/route.ts
// Issues a presigned PUT URL for direct browser-to-R2 upload
// into the received-verified-documents prefix.

import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

if (!process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || !process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY) {
  console.warn('CRITICAL WARNING: Vercel environment variables for Cloudflare R2 are missing!');
}

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT || '',
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || 'MISSING_ACCESS_KEY',
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || 'MISSING_SECRET_KEY',
  },
});

const BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'socinga-heavy-assets';
const PREFIX = 'sam-dossier/public/received-verified-documents';

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType, fileSize } = await request.json();

    if (!fileName || !fileType) {
      return NextResponse.json({ error: 'fileName and fileType are required.' }, { status: 400 });
    }

    // Sanitise filename
    const sanitised = fileName.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase();
    const storagePath = `${PREFIX}/${sanitised}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: storagePath,
      ContentType: fileType,
      ContentLength: fileSize,
    });

    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 900 });

    return NextResponse.json({ signedUrl, storagePath, fileName: sanitised });
  } catch (err: any) {
    console.error('Presign error:', err);
    return NextResponse.json({ error: err.message || 'Failed to generate presigned URL.' }, { status: 500 });
  }
}
