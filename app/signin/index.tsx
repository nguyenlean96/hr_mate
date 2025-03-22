import { useSession } from '@/contexts/session';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable
} from 'react-native';



export default function SignInScreen() {
  const { sendAuthEmailOtp, oauthWithGoogle } = useSession();
  const [email, setEmail] = useState('')


  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              marginBottom: 16,
            }}
          >Log in into your account</Text>
        </View>

        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '100%',
            }}
          >
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <TextInput placeholder="Email"
                style={{
                  width: '100%',
                  height: 42,
                  borderColor: 'transparent',
                  backgroundColor: 'white',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  marginBottom: 16,
                  fontSize: 16,
                }}
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <Pressable
                onPress={() => {
                  sendAuthEmailOtp(email)
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    backgroundColor: '#333',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 5,
                    fontSize: 16,
                  }}
                >Log in with Email</Text>
              </Pressable>
            </View>
          </View>
          <Pressable onPress={oauthWithGoogle}
            style={{
              width: '100%',
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: '#666',
                paddingHorizontal: 20,
                width: 'auto',
                fontSize: 16,
              }}
            >Sign In with Google</Text>
          </Pressable>
        </View>
      </View>
    </>
  )
}
