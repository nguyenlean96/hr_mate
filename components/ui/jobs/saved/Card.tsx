import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAppData } from '@/contexts/app_data';


interface SavedJobCardProps {
  item: number;
}

const SavedJobCard: React.FC<SavedJobCardProps> = ({ item }) => {
  const { data: jobs_data } = useAppData()
  return (
    <View key={jobs_data[item].jobview.job.listingId} style={{
      padding: 12,
      margin: 10,
      backgroundColor: '#fff',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 5,
    }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10
        }}
      >
        {
          jobs_data[item]?.jobview?.overview?.squareLogoUrl &&
          <Image source={{ uri: jobs_data[item]?.jobview?.overview?.squareLogoUrl }}
            style={{ width: 28, height: 28, borderRadius: 4 }}
          />
        }
        <Text
          style={{
            fontSize: 15,
          }}
        >{jobs_data[item]?.jobview?.header?.employerNameFromSearch}</Text>
        <View
          style={{
            flexDirection: 'row',
            columnGap: 5,
            alignItems: 'center',
          }}
        >
          <Text>{jobs_data[item]?.jobview?.header?.rating}</Text>
          <FontAwesome name="star" size={16} color="black" />
        </View>
      </View>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 700,
          marginTop: 10,
          marginBottom: 4,
          color: '#444'
        }}
      >{jobs_data[item]?.jobview?.job?.jobTitleText}</Text>
      <Text style={{ fontStyle: 'italic' }}>{jobs_data[item]?.jobview?.header?.locationName}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 10,
        }}
      >
        <Pressable
          onPress={() => { }}
          style={{
            backgroundColor: '#007AFF',
            padding: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Text style={{ color: '#fff' }}>Apply Now</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default SavedJobCard