'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mountains, MapPin } from '@phosphor-icons/react'

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

const drillResults = [
  { location: 'Shaft No.1 - Level 1', grade: '15-40 g/t', width: '0.3-1.0m', notes: 'Harrison report 1972-1975' },
  { location: 'Shaft No.1 - Level 2', grade: '15+ g/t', width: '0.4-0.7m', notes: 'De-watered and channel sampled' },
  { location: 'East Drive L2', grade: '20 g/t avg', width: '20-70 cm', notes: 'Fine-grained grey quartz, heavy sulphides' },
  { location: 'West Drive L2', grade: 'Intersected', width: 'TBC', notes: 'Reef found beyond fault' },
  { location: 'Winze (25m depth)', grade: '5 g/t (wall)', width: '1m+ wide band', notes: 'Pale grey rock, no visible sulphides' },
  { location: 'Tailings Sampling', grade: '15 g/t', width: 'N/A', notes: 'Surface tailings average' },
]

export default function GeologicalReportPage() {
  return (
    <div className="space-y-12 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="badge badge-gold">Investment Dossier</span>
        </div>
        <h1 className="text-gold font-display font-black mb-3">Geological Report</h1>
        <p className="text-text-secondary text-lg font-heading italic max-w-2xl">
          Mutare Greenstone Belt - Mineralisation, Assay Results and Structural Geology
        </p>
        <hr className="divider-gold mt-6" />
      </motion.div>

      <ScrollReveal>
        <section className="glass-card p-8 lg:p-10 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Mountains size={24} weight="duotone" className="text-gold" />
            <h2 className="text-xl font-display font-bold text-gold">Regional Geology</h2>
          </div>
          <p className="text-text-secondary leading-relaxed">
            The geological setting of the property is located in the Mutare Greenstone Belt which is an east-west trending synclinorium of ultramafic, mafic and banded-iron formations. The lode gold is typically concentrated in fractures and shear zones along brittle-ductile second-order faults. Chikonga mine lies in the Northern part of the Mutare and Odzi greenstone belt, which is divided into two arms - the Odzi limb extending WNE from Odzi centre and the Mutare limb trending East.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Multiple parallel shear zones have been discovered in an approximate 350-metre wide structural corridor which strikes east-northeast across the property. Mineralised reefs/shear zones occur as siliceous mica schist and silicified andesite typically hosting bands of fine-grained grey and black quartz with disseminated pyrrhotite, pyrite, arsenopyrite, chalcopyrite and gold.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <section className="glass-card p-8 lg:p-10">
          <h2 className="text-xl font-display font-bold text-gold mb-6">Underground Sampling and Assay Results</h2>
          <p className="text-text-muted text-xs mb-4 font-mono">Source: Geological Survey of Rhodesia | N. M. Harrison (1972-1975)</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold/20">
                  <th className="text-left py-3 px-3 text-gold font-mono text-xs uppercase">Location</th>
                  <th className="text-left py-3 px-3 text-gold font-mono text-xs uppercase">Grade</th>
                  <th className="text-left py-3 px-3 text-gold font-mono text-xs uppercase">Width</th>
                  <th className="text-left py-3 px-3 text-gold font-mono text-xs uppercase">Notes</th>
                </tr>
              </thead>
              <tbody>
                {drillResults.map((row, i) => (
                  <tr key={i} className="border-b border-gold/10 hover:bg-gold/[0.04]">
                    <td className="py-3 px-3 text-text-primary text-xs">{row.location}</td>
                    <td className="py-3 px-3 font-mono text-gold text-xs font-medium">{row.grade}</td>
                    <td className="py-3 px-3 font-mono text-text-secondary text-xs">{row.width}</td>
                    <td className="py-3 px-3 text-text-muted text-xs">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <section className="glass-card p-8 lg:p-10 space-y-4">
          <h2 className="text-xl font-display font-bold text-gold mb-4">East and West Drives - Level 2</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gold/15 p-5">
              <h4 className="text-gold font-body font-semibold text-sm mb-3">East Drive</h4>
              <p className="text-text-secondary text-xs leading-relaxed">
                In the first 5 metres of the drive, three wide quartz veins and several narrow parallel fractures have been intersected. The first faults dipped 70 to 75 degrees towards the north-east. At about 6 metres the reef was intersected and has been driven for 8 metres where it is cut by the No.1 fault. The reef commences at 40 cm wide and attains a maximum width of 70 cm. It consists of fine-grained grey quartz heavily impregnated with pyrrhotite, pyrite, arsenopyrite and chalcopyrite.
              </p>
            </div>
            <div className="border border-gold/15 p-5">
              <h4 className="text-gold font-body font-semibold text-sm mb-3">West Drive</h4>
              <p className="text-text-secondary text-xs leading-relaxed">
                On the east side of the winze the recommended 3 metres of development was done before turning towards the foot-wall. At 13.4 metres, stringers of chalcopyrite/pyrite occurred over a width of one metre. Reef has been intersected in the west cross-cut a further 3 metres on the recommended bearing. Reef has also been found beyond the fault in the East Drive.
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <section className="glass-card p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <MapPin size={24} weight="duotone" className="text-gold" />
            <h2 className="text-xl font-display font-bold text-gold">Grade Progression</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { year: '2019', grade: '15 g/t', colour: 'text-text-secondary' },
              { year: '2020', grade: '18 g/t', colour: 'text-gold/80' },
              { year: '2021', grade: '25 g/t', colour: 'text-gold' },
            ].map((g) => (
              <div key={g.year} className="border border-gold/20 p-5 text-center">
                <p className="stat-label mb-2">{g.year}</p>
                <p className={`font-mono text-2xl font-bold ${g.colour}`}>{g.grade}</p>
              </div>
            ))}
          </div>
          <p className="text-text-muted text-xs mt-4 text-center font-mono">
            Improving grade trend demonstrates consistent reef quality improvement
          </p>
        </section>
      </ScrollReveal>
    </div>
  )
}
