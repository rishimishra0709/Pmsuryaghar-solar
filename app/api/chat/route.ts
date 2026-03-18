import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { message, history } = await req.json();
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            console.error('CRITICAL: OPENROUTER_API_KEY is not set.');
            return NextResponse.json({ error: 'Chat API is not configured. Please set OPENROUTER_API_KEY.' }, { status: 500 });
        }

        const systemPrompt = `You are an expert AI Solar Sales Assistant for "Braj Mohan Solar"... (tone and logic) ... [LEAD_DATA] { "name": "...", "phone": "...", "city": "..." } [/LEAD_DATA]`;

        // 1. Format and Coalesce History (Gemini requires alternating User/Assistant roles)
        let rawHistory = Array.isArray(history) ? history : [];
        
        let messages: any[] = [
            { role: 'system', content: systemPrompt }
        ];

        // Combine history into alternating format
        let coalesced: any[] = [];
        rawHistory.forEach((m: any) => {
            const last = coalesced[coalesced.length - 1];
            if (last && last.role === m.role) {
                last.content += "\n" + (m.content || "");
            } else if (m.content) {
                coalesced.push({ role: m.role || 'user', content: m.content });
            }
        });

        // Ensure the conversation alternates and starts with the right roles
        // If history is empty, it's just System + User(message)
        // If history has Assistant first, we insert a dummy user message or merge it
        coalesced.forEach((m) => {
            const last = messages[messages.length - 1];
            if (last.role === m.role) {
                last.content += "\n" + m.content;
            } else {
                messages.push(m);
            }
        });

        // Add the current user message
        const lastInMsg = messages[messages.length - 1];
        if (lastInMsg.role === 'user') {
            lastInMsg.content += "\n" + message;
        } else {
            messages.push({ role: 'user', content: message });
        }

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pmsuryaghar-solar.vercel.app';

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
            return NextResponse.json({ error: `API Error ${response.status}`, details: errorBody }, { status: response.status });
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "Maaf kijiyega, system response nahi mil raha.";

        return NextResponse.json({ reply });

    } catch (error: any) {
        console.error('Chat API Handler Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
    }
}
