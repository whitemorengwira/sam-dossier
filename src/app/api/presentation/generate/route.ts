// src/app/api/presentation/generate/route.ts
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Initialize Anthropic client using the environment variable
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { topic, numSlides = 5 } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'Anthropic API Key is not configured' }, { status: 500 });
    }

    // Call Anthropic API
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307', // Using haiku for fast, cheap generation
      max_tokens: 2000,
      system: 'You are an expert presentation generator. Generate a presentation based on the user topic. You MUST return ONLY a valid JSON array of objects, where each object represents a slide. Do not include markdown formatting or explanation text. Schema: [{ title: string, content: string[], notes: string }]',
      messages: [
        {
          role: 'user',
          content: `Create a professional ${numSlides}-slide presentation about: "${topic}".`,
        },
      ],
    });

    // Extract the JSON from the response text
    const textContext = response.content.find(block => block.type === 'text');
    let slides = [];
    
    if (textContext && 'text' in textContext) {
      try {
        // Find JSON array in the response (handles if Claude adds conversational text around it)
        const jsonMatch = textContext.text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          slides = JSON.parse(jsonMatch[0]);
        } else {
          slides = JSON.parse(textContext.text);
        }
      } catch (parseError) {
        console.error('Failed to parse AI response as JSON:', parseError);
        return NextResponse.json({ error: 'Failed to generate valid slides format' }, { status: 500 });
      }
    }

    return NextResponse.json({ slides });
  } catch (error) {
    console.error('AI Generation Error:', error);
    return NextResponse.json(
      { error: 'An error occurred during AI generation' },
      { status: 500 }
    );
  }
}
