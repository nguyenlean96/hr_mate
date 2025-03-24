import React, { useState, useCallback } from 'react';
import {
  View,
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
  runOnJS,
} from 'react-native-reanimated';
import Interactable from './Interactable';
import Card from './Card';
import { Profile } from './Model';

const { width, height } = Dimensions.get('window');
const φ = (1 + Math.sqrt(5)) / 2;
const deltaX = width / 2;
const w = width - 32;
const h = w * φ;
const α = Math.PI / 12;
const A = width * Math.cos(α) + height * Math.sin(α);

interface ProfilesProps {
  profiles: any[];
  liked: Set<number>;
  handlePressLike: (jobId: number, cb?: () => void) => void;
}


const Profiles: React.FC<ProfilesProps> = ({
  profiles,
  liked,
  handlePressLike,
}) => {
  const [index, setIndex] = useState<number>(0);

  // Create shared values here:
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  const onSnap = useCallback((snapPoint: number) => {
    if (snapPoint !== 0) {
      /**
       *  Set the remainder to infinitly loop through the profiles
       */
      setIndex((prevIndex: number) => ((prevIndex + 1) % profiles.length));

      runOnJS(handlePressLike)(profiles[index].jobview.job.listingId);

      translationX.value = 0;
      translationY.value = 0;
    }
  }, [index, profiles, liked, handlePressLike, translationX, translationY]);

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
        { translateY: translationY.value },
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

  const profile = profiles[index];

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingVertical: 32,
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
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
});

export default Profiles;