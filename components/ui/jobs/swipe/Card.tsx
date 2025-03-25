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
import { LinearGradient } from 'expo-linear-gradient';
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

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: profile?.jobview?.overview?.squareLogoUrl as string }} />
      <View style={styles.overlay}>
        <LinearGradient
          style={styles.header}
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']}
        >
          <Text style={styles.companyName}>{profile?.jobview?.header?.employerNameFromSearch}</Text>
          <Text style={styles.companyLocation}>{profile?.jobview?.header?.locationName}</Text>
        </LinearGradient>
        <LinearGradient
          style={styles.footer}
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)']}
        >
          <Text
            style={styles.jobTitle}
          >{profile?.jobview?.job?.jobTitleText}</Text>
        </LinearGradient>
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
    backgroundColor: '#aaa',
  },
  companyName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 400,
  },
  companyLocation: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: 12,
    paddingBottom: 48
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 12,
    paddingTop: 36,
  },
  jobTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 500,
  },
  like: {
    padding: 6,
    borderColor: '#4aa1ff',
    color: '#4aa1ff',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
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