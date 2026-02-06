import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, company, phone, region, interest, message } = body;

        // Basic validation
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            );
        }

        // In a real application, you would send an email here using Resend or similar
        // for example:
        // await resend.emails.send({ ... });

        console.log('New Contact Inquiry:', { name, email, company, phone, region, interest, message });

        // Simulate database or mailing delay
        await new Promise(resolve => setTimeout(resolve, 800));

        return NextResponse.json({
            success: true,
            message: 'Inquiry received successfully'
        });

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Failed to process inquiry' },
            { status: 500 }
        );
    }
}
