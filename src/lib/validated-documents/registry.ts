/**
 * Validated Documents — Typed Registry
 *
 * Metadata for the 10 board-approved Socinga Africa governance documents.
 * Each entry maps to a static HTML file in public/documents/socinga-africa/.
 * Canvas pad IDs are taken directly from the original HTML source files.
 */

export type SigningRole = 'managing-director' | 'cfo' | 'ceo' | 'chairperson';

export interface ValidatedDocument {
  slug: string;
  filename: string;
  title: string;
  reference?: string;
  category: 'governance' | 'financial' | 'mining' | 'structural' | 'strategic';
  pillar?: 'insurance' | 'creative' | 'mining' | 'foundation' | 'group';
  description: string;
  requiredSigningRoles: SigningRole[];
  canvasPadMap: Record<string, SigningRole>;
  paperFormat: 'A4-portrait' | 'A4-landscape' | 'A3-landscape';
}

export const VALIDATED_DOCUMENTS_REGISTRY: ValidatedDocument[] = [
  {
    slug: 'establishment-policy',
    filename: 'Establishment_Policy.html',
    title: 'Establishment Policy',
    reference: '01/0000/2026',
    category: 'governance',
    pillar: 'group',
    description:
      'Founding charter setting out business establishment rules, governance structures, transitional arrangements, and jurisdictional mandate for Socinga Africa.',
    requiredSigningRoles: ['managing-director', 'ceo', 'chairperson'],
    canvasPadMap: {
      'sig-md': 'managing-director',
      'sig-ceo': 'ceo',
      'sig-chair': 'chairperson',
    },
    paperFormat: 'A4-portrait',
  },
  {
    slug: 'structural-policy',
    filename: 'Structural_Policy.html',
    title: 'Structural Policy',
    reference: '01/0000/26',
    category: 'structural',
    pillar: 'group',
    description:
      'Organisational architecture, departmental hierarchy, reporting lines, and decision-making authority framework.',
    requiredSigningRoles: ['managing-director', 'ceo', 'chairperson'],
    canvasPadMap: {
      'sig-md': 'managing-director',
      'sig-ceo': 'ceo',
      'sig-chair': 'chairperson',
    },
    paperFormat: 'A4-portrait',
  },
  {
    slug: 'financial-policy',
    filename: 'Financial_Policy.html',
    title: 'Financial Policy',
    category: 'financial',
    pillar: 'group',
    description:
      'Fiscal governance framework prescribing budget standards, expenditure controls, and financial reporting obligations.',
    requiredSigningRoles: ['managing-director', 'ceo', 'chairperson'],
    canvasPadMap: {
      'sig-md': 'managing-director',
      'sig-ceo': 'ceo',
      'sig-chair': 'chairperson',
    },
    paperFormat: 'A4-portrait',
  },
  {
    slug: 'ecosystem-policies',
    filename: 'Ecosystem_Policies.html',
    title: 'Ecosystem Policies',
    category: 'governance',
    pillar: 'group',
    description:
      'Cross-pillar governance standards covering conduct, ESG, health and safety, and inter-pillar collaboration protocols.',
    requiredSigningRoles: ['managing-director', 'cfo', 'ceo', 'chairperson'],
    canvasPadMap: {
      'sig-jabu': 'managing-director',
      'sig-mike': 'cfo',
      'sig-white': 'ceo',
      'sig-tsekane': 'chairperson',
    },
    paperFormat: 'A4-portrait',
  },
  {
    slug: 'mining-strategic-policy',
    filename: 'Mining_Strategic_Policy.html',
    title: 'Mining Strategic Policy',
    category: 'mining',
    pillar: 'mining',
    description:
      'Mineral extraction strategy, asset portfolio overview, operational phases, and capital allocation model.',
    requiredSigningRoles: ['managing-director'],
    canvasPadMap: {
      'sig-md': 'managing-director',
    },
    paperFormat: 'A4-portrait',
  },
  {
    slug: 'mining-strategy-addendum',
    filename: 'Mining_Strategy_Addendum.html',
    title: 'Mining Strategy Addendum',
    category: 'mining',
    pillar: 'mining',
    description:
      'Chikonga Mine development specifics — geological summary, mine plan, processing flowsheet, and community targets.',
    requiredSigningRoles: [],
    canvasPadMap: {},
    paperFormat: 'A4-portrait',
  },
  {
    slug: 'strategic-business-operations',
    filename: 'Strategic_Business_Operations.html',
    title: 'Strategic Business Operations',
    category: 'strategic',
    pillar: 'group',
    description:
      'Operational excellence framework, performance management, supply chain strategy, and continuous improvement mandate.',
    requiredSigningRoles: ['managing-director'],
    canvasPadMap: {
      'sig-md': 'managing-director',
    },
    paperFormat: 'A4-portrait',
  },
  {
    slug: 'corporate-services-structure',
    filename: 'Corporate_Services_Structure.html',
    title: 'Corporate Services Structure',
    category: 'structural',
    pillar: 'group',
    description:
      'Shared corporate functions organisational chart — legal, HR, IT, finance, and administration mandates.',
    requiredSigningRoles: [],
    canvasPadMap: {},
    paperFormat: 'A4-landscape',
  },
  {
    slug: 'ecosystem-organogram',
    filename: 'Ecosystem_Organogram.html',
    title: 'Ecosystem Organogram',
    category: 'structural',
    pillar: 'group',
    description:
      'Full ecosystem hierarchy — board, executive committee, five strategic pillars, and divisional sub-functions.',
    requiredSigningRoles: [],
    canvasPadMap: {},
    paperFormat: 'A3-landscape',
  },
  {
    slug: 'sam-mission-centre-budget',
    filename: 'SAM-mission-centre-budget.html',
    title: 'SAM Mission Centre Budget',
    category: 'financial',
    pillar: 'group',
    description:
      'Operational budget — revenue projections, capital expenditure, operational costs, and consolidated financial summary.',
    requiredSigningRoles: [],
    canvasPadMap: {},
    paperFormat: 'A4-landscape',
  },
  {
    slug: 'chikonga-mine-profile',
    filename: 'Chikonga_Mine_Profile.html',
    title: 'Chikonga Mine Profile',
    reference: '02/CHIKONGA/2026',
    category: 'mining',
    pillar: 'mining',
    description:
      'Comprehensive profile of the Chikonga Mine subsidiary, detailing geological extracts, strategic assets, CAPEX, and operational history.',
    requiredSigningRoles: ['managing-director', 'ceo', 'chairperson'],
    canvasPadMap: {
      'sig-md': 'managing-director',
      'sig-ceo': 'ceo',
      'sig-chair': 'chairperson',
    },
    paperFormat: 'A4-portrait',
  },
];

/** Look up a document by slug */
export function getDocumentBySlug(slug: string): ValidatedDocument | undefined {
  return VALIDATED_DOCUMENTS_REGISTRY.find((d) => d.slug === slug);
}

/** Category display labels and colours */
export const CATEGORY_META: Record<
  string,
  { label: string; colour: string }
> = {
  governance: { label: 'Governance', colour: '#9334e6' },
  financial: { label: 'Financial', colour: '#1a73e8' },
  mining: { label: 'Mining', colour: '#D4AF37' },
  structural: { label: 'Structural', colour: '#e8710a' },
  strategic: { label: 'Strategic', colour: '#137333' },
};

/** Role display labels */
export const ROLE_LABELS: Record<SigningRole, string> = {
  'managing-director': 'MD',
  cfo: 'CFO',
  ceo: 'CEO',
  chairperson: 'CHAIR',
};
