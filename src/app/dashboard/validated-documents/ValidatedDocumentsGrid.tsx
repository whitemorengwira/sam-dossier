'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

interface DocCard {
  slug: string;
  title: string;
  reference?: string;
  category: string;
  categoryLabel: string;
  categoryColour: string;
  description: string;
  paperFormat: string;
  requiredRoles: string[];
  roleLabels: string[];
  signedCount: number;
  requiredCount: number;
}

export function ValidatedDocumentsGrid({ docs }: { docs: DocCard[] }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: 16,
      }}
    >
      {docs.map((doc, i) => {
        const progress =
          doc.requiredCount > 0
            ? (doc.signedCount / doc.requiredCount) * 100
            : 0;

        const card = (
          <Link
            key={doc.slug}
            href={`/dashboard/validated-documents/${doc.slug}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: 24,
                background: 'rgba(10,17,40,0.4)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: 0,
                cursor: 'pointer',
                transition: 'border-color 0.25s, box-shadow 0.25s',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  doc.categoryColour + '60';
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 0 24px ${doc.categoryColour}15`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(212,175,55,0.15)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Top accent line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${doc.categoryColour}, transparent)`,
                  opacity: 0.7,
                }}
              />

              {/* Category + Reference */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    padding: '3px 10px',
                    fontSize: 9,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    background: `${doc.categoryColour}15`,
                    color: doc.categoryColour,
                    border: `1px solid ${doc.categoryColour}30`,
                  }}
                >
                  {doc.categoryLabel}
                </span>
                {doc.reference && (
                  <span
                    style={{
                      fontSize: 9,
                      fontFamily: "'JetBrains Mono', monospace",
                      color: 'rgba(212,175,55,0.6)',
                    }}
                  >
                    REF: {doc.reference}
                  </span>
                )}
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: 8,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'rgba(245,240,232,0.3)',
                    textTransform: 'uppercase',
                  }}
                >
                  {doc.paperFormat}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#F5F0E8',
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}
              >
                {doc.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 13,
                  color: 'rgba(245,240,232,0.55)',
                  lineHeight: 1.55,
                  flex: 1,
                  marginBottom: 16,
                }}
              >
                {doc.description}
              </p>

              {/* Signing progress bar */}
              <div
                style={{
                  height: 3,
                  background: 'rgba(255,255,255,0.06)',
                  marginBottom: 12,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    background: '#D4AF37',
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>

              {/* Role chips */}
              <div
                style={{
                  display: 'flex',
                  gap: 6,
                  flexWrap: 'wrap',
                }}
              >
                {doc.roleLabels.map((label, idx) => {
                  const isSigned = idx < doc.signedCount;
                  return (
                    <span
                      key={label + idx}
                      style={{
                        padding: '3px 10px',
                        fontSize: 9,
                        fontWeight: 700,
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: '0.5px',
                        background: isSigned
                          ? 'rgba(212,175,55,0.2)'
                          : 'transparent',
                        color: isSigned ? '#D4AF37' : 'rgba(148,163,184,0.6)',
                        border: `1px solid ${isSigned ? 'rgba(212,175,55,0.4)' : 'rgba(148,163,184,0.2)'}`,
                      }}
                    >
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>
          </Link>
        );

        if (prefersReducedMotion) {
          return <div key={doc.slug}>{card}</div>;
        }

        return (
          <motion.div
            key={doc.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.06,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {card}
          </motion.div>
        );
      })}
    </div>
  );
}
