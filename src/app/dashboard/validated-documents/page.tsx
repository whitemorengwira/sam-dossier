import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import {
  VALIDATED_DOCUMENTS_REGISTRY,
  CATEGORY_META,
  ROLE_LABELS,
} from '@/lib/validated-documents/registry';
import type { SigningRole } from '@/lib/validated-documents/registry';
import { ValidatedDocumentsGrid } from './ValidatedDocumentsGrid';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const PRIVILEGED_ROLES = ['admin', 'team'];
const ADMIN_EMAILS = ['hello@nwhite.systems'];

export default async function ValidatedDocumentsPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const role = session?.user?.user_metadata?.role || '';
  const email = session?.user?.email || '';
  if (!PRIVILEGED_ROLES.includes(role) && !ADMIN_EMAILS.includes(email)) {
    redirect('/dashboard/overview');
  }

  const docs = VALIDATED_DOCUMENTS_REGISTRY.map((doc) => ({
    slug: doc.slug,
    title: doc.title,
    reference: doc.reference,
    category: doc.category,
    categoryLabel: CATEGORY_META[doc.category]?.label ?? doc.category,
    categoryColour: CATEGORY_META[doc.category]?.colour ?? '#D4AF37',
    description: doc.description,
    paperFormat: doc.paperFormat,
    requiredRoles: doc.requiredSigningRoles,
    roleLabels: doc.requiredSigningRoles.map(
      (r: SigningRole) => ROLE_LABELS[r]
    ),
    signedCount: 0,
    requiredCount: doc.requiredSigningRoles.length,
  }));

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 40 }}>
        <div
          style={{
            height: 3,
            background: 'linear-gradient(90deg, #D4AF37, transparent)',
            marginBottom: 24,
          }}
        />
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 34,
            fontWeight: 900,
            color: '#D4AF37',
            marginBottom: 8,
            letterSpacing: '-0.5px',
          }}
        >
          Validated Documents
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: 'italic',
            fontSize: 15,
            color: 'rgba(245,240,232,0.6)',
            maxWidth: 640,
            lineHeight: 1.6,
          }}
        >
          Board-approved governance, strategy, and operational documents. Sign
          each in your authorised capacity.
        </p>
      </div>

      {/* Document Grid */}
      <Suspense
        fallback={
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: 16,
            }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 220,
                  background: 'rgba(10,17,40,0.4)',
                  border: '1px solid rgba(212,175,55,0.1)',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
            ))}
          </div>
        }
      >
        <ValidatedDocumentsGrid docs={docs} />
      </Suspense>
    </div>
  );
}
