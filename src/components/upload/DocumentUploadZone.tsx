// src/components/upload/DocumentUploadZone.tsx
// This component replaces a standard file input with a drag-and-drop zone.
// It handles multi-file uploads, shows per-file progress, and on completion
// opens the uploaded file in the appropriate editor (Nexus Editor for docs,
// PDF Viewer/Editor for PDFs, etc.)

'use client';

import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadSimple,
  FilePlus,
  CheckCircle,
  Warning,
  X,
  FileDoc,
  FilePdf,
  FileXls,
  Image as ImageIcon,
  VideoCamera,
} from '@phosphor-icons/react';
import { ALL_ACCEPTED_MIMETYPES, getFileCategory, getMaxFileSizeMB } from '@/lib/upload/accepted-types';
import { useUploadDocument } from '@/hooks/useUploadDocument'; // hook to be created below
import { cn } from '@/lib/utils'; // use existing cn utility

// Per-file upload state tracked in component
interface UploadingFile {
  id: string;
  file: File;
  progress: number;          // 0–100
  status: 'pending' | 'uploading' | 'processing' | 'done' | 'error';
  errorMessage?: string;
  documentId?: string;       // Nexus document ID once created
  editUrl?: string;          // URL to open the document in editor
}

interface DocumentUploadZoneProps {
  workspaceId: string;
  folderId?: string;
  onUploadComplete?: (documentId: string, editUrl: string) => void;
  compact?: boolean; // for use in smaller areas like sidebar
}

