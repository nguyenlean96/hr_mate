import {
  useState,
  useReducer,
} from 'react';
import {
  View,
  Pressable,
} from 'react-native';
import JobsList from '@/components/ui/jobs/scroll/List';
import { Stack } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Profiles from '@/components/ui/jobs/swipe/Profiles';


export default function Home() {
  const [showList, setShowList] = useState(true);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => setShowList(!showList)}
            >
              <View
                style={{
                  padding: 10,
                  marginRight: 10
                }}
              >
                {
                  showList
                    ? <MaterialCommunityIcons name="cards-variant" size={24} color="black" />
                    : <Entypo name="list" size={24} color="black" />
                }
              </View>
            </Pressable>
          )
        }}
      />
      <View style={{
        flex: 1,
      }}>
        {
          showList
            ? <JobsList />
            : <Profiles />
        }
      </View>
    </>
  )
}
