// src/hooks/useUploadDocument.ts
// This hook abstracts the entire upload pipeline:
// 1. Request a signed upload URL from our API (which issues R2 signed URLs)
// 2. Upload the file directly from browser to R2 using the signed URL
// 3. Notify our API that upload is done so it can create the Supabase document record
// 4. Trigger server-side conversion if the file is a DOCX, XLSX, or PPTX
// 5. Return the document ID and edit URL

import { useState, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface UploadOptions {
  file: File;
  workspaceId: string;
  folderId?: string;
  onProgress?: (progress: number) => void;
}

interface UploadResult {
  documentId: string;
  editUrl: string;
  originalStoragePath: string;
}

export function useUploadDocument() {
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClientComponentClient();

  const uploadDocument = useCallback(async ({
    file,
    workspaceId,
    folderId,
    onProgress,
  }: UploadOptions): Promise<UploadResult> => {
    setIsUploading(true);

    try {
      // Step 1: Get a signed R2 upload URL from our API
      const signedUrlResponse = await fetch('/api/upload/signed-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          workspaceId,
          folderId,
        }),
      });

      if (!signedUrlResponse.ok) {
        throw new Error('Failed to get upload URL. Please try again.');
      }

      const { signedUrl, storagePath, uploadId } = await signedUrlResponse.json();
      onProgress?.(10);

      // Step 2: Upload directly to R2 using XHR for progress tracking
      await uploadToR2WithProgress(file, signedUrl, (progress) => {
        // Map R2 upload progress (10%–80%)
        onProgress?.(10 + (progress * 0.7));
      });

      onProgress?.(80);

      // Step 3: Notify our API that upload is complete
      // This creates the Supabase document record and triggers conversion if needed
      const completeResponse = await fetch('/api/upload/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uploadId,
          storagePath,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          workspaceId,
          folderId,
        }),
      });

      if (!completeResponse.ok) {
        throw new Error('Upload succeeded but document registration failed.');
      }

      const { documentId, editUrl, needsConversion } = await completeResponse.json();
      onProgress?.(90);

      // Step 4: If the file needs server-side conversion (DOCX → TipTap JSON),
      // poll for completion
      if (needsConversion) {
        await pollConversionStatus(documentId, (convProgress) => {
          onProgress?.(90 + (convProgress * 0.1));
        });
      }

      onProgress?.(100);

      return {
        documentId,
        editUrl,
        originalStoragePath: storagePath,
      };
    } finally {
      setIsUploading(false);
    }
  }, [supabase]);

  return { uploadDocument, isUploading };
}

// Upload file to R2 using XMLHttpRequest (gives us real progress events)
function uploadToR2WithProgress(
  file: File,
  signedUrl: string,
  onProgress: (progress: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`R2 upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload.'));
    });

    xhr.open('PUT', signedUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
}

// Poll the conversion status endpoint until done or failed
async function pollConversionStatus(
  documentId: string,
  onProgress: (progress: number) => void
): Promise<void> {
  const maxAttempts = 30;
  let attempts = 0;

  while (attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch(`/api/documents/${documentId}/conversion-status`);
    const { status, progress } = await response.json();

    onProgress(progress ?? 0);

    if (status === 'done') return;
    if (status === 'failed') throw new Error('Document conversion failed on server.');

    attempts++;
  }

  throw new Error('Document conversion timed out.');
}
