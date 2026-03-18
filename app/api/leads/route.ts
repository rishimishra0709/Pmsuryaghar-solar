import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const leadSchema = z.object({
    name: z.string().min(2),
    phone: z.string().regex(/^[6-9]\d{9}$/),
    city: z.string().min(2),
    monthlyBill: z.string().optional(),
    recommendedSize: z.string().optional(),
    date: z.string().optional(),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validatedData = leadSchema.parse(body);

        // For now, we'll log the lead data. 
        // In a real production app, you'd send this to Supabase, Firebase, or Google Sheets.
        console.log('--- NEW CHATBOT LEAD ---');
        console.table({
            ...validatedData,
            date: new Date().toLocaleString(),
            source: 'AI Chatbot'
        });

        // Simulate storage delay
        await new Promise(resolve => setTimeout(resolve, 800));

        return NextResponse.json({ 
            success: true, 
            message: "Lead captured successfully! Our expert will call you soon." 
        });
    } catch (error) {
        console.error('Lead Capture Error:', error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to capture lead. Please try again or call us." 
        }, { status: 400 });
    }
}
