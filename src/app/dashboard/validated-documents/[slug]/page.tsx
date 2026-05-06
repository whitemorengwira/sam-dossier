import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getDocumentBySlug,
  CATEGORY_META,
  ROLE_LABELS,
} from '@/lib/validated-documents/registry';
import { DocumentViewer } from './DocumentViewer';

export const dynamic = 'force-dynamic';

export default async function ValidatedDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDocumentBySlug(slug);

  if (!doc) {
    notFound();
  }

  const catMeta = CATEGORY_META[doc.category];

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      {/* Breadcrumb */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 24,
          fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <Link
          href="/dashboard/overview"
          style={{ color: 'rgba(245,240,232,0.4)', textDecoration: 'none' }}
        >
          Dashboard
        </Link>
        <span style={{ color: 'rgba(245,240,232,0.2)' }}>›</span>
        <Link
          href="/dashboard/validated-documents"
          style={{ color: 'rgba(245,240,232,0.4)', textDecoration: 'none' }}
        >
          Validated Documents
        </Link>
        <span style={{ color: 'rgba(245,240,232,0.2)' }}>›</span>
        <span style={{ color: '#D4AF37' }}>{doc.title}</span>
      </nav>

      {/* Document header */}
      <div
        style={{
          padding: 24,
          background: 'rgba(10,17,40,0.5)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212,175,55,0.15)',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div style={{ flex: 1, minWidth: 300 }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 28,
                fontWeight: 900,
                color: '#F5F0E8',
                marginBottom: 8,
              }}
            >
              {doc.title}
            </h1>
            <p
              style={{
                fontSize: 13,
                color: 'rgba(245,240,232,0.55)',
                lineHeight: 1.55,
                maxWidth: 600,
              }}
            >
              {doc.description}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 8,
            }}
          >
            {/* Reference badge */}
            {doc.reference && (
              <span
                style={{
                  padding: '4px 12px',
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                  background: 'rgba(212,175,55,0.15)',
                  color: '#D4AF37',
                  border: '1px solid rgba(212,175,55,0.3)',
                }}
              >
                {doc.reference}
              </span>
            )}

            {/* Category + pillar */}
            <div style={{ display: 'flex', gap: 6 }}>
              <span
                style={{
                  padding: '3px 10px',
                  fontSize: 9,
                  fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  background: `${catMeta?.colour ?? '#D4AF37'}15`,
                  color: catMeta?.colour ?? '#D4AF37',
                  border: `1px solid ${catMeta?.colour ?? '#D4AF37'}30`,
                }}
              >
                {catMeta?.label ?? doc.category}
              </span>
              {doc.pillar && (
                <span
                  style={{
                    padding: '3px 10px',
                    fontSize: 9,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    background: 'rgba(212,175,55,0.08)',
                    color: 'rgba(212,175,55,0.6)',
                    border: '1px solid rgba(212,175,55,0.15)',
                  }}
                >
                  {doc.pillar} pillar
                </span>
              )}
            </div>

            {/* Role chips */}
            <div style={{ display: 'flex', gap: 4 }}>
              {doc.requiredSigningRoles.map((role) => (
                <span
                  key={role}
                  style={{
                    padding: '2px 8px',
                    fontSize: 9,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'rgba(148,163,184,0.6)',
                    border: '1px solid rgba(148,163,184,0.2)',
                  }}
                >
                  {ROLE_LABELS[role]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Document Viewer (Client Component) */}
      <DocumentViewer
        slug={doc.slug}
        title={doc.title}
        paperFormat={doc.paperFormat}
      />
    </div>
  );
}
