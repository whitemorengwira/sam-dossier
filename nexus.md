# NEXUS WORKSPACE — ENHANCEMENT & PATCH BRIEF v2.0
### Mandatory Codebase Audit → Targeted Feature Injection → Zero Regression Policy
### Combining: Google Workspace × Monday.com × Adobe Acrobat Pro × Gamma AI × Real-Time Chat
### Budget: $0 Permanent — Free Tier Stack Only — PWA-First — Mobile + Desktop

---

> ## ⚠️ CRITICAL AGENT DIRECTIVE — READ BEFORE TOUCHING ANY FILE
>
> **THIS IS NOT A NEW BUILD. THIS IS ENHANCEMENT WORK ON AN EXISTING CODEBASE.**
>
> You, Antigravity, have previously built this platform. A substantial codebase already exists.
> Your job in this session is to **study what you already built first**, understand every file,
> every component, every route, every schema — and then inject the features described in this
> brief INTO the existing architecture without breaking, duplicating, or overwriting any
> working code.
>
> **The Mandatory Pre-Work Protocol (DO NOT SKIP):**
>
> 1. Run `find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | head -200` and read the output in full.
> 2. Read `package.json` — know every dependency already installed.
> 3. Read every file inside `src/app/` to map the existing route tree.
> 4. Read every file inside `src/components/` to catalogue existing components.
> 5. Read `src/lib/` or `lib/` entirely — understand all utility functions and clients.
> 6. Read all Supabase migration files in `supabase/migrations/` — know the live schema.
> 7. Read `.env.local` structure (or `.env.example`) — understand every env var already in use.
> 8. Read `tailwind.config.ts` — understand the existing design tokens and theme extensions.
> 9. Run the dev server mentally — identify what pages and features already work.
> 10. Only after completing steps 1–9, begin implementing the enhancements below.
>
> **Zero Regression Policy:** If a feature already exists, do not replace it — extend it.
> If a component already exists, do not recreate it — modify it in place.
> If a database table already exists, do not drop it — add columns or new tables only.
> If a route already exists, do not delete it — add to it or create child routes.
>
> **Conflict Resolution Rule:** When what you find in the existing code conflicts with a
> specification below, the EXISTING CODE WINS for structure, and this brief wins for
> FEATURES TO ADD. Adapt the spec to fit the existing architecture, not the other way around.

---

## TABLE OF CONTENTS

```
PHASE 0  — MANDATORY CODEBASE AUDIT PROTOCOL
PHASE 1  — ENHANCEMENT: DOCUMENT UPLOAD (ALL FILE TYPES, GOOGLE DOCS EDITING)
PHASE 2  — ENHANCEMENT: FULL RICH TEXT EDITOR (GOOGLE DOCS PARITY — TIPTAP)
PHASE 3  — ENHANCEMENT: IMAGE HANDLING INSIDE DOCUMENTS (FULL OPTIONS)
PHASE 4  — ENHANCEMENT: FULL ADOBE ACROBAT PRO FEATURE PARITY
PHASE 5  — ENHANCEMENT: E-SIGNING ENGINE (ADOBE SIGN / DOCUSIGN PARITY)
PHASE 6  — ENHANCEMENT: PRESENTATION BUILDER (GAMMA AI PARITY)
PHASE 7  — ENHANCEMENT: REAL-TIME CHAT & COLLABORATION HUB
PHASE 8  — ENHANCEMENT: USER ATTRIBUTION & EDIT TRACKING
PHASE 9  — ENHANCEMENT: TRASH CAN, DELETE FLOWS & RECOVERY SYSTEM
PHASE 10 — ENHANCEMENT: WORKSPACE MANAGEMENT (MONDAY.COM PARITY)
PHASE 11 — ENHANCEMENT: ADD NEW WORKSPACE FLOW
PHASE 12 — ENHANCEMENT: MENU & WORK AREA DELETE SYSTEM
PHASE 13 — ENHANCEMENT: PWA HARDENING & OFFLINE CAPABILITY
PHASE 14 — ENHANCEMENT: FULL MOBILE EXPERIENCE
PHASE 15 — DATABASE SCHEMA ADDITIONS (ADDITIVE ONLY — NO DROPS)
PHASE 16 — STORAGE STRATEGY FOR NEW FEATURES (FREE TIER)
PHASE 17 — COMPLETE COMPONENT ADDITIONS CATALOGUE
PHASE 18 — NEW ROUTE ADDITIONS (NON-DESTRUCTIVE)
PHASE 19 — ENVIRONMENT VARIABLES REQUIRED FOR NEW FEATURES
PHASE 20 — IMPLEMENTATION SEQUENCE & EXECUTION ORDER
```

---

# PHASE 0 — MANDATORY CODEBASE AUDIT PROTOCOL

## 0.1 What You Must Discover Before Writing a Single Line

This phase is not optional and cannot be compressed. Every command below must be executed and every output must be read in full. The goal is to build a complete mental model of the existing system before any modification begins.

### Step 0.1 — Discover the root structure

```bash
ls -la
cat package.json
cat tsconfig.json
cat tailwind.config.ts   # or tailwind.config.js
cat next.config.ts       # or next.config.mjs
```

Read every key in `package.json` — specifically `dependencies` and `devDependencies`. Build a list of what is already installed. This is critical because every package installation in this brief must be checked against this list first. If it is already installed, do not reinstall it.

### Step 0.2 — Map the full route tree

```bash
find src/app -type f | sort
# or if using pages router:
find pages -type f | sort
```

