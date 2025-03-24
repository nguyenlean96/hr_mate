import React from "react";
import { View, Image, Pressable, Text } from "react-native";
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface ScrollCardProps {
  item: any;
  wasLiked: boolean;
  handlePressLike: (jobId: number) => void;
}

const ScrollCard: React.FC<ScrollCardProps> = ({ item, wasLiked, handlePressLike }) => {
  return (
    <View style={{
      padding: 14,
      margin: 10,
      backgroundColor: 'white',
      borderRadius: 8,
      rowGap: 10,
    }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 10
          }}
        >
          {
            item?.jobview?.overview?.squareLogoUrl &&
            <Image source={{ uri: item?.jobview?.overview?.squareLogoUrl }}
              style={{ width: 28, height: 28, borderRadius: 4 }}
            />
          }
          <Text
            style={{
              fontSize: 15,
            }}
          >{item?.jobview?.header?.employerNameFromSearch}</Text>
          <View
            style={{
              flexDirection: 'row',
              columnGap: 5,
              alignItems: 'center',
            }}
          >
            <Text>{item?.jobview?.header?.rating}</Text>
            <FontAwesome name="star" size={16} color="black" />
          </View>
        </View>
        <Pressable
          onPress={() => handlePressLike(item?.jobview?.job?.listingId)}
        >
          {
            wasLiked
              ?
              <Octicons name="heart-fill" size={26} />
              :
              <Octicons name="heart" size={26} />
          }
        </Pressable>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
        }}
      >{item?.jobview?.job?.jobTitleText}</Text>
      <Text>{item?.jobview?.header?.locationName}</Text>
    </View>
  )
}

export default ScrollCard;