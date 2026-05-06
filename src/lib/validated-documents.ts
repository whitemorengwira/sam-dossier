/**
 * Validated Documents — Master Registry
 *
 * The 10 approved Socinga Africa corporate documents with their
 * full HTML content embedded. These are the real, board-approved records.
 */

export interface ValidatedDocument {
  id: string
  title: string
  category: 'corporate' | 'legal' | 'compliance' | 'governance' | 'finance' | 'hr' | 'strategy' | 'geological'
  description: string
  content: string
  signatureStatus: 'pending' | 'signed' | 'none'
  lastModified: string
}

export const VALIDATED_DOCUMENTS: ValidatedDocument[] = [
  {
    id: 'vd-establishment-policy',
    title: 'Socinga Africa Establishment Policy',
    category: 'governance',
    description: 'Business establishment rules, governance framework, and founding mandate.',
    signatureStatus: 'pending',
    lastModified: '2026-04-28T10:00:00Z',
    content: `<h1>SOCINGA AFRICA BUSINESS COMPANY</h1><h2>ESTABLISHMENT POLICY</h2><p>We Commit to Investors – Clients – Employees – Customers – Consumers – Visitors and every person interacting with us that we as the Board, Senior Executing Management and founders that we shall observe the contents of this policy found by us at all times.</p><h3>Purpose</h3><p>To give effect to Socinga Africa Ecosystem Policies Framework. To enable Socinga Africa Ecosystem Policies apply with other policies, anticipated Directives and Guidelines. To recognise the legislation and legislative mandate setting rules for the company.</p><h3>Introduction</h3><p>Socinga Africa desires to be a duly business constituted juristic body in terms of the laws of the Republic of South Africa. Compliant to King V Code the business will establish its activities directed by mainly its written rules, written norms, written standards, written policies.</p><h3>Policy Provision</h3><p>This policy handles Socinga Africa business establishment rules. This policy will be utilised as a guide to the Board, Senior Management, lower management on minimum regulation which the company commits to.</p><h3>Business Industries</h3><ul><li>Mineral Asset Investment</li><li>Broadcast creative production</li><li>Community Development Infrastructure</li><li>Long term Insurance</li></ul><h3>Governance of the Company</h3><p>The company is governed by the board to which its highest decision making rests with executive function as an executing authority. The company is managed by senior management comprising of the Managing Director, The Chief Financial Officer, The Chief Executive Officer, The Director Corporate Services.</p><hr/><p><strong>Duly Signed and Approved:</strong></p><p>Managing Director &nbsp;&nbsp;&nbsp;&nbsp; CEO &nbsp;&nbsp;&nbsp;&nbsp; Chairperson</p>`,
  },
  {
    id: 'vd-structural-policy',
    title: 'Socinga Africa Structural Policy',
    category: 'governance',
    description: 'Organisational structure, line of authority, and divisional layout.',
    signatureStatus: 'pending',
    lastModified: '2026-04-27T14:00:00Z',
    content: `<h1>SOCINGA AFRICA BUSINESS COMPANY</h1><h2>Structural Policy</h2><p>We Commit to Investors – Clients – Employees – Customers – Consumers – Visitors and every person interacting with us that we as the Board, Senior Executing Management and founders that we shall observe the contents of this policy found by us at all times.</p><h3>Purpose</h3><p>To outlay a permissible universal company structure of operations on its business affairs. To ensure the business operates being aware of its business management line of authority.</p><h3>Organisational Structure</h3><p><strong>BOARD OF DIRECTORS</strong><br/>Chairperson: Mr Tsekane Lukie Tshabalala</p><p><strong>Senior Executive Management:</strong><br/>Chief Financial Officer | Managing Director | Chief Executive Officer</p><p><strong>Established Divisions:</strong> Long term Insurance, Mining Industry, Creative Studios of Media broadcasting and Film industry, Corporate Social Services.</p><hr/><p><strong>Duly Signed and Approved:</strong></p><p>Managing Director &nbsp;&nbsp;&nbsp;&nbsp; CEO &nbsp;&nbsp;&nbsp;&nbsp; Chairperson</p>`,
  },
  {
    id: 'vd-financial-policy',
    title: 'Socinga Africa Financial Policy',
    category: 'finance',
    description: 'Financial management framework, controls, and transaction thresholds.',
    signatureStatus: 'signed',
    lastModified: '2026-04-26T09:00:00Z',
    content: `<h1>SOCINGA AFRICA BUSINESS COMPANY</h1><h2>FINANCIAL POLICY</h2><p>We Commit to Investors – Clients – Employees – Customers – Consumers – Visitors and every person interacting with us.</p><h3>PURPOSE</h3><p>To give effect to the provisions of Socinga Africa Establishment Policy No. 01/0000/2026. To provide for a financial management framework ensuring there are adequate financial management systems. To prevent weak financial management, poor financial reporting and vulnerable controls.</p><h3>FINANCIAL PROCESS</h3><ul><li>Buying in cash or in kind</li><li>Selling in cash or in kind</li><li>Disposing assets or inventory</li><li>Receiving income / donations</li><li>Paying salaries and benefits</li><li>Receiving and deciding on investments</li></ul><h3>PREVENTING FINANCIAL LOSS</h3><p>No single person is allowed to conduct financial process alone from start to end. Any transaction must be carried out through clearly defined process, stages and segregation of duties for maximum transparency. The CFO must ensure there are always checks and balances.</p><h3>FINANCIAL THRESHOLD</h3><p>Petty Cash: A company under strict petty cash register can hold cash amount not exceeding R10,000.00.</p><hr/><p><strong>Duly Signed and Approved:</strong></p><p>Managing Director &nbsp;&nbsp;&nbsp;&nbsp; CEO &nbsp;&nbsp;&nbsp;&nbsp; Chairperson</p>`,
  },
  {
    id: 'vd-strategic-ops',
    title: 'Strategic Business Operations Policy',
    category: 'strategy',
    description: 'Vision, mission, business systems, and risk management framework.',
    signatureStatus: 'pending',
    lastModified: '2026-04-30T11:00:00Z',
    content: `<h1>SOCINGA AFRICA BUSINESS COMPANY</h1><h2>STRATEGIC BUSINESS OPERATIONS POLICY</h2><h3>VISION</h3><p>To integrate specialised services offering thereby providing a unique company product impacting lives of ordinary and professional human, business, conglomerates, global consumers compatible to industrial revolution in the world economy.</p><h3>MISSION</h3><p>To accumulate wealth in the integrated African commercial community opportunities. To consolidate the services from diverse group of businesses in various industries and multidiscipline on long term investments.</p><h3>THE BUSINESS SYSTEMS</h3><p>Controls > Commands > Rules > Procedures > Processes > Regulations > Respect of agreements > related infrastructure.</p><h3>RISK MANAGEMENT</h3><ul><li>General Commercial Risk</li><li>Enterprise Wide Risk Implementation</li><li>Fraud detection and Prevention</li><li>Anti-corruption Planning</li><li>Security Management</li></ul><hr/><p><strong>END OF DRAFT > Comments Welcomed</strong></p>`,
  },
  {
    id: 'vd-ecosystem-policies',
    title: 'Socinga Africa Ecosystem Policies & OPS Framework',
    category: 'governance',
    description: 'Master policies framework covering all nine core policy areas.',
    signatureStatus: 'signed',
    lastModified: '2026-04-25T08:00:00Z',
    content: `<h1>Socinga Africa Ecosystem Policies & OPS Framework</h1><h3>Purpose</h3><p>To issue instructions and provide for operational management systems as well as direction in achieving Socinga Africa business ecosystem objectives and goals.</p><h3>Core Policies</h3><ul><li><strong>Establishment Policy:</strong> Business establishment rules</li><li><strong>Structural Policy:</strong> Operations organisation</li><li><strong>Financial Policy:</strong> Financial management rules</li><li><strong>Strategic Business Operations Policy:</strong> Business strategy provisions</li><li><strong>Human Resources Policy:</strong> Worker control and benefit</li><li><strong>Labour Relations Policy:</strong> Employee relations measures</li><li><strong>Occupational Health and Safety Policy:</strong> Safe working conditions</li><li><strong>International Relations Policy:</strong> Foreign affairs procedures</li><li><strong>Security Management Policy:</strong> Safety and security measures</li></ul><h3>Board Members</h3><p>Ms Jabulile Dladla | Mr Mike Dotsey | Mr Whitemore Ngwira | Mr Tsekane Lukie Tshabalala</p>`,
  },
  {
    id: 'vd-mining-strategy-addendum',
    title: 'Mining Strategy Addendum — Agenda V1',
    category: 'strategy',
    description: 'Mining projections, expenditure models, break-even analysis, and investment required.',
    signatureStatus: 'none',
    lastModified: '2026-05-03T16:00:00Z',
    content: `<h1>ADDENDUM TO THE AGENDA</h1><h2>Socinga Mining Strategy Meeting</h2><h3>MINING PROJECTION OVERVIEW</h3><p>Medium scale operations: minimum income of $50m, not less than $30m per annum worst case.</p><table><tr><th>Scale</th><th>Production (Tonnes/yr)</th><th>Revenue @ $130/t</th></tr><tr><td>Small</td><td>100,000 – 500,000</td><td>$4.4m – $22m</td></tr><tr><td>Medium</td><td>500,000 – 1,000,000</td><td>$65m – $130m</td></tr><tr><td>Large</td><td>1,000,000 – 2,400,000</td><td>$130m – $312m</td></tr></table><h3>Expenditure Projections</h3><table><tr><th>Category</th><th>Per Month</th><th>Per Annum</th></tr><tr><td>Equipment</td><td>$515,000</td><td>$6,180,017</td></tr><tr><td>Personnel & P&Gs</td><td>$672,014</td><td>$8,064,168</td></tr><tr><td>Diesel & consumables</td><td>$68,507</td><td>$822,089</td></tr></table><h3>BREAK EVEN POINT</h3><p>Sales per month = 30,000t @ $130/t = $3,900,000/month. Earnings = $1,694,479/month ($20.3M/yr).</p><h3>Investment Required</h3><p>$15,066,273.51 operational mining investment. ROI: 10% of profit for 24 months.</p>`,
  },
  {
    id: 'vd-mining-strategic-policy',
    title: 'Socinga Africa Mining Strategic Policy',
    category: 'strategy',
    description: 'Mining investment definition, capital deployment, and ESG commitment.',
    signatureStatus: 'signed',
    lastModified: '2026-04-20T10:00:00Z',
    content: `<h1>Socinga Africa Mining Strategic Policy</h1><h3>Defining the Investment</h3><p>Socinga Africa Mining Investments is not a financial investment but an operational mining practitioner. Its basic purpose is to prioritise maximum profits.</p><h3>Type of Asset</h3><p>Financial Infrastructure Asset category. Responsible Executive: Chief Financial Officer.</p><h3>Capital Deployment Model</h3><ul><li>Sealed in institutional grade mining</li><li>Legal ring-fenced in a Special Purpose Vehicle</li><li>Dedicated investment bank controlled account</li><li>Phased tranche finance releases</li><li>Clear operational milestones</li></ul><h3>Financial Investment Guarantee</h3><p>Secured revenue pipelines in off-take agreements. Assured and verified commodity purchases.</p><h3>ESG Commitment</h3><p>Commercial Social Investment activity programs. Investing in mining communities. Clear ESG financial commitment in business plans.</p>`,
  },
  {
    id: 'vd-loi-ares',
    title: 'Letter of Intent — ARES Antimony',
    category: 'legal',
    description: 'LOI for Antimony supply contract with African Rail Equipment Solutions.',
    signatureStatus: 'signed',
    lastModified: '2025-12-09T10:00:00Z',
    content: `<h1>LETTER OF INTENT</h1><p><strong>To:</strong> The Director – Isaac T Mutema<br/><strong>From:</strong> African Rail Equipment Solutions (Pty) Ltd<br/><strong>Re:</strong> Supply of Antimony<br/><strong>Date:</strong> 9th December 2025</p><p>We hereby confirm that we are ready, willing and able to engage you as a representative of our client, a buyer in the minerals commodity industry operating across Africa, to source Antimony on a contract basis for 12 months renewable.</p><h3>Requirements</h3><ul><li>Antimony: 5,000 MT Trial shipment + regular monthly shipments</li><li>Specification: Minimum 35% – 42%</li><li>Target Price: $5,000 – $5,500 per MT (Gross to Buyer)</li><li>Inco Term: DAP / FOT</li><li>Duration: 12 months with rolls and extensions</li></ul><h3>Sales Procedure</h3><ol><li>End-buyer and Seller engage after NCNDA and IMFPA signed</li><li>Contract documents facilitated by intermediary</li></ol><p>Yours faithfully,<br/><em>African Rail Equipment Solutions</em></p>`,
  },
  {
    id: 'vd-zedek-mou',
    title: 'Zedek Mining MoU — Gold Mining Project Zimbabwe',
    category: 'legal',
    description: 'MoU for gold mining and processing in Zimbabwe with revenue-sharing terms.',
    signatureStatus: 'signed',
    lastModified: '2026-01-12T11:00:00Z',
    content: `<h1>MEMORANDUM OF UNDERSTANDING (MoU)</h1><h2>Gold Mining & Processing Project — Republic of Zimbabwe</h2><p><strong>Operating Name:</strong> Zedek Mining</p><h3>Parties</h3><p><strong>Investor / Executive Director:</strong> Patrick Sibusiso Silas & Thulisile Cynthia Masango Silas (Single Investor Interest)</p><p><strong>Project Managers / Directors:</strong> Sibongile Gladys Zotkowski | Whitemore Ngwira | John Moyo</p><h3>Capital Injection</h3><p>First Tranche: ZAR 1,000,000. Recovery Target (incl. 20% premium): ZAR 1,200,000.</p><h3>Revenue Sharing</h3><p><strong>Phase 1 (Capital Recovery):</strong> 60% Investor / 40% split among managers + company reserve.</p><p><strong>Phase 2 (Post-Recovery):</strong> Equal 20% split across all four parties + 20% company reserve.</p><h3>Pre-Production Payroll</h3><p>Total weekly payroll: USD 975 × 14 weeks = USD 13,650.</p><hr/><p><em>Signed in hard copy on 20 December 2025</em></p>`,
  },
  {
    id: 'vd-chikonga-profile',
    title: 'Chikonga Mine Profile — Hilltouch Investments',
    category: 'geological',
    description: 'Full mine profile: geology, processing capacity, and production history.',
    signatureStatus: 'none',
    lastModified: '2026-03-15T09:00:00Z',
    content: `<h1>CHIKONGA MINE PROFILE</h1><h2>Hilltouch Investments (Pvt) Ltd</h2><p>Chikonga Mine is a subsidiary of Hilltouch Investments, an indigenous gold mining entity wholly owned by its Directors Mr Lufeyi Shato & Mrs Joyce Kujenga. Established 2005. Manicaland's 3rd largest gold producer.</p><h3>Key Facts</h3><ul><li>Location: 20km off Mutare CBD, Mutare-Harare highway</li><li>Property: 45 hectares, four 10-hectare registered claims</li><li>Staff: 50 permanent + casual workers</li><li>Gold grades: 15g/t to 25g/t (2019–2021)</li><li>First recorded production: 1959</li></ul><h3>Geological Setting</h3><p>Located in the Mutare Greenstone Belt. Lode gold concentrated in fractures and shear zones along brittle-ductile second-order faults. Multiple parallel shear zones in ~350m wide structural corridor.</p><h3>Processing</h3><p>Stamp mill + standard cyanidation extraction. Gold recovery: 90–95%. Currently treating sands through cyanidation and leaching with recently installed elution plant producing 1kg+ gold per month.</p>`,
  },
]

/** Get a validated document by ID (embedded content — no R2 fetch needed) */
export function getValidatedDocumentById(id: string): ValidatedDocument | undefined {
  return VALIDATED_DOCUMENTS.find(d => d.id === id)
}