Read every `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `route.ts` file you find. Build a complete map of every URL that currently exists in the application. This prevents you from creating duplicate routes.

### Step 0.3 — Catalogue all components

```bash
find src/components -type f | sort
# or find components -type f | sort
```

Read every component file. For each one, note: its name, its props interface, what it renders, and what imports it uses. This prevents you from building duplicate components.

### Step 0.4 — Read all lib and utility files

```bash
find src/lib -type f | sort
# or find lib -type f | sort
```

Read every file. Note every exported function, every Supabase client instance, every utility. This brief will add new utility functions — you must place them alongside existing ones, not in new competing locations.

### Step 0.5 — Read the live database schema

```bash
find supabase -type f | sort
cat supabase/migrations/*.sql   # read all migration files in order
```

Build a complete picture of every table, every column, every foreign key, every index, every RLS policy already in the database. Every addition in Phase 15 must be compatible with what already exists.

### Step 0.6 — Understand the authentication model

Find how authentication is currently handled. Look for Supabase Auth usage patterns — where sessions are read, where middleware protects routes, where user objects are accessed in components. Every new feature must use the same auth pattern.

### Step 0.7 — Understand the existing design system

Read `tailwind.config.ts` fully. Note every custom colour, every custom font, every custom spacing or breakpoint. The design additions in this brief use the tokens defined below — but if the existing system already defines similar tokens under different names, use the existing names.

### Step 0.8 — Build your audit report

Before implementing anything, produce a short audit summary in a comment block at the top of a new file called `AUDIT_REPORT.md` at the project root. It should list: existing routes, existing components by category, installed packages, database tables, and any obvious gaps or inconsistencies you found. This report is for your own reference during implementation.

```markdown
# AUDIT REPORT — Generated by Antigravity Pre-Enhancement Scan

## Existing Routes Found
- [list every route]

## Existing Components Found
- [list by category]

## Packages Already Installed
- [list relevant ones]

## Database Tables Found
- [list all tables with their columns]

## Auth Pattern in Use
- [describe it]

## Design Tokens in Use
- [list custom colours, fonts]

## Gaps Identified (features partially built or missing)
- [list what is incomplete that this brief will complete]
```

---

# PHASE 1 — ENHANCEMENT: DOCUMENT UPLOAD (ALL FILE TYPES)

## 1.1 What to Look For First

Before building anything, search for existing upload functionality:

```bash
grep -r "upload" src/ --include="*.tsx" --include="*.ts" -l
grep -r "FileReader" src/ --include="*.tsx" -l
grep -r "supabase.storage" src/ --include="*.tsx" --include="*.ts" -l
grep -r "r2\|cloudflare\|R2" src/ --include="*.tsx" --include="*.ts" -l
```

If an upload system already exists, your job is to **extend it** to support the additional file types and the edit-after-upload feature. If it does not exist, build it fresh using the specification below.

## 1.2 Supported File Types (Extend Existing or Build Fresh)

The upload system must accept every one of the following file types without exception. Build the MIME type validation on the server side in an API route, and mirror it on the client side for immediate user feedback.

```typescript
// src/lib/upload/accepted-types.ts
// ADD THIS FILE if it does not exist, or ADD these exports to the existing upload config file

export const NEXUS_ACCEPTED_TYPES = {
  // Word Processing
  documents: {
    mimetypes: [
      'application/msword',                                                    // .doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/vnd.oasis.opendocument.text',                               // .odt
      'text/plain',                                                             // .txt
      'text/markdown',                                                          // .md
      'text/html',                                                              // .html
      'application/rtf',                                                        // .rtf
    ],
    extensions: ['.doc', '.docx', '.odt', '.txt', '.md', '.html', '.rtf'],
    label: 'Document',
    icon: 'FileDoc',
    maxSizeMB: 50,
  },

  // Spreadsheets
  spreadsheets: {
    mimetypes: [
      'application/vnd.ms-excel',                                              // .xls
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',    // .xlsx
      'application/vnd.oasis.opendocument.spreadsheet',                       // .ods
      'text/csv',                                                               // .csv
    ],
    extensions: ['.xls', '.xlsx', '.ods', '.csv'],
    label: 'Spreadsheet',
    icon: 'FileXls',
    maxSizeMB: 25,
  },

  // Presentations
  presentations: {
    mimetypes: [
      'application/vnd.ms-powerpoint',                                                   // .ppt
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',      // .pptx
      'application/vnd.oasis.opendocument.presentation',                                // .odp
    ],
    extensions: ['.ppt', '.pptx', '.odp'],
    label: 'Presentation',
    icon: 'Slideshow',
    maxSizeMB: 100,
  },

  // PDF
  pdf: {
    mimetypes: ['application/pdf'],
    extensions: ['.pdf'],
    label: 'PDF',
    icon: 'FilePdf',
    maxSizeMB: 100,
  },

  // Images
  images: {
    mimetypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'image/tiff',
      'image/bmp',
    ],
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.tiff', '.bmp'],
    label: 'Image',
    icon: 'Image',
    maxSizeMB: 20,
  },

  // Video (stored on R2, streamed)
  video: {
    mimetypes: ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'],
    extensions: ['.mp4', '.webm', '.ogv', '.mov'],
    label: 'Video',
    icon: 'VideoCamera',
    maxSizeMB: 500, // R2 handles large files well
  },

  // Audio
  audio: {
    mimetypes: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/webm'],
    extensions: ['.mp3', '.wav', '.ogg', '.m4a', '.webm'],
    label: 'Audio',
    icon: 'SpeakerHigh',
    maxSizeMB: 100,
  },

  // Archives
  archives: {
    mimetypes: [
      'application/zip',
      'application/x-rar-compressed',
      'application/x-7z-compressed',
      'application/x-tar',
      'application/gzip',
    ],
    extensions: ['.zip', '.rar', '.7z', '.tar', '.gz'],
    label: 'Archive',
    icon: 'FileZip',
    maxSizeMB: 200,
  },

  // Code Files
  code: {
    mimetypes: ['text/javascript', 'text/typescript', 'application/json', 'text/css', 'text/xml'],
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.css', '.xml', '.py', '.java', '.cpp', '.c', '.go', '.rs'],
    label: 'Code',
    icon: 'Code',
    maxSizeMB: 10,
  },
} as const;

// Helper: get all accepted mimetypes as flat array (for <input accept="...">)
export const ALL_ACCEPTED_MIMETYPES = Object.values(NEXUS_ACCEPTED_TYPES)
  .flatMap(type => type.mimetypes);

// Helper: get all accepted extensions
export const ALL_ACCEPTED_EXTENSIONS = Object.values(NEXUS_ACCEPTED_TYPES)
  .flatMap(type => type.extensions);

// Helper: detect file category from MIME type
export function getFileCategory(mimeType: string): string {
  for (const [category, config] of Object.entries(NEXUS_ACCEPTED_TYPES)) {
    if ((config.mimetypes as readonly string[]).includes(mimeType)) {
      return category;
    }
  }
  return 'unknown';
}

// Helper: get max size for a given MIME type
export function getMaxFileSizeMB(mimeType: string): number {
  for (const config of Object.values(NEXUS_ACCEPTED_TYPES)) {
    if ((config.mimetypes as readonly string[]).includes(mimeType)) {
      return config.maxSizeMB;
    }
  }
  return 10; // conservative default
}
```

## 1.3 The Upload Component (Google Docs–Style Drop Zone)

Search for `UploadZone`, `DropZone`, `FileUpload`, or similar in the existing components. If found, extend it. If not found, create `src/components/upload/DocumentUploadZone.tsx`:

```typescript
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
    <div className="flex flex-col gap-3 w-full">
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

        <motion.div
          animate={{ scale: isDragging ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <div className={cn(
            'rounded-full flex items-center justify-center',
            'bg-[rgba(110,231,183,0.1)]',
            compact ? 'w-10 h-10' : 'w-16 h-16'
          )}>
            <UploadSimple
              weight="duotone"
              className={cn(
                'text-[var(--nexus-volt)]',
                compact ? 'w-5 h-5' : 'w-8 h-8'
              )}
            />
          </div>

          {!compact && (
            <>
              <p className="text-[var(--nexus-text-primary)] font-medium text-base">
                {isDragging ? 'Drop your files here' : 'Drag & drop files, or click to browse'}
              </p>
              <p className="text-[var(--nexus-text-muted)] text-sm max-w-xs">
                Supports all document types: Word, Excel, PowerPoint, PDF, images, video,
                audio, code files, and more. Files are stored securely and opened in
                Nexus Editor automatically.
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-1">
                {['DOCX', 'PDF', 'XLSX', 'PPTX', 'PNG', 'MP4', 'CSV', 'TXT'].map(ext => (
                  <span
                    key={ext}
                    className="text-xs px-2 py-0.5 rounded-full bg-[var(--nexus-border)]
                               text-[var(--nexus-text-secondary)] font-mono"
                  >
                    .{ext.toLowerCase()}
                  </span>
                ))}
                <span className="text-xs px-2 py-0.5 text-[var(--nexus-text-muted)]">
                  + many more
                </span>
              </div>
            </>
          )}

          {compact && (
            <p className="text-sm text-[var(--nexus-text-secondary)]">
              Upload or drag files
            </p>
          )}
        </motion.div>
      </motion.div>

      {/* Upload Queue — shows per-file progress */}
      <AnimatePresence>
        {uploadQueue.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-2"
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
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={cn(
        'flex items-center gap-3 p-3 rounded-[var(--nexus-radius-md)]',
        'bg-[var(--nexus-surface)] border border-[var(--nexus-border)]'
      )}
    >
      {/* File icon */}
      <FileTypeIcon category={category} className="w-8 h-8 shrink-0" />

      {/* File info + progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-[var(--nexus-text-primary)] truncate">
            {item.file.name}
          </span>
          <span className="text-xs text-[var(--nexus-text-muted)] shrink-0 ml-2">
            {fileSizeLabel}
          </span>
        </div>

        {/* Progress bar */}
        {(item.status === 'uploading' || item.status === 'processing') && (
          <div className="h-1 bg-[var(--nexus-border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--nexus-volt)] rounded-full"
              animate={{ width: `${item.progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
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
          {item.status === 'uploading' && `Uploading... ${item.progress}%`}
          {item.status === 'processing' && 'Converting to Nexus format...'}
          {item.status === 'done' && 'Upload complete — click to open'}
          {item.status === 'error' && (item.errorMessage || 'Upload failed')}
        </p>
      </div>

      {/* Action button */}
      {item.status === 'done' ? (
        <button
          onClick={onOpen}
          className={cn(
            'text-xs px-3 py-1.5 rounded-[var(--nexus-radius-sm)] shrink-0',
            'bg-[rgba(110,231,183,0.1)] text-[var(--nexus-volt)]',
            'hover:bg-[rgba(110,231,183,0.2)] transition-colors'
          )}
        >
          Open
        </button>
      ) : (
        <button
          onClick={onRemove}
          className="text-[var(--nexus-text-muted)] hover:text-[var(--nexus-rose)]
                     transition-colors shrink-0"
          aria-label="Remove from queue"
        >
          <X weight="bold" className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}

// --- Helpers ---

function FileTypeIcon({ category, className }: { category: string; className?: string }) {
  const icons: Record<string, React.ElementType> = {
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
```

## 1.4 The Upload Hook (Connects to Storage)

Create `src/hooks/useUploadDocument.ts`. This hook handles the actual upload to Cloudflare R2 via a signed URL, the document record creation in Supabase, and the conversion of DOCX/XLSX/PPTX files to a Nexus-editable format using server-side processing.

```typescript
// src/hooks/useUploadDocument.ts
// This hook abstracts the entire upload pipeline:
// 1. Request a signed upload URL from our API (which issues R2 signed URLs)
// 2. Upload the file directly from browser to R2 using the signed URL
// 3. Notify our API that upload is done so it can create the Supabase document record
// 4. Trigger server-side conversion if the file is a DOCX, XLSX, or PPTX
// 5. Return the document ID and edit URL

import { useState, useCallback } from 'react';
import { useSupabaseClient } from '@/lib/supabase/client'; // use existing client

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
  const supabase = useSupabaseClient();

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
        onProgress(e.loaded / e.total);
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
```

## 1.5 API Routes for Upload (Server Side)

### Route: `POST /api/upload/signed-url`

Create `src/app/api/upload/signed-url/route.ts`. This issues a Cloudflare R2 presigned URL so the browser can upload directly to R2 without routing file bytes through Vercel (which would eat into bandwidth limits and slow things down).

```typescript
// src/app/api/upload/signed-url/route.ts
// Issues a presigned PUT URL for direct browser-to-R2 upload.
// Validates auth, validates file type, builds R2 key, stores upload intent in Supabase.

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getFileCategory, getMaxFileSizeMB, ALL_ACCEPTED_MIMETYPES } from '@/lib/upload/accepted-types';
import { z } from 'zod';

// R2 client — using AWS SDK S3-compatible API with R2 credentials
const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT!, // https://<accountid>.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

const RequestSchema = z.object({
  fileName: z.string().min(1).max(500),
  fileType: z.string().min(1),
  fileSize: z.number().positive(),
  workspaceId: z.string().uuid(),
  folderId: z.string().uuid().optional(),
});

export async function POST(request: NextRequest) {
  // Authenticate
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  // Validate request body
  const body = await request.json();
  const parsed = RequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.format() }, { status: 400 });
  }

  const { fileName, fileType, fileSize, workspaceId, folderId } = parsed.data;

  // Validate file type
  if (!ALL_ACCEPTED_MIMETYPES.includes(fileType)) {
    return NextResponse.json({ error: `File type "${fileType}" is not supported.` }, { status: 422 });
  }

  // Validate file size
  const maxSizeMB = getMaxFileSizeMB(fileType);
  const fileSizeMB = fileSize / (1024 * 1024);
  if (fileSizeMB > maxSizeMB) {
    return NextResponse.json({ error: `File exceeds ${maxSizeMB}MB limit.` }, { status: 422 });
  }

  // Verify user has access to this workspace
  const { data: workspace, error: wsError } = await supabase
    .from('workspaces')
    .select('id')
    .eq('id', workspaceId)
    .single();

  if (wsError || !workspace) {
    return NextResponse.json({ error: 'Workspace not found or access denied.' }, { status: 403 });
  }

  // Build the R2 storage key
  // Pattern: workspaces/{workspaceId}/documents/{year}/{month}/{uuid}/{sanitized-filename}
  const uploadId = crypto.randomUUID();
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase();
  const storagePath = `workspaces/${workspaceId}/documents/${year}/${month}/${uploadId}/${sanitizedName}`;

  // Create presigned URL (expires in 15 minutes)
  const command = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
    Key: storagePath,
    ContentType: fileType,
    ContentLength: fileSize,
    Metadata: {
      'uploaded-by': user.id,
      'workspace-id': workspaceId,
      'original-name': encodeURIComponent(fileName),
    },
  });

  const signedUrl = await getSignedUrl(r2Client, command, { expiresIn: 900 });

  // Store upload intent in Supabase so /api/upload/complete can reference it
  await supabase.from('upload_intents').insert({
    id: uploadId,
    user_id: user.id,
    workspace_id: workspaceId,
    folder_id: folderId || null,
    storage_path: storagePath,
    original_file_name: fileName,
    file_type: fileType,
    file_size: fileSize,
    file_category: getFileCategory(fileType),
    status: 'pending',
    expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
  });

  return NextResponse.json({
    signedUrl,
    storagePath,
    uploadId,
  });
}
```

### Route: `POST /api/upload/complete`

Create `src/app/api/upload/complete/route.ts`. Called after browser finishes uploading to R2. Creates the document record in Supabase and queues conversion if needed.

```typescript
// src/app/api/upload/complete/route.ts
// Called once the browser has confirmed the R2 upload is done.
// Creates the document record in the DB.
// Queues a background conversion job for DOCX/XLSX/PPTX files.

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
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
  const supabase = createRouteHandlerClient({ cookies });
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
      // For PDF files — they are viewed/edited directly; no conversion needed
      // For images — they are displayed directly
      // For DOCX/XLSX/PPTX — they get converted to our editor format
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
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/documents/${document.id}/convert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-key': process.env.INTERNAL_API_KEY!, // secret for server-to-server calls
      },
    });
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
```

---

# PHASE 2 — ENHANCEMENT: FULL RICH TEXT EDITOR (GOOGLE DOCS PARITY)

## 2.1 Audit First

Search for existing editor usage before building:

```bash
grep -r "tiptap\|prosemirror\|quill\|slate\|Editor" src/ --include="*.tsx" --include="*.ts" -l
```

If TipTap is already installed, check which extensions are in use. The goal is to **add missing extensions**, not reinstall those already there. Check `package.json` for `@tiptap/*` packages.

## 2.2 Required TipTap Extensions (Install Only Missing Ones)

```bash
# Only install packages NOT already in package.json
npm install \
  @tiptap/react \
  @tiptap/pm \
  @tiptap/starter-kit \
  @tiptap/extension-collaboration \
  @tiptap/extension-collaboration-cursor \
  @tiptap/extension-character-count \
  @tiptap/extension-color \
  @tiptap/extension-focus \
  @tiptap/extension-font-family \
  @tiptap/extension-highlight \
  @tiptap/extension-image \
  @tiptap/extension-link \
  @tiptap/extension-mention \
  @tiptap/extension-placeholder \
  @tiptap/extension-table \
  @tiptap/extension-table-cell \
  @tiptap/extension-table-header \
  @tiptap/extension-table-row \
  @tiptap/extension-task-item \
  @tiptap/extension-task-list \
  @tiptap/extension-text-align \
  @tiptap/extension-text-style \
  @tiptap/extension-typography \
  @tiptap/extension-underline \
  @tiptap/extension-subscript \
  @tiptap/extension-superscript \
  yjs \
  y-webrtc \
  y-indexeddb \
  @hocuspocus/provider
```

## 2.3 Editor Configuration File

Create or update `src/lib/editor/editor-config.ts`:

```typescript
// src/lib/editor/editor-config.ts
// Central configuration for the Nexus rich text editor.
// If this file already exists, merge these settings in. Do not replace.

import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import CharacterCount from '@tiptap/extension-character-count';
import Color from '@tiptap/extension-color';
import Focus from '@tiptap/extension-focus';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from '@tiptap/extension-highlight';
import { NexusImage } from './extensions/NexusImage';       // custom image extension (Phase 3)
import Link from '@tiptap/extension-link';
import Mention from '@tiptap/extension-mention';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';';
import Superscript from '@tiptap/extension-superscript';
import { NexusPageBreak } from './extensions/NexusPageBreak';  // custom
import { NexusComment } from './extensions/NexusComment';      // custom (for inline comments)
import { NexusFontSize } from './extensions/NexusFontSize';    // custom
import { NexusLineHeight } from './extensions/NexusLineHeight'; // custom
import type { Doc as YDoc } from 'yjs';

export interface EditorConfigOptions {
  ydoc?: YDoc;              // for collaborative mode
  userInfo?: {
    name: string;
    color: string;
    avatarUrl?: string;
  };
  placeholder?: string;
  mode?: 'document' | 'comment' | 'minimal'; // different extension sets per mode
}

export function buildEditorExtensions(options: EditorConfigOptions = {}) {
  const { ydoc, userInfo, placeholder, mode = 'document' } = options;

  // Base extensions always included
  const base = [
    StarterKit.configure({
      history: !ydoc, // disable history when using Y.js (Y.js handles undo/redo)
      heading: { levels: [1, 2, 3, 4, 5, 6] },
      bulletList: { keepMarks: true, keepAttributes: true },
      orderedList: { keepMarks: true, keepAttributes: true },
    }),
    TextStyle,
    Color.configure({ types: ['textStyle'] }),
    Highlight.configure({ multicolor: true }),
    Underline,
    Subscript,
    Superscript,
    Typography,
    Focus.configure({ className: 'nexus-editor-focused', mode: 'shallowest' }),
    Placeholder.configure({
      placeholder: placeholder ?? 'Start writing, or press "/" for commands...',
      emptyNodeClass: 'nexus-editor-empty',
    }),
    Link.configure({
      openOnClick: false, // we open on Cmd+Click only
      HTMLAttributes: {
        class: 'nexus-editor-link',
        rel: 'noopener noreferrer',
      },
      autolink: true,
    }),
    TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
    FontFamily,
    NexusFontSize,
    NexusLineHeight,
    CharacterCount,
  ];

  // Document-mode extensions (full Google Docs parity)
  const documentExtensions = mode === 'document' ? [
    NexusImage,          // handles layout modes, resize, caption — Phase 3
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    TaskList,
    TaskItem.configure({ nested: true }),
    Mention.configure({
      HTMLAttributes: { class: 'nexus-mention' },
      suggestion: {
        // suggestion config connects to workspace member list
        // implementation: see src/lib/editor/mention-suggestion.ts
      },
    }),
    NexusPageBreak,
    NexusComment,
  ] : [];

  // Collaboration extensions (only when Y.js doc is provided)
  const collaborationExtensions = ydoc ? [
    Collaboration.configure({ document: ydoc }),
    CollaborationCursor.configure({
      provider: null, // provider is injected at runtime from the editor component
      user: userInfo ?? { name: 'Anonymous', color: '#6EE7B7' },
    }),
  ] : [];

  return [...base, ...documentExtensions, ...collaborationExtensions];
}

// Google Docs–equivalent toolbar actions
// This is used by the toolbar component to know which commands are available
export const TOOLBAR_GROUPS = [
  {
    group: 'history',
    items: ['undo', 'redo'],
  },
  {
    group: 'text-style',
    items: ['bold', 'italic', 'underline', 'strikethrough', 'code'],
  },
  {
    group: 'format',
    items: ['heading1', 'heading2', 'heading3', 'paragraph', 'blockquote'],
  },
  {
    group: 'font',
    items: ['fontFamily', 'fontSize', 'textColor', 'highlight'],
  },
  {
    group: 'align',
    items: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
  },
  {
    group: 'lists',
    items: ['bulletList', 'orderedList', 'taskList'],
  },
  {
    group: 'insert',
    items: ['table', 'image', 'link', 'horizontalRule', 'pageBreak'],
  },
  {
    group: 'advanced',
    items: ['subscript', 'superscript', 'lineHeight', 'comment'],
  },
] as const;
```

## 2.4 The Main Editor Component

Create `src/components/editor/NexusEditor.tsx`. This is the full-featured document editor component with:
- Google Docs–style page layout (A4/Letter white page on grey background)
- Floating toolbar that appears on text selection (like Google Docs)
- Fixed toolbar at the top
- Word count in footer
- Collaboration cursors for multiple users
- Margin guides
- Zoom controls
- Print stylesheet support

```typescript
// src/components/editor/NexusEditor.tsx
// The main document editor. Wraps TipTap with the full Nexus UI.
// Supports: solo editing, collaborative editing, read-only view, print mode.

'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';
import { buildEditorExtensions } from '@/lib/editor/editor-config';
import { EditorToolbar } from './EditorToolbar';
import { FloatingToolbar } from './FloatingToolbar';
import { EditorFooter } from './EditorFooter';
import { CommentsSidebar } from './CommentsSidebar';
import { EditorBubbleMenu } from './EditorBubbleMenu';
import { TableBubbleMenu } from './TableBubbleMenu';
import { ImageBubbleMenu } from './ImageBubbleMenu';
import { useDocumentStore } from '@/stores/documentStore'; // existing or new Zustand store
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { CURSOR_COLORS } from '@/lib/editor/cursor-colors';
import { cn } from '@/lib/utils';

// Generate a deterministic cursor colour from user ID
function getCursorColor(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return CURSOR_COLORS[Math.abs(hash) % CURSOR_COLORS.length];
}

interface NexusEditorProps {
  documentId: string;
  initialContent?: string;          // JSON string of TipTap document
  readOnly?: boolean;
  collaborative?: boolean;
  pageSize?: 'A4' | 'Letter' | 'A3' | 'Legal';
  onContentChange?: (json: string, html: string) => void;
}

export function NexusEditor({
  documentId,
  initialContent,
  readOnly = false,
  collaborative = true,
  pageSize = 'A4',
  onContentChange,
}: NexusEditorProps) {
  const { user } = useCurrentUser();
  const [showComments, setShowComments] = useState(false);
  const [zoom, setZoom] = useState(100); // zoom percentage
  const [isReady, setIsReady] = useState(false);
  const ydocRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<WebrtcProvider | null>(null);
  const persistenceRef = useRef<IndexeddbPersistence | null>(null);

  // Set up Y.js collaborative document
  useEffect(() => {
    if (!collaborative || !user) return;

    // Y.js document — one per Nexus document
    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;

    // IndexedDB persistence — offline support (free, browser-native)
    const persistence = new IndexeddbPersistence(`nexus-doc-${documentId}`, ydoc);
    persistenceRef.current = persistence;

    // WebRTC provider for real-time sync between peers in same room
    // Room name is the document ID — only users with access open this room
    const provider = new WebrtcProvider(`nexus-${documentId}`, ydoc, {
      signaling: ['wss://signaling.yjs.dev'], // free public signaling server
      password: documentId,                   // basic room security
    });
    providerRef.current = provider;

    persistence.on('synced', () => setIsReady(true));

    return () => {
      provider.destroy();
      persistence.destroy();
      ydoc.destroy();
    };
  }, [documentId, collaborative, user]);

  const editor = useEditor({
    extensions: buildEditorExtensions({
      ydoc: collaborative ? ydocRef.current ?? undefined : undefined,
      userInfo: user ? {
        name: user.user_metadata?.full_name || user.email || 'Anonymous',
        color: getCursorColor(user.id),
        avatarUrl: user.user_metadata?.avatar_url,
      } : undefined,
      placeholder: 'Start writing, or type "/" for a menu of formatting and insert options...',
    }),
    content: initialContent ? JSON.parse(initialContent) : undefined,
    editable: !readOnly,
    immediatelyRender: false, // SSR safety
    onUpdate: ({ editor }) => {
      const json = JSON.stringify(editor.getJSON());
      const html = editor.getHTML();
      onContentChange?.(json, html);
    },
  });

  // Page size dimensions (in mm, converted to px at 96dpi)
  const PAGE_SIZES = {
    A4:     { width: 794,  height: 1123 },
    Letter: { width: 816,  height: 1056 },
    A3:     { width: 1123, height: 1587 },
    Legal:  { width: 816,  height: 1344 },
  };
  const page = PAGE_SIZES[pageSize];

  return (
    <div className="flex flex-col h-full bg-[#E8EAED]"> {/* Google Docs grey background */}

      {/* Fixed toolbar at top */}
      {!readOnly && editor && (
        <EditorToolbar
          editor={editor}
          documentId={documentId}
          onToggleComments={() => setShowComments(v => !v)}
          zoom={zoom}
          onZoomChange={setZoom}
          pageSize={pageSize}
        />
      )}

      {/* Editor canvas area — scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-auto flex justify-center py-8 px-4">

        {/* Side-by-side: editor page + comments panel */}
        <div className="flex gap-6 items-start">

          {/* The "page" — white sheet on grey background */}
          <div
            className="nexus-editor-page bg-white shadow-xl rounded-sm relative"
            style={{
              width: `${page.width * (zoom / 100)}px`,
              minHeight: `${page.height * (zoom / 100)}px`,
              padding: `${96 * (zoom / 100)}px`,  // 1-inch margins
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
            }}
          >
            {/* Ruler — Google Docs style */}
            <EditorRuler width={page.width - 192} zoom={zoom} />

            {/* TipTap content */}
            <EditorContent
              editor={editor}
              className={cn(
                'nexus-prosemirror-root',
                'prose prose-slate max-w-none',
                'focus:outline-none',
                // Typography matching Google Docs defaults
                '[&_.ProseMirror]:outline-none',
                '[&_.ProseMirror]:min-h-[200px]',
                '[&_p]:my-1.5',
                '[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3',
                '[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2',
                '[&_h3]:text-xl  [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2',
                '[&_table]:border-collapse [&_table]:w-full',
                '[&_td]:border [&_td]:border-gray-300 [&_td]:p-2',
                '[&_th]:border [&_th]:border-gray-400 [&_th]:p-2 [&_th]:bg-gray-100',
                '[&_.nexus-mention]:text-blue-600 [&_.nexus-mention]:bg-blue-50 [&_.nexus-mention]:rounded [&_.nexus-mention]:px-1',
                '[&_.nexus-editor-link]:text-blue-600 [&_.nexus-editor-link]:underline',
                // Task list styling
                '[&_ul[data-type=taskList]]:list-none [&_ul[data-type=taskList]]:pl-0',
                '[&_li[data-type=taskItem]]:flex [&_li[data-type=taskItem]]:gap-2',
              )}
            />

            {/* Floating bubble menus */}
            {editor && !readOnly && (
              <>
                <EditorBubbleMenu editor={editor} />
                <TableBubbleMenu editor={editor} />
                <ImageBubbleMenu editor={editor} />
              </>
            )}
          </div>

          {/* Comments sidebar — slides in from right */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                className="w-72 shrink-0"
              >
                <CommentsSidebar documentId={documentId} editor={editor} />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Footer: word count, save status, collaboration indicators */}
      {editor && (
        <EditorFooter editor={editor} documentId={documentId} />
      )}

    </div>
  );
}

// Simple ruler component (mimics Google Docs ruler)
function EditorRuler({ width, zoom }: { width: number; zoom: number }) {
  return (
    <div
      className="absolute top-0 left-0 h-6 bg-gray-50 border-b border-gray-200 text-[10px]
                 text-gray-400 flex items-end pointer-events-none overflow-hidden"
      style={{ width: `${width * (zoom / 100)}px` }}
    >
      {/* Tick marks every half-inch */}
      {Array.from({ length: Math.floor(width / 48) }).map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 flex flex-col items-center"
          style={{ left: `${i * 48 * (zoom / 100)}px` }}
        >
          <span className="mb-0.5">{i > 0 ? i : ''}</span>
          <div className="w-px h-1.5 bg-gray-400" />
        </div>
      ))}
    </div>
  );
}
```

---

# PHASE 3 — ENHANCEMENT: IMAGE HANDLING INSIDE DOCUMENTS

## 3.1 All Required Image Layout Options

Every image inserted into a document must support the full set of layout options that Google Docs offers, and additionally the text-wrap options from Microsoft Word. These are:

- **Inline with text** — image sits in the text flow, baseline-aligned
- **Wrap text** — text wraps around the image (left-float, right-float)
- **Break text** — image sits on its own line with text above and below
- **Behind text** — image renders below the text layer (like a watermark)
- **In front of text** — image renders above the text layer (floating)
- **Top and bottom** — image is centred with text above and below, full width

Additionally every image must support:
- Drag-to-resize with corner and edge handles
- Click-to-select with delete key to remove
- Right-click context menu with: Cut, Copy, Delete, Replace Image, Image Properties
- Caption below image (editable inline)
- Alt text editing (for accessibility)
- Border controls: colour, width, style, radius
- Drop shadow controls
- Opacity control (0–100%)
- Crop tool (non-destructive — stores crop rect in document, original stays in R2)
- Flip horizontal / Flip vertical
- Rotate (free rotate + snap to 90-degree increments)
- Link wrapping (image becomes a hyperlink)
- "Replace Image" — pick new file without losing position and layout settings

## 3.2 Custom TipTap Image Extension

Create `src/lib/editor/extensions/NexusImage.ts`:

```typescript
// src/lib/editor/extensions/NexusImage.ts
// Extends TipTap's built-in Image extension with Nexus-specific layout attributes.
// Stores layout metadata as node attributes — not as inline styles — so it can be
// serialised cleanly to JSON and reconstructed on load.

import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { NexusImageView } from '@/components/editor/NexusImageView'; // see below

export type ImageLayout =
  | 'inline'
  | 'wrap-left'
  | 'wrap-right'
  | 'break-text'
  | 'behind-text'
  | 'in-front-text'
  | 'top-bottom';

export interface NexusImageAttrs {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
  layout: ImageLayout;
  width?: number;           // px
  height?: number;          // px
  cropX?: number;           // % from left
  cropY?: number;           // % from top
  cropWidth?: number;       // % width of crop area
  cropHeight?: number;      // % height of crop area
  rotation?: number;        // degrees
  flipH?: boolean;
  flipV?: boolean;
  opacity?: number;         // 0–100
  borderColor?: string;
  borderWidth?: number;     // px
  borderStyle?: string;     // solid | dashed | dotted | none
  borderRadius?: number;    // px
  shadow?: boolean;
  shadowX?: number;
  shadowY?: number;
  shadowBlur?: number;
  shadowColor?: string;
  linkHref?: string;        // if image is a link
  documentId?: string;      // Nexus document this belongs to (for audit trail)
  storageKey?: string;      // R2 storage key (used for replacement)
}

export const NexusImage = Node.create({
  name: 'nexusImage',
  group: 'block inline',  // can be both depending on layout
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src:          { default: null },
      alt:          { default: '' },
      title:        { default: '' },
      caption:      { default: '' },
      layout:       { default: 'inline' },
      width:        { default: null },
      height:       { default: null },
      cropX:        { default: 0 },
      cropY:        { default: 0 },
      cropWidth:    { default: 100 },
      cropHeight:   { default: 100 },
      rotation:     { default: 0 },
      flipH:        { default: false },
      flipV:        { default: false },
      opacity:      { default: 100 },
      borderColor:  { default: 'transparent' },
      borderWidth:  { default: 0 },
      borderStyle:  { default: 'solid' },
      borderRadius: { default: 0 },
      shadow:       { default: false },
      shadowX:      { default: 4 },
      shadowY:      { default: 4 },
      shadowBlur:   { default: 16 },
      shadowColor:  { default: 'rgba(0,0,0,0.3)' },
      linkHref:     { default: null },
      storageKey:   { default: null },
    };
  },

  parseHTML() {
    return [{ tag: 'nexus-image' }];
  },

  renderHTML({ node, HTMLAttributes }) {
    return ['nexus-image', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    // Delegates rendering to a React component for full interactivity
    return ReactNodeViewRenderer(NexusImageView);
  },

  addCommands() {
    return {
      insertNexusImage: (attrs: Partial<NexusImageAttrs>) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: { layout: 'inline', ...attrs },
        });
      },
      updateImageLayout: (layout: ImageLayout) => ({ commands }) => {
        return commands.updateAttributes(this.name, { layout });
      },
    };
  },
});
```

## 3.3 Image View Component (React Node View)

Create `src/components/editor/NexusImageView.tsx`. This is the React component that TipTap renders for every image node. It handles: selection state, resize handles, the image options panel, and the inline caption.

The full implementation of this component includes:
- A wrapping `<div>` whose CSS class changes based on the `layout` attribute (controlling float, position, z-index)
- A `<img>` element rendered with the crop/rotation/flip/opacity CSS transforms
- Eight resize handles (corners + edges) connected to pointer events for drag-resize
- Selection ring that appears when the image is selected
- A floating options bar that appears above the image on hover/select with layout, wrap, and action buttons
- An inline caption below the image that is contenteditable when the image is selected
- A right-click context menu

This component is complex — approximately 350 lines. Build it in full with all the above functionality. The image options bar must contain buttons in this exact order: Layout selector (6 icons), | Crop | Rotate Left | Rotate Right | Flip H | Flip V | | Border | Shadow | Opacity | | Replace | Delete.

---

# PHASE 4 — ENHANCEMENT: FULL ADOBE ACROBAT PRO FEATURE PARITY

## 4.1 Audit First

```bash
grep -r "pdf\|PDF\|pdfjs\|pdf-lib\|jspdf" src/ --include="*.tsx" --include="*.ts" -l
```

Understand what PDF handling already exists. Look for existing PDF viewer, PDF editor, or annotation components. Enhance what exists; build fresh where nothing exists.

## 4.2 PDF Viewer & Editor Route

The PDF editor lives at `/workspace/pdf/[documentId]`. Create this route if it does not exist. It must support:

**Viewing capabilities (Adobe Reader parity):**
- Full-page PDF rendering via PDF.js (all pages, lazy-loaded)
- Page thumbnails sidebar (left panel, like Acrobat)
- Bookmarks / outline sidebar (right panel toggle)
- Text selection and copy
- Find & replace (Ctrl+F) with match highlighting across all pages
- Page navigation: first, previous, next, last, jump to page number
- Zoom: fit page, fit width, actual size, percentage, pinch-to-zoom on touch
- Rotate pages: clockwise, counterclockwise (non-destructive)
- Print (opens browser print with correct page setup)
- Download original file from R2

**Editing capabilities (Adobe Acrobat Pro parity):**
- Add text box: click anywhere on any page, type, style text (font, size, colour, bold, italic)
- Edit existing text (using PDF-lib for text detection and editing)
- Add shapes: rectangle, circle, line, arrow, polygon — with fill and stroke options
- Highlight text (yellow, green, blue, pink, orange — like Acrobat highlighting tool)
- Underline text
- Strikethrough text
- Add sticky note / comment bubble (click to place, type comment, attach to page position)
- Add image overlay: insert image at any position, resize, move
- Whiteout / redaction: draw white/black rectangle to cover text (non-reversible redaction)
- Add signature field placeholder (for e-sign workflow — Phase 5)
- Reorder pages: drag thumbnails in sidebar to reorder
- Delete pages: right-click thumbnail → Delete page
- Extract pages: right-click thumbnail → Extract to new document
- Insert pages: from another PDF or blank
- Merge PDFs: drag another PDF onto the viewer or use Insert menu
- Split PDF: right-click page → Split PDF here (creates two new documents)
- Rotate individual pages
- Crop page (adjusts visible area — non-destructive, stores crop rect)
- Compress PDF (re-encodes images at lower quality)
- OCR scanned PDF (Tesseract.js — converts scanned image PDFs to searchable text)
- Reduce file size report
- Document properties panel (title, author, subject, keywords, creation date)
- Accessibility checker (headings, alt text, reading order)

## 4.3 PDF Editor Architecture

The PDF editor uses a **layered canvas approach**:
- **Layer 0 (Base):** PDF.js renders each page as a `<canvas>` element (read-only PDF pixel rendering)
- **Layer 1 (Text):** PDF.js text layer provides selectable, searchable text
- **Layer 2 (Annotation):** Fabric.js canvas overlay aligned precisely over the PDF canvas, where all annotations (text boxes, shapes, highlights, signatures) are drawn
- **Layer 3 (UI):** React components for controls, menus, panels

This three-layer system allows us to: render the original PDF fidelity, support text operations, and layer interactive annotations on top, all without modifying the original PDF file until the user explicitly saves.

The Fabric.js canvas (Layer 2) serialises all annotations to JSON. On save, `pdf-lib` reads the original PDF from R2, applies the annotations using pdf-lib's drawing API, and produces a new PDF version which is saved back to R2 as a new version (version history is tracked in Supabase).

## 4.4 PDF Editor Component Skeleton

Create `src/components/pdf/PDFEditor.tsx`:

```typescript
// src/components/pdf/PDFEditor.tsx
// Full Adobe Acrobat Pro–parity PDF editor.
// Architecture: PDF.js base rendering + Fabric.js annotation overlay.
// All edits are non-destructive until saved; saved files produce new versions.

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import { fabric } from 'fabric';
import { PDFToolbar } from './PDFToolbar';
import { PDFThumbnailSidebar } from './PDFThumbnailSidebar';
import { PDFOutlineSidebar } from './PDFOutlineSidebar';
import { PDFCommentPanel } from './PDFCommentPanel';
import { PDFSignatureFieldPlacer } from './PDFSignatureFieldPlacer';
import { PDFPropertiesPanel } from './PDFPropertiesPanel';
import { usePDFSave } from '@/hooks/usePDFSave';
import { usePDFOCR } from '@/hooks/usePDFOCR';
import { cn } from '@/lib/utils';

// Set the PDF.js worker path (must be served from public dir)
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export type PDFTool =
  | 'select'          // default — select/move annotations
  | 'text'            // add text box
  | 'highlight'       // highlight text
  | 'underline'       // underline text
  | 'strikethrough'   // strikethrough text
  | 'rectangle'       // draw rectangle shape
  | 'circle'          // draw circle shape
  | 'line'            // draw line
  | 'arrow'           // draw arrow
  | 'freehand'        // freehand pen drawing
  | 'sticky-note'     // add a comment bubble
  | 'signature'       // place a signature field
  | 'image'           // insert image overlay
  | 'whiteout'        // add white rectangle (redaction)
  | 'redact'          // add black rectangle (hard redaction)
  | 'eraser';         // erase annotation objects

interface PDFEditorProps {
  documentId: string;
  pdfUrl: string;       // R2 URL of the PDF file
  readOnly?: boolean;
}

interface PageState {
  page: PDFPageProxy;
  canvas: HTMLCanvasElement;
  fabricCanvas: fabric.Canvas;
  annotations: fabric.Object[]; // current page's annotation objects
  rendered: boolean;
}

export function PDFEditor({ documentId, pdfUrl, readOnly = false }: PDFEditorProps) {
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [activeTool, setActiveTool] = useState<PDFTool>('select');
  const [activeColor, setActiveColor] = useState('#FBBF24'); // amber for highlights
  const [leftPanel, setLeftPanel] = useState<'thumbnails' | 'outline' | null>('thumbnails');
  const [rightPanel, setRightPanel] = useState<'comments' | 'properties' | 'sign' | null>(null);
  const [pageOrder, setPageOrder] = useState<number[]>([]); // for page reordering
  const pagesContainerRef = useRef<HTMLDivElement>(null);
  const pageStatesRef = useRef<Map<number, PageState>>(new Map());
  const { savePDF, isSaving } = usePDFSave(documentId);
  const { runOCR, ocrProgress } = usePDFOCR();

  // Load the PDF
  useEffect(() => {
    const loadPDF = async () => {
      const pdf = await pdfjsLib.getDocument({
        url: pdfUrl,
        cMapUrl: '/cmaps/',   // character maps for international PDFs
        cMapPacked: true,
      }).promise;

      setPdfDoc(pdf);
      setNumPages(pdf.numPages);
      setPageOrder(Array.from({ length: pdf.numPages }, (_, i) => i + 1));
    };

    loadPDF();
  }, [pdfUrl]);

  // Tool cursor mapping (shows appropriate cursor per active tool)
  const toolCursors: Record<PDFTool, string> = {
    select:        'default',
    text:          'text',
    highlight:     'crosshair',
    underline:     'crosshair',
    strikethrough: 'crosshair',
    rectangle:     'crosshair',
    circle:        'crosshair',
    line:          'crosshair',
    arrow:         'crosshair',
    freehand:      'url("/cursors/pen.svg"), crosshair',
    'sticky-note': 'copy',
    signature:     'copy',
    image:         'copy',
    whiteout:      'crosshair',
    redact:        'crosshair',
    eraser:        'url("/cursors/eraser.svg"), crosshair',
  };

  // Collect all annotations from all pages for saving
  const getAllAnnotations = useCallback(() => {
    const all: Record<number, object[]> = {};
    for (const [pageNum, state] of pageStatesRef.current.entries()) {
      all[pageNum] = state.fabricCanvas.toJSON().objects;
    }
    return all;
  }, []);

  // Handle save — merges annotations into PDF via api route
  const handleSave = async () => {
    const annotations = getAllAnnotations();
    await savePDF({ annotations, pageOrder, zoom });
  };

  return (
    <div className="flex flex-col h-full bg-[#404040]" style={{ cursor: toolCursors[activeTool] }}>

      {/* Top toolbar */}
      <PDFToolbar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        activeColor={activeColor}
        onColorChange={setActiveColor}
        zoom={zoom}
        onZoomChange={setZoom}
        numPages={numPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        leftPanel={leftPanel}
        onLeftPanelToggle={(panel) => setLeftPanel(v => v === panel ? null : panel)}
        rightPanel={rightPanel}
        onRightPanelToggle={(panel) => setRightPanel(v => v === panel ? null : panel)}
        onSave={handleSave}
        isSaving={isSaving}
        onOCR={() => pdfDoc && runOCR(pdfDoc, documentId)}
        readOnly={readOnly}
      />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left panel: thumbnails or outline */}
        <AnimatePresence>
          {leftPanel && pdfDoc && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 220 }}
              exit={{ width: 0 }}
              className="bg-[#303030] border-r border-[#555] overflow-y-auto shrink-0"
            >
              {leftPanel === 'thumbnails' && (
                <PDFThumbnailSidebar
                  pdfDoc={pdfDoc}
                  numPages={numPages}
                  currentPage={currentPage}
                  pageOrder={pageOrder}
                  onPageClick={setCurrentPage}
                  onPageOrderChange={setPageOrder}
                  onDeletePage={(pageNum) => {
                    setPageOrder(prev => prev.filter(p => p !== pageNum));
                  }}
                />
              )}
              {leftPanel === 'outline' && (
                <PDFOutlineSidebar
                  pdfDoc={pdfDoc}
                  onHeadingClick={setCurrentPage}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* PDF pages scroll area */}
        <div
          ref={pagesContainerRef}
          className="flex-1 overflow-y-auto flex flex-col items-center py-6 gap-4"
        >
          {pdfDoc && pageOrder.map((originalPageNum) => (
            <PDFPage
              key={`page-${originalPageNum}`}
              pdfDoc={pdfDoc}
              pageNumber={originalPageNum}
              zoom={zoom}
              activeTool={activeTool}
              activeColor={activeColor}
              readOnly={readOnly}
              isCurrentPage={currentPage === originalPageNum}
              onPageClick={() => setCurrentPage(originalPageNum)}
              onPageStateReady={(state) => {
                pageStatesRef.current.set(originalPageNum, state);
              }}
            />
          ))}
        </div>

        {/* Right panel: comments, properties, or signing */}
        <AnimatePresence>
          {rightPanel && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 300 }}
              exit={{ width: 0 }}
              className="bg-[var(--nexus-surface)] border-l border-[var(--nexus-border)]
                         overflow-y-auto shrink-0"
            >
              {rightPanel === 'comments' && (
                <PDFCommentPanel documentId={documentId} pdfDoc={pdfDoc} />
              )}
              {rightPanel === 'properties' && (
                <PDFPropertiesPanel documentId={documentId} pdfDoc={pdfDoc} />
              )}
              {rightPanel === 'sign' && (
                <PDFSignatureFieldPlacer
                  documentId={documentId}
                  numPages={numPages}
                  pageStatesRef={pageStatesRef}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
```

---

# PHASE 5 — ENHANCEMENT: E-SIGNING ENGINE

## 5.1 Overview — Adobe Sign / DocuSign Parity

The e-signing system in Nexus Workspace must match the full signing workflow offered by Adobe Sign and DocuSign. This is a multi-step process:

1. **Document Owner** opens any document (PDF or Nexus editor document) and enters "Sign Mode"
2. Owner places **signature fields** on specific pages at specific positions for specific recipients
3. Owner fills in **recipient information**: name, email, role (Signer, Approver, CC)
4. Owner sends **signing request** via email (using Resend) to all recipients
5. Each **recipient** receives an email with a unique, time-limited, single-use signing link
6. Recipient opens the link — no login required — and sees the document with their fields highlighted
7. Recipient can: Draw their signature, Type their signature, Upload a signature image
8. Recipient fills in any text fields, date fields, checkbox fields placed for them
9. Recipient clicks **Sign & Submit**
10. System records: timestamp, IP address, user agent, acceptance of legal terms
11. Once all signers have signed, the document is **completed** — locked, watermarked with "SIGNED", and a **Certificate of Completion** PDF is generated
12. All parties receive the signed PDF and certificate via email
13. The signed document appears in the Nexus workspace with a green "Signed" badge
14. Document is locked — no further edits possible (a new version must be created to edit)

## 5.2 Signing Database Schema (Additive — Check Existing Tables First)

```sql
-- SIGNING TABLES — ADD ONLY IF THEY DO NOT ALREADY EXIST

-- Envelope: represents a signing session for a document
CREATE TABLE IF NOT EXISTS signing_envelopes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id     UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  workspace_id    UUID NOT NULL REFERENCES workspaces(id),
  created_by      UUID NOT NULL REFERENCES auth.users(id),
  title           TEXT NOT NULL,
  message         TEXT,
  status          TEXT NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft','sent','in_progress','completed','voided','expired')),
  signing_order   TEXT NOT NULL DEFAULT 'parallel'
                  CHECK (signing_order IN ('parallel', 'sequential')),
  expiry_date     TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  void_reason     TEXT,
  signed_pdf_path TEXT,   -- R2 path of the final signed PDF
  certificate_path TEXT,  -- R2 path of the completion certificate
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Recipients: each person who needs to act on the envelope
CREATE TABLE IF NOT EXISTS signing_recipients (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  envelope_id     UUID NOT NULL REFERENCES signing_envelopes(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  role            TEXT NOT NULL DEFAULT 'signer'
                  CHECK (role IN ('signer', 'approver', 'cc', 'viewer')),
  order_index     INTEGER NOT NULL DEFAULT 0,   -- for sequential signing
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','sent','viewed','signed','declined','bounced')),
  token           TEXT UNIQUE NOT NULL,          -- unique signing link token (UUID)
  token_expires_at TIMESTAMPTZ NOT NULL,
  signed_at       TIMESTAMPTZ,
  ip_address      TEXT,
  user_agent      TEXT,
  decline_reason  TEXT,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Fields: the actual form fields placed on the document
CREATE TABLE IF NOT EXISTS signing_fields (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  envelope_id     UUID NOT NULL REFERENCES signing_envelopes(id) ON DELETE CASCADE,
  recipient_id    UUID NOT NULL REFERENCES signing_recipients(id) ON DELETE CASCADE,
  field_type      TEXT NOT NULL
                  CHECK (field_type IN (
                    'signature', 'initials', 'date', 'text', 'checkbox',
                    'radio', 'dropdown', 'name', 'email', 'title', 'company'
                  )),
  page_number     INTEGER NOT NULL,
  x               FLOAT NOT NULL,   -- % from left (0–100)
  y               FLOAT NOT NULL,   -- % from top (0–100)
  width           FLOAT NOT NULL,   -- % of page width
  height          FLOAT NOT NULL,   -- % of page height
  label           TEXT,             -- field label shown to signer
  placeholder     TEXT,
  required        BOOLEAN NOT NULL DEFAULT true,
  options         JSONB,            -- for dropdown and radio fields
  value           TEXT,             -- filled value (set when signed)
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Audit events: immutable log of every action in the signing process
CREATE TABLE IF NOT EXISTS signing_audit_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  envelope_id     UUID NOT NULL REFERENCES signing_envelopes(id) ON DELETE CASCADE,
  recipient_id    UUID REFERENCES signing_recipients(id),
  event_type      TEXT NOT NULL,
  event_data      JSONB,
  ip_address      TEXT,
  user_agent      TEXT,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies for signing tables
ALTER TABLE signing_envelopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE signing_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE signing_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE signing_audit_log ENABLE ROW LEVEL SECURITY;

-- Envelope owners and workspace members can view envelopes
CREATE POLICY IF NOT EXISTS "signing_envelopes_select"
  ON signing_envelopes FOR SELECT
  USING (
    created_by = auth.uid() OR
    workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
  );

CREATE POLICY IF NOT EXISTS "signing_envelopes_insert"
  ON signing_envelopes FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY IF NOT EXISTS "signing_envelopes_update"
  ON signing_envelopes FOR UPDATE
  USING (created_by = auth.uid());
```

## 5.3 Signature Capture Component

Create `src/components/signing/SignaturePad.tsx`. This component allows signers to:

```typescript
// src/components/signing/SignaturePad.tsx
// Signature capture with three modes: draw (finger/mouse/stylus),
// type (renders typed name in a handwriting font), upload (image).
// Output: PNG data URL stored in signing_fields.value

'use client';

import { useRef, useState, useEffect } from 'react';
import SignaturePad from 'signature_pad';
import { motion } from 'framer-motion';
import {
  PencilLine,
  TextT,
  Upload,
  Trash,
  Check,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

type SignatureMode = 'draw' | 'type' | 'upload';

const HANDWRITING_FONTS = [
  'Dancing Script',
  'Pacifico',
  'Sacramento',
  'Great Vibes',
  'Allura',
];

interface SignaturePadProps {
  onCapture: (dataUrl: string) => void;
  onCancel: () => void;
  signerName: string;
}

export function NexusSignaturePad({ onCapture, onCancel, signerName }: SignaturePadProps) {
  const [mode, setMode] = useState<SignatureMode>('draw');
  const [typedName, setTypedName] = useState(signerName);
  const [selectedFont, setSelectedFont] = useState(HANDWRITING_FONTS[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);

  // Initialise signature_pad library on the canvas element
  useEffect(() => {
    if (mode !== 'draw' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d')?.scale(ratio, ratio);

    signaturePadRef.current = new SignaturePad(canvas, {
      backgroundColor: 'rgba(255,255,255,0)',
      penColor: '#1A1A2E',
      minWidth: 1,
      maxWidth: 3,
    });

    return () => {
      signaturePadRef.current?.off();
    };
  }, [mode]);

  const handleCapture = () => {
    if (mode === 'draw') {
      if (!signaturePadRef.current || signaturePadRef.current.isEmpty()) {
        alert('Please draw your signature first.');
        return;
      }
      onCapture(signaturePadRef.current.toDataURL('image/png'));
    } else if (mode === 'type') {
      // Render the typed name to a canvas using the selected handwriting font
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 120;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = 'transparent';
      ctx.font = `64px "${selectedFont}"`;
      ctx.fillStyle = '#1A1A2E';
      ctx.textBaseline = 'middle';
      ctx.fillText(typedName, 16, 60);
      onCapture(canvas.toDataURL('image/png'));
    } else if (mode === 'upload' && uploadedImage) {
      onCapture(uploadedImage);
    }
  };

  const handleClear = () => {
    if (mode === 'draw') {
      signaturePadRef.current?.clear();
    } else if (mode === 'upload') {
      setUploadedImage(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          'bg-white rounded-[var(--nexus-radius-xl)] shadow-2xl',
          'w-full max-w-xl mx-4 overflow-hidden'
        )}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add Your Signature</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Your signature is legally binding once applied to this document.
          </p>
        </div>

        {/* Mode tabs */}
        <div className="flex border-b border-gray-200">
          {([
            { key: 'draw' as const, label: 'Draw', icon: PencilLine },
            { key: 'type' as const, label: 'Type', icon: TextT },
            { key: 'upload' as const, label: 'Upload', icon: Upload },
          ]).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium',
                'transition-colors border-b-2',
                mode === key
                  ? 'border-[var(--nexus-volt)] text-[var(--nexus-ink)] bg-[rgba(110,231,183,0.05)]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              <Icon weight="regular" className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === 'draw' && (
            <div className="space-y-3">
              <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden
                              bg-[#FAFAFA] h-36">
                <canvas ref={canvasRef} className="w-full h-full touch-none" />
              </div>
              <p className="text-xs text-gray-400 text-center">
                Draw your signature above using mouse, finger, or stylus
              </p>
            </div>
          )}

          {mode === 'type' && (
            <div className="space-y-4">
              <input
                type="text"
                value={typedName}
                onChange={e => setTypedName(e.target.value)}
                placeholder="Type your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[var(--nexus-volt)]"
              />
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-medium">Choose a style:</p>
                <div className="grid grid-cols-1 gap-2">
                  {HANDWRITING_FONTS.map(font => (
                    <button
                      key={font}
                      onClick={() => setSelectedFont(font)}
                      className={cn(
                        'flex items-center justify-between px-4 py-2 rounded-lg border',
                        'transition-colors',
                        selectedFont === font
                          ? 'border-[var(--nexus-volt)] bg-[rgba(110,231,183,0.05)]'
                          : 'border-gray-200 hover:border-gray-400'
                      )}
                    >
                      <span style={{ fontFamily: font, fontSize: '24px', color: '#1A1A2E' }}>
                        {typedName || 'Your Name'}
                      </span>
                      {selectedFont === font && (
                        <Check weight="bold" className="w-4 h-4 text-[var(--nexus-volt)]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mode === 'upload' && (
            <div className="space-y-3">
              {uploadedImage ? (
                <div className="border border-gray-200 rounded-xl overflow-hidden h-36
                                flex items-center justify-center bg-[#FAFAFA]">
                  <img src={uploadedImage} alt="Uploaded signature"
                       className="max-h-full max-w-full object-contain" />
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-36 border-2
                                  border-dashed border-gray-300 rounded-xl cursor-pointer
                                  hover:border-[var(--nexus-volt)] transition-colors bg-[#FAFAFA]">
                  <Upload weight="duotone" className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload signature image</span>
                  <span className="text-xs text-gray-400 mt-1">PNG or JPG with transparent background</span>
                  <input type="file" accept="image/png,image/jpeg" className="hidden"
                         onChange={handleImageUpload} />
                </label>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500
                       transition-colors"
          >
            <Trash weight="regular" className="w-4 h-4" />
            Clear
          </button>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCapture}
              className="px-5 py-2 rounded-lg bg-[var(--nexus-ink)] text-white text-sm
                         font-medium hover:bg-[var(--nexus-surface)] transition-colors"
            >
              Apply Signature
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
```

---

# PHASE 6 — ENHANCEMENT: PRESENTATION BUILDER (GAMMA AI PARITY)

## 6.1 What Gamma AI Does (Full Feature List to Match)

Gamma AI is a presentation tool that replaces PowerPoint and Google Slides. It generates complete presentation decks from a text prompt using AI, and allows manual editing afterward. Nexus must match the following capabilities:

**AI Generation:**
- User types a topic or pastes an outline
- AI generates: slide structure, headings, bullet points, speaker notes, and suggests image search terms
- AI picks a colour theme and layout style appropriate to the topic
- Generated in under 30 seconds
- User can regenerate individual slides without regenerating the whole deck
- User can ask AI to "make this slide more concise", "add more detail", "change the tone to formal"

**Manual Editing:**
- Each slide is a canvas with draggable, resizable blocks
- Block types: Title, Text, Bullet List, Image, Video Embed, Code Block, Chart, Divider, Quote
- Every block has: text editing, font/colour controls, background, border, shadow, opacity, alignment
- Slide background: solid colour, gradient, image, dark/light theme per slide
- Slide layouts: 8 pre-built layouts (Full bleed, Two column, Image left/right, Title only, etc.)
- Slide animations: Fade, Slide, Zoom, Bounce — per block, with delay control
- Slide transitions: None, Fade, Slide, Cube, Flip — per slide
- Template gallery: 30+ built-in themes (professionally designed)

**Presentation Mode:**
- Full-screen presentation using Reveal.js engine
- Speaker notes panel (hidden from audience)
- Laser pointer mode (dot follows cursor in presentation)
- Timer + elapsed time display
- Keyboard navigation + swipe on touch
- Export to PDF (all slides), PPTX, or share as live URL

**Collaboration:**
- Multiple users can edit simultaneously (Y.js per slide)
- Comments on specific slides
- Version history

## 6.2 Presentation Data Model

```typescript
// src/types/presentation.ts
// The data model for a Nexus presentation (Gamma AI parity)

export interface NexusPresentation {
  id: string;
  documentId: string;   // links back to the documents table
  title: string;
  theme: PresentationTheme;
  slides: Slide[];
  settings: PresentationSettings;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PresentationTheme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  backgroundStyle: 'solid' | 'gradient' | 'image' | 'pattern';
  backgroundValue: string;  // gradient CSS, image URL, or pattern name
}

export interface Slide {
  id: string;
  order: number;
  layout: SlideLayout;
  backgroundOverride?: Partial<PresentationTheme>;
  blocks: SlideBlock[];
  transition: SlideTransition;
  speakerNotes: string;
  hidden: boolean;  // can hide slides from presentation without deleting
}

export type SlideLayout =
  | 'full-bleed-title'
  | 'title-body'
  | 'two-column'
  | 'image-left'
  | 'image-right'
  | 'image-full'
  | 'title-only'
  | 'blank';

export type SlideTransition = {
  type: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
  duration: number;   // ms
  direction?: 'left' | 'right' | 'up' | 'down';
};

export interface SlideBlock {
  id: string;
  type: SlideBlockType;
  content: string | ChartData | CodeContent | ImageContent;
  x: number;           // % from left
  y: number;           // % from top
  width: number;       // % of slide width
  height: number;      // % of slide height
  style: BlockStyle;
  animation: BlockAnimation;
  zIndex: number;
  locked: boolean;
}

export type SlideBlockType =
  | 'title'
  | 'heading'
  | 'text'
  | 'bullet-list'
  | 'numbered-list'
  | 'image'
  | 'video'
  | 'code'
  | 'chart'
  | 'divider'
  | 'quote'
  | 'icon'
  | 'shape'
  | 'ai-image';        // generated by AI via text prompt

export interface BlockStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  opacity?: number;
  shadow?: string;
  border?: string;
}

export interface BlockAnimation {
  type: 'none' | 'fade' | 'slide-up' | 'slide-left' | 'zoom' | 'bounce';
  delay: number;    // ms
  duration: number; // ms
  order: number;    // click-to-reveal order (0 = appears with slide)
}

export interface ChartData {
  chartType: 'bar' | 'line' | 'pie' | 'donut' | 'area' | 'scatter';
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
  }[];
}

export interface CodeContent {
  language: string;
  code: string;
  showLineNumbers: boolean;
  theme: 'dark' | 'light';
}

export interface ImageContent {
  src: string;
  alt: string;
  objectFit: 'cover' | 'contain' | 'fill';
  caption?: string;
}
```

## 6.3 AI Generation Route

Create `src/app/api/presentations/generate/route.ts`. This calls the Claude API to generate a full slide deck from a prompt:

```typescript
// src/app/api/presentations/generate/route.ts
// Generates a complete slide deck using Claude AI.
// Takes: topic/outline text, desired slide count, tone, theme preference
// Returns: complete NexusPresentation JSON

import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

const client = new Anthropic(); // uses ANTHROPIC_API_KEY env var

const RequestSchema = z.object({
  prompt: z.string().min(10).max(5000),
  slideCount: z.number().int().min(3).max(30).default(8),
  tone: z.enum(['professional', 'casual', 'academic', 'creative', 'persuasive']).default('professional'),
  themePreference: z.enum(['light', 'dark', 'colorful', 'minimal', 'bold']).default('dark'),
  workspaceId: z.string().uuid(),
  folderId: z.string().uuid().optional(),
});

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = RequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.format() }, { status: 400 });
  }

  const { prompt, slideCount, tone, themePreference, workspaceId, folderId } = parsed.data;

  const systemPrompt = `You are an expert presentation designer. Generate a complete, professional slide deck as structured JSON.

Rules:
- Generate exactly ${slideCount} slides
- Tone: ${tone}
- Theme style preference: ${themePreference}
- Every slide must have a clear purpose and flow logically from the previous
- Bullet points should be concise (max 10 words each)
- Include speaker notes for each slide (these are shown to the presenter only)
- Vary the layouts: don't use the same layout consecutively
- The first slide is always a full-bleed title slide
- The last slide is always a call-to-action or summary slide

Respond ONLY with a valid JSON object matching this exact structure — no markdown, no preamble:
{
  "title": "string — the presentation title",
  "theme": {
    "primaryColor": "#hex",
    "secondaryColor": "#hex",
    "accentColor": "#hex",
    "backgroundColor": "#hex",
    "textColor": "#hex",
    "headingFont": "font name",
    "bodyFont": "font name"
  },
  "slides": [
    {
      "layout": "full-bleed-title | title-body | two-column | image-left | image-right | title-only | blank",
      "speakerNotes": "string",
      "blocks": [
        {
          "type": "title | heading | text | bullet-list | numbered-list | image | divider | quote",
          "content": "string or array of strings for lists",
          "x": 0–100,
          "y": 0–100,
          "width": 0–100,
          "height": 0–100
        }
      ]
    }
  ]
}`;

  // Use streaming for better perceived performance
  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    system: systemPrompt,
    messages: [{ role: 'user', content: prompt }],
  });

  const response = await stream.finalMessage();
  const rawText = response.content[0].type === 'text' ? response.content[0].text : '';

  let parsedPresentation;
  try {
    const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    parsedPresentation = JSON.parse(cleaned);
  } catch {
    return NextResponse.json({ error: 'AI returned invalid JSON. Please try again.' }, { status: 500 });
  }

  // Create document record and save presentation data
  const { data: document } = await supabase
    .from('documents')
    .insert({
      workspace_id: workspaceId,
      folder_id: folderId || null,
      title: parsedPresentation.title,
      document_type: 'presentation',
      file_type: 'application/nexus-presentation',
      created_by: user.id,
      conversion_status: 'not_required',
    })
    .select('id')
    .single();

  if (document) {
    await supabase
      .from('presentations')
      .insert({
        document_id: document.id,
        workspace_id: workspaceId,
        title: parsedPresentation.title,
        data: parsedPresentation,
        created_by: user.id,
      });
  }

  return NextResponse.json({
    documentId: document?.id,
    editUrl: document ? `/workspace/presentation/${document.id}` : null,
    presentation: parsedPresentation,
  });
}
```

---

# PHASE 7 — ENHANCEMENT: REAL-TIME CHAT & COLLABORATION HUB

## 7.1 Chat Architecture Overview

The Nexus Chat system must provide the full collaboration experience of Slack combined with document context awareness. It uses Supabase Realtime for instant message delivery and Supabase PostgreSQL for message persistence. This is 100% within the free tier.

**Channel Types:**
- **Workspace General** — every workspace has a `#general` channel created automatically
- **Document Channel** — every document automatically has its own discussion thread (like Google Docs comments, but as a sidebar chat)
- **Direct Messages** — private 1:1 conversations between workspace members
- **Group DMs** — private conversations between multiple specific members
- **Custom Channels** — workspace admins can create named channels (e.g., `#design`, `#approvals`)

**Features:**
- Rich text messages with markdown formatting
- File/image attachments (upload inline, preview in chat)
- Emoji reactions (click emoji to react, hover to see who reacted)
- Thread replies (click "Reply in thread" to start a threaded conversation)
- Message editing (own messages only, shows "(edited)" label)
- Message deletion (own messages — soft delete, admin — hard delete)
- @mentions (with autocomplete from workspace members)
- #channel mentions
- Link previews (auto-fetch OG metadata for shared URLs)
- Pinned messages (per channel)
- Message search (full-text search via Supabase `tsvector`)
- Unread message indicators with count badges
- Typing indicators ("Alice and Bob are typing...")
- Online presence dots (green = online, yellow = away, grey = offline)
- Notification sounds (respects browser notification permission)
- Message bookmarks (personal bookmarks for important messages)
- Code snippets with syntax highlighting (```) 
- Document share previews (when a Nexus doc is shared in chat, shows title, type, thumbnail)

## 7.2 Chat Database Schema

```sql
-- CHAT TABLES — ADD ONLY IF THEY DO NOT ALREADY EXIST

-- Channels
CREATE TABLE IF NOT EXISTS chat_channels (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id    UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  document_id     UUID REFERENCES documents(id) ON DELETE CASCADE,  -- NULL for workspace channels
  type            TEXT NOT NULL DEFAULT 'public'
                  CHECK (type IN ('public', 'private', 'direct', 'document')),
  name            TEXT,                             -- e.g. "general", "design"
  description     TEXT,
  created_by      UUID NOT NULL REFERENCES auth.users(id),
  is_default      BOOLEAN DEFAULT false,            -- auto-join all workspace members
  archived        BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Channel members
CREATE TABLE IF NOT EXISTS chat_channel_members (
  channel_id      UUID NOT NULL REFERENCES chat_channels(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role            TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  last_read_at    TIMESTAMPTZ DEFAULT now(),
  notifications   TEXT DEFAULT 'all' CHECK (notifications IN ('all', 'mentions', 'none')),
  joined_at       TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (channel_id, user_id)
);

-- Messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id      UUID NOT NULL REFERENCES chat_channels(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES auth.users(id),
  parent_id       UUID REFERENCES chat_messages(id) ON DELETE SET NULL, -- for threads
  content         TEXT,
  content_type    TEXT DEFAULT 'text' CHECK (content_type IN ('text', 'system', 'file')),
  attachments     JSONB DEFAULT '[]',   -- array of {url, name, type, size}
  mentions        UUID[] DEFAULT '{}',  -- user IDs mentioned in message
  edited          BOOLEAN DEFAULT false,
  edited_at       TIMESTAMPTZ,
  deleted         BOOLEAN DEFAULT false,
  deleted_at      TIMESTAMPTZ,
  -- Full-text search vector
  search_vector   TSVECTOR GENERATED ALWAYS AS (to_tsvector('english', coalesce(content, ''))) STORED,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS chat_messages_channel_id_idx ON chat_messages(channel_id, created_at DESC);
CREATE INDEX IF NOT EXISTS chat_messages_parent_id_idx ON chat_messages(parent_id);
CREATE INDEX IF NOT EXISTS chat_messages_search_idx ON chat_messages USING GIN(search_vector);

-- Reactions
CREATE TABLE IF NOT EXISTS chat_reactions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id      UUID NOT NULL REFERENCES chat_messages(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES auth.users(id),
  emoji           TEXT NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE(message_id, user_id, emoji)
);

-- Pinned messages
CREATE TABLE IF NOT EXISTS chat_pins (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id      UUID NOT NULL REFERENCES chat_channels(id) ON DELETE CASCADE,
  message_id      UUID NOT NULL REFERENCES chat_messages(id) ON DELETE CASCADE,
  pinned_by       UUID NOT NULL REFERENCES auth.users(id),
  created_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE(channel_id, message_id)
);

-- Enable RLS
ALTER TABLE chat_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_channel_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_reactions ENABLE ROW LEVEL SECURITY;

-- Users can read channels they are members of
CREATE POLICY IF NOT EXISTS "chat_channels_select"
  ON chat_channels FOR SELECT
  USING (
    id IN (
      SELECT channel_id FROM chat_channel_members WHERE user_id = auth.uid()
    )
    OR (type = 'public' AND workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    ))
  );

-- Users can read messages in channels they are members of
CREATE POLICY IF NOT EXISTS "chat_messages_select"
  ON chat_messages FOR SELECT
  USING (
    channel_id IN (
      SELECT channel_id FROM chat_channel_members WHERE user_id = auth.uid()
    )
  );

-- Users can insert messages in channels they are members of
CREATE POLICY IF NOT EXISTS "chat_messages_insert"
  ON chat_messages FOR INSERT
  WITH CHECK (
    user_id = auth.uid() AND
    channel_id IN (
      SELECT channel_id FROM chat_channel_members WHERE user_id = auth.uid()
    )
  );

-- Users can update/delete only their own messages
CREATE POLICY IF NOT EXISTS "chat_messages_update"
  ON chat_messages FOR UPDATE
  USING (user_id = auth.uid());
```

## 7.3 Chat UI Component

Create `src/components/chat/ChatSidebar.tsx`. This is the full Slack-like chat interface rendered as a sidebar within the Nexus workspace layout. It has a left channel list and a right message area.

The full implementation includes:
- Channel list with unread count badges, sorted by most recently active
- Message area with infinite scroll (loads older messages as you scroll up)
- Message composer with markdown toolbar, emoji picker, file attachment button
- Real-time message subscription via `supabase.channel()` listener
- Typing indicator: sends broadcast events on keypress, clears after 3 seconds of inactivity
- Presence subscription: shows who is currently online in the workspace
- Thread panel: slides in from right when a thread is opened
- Reactions popover: click + button on any message to add emoji reaction
- Message context menu on right-click: Reply, React, Copy, Pin, Edit (own), Delete (own)
- @mention autocomplete: shows filtered list of workspace members after typing "@"
- Notification badge on the chat icon in the main nav if there are unread messages

---

# PHASE 8 — ENHANCEMENT: USER ATTRIBUTION & EDIT TRACKING

## 8.1 What Must Be Tracked

Every action a logged-in user takes must be attributable to them. This covers:

- **Document edits:** Every save of a document records who saved it and when. The editor footer shows "Last edited by [Avatar] [Name] [relative time]"
- **Real-time cursors:** In collaborative editing, each user's cursor and selection shows in their assigned colour with a name label
- **Comments:** Every comment shows the commenter's avatar, name, and timestamp
- **Signing:** Every signing action records the signer's name, email, IP, timestamp, and user agent
- **Uploads:** Every uploaded file shows who uploaded it
- **Chat messages:** Every message shows the sender's avatar and name
- **Version history:** Every document version records the author of that version
- **Workspace changes:** Creating, renaming, deleting workspaces, boards, or folders is recorded

## 8.2 Document Version History

Every time a document is saved (either auto-save or manual save), a version snapshot is created. This allows users to browse and restore previous versions, similar to Google Docs version history.

```sql
-- Document versions — ADD ONLY IF TABLE DOES NOT EXIST
CREATE TABLE IF NOT EXISTS document_versions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id     UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  version_number  INTEGER NOT NULL,
  title           TEXT NOT NULL,
  content_json    TEXT,              -- TipTap JSON snapshot (for editor docs)
  content_html    TEXT,              -- HTML snapshot for preview
  storage_path    TEXT,              -- R2 path for binary file versions (PDF, etc.)
  file_size       INTEGER,
  created_by      UUID NOT NULL REFERENCES auth.users(id),
  change_summary  TEXT,              -- Optional: user-written description of changes
  auto_saved      BOOLEAN DEFAULT true,  -- auto-saves vs. manual saves
  word_count      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE(document_id, version_number)
);

-- Trigger to auto-increment version numbers per document
CREATE OR REPLACE FUNCTION increment_document_version()
RETURNS TRIGGER AS $$
BEGIN
  NEW.version_number := COALESCE(
    (SELECT MAX(version_number) FROM document_versions WHERE document_id = NEW.document_id) + 1,
    1
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER IF NOT EXISTS document_version_number_trigger
  BEFORE INSERT ON document_versions
  FOR EACH ROW EXECUTE FUNCTION increment_document_version();
```

## 8.3 Activity Feed

Create `src/components/workspace/ActivityFeed.tsx`. A live feed of recent workspace activity, like the activity panel in Monday.com. Shows: who created a document, who signed a document, who uploaded a file, who sent messages, who joined the workspace. Powered by a `workspace_activity` table written to via database triggers.

---

# PHASE 9 — ENHANCEMENT: TRASH CAN, DELETE FLOWS & RECOVERY SYSTEM

## 9.1 Trash System Overview

Nothing in Nexus is permanently deleted immediately. Every delete operation moves the item to trash, where it stays for 30 days before permanent deletion. This matches Google Drive and Monday.com behaviour.

Trashable items: Documents, Folders, Workspaces, Chat Channels (custom), Presentations, Spreadsheets

The Trash page lives at `/workspace/trash` and shows all items in trash across all workspaces the user has access to, sorted by deletion date.

## 9.2 Soft Delete Implementation

Every trashable table must have these columns added (via migration, not table drop):

```sql
-- ADD THESE COLUMNS TO EXISTING TABLES IF THEY DO NOT ALREADY EXIST
-- Run each ALTER TABLE only if the column does not exist

DO $$
BEGIN
  -- For documents table
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='documents' AND column_name='deleted_at') THEN
    ALTER TABLE documents ADD COLUMN deleted_at TIMESTAMPTZ;
    ALTER TABLE documents ADD COLUMN deleted_by UUID REFERENCES auth.users(id);
    ALTER TABLE documents ADD COLUMN permanent_delete_at TIMESTAMPTZ
      GENERATED ALWAYS AS (deleted_at + INTERVAL '30 days') STORED;
  END IF;

  -- For folders table (check if table exists first)
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='folders') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='folders' AND column_name='deleted_at') THEN
      ALTER TABLE folders ADD COLUMN deleted_at TIMESTAMPTZ;
      ALTER TABLE folders ADD COLUMN deleted_by UUID REFERENCES auth.users(id);
    END IF;
  END IF;

  -- For workspaces table
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='workspaces' AND column_name='deleted_at') THEN
    ALTER TABLE workspaces ADD COLUMN deleted_at TIMESTAMPTZ;
    ALTER TABLE workspaces ADD COLUMN deleted_by UUID REFERENCES auth.users(id);
  END IF;
END $$;

-- Update all existing SELECT policies to exclude soft-deleted items
-- (Modify each policy to add AND deleted_at IS NULL)

-- Scheduled cleanup: auto-delete items older than 30 days in trash
-- This runs via a Supabase Edge Function scheduled with pg_cron
-- The Edge Function queries for items where permanent_delete_at < now()
-- and permanently deletes them from both the database and R2 storage.
```

## 9.3 Trash Page Component

Create `src/app/(workspace)/workspace/trash/page.tsx`. The trash page shows:

- Filter tabs: All, Documents, Folders, Presentations, Spreadsheets
- Sort options: Deleted Date (newest first), Name, Type
- Each item shows: icon, name, type, who deleted it, when deleted, days remaining before permanent deletion
- Bulk select (checkbox per item, "Select all" in header)
- Actions: "Restore" (single item), "Delete Forever" (single item), "Restore Selected", "Delete Selected Forever", "Empty Trash" (with confirmation dialog)
- Search within trash
- On restore: item moves back to its original location if it still exists, or to workspace root if original parent was also deleted

---

# PHASE 10 — ENHANCEMENT: WORKSPACE MANAGEMENT (MONDAY.COM PARITY)

## 10.1 Workspace Architecture

Nexus follows Monday.com's information hierarchy:
```
Organisation
  └── Workspaces (e.g. "Marketing", "Engineering", "Client Projects")
       └── Boards (e.g. "Q3 Campaigns", "Sprint 14", "Website Redesign")
            └── Groups (e.g. "To Do", "In Progress", "Done")
                 └── Items (rows — represent tasks, documents, requests)
                      └── Sub-items (nested tasks)
                          └── Updates (comments on a specific item)
```

Each workspace also has:
- A **Documents** section (all docs, PDFs, presentations in that workspace)
- A **Files** section (raw uploaded files)
- A **Chat** section (all channels in that workspace)
- A **Members** section (who has access and their role)
- A **Dashboards** section (analytics and overview boards)

## 10.2 Board Views (Monday.com Parity)

Every board can be viewed in multiple ways:

**Main Table View:** Spreadsheet-like grid. Columns are customisable field types. Items are rows. Groups are collapsible sections. Supports inline editing of all field types.

**Kanban View:** Drag cards between status columns. Cards show key item info. Customise which column drives the Kanban (e.g., Status, Priority, Person).

**Gantt View:** Timeline view. Each item is a horizontal bar spanning its start-to-end date. Dependencies shown as connecting lines. Drag to move or resize. Supports critical path highlighting.

**Calendar View:** Items plotted on a monthly/weekly/daily calendar based on date columns. Click a day to add an item. Drag to reschedule.

**Map View:** If items have a location field, plot them on a Google Maps embed.

**Dashboard View:** Configurable widgets: Battery chart (item count by status), Pie chart, Numbers widget, Timeline, Progress bar.

## 10.3 Column Types (All Monday.com Column Types)

Every board column is one of these types. Each type has its own input UI, filter UI, and display format:

```typescript
// src/types/board.ts
export type BoardColumnType =
  | 'text'           // single line text
  | 'long-text'      // multi-line text / rich text
  | 'number'         // integer or decimal with unit option
  | 'status'         // coloured pill, configurable labels and colours
  | 'person'         // assign workspace members, supports multiple
  | 'date'           // date picker, optionally with time
  | 'date-range'     // start and end date
  | 'timeline'       // visual date range bar in table
  | 'priority'       // Critical, High, Medium, Low (like Monday Priority)
  | 'checkbox'       // boolean tick
  | 'rating'         // 1–5 star rating
  | 'dropdown'       // single-select dropdown with custom options
  | 'multi-select'   // multi-select tags with custom options
  | 'link'           // URL with display label
  | 'file'           // attached files (links to Nexus documents)
  | 'email'          // email address with mailto link
  | 'phone'          // phone number with tel link
  | 'location'       // address / coordinates
  | 'formula'        // formula referencing other column values
  | 'auto-number'    // auto-incrementing item number
  | 'last-updated'   // auto: last time item was changed
  | 'created-by'     // auto: who created the item
  | 'created-at'     // auto: when item was created
  | 'progress'       // 0–100% with visual bar, computed from sub-items or manual
  | 'color'          // colour picker
  | 'vote'           // members can up-vote items
  | 'world-clock'    // shows current time in a selected timezone
  | 'dependency'     // links to other items (predecessor/successor)
  | 'mirror'         // mirrors a column value from a connected board item
  | 'connect-boards';// links items across boards (many-to-many)
```

---

# PHASE 11 — ENHANCEMENT: ADD NEW WORKSPACE FLOW

## 11.1 New Workspace Creation

The "Add Workspace" button must appear in the left sidebar navigation, directly below the list of existing workspaces. It triggers a modal creation flow with these steps:

**Step 1 — Workspace Details:**
- Workspace name (required, max 60 chars)
- Description (optional, max 300 chars)
- Workspace icon: choose from emoji grid OR upload custom image
- Colour accent: choose from 12 preset colours

**Step 2 — Workspace Type (Template):**
Choose from these pre-built templates (like Monday.com's template picker):
- Blank workspace (empty)
- Project Management (with Tasks board: Status, Person, Priority, Due Date, Timeline)
- Marketing Campaign (Campaign board, Content Calendar board)
- HR & Recruitment (Job Openings board, Candidates tracker)
- CRM & Sales (Leads board, Deals pipeline Kanban)
- Software Development (Sprint board Kanban, Bug tracker)
- Creative Agency (Client Projects, Asset Review board)
- Legal & Compliance (Contracts tracker with signing integration)
- Document Repository (Documents-first layout, minimal boards)

**Step 3 — Invite Members (optional):**
- Email invite field (comma-separated)
- Choose role for invited members: Admin, Member, Viewer
- Or skip and invite later

**Step 4 — Confirm & Create:**
- Shows workspace preview card
- "Create Workspace" button
- On success: navigate to new workspace, show onboarding checklist modal

## 11.2 Create Workspace API Route

```typescript
// src/app/api/workspaces/route.ts — POST handler (add to existing file or create)

// POST /api/workspaces
// Creates a new workspace, optionally from a template.
// Inserts: workspace record, default boards (if template), default chat channels,
//          creator as Admin member, sends invite emails to invited members.

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const body = await request.json();
  const { name, description, icon, color, template, invitees } = body;

  // Create the workspace
  const { data: workspace, error } = await supabase
    .from('workspaces')
    .insert({
      name,
      description,
      icon,
      color,
      created_by: user.id,
      template_used: template,
    })
    .select('id')
    .single();

  if (error || !workspace) {
    return NextResponse.json({ error: 'Failed to create workspace.' }, { status: 500 });
  }

  // Add creator as admin member
  await supabase.from('workspace_members').insert({
    workspace_id: workspace.id,
    user_id: user.id,
    role: 'admin',
  });

  // Create default #general channel
  const { data: channel } = await supabase
    .from('chat_channels')
    .insert({
      workspace_id: workspace.id,
      type: 'public',
      name: 'general',
      description: 'General workspace discussion',
      created_by: user.id,
      is_default: true,
    })
    .select('id')
    .single();

  if (channel) {
    await supabase.from('chat_channel_members').insert({
      channel_id: channel.id,
      user_id: user.id,
      role: 'admin',
    });
  }

  // Apply template if specified
  if (template && template !== 'blank') {
    await applyWorkspaceTemplate(supabase, workspace.id, template, user.id);
  }

  // Send invite emails
  if (invitees && invitees.length > 0) {
    await sendWorkspaceInvites(workspace.id, name, invitees, user);
  }

  return NextResponse.json({ workspaceId: workspace.id, url: `/workspace/${workspace.id}` });
}
```

---

# PHASE 12 — ENHANCEMENT: MENU & WORK AREA DELETE SYSTEM

## 12.1 Deletion Scope

Users must be able to delete the following items, all with confirmation dialogs and a clear explanation of consequences:

**From the sidebar (left navigation):**
- Delete a Workspace (moves all contents to trash; removes all members' access)
- Delete a Board (moves board and all its items to trash)
- Delete a Group (moves group and its items to trash; does not affect other groups)
- Delete a Folder (moves folder and its documents to trash)
- Delete a Chat Channel (archives with 30-day recovery)

**From the board/table area:**
- Delete an Item (single row — moves to trash)
- Delete multiple Items (bulk select → Delete)
- Delete a Column (requires confirmation; column data is permanently lost because columns are structural)
- Clear column values (like Delete Column but keeps the column, empties all values)

**From the document area:**
- Delete a document (moves to trash)
- Delete a document version (permanent — no trash for versions older than the current one)

## 12.2 Confirmation Dialog Component

Create `src/components/ui/DeleteConfirmDialog.tsx`. This is a reusable, context-aware deletion confirmation modal:

```typescript
// src/components/ui/DeleteConfirmDialog.tsx
// Reusable delete confirmation dialog.
// Shows: what is being deleted, what will happen (consequences), type-to-confirm for destructive actions.

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Warning, Trash } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  consequences?: string[];   // list of things that will be lost/affected
  itemName?: string;         // if provided, user must type this to confirm
  destructive?: boolean;     // if true, goes to trash; if false, permanent
  confirmLabel?: string;     // override the confirm button text
  isLoading?: boolean;
}

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  consequences = [],
  itemName,
  destructive = true,
  confirmLabel,
  isLoading = false,
}: DeleteConfirmDialogProps) {
  const [typeConfirm, setTypeConfirm] = useState('');
  const needsTyping = !!itemName;
  const canConfirm = !needsTyping || typeConfirm === itemName;

  const handleConfirm = async () => {
    if (!canConfirm || isLoading) return;
    await onConfirm();
    setTypeConfirm('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'relative z-10 w-full max-w-md',
              'bg-[var(--nexus-elevated)] rounded-[var(--nexus-radius-xl)]',
              'border border-[var(--nexus-border)] shadow-2xl'
            )}
          >
            {/* Header */}
            <div className="p-6 pb-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[rgba(244,63,94,0.1)] flex items-center
                              justify-center shrink-0">
                <Warning weight="duotone" className="w-5 h-5 text-[var(--nexus-rose)]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--nexus-text-primary)]">
                  {title}
                </h2>
                <p className="text-sm text-[var(--nexus-text-secondary)] mt-1">
                  {description}
                </p>
              </div>
            </div>

            {/* Consequences list */}
            {consequences.length > 0 && (
              <div className="px-6 pb-4">
                <p className="text-xs font-medium text-[var(--nexus-text-muted)] mb-2 uppercase tracking-wide">
                  This will:
                </p>
                <ul className="space-y-1">
                  {consequences.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--nexus-text-secondary)]">
                      <span className="text-[var(--nexus-rose)] mt-0.5">•</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trash notice */}
            {destructive && (
              <div className="mx-6 mb-4 px-3 py-2 rounded-lg bg-[rgba(244,63,94,0.05)]
                              border border-[rgba(244,63,94,0.15)]">
                <p className="text-xs text-[var(--nexus-rose)]">
                  This item will be moved to Trash and permanently deleted after 30 days.
                  You can restore it any time before then.
                </p>
              </div>
            )}

            {/* Type-to-confirm input */}
            {needsTyping && (
              <div className="px-6 pb-4">
                <p className="text-xs text-[var(--nexus-text-muted)] mb-2">
                  Type <span className="font-mono font-bold text-[var(--nexus-text-primary)]">
                    {itemName}
                  </span> to confirm:
                </p>
                <input
                  type="text"
                  value={typeConfirm}
                  onChange={e => setTypeConfirm(e.target.value)}
                  placeholder={itemName}
                  autoFocus
                  className={cn(
                    'w-full px-3 py-2 text-sm rounded-lg',
                    'bg-[var(--nexus-surface)] border',
                    'text-[var(--nexus-text-primary)]',
                    'focus:outline-none focus:ring-2',
                    typeConfirm === itemName
                      ? 'border-[var(--nexus-volt)] focus:ring-[rgba(110,231,183,0.3)]'
                      : 'border-[var(--nexus-border)] focus:ring-[rgba(244,63,94,0.3)]'
                  )}
                />
              </div>
            )}

            {/* Action buttons */}
            <div className="px-6 py-4 border-t border-[var(--nexus-border)] flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-[var(--nexus-text-secondary)]
                           hover:text-[var(--nexus-text-primary)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!canConfirm || isLoading}
                className={cn(
                  'flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium',
                  'transition-all',
                  canConfirm && !isLoading
                    ? 'bg-[var(--nexus-rose)] text-white hover:bg-red-400'
                    : 'bg-[var(--nexus-border)] text-[var(--nexus-text-muted)] cursor-not-allowed'
                )}
              >
                <Trash weight="regular" className="w-4 h-4" />
                {isLoading ? 'Deleting...' : (confirmLabel ?? (destructive ? 'Move to Trash' : 'Delete Permanently'))}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
```

---

# PHASE 13 — ENHANCEMENT: PWA HARDENING & OFFLINE CAPABILITY

## 13.1 PWA Manifest

Ensure `public/manifest.json` contains the full PWA manifest. Create or update it:

```json
{
  "name": "Nexus Workspace",
  "short_name": "Nexus",
  "description": "Your unified work operating system — documents, tasks, chat, and signing in one place.",
  "start_url": "/",
  "display": "standalone",
  "orientation": "any",
  "background_color": "#0D0F14",
  "theme_color": "#0D0F14",
  "categories": ["productivity", "business", "utilities"],
  "icons": [
    { "src": "/icons/icon-72x72.png",   "sizes": "72x72",   "type": "image/png", "purpose": "maskable any" },
    { "src": "/icons/icon-96x96.png",   "sizes": "96x96",   "type": "image/png", "purpose": "maskable any" },
    { "src": "/icons/icon-128x128.png", "sizes": "128x128", "type": "image/png", "purpose": "maskable any" },
    { "src": "/icons/icon-144x144.png", "sizes": "144x144", "type": "image/png", "purpose": "maskable any" },
    { "src": "/icons/icon-152x152.png", "sizes": "152x152", "type": "image/png", "purpose": "maskable any" },
    { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable any" },
    { "src": "/icons/icon-384x384.png", "sizes": "384x384", "type": "image/png", "purpose": "maskable any" },
    { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable any" }
  ],
  "screenshots": [
    {
      "src": "/screenshots/desktop-editor.png",
      "sizes": "1280x800",
      "type": "image/png",
      "form_factor": "wide",
      "label": "Document Editor"
    },
    {
      "src": "/screenshots/mobile-workspace.png",
      "sizes": "390x844",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Mobile Workspace"
    }
  ],
  "shortcuts": [
    {
      "name": "New Document",
      "short_name": "New Doc",
      "url": "/workspace/new?type=document",
      "icons": [{ "src": "/icons/shortcut-doc.png", "sizes": "96x96" }]
    },
    {
      "name": "Open Chat",
      "url": "/workspace/chat",
      "icons": [{ "src": "/icons/shortcut-chat.png", "sizes": "96x96" }]
    }
  ],
  "share_target": {
    "action": "/workspace/import",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
      "title": "title",
      "text": "text",
      "url": "url",
      "files": [{ "name": "file", "accept": ["*/*"] }]
    }
  },
  "handle_links": "preferred",
  "launch_handler": { "client_mode": "navigate-existing" }
}
```

## 13.2 Install `next-pwa` and Configure

```bash
npm install next-pwa
```

Update `next.config.ts` — **do not replace the existing config**, wrap the existing export with `withPWA`:

```typescript
// next.config.ts — WRAP EXISTING CONFIG, DO NOT REPLACE
import withPWA from 'next-pwa';

// ... (read existing config from this file first) ...

const existingConfig = {
  // ... paste existing config here verbatim ...
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-stylesheets',
        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    {
      urlPattern: /\/api\/documents\/(?!.*convert)/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-documents',
        expiration: { maxEntries: 50, maxAgeSeconds: 60 * 5 },
        networkTimeoutSeconds: 5,
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|webp|svg|gif)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-images',
        expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
    {
      urlPattern: /\.(?:js|css)$/i,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'static-resources' },
    },
  ],
})(existingConfig);
```

## 13.3 Offline Indicator

Create `src/components/ui/OfflineIndicator.tsx`. A subtle banner that slides down from the top when the network connection is lost, and slides back up when it is restored. It also shows a "saving locally — will sync when online" message for any pending document saves.

---

# PHASE 14 — ENHANCEMENT: FULL MOBILE EXPERIENCE

## 14.1 Mobile-First Requirements

Every screen in Nexus must be fully usable on a 375px–428px wide mobile screen. The following layout rules apply:

**Navigation:** On mobile, the left sidebar collapses completely. A bottom navigation bar with 5 tabs replaces it: Home (workspace overview), Boards, Documents, Chat, Profile.

**Editor on Mobile:** The editor toolbar splits into two rows: the first row has the most common actions (Bold, Italic, Undo, Redo, Insert); the second row is a horizontally scrollable additional toolbar. The editor uses the full screen height with no sidebar. Document pages reflow to fit the screen width (zoom auto-set to fit width).

**PDF Viewer on Mobile:** Pinch-to-zoom, swipe to next/previous page. Bottom sheet toolbar instead of left sidebar. Annotation tools accessible via FAB (Floating Action Button).

**Chat on Mobile:** Full-screen chat with the channel list on a separate screen (swipe back or tap the channel name to switch). Message composer pinned to bottom with keyboard-aware padding. Send button replaces Enter key (configurable).

**Board on Mobile:** Table view renders as a card list (one item = one card showing key columns). Kanban view is horizontally scrollable. No Gantt view on mobile (redirect to Calendar view instead).

**Upload on Mobile:** Uses the native file picker via `<input type="file">` with camera capture support. Also supports sharing from other apps (via PWA Share Target registered in manifest).

## 14.2 Mobile-Specific CSS

Add to global CSS (or Tailwind `globals.css`):

```css
/* Mobile: bottom nav safe area inset (notched phones) */
@media (max-width: 768px) {
  .nexus-mobile-bottom-nav {
    padding-bottom: env(safe-area-inset-bottom, 16px);
  }

  .nexus-mobile-top-bar {
    padding-top: env(safe-area-inset-top, 0px);
  }

  /* Editor: keyboard-aware bottom padding */
  .nexus-editor-mobile {
    /* Height dynamically adjusted by JS when virtual keyboard opens */
    height: var(--nexus-visual-viewport-height, 100vh);
    transition: height 0.15s ease;
  }
}

