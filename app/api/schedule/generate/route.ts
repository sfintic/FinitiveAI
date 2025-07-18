import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user, goals } = body;

    if (!user || !goals || !Array.isArray(goals)) {
      return NextResponse.json({ error: 'Missing user or goals' }, { status: 400 });
    }

    const prompt = `
You're an AI productivity coach. Based on this user's profile and goals, generate a personalized weekly schedule.

User:
${JSON.stringify(user, null, 2)}

Goals:
${JSON.stringify(goals, null, 2)}

Format your response as JSON with:
[
  {
    "day": "Monday",
    "tasks": [
      { "time": "09:00", "activity": "Deep work on main goal" }
    ]
  }
]
`;

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an AI productivity assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    // Extract and parse the JSON from the response
    const text = chatResponse.choices[0].message.content?.trim() || '';
    let schedule;
    try {
      schedule = JSON.parse(text);
    } catch (e) {
      // Try to extract JSON from markdown code block
      const match = text.match(/```json\n([\s\S]+?)```/);
      if (match) {
        schedule = JSON.parse(match[1]);
      } else {
        return NextResponse.json({ error: 'Failed to parse schedule from GPT-4o.' }, { status: 500 });
      }
    }

    return NextResponse.json({ schedule });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate schedule' }, { status: 500 });
  }
} 