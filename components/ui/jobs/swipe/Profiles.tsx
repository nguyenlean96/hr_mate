import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  Extrapolation,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import Octicons from '@expo/vector-icons/Octicons';
import { useAppData } from '@/contexts/app_data';
import Interactable from './Interactable';
import Card from './Card';

const { width, height } = Dimensions.get('window');
const φ = (1 + Math.sqrt(5)) / 2;
const deltaX = width / 2;
const w = width - 32;
const h = w * φ;
const α = Math.PI / 12;
const A = width * Math.cos(α) + height * Math.sin(α);


const Profiles: React.FC = () => {
  const { data: jobs_data, liked, handlePressLike } = useAppData();
  const [index, setIndex] = useState<number>(0);

  // Create shared values here:
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  // New shared value for the entrance animation offset:
  const entranceOffset = useSharedValue(100);

  // Animate entrance offset when the card index changes:
  useEffect(() => {
    // Set the card to start from 100 (or any value you prefer)
    entranceOffset.value = 100;
    // Animate it to 0 so it slides in from the bottom:
    entranceOffset.value = withSpring(0, { damping: 15, stiffness: 100 });
  }, [index]);

  const onSnap = useCallback((snapPoint: number) => {
    if (snapPoint !== 0) {
      /**
       *  Set the remainder to infinitly loop through the profiles
       */
      setIndex((prevIndex: number) => ((prevIndex + 1) % Object.keys(jobs_data).length));

      if (liked.has(jobs_data[Object.keys(jobs_data)[index]].jobview.job.listingId)) {
        if (snapPoint < 0) {
          runOnJS(handlePressLike)(jobs_data[Object.keys(jobs_data)[index]].jobview.job.listingId);
        }
      } else {
        if (snapPoint > 0) {
          runOnJS(handlePressLike)(jobs_data[Object.keys(jobs_data)[index]].jobview.job.listingId);
        }
      }

      translationX.value = 0;
      translationY.value = 0;
    }
  }, [index, jobs_data, liked, handlePressLike, translationX, translationY]);

  const animatedStyle = useAnimatedStyle(() => {
    const rotateZ = `${interpolate(
      translationX.value,
      [-deltaX, deltaX],
      [α, -α],
      { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP }
    )}rad`;

    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { translateX: translationX.value },
        // Combine gesture translateY with the entrance offset:
        { translateY: translationY.value + entranceOffset.value },
        { rotateZ },
      ],
    };
  });

  const likeOpacity = useDerivedValue(() =>
    interpolate(translationX.value, [0, deltaX / 4], [0, 1])
  );
  const nopeOpacity = useDerivedValue(() =>
    interpolate(translationX.value, [-deltaX / 4, 0], [1, 0])
  );
  const likeStyle = useAnimatedStyle(() => ({ opacity: likeOpacity.value, }));

  const nopeStyle = useAnimatedStyle(() => ({ opacity: nopeOpacity.value, }));

  const profile = jobs_data[Object.keys(jobs_data)[index]];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cards}>
        <Animated.View style={animatedStyle}>
          <Card
            profile={profile}
            likeOpacity={likeOpacity}
            nopeOpacity={nopeOpacity}
          />
        </Animated.View>
        <Interactable
          key={index}
          snapPoints={[{ x: -A }, { x: 0 }, { x: A }]}
          style={{ ...StyleSheet.absoluteFillObject }}
          translationX={translationX}
          translationY={translationY}
          onSnap={onSnap}
        />
      </View>
      {/* Absolute indicator wrappers */}
      <View style={[styles.indicatorWrapper, { zIndex: 10 }]}>
        <Animated.View style={likeStyle}>
          <View style={styles.like}>
            <Octicons name="heart-fill" size={26} color="#4aa1ff" />
            <Text style={styles.likeLabel}>SAVE</Text>
          </View>
        </Animated.View>
      </View>
      <View style={[styles.indicatorWrapper, { zIndex: 5 }]}>
        <Animated.View style={nopeStyle}>
          <View style={styles.nope}>
            <Octicons name="circle-slash" size={24} color="#ec5288" />
            <Text style={styles.nopeLabel}>SKIP</Text>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingVertical: 32,
    backgroundColor: '#eee',
  },
  cards: {
    width: w,
    height: h,
    marginLeft: 16,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 16,
  },
  // New style for each indicator wrapper:
  indicatorWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  like: {
    padding: 6,
    borderColor: '#4aa1ff',
    color: '#4aa1ff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 5,
  },
  likeLabel: {
    fontSize: 32,
    color: '#4aa1ff',
    fontWeight: 'bold',
  },
  nope: {
    padding: 6,
    borderColor: '#ec5288',
    color: '#ec5288',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 5,
  },
  nopeLabel: {
    fontSize: 32,
    color: '#ec5288',
    fontWeight: 'bold',
  },
});

export default Profiles;