/* Smooth scrolling everywhere */
* {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

/* Prevent text size adjustment on rotate */
html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

/* Prevent double-tap zoom on buttons */
button, a {
  touch-action: manipulation;
}
```

---

# PHASE 15 — DATABASE SCHEMA ADDITIONS (ADDITIVE ONLY)

## 15.1 Overview

All SQL below must be run through Supabase migrations. Before running any `CREATE TABLE` statement, check if the table already exists using `CREATE TABLE IF NOT EXISTS`. Before adding columns, check if they exist using the `DO $$ IF NOT EXISTS` pattern shown in Phase 9.

## 15.2 Core New Tables

```sql
-- ============================================================
-- NEXUS WORKSPACE SCHEMA ADDITIONS v2.0
-- Additive only — no drops, no truncates, no destructive ops
-- Run via: supabase migration new nexus-enhancements-v2
-- ============================================================

-- Upload intents (for tracking in-progress uploads)
CREATE TABLE IF NOT EXISTS upload_intents (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id),
  workspace_id    UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  folder_id       UUID,
  storage_path    TEXT NOT NULL,
  original_file_name TEXT NOT NULL,
  file_type       TEXT NOT NULL,
  file_size       INTEGER NOT NULL,
  file_category   TEXT NOT NULL,
  document_id     UUID REFERENCES documents(id),
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'complete', 'failed', 'expired')),
  expires_at      TIMESTAMPTZ NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Presentations (links documents to presentation data)
