'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  MapPin,
  Mountains,
  Hammer,
  Factory,
  GlobeHemisphereEast,
  Users,
  Lightning,
  Drop,
} from '@phosphor-icons/react'

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* Data table for geological sampling results */
const sampleResults = [
  { location: 'Start + 7m', grade: '10 g/t', width: '80 cm' },
  { location: '+ 8m', grade: '30 g/t', width: '120 cm' },
  { location: '+10m', grade: '25.4 g/t', width: '146 cm (NFE)' },
  { location: '+12m', grade: '15.2 g/t', width: '100 cm' },
  { location: '+12m (HW)', grade: '40 g/t', width: '160 cm' },
  { location: '+14m', grade: '20.6 g/t', width: '120 cm' },
  { location: '+14m (HW)', grade: '20 g/t', width: '140 cm' },
]

/* Mine coordinate blocks */
const coordinates = [
  {
    block: 'Block G 1284',
    points: [
      { label: 'A', easting: '36k 0445050', northing: 'UTM 7908850' },
      { label: 'B', easting: '36k 0445250', northing: 'UTM 7908700' },
      { label: 'C', easting: '36k 0445400', northing: 'UTM 7908350' },
      { label: 'D', easting: '36k 0445250', northing: 'UTM 7908600' },
    ],
  },
  {
    block: 'Block G 1285',
    points: [
      { label: 'A', easting: '36k 0445400', northing: 'UTM 7908400' },
      { label: 'B', easting: '36k 0445800', northing: 'UTM 7908600' },
      { label: 'C', easting: '36k 0445900', northing: 'UTM 7908300' },
      { label: 'D', easting: '36k 0445400', northing: 'UTM 7908200' },
    ],
  },
]

