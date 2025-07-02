import { createServerClient } from '@supabase/ssr';
import { NextResponse, NextRequest } from 'next/server';

// POST handler for sending OTP (email or phone)
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, phone, mode, redirectTo } = body;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: request.cookies }
  );

  let result;
  if (email) {
    // Supabase will send both a code and a magic link to the email.
    // For code entry, prompt the user to enter the code in the frontend and call verifyOtp there.
    result = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectTo || `${request.nextUrl.origin}/auth/callback`,
      },
    });
  } else if (phone) {
    result = await supabase.auth.signInWithOtp({ phone });
  } else {
    return NextResponse.json({ error: 'Email or phone is required' }, { status: 400 });
  }

  const { data, error } = result;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ data });
}

// GET handler for code exchange (OAuth/magic link)
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: request.cookies }
    );
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin);
}