'use client'

import React from 'react'

interface Props {
  htmlContent: string
}

export default function NativeCGDoc({ htmlContent }: Props) {
  return (
    <div style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center', background: '#E8EAED', minHeight: '100%', overflowY: 'auto', flex: 1 }}>
      <div 
        className="prose prose-sm sm:prose-base lg:prose-lg prose-slate"
        style={{ 
          background: 'white', 
          padding: '60px 80px', 
          borderRadius: '4px', 
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          width: '100%',
          maxWidth: '900px',
          fontFamily: 'var(--font-sans)',
          color: '#333'
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  )
}
