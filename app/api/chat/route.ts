import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { message, history } = await req.json();
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        const systemPrompt = `
You are an expert AI Solar Sales Assistant for "Braj Mohan Solar". Your goal is to help visitors understand solar systems, calculate requirements, and capture leads.

TONE: Professional, helpful, friendly, and expert. Use a mix of English and Hindi (Hinglish) as requested by the user.

CORE LOGIC:
- Solar Requirement: ₹1000 monthly bill ≈ 1kW. (e.g., ₹3000 bill = 3kW).
- Subsidy (PM Surya Ghar Yojana):
  - 1kW: ₹30,000
  - 2kW: ₹60,000
  - 3kW+: ₹78,000 (Maximum)
- Estimated Cost: ~₹50,000 per kW before subsidy.

SOLAR ESTIMATE FLOW (Triggered if user asks for estimate):
1. Ask for City if not known.
2. Ask for Monthly Bill.
3. Ask for Roof Type (Terrace/Tin/Shed).
4. Ask for Property Type (Home/Shop/Factory).
Once you have these, provide a summary:
"Based on your bill, a [X]kW system is suitable.
Estimated Cost: [Range]
Subsidy: [Amount]
Final Cost: [Range]
Monthly Savings: ~₹[Savings]"

FAQ KNOWLEDGE:
- Lifespan: 25 years.
- Maintenance: Minimal (regular cleaning).
- Net Metering: Supported (Export excess power to grid).
- Warranty: 25 years on performance.

LEAD CAPTURE:
After giving an estimate or if the user is interested, offer a "Free site inspection".
Ask for: Name, Mobile Number, and City.
IMPORTANT: When the user has provided their Name, Phone, and City, you MUST include the following structured tag at the Very End of your response:
[LEAD_DATA]
{
  "name": "User Name",
  "phone": "9876543210",
  "city": "User City"
}
[/LEAD_DATA]
`;

        const formattedHistory = history.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content
        }));

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "HTTP-Referer": `${process.env.NEXT_PUBLIC_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
                "X-Title": `Braj Mohan Solar AI`, // Optional. Shows in rankings on openrouter.ai.
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-lite-001", // Fast and efficient for chat
                "messages": [
                    { "role": "system", "content": systemPrompt },
                    ...formattedHistory,
                    { "role": "user", "content": message }
                ],
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
