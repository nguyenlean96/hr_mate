import React, {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
} from 'react';
import { makeRedirectUri } from 'expo-auth-session';
import { useRouter } from 'expo-router';
import { useStorageState } from '@/hooks/useStorageState';
import * as Linking from 'expo-linking';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import { supabase } from '@/services/supabase'
import { SupabaseGoogleOauth } from '@/hooks/supabase/auth/oauth/OauthWithGoogle';
import { SupabaseEmailOtpAuth } from '@/hooks/supabase/auth/otp/OauthWithEmail';


const AuthContext = createContext<any>({});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [
    [sessionLoading, session],
    setSession
  ] = useStorageState('session');

  // Handle linking into app from email app.
  const redirectTo = makeRedirectUri();
  const url = Linking.useURL()

  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url)

    if (errorCode) throw new Error(errorCode)
    const { access_token, refresh_token } = params

    if (!access_token) return

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    })
    console.log('data', data)
    if (error) throw error
    return data.session
  }

  const { error: oauthGoogleError, oauthWithGoogle } = SupabaseGoogleOauth(redirectTo);
  const { sendAuthEmailOtp } = SupabaseEmailOtpAuth(redirectTo);

  if (url) createSessionFromUrl(url)
  useEffect(() => {
    if (sessionLoading) {
      router.replace('/')
    } else {
      if (session) {
        router.replace('/(auth)/home')
      } else {
        router.replace('/signin')
      }
    }
  }, [session, sessionLoading]);

  useEffect(() => {
    const handleDeepLink = async (event: any) => {
      const url = event.url
      if (url) {
        if (url.includes('access_denied')) {
          router.replace('/signin')
        }
        try {
          const sessionData = await createSessionFromUrl(url)
          setSession(JSON.stringify(sessionData))
        } catch (error) {
          console.error('error', error)
        }
      }
    }

    const subscription = Linking.addEventListener('url', handleDeepLink)

    return () => {
      subscription.remove()
    }
  }, [])

  const signOut = () => {
    setSession(null);
  }

  return (
    <AuthContext.Provider
      value={{
        sendAuthEmailOtp,
        oauthWithGoogle,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}