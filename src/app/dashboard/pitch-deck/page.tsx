'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PresentationChart, ArrowRight, DownloadSimple, Globe, UploadSimple, X } from '@phosphor-icons/react'
import { PresentationEditor, Slide } from '@/components/presentation/PresentationEditor'
import { DocumentUploadZone } from '@/components/upload/DocumentUploadZone'

const initialSlidesData = [
  { num: 1, title: 'Legal Disclaimer and Safe Harbour', section: 'Cover', content: ['Strictly confidential.', 'Forward-looking statements included.', 'Not an offer to sell securities.'] },
  { num: 2, title: 'The Socinga Africa Ecosystem', section: 'Introduction', content: ['Mining & Refining.', 'Agriculture.', 'Technology and Infrastructure.'] },
  { num: 3, title: 'Corporate, Regulatory and Verification Disclosure', section: 'Compliance', content: ['Fully licensed under Zim laws.', 'Compliance with local ownership structures.', 'Environmental permits secured.'] },
  { num: 4, title: 'Introduction to Socinga Africa Mining', section: 'SAM', content: ['Over 10 years of experience.', 'Specialized in precious metals.', 'Sustainable mining focus.'] },
  { num: 5, title: 'Executive Summary', section: 'SAM', content: ['Seeking $50M capital.', 'Projected 35% IRR.', 'Payback period: 3.5 years.'] },
  { num: 6, title: 'Zimbabwe\'s Refining Revolution', section: 'Market', content: ['New refinery processing capabilities.', 'Government incentives for local beneficiation.', 'Strategic location in Southern Africa.'] },
  { num: 7, title: 'The Operational Lifecycle: From Shaft to Sale', section: 'Operations', content: ['Exploration & Resource Definition.', 'Extraction & Processing.', 'Refining & Export.'] },
  { num: 8, title: 'Zimbabwe Mining Assets - Commodity Profiles', section: 'Assets', content: ['Gold: 3 Active Shafts.', 'Lithium: Early Exploration.', 'Platinum Group Metals (PGMs).'] },
  { num: 9, title: 'Executive Leadership Team', section: 'Team', content: ['CEO: John Doe - 20 yrs mining experience.', 'CFO: Jane Smith - Ex-Investment Banking.', 'COO: Michael Johnson - Operations expert.'] },
  { num: 10, title: 'Deal Structure, Use of Funds and Exit Strategy', section: 'Finance', content: ['Equity offering: 20% stake.', 'Funds allocated to CAPEX and OPEX.', 'Exit via IPO or acquisition in 5 years.'] },
  { num: 11, title: 'Projected Financials and ROI (3-Year Model)', section: 'Finance', content: ['Year 1: $10M Revenue.', 'Year 2: $25M Revenue.', 'Year 3: $50M Revenue.'] },
  { num: 12, title: 'Risks and Mitigation', section: 'Risk', content: ['Regulatory changes -> Strong local partnerships.', 'Price volatility -> Hedging strategies.', 'Operational delays -> Buffer in timelines.'] },
  { num: 13, title: 'ESG Framework: Sustainability and Governance', section: 'ESG', content: ['Community development programs.', 'Water recycling initiatives.', 'Strict safety protocols.'] },
  { num: 14, title: 'Further Reading and Investor Portal', section: 'Resources', content: ['Access data room for detailed financials.', 'Review technical reports.', 'Contact investor relations.'] },
]

const mappedSlides: Slide[] = initialSlidesData.map(s => ({
  id: `slide-${s.num}`,
  title: s.title,
  content: s.content,
  notes: `Slide notes for ${s.title}`
}))

export default function PitchDeckPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="badge badge-gold">Mining Division</span>
          </div>
          <h1 className="text-gold font-display font-black text-xl">Investor Pitch Deck Editor</h1>
          <p className="text-text-muted text-xs">SOCINGA-AFRICA Mining Pitch Deck 2026 | {mappedSlides.length} Slides</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-4 py-2 text-sm flex items-center gap-2 rounded border border-emerald-200 transition-colors font-medium"
          >
            <UploadSimple size={16} weight="bold" /> Upload Document
          </button>
          <button className="btn-gold px-4 py-2 text-sm flex items-center gap-2">
            <DownloadSimple size={16} weight="bold" /> Download PDF
          </button>
        </div>
      </div>

      {/* Editor Space */}
      <div className="flex-1 overflow-hidden relative">
        <PresentationEditor initialSlides={mappedSlides} />
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b flex items-center justify-between bg-gray-50">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <UploadSimple weight="duotone" className="text-emerald-600" />
                  Upload Documents
                </h2>
                <button 
                  onClick={() => setIsUploadModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                <DocumentUploadZone 
                  workspaceId="default-workspace" 
                  onUploadComplete={(id, url) => {
                    console.log('Upload complete', id, url);
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
