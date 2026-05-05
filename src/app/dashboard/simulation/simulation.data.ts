export const SIMULATION_PARAMS = {
  daysPerCycle: 30,
  oreFeedTonnesPerDay: 10,
  gradeOscillation: { min: 18, max: 22, periodDays: 7 },
  recoveryRate: 0.92,
  goldPriceUsdPerOz: 3200,
  fxZarPerUsd: 18.5,
  doreBarFrequencyDays: 5,
  logisticsDispatchFrequencyDays: 10,
  tailingsDepositionFraction: 0.96,
  waterReclamationKlPerDay: 12,
} as const

export type SimulationState = {
  isPlaying: boolean
  speed: 0.5 | 1 | 2 | 4
  focusStage: 1 | 2 | 3 | 4 | 5
  simulatedDays: number
  tonnesHoisted: number
  averageGrade: number
  gramsContained: number
  gramsRecovered: number
  ouncesRecovered: number
  revenueUsd: number
  revenueZar: number
  waterReclaimedKl: number
  tailingsDepositedTonnes: number
}

export type SimulationAction =
  | { type: 'TOGGLE_PLAY' }
  | { type: 'SET_SPEED'; speed: 0.5 | 1 | 2 | 4 }
  | { type: 'SET_FOCUS_STAGE'; stage: 1 | 2 | 3 | 4 | 5 }
  | { type: 'TICK'; deltaSeconds: number }
  | { type: 'RESET' }

export const STAGE_DESCRIPTORS = [
  {
    id: 1,
    name: 'Extraction',
    inputLabel: '10 tonnes/day raw ore',
    outputLabel: '10 tonnes hauled to surface',
    keyMetric: '15–25 g/t',
    tooltip: 'Ore is extracted from underground stopes via hand-powered winches and hoisted to the surface for processing.',
  },
  {
    id: 2,
    name: 'Hoisting & Haulage',
    inputLabel: 'Run-of-mine ore from stopes',
    outputLabel: 'Ore delivered to ROM bin',
    keyMetric: 'Shaft depth: 120 m',
    tooltip: 'A skip hoist carries ore up the 120-metre shaft and tips it into the surface ROM bin for onward haulage.',
  },
  {
    id: 3,
    name: 'Comminution',
    inputLabel: 'ROM ore at ~150 mm',
    outputLabel: 'Ground ore at 75 µm P80',
    keyMetric: 'SAG + ball mill circuit',
    tooltip: 'Primary jaw crushing reduces ROM ore, followed by SAG and ball milling to achieve the target grind size for leaching.',
  },
  {
    id: 4,
    name: 'Hydrometallurgy',
    inputLabel: 'Ground ore slurry',
    outputLabel: 'Gold-bearing eluate',
    keyMetric: '92% gold recovery',
    tooltip: 'Cyanide leaching dissolves gold from the ore slurry. Carbon-in-Pulp adsorbs the dissolved gold for downstream elution and electrowinning.',
  },
  {
    id: 5,
    name: 'Smelting & Doré',
    inputLabel: 'Electrowon gold sludge',
    outputLabel: 'Doré bars at ~90% Au',
    keyMetric: 'Dispatched to FGR refinery',
    tooltip: 'Gold sludge from the electrowinning cell is smelted in an induction furnace and cast into doré bars for delivery to the Fidelity Gold Refinery.',
  },
] as const
