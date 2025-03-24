import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, Tabs } from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AppDataProvider } from '@/contexts/app_data';

export default function Layout() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppDataProvider>
          <Tabs>
            <Tabs.Screen
              name="home/index"
              options={{
                title: 'Jobs',
                tabBarIcon: ({ color }) => <Ionicons name="business" size={24} color={color} />,
              }}
            />
            <Tabs.Screen
              name='saved/index'
              options={{
                title: 'Saved',
                tabBarIcon: ({ color }) => <Octicons name="heart-fill" size={24} color={color} />,
              }}
            />
            <Tabs.Screen
              name='account/index'
              options={{
                title: 'Profile',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-circle-outline" size={24} color={color} />,
              }}
            />
          </Tabs>
        </AppDataProvider>
      </GestureHandlerRootView>
    </>
  );
}