export function DocumentUploadZone({
  workspaceId,
  folderId,
  onUploadComplete,
  compact = false,
}: DocumentUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<UploadingFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadDocument } = useUploadDocument();

  // --- Drag event handlers ---

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    // Only set to false if we're leaving the zone, not just a child element
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  // --- File processing ---

  const processFiles = async (files: File[]) => {
    // Validate each file before adding to queue
    const validFiles: UploadingFile[] = [];

    for (const file of files) {
      const maxSizeMB = getMaxFileSizeMB(file.type);
      const fileSizeMB = file.size / (1024 * 1024);

      if (!ALL_ACCEPTED_MIMETYPES.includes(file.type)) {
        validFiles.push({
          id: crypto.randomUUID(),
          file,
          progress: 0,
          status: 'error',
          errorMessage: `File type "${file.type}" is not supported.`,
        });
        continue;
      }

      if (fileSizeMB > maxSizeMB) {
        validFiles.push({
          id: crypto.randomUUID(),
          file,
          progress: 0,
          status: 'error',
          errorMessage: `File exceeds the ${maxSizeMB}MB limit for this type.`,
        });
        continue;
      }

      validFiles.push({
        id: crypto.randomUUID(),
        file,
        progress: 0,
        status: 'pending',
      });
    }

    setUploadQueue(prev => [...prev, ...validFiles]);

    // Upload valid files concurrently (max 3 at a time)
    const pendingFiles = validFiles.filter(f => f.status === 'pending');
    await uploadFilesInBatches(pendingFiles, 3);
  };

  const uploadFilesInBatches = async (files: UploadingFile[], batchSize: number) => {
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      await Promise.all(batch.map(uploadFile));
    }
  };

  const uploadFile = async (uploadingFile: UploadingFile) => {
    // Update status to uploading
    updateFileStatus(uploadingFile.id, { status: 'uploading', progress: 5 });

    try {
      // Simulate progress updates while uploading
      // Real progress comes from XMLHttpRequest onprogress event in useUploadDocument hook
      const result = await uploadDocument({
        file: uploadingFile.file,
        workspaceId,
        folderId,
        onProgress: (progress: number) => {
          updateFileStatus(uploadingFile.id, { progress });
        },
      });

      updateFileStatus(uploadingFile.id, {
        status: 'done',
        progress: 100,
        documentId: result.documentId,
        editUrl: result.editUrl,
      });

      if (onUploadComplete) {
        onUploadComplete(result.documentId, result.editUrl);
      }
    } catch (error) {
      updateFileStatus(uploadingFile.id, {
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'Upload failed.',
      });
    }
  };

  const updateFileStatus = (id: string, updates: Partial<UploadingFile>) => {
    setUploadQueue(prev =>
      prev.map(f => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const removeFromQueue = (id: string) => {
    setUploadQueue(prev => prev.filter(f => f.id !== id));
  };

  // --- Render ---

  return (
    <div className="w-full">
      {/* Drop Zone */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        animate={{
          borderColor: isDragging ? 'var(--nexus-volt)' : 'var(--nexus-border)',
          backgroundColor: isDragging ? 'rgba(110,231,183,0.05)' : 'transparent',
          boxShadow: isDragging ? 'var(--nexus-glow-volt)' : 'none',
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          'relative flex flex-col items-center justify-center',
          'border-2 border-dashed rounded-[var(--nexus-radius-lg)]',
          'cursor-pointer select-none transition-all',
          compact ? 'py-6 px-4' : 'py-12 px-8',
          'hover:border-[var(--nexus-volt-dim)] hover:bg-[rgba(110,231,183,0.03)]'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ALL_ACCEPTED_MIMETYPES.join(',')}
          className="hidden"
          onChange={e => processFiles(Array.from(e.target.files || []))}
        />

        <div className="flex flex-col items-center text-center">
          <UploadSimple 
            weight="light" 
            className={cn('text-[var(--nexus-text-muted)] mb-4', compact ? 'w-8 h-8' : 'w-12 h-12')} 
          />

          {!compact && (
            <>
              <h3 className="text-lg font-medium text-[var(--nexus-text-primary)] mb-2">
                {isDragging ? 'Drop your files here' : 'Drag & drop files, or click to browse'}
              </h3>
              <p className="text-sm text-[var(--nexus-text-secondary)] max-w-md mb-6">
                Supports all document types: Word, Excel, PowerPoint, PDF, images, video,
                audio, code files, and more. Files are stored securely and opened in
                Nexus Editor automatically.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['DOCX', 'PDF', 'XLSX', 'PPTX', 'PNG', 'MP4', 'CSV', 'TXT'].map(ext => (
                  <span key={ext} className="px-2 py-1 text-xs font-mono rounded bg-[rgba(255,255,255,0.05)] text-[var(--nexus-text-secondary)]">
                    .{ext.toLowerCase()}
                  </span>
                ))}
                <span className="px-2 py-1 text-xs font-mono rounded bg-[rgba(255,255,255,0.05)] text-[var(--nexus-text-secondary)]">
                  + many more
                </span>
              </div>
            </>
          )}

          {compact && (
            <span className="text-sm font-medium text-[var(--nexus-text-primary)]">
              Upload or drag files
            </span>
          )}
        </div>
      </motion.div>

      {/* Upload Queue — shows per-file progress */}
      <AnimatePresence>
        {uploadQueue.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 space-y-3"
          >
            {uploadQueue.map(item => (
              <UploadQueueItem
                key={item.id}
                item={item}
                onRemove={() => removeFromQueue(item.id)}
                onOpen={() => {
                  if (item.editUrl) window.open(item.editUrl, '_self');
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-component: individual file in the queue ---

function UploadQueueItem({
  item,
  onRemove,
  onOpen,
}: {
  item: UploadingFile;
  onRemove: () => void;
  onOpen: () => void;
}) {
  const category = getFileCategory(item.file.type);
  const fileSizeLabel = formatFileSize(item.file.size);

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[var(--nexus-border)]">
      {/* File icon */}
      <FileTypeIcon category={category} className="w-8 h-8 shrink-0" />

      {/* File info + progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-[var(--nexus-text-primary)] truncate">
            {item.file.name}
          </p>
          <span className="text-xs text-[var(--nexus-text-secondary)] whitespace-nowrap ml-2">
            {fileSizeLabel}
          </span>
        </div>

        {/* Progress bar */}
        {(item.status === 'uploading' || item.status === 'processing') && (
          <div className="h-1.5 w-full bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--nexus-volt)]"
              initial={{ width: 0 }}
              animate={{ width: `${item.progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        )}

        {/* Status label */}
        <p className={cn(
          'text-xs mt-0.5',
          item.status === 'done' && 'text-[var(--nexus-volt)]',
          item.status === 'error' && 'text-[var(--nexus-rose)]',
          item.status === 'uploading' && 'text-[var(--nexus-text-muted)]',
          item.status === 'processing' && 'text-[var(--nexus-sky)]',
        )}>
          {item.status === 'pending' && 'Waiting...'}
          {item.status === 'uploading' && `Uploading... ${item.progress.toFixed(0)}%`}
          {item.status === 'processing' && 'Converting to Nexus format...'}
          {item.status === 'done' && 'Upload complete — click to open'}
          {item.status === 'error' && (item.errorMessage || 'Upload failed')}
        </p>
      </div>

      {/* Action button */}
      {item.status === 'done' ? (
        <button
          onClick={onOpen}
          className="p-2 text-[var(--nexus-volt)] hover:bg-[rgba(110,231,183,0.1)] rounded transition-colors"
          title="Open Document"
        >
          <CheckCircle weight="fill" className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={onRemove}
          className="p-2 text-[var(--nexus-text-secondary)] hover:text-[var(--nexus-rose)] hover:bg-[rgba(244,63,94,0.1)] rounded transition-colors"
          title="Cancel or Remove"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

// --- Helpers ---

function FileTypeIcon({ category, className }: { category: string; className?: string }) {
  const icons: Record<string, any> = {
    documents: FileDoc,
    pdf: FilePdf,
    spreadsheets: FileXls,
    images: ImageIcon,
    video: VideoCamera,
  };
  const Icon = icons[category] || FilePlus;
  return <Icon weight="duotone" className={cn('text-[var(--nexus-volt)]', className)} />;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
