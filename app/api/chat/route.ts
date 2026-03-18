import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    return NextResponse.json({ 
        status: 'ok', 
        apiKeyPresent: !!process.env.OPENROUTER_API_KEY,
        nodeVersion: process.version,
        timestamp: new Date().toISOString()
    });
}

export async function POST(req: NextRequest) {
    try {
        const { message, history } = await req.json();
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            console.error('CRITICAL: OPENROUTER_API_KEY is not set.');
            return NextResponse.json({ error: 'Chat API is not configured. Please set OPENROUTER_API_KEY.' }, { status: 500 });
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

        // 1. Format and Coalesce History
        let rawHistory = Array.isArray(history) ? history : [];
        let coalesced: any[] = [];
        
        rawHistory.forEach((m: any) => {
            const last = coalesced[coalesced.length - 1];
            if (last && last.role === m.role) {
                last.content += "\n" + (m.content || "");
            } else if (m.content) {
                coalesced.push({ role: m.role || 'user', content: m.content });
            }
        });

        // 2. Build final messages array
        let messages: any[] = [
            { role: 'system', content: systemPrompt }
        ];

        // IMPORTANT for Gemini: First message after System MUST be User. 
        // If history starts with Assistant, insert a dummy user message.
        if (coalesced.length > 0 && coalesced[0].role === 'assistant') {
            messages.push({ role: 'user', content: "Namaste" }); // Start of conversation
        }

        coalesced.forEach((m) => {
            const last = messages[messages.length - 1];
            if (last.role === m.role) {
                last.content += "\n" + m.content;
            } else {
                messages.push(m);
            }
        });

        // Add the current user message
        const lastMsg = messages[messages.length - 1];
        if (lastMsg.role === 'user') {
            lastMsg.content += "\n" + message;
        } else {
            messages.push({ role: 'user', content: message });
        }

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mysolarweb.vercel.app';

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "HTTP-Referer": siteUrl,
                "X-Title": `Braj Mohan Solar AI`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-lite-001",
                "messages": messages,
                "temperature": 0.5,
                "max_tokens": 1000
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('OpenRouter Error:', response.status, errorBody);
            // Return more info to the client for debugging
            return NextResponse.json({ 
                error: `API Error ${response.status}`, 
                details: errorBody 
            }, { status: response.status });
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "Maaf kijiyega, system response nahi mil raha.";

        return NextResponse.json({ reply });

    } catch (error: any) {
        console.error('Chat API Handler Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
    }
}
