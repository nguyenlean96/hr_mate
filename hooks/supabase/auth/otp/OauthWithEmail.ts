import { supabase } from '@/services/supabase'

export function SupabaseEmailOtpAuth(redirectTo: any) {
  const sendAuthEmailOtp = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: redirectTo,
      },
    })

    if (error) throw error
    // Email sent.
  }

  return {
    sendAuthEmailOtp,
  }
}