import React from 'react'
import { useAppData } from '@/contexts/app_data'
import { View, Text } from 'react-native'
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from 'react-native-gesture-handler';
import SavedJobCard from '@/components/ui/jobs/saved/Card';


const SavedJobsScreen: React.FC = () => {
  const { liked }: { liked: Set<number>, } = useAppData()
  return (
    <View style={{
      flex: 1,
    }}>
      <FlashList
        style={{
          flex: 1,
          borderWidth: 1,
        }}
        data={Array.from(liked) as number[]}
        renderItem={({ item }) => (
          <SavedJobCard item={item} />
        )}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 500, fontStyle: 'italic', color: '#aaa' }}>No jobs found</Text>
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

export default SavedJobsScreen