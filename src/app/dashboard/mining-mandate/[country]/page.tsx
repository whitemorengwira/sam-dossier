'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getLatestPageVersion, savePageVersion } from '@/lib/actions/cmsActions'
import { useCmsStore, BlockData } from '@/lib/store/useCmsStore'
import { CmsProvider } from '@/components/cms/CmsProvider'
import { CmsToolbar } from '@/components/cms/CmsToolbar'
import { BlockRenderer } from '@/components/cms/BlockRenderer'
import { PropertyPanel } from '@/components/cms/PropertyPanel'
import { BlockPickerModal } from '@/components/cms/BlockPickerModal'

const countryData: Record<string, { name: string; status: string; minerals: string[]; regulatory: string; spv: string; details: string; keyFacts: { label: string; value: string }[] }> = {
  'south-africa': {
    name: 'South Africa', status: 'Operational HQ', minerals: ['Gold', 'Chrome', 'Platinum Group Metals'],
    regulatory: 'Department of Mineral Resources and Energy (DMRE). Mineral and Petroleum Resources Development Act (MPRDA). Mining Charter III compliance.',
    spv: 'SOCINGAMGABADELI CONSULTANCY AND PROJECTS (PTY) LTD (Reg: 2013/227290/07)',
    details: 'South Africa serves as the operational headquarters and registered domicile of Socinga Africa. The Group holds FSP 46620 for insurance administration. Mining operations are ring-fenced through dedicated SPVs to maintain regulatory clarity between insurance and extraction activities.',
    keyFacts: [{ label: 'Registration', value: '2013/227290/07' }, { label: 'FSP', value: '46620' }, { label: 'Head Office', value: 'Johannesburg' }, { label: 'Status', value: 'Active HQ' }],
  },
  'zimbabwe': {
    name: 'Zimbabwe', status: 'Primary Mining Operations', minerals: ['Gold', 'Chrome', 'Antimony', 'Copper', 'Lithium'],
    regulatory: 'Ministry of Mines and Mining Development. Mines and Minerals Act. Mandatory in-country beneficiation policy (effective 25 Feb 2026). Environmental Management Act compliance.',
    spv: '12 Forge (Private) Limited (Reg: 14253/2025) | Swift Ventures (Private) Limited (Reg: 27275/2022)',
    details: 'Zimbabwe is the primary theatre of mining operations for SAM. All mineral titles, processing infrastructure, and extraction activities are legally executed through locally registered SPVs.',
    keyFacts: [{ label: 'SPV Registration', value: '14253/2025' }, { label: 'Claims', value: 'Chikonga + Twelve Stones' }, { label: 'Primary Hub', value: 'Mutare, Manicaland' }, { label: 'Status', value: 'Active Production' }],
  },
  'mozambique': {
    name: 'Mozambique', status: 'Asset Onboarding', minerals: ['Gold', 'Ruby', 'Graphite'],
    regulatory: 'Ministry of Mineral Resources and Energy. Mining Law (Lei de Minas). Environmental licensing through MITADER.',
    spv: 'To be established (Phase 2)',
    details: 'Mozambique represents the next phase of SAM\'s Pan-African expansion. Asset identification and preliminary due diligence are underway.',
    keyFacts: [{ label: 'Phase', value: 'Asset Onboarding' }, { label: 'Target Minerals', value: 'Gold, Ruby' }, { label: 'SPV', value: 'Pending' }, { label: 'Timeline', value: 'Q4 2028' }],
  },
  'malawi': {
    name: 'Malawi', status: 'Asset Onboarding', minerals: ['Rare Earth Elements', 'Uranium', 'Niobium'],
    regulatory: 'Ministry of Mining. Mines and Minerals Act. Environmental Affairs Department compliance.',
    spv: 'To be established (Phase 2)',
    details: 'Malawi is included in the medium-term Pan-African strategy, offering access to rare earth elements and strategic minerals critical for the global energy transition.',
    keyFacts: [{ label: 'Phase', value: 'Exploration' }, { label: 'Target Minerals', value: 'REE, Uranium' }, { label: 'SPV', value: 'Pending' }, { label: 'Timeline', value: '2029+' }],
  },
  'zambia': {
    name: 'Zambia', status: 'Market Assessment', minerals: ['Copper', 'Cobalt', 'Gold', 'Emeralds'],
    regulatory: 'Ministry of Mines and Minerals Development. Mines and Minerals Development Act.',
    spv: 'To be established',
    details: 'Zambia, Africa\'s second-largest copper producer, is under active market assessment for potential joint ventures in copper and cobalt extraction.',
    keyFacts: [{ label: 'Phase', value: 'Assessment' }, { label: 'Primary Mineral', value: 'Copper' }, { label: 'SPV', value: 'Pending' }, { label: 'Timeline', value: '2029+' }],
  },
  'ghana': {
    name: 'Ghana', status: 'Market Assessment', minerals: ['Gold', 'Bauxite', 'Manganese', 'Diamonds'],
    regulatory: 'Minerals Commission. Minerals and Mining Act. Environmental Protection Agency compliance.',
    spv: 'To be established',
    details: 'Ghana, Africa\'s largest gold producer, represents a strategic long-term expansion target for SAM\'s gold portfolio. The country\'s established mining sector and stable regulatory environment make it an attractive destination.',
    keyFacts: [{ label: 'Phase', value: 'Assessment' }, { label: 'Primary Mineral', value: 'Gold' }, { label: 'SPV', value: 'Pending' }, { label: 'Timeline', value: '2029+' }],
  },
}

