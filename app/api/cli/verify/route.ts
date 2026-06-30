import { NextRequest, NextResponse } from 'next/server';
import { verifyCLICode } from '@/lib/cli-store';
import { z } from 'zod';

const verifySchema = z.object({
  code: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = verifySchema.parse(body);

    const result = verifyCLICode(code);

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid or expired CLI code',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      token: result.token,
      message: 'CLI code verified successfully',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid request format' },
        { status: 400 }
      );
    }

    console.error('Error verifying CLI code:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to verify CLI code' },
      { status: 500 }
    );
  }
}
