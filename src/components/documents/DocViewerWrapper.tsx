'use client'

import React from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

interface Props {
  uri: string;
  fileName: string;
}

export default function DocViewerWrapper({ uri, fileName }: Props) {
  const docs = [
    { uri, fileName }
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
