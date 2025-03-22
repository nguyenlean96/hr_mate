import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer>
          <Drawer.Screen
            name="home/index"
            options={{
              title: 'Home',
            }}
          />
          <Drawer.Screen
            name="account/index"
            options={{
              title: 'Account',
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </>
  );
}