export default function ChikongaProfilePage() {
  return (
    <div className="space-y-12 max-w-6xl">
      {/* Page Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="badge badge-gold">Investment Dossier</span>
          <span className="badge badge-info">Mine Profile</span>
        </div>
        <h1 className="text-gold font-display font-black mb-3">
          Chikonga Mine Profile
        </h1>
        <p className="text-text-secondary text-lg font-heading italic max-w-2xl">
          Hilltouch Investments (Pvt) Ltd - Mutare, Manicaland Province, Zimbabwe
        </p>
        <hr className="divider-gold mt-6" />
      </motion.div>

      {/* At a Glance - Key Facts Grid */}
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <MapPin size={20} weight="duotone" />, label: 'Location', value: '20km off Mutare CBD' },
            { icon: <Mountains size={20} weight="duotone" />, label: 'Area', value: '45 Hectares' },
            { icon: <Hammer size={20} weight="duotone" />, label: 'Claims', value: '4 Registered Claims' },
            { icon: <GlobeHemisphereEast size={20} weight="duotone" />, label: 'Established', value: '2005' },
            { icon: <Users size={20} weight="duotone" />, label: 'Workforce', value: '50+ Staff' },
            { icon: <Lightning size={20} weight="duotone" />, label: 'Avg Grade', value: '15 - 25 g/t' },
            { icon: <Drop size={20} weight="duotone" />, label: 'Recovery Rate', value: '90 - 95%' },
            { icon: <Factory size={20} weight="duotone" />, label: 'Processing', value: 'Stamp Mill + CIL' },
          ].map((item) => (
            <div key={item.label} className="glass-card p-4">
              <span className="text-gold/60">{item.icon}</span>
              <p className="stat-label mt-2">{item.label}</p>
              <p className="text-text-primary font-mono text-sm font-medium mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Introduction */}
      <ScrollReveal delay={0.1}>
        <section className="glass-card p-8 lg:p-10 space-y-4">
          <h2 className="text-xl font-display font-bold text-gold mb-4">Introduction</h2>
          <p className="text-text-secondary leading-relaxed">
            Chikonga mine is located within the Mutasa District about 40 km NE of the city of Mutare. It covers an area equivalent to 45 hectares of land. The mining property is locally owned by Hilltouch investments. The claims are registered under the company as per registration certificates and are free from any impediments. Chikonga mine is currently treating sands through cyanidation and leaching. The company recently acquired an elution plant which has been installed and is currently running and producing 1 kg and over of gold per month.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Chikonga mine was originally pegged in 1985 at the eastern end of ancient workings stretching for 800 m from Chikanga farm house, north-east of Mutare. Geologically the Chikonga mine lies in the Northern part of Mutare and Odzi greenstone belt, which is divided into two arms - the Odzi limb, extending WNE from Odzi centre and the Mutare limb, trending East.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Historically underground operations were developed to 2nd level and have been de-watered and channel sampled. Extensive geological mapping and geophysical surveys (mainly ground magnetics), have been undertaken. These techniques have led to siting of diamond drill holes. Diamond drilling is currently due in progress, targeting 3rd level i.e the holes will be 400 m inclined depth. Preliminary results from surface and underground sampling confirmed historic mined out grades above 15 g/t of gold.
          </p>
        </section>
      </ScrollReveal>

      {/* Vision */}
      <ScrollReveal delay={0.15}>
        <section className="glass-card p-8 lg:p-10 space-y-4">
          <h2 className="text-xl font-display font-bold text-gold mb-4">Vision</h2>
          <p className="text-text-secondary leading-relaxed">
            Chikonga Mine&apos;s visualisation is to become a major producer of gold not only in Manicaland but nationwide and at a regional level. This will automatically see us contributing towards economic turnaround of the nation&apos;s economy through increased production.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Ultimately, Chikonga Mine looks forward to spreading its tentacles and boosting its productivity and having influence in the extractive industry.
          </p>
          <p className="text-text-secondary leading-relaxed">
            The environment is a major concern at Chikonga Mine. This explains the environmental safety measures that have been taken during and after gold mining operations. Precluding the needless damage to human life, animal life and vegetation has been the hallmark of operations at Chikonga mine. Adherence to set out environmentally friendly guidelines as espoused in the Environmental Management Act as well as laws governing mining operations in the country has been made a priority.
          </p>
        </section>
      </ScrollReveal>

      {/* Geological Information */}
      <ScrollReveal delay={0.2}>
        <section className="glass-card p-8 lg:p-10 space-y-6">
          <h2 className="text-xl font-display font-bold text-gold mb-4">Geological History, Characteristics and Mineralisation</h2>
          <p className="text-text-secondary leading-relaxed">
            The first ancient reference to the Chikonga Mine was in a report by geologist N. M. Harrison who examined the property on behalf of the Geological Survey of Rhodesia in 1972. Harrison reported on additional site investigations undertaken between 1972 and 1975 which included descriptions of the reefs, shear zones, mineralisation, faulting, the collection and assay of ore samples and engineering aspects of the underground mine.
          </p>
          <p className="text-text-secondary leading-relaxed">
            At that time, mining was on a single shear zone which was from one third to one metre wide at the current No.1 Shaft. Sample results in the Harrison reports range from below 5 g/t to 40 g/t with an average grade in the 15-40 g/t gold range. The shear zone strikes east-northeast, dips at approximately 70 to 80 degrees south and is hosted by similarly striking greenstones, schists and minor banded iron formations.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Hilltouch acquired the property in 2005 and has since discovered multiple parallel shear zones in an approximate 350-metre wide structural corridor which strikes east-northeast across the property. The property is currently being mined from several of the shear zones. Current mine production is approximately four to ten tonnes per day using hand powered winches to hoist ore and a stamp mill and cyanide leach tanks for gold extraction.
          </p>
          <p className="text-text-secondary leading-relaxed">
            The geological setting of the property is located in the Mutare Greenstone Belt which is an east-west trending synclinorium of ultramafic, mafic and banded-iron formations. The lode gold is typically concentrated in fractures and shear zones along brittle-ductile second-order faults.
          </p>

          {/* Sampling Results Table */}
          <div className="mt-6">
            <h4 className="text-sm font-body font-semibold text-text-primary mb-3">Underground Sampling Results</h4>
            <p className="text-text-muted text-xs mb-4 font-mono">
              Verified: 7th November 1974 by N. I. Harrison | Average: 20 g/t over 120 cm for 7 metres
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gold/20">
                    <th className="text-left py-2 px-3 text-gold font-mono text-xs uppercase tracking-wider">Location</th>
                    <th className="text-left py-2 px-3 text-gold font-mono text-xs uppercase tracking-wider">Grade</th>
                    <th className="text-left py-2 px-3 text-gold font-mono text-xs uppercase tracking-wider">Width</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleResults.map((row, i) => (
                    <tr key={i} className="border-b border-gold/10 hover:bg-gold/[0.04] transition-colors">
                      <td className="py-2 px-3 font-mono text-text-secondary text-xs">{row.location}</td>
                      <td className="py-2 px-3 font-mono text-gold text-xs font-medium">{row.grade}</td>
                      <td className="py-2 px-3 font-mono text-text-secondary text-xs">{row.width}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Mine Coordinates */}
      <ScrollReveal delay={0.25}>
        <section className="glass-card p-8 lg:p-10">
          <h2 className="text-xl font-display font-bold text-gold mb-6">Mine Coordinates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coordinates.map((block) => (
              <div key={block.block} className="border border-gold/15 p-4">
                <h4 className="text-sm font-body font-semibold text-gold mb-3">{block.block}</h4>
                <div className="space-y-2">
                  {block.points.map((pt) => (
                    <div key={pt.label} className="flex items-center gap-4 text-xs font-mono">
                      <span className="text-gold font-bold w-4">{pt.label}</span>
                      <span className="text-text-secondary">{pt.easting}</span>
                      <span className="text-text-muted">{pt.northing}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Mining & Processing */}
      <ScrollReveal delay={0.3}>
        <section className="glass-card p-8 lg:p-10 space-y-4">
          <h2 className="text-xl font-display font-bold text-gold mb-4">Mineral Processing and Exploitation</h2>
          <p className="text-text-secondary leading-relaxed">
            The ground visits to the different veins, with the visual field observations made on them, both superficially and in the accessible mining works, the readings on the historical uses in the old farms, the results obtained in the recovery trials made, have led to the clear results which concluded to recommend working with dissolution methods using cyanide solutions and the CIL (Carbon In Leach) system.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Given the existing conditions, it is proposed to consider a maximum processing capacity of 500 t. Due to the mineral deposit for this mine, most of the mining is underground shaft mining. The mineral deposit is in the form of veins in a well-defined strike such that the mining method to be applied is also easily defined as a stoping method.
          </p>
          <p className="text-text-secondary leading-relaxed">
            The mine is characterised by ore stock piling, 2/3 stamp, one crusher, 8 leach tanks, one clarifier, two water return tanks, two carbon rooms, two slimes dams, 8 cyanidation tanks, dump, water supply system from Mutare River (which flows all year round) and electric power connections.
          </p>
        </section>
      </ScrollReveal>

      {/* Company Details */}
      <ScrollReveal delay={0.35}>
        <section className="glass-card p-8 lg:p-10">
          <h2 className="text-xl font-display font-bold text-gold mb-6">Company Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="border-l-2 border-gold/40 pl-4">
                <p className="stat-label mb-1">Company Name</p>
                <p className="text-text-primary font-body text-sm font-medium">Hilltouch Investments (Pvt) Ltd</p>
              </div>
              <div className="border-l-2 border-gold/40 pl-4">
                <p className="stat-label mb-1">Directors</p>
                <p className="text-text-primary font-body text-sm">Mr Lufeyi Shato</p>
                <p className="text-text-primary font-body text-sm">Mrs Joyce Kujenga</p>
              </div>
              <div className="border-l-2 border-gold/40 pl-4">
                <p className="stat-label mb-1">Address</p>
                <p className="text-text-primary font-body text-sm">P.O Box 1063, Odzi, Mutare</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="border-l-2 border-gold/40 pl-4">
                <p className="stat-label mb-1">Contact</p>
                <p className="text-text-primary font-body text-sm font-mono">0772 453 667 / 0785 600 108</p>
              </div>
              <div className="border-l-2 border-gold/40 pl-4">
                <p className="stat-label mb-1">Email</p>
                <p className="text-gold font-body text-sm">hilltouchchikongamine@gmail.com</p>
              </div>
              <div className="border-l-2 border-gold/40 pl-4">
                <p className="stat-label mb-1">Documents Held</p>
                <p className="text-text-primary font-body text-xs text-text-muted">
                  Certificate of Incorporation, CR6, CR14, Block Certificates, Gold Permit, Tax Clearance 2023
                </p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
