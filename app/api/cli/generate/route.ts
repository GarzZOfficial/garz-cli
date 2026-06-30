import { NextRequest, NextResponse } from 'next/server';
import { generateCLICode } from '@/lib/cli-store';

export async function POST(request: NextRequest) {
  try {
    const { code, token } = generateCLICode();

    return NextResponse.json({
      success: true,
      code,
      message: 'CLI code generated successfully',
    });
  } catch (error) {
    console.error('Error generating CLI code:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate CLI code' },
      { status: 500 }
    );
  }
}
