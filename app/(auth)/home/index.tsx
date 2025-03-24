import {
  useState,
  useReducer,
  useEffect
} from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';

import { job_posting_examples } from '@/constants/job_posting_example';
import JobsList from '@/components/ui/jobs/scroll/List';
import { Stack } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Profiles from '@/components/ui/jobs/swipe/Profiles';


function handleLike(
  state: Set<number>,
  action: { type: 'like' | 'unlike', payload: number }
): Set<number> {
  switch (action.type) {
    case 'like':
      state.add(action.payload);
      return new Set(state);
    case 'unlike':
      state.delete(action.payload);
      return new Set(state);
    default:
      return state;
  }
}

export default function Home() {
  const [showList, setShowList] = useState(true);
  const [liked, setLiked] = useReducer(
    handleLike,
    new Set<number>()
  )

  function handlePressLike(
    jobId: number,
    // Optional callback
    cb?: () => void
  ) {
    if (liked.has(jobId)) {
      setLiked({ type: 'unlike', payload: jobId });
    } else {
      setLiked({ type: 'like', payload: jobId });

      if (cb) {
        cb();
      }
    }
  }

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
                  showList ?
                    <Entypo name="list" size={24} color="black" />
                    :
                    <MaterialCommunityIcons name="cards-variant" size={24} color="black" />
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
          showList ?
            <JobsList
              jobs_list={job_posting_examples}
              handlePressLike={handlePressLike}
              liked={liked}
            />
            :
            <View>
              <Profiles
                profiles={job_posting_examples}
                handlePressLike={handlePressLike}
                liked={liked}
              />
            </View>
        }
      </View>
    </>
  )
}