export default function MiningMandatePage() {
  const params = useParams()
  const slug = params.country as string
  const country = countryData[slug]
  
  const { blocks, setBlocks, clearHistory } = useCmsStore()
  const [loading, setLoading] = useState(true)
  const [editingMode, setEditingMode] = useState(false)

  const PAGE_SLUG = `mining-mandate-${slug}`

  useEffect(() => {
    const storedGlobal = (window as unknown as Record<string, boolean>).__samEditMode
    if (storedGlobal) setEditingMode(true)

    const handler = (e: Event) => setEditingMode((e as CustomEvent).detail.enabled)
    window.addEventListener('sam-edit-mode', handler)
    return () => window.removeEventListener('sam-edit-mode', handler)
  }, [])

  useEffect(() => {
    async function init() {
      if (!country) return setLoading(false)
      
      const FALLBACK_BLOCKS: BlockData[] = [
        {
          id: "hero", type: "TextBlock",
          props: { text: `<span class='badge badge-gold'>Mining Mandate</span><span class='badge badge-info ml-2'>${country.status}</span><h1 class='text-gold font-display font-black text-4xl mb-2 mt-4'>${country.name}</h1><p class='text-text-secondary text-sm'>SAM operational presence and regulatory framework</p>` }
        },
        { id: "div-1", type: "Divider", props: { style: "solid", colour: "rgba(212,175,55,0.25)" } },
        {
          id: "facts", type: "TextBlock",
          props: { text: `<h2 class='text-xl font-display font-bold text-gold mb-4'>Key Facts</h2><p class='text-text-secondary mb-2'>${country.keyFacts.map(f => `<strong>${f.label}:</strong> ${f.value}`).join('<br/>')}</p>` }
        },
        {
          id: "details", type: "TextBlock",
          props: { text: `<h2 class='text-xl font-display font-bold text-gold mb-4'>Overview</h2><p class='text-text-secondary leading-relaxed'>${country.details}</p>` }
        },
        {
          id: "minerals", type: "TextBlock",
          props: { text: `<h2 class='text-xl font-display font-bold text-gold mb-4'>Target Minerals</h2><p class='text-text-secondary'>${country.minerals.join(', ')}</p>` }
        },
        {
          id: "spv", type: "TextBlock",
          props: { text: `<h2 class='text-xl font-display font-bold text-gold mb-4'>Legal Entity / SPV</h2><p class='text-text-primary font-mono'>${country.spv}</p>` }
        },
        {
          id: "reg", type: "TextBlock",
          props: { text: `<h2 class='text-xl font-display font-bold text-gold mb-4'>Regulatory Framework</h2><p class='text-text-secondary leading-relaxed'>${country.regulatory}</p>` }
        }
      ]

      try {
        const latest = await getLatestPageVersion(PAGE_SLUG)
        if (latest && latest.content_json && latest.content_json.length > 0) {
          setBlocks(latest.content_json)
        } else {
          setBlocks(FALLBACK_BLOCKS)
        }
      } catch (e) {
        setBlocks(FALLBACK_BLOCKS)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [slug, country, setBlocks])

  const handleSave = async () => {
    const label = prompt('Enter an optional label for this version:') || undefined
    await savePageVersion(PAGE_SLUG, blocks, label)
    clearHistory()
  }

  const handleDiscard = () => {
    if (confirm('Discard unsaved changes?')) window.location.reload()
  }

  if (!country) return <div className="text-center p-20 text-text-muted font-mono">Country profile not found.</div>
  if (loading) return <div className="text-center p-20 text-text-muted animate-pulse font-mono">Loading country profile...</div>

  return (
    <div className="space-y-4 max-w-5xl pb-32">
      {editingMode && <CmsToolbar pageSlug={PAGE_SLUG} onSave={handleSave} onDiscard={handleDiscard} />}
      <CmsProvider>
        {blocks.map(block => <BlockRenderer key={block.id} block={block} />)}
      </CmsProvider>
      <PropertyPanel />
      <BlockPickerModal />
    </div>
  )
}
