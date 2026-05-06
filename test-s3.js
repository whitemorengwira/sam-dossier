const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const client = new S3Client({
    region: 'auto',
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    },
});

const command = new ListObjectsV2Command({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    Prefix: 'sam-dossier/public/socinga-africa-approved-documents/',
});

client.send(command).then(res => console.log(res.Contents)).catch(err => console.error("Error:", err.message));
