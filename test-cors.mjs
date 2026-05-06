import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

async function test() {
  const command = new GetObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME || 'socinga-heavy-assets',
    Key: 'sam-dossier/public/socinga-africa-approved-documents/Establishment_Policy.html',
  });
  const url = await getSignedUrl(r2Client, command, { expiresIn: 3600 });
  console.log(url);
}
test();
