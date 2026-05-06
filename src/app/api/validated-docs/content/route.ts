import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'socinga-heavy-assets';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const r2Key = searchParams.get('r2Key');

  if (!r2Key) {
    return NextResponse.json({ error: 'Missing r2Key parameter' }, { status: 400 });
  }

  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: r2Key,
    });
    
    const response = await r2Client.send(command);
    const content = await response.Body?.transformToString();

    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (err: any) {
    console.error('Fetch GET error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
