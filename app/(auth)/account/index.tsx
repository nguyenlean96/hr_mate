import { useSession } from '@/contexts/session'
import { Pressable, Text, View } from 'react-native'

export default function AccountScreen() {
  const { signOut } = useSession()
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Pressable
        onPress={signOut}
        style={{
          backgroundColor: '#8B0000',
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          width: '80%',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff' }}>Sign Out</Text>
      </Pressable>
    </View>
  )
}
