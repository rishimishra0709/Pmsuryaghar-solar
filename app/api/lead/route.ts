import { NextRequest, NextResponse } from 'next/server';
import { z, ZodError } from 'zod';

// Validation schema for lead submission
const leadSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
    city: z.string().min(2, 'City is required'),
    systemSize: z.string().optional(),
    message: z.string().optional(),
    companySlug: z.string().min(1, 'Company slug is required'),
});

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();

        // Validate input
        const validatedData = leadSchema.parse(body);

        // TODO: Integrate with your email service or CRM
        // Example integrations:
        // - SendGrid: await sendEmail(validatedData)
        // - Resend: await resend.emails.send(...)
        // - CRM API: await crm.createLead(validatedData)
        // - Database: await db.leads.create(validatedData)

        // For now, log the lead (remove in production)
        console.log('New lead received:', validatedData);

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Return success response
        return NextResponse.json(
            {
                success: true,
                message: 'Thank you! We will contact you within 24 hours.',
            },
            { status: 200 }
        );
    } catch (error) {
        // Handle validation errors
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Validation failed',
                    errors: error.issues,
                },
                { status: 400 }
            );
        }

        // Handle other errors
        console.error('Lead submission error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred. Please try again later.',
            },
            { status: 500 }
        );
    }
}

// Optional: Add rate limiting
// You can use packages like 'rate-limiter-flexible' or implement custom logic
// Example:
// const rateLimiter = new RateLimiterMemory({
//   points: 5, // 5 requests
//   duration: 60, // per 60 seconds
// });
