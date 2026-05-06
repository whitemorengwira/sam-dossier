// src/app/api/approved-documents/route.ts
// Lists all objects in the approved documents R2 prefix using the S3 SDK.
// Returns a JSON array of { key, fileName, size, lastModified, format, publicUrl }.

import { NextResponse } from 'next/server'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

const PREFIX = 'sam-dossier/public/socinga-africa-approved-documents/'

function getR2Client() {
  return new S3Client({
    region: 'auto',
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
    },
  })
}

function detectFormat(key: string): string {
  const ext = key.split('.').pop()?.toLowerCase() || ''
  if (ext === 'pdf') return 'pdf'
  if (ext === 'html' || ext === 'htm') return 'html'
  if (ext === 'docx' || ext === 'doc') return 'docx'
  if (ext === 'pptx' || ext === 'ppt') return 'pptx'
  if (ext === 'xlsx' || ext === 'xls') return 'xlsx'
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) return 'image'
  return 'other'
}

function humanTitle(fileName: string): string {
  return fileName
    .replace(/\.[^.]+$/, '')          // strip extension
    .replace(/[-_]+/g, ' ')           // dashes/underscores to spaces
    .replace(/\b\w/g, c => c.toUpperCase()) // title case
}

export async function GET() {
  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME
  const publicBase = (
    process.env.NEXT_PUBLIC_GLOBAL_R2_URL ||
    'https://pub-c1b1115f451f49a0888914c18175cc2c.r2.dev'
  ).replace(/\/+$/, '')

  // If R2 credentials are not configured, return empty array
  if (
    !process.env.CLOUDFLARE_R2_ENDPOINT ||
    process.env.CLOUDFLARE_R2_ENDPOINT.includes('<')
  ) {
    return NextResponse.json({ documents: [], error: 'R2 credentials not configured.' })
  }

  try {
    const client = getR2Client()
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: PREFIX,
    })
    const response = await client.send(command)

    const documents = (response.Contents || [])
      .filter(obj => obj.Key && obj.Key !== PREFIX) // skip the prefix itself
      .map(obj => {
        const key = obj.Key!
        const fileName = key.replace(PREFIX, '')
        return {
          key,
          fileName,
          title: humanTitle(fileName),
          size: obj.Size || 0,
          lastModified: obj.LastModified?.toISOString() || new Date().toISOString(),
          format: detectFormat(fileName),
          publicUrl: `${publicBase}/${key}`,
        }
      })

    return NextResponse.json({ documents })
  } catch (err: any) {
    console.error('R2 ListObjects error:', err)
    return NextResponse.json(
      { documents: [], error: err.message || 'Failed to list R2 objects.' },
      { status: 500 }
    )
  }
}
