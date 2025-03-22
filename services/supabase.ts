import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import { AppState, Platform } from 'react-native'
import LargeSecureStore from '@/lib/supabase/LargeSecureStorage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {

    ...(
      Platform.OS === 'web'
        /**
         *  As Expo's SecureStore does not support values larger than 2048 bytes, 
         *  an AES-256 key is generated and stored in SecureStore, 
         *  while it is used to encrypt/decrypt values stored in AsyncStorage.
         */
        ? { storage: new LargeSecureStore() }
        : {}
    ),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

/**
 *  Tells Supabase Auth to continuously refresh the session automatically
 *  if the app is in the foreground. When this is added, you will continue
 *  to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
 *  `SIGNED_OUT` event if the user's session is terminated. This should
 *  only be registered once.
 */ 
if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
}