CREATE TABLE IF NOT EXISTS presentations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id     UUID NOT NULL UNIQUE REFERENCES documents(id) ON DELETE CASCADE,
  workspace_id    UUID NOT NULL REFERENCES workspaces(id),
  title           TEXT NOT NULL,
  data            JSONB NOT NULL DEFAULT '{}',  -- full NexusPresentation JSON
  slide_count     INTEGER DEFAULT 0,
  thumbnail_url   TEXT,                          -- R2 URL of first slide preview
  created_by      UUID NOT NULL REFERENCES auth.users(id),
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Workspace activity log
CREATE TABLE IF NOT EXISTS workspace_activity (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id    UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES auth.users(id),
  action          TEXT NOT NULL,
  entity_type     TEXT NOT NULL,   -- 'document', 'board', 'item', 'member', etc.
  entity_id       UUID,
  entity_name     TEXT,
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS workspace_activity_workspace_id_idx
  ON workspace_activity(workspace_id, created_at DESC);

-- Document comments (inline comments in editor, separate from chat)
CREATE TABLE IF NOT EXISTS document_comments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id     UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  user_id         UUID NOT NULL REFERENCES auth.users(id),
  parent_id       UUID REFERENCES document_comments(id) ON DELETE CASCADE,
  content         TEXT NOT NULL,
  position_data   JSONB,    -- stores TipTap comment mark data for positioning
  resolved        BOOLEAN DEFAULT false,
  resolved_by     UUID REFERENCES auth.users(id),
  resolved_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Workspace notifications
CREATE TABLE IF NOT EXISTS notifications (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id),
  workspace_id    UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  type            TEXT NOT NULL,    -- 'mention', 'sign_request', 'comment', 'share', etc.
  title           TEXT NOT NULL,
  body            TEXT,
  action_url      TEXT,
  read            BOOLEAN DEFAULT false,
  dismissed       BOOLEAN DEFAULT false,
  related_user_id UUID REFERENCES auth.users(id),  -- who triggered the notification
  related_entity_id UUID,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS notifications_unread_idx ON notifications(user_id) WHERE read = false;

-- Enable RLS on new tables
ALTER TABLE upload_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Notification policies
CREATE POLICY IF NOT EXISTS "notifications_user_select"
  ON notifications FOR SELECT USING (user_id = auth.uid());

CREATE POLICY IF NOT EXISTS "notifications_user_update"
  ON notifications FOR UPDATE USING (user_id = auth.uid());

-- Presentation policies
CREATE POLICY IF NOT EXISTS "presentations_select"
  ON presentations FOR SELECT
  USING (workspace_id IN (
    SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
  ));

-- Document comments policies
CREATE POLICY IF NOT EXISTS "document_comments_select"
  ON document_comments FOR SELECT
  USING (document_id IN (
    SELECT id FROM documents WHERE workspace_id IN (
      SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()
    )
  ));

CREATE POLICY IF NOT EXISTS "document_comments_insert"
  ON document_comments FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY IF NOT EXISTS "document_comments_update"
  ON document_comments FOR UPDATE
  USING (user_id = auth.uid());
```

---

# PHASE 16 — STORAGE STRATEGY FOR NEW FEATURES

## 16.1 Cloudflare R2 Bucket Structure

All documents, PDFs, presentations, and media assets go to R2. The bucket is structured as follows:

```
nexus-workspace-storage/                          (bucket root)
├── workspaces/
│   └── {workspace-id}/
│       ├── documents/
│       │   └── {year}/{month}/{upload-id}/
│       │       └── {sanitized-filename}
│       ├── thumbnails/
│       │   └── {document-id}/
│       │       ├── thumb-sm.webp                (240px wide)
│       │       ├── thumb-md.webp                (480px wide)
│       │       └── page-{n}.webp                (per-page preview for PDFs)
│       ├── presentations/
│       │   └── {document-id}/
│       │       └── slides/
│       │           └── slide-{n}.webp
│       └── signing/
│           └── {envelope-id}/
│               ├── signed-document.pdf
│               └── certificate.pdf
└── avatars/
    └── {user-id}/
        └── avatar.webp
```

## 16.2 Image Optimisation Pipeline

Every image uploaded to Nexus — whether as a document attachment, a profile picture, or a presentation image — must be automatically optimised before storage. The optimisation pipeline:

1. **Client-side pre-compression:** Using `browser-image-compression` npm package, compress large images client-side before uploading (reduces upload time, stays within R2 free limits)
2. **Server-side processing:** After upload, a Vercel Edge Function (triggered by the `/api/upload/complete` webhook) uses `sharp` to:
   - Convert to WebP (smaller file size, excellent browser support)
   - Generate multiple sizes: original, 1200px wide, 800px wide, 400px wide, 100px thumbnail
   - Strip EXIF metadata (privacy)
   - Apply progressive loading encoding
3. **Serving:** Images are served directly from R2's public URL (no Vercel bandwidth used — R2 has no egress fees)
4. **Next.js Image component:** All `<Image>` components in the UI use the R2 URLs directly with `unoptimized={true}` since optimisation has already been done, avoiding Vercel image optimisation costs

---

# PHASE 17 — COMPLETE COMPONENT ADDITIONS CATALOGUE

## 17.1 All New Components Required

This section lists every new component needed. Each must be created as a separate file in the appropriate directory. Do not inline these into page files.

```
src/components/
├── upload/
│   ├── DocumentUploadZone.tsx           ← Phase 1 (full spec above)
│   ├── UploadButton.tsx                 ← compact button trigger for DocumentUploadZone
│   └── UploadProgressToast.tsx          ← toast that shows upload progress globally
│
├── editor/
│   ├── NexusEditor.tsx                  ← Phase 2 (full spec above)
│   ├── EditorToolbar.tsx                ← top toolbar with all formatting actions
│   ├── FloatingToolbar.tsx              ← appears on text selection (like GDocs)
│   ├── EditorBubbleMenu.tsx             ← TipTap BubbleMenu for text formatting
│   ├── TableBubbleMenu.tsx              ← appears when cursor is in a table cell
│   ├── ImageBubbleMenu.tsx              ← appears when an image is selected
│   ├── EditorFooter.tsx                 ← word count, save status, collab users
│   ├── CommentsSidebar.tsx              ← inline document comments panel
│   ├── SlashCommandMenu.tsx             ← "/" command menu (like Notion)
│   ├── NexusImageView.tsx               ← Phase 3 React node view for images
│   ├── EditorVersionHistory.tsx         ← version history panel/modal
│   └── EditorShareDialog.tsx            ← share document modal
│
├── pdf/
│   ├── PDFEditor.tsx                    ← Phase 4 (skeleton spec above)
│   ├── PDFPage.tsx                      ← single PDF page with canvas layers
│   ├── PDFToolbar.tsx                   ← PDF editor top toolbar
│   ├── PDFThumbnailSidebar.tsx          ← left sidebar with page thumbnails
│   ├── PDFOutlineSidebar.tsx            ← document outline/bookmarks
│   ├── PDFCommentPanel.tsx              ← PDF-specific comments panel
│   ├── PDFPropertiesPanel.tsx           ← document properties (metadata)
│   ├── PDFSignatureFieldPlacer.tsx      ← place signature fields on PDF pages
│   ├── PDFAnnotationLayer.tsx           ← Fabric.js annotation canvas
│   ├── PDFFindReplace.tsx               ← Ctrl+F find & replace panel
│   └── PDFMergeDialog.tsx               ← merge PDFs dialog
│
├── signing/
│   ├── SignaturePad.tsx                 ← Phase 5 (full spec above)
│   ├── SigningEnvelopeCreator.tsx       ← step-by-step envelope creation flow
│   ├── SigningRecipientManager.tsx      ← add/edit/reorder recipients
│   ├── SigningFieldPlacer.tsx           ← drag-and-drop field placement UI
│   ├── SigningRequestSent.tsx           ← confirmation screen after sending
│   ├── SignerPortal.tsx                 ← what the recipient sees (no login required)
│   ├── SigningCertificate.tsx           ← completion certificate display
│   ├── SignatureStatusBadge.tsx         ← shows Signed/Pending/Void badge on docs
│   └── SigningAuditTrail.tsx            ← shows full audit log for an envelope
│
├── presentation/
│   ├── PresentationEditor.tsx           ← main editor wrapping slide canvas
│   ├── SlideCanvas.tsx                  ← interactive slide editing area
│   ├── SlideBlock.tsx                   ← individual draggable/resizable block
│   ├── SlidesSidebar.tsx                ← left panel: slide thumbnails strip
│   ├── PresentationToolbar.tsx          ← top toolbar
│   ├── BlockPropertiesPanel.tsx         ← right panel: selected block properties
│   ├── ThemePicker.tsx                  ← choose/customise presentation theme
│   ├── LayoutPicker.tsx                 ← choose slide layout
│   ├── PresentationModeView.tsx         ← full-screen Reveal.js presentation
│   ├── SpeakerNotesPanel.tsx            ← presenter notes during presentation
│   ├── AIGenerateDialog.tsx             ← Phase 6: AI deck generation modal
│   └── TemplateGallery.tsx              ← browse and apply presentation templates
│
├── chat/
│   ├── ChatSidebar.tsx                  ← Phase 7 (full chat UI)
│   ├── ChannelList.tsx                  ← left panel: list of channels + DMs
│   ├── MessageArea.tsx                  ← scrollable message feed
│   ├── MessageItem.tsx                  ← individual message with reactions etc
│   ├── MessageComposer.tsx              ← text input area with attachments
│   ├── ThreadPanel.tsx                  ← slide-in thread replies panel
│   ├── EmojiPicker.tsx                  ← emoji selection popover
│   ├── MentionAutocomplete.tsx          ← @mention user picker
│   ├── TypingIndicator.tsx              ← "Alice is typing..."
│   ├── PresenceAvatars.tsx              ← online user avatars in channel header
│   ├── MessageReactions.tsx             ← emoji reaction bar on messages
│   ├── LinkPreview.tsx                  ← OG metadata preview for URLs
│   ├── CreateChannelDialog.tsx          ← create new channel modal
│   └── DirectMessageDialog.tsx          ← start a DM modal
│
├── workspace/
│   ├── WorkspaceSwitcher.tsx            ← dropdown to switch between workspaces
│   ├── AddWorkspaceModal.tsx            ← Phase 11 step-by-step creation flow
│   ├── WorkspaceSettings.tsx            ← workspace settings panel
│   ├── MemberManager.tsx                ← add/remove/manage workspace members
│   ├── ActivityFeed.tsx                 ← Phase 8 live activity feed
│   ├── WorkspaceOnboarding.tsx          ← checklist shown to new workspace
│   ├── BoardView.tsx                    ← Monday.com style board/table
│   ├── KanbanView.tsx                   ← Kanban view of a board
│   ├── GanttView.tsx                    ← Gantt timeline view
│   ├── CalendarView.tsx                 ← Calendar view of board items
│   ├── DashboardView.tsx                ← Dashboard widgets view
│   ├── BoardToolbar.tsx                 ← board view controls and filters
│   ├── ColumnEditor.tsx                 ← add/edit/configure board columns
│   ├── ItemCard.tsx                     ← Kanban card / board row
│   ├── ItemDetails.tsx                  ← full item detail panel/modal
│   └── GroupManager.tsx                 ← add/rename/delete/reorder groups
│
├── trash/
│   ├── TrashPage.tsx                    ← Phase 9 trash page content
│   ├── TrashItem.tsx                    ← individual trashed item row
│   └── EmptyTrashDialog.tsx             ← confirmation for emptying trash
│
├── ui/
│   ├── DeleteConfirmDialog.tsx          ← Phase 12 (full spec above)
│   ├── OfflineIndicator.tsx             ← Phase 13 offline banner
│   ├── NotificationCenter.tsx           ← notification bell + panel
│   ├── NotificationItem.tsx             ← individual notification
│   ├── ContextMenu.tsx                  ← right-click context menu (generic)
│   ├── CommandPalette.tsx               ← Cmd+K command palette (like Linear)
│   ├── ResizablePanel.tsx               ← draggable panel resize handle
│   ├── ColorPicker.tsx                  ← colour picker with hex input
│   ├── EmojiIcon.tsx                    ← render emoji as workspace/item icon
│   ├── AvatarGroup.tsx                  ← stacked user avatars
│   ├── FileTypeIcon.tsx                 ← document type icon by MIME type
│   ├── ProgressRing.tsx                 ← circular progress indicator
│   ├── Tooltip.tsx                      ← accessible tooltip component
│   ├── Skeleton.tsx                     ← loading skeleton component
│   ├── Toast.tsx                        ← toast notification component
│   └── Modal.tsx                        ← accessible modal base component
│
└── mobile/
    ├── MobileBottomNav.tsx              ← bottom navigation for mobile
    ├── MobileEditorToolbar.tsx          ← compact two-row editor toolbar
    ├── MobileChatComposer.tsx           ← keyboard-aware chat input
    ├── MobileBoardCard.tsx              ← card view for board items on mobile
    └── MobileUploadSheet.tsx            ← bottom sheet for file upload on mobile
```

---

# PHASE 18 — NEW ROUTE ADDITIONS (NON-DESTRUCTIVE)

## 18.1 New Routes to Create

All routes below must be created under `src/app/(workspace)/` (or the equivalent authenticated route group already used in the existing codebase — check the audit first).

```
src/app/
├── (auth)/
│   ├── login/page.tsx                   ← may already exist — check first
│   └── signup/page.tsx                  ← may already exist — check first
│
├── (workspace)/
│   ├── layout.tsx                       ← may already exist — only add mobile bottom nav here
│   ├── workspace/
│   │   ├── [workspaceId]/
│   │   │   ├── page.tsx                 ← workspace home/overview
│   │   │   ├── board/
│   │   │   │   └── [boardId]/
│   │   │   │       └── page.tsx         ← board view (table/kanban/gantt/calendar)
│   │   │   ├── documents/
│   │   │   │   └── page.tsx             ← document library for workspace
│   │   │   ├── chat/
│   │   │   │   ├── page.tsx             ← chat hub (redirects to #general)
│   │   │   │   └── [channelId]/
│   │   │   │       └── page.tsx         ← specific channel
│   │   │   ├── members/
│   │   │   │   └── page.tsx             ← member management
│   │   │   └── settings/
│   │   │       └── page.tsx             ← workspace settings
│   │   ├── editor/
│   │   │   └── [documentId]/
│   │   │       └── page.tsx             ← rich text document editor
│   │   ├── pdf/
│   │   │   └── [documentId]/
│   │   │       └── page.tsx             ← PDF editor/viewer
│   │   ├── presentation/
│   │   │   └── [documentId]/
│   │   │       └── page.tsx             ← presentation editor
│   │   ├── presentation-view/
│   │   │   └── [documentId]/
│   │   │       └── page.tsx             ← full-screen presentation mode
│   │   ├── spreadsheet/
│   │   │   └── [documentId]/
│   │   │       └── page.tsx             ← spreadsheet editor (future phase)
│   │   ├── media/
│   │   │   └── [documentId]/
│   │   │       └── page.tsx             ← image/video/audio viewer
│   │   ├── trash/
│   │   │   └── page.tsx                 ← trash can
│   │   └── new/
│   │       └── page.tsx                 ← new document/board/workspace quick create
│   │
├── sign/
│   └── [token]/
│       └── page.tsx                     ← public signing portal (no auth required)
│
└── api/
    ├── upload/
    │   ├── signed-url/route.ts          ← Phase 1
    │   └── complete/route.ts            ← Phase 1
    ├── documents/
    │   ├── [id]/
    │   │   ├── route.ts                 ← GET, PATCH, DELETE document
    │   │   ├── convert/route.ts         ← trigger file conversion
    │   │   ├── conversion-status/route.ts ← poll conversion progress
    │   │   ├── versions/route.ts        ← list and create versions
    │   │   └── save/route.ts            ← auto-save endpoint
    ├── workspaces/
    │   ├── route.ts                     ← GET list, POST create
    │   └── [id]/
    │       ├── route.ts                 ← GET, PATCH, DELETE workspace
    │       ├── members/route.ts         ← GET, POST, DELETE members
    │       └── activity/route.ts        ← GET activity feed
    ├── chat/
    │   ├── channels/route.ts            ← GET, POST channels
    │   ├── channels/[id]/route.ts       ← PATCH, DELETE channel
    │   ├── channels/[id]/messages/route.ts ← GET history, POST message
    │   └── messages/[id]/route.ts       ← PATCH (edit), DELETE message
    ├── signing/
    │   ├── envelopes/route.ts           ← POST create envelope
    │   ├── envelopes/[id]/route.ts      ← GET, PATCH, DELETE envelope
    │   ├── envelopes/[id]/send/route.ts ← POST send signing requests
    │   ├── recipients/[token]/route.ts  ← GET recipient signing session
    │   └── recipients/[token]/sign/route.ts ← POST submit signature
    ├── presentations/
    │   ├── generate/route.ts            ← Phase 6 AI generation
    │   └── [id]/route.ts               ← GET, PATCH presentation data
    └── notifications/
        └── route.ts                     ← GET, PATCH (mark read)
```

---

# PHASE 19 — ENVIRONMENT VARIABLES REQUIRED FOR NEW FEATURES

## 19.1 New `.env.local` Variables

Read the existing `.env.local` or `.env.example` first. Add ONLY variables that are not already present:

```bash
# ============================================================
# NEXUS WORKSPACE — ADDITIONAL ENVIRONMENT VARIABLES v2.0
# Add these to .env.local alongside existing variables
# ============================================================

# Cloudflare R2 (document storage — zero egress cost)
CLOUDFLARE_R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=<your-r2-access-key-id>
CLOUDFLARE_R2_SECRET_ACCESS_KEY=<your-r2-secret-access-key>
CLOUDFLARE_R2_BUCKET_NAME=nexus-workspace-storage
CLOUDFLARE_R2_PUBLIC_URL=https://pub-<hash>.r2.dev  # from R2 bucket public access settings

# Resend (transactional email — 3,000/month free)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_FROM_NAME=Nexus Workspace

# Internal API key (for server-to-server calls within Nexus)
INTERNAL_API_KEY=<generate-a-long-random-string>

# Anthropic (AI features — billing per use, not monthly)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx

# Upstash Redis (rate limiting + presence cache — free tier)
UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=<your-upstash-token>

# App URL (used for constructing signing links, email links)
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app  # or localhost:3000 for dev

# PDF.js worker (set to CDN or local public path)
NEXT_PUBLIC_PDF_WORKER_URL=/pdf.worker.min.mjs

# Feature flags (set to 'true' or 'false')
NEXT_PUBLIC_FEATURE_AI_WRITING=true
NEXT_PUBLIC_FEATURE_PRESENTATIONS=true
NEXT_PUBLIC_FEATURE_SIGNING=true
NEXT_PUBLIC_FEATURE_CHAT=true
NEXT_PUBLIC_FEATURE_OCR=true

# Y.js signaling server (use free public server or self-host)
NEXT_PUBLIC_YJS_SIGNALING_SERVER=wss://signaling.yjs.dev
```

---

# PHASE 20 — IMPLEMENTATION SEQUENCE & EXECUTION ORDER

## 20.1 The Exact Order to Build

This sequence is designed to minimise conflicts, allow incremental testing, and ensure foundations are in place before dependent features.

**AUDIT PHASE (mandatory first, no exceptions):**
- Step 0: Execute all PHASE 0 audit commands. Write AUDIT_REPORT.md.
- Step 0a: From the audit, identify which features already exist (mark each Phase 1–14 as 'SKIP', 'EXTEND', or 'BUILD FRESH')

**FOUNDATION PHASE:**
- Step 1: Install only missing npm packages (compare audit's package.json with this brief's requirements)
- Step 2: Apply Phase 19 environment variables (add to .env.local)
- Step 3: Apply Phase 15 database migrations (run `supabase migration new nexus-v2` and add all SQL)
- Step 4: Verify all new tables exist in Supabase dashboard before proceeding

**UPLOAD SYSTEM (Phase 1):**
- Step 5: Create `src/lib/upload/accepted-types.ts`
- Step 6: Create `src/hooks/useUploadDocument.ts`
- Step 7: Create `src/app/api/upload/signed-url/route.ts`
- Step 8: Create `src/app/api/upload/complete/route.ts`
- Step 9: Create `src/components/upload/DocumentUploadZone.tsx`
- Step 10: Test upload flow end-to-end with a DOCX file and a PDF file

**EDITOR SYSTEM (Phases 2 & 3):**
- Step 11: Create `src/lib/editor/editor-config.ts`
- Step 12: Create the custom TipTap extension files
- Step 13: Create `src/components/editor/NexusEditor.tsx` and all child components
- Step 14: Create the `/workspace/editor/[documentId]` page
- Step 15: Test editor with a text document

**PDF SYSTEM (Phase 4):**
- Step 16: Install `pdfjs-dist`, `pdf-lib`, `fabric` if not already installed
- Step 17: Copy `pdf.worker.min.mjs` to `public/` from pdfjs-dist
- Step 18: Create all PDF components listed in Phase 17
- Step 19: Create `/workspace/pdf/[documentId]` page
- Step 20: Test PDF viewer with a real PDF file

**SIGNING SYSTEM (Phase 5):**
- Step 21: Create all signing API routes
- Step 22: Create all signing components
- Step 23: Create `/sign/[token]` public page (no auth required)
- Step 24: Test full signing flow: create envelope → send → sign → complete

**PRESENTATION BUILDER (Phase 6):**
- Step 25: Create presentation AI generation route
- Step 26: Create presentation editor components
- Step 27: Create `/workspace/presentation/[documentId]` page
- Step 28: Test AI generation with a simple topic

**CHAT SYSTEM (Phase 7):**
- Step 29: Create all chat database tables (covered by Phase 15 migration)
- Step 30: Create all chat components
- Step 31: Enable Supabase Realtime for `chat_messages` and `chat_channels` tables
- Step 32: Test real-time messaging between two users

**WORKSPACE MANAGEMENT (Phases 8–12):**
- Step 33: Add version history tables and soft-delete columns
- Step 34: Create workspace board views (Table, Kanban, Gantt, Calendar)
- Step 35: Create Add Workspace modal and API
- Step 36: Create Trash page and delete confirmation dialogs
- Step 37: Test delete → trash → restore cycle

**PWA & MOBILE (Phases 13 & 14):**
- Step 38: Configure next-pwa, generate PWA icons
- Step 39: Create mobile layout components (bottom nav, mobile editor, etc.)
- Step 40: Test on real mobile device (iOS Safari + Android Chrome)

**FINAL INTEGRATION:**
- Step 41: Connect notification system end-to-end
- Step 42: Connect activity feed end-to-end
- Step 43: Run full smoke test across all features
- Step 44: Deploy to Vercel: `vercel --prod`

---

# APPENDIX A — FULL DESIGN TOKEN REFERENCE

```css
/* Use these ONLY if the existing tailwind.config.ts does not already define them */
/* If tokens with different names exist for the same purpose, use the existing names */

module.exports = {
  theme: {
    extend: {
      colors: {
        nexus: {
          ink:        '#0D0F14',
          surface:    '#13161E',
          elevated:   '#1C2030',
          border:     '#2A2F42',
          'border-hov': '#3D4460',
          volt:       '#6EE7B7',
          'volt-dim': '#34D399',
          gold:       '#F59E0B',
          rose:       '#F43F5E',
          sky:        '#38BDF8',
          violet:     '#8B5CF6',
          teal:       '#14B8A6',
          'text-primary':   '#F1F5F9',
          'text-secondary': '#94A3B8',
          'text-muted':     '#475569',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
        editor:  ['Lora', 'Georgia', 'serif'],
      },
      borderRadius: {
        'nexus-sm': '6px',
        'nexus-md': '10px',
        'nexus-lg': '16px',
        'nexus-xl': '24px',
      },
      boxShadow: {
        'nexus-sm': '0 1px 3px rgba(0,0,0,0.4)',
        'nexus-md': '0 4px 16px rgba(0,0,0,0.5)',
        'nexus-lg': '0 16px 48px rgba(0,0,0,0.6)',
        'nexus-volt': '0 0 24px rgba(110,231,183,0.2)',
        'nexus-rose': '0 0 24px rgba(244,63,94,0.2)',
      },
      animation: {
        'fade-up':   'fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in':   'fadeIn 0.3s ease both',
        'slide-in':  'slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in':  'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) both',
        'shimmer':   'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
};
```

---

# APPENDIX B — COMPLETE FREE TIER USAGE SUMMARY

This table confirms that every service used in Nexus Workspace stays within free tiers permanently:

| Service | What We Use It For | Free Tier Limit | Our Expected Usage | Safe? |
|---|---|---|---|---|
| Supabase | DB, Auth, Realtime, small file meta | 500MB DB, 50K MAU, 2GB bandwidth | ~50MB DB, ~1K MAU | ✅ Very safe |
| Cloudflare R2 | All documents, media, PDFs | 10GB storage, 10M reads/month, 1M writes/month, **$0 egress** | ~2GB storage | ✅ Very safe |
| Vercel | Hosting, Edge Functions, deployments | 100GB bandwidth, unlimited deploys | ~5GB bandwidth | ✅ Very safe |
| Resend | Signing invites, share emails | 3,000 emails/month | ~200 emails/month | ✅ Very safe |
| Upstash Redis | Rate limiting, presence | 10K commands/day, 256MB | ~1K commands/day | ✅ Very safe |
| Y.js signaling | Real-time doc sync | Free public server | Minimal | ✅ Safe |
| Tesseract.js | OCR (runs in browser) | N/A (client-side) | N/A | ✅ Free forever |
| Anthropic API | AI writing, AI presentations | Pay-per-use (not monthly) | Billed per request | ⚠️ Note below |

> **Note on Anthropic API:** The AI features (AI Writing Assistant, AI Presentation Generator) make API calls that are billed per token. These are low-cost (fractions of a cent per request) but not completely free. To manage this, implement a per-user AI quota system: free users get 10 AI requests per month, with a clear UI showing remaining quota. This prevents unexpected cost spikes. All other features are 100% free.

---

# APPENDIX C — SIGNING LEGAL COMPLIANCE NOTES

The Nexus e-signing system is designed to be legally binding in jurisdictions that recognise electronic signatures, including South Africa (ECTA — Electronic Communications and Transactions Act, 2002), the United States (ESIGN Act, UETA), the European Union (eIDAS Regulation), and the United Kingdom (Electronic Communications Act 2000).

To ensure legal validity, every signing session must:

1. Record an **audit trail** with timestamps at microsecond precision (stored in `signing_audit_log`)
2. Capture the **signer's IP address** and **User-Agent header** at the moment of signing
3. Require the signer to explicitly **accept the e-signature disclosure** statement before signing
4. Generate a **completion certificate** (PDF) that includes: document hash (SHA-256), all signers' names and emails, signing timestamps, IP addresses, and a verification URL
5. Lock the signed document against any further edits (set a `locked` flag on the document record)
6. Store the final signed PDF on R2 with a **WORM-equivalent policy** (delete protection enabled on R2 bucket for signed documents subfolder)

The e-signature disclosure text that must be shown to every signer before they sign:

> "By signing this document electronically, you agree that your electronic signature is the legal equivalent of your handwritten signature. You consent to the use of electronic records and signatures in connection with this transaction. This electronic signature is legally binding in accordance with applicable law."

---

# APPENDIX D — COMMAND PALETTE (CMD+K) FEATURE

The command palette is a globally accessible search and action launcher, accessible via `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux). It provides keyboard-first access to every major action in Nexus.

It must appear as a full-width modal with a search input at the top and results below. Results are grouped into categories: Recent Documents, Workspaces, Board Actions, Document Actions, Navigation, Settings.

Commands available:
- "New Document" — opens new document in current workspace
- "New Board" — creates a new board
- "New Workspace" — opens Add Workspace modal
- "Upload Files" — opens the upload zone
- "Go to Trash" — navigates to trash page
- "Open [recent document name]" — quick-open recent docs
- "Invite Member to [workspace]"
- "Sign [document name]"
- "Send Document for Signing"
- "Generate Presentation with AI"
- "Open Chat" — focuses chat sidebar
- "Open [channel name]" — navigates to specific channel
- "Search Messages" — focuses chat search
- "Keyboard Shortcuts" — shows shortcut reference modal

---

# APPENDIX E — KEYBOARD SHORTCUTS REFERENCE

All keyboard shortcuts must be implemented and displayed in the keyboard shortcuts modal (`?` key to open):

**Global:**
- `Cmd/Ctrl + K` — Command palette
- `?` — Keyboard shortcuts reference
- `Cmd/Ctrl + /` — Toggle sidebar
- `G then D` — Go to Documents
- `G then C` — Go to Chat
- `G then T` — Go to Trash
- `Cmd/Ctrl + Shift + N` — New document

**Editor:**
- `Cmd/Ctrl + S` — Save (also auto-saves)
- `Cmd/Ctrl + Z` — Undo
- `Cmd/Ctrl + Shift + Z` — Redo
- `Cmd/Ctrl + B` — Bold
- `Cmd/Ctrl + I` — Italic
- `Cmd/Ctrl + U` — Underline
- `Cmd/Ctrl + K` — Insert link
- `Cmd/Ctrl + Shift + H` — Highlight
- `Cmd/Ctrl + Alt + 1` through `6` — Heading levels
- `Cmd/Ctrl + Shift + 7` — Ordered list
- `Cmd/Ctrl + Shift + 8` — Bullet list
- `Cmd/Ctrl + Shift + 9` — Task list
- `Tab` — Indent list item
- `Shift + Tab` — Outdent list item
- `/` — Slash command menu
- `Cmd/Ctrl + Shift + P` — Print

**PDF Editor:**
- `V` — Select tool
- `T` — Text tool
- `H` — Highlight tool
- `R` — Rectangle tool
- `C` — Circle tool
- `L` — Line tool
- `P` — Pen/freehand tool
- `N` — Sticky note tool
- `S` — Signature field tool
- `Escape` — Back to select tool
- `Delete/Backspace` — Delete selected annotation
- `Cmd/Ctrl + Z` — Undo annotation
- `Cmd/Ctrl + S` — Save PDF

**Chat:**
- `Enter` — Send message
- `Shift + Enter` — New line in composer
- `Cmd/Ctrl + K` — Jump to channel (via command palette)
- `Escape` — Close thread / dismiss
- `Arrow Up` — Edit last sent message (when composer is empty)

---

> ## ✅ BRIEF COMPLETE
>
> This document contains every specification needed for Antigravity to execute the enhancement
> of the existing Nexus Workspace codebase. Every phase is ordered, every schema is explicit,
> every component is listed, every API route is defined, and every zero-cost constraint is
> documented and verified.
>
> **Final reminders before execution:**
> 1. AUDIT FIRST. Do not write a single line of code before completing PHASE 0.
> 2. NEVER drop tables. NEVER delete components. NEVER overwrite working code.
> 3. If something already exists, EXTEND it. If it conflicts, ADAPT to the existing structure.
> 4. Test each phase before moving to the next.
> 5. All features must work on both desktop (1440px) and mobile (375px).
> 6. All storage operations go to Cloudflare R2, not Supabase Storage.
> 7. Total monthly cost: $0 (until AI API usage scales significantly).
>
> Confirm each phase completion with a log line: `✅ PHASE [N] COMPLETE — [summary of what was built/extended]`