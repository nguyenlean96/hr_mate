import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';
import Animated,
{
  useAnimatedStyle,
  SharedValue
} from 'react-native-reanimated';
import Octicons from '@expo/vector-icons/Octicons';
import { Profile } from './Model';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;
const CARD_HEIGHT = CARD_WIDTH * (1 + Math.sqrt(5)) / 2;

interface CardProps {
  profile: Profile;
  likeOpacity: SharedValue<number>;
  nopeOpacity: SharedValue<number>;
}

const Card: React.FC<CardProps> = ({ profile, likeOpacity, nopeOpacity }) => {
  const likeStyle = useAnimatedStyle(() => ({ opacity: likeOpacity.value, }));

  const nopeStyle = useAnimatedStyle(() => ({ opacity: nopeOpacity.value, }));

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: profile?.jobview?.overview?.squareLogoUrl as string }} />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Animated.View style={[styles.like, likeStyle]}>
            <Octicons name="heart-fill" size={26} color={styles.like.color} />
            <Text style={styles.likeLabel}>SAVE</Text>
          </Animated.View>
          <Animated.View style={[styles.nope, nopeStyle]}>
            <Octicons name="circle-slash" size={24} color={styles.nope.color} />
            <Text style={styles.nopeLabel}>SKIP</Text>
          </Animated.View>
        </View>
        <View style={styles.footer}>
          <Text
            style={styles.name}
          >{profile?.jobview?.job?.jobTitleText}</Text>
          <Text>{profile?.jobview?.header?.locationName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
  },
  name: {
    color: 'white',
    fontSize: 32,
  },
  like: {
    borderWidth: 4,
    borderRadius: 5, 
    padding: 8, 
    borderColor: '#6ee3b4',
    color: '#6ee3b4',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  likeLabel: {
    fontSize: 32,
    color: '#6ee3b4',
    fontWeight: 'bold',
  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: '#ec5288',
    color: '#ec5288',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  nopeLabel: {
    fontSize: 32,
    color: '#ec5288',
    fontWeight: 'bold',
  },
});

export default Card;