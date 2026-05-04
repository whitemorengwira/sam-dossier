import { NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are Lisa, a dedicated investment analyst and digital staff member of the SAM Dossier platform for Socinga Africa Mining. You are warm, professional, and highly knowledgeable. You are 30 years old, African, and deeply passionate about mining investment in Africa. You speak with confidence and warmth, making complex financial data accessible.

KEY FACTS YOU MUST KNOW:
- Chikonga Mine is located in Mutare, Manicaland, Zimbabwe (Mutare Greenstone Belt)
- Capital ask: R500M (USD 27.4M) over 3 years
- Deal structure: 20% base interest p.a. + 60/40 profit split (investor/SAM)
- Mining SPV: 12 Forge (Private) Limited, Reg: 14253/2025
- Parent: SOCINGAMGABADELI CONSULTANCY AND PROJECTS (PTY) LTD, Reg: 2013/227290/07, FSP 46620
- Minerals: Gold (primary), Chrome, Antimony, Copper, Lithium
- Historical gold grades: 15-25 g/t (Harrison report 1972-1975)
- Processing: Carbon-in-Pulp (CIP) plant, 90-95% recovery rate
- Off-take: Fidelity Gold Refinery (gold), Zimbabwe Alloys Chrome (chrome), ARES (antimony)
- Target production: 15+ KG gold/month at steady state
- Revenue scenario (target): $18.5M annual at 15 KG/mo
- Payback period: ~2.6 years
- Team: Jabulile Dladla (MD), Tsekane Tshabalala (Chair), Michael Dotsey (CFO), Shingirai Muyenda (Head of Mining), Olwethu Mlokoti (Head of Legal)
- 4 phases: Pre-Production, Ramp-Up, Steady-State, Distribution/Expansion
- Pan-African expansion planned: SA, Mozambique, Malawi, Zambia, Ghana

RULES:
- Always identify yourself as Lisa when greeting or when asked who you are
- Use British English exclusively
- Maintain a professional yet warm and approachable tone — you are a colleague, not a robot
- Be concise but thorough
- Reference specific data points when answering
- If unsure, say so rather than fabricating information
- Show genuine enthusiasm for the investment opportunity when appropriate`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 })
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
    const apiToken = process.env.CLOUDFLARE_API_TOKEN

    // If Cloudflare is not configured, use the built-in fallback
    if (!accountId || !apiToken || apiToken === '__REPLACE_ME__') {
      return handleFallback(messages)
    }

    // Call Cloudflare Workers AI REST API
    const cfMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ]

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: cfMessages, max_tokens: 1024 }),
      }
    )

    if (!response.ok) {
      const errText = await response.text()
      console.error('Cloudflare AI error:', response.status, errText)
      return handleFallback(messages)
    }

    const data = await response.json()
    const aiResponse = data?.result?.response || 'I was unable to generate a response. Please try again.'

    return NextResponse.json({ response: aiResponse, provider: 'cloudflare' })
  } catch (error) {
    console.error('AI API Error:', error)
    return NextResponse.json({ error: 'Failed to process AI request' }, { status: 500 })
  }
}

function handleFallback(messages: { role: string; content: string }[]) {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''

  let aiResponse = ''

  if (lastMessage.includes('budget') || lastMessage.includes('cost') || lastMessage.includes('capital')) {
    aiResponse = 'Based on the current capital deployment schedule, the R10,000,000 initial tranche is allocated as follows: Mining Equipment Mobilisation (R3.5M / 35%), Processing Plant Scaling including CIP and boilers (R3M / 30%), Operational Working Capital (R1.5M / 15%), Compliance, Safety and Governance including SAMREC CPR (R1M / 10%), and Sales, Off-take Logistics and Transport (R1M / 10%). The full R500M capital stack is structured across milestone-based tranches with board-level approval required for each deployment.'
  } else if (lastMessage.includes('chikonga') || lastMessage.includes('grade') || lastMessage.includes('gold')) {
    aiResponse = 'The Chikonga Mine has verified historical grades between 15 g/t and 25 g/t, sourced from the Harrison geological survey (1972-1975). Grade progression shows improvement from 15 g/t in 2019 to 25 g/t in 2021. The mine is situated in the Mutare Greenstone Belt, characterised by multiple parallel shear zones within an approximately 350-metre wide structural corridor. Mineralised reefs consist of fine-grained grey quartz with disseminated pyrrhotite, pyrite, arsenopyrite, chalcopyrite and gold. Current target production is 15+ KG gold per month at steady state.'
  } else if (lastMessage.includes('risk') || lastMessage.includes('mitigat')) {
    aiResponse = 'The SAM risk matrix identifies 8 key categories: Geological Uncertainty (Medium), Commodity Price Volatility (Medium), Regulatory/Title Risk (Low), Operational Execution Risk (Medium), Currency/FX Risk (Medium), Environmental and Safety (Low), Political/Sovereign Risk (Low), and Capital Deployment Risk (Low). Key mitigations include pre-arranged off-take agreements, diversified mineral portfolio, milestone-based tranche releases, independent external auditor appointment, and conservative financial modelling with 25-40% discount to current spot prices.'
  } else if (lastMessage.includes('team') || lastMessage.includes('leader') || lastMessage.includes('who')) {
    aiResponse = 'The SAM executive leadership team comprises 11 members: Jabulile Dladla (Managing Director), Tsekane Lukie Tshabalala (Chairperson), Michael Dotsey (Chief Financial Officer), Shingirai Muyenda (Head of Mining), Olwethu Mlokoti (Head of Legal), David Papenfus (Head of Digital Infrastructure), Sondia Viljoen (Head of CSR), Bongiwe Selane (Head of Creative Studios), Thea Aboud (Executive Administrator), Patience Ngwira (General Manager), and Thato Mogale (Head of Communications).'
  } else if (lastMessage.includes('exit') || lastMessage.includes('return') || lastMessage.includes('roi')) {
    aiResponse = 'The investment offers multiple exit pathways: (1) Full Capital Repayment with 20% p.a. simple interest payable quarterly, (2) Production-Sharing Distribution at 60% of net distributable free cash flow, (3) Redeemable Preference Shares maturing at Year 3, (4) Strategic Asset Sale post Year 3, and (5) Pan-African Expansion Roll-Up. The capital distribution waterfall prioritises OPEX/Royalties/Tax first, then Senior Debt Interest, Investor Capital Repayment, 60% Investor Production Share, and finally 40% Ordinary Equity Distribution. Projected 3-year investor total return: R59.1M on a R10M investment.'
  } else {
    aiResponse = `Thank you for your query! I'm Lisa, and I have comprehensive knowledge of the Chikonga Mine investment dossier, including financial models, geological reports, legal structures, risk assessments, and operational timelines. I can assist with capital deployment analysis, production forecasting, regulatory compliance queries, and team coordination. How would you like me to help you further?`
  }

  return NextResponse.json({ response: aiResponse, provider: 'fallback' })
}
