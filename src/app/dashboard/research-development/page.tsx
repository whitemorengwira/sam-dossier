'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Microscope, FileText, DownloadSimple, MagnifyingGlass } from '@phosphor-icons/react'

const reports = [
  {
    id: 'mengxi-prospects',
    title: 'MENGXI Prospects Overview',
    type: 'Exploration Data',
    date: 'March 2026',
    status: 'Verified',
    description: 'Detailed geological analysis and viability assessment for the MENGXI prospective mining claims.',
    url: 'https://pub-dd1f1b0a9ff04fa6bb66b9fa33f8f4aa.r2.dev/sam-dossier/public/received-verified-documents/MENGXI%20Prospects%20Trenching%20and%20Sampling.pdf'
  }
]

export default function ResearchAndDevelopmentPage() {
  const [search, setSearch] = useState('')

  const filtered = reports.filter(r => r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-serif text-white tracking-wide mb-2 uppercase flex items-center gap-3">
          <span className="text-gold"><Microscope weight="duotone" size={32} /></span> Research & Development
        </h1>
        <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
          Exploration, Geology & Prospect Data
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between bg-onyx border border-gold/20 p-4 rounded-lg">
        <div className="relative w-full max-w-md">
          <input 
            type="text" 
            placeholder="Search R&D reports..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-onyx-light border border-gold/30 rounded px-4 py-2 pl-10 text-sm text-white focus:outline-none focus:border-gold transition-colors"
          />
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((report, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={report.id} 
            className="bg-onyx border border-gold/10 hover:border-gold/30 rounded-lg p-6 transition-colors flex flex-col h-full"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gold/10 p-3 rounded text-gold">
                <FileText size={24} weight="duotone" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-1 rounded uppercase tracking-wider ${report.status === 'Verified' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                {report.status}
              </span>
            </div>
            
            <div className="mb-2">
              <span className="text-[10px] text-gold uppercase tracking-widest font-mono">{report.type} • {report.date}</span>
            </div>
            <h3 className="text-white font-serif text-lg mb-2">{report.title}</h3>
            <p className="text-slate-400 text-sm flex-1">{report.description}</p>
            
            <div className="mt-6 pt-4 border-t border-gold/10 flex items-center justify-between">
              <a 
                href={report.url}
                target={report.url !== '#' ? "_blank" : "_self"}
                className="text-gold text-sm font-bold hover:text-gold-light transition-colors flex items-center gap-2"
              >
                View Document
              </a>
              <button className="text-slate-500 hover:text-white transition-colors" title="Download Source Data">
                <DownloadSimple size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
