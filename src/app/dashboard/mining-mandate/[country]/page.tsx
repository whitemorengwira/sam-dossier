'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Flag, Globe, Scales, Buildings, ShieldCheck } from '@phosphor-icons/react'

const countryData: Record<string, { name: string; flag: string; status: string; minerals: string[]; regulatory: string; spv: string; details: string; keyFacts: { label: string; value: string }[] }> = {
  'south-africa': {
    name: 'South Africa',
    flag: 'ZA',
    status: 'Operational HQ',
    minerals: ['Gold', 'Chrome', 'Platinum Group Metals'],
    regulatory: 'Department of Mineral Resources and Energy (DMRE). Mineral and Petroleum Resources Development Act (MPRDA). Mining Charter III compliance.',
    spv: 'SOCINGAMGABADELI CONSULTANCY AND PROJECTS (PTY) LTD (Reg: 2013/227290/07)',
    details: 'South Africa serves as the operational headquarters and registered domicile of Socinga Africa. The Group holds FSP 46620 for insurance administration. Mining operations are ring-fenced through dedicated SPVs to maintain regulatory clarity between insurance and extraction activities.',
    keyFacts: [
      { label: 'Registration', value: '2013/227290/07' },
      { label: 'FSP', value: '46620' },
      { label: 'Head Office', value: 'Johannesburg' },
      { label: 'Status', value: 'Active HQ' },
    ],
  },
  'zimbabwe': {
    name: 'Zimbabwe',
    flag: 'ZW',
    status: 'Primary Mining Operations',
    minerals: ['Gold', 'Chrome', 'Antimony', 'Copper', 'Lithium'],
    regulatory: 'Ministry of Mines and Mining Development. Mines and Minerals Act. Mandatory in-country beneficiation policy (effective 25 Feb 2026). Environmental Management Act compliance.',
    spv: '12 Forge (Private) Limited (Reg: 14253/2025) | Swift Ventures (Private) Limited (Reg: 27275/2022)',
    details: 'Zimbabwe is the primary theatre of mining operations for SAM. All mineral titles, processing infrastructure, and extraction activities are legally executed through locally registered SPVs. The recent beneficiation policy mandates in-country processing, creating strategic advantages for SAM\'s CIP processing infrastructure. Off-take through FGR (gold), Zimbabwe Alloys Chrome (chrome), and ARES (antimony).',
    keyFacts: [
      { label: 'SPV Registration', value: '14253/2025' },
      { label: 'Claims', value: 'Chikonga + Twelve Stones' },
      { label: 'Primary Hub', value: 'Mutare, Manicaland' },
      { label: 'Status', value: 'Active Production' },
    ],
  },
  'mozambique': {
    name: 'Mozambique',
    flag: 'MZ',
    status: 'Asset Onboarding',
    minerals: ['Gold', 'Ruby', 'Graphite'],
    regulatory: 'Ministry of Mineral Resources and Energy. Mining Law (Lei de Minas). Environmental licensing through MITADER.',
    spv: 'To be established (Phase 2)',
    details: 'Mozambique represents the next phase of SAM\'s Pan-African expansion. Asset identification and preliminary due diligence are underway. The country offers significant mineral wealth with an increasingly investor-friendly regulatory environment.',
    keyFacts: [
      { label: 'Phase', value: 'Asset Onboarding' },
      { label: 'Target Minerals', value: 'Gold, Ruby' },
      { label: 'SPV', value: 'Pending' },
      { label: 'Timeline', value: 'Q4 2028' },
    ],
  },
  'malawi': {
    name: 'Malawi',
    flag: 'MW',
    status: 'Asset Onboarding',
    minerals: ['Rare Earth Elements', 'Uranium', 'Niobium'],
    regulatory: 'Ministry of Mining. Mines and Minerals Act. Environmental Affairs Department compliance.',
    spv: 'To be established (Phase 2)',
    details: 'Malawi is included in the medium-term Pan-African strategy, offering access to rare earth elements and strategic minerals critical for the global energy transition.',
    keyFacts: [
      { label: 'Phase', value: 'Exploration' },
      { label: 'Target Minerals', value: 'REE, Uranium' },
      { label: 'SPV', value: 'Pending' },
      { label: 'Timeline', value: '2029+' },
    ],
  },
  'zambia': {
    name: 'Zambia',
    flag: 'ZM',
    status: 'Market Assessment',
    minerals: ['Copper', 'Cobalt', 'Gold', 'Emeralds'],
    regulatory: 'Ministry of Mines and Minerals Development. Mines and Minerals Development Act.',
    spv: 'To be established',
    details: 'Zambia, Africa\'s second-largest copper producer, is under active market assessment for potential joint ventures in copper and cobalt extraction.',
    keyFacts: [
      { label: 'Phase', value: 'Assessment' },
      { label: 'Primary Mineral', value: 'Copper' },
      { label: 'SPV', value: 'Pending' },
      { label: 'Timeline', value: '2029+' },
    ],
  },
  'ghana': {
    name: 'Ghana',
    flag: 'GH',
    status: 'Market Assessment',
    minerals: ['Gold', 'Bauxite', 'Manganese', 'Diamonds'],
    regulatory: 'Minerals Commission. Minerals and Mining Act. Environmental Protection Agency compliance.',
    spv: 'To be established',
    details: 'Ghana, Africa\'s largest gold producer, represents a strategic long-term expansion target for SAM\'s gold portfolio. The country\'s established mining sector and stable regulatory environment make it an attractive destination.',
    keyFacts: [
      { label: 'Phase', value: 'Assessment' },
      { label: 'Primary Mineral', value: 'Gold' },
      { label: 'SPV', value: 'Pending' },
      { label: 'Timeline', value: '2029+' },
    ],
  },
}

