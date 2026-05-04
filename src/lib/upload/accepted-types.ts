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

// Helper: get all accepted mimetypes as flat array
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
