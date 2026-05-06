'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface DocumentViewerProps {
  slug: string;
  title: string;
  paperFormat: 'A4-portrait' | 'A4-landscape' | 'A3-landscape';
}

export function DocumentViewer({
  slug,
  title,
  paperFormat,
}: DocumentViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(1200);
  const renderUrl = `/api/validated-documents/${slug}/render`;

  // Listen for postMessage from the signing bridge
  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (
        data &&
        data.source === 'sam-dossier-bridge' &&
        data.type === 'resize' &&
        data.slug === slug &&
        typeof data.height === 'number'
      ) {
        setIframeHeight(data.height + 60);
      }
    },
    [slug]
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  const handleOpenNewTab = () => {
    window.open(renderUrl, '_blank');
  };

  const handlePrint = () => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.print();
    }
  };

  const handleClearSignature = async () => {
    try {
      await fetch(`/api/validated-documents/${slug}/signatures`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ padId: 'all' }),
        credentials: 'same-origin',
      });
      if (iframeRef.current) {
        iframeRef.current.src = renderUrl;
      }
    } catch {
      // Silently fail
    }
  };

  return (
    <div>
      {/* Action toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 16px',
          background: 'rgba(10,17,40,0.5)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212,175,55,0.1)',
          borderBottom: 'none',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={handleOpenNewTab}
          style={toolbarBtnStyle}
          title="Open in new tab"
        >
          ↗ Open in New Tab
        </button>
        <button
          onClick={handlePrint}
          style={toolbarBtnStyle}
          title="Download as PDF via print dialogue"
        >
          ⎙ Download PDF
        </button>
        <button
          onClick={handleClearSignature}
          style={{
            ...toolbarBtnStyle,
            color: 'rgba(239,68,68,0.8)',
            borderColor: 'rgba(239,68,68,0.2)',
          }}
          title="Clear your own signatures"
        >
          ✕ Clear My Signature
        </button>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 10,
            fontFamily: "'JetBrains Mono', monospace",
            color: 'rgba(245,240,232,0.3)',
          }}
        >
          {title} — {paperFormat}
        </span>
      </div>

      {/* Iframe container — always 100% width, no horizontal scroll */}
      <div
        style={{
          border: '1px solid rgba(212,175,55,0.1)',
          background: '#fff',
          overflow: 'hidden',
        }}
      >
        <iframe
          ref={iframeRef}
          src={renderUrl}
          title={title}
          loading="eager"
          referrerPolicy="same-origin"
          style={{
            width: '100%',
            height: iframeHeight,
            border: 'none',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
}

const toolbarBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '6px 14px',
  fontSize: 11,
  fontWeight: 600,
  fontFamily: "'JetBrains Mono', monospace",
  background: 'rgba(212,175,55,0.08)',
  border: '1px solid rgba(212,175,55,0.2)',
  color: '#D4AF37',
  cursor: 'pointer',
  transition: 'all 0.2s',
  letterSpacing: '0.3px',
};