export default function MiningMandatePage() {
  const params = useParams()
  const slug = params.country as string
  const country = countryData[slug]

  if (!country) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-text-muted font-mono">Country profile not found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="badge badge-gold">Mining Mandate</span>
          <span className="badge badge-info">{country.status}</span>
        </div>
        <h1 className="text-gold font-display font-black text-3xl mb-2">{country.name}</h1>
        <p className="text-text-secondary text-sm">SAM operational presence and regulatory framework</p>
        <hr className="divider-gold mt-6" />
      </motion.div>

      {/* Key Facts */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {country.keyFacts.map((f) => (
          <div key={f.label} className="glass-card p-4">
            <p className="stat-label mb-1">{f.label}</p>
            <p className="font-mono text-xs text-gold font-medium">{f.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Overview */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-8">
        <div className="flex items-center gap-3 mb-4">
          <Globe size={22} weight="duotone" className="text-gold" />
          <h2 className="text-lg font-display font-bold text-gold">Overview</h2>
        </div>
        <p className="text-text-secondary leading-relaxed">{country.details}</p>
      </motion.div>

      {/* Target Minerals */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="glass-card p-8">
        <h2 className="text-lg font-display font-bold text-gold mb-4">Target Minerals</h2>
        <div className="flex flex-wrap gap-2">
          {country.minerals.map((m) => (
            <span key={m} className="badge badge-gold">{m}</span>
          ))}
        </div>
      </motion.div>

      {/* SPV */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card p-8">
        <div className="flex items-center gap-3 mb-4">
          <Buildings size={22} weight="duotone" className="text-gold" />
          <h2 className="text-lg font-display font-bold text-gold">Legal Entity / SPV</h2>
        </div>
        <p className="font-mono text-sm text-text-primary">{country.spv}</p>
      </motion.div>

      {/* Regulatory */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="glass-card p-8">
        <div className="flex items-center gap-3 mb-4">
          <Scales size={22} weight="duotone" className="text-gold" />
          <h2 className="text-lg font-display font-bold text-gold">Regulatory Framework</h2>
        </div>
        <p className="text-text-secondary leading-relaxed">{country.regulatory}</p>
      </motion.div>
    </div>
  )
}
