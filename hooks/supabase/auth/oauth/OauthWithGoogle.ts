import { useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '@/services/supabase';

export function SupabaseGoogleOauth(
  redirectTo: any,
) {
  WebBrowser.maybeCompleteAuthSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const oauthGoogleProvider = async () => {
    if (loading) return

    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          skipBrowserRedirect: true,
        },
      })
      if (error) throw error

      const res = await WebBrowser.openAuthSessionAsync(
        data?.url ?? '',
        redirectTo
      )
      if (res.type === 'success') {
        const { url } = res
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    oauthWithGoogle: oauthGoogleProvider,
  }
}