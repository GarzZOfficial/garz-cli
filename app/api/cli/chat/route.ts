import { NextRequest, NextResponse } from 'next/server';
import { validateCLIToken } from '@/lib/cli-store';
import { z } from 'zod';

const chatSchema = z.object({
  token: z.string().min(1),
  message: z.string().min(1),
  model: z.string().optional().default('llama-3.1-70b'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, message, model } = chatSchema.parse(body);

    // Validate token
    if (!validateCLIToken(token)) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const cerebasApiKey = process.env.CEREBRAS_API_KEY;
    if (!cerebasApiKey) {
      return NextResponse.json(
        { success: false, error: 'Server not configured' },
        { status: 500 }
      );
    }

    // Call Cerebras API
    const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cerebasApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Cerebras API error:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.error?.message || 'Failed to get response from Cerebras',
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const completionText = data.choices?.[0]?.message?.content || '';

    return NextResponse.json({
      success: true,
      response: completionText,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      );
    }

    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
