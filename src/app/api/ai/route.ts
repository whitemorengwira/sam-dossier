import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, context, provider = "gemini" } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const systemPrompt = `You are SAM-AI, an intelligent assistant for Socinga Africa Mining (SAM). 
You are integrated into the SAM Dossier, a high-end investment platform for the Chikonga Mine in Mutare, Zimbabwe.
The user is a member of the SAM executive team.
Maintain a highly professional, institutional-grade tone. Use British English.
Context about the current page: ${context}`;

    // For the demonstration, we'll implement a mock response generator that feels real
    // In production, you would use the actual API keys from process.env to call Anthropic/Gemini/Groq
    // Since we don't have actual active keys in this secure environment, we will simulate the AI.

    let aiResponse = "";

    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("budget") || lowerMessage.includes("cost")) {
      aiResponse = "Based on the May 2026 budget guidance, the ZAR 500M capital stack is segmented into four tranches. Tranche 1 (30%) is allocated for pre-production and logistics, including the June Zimbabwe delegation. Would you like me to pull up the specific breakdown for the CIP plant acquisition in Tranche 2?";
    } else if (lowerMessage.includes("chikonga") || lowerMessage.includes("grade")) {
      aiResponse = "The Chikonga Mine has verified historical grades between 11.2 g/t and 25 g/t. Our current targeted average yield is 15 g/t. By upgrading to the CIP plant, we expect recovery rates to hit 90-95%, significantly boosting the current 5KG/month output to our 15+ KG/month target.";
    } else if (lowerMessage.includes("zimbabwe") || lowerMessage.includes("trip")) {
      aiResponse = "The delegation trip to Mutare, Zimbabwe is scheduled for the first week of June 2026. Flights from JHB to Harare need to be finalised. The primary objective is geological verification and auditing Hilltouch Investments' current operations.";
    } else if (lowerMessage.includes("task") || lowerMessage.includes("assign")) {
      aiResponse = "I can help manage tasks in the Workspace Dashboard. I see Olwethu is assigned to flight bookings, and Shingirai is handling the SAMREC CPR commissioning. Should I draft a reminder email for any of these?";
    } else {
      aiResponse = `I have logged your query regarding "${message.length > 30 ? message.substring(0, 30) + "..." : message}". As SAM-AI, I can assist you with financial modelling, project timelines, reviewing meeting minutes from April/May 2026, or analysing the Chikonga geological reports. How would you like to proceed?`;
    }

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ 
      response: aiResponse,
      provider: provider 
    });
    
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { error: "Failed to process AI request" },
      { status: 500 }
    );
  }
}
