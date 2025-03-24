import { useAppData } from '@/contexts/app_data'
import React from 'react'
import { View, Text } from 'react-native'
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from 'react-native-gesture-handler';

export default function SavedJobsScreen() {
  const { liked, data: jobs_data } = useAppData()
  return (
    <View style={{
      flex: 1,
    }}>
      <FlashList
        style={{
          flex: 1,
          borderWidth: 1,
        }}
        data={Array.from(liked)}
        renderItem={({ item }) => (
          <Text>{
            jobs_data.find(
              (job: any) => (job?.jobview?.job?.listingId === item)
            ).jobview.header.employerNameFromSearch
          }</Text>
        )}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 500, fontStyle: 'italic', color: '#aaa' }}>No saved jobs</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => { }}
          />
        }
      />
    </View>
  )
}
