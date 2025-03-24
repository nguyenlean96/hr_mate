import { ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withSpring,
  runOnJS,
  SharedValue,
} from 'react-native-reanimated';

export const findNearestSnapPoint = (
  value: number,
  velocity: number,
  snapPoints: number[]
) => {
  'worklet';
  const projectedValue = value + 0.2 * velocity;
  const distances = snapPoints.map(point => Math.abs(point - projectedValue));
  const nearestPointIndex = distances.indexOf(Math.min(...distances));
  return snapPoints[nearestPointIndex];
};

interface InteractableProps {
  snapPoints: { x: number }[],
  onSnap: (point: number) => void,
  style: ViewStyle,
  translationX: SharedValue<number>,
  translationY: SharedValue<number>
}

const Interactable: React.FC<InteractableProps> = ({
  snapPoints,
  onSnap,
  style,
  translationX,
  translationY,
}) => {
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translationX.value = event.translationX;
      translationY.value = event.translationY;
    })
    .onEnd((event) => {
      const snapTo = findNearestSnapPoint(
        translationX.value,
        event.velocityX,
        snapPoints.map(p => p.x)
      );
      translationX.value = withSpring(snapTo, {}, () => {
        runOnJS(onSnap)(snapTo);
      });
      translationY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
    ],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[style, animatedStyle]} />
    </GestureDetector>
  );
};

export default Interactable;