'use client'

import React from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

interface Props {
  uri: string;
  fileName: string;
  fileType?: string;
}

export default function DocViewerWrapper({ uri, fileName, fileType }: Props) {
  const [resolvedUri, setResolvedUri] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function resolve() {
      if (uri.includes('/api/received-docs/view')) {
        try {
          const fetchUrl = uri + (uri.includes('?') ? '&' : '?') + 'json=true';
          const res = await fetch(fetchUrl);
          const data = await res.json();
          if (data.url) {
            setResolvedUri(data.url);
          } else {
            setResolvedUri(uri);
          }
        } catch (e) {
          console.error('Failed to resolve document URL', e);
          setResolvedUri(uri);
        }
      } else {
        setResolvedUri(uri);
      }
    }
    resolve();
  }, [uri]);

  if (!resolvedUri) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <p style={{ color: '#80868b', fontSize: 13, fontFamily: 'var(--font-mono)' }}>Loading Document...</p>
      </div>
    );
  }

  let absoluteUri = resolvedUri;
  if (typeof window !== 'undefined' && absoluteUri.startsWith('/')) {
    absoluteUri = `${window.location.origin}${absoluteUri}`;
  }

  const docs = [
    { uri: absoluteUri, fileName, fileType }
  ];

  return (
    <DocViewer 
      documents={docs} 
      pluginRenderers={DocViewerRenderers} 
      style={{ width: '100%', height: '100%' }}
      config={{
        header: {
          disableHeader: true,
          disableFileName: true,
          retainURLParams: false
        }
      }}
    />
  